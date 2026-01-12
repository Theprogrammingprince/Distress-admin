# Backend Deployment Guide

This guide covers deploying all Supabase Edge Functions and database migrations for the Super Admin dashboard.

## Prerequisites

1. **Supabase CLI** installed:
   ```bash
   npm install -g supabase
   ```

2. **Supabase Account** with project created

3. **Logged in to Supabase CLI**:
   ```bash
   supabase login
   ```

4. **Link to your project**:
   ```bash
   supabase link --project-ref zrdnrpbhqzhmebgralku
   ```

## Edge Functions Overview

### 1. Admin Function (`/admin`)
Handles product verification and management.

**Endpoints:**
- `GET /admin/pending` - Get pending products
- `GET /admin/all` - Get all products (with optional status filter)
- `GET /admin/stats` - Get product statistics
- `GET /admin/product/:id` - Get single product details
- `POST /admin/approve` - Approve a product
- `POST /admin/reject` - Reject a product with reason

### 2. Sellers Function (`/sellers`)
Handles seller verification and management.

**Endpoints:**
- `GET /sellers/all` - Get all sellers (with optional status filter)
- `GET /sellers/stats` - Get seller statistics
- `GET /sellers/:id` - Get single seller details
- `POST /sellers/verify` - Verify a seller
- `POST /sellers/reject` - Reject a seller with reason

### 3. Payments Function (`/payments`)
Handles escrow, transactions, and payouts.

**Endpoints:**
- `GET /payments/transactions` - Get all transactions
- `GET /payments/stats` - Get payment statistics
- `GET /payments/:id` - Get single transaction details
- `POST /payments/release` - Release escrow funds
- `POST /payments/refund` - Refund a transaction
- `POST /payments/resolve-dispute` - Resolve disputed transaction

### 4. Reviews Function (`/reviews`)
Handles product and seller reviews moderation.

**Endpoints:**
- `GET /reviews/products` - Get product reviews
- `GET /reviews/sellers` - Get seller reviews
- `GET /reviews/stats` - Get review statistics
- `POST /reviews/flag` - Flag a review
- `POST /reviews/delete` - Delete a review

## Deployment Steps

### Step 1: Deploy Database Migrations

Run the migration to add seller verification and other tables:

```bash
cd Backend
supabase db push
```

This will create:
- Seller verification columns in `profiles` table
- `transactions` table for escrow/payments
- `product_reviews` table
- `seller_reviews` table
- Necessary indexes and RLS policies
- Helper functions

### Step 2: Deploy Edge Functions

#### Option A: Using the deployment script (Recommended)

**On Windows (PowerShell):**
```powershell
cd Backend
.\deploy-functions.ps1
```

**On Linux/Mac (Bash):**
```bash
cd Backend
chmod +x deploy-functions.sh
./deploy-functions.sh
```

#### Option B: Manual deployment

Deploy each function individually:

```bash
cd Backend

# Deploy admin function
supabase functions deploy admin --no-verify-jwt

# Deploy sellers function
supabase functions deploy sellers --no-verify-jwt

# Deploy payments function
supabase functions deploy payments --no-verify-jwt

# Deploy reviews function
supabase functions deploy reviews --no-verify-jwt
```

### Step 3: Verify Deployment

Check that all functions are deployed:

```bash
supabase functions list
```

You should see:
- admin
- sellers
- payments
- reviews

### Step 4: Test Endpoints

Test the admin endpoint:

```bash
curl -X GET "https://zrdnrpbhqzhmebgralku.supabase.co/functions/v1/admin/stats" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "apikey: YOUR_SUPABASE_ANON_KEY"
```

## Environment Variables

The Edge Functions use these environment variables (automatically set by Supabase):
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Your Supabase anonymous key

## Security

All Edge Functions include:
- ✅ Authentication check (user must be logged in)
- ✅ Authorization check (user must have `super_admin` role)
- ✅ CORS headers for frontend access
- ✅ Input validation
- ✅ Error handling

## Database Schema

### Profiles Table (Extended)
```sql
- seller_verification_status: TEXT (verified, pending, unverified, rejected)
- seller_business_name: TEXT
- seller_verified_at: TIMESTAMP
- seller_verified_by: UUID
- seller_rejection_reason: TEXT
```

### Transactions Table
```sql
- id: UUID (PK)
- seller_id: UUID (FK)
- buyer_id: UUID (FK)
- product_id: UUID (FK)
- amount: DECIMAL
- currency: TEXT
- status: TEXT (held, completed, disputed, refunded, pending_payout)
- transaction_type: TEXT
- created_at: TIMESTAMP
```

### Product Reviews Table
```sql
- id: UUID (PK)
- product_id: UUID (FK)
- reviewer_id: UUID (FK)
- rating: INTEGER (1-5)
- comment: TEXT
- is_flagged: BOOLEAN
- is_deleted: BOOLEAN
- created_at: TIMESTAMP
```

### Seller Reviews Table
```sql
- id: UUID (PK)
- seller_id: UUID (FK)
- reviewer_id: UUID (FK)
- rating: INTEGER (1-5)
- comment: TEXT
- is_flagged: BOOLEAN
- is_deleted: BOOLEAN
- created_at: TIMESTAMP
```

## Troubleshooting

### Function deployment fails
```bash
# Check if you're logged in
supabase login

# Check if project is linked
supabase link --project-ref zrdnrpbhqzhmebgralku
```

### Migration fails
```bash
# Check migration status
supabase db diff

# Reset and reapply
supabase db reset
```

### 403 Forbidden errors
Make sure your user has the `super_admin` role:
```sql
UPDATE profiles
SET role = 'super_admin'
WHERE email = 'your-admin-email@example.com';
```

### CORS errors
The functions include CORS headers. If you still get CORS errors:
1. Check that the frontend is using the correct Supabase URL
2. Verify the `Authorization` header is being sent
3. Check browser console for specific error messages

## Monitoring

View function logs in Supabase Dashboard:
1. Go to https://supabase.com/dashboard
2. Select your project
3. Navigate to Edge Functions
4. Click on a function to view logs

Or use CLI:
```bash
supabase functions logs admin
supabase functions logs sellers
supabase functions logs payments
supabase functions logs reviews
```

## Updating Functions

To update a function after making changes:

```bash
# Update specific function
supabase functions deploy admin --no-verify-jwt

# Or run the deployment script again
.\deploy-functions.ps1  # Windows
./deploy-functions.sh   # Linux/Mac
```

## Rollback

If you need to rollback:

1. **Database migrations:**
   ```bash
   supabase db reset
   ```

2. **Edge Functions:**
   Redeploy the previous version of the function code.

## Production Checklist

Before going to production:

- [ ] All Edge Functions deployed successfully
- [ ] Database migrations applied
- [ ] Super admin user created and verified
- [ ] Test all endpoints with real data
- [ ] Monitor function logs for errors
- [ ] Set up error alerting
- [ ] Review RLS policies
- [ ] Test authentication flow
- [ ] Verify CORS configuration
- [ ] Load test critical endpoints
- [ ] Document API for team

## Support

For issues:
1. Check Supabase function logs
2. Review database logs
3. Check browser console for frontend errors
4. Verify environment variables
5. Test with curl/Postman first

## API Documentation

Full API documentation is available in the frontend `SETUP.md` file.

Base URL: `https://zrdnrpbhqzhmebgralku.supabase.co/functions/v1`

All requests require:
- `Authorization: Bearer <access_token>`
- `apikey: <supabase_anon_key>`
- `Content-Type: application/json`
