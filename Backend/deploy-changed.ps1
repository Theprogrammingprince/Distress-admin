# Deploy only changed Edge Functions (PowerShell)
# This script checks git diff to determine which functions have changed

$ErrorActionPreference = "Stop"

Write-Host "🔍 Checking for changed Edge Functions..." -ForegroundColor Cyan

# Check if we're in a git repository
try {
    git rev-parse --git-dir 2>&1 | Out-Null
} catch {
    Write-Host "❌ Not a git repository. Deploying all functions..." -ForegroundColor Yellow
    .\deploy-functions.ps1
    exit 0
}

# Get list of changed files
$CHANGED_FILES = git diff --name-only HEAD

# Check if supabase CLI is installed
if (-not (Get-Command supabase -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Supabase CLI is not installed. Please install it first:" -ForegroundColor Red
    Write-Host "   npm install -g supabase" -ForegroundColor Yellow
    exit 1
}

$DEPLOYED_COUNT = 0

# Check admin function
if ($CHANGED_FILES -match "supabase/functions/admin") {
    Write-Host "📦 Deploying 'admin' function (changed)..." -ForegroundColor Yellow
    supabase functions deploy admin --no-verify-jwt
    Write-Host "✅ Admin function deployed!" -ForegroundColor Green
    $DEPLOYED_COUNT++
}

# Check sellers function
if ($CHANGED_FILES -match "supabase/functions/sellers") {
    Write-Host "📦 Deploying 'sellers' function (changed)..." -ForegroundColor Yellow
    supabase functions deploy sellers --no-verify-jwt
    Write-Host "✅ Sellers function deployed!" -ForegroundColor Green
    $DEPLOYED_COUNT++
}

# Check payments function
if ($CHANGED_FILES -match "supabase/functions/payments") {
    Write-Host "📦 Deploying 'payments' function (changed)..." -ForegroundColor Yellow
    supabase functions deploy payments --no-verify-jwt
    Write-Host "✅ Payments function deployed!" -ForegroundColor Green
    $DEPLOYED_COUNT++
}

# Check reviews function
if ($CHANGED_FILES -match "supabase/functions/reviews") {
    Write-Host "📦 Deploying 'reviews' function (changed)..." -ForegroundColor Yellow
    supabase functions deploy reviews --no-verify-jwt
    Write-Host "✅ Reviews function deployed!" -ForegroundColor Green
    $DEPLOYED_COUNT++
}

if ($DEPLOYED_COUNT -eq 0) {
    Write-Host "ℹ️  No Edge Functions have changed. Nothing to deploy." -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "🎉 Deployed $DEPLOYED_COUNT function(s) successfully!" -ForegroundColor Green
}
