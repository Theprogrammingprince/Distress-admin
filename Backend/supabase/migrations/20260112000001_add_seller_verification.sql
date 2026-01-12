-- Add seller verification columns to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('approved', 'pending', 'rejected')),
ADD COLUMN IF NOT EXISTS verified_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS verified_by UUID REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS rejection_reason TEXT,
ADD COLUMN IF NOT EXISTS business_name TEXT,
ADD COLUMN IF NOT EXISTS business_reg_number TEXT,
ADD COLUMN IF NOT EXISTS nin TEXT,
ADD COLUMN IF NOT EXISTS street_address TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS state TEXT;

-- Create index for seller verification status
CREATE INDEX IF NOT EXISTS idx_profiles_verification_status ON profiles(verification_status) WHERE role = 'client';

-- Auto-approve buyers on signup
CREATE OR REPLACE FUNCTION auto_approve_buyers()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.role = 'buyer' THEN
    NEW.verification_status = 'approved';
  ELSIF NEW.role = 'client' THEN
    NEW.verification_status = 'pending';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_buyer_verification_status
  BEFORE INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION auto_approve_buyers();

-- Create transactions table for escrow/payments
CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID NOT NULL REFERENCES auth.users(id),
    buyer_id UUID NOT NULL REFERENCES auth.users(id),
    product_id UUID REFERENCES products(id),
    amount DECIMAL(10, 2) NOT NULL,
    currency TEXT DEFAULT 'NGN',
    status TEXT NOT NULL DEFAULT 'held' CHECK (status IN ('held', 'completed', 'disputed', 'refunded', 'pending_payout')),
    transaction_type TEXT NOT NULL CHECK (transaction_type IN ('escrow_hold', 'escrow_release', 'payout', 'refund')),
    
    -- Escrow release fields
    released_at TIMESTAMP WITH TIME ZONE,
    released_by UUID REFERENCES auth.users(id),
    
    -- Refund fields
    refunded_at TIMESTAMP WITH TIME ZONE,
    refunded_by UUID REFERENCES auth.users(id),
    refund_reason TEXT,
    
    -- Dispute fields
    dispute_resolved_at TIMESTAMP WITH TIME ZONE,
    dispute_resolved_by UUID REFERENCES auth.users(id),
    dispute_resolution TEXT,
    dispute_winner TEXT CHECK (dispute_winner IN ('buyer', 'seller')),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for transactions
CREATE INDEX IF NOT EXISTS idx_transactions_seller_id ON transactions(seller_id);
CREATE INDEX IF NOT EXISTS idx_transactions_buyer_id ON transactions(buyer_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at DESC);

-- Create product_reviews table
CREATE TABLE IF NOT EXISTS product_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL REFERENCES auth.users(id),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    
    -- Moderation fields
    is_flagged BOOLEAN DEFAULT FALSE,
    flagged_at TIMESTAMP WITH TIME ZONE,
    flagged_by UUID REFERENCES auth.users(id),
    flag_reason TEXT,
    
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMP WITH TIME ZONE,
    deleted_by UUID REFERENCES auth.users(id),
    deletion_reason TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(product_id, reviewer_id)
);

-- Create indexes for product_reviews
CREATE INDEX IF NOT EXISTS idx_product_reviews_product_id ON product_reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_reviewer_id ON product_reviews(reviewer_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_is_flagged ON product_reviews(is_flagged) WHERE is_flagged = TRUE;

-- Create seller_reviews table
CREATE TABLE IF NOT EXISTS seller_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID NOT NULL REFERENCES auth.users(id),
    reviewer_id UUID NOT NULL REFERENCES auth.users(id),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    
    -- Moderation fields
    is_flagged BOOLEAN DEFAULT FALSE,
    flagged_at TIMESTAMP WITH TIME ZONE,
    flagged_by UUID REFERENCES auth.users(id),
    flag_reason TEXT,
    
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMP WITH TIME ZONE,
    deleted_by UUID REFERENCES auth.users(id),
    deletion_reason TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(seller_id, reviewer_id)
);

-- Create indexes for seller_reviews
CREATE INDEX IF NOT EXISTS idx_seller_reviews_seller_id ON seller_reviews(seller_id);
CREATE INDEX IF NOT EXISTS idx_seller_reviews_reviewer_id ON seller_reviews(reviewer_id);
CREATE INDEX IF NOT EXISTS idx_seller_reviews_is_flagged ON seller_reviews(is_flagged) WHERE is_flagged = TRUE;

-- Create function to get product stats (for admin dashboard)
CREATE OR REPLACE FUNCTION get_product_stats()
RETURNS TABLE (
    pending_count BIGINT,
    approved_count BIGINT,
    rejected_count BIGINT,
    total_count BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        COUNT(*) FILTER (WHERE verification_status = 'pending') AS pending_count,
        COUNT(*) FILTER (WHERE verification_status = 'approved') AS approved_count,
        COUNT(*) FILTER (WHERE verification_status = 'rejected') AS rejected_count,
        COUNT(*) AS total_count
    FROM products;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update RLS policies for transactions
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Sellers can see their own transactions
CREATE POLICY "Sellers can view their transactions"
    ON transactions FOR SELECT
    USING (auth.uid() = seller_id);

-- Buyers can see their own transactions
CREATE POLICY "Buyers can view their transactions"
    ON transactions FOR SELECT
    USING (auth.uid() = buyer_id);

-- Super admins can see all transactions
CREATE POLICY "Super admins can view all transactions"
    ON transactions FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'super_admin'
        )
    );

-- Update RLS policies for reviews
ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE seller_reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can view non-deleted reviews
CREATE POLICY "Anyone can view product reviews"
    ON product_reviews FOR SELECT
    USING (is_deleted = FALSE);

CREATE POLICY "Anyone can view seller reviews"
    ON seller_reviews FOR SELECT
    USING (is_deleted = FALSE);

-- Users can create reviews
CREATE POLICY "Users can create product reviews"
    ON product_reviews FOR INSERT
    WITH CHECK (auth.uid() = reviewer_id);

CREATE POLICY "Users can create seller reviews"
    ON seller_reviews FOR INSERT
    WITH CHECK (auth.uid() = reviewer_id);

-- Users can update their own reviews
CREATE POLICY "Users can update their product reviews"
    ON product_reviews FOR UPDATE
    USING (auth.uid() = reviewer_id);

CREATE POLICY "Users can update their seller reviews"
    ON seller_reviews FOR UPDATE
    USING (auth.uid() = reviewer_id);

-- Super admins can manage all reviews
CREATE POLICY "Super admins can manage product reviews"
    ON product_reviews FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'super_admin'
        )
    );

CREATE POLICY "Super admins can manage seller reviews"
    ON seller_reviews FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'super_admin'
        )
    );

-- Create updated_at trigger for transactions
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_transactions_updated_at
    BEFORE UPDATE ON transactions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_reviews_updated_at
    BEFORE UPDATE ON product_reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_seller_reviews_updated_at
    BEFORE UPDATE ON seller_reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
