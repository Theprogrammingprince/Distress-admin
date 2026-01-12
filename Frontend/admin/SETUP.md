# Super Admin Dashboard - Setup Guide

This guide will help you set up and run the Super Admin dashboard with the product verification API integration.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account with the backend API deployed
- Super admin user credentials

## Installation Steps

### 1. Install Dependencies

First, install the required npm packages:

```bash
npm install @supabase/supabase-js
```

Or if you prefer yarn:

```bash
yarn add @supabase/supabase-js
```

### 2. Environment Configuration

Create a `.env` file in the root of the admin folder:

```bash
cp .env.example .env
```

Then edit the `.env` file and add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://zrdnrpbhqzhmebgralku.supabase.co
VITE_SUPABASE_ANON_KEY=your_actual_supabase_anon_key_here
```

**Important:** Replace `your_actual_supabase_anon_key_here` with your actual Supabase anonymous key from your Supabase project settings.

### 3. Verify Super Admin Role

Make sure your user account has the `super_admin` role in the Supabase database:

```sql
-- Run this in your Supabase SQL Editor
UPDATE profiles
SET role = 'super_admin'
WHERE email = 'your-admin-email@example.com';
```

### 4. Start the Development Server

```bash
npm run dev
```

The dashboard will be available at `http://localhost:5173` (or the port shown in your terminal).

## Features Implemented

### ✅ Dashboard Page
- Real-time statistics from API
  - Pending products count
  - Approved products count
  - Rejected products count
  - Total products count
- Recent pending products activity feed
- Loading states and error handling

### ✅ Products Management Page
- View all products with filtering by status:
  - All products
  - Pending (awaiting verification)
  - Approved (live on platform)
  - Rejected (with reasons)
- Search functionality (by name, seller, category)
- Product verification actions:
  - **Approve** - Makes product visible to customers
  - **Reject** - Reject with detailed reason
- Pagination support
- Real-time updates after actions
- Product details display:
  - Product image
  - Name and description
  - Seller information (name, email)
  - Price and currency
  - Stock level
  - Category
  - Verification status badge

### ✅ API Integration
All endpoints from the documentation are integrated:
- `GET /admin/pending` - Fetch pending products
- `GET /admin/all` - Fetch all products with filters
- `GET /admin/stats` - Fetch dashboard statistics
- `GET /admin/product/:id` - Fetch single product details
- `POST /admin/approve` - Approve a product
- `POST /admin/reject` - Reject a product with reason

## API Configuration

The API base URL is configured in `src/lib/adminApi.ts`:

```typescript
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://zrdnrpbhqzhmebgralku.supabase.co';
const BASE_URL = `${SUPABASE_URL}/functions/v1`;
```

All API calls automatically include:
- Authorization header with user's access token
- Supabase API key
- Content-Type: application/json

## Authentication Flow

1. User logs in via Supabase Auth
2. Access token is stored in session
3. All API requests include the token in Authorization header
4. Backend verifies user has `super_admin` role
5. If authorized, API returns requested data

## Error Handling

The dashboard includes comprehensive error handling:

- **Network errors** - Displays error message with retry button
- **Authentication errors** - User needs to log in
- **Authorization errors** - User doesn't have super_admin role
- **API errors** - Displays specific error message from backend

## Usage Guide

### Approving a Product

1. Navigate to **Products** page
2. Click on **Pending** tab to see products awaiting verification
3. Review product details (image, description, seller info)
4. Click **Approve** button
5. Confirm the action
6. Product status changes to "Approved" and becomes visible to customers

### Rejecting a Product

1. Navigate to **Products** page
2. Click on **Pending** tab
3. Review the product
4. Click **Reject** button
5. Enter a detailed rejection reason (e.g., "Product images are unclear. Please provide better quality images.")
6. Click **Reject Product**
7. Seller will see the rejection reason and can resubmit

### Viewing Statistics

The Dashboard page shows:
- **Pending Products** - Number of products awaiting your review
- **Approved Products** - Total products live on the platform
- **Rejected Products** - Products that need seller attention
- **Total Products** - All-time product count

### Searching Products

Use the search bar to find products by:
- Product name
- Seller name
- Category

### Filtering Products

Use the tabs to filter by verification status:
- **All** - Show all products
- **Pending** - Only products awaiting verification
- **Approved** - Only verified products
- **Rejected** - Only rejected products

## Troubleshooting

### "Cannot find module '@supabase/supabase-js'"

Run: `npm install @supabase/supabase-js`

### "Failed to load products" or "Failed to load dashboard data"

1. Check your `.env` file has correct credentials
2. Verify your Supabase backend functions are deployed
3. Check browser console for detailed error messages
4. Ensure you're logged in with a super_admin account

### "403 Forbidden" errors

Your user account doesn't have the `super_admin` role. Run the SQL query in step 3 above.

### Products not loading

1. Verify the backend API is running
2. Check Supabase Edge Functions logs
3. Ensure RLS policies are correctly configured
4. Verify your access token is valid (try logging out and back in)

## File Structure

```
src/
├── lib/
│   ├── supabase.ts          # Supabase client configuration
│   ├── adminApi.ts          # All API endpoint functions
│   └── utils.ts             # Utility functions
├── pages/
│   ├── Dashboard.tsx        # Dashboard with statistics
│   ├── Products.tsx         # Product management page
│   └── ...
├── components/
│   └── layout/
│       ├── AdminLayout.tsx  # Main layout wrapper
│       ├── Sidebar.tsx      # Navigation sidebar
│       └── Header.tsx       # Top header
└── App.tsx                  # Main app with routing
```

## Next Steps

1. **Add Authentication UI** - Create login/signup pages
2. **Add Product Details Modal** - View full product information
3. **Add Bulk Actions** - Approve/reject multiple products at once
4. **Add Notifications** - Real-time notifications for new products
5. **Add Analytics** - More detailed charts and metrics
6. **Add Export** - Export product data to CSV/Excel

## Support

For issues or questions:
1. Check the API documentation
2. Review Supabase Edge Function logs
3. Check browser console for errors
4. Verify environment variables are set correctly

## Security Notes

- Never commit your `.env` file to version control
- Keep your Supabase keys secure
- Only grant `super_admin` role to trusted users
- Regularly review and audit admin actions
- Use HTTPS in production
