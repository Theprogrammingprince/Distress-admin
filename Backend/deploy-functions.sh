#!/bin/bash

# Deploy script for Supabase Edge Functions
# This script deploys all admin-related Edge Functions to Supabase

set -e  # Exit on error

echo "🚀 Starting deployment of Supabase Edge Functions..."

# Check if supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI is not installed. Please install it first:"
    echo "   npm install -g supabase"
    exit 1
fi

# Check if we're logged in
if ! supabase projects list &> /dev/null; then
    echo "❌ Not logged in to Supabase. Please login first:"
    echo "   supabase login"
    exit 1
fi

echo ""
echo "📦 Deploying Edge Functions..."
echo ""

# Deploy admin function (product verification)
echo "1️⃣  Deploying 'admin' function (Product Verification)..."
supabase functions deploy admin --no-verify-jwt
echo "✅ Admin function deployed successfully!"
echo ""

# Deploy sellers function (seller management)
echo "2️⃣  Deploying 'sellers' function (Seller Management)..."
supabase functions deploy sellers --no-verify-jwt
echo "✅ Sellers function deployed successfully!"
echo ""

# Deploy payments function (escrow/transactions)
echo "3️⃣  Deploying 'payments' function (Escrow & Payments)..."
supabase functions deploy payments --no-verify-jwt
echo "✅ Payments function deployed successfully!"
echo ""

# Deploy reviews function (product/seller reviews)
echo "4️⃣  Deploying 'reviews' function (Reviews Management)..."
supabase functions deploy reviews --no-verify-jwt
echo "✅ Reviews function deployed successfully!"
echo ""

echo "🎉 All Edge Functions deployed successfully!"
echo ""
echo "📝 Next steps:"
echo "   1. Run database migrations: supabase db push"
echo "   2. Update your .env file with the function URLs"
echo "   3. Test the endpoints using the admin dashboard"
echo ""
echo "🔗 Function URLs:"
echo "   Admin:    https://zrdnrpbhqzhmebgralku.supabase.co/functions/v1/admin"
echo "   Sellers:  https://zrdnrpbhqzhmebgralku.supabase.co/functions/v1/sellers"
echo "   Payments: https://zrdnrpbhqzhmebgralku.supabase.co/functions/v1/payments"
echo "   Reviews:  https://zrdnrpbhqzhmebgralku.supabase.co/functions/v1/reviews"
echo ""
