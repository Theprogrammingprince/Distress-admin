import { getAuthHeaders } from './supabase';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://zrdnrpbhqzhmebgralku.supabase.co';
const BASE_URL = `${SUPABASE_URL}/functions/v1`;

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  image_url: string;
  stock: number;
  verification_status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  seller: {
    id: string;
    full_name: string;
    email: string;
    phone?: string;
  };
  verified_at?: string;
  verified_by?: string;
  rejection_reason?: string;
}

interface PaginatedResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

interface StatsResponse {
  pending_count: number;
  approved_count: number;
  rejected_count: number;
  total_count: number;
}

interface ApproveResponse {
  message: string;
  product: Product;
}

interface RejectResponse {
  message: string;
  product: Product;
}

/**
 * Get all products awaiting verification
 */
export async function getPendingProducts(page = 1, limit = 20): Promise<PaginatedResponse> {
  const headers = await getAuthHeaders();
  const response = await fetch(
    `${BASE_URL}/admin/pending?page=${page}&limit=${limit}`,
    { headers }
  );
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch pending products');
  }
  
  return response.json();
}

/**
 * Get all products with optional status filter
 */
export async function getAllProducts(
  status?: 'pending' | 'approved' | 'rejected',
  page = 1,
  limit = 20
): Promise<PaginatedResponse> {
  const headers = await getAuthHeaders();
  const statusParam = status ? `&status=${status}` : '';
  const response = await fetch(
    `${BASE_URL}/admin/all?page=${page}&limit=${limit}${statusParam}`,
    { headers }
  );
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch products');
  }
  
  return response.json();
}

/**
 * Get verification statistics for dashboard
 */
export async function getVerificationStats(): Promise<StatsResponse> {
  const headers = await getAuthHeaders();
  const response = await fetch(
    `${BASE_URL}/admin/stats`,
    { headers }
  );
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch statistics');
  }
  
  return response.json();
}

/**
 * Get detailed information about a specific product
 */
export async function getProduct(productId: string): Promise<Product> {
  const headers = await getAuthHeaders();
  const response = await fetch(
    `${BASE_URL}/admin/product/${productId}`,
    { headers }
  );
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch product details');
  }
  
  return response.json();
}

/**
 * Approve a pending product (makes it visible to customers)
 */
export async function approveProduct(productId: string): Promise<ApproveResponse> {
  const headers = await getAuthHeaders();
  const response = await fetch(
    `${BASE_URL}/admin/approve`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({ product_id: productId }),
    }
  );
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to approve product');
  }
  
  return response.json();
}

/**
 * Reject a product with a reason
 */
export async function rejectProduct(productId: string, reason: string): Promise<RejectResponse> {
  const headers = await getAuthHeaders();
  const response = await fetch(
    `${BASE_URL}/admin/reject`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({ product_id: productId, reason }),
    }
  );
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to reject product');
  }
  
  return response.json();
}

export type { Product, PaginatedResponse, StatsResponse, ApproveResponse, RejectResponse };
