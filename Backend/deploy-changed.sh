#!/bin/bash

# Deploy only changed Edge Functions
# This script checks git diff to determine which functions have changed

set -e

echo "🔍 Checking for changed Edge Functions..."

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Not a git repository. Deploying all functions..."
    ./deploy-functions.sh
    exit 0
fi

# Get list of changed files
CHANGED_FILES=$(git diff --name-only HEAD)

# Check if supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI is not installed. Please install it first:"
    echo "   npm install -g supabase"
    exit 1
fi

DEPLOYED_COUNT=0

# Check admin function
if echo "$CHANGED_FILES" | grep -q "supabase/functions/admin"; then
    echo "📦 Deploying 'admin' function (changed)..."
    supabase functions deploy admin --no-verify-jwt
    echo "✅ Admin function deployed!"
    DEPLOYED_COUNT=$((DEPLOYED_COUNT + 1))
fi

# Check sellers function
if echo "$CHANGED_FILES" | grep -q "supabase/functions/sellers"; then
    echo "📦 Deploying 'sellers' function (changed)..."
    supabase functions deploy sellers --no-verify-jwt
    echo "✅ Sellers function deployed!"
    DEPLOYED_COUNT=$((DEPLOYED_COUNT + 1))
fi

# Check payments function
if echo "$CHANGED_FILES" | grep -q "supabase/functions/payments"; then
    echo "📦 Deploying 'payments' function (changed)..."
    supabase functions deploy payments --no-verify-jwt
    echo "✅ Payments function deployed!"
    DEPLOYED_COUNT=$((DEPLOYED_COUNT + 1))
fi

# Check reviews function
if echo "$CHANGED_FILES" | grep -q "supabase/functions/reviews"; then
    echo "📦 Deploying 'reviews' function (changed)..."
    supabase functions deploy reviews --no-verify-jwt
    echo "✅ Reviews function deployed!"
    DEPLOYED_COUNT=$((DEPLOYED_COUNT + 1))
fi

if [ $DEPLOYED_COUNT -eq 0 ]; then
    echo "ℹ️  No Edge Functions have changed. Nothing to deploy."
else
    echo ""
    echo "🎉 Deployed $DEPLOYED_COUNT function(s) successfully!"
fi
