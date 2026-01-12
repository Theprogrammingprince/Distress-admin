# PowerShell Deploy script for Supabase Edge Functions
# This script deploys all admin-related Edge Functions to Supabase

$ErrorActionPreference = "Stop"

Write-Host "🚀 Starting deployment of Supabase Edge Functions..." -ForegroundColor Cyan

# Check if supabase CLI is installed
if (-not (Get-Command supabase -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Supabase CLI is not installed. Please install it first:" -ForegroundColor Red
    Write-Host "   npm install -g supabase" -ForegroundColor Yellow
    exit 1
}

# Check if we're logged in
try {
    supabase projects list 2>&1 | Out-Null
} catch {
    Write-Host "❌ Not logged in to Supabase. Please login first:" -ForegroundColor Red
    Write-Host "   supabase login" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "📦 Deploying Edge Functions..." -ForegroundColor Cyan
Write-Host ""

# Deploy admin function (product verification)
Write-Host "1️⃣  Deploying 'admin' function (Product Verification)..." -ForegroundColor Yellow
supabase functions deploy admin --no-verify-jwt
Write-Host "✅ Admin function deployed successfully!" -ForegroundColor Green
Write-Host ""

# Deploy sellers function (seller management)
Write-Host "2️⃣  Deploying 'sellers' function (Seller Management)..." -ForegroundColor Yellow
supabase functions deploy sellers --no-verify-jwt
Write-Host "✅ Sellers function deployed successfully!" -ForegroundColor Green
Write-Host ""

# Deploy payments function (escrow/transactions)
Write-Host "3️⃣  Deploying 'payments' function (Escrow & Payments)..." -ForegroundColor Yellow
supabase functions deploy payments --no-verify-jwt
Write-Host "✅ Payments function deployed successfully!" -ForegroundColor Green
Write-Host ""

# Deploy reviews function (product/seller reviews)
Write-Host "4️⃣  Deploying 'reviews' function (Reviews Management)..." -ForegroundColor Yellow
supabase functions deploy reviews --no-verify-jwt
Write-Host "✅ Reviews function deployed successfully!" -ForegroundColor Green
Write-Host ""

Write-Host "🎉 All Edge Functions deployed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Run database migrations: supabase db push" -ForegroundColor White
Write-Host "   2. Update your .env file with the function URLs" -ForegroundColor White
Write-Host "   3. Test the endpoints using the admin dashboard" -ForegroundColor White
Write-Host ""
Write-Host "🔗 Function URLs:" -ForegroundColor Cyan
Write-Host "   Admin:    https://zrdnrpbhqzhmebgralku.supabase.co/functions/v1/admin" -ForegroundColor White
Write-Host "   Sellers:  https://zrdnrpbhqzhmebgralku.supabase.co/functions/v1/sellers" -ForegroundColor White
Write-Host "   Payments: https://zrdnrpbhqzhmebgralku.supabase.co/functions/v1/payments" -ForegroundColor White
Write-Host "   Reviews:  https://zrdnrpbhqzhmebgralku.supabase.co/functions/v1/reviews" -ForegroundColor White
Write-Host ""
