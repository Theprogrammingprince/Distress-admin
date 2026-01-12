import { getAuthHeaders } from './supabase';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://zrdnrpbhqzhmebgralku.supabase.co';
const BASE_URL = `${SUPABASE_URL}/functions/v1`;

interface Seller {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  role: string;
  verification_status: 'pending' | 'approved' | 'rejected';
  business_name?: string;
  business_reg_number?: string;
  nin?: string;
  street_address?: string;
  city?: string;
  state?: string;
  avatar_url?: string;
  created_at: string;
  verified_at?: string;
  verified_by?: string;
  rejection_reason?: string;
}

interface PaginatedSellersResponse {
  sellers: Seller[];
  total: number;
  page: number;
  totalPages: number;
}

interface SellerStatsResponse {
  pending_count: number;
  approved_count: number;
  rejected_count: number;
  total_count: number;
  buyer_count: number;
}

interface ApproveSellerResponse {
  message: string;
  seller: Seller;
}

interface RejectSellerResponse {
  message: string;
  seller: Seller;
}

/**
 * Get all sellers awaiting verification
 */
export async function getPendingSellers(page = 1, limit = 20): Promise<PaginatedSellersResponse> {
  const headers = await getAuthHeaders();
  const response = await fetch(
    `${BASE_URL}/admin/sellers/pending?page=${page}&limit=${limit}`,
    { headers }
  );
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch pending sellers');
  }
  
  return response.json();
}

/**
 * Get all sellers with optional status filter
 */
export async function getAllSellers(
  status?: 'pending' | 'approved' | 'rejected',
  page = 1,
  limit = 20
): Promise<PaginatedSellersResponse> {
  const headers = await getAuthHeaders();
  const statusParam = status ? `&status=${status}` : '';
  const response = await fetch(
    `${BASE_URL}/admin/sellers/all?page=${page}&limit=${limit}${statusParam}`,
    { headers }
  );
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch sellers');
  }
  
  return response.json();
}

/**
 * Get seller verification statistics for dashboard
 */
export async function getSellerStats(): Promise<SellerStatsResponse> {
  const headers = await getAuthHeaders();
  const response = await fetch(
    `${BASE_URL}/admin/sellers/stats`,
    { headers }
  );
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch seller statistics');
  }
  
  return response.json();
}

/**
 * Get detailed information about a specific seller
 */
export async function getSeller(sellerId: string): Promise<Seller> {
  const headers = await getAuthHeaders();
  const response = await fetch(
    `${BASE_URL}/admin/sellers/${sellerId}`,
    { headers }
  );
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch seller details');
  }
  
  return response.json();
}

/**
 * Approve a pending seller (allows them to create products)
 */
export async function approveSeller(sellerId: string): Promise<ApproveSellerResponse> {
  const headers = await getAuthHeaders();
  const response = await fetch(
    `${BASE_URL}/admin/sellers/approve`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({ seller_id: sellerId }),
    }
  );
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to approve seller');
  }
  
  return response.json();
}

/**
 * Reject a seller with a reason
 */
export async function rejectSeller(sellerId: string, reason: string): Promise<RejectSellerResponse> {
  const headers = await getAuthHeaders();
  const response = await fetch(
    `${BASE_URL}/admin/sellers/reject`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({ seller_id: sellerId, reason }),
    }
  );
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to reject seller');
  }
  
  return response.json();
}

export type { Seller, PaginatedSellersResponse, SellerStatsResponse, ApproveSellerResponse, RejectSellerResponse };
