import { getAuthHeaders } from './supabase';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://zrdnrpbhqzhmebgralku.supabase.co';
const BASE_URL = `${SUPABASE_URL}/functions/v1/reviews`;

interface ProductReview {
  id: string;
  product_id: string;
  buyer_id: string;
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  product?: {
    id: string;
    name: string;
    image_url?: string;
  };
  buyer?: {
    id: string;
    full_name: string;
    email: string;
    avatar_url?: string;
  };
}

interface SellerReview {
  id: string;
  seller_id: string;
  buyer_id: string;
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  seller?: {
    id: string;
    full_name: string;
    email: string;
    business_name?: string;
    avatar_url?: string;
  };
  buyer?: {
    id: string;
    full_name: string;
    email: string;
    avatar_url?: string;
  };
}

interface PaginatedProductReviewsResponse {
  reviews: ProductReview[];
  total: number;
  page: number;
  totalPages: number;
}

interface PaginatedSellerReviewsResponse {
  reviews: SellerReview[];
  total: number;
  page: number;
  totalPages: number;
}

interface ReviewStatsResponse {
  pending_count: number;
  approved_count: number;
  rejected_count: number;
  total_count: number;
  average_rating: number;
}

/**
 * Get all product reviews with optional status filter
 */
export async function getProductReviews(
  status?: 'pending' | 'approved' | 'rejected',
  page = 1,
  limit = 20
): Promise<PaginatedProductReviewsResponse> {
  const headers = await getAuthHeaders();
  console.log('🔑 Product Reviews - Auth headers:', headers);
  const statusParam = status ? `&status=${status}` : '';
  const url = `${BASE_URL}/products?page=${page}&limit=${limit}${statusParam}`;
  console.log('📡 Fetching:', url);
  const response = await fetch(url, { headers });
  
  console.log('📥 Response status:', response.status);
  if (!response.ok) {
    const error = await response.json();
    console.error('❌ Error response:', error);
    throw new Error(error.error || 'Failed to fetch product reviews');
  }
  
  return response.json();
}

/**
 * Get product review statistics
 */
export async function getProductReviewStats(): Promise<ReviewStatsResponse> {
  const headers = await getAuthHeaders();
  console.log('🔑 Product Stats - Auth headers:', headers);
  const url = `${BASE_URL}/products/stats`;
  console.log('📡 Fetching:', url);
  const response = await fetch(url, { headers });
  
  console.log('📥 Response status:', response.status);
  if (!response.ok) {
    const error = await response.json();
    console.error('❌ Error response:', error);
    throw new Error(error.error || 'Failed to fetch product review statistics');
  }
  
  return response.json();
}

/**
 * Approve a product review
 */
export async function approveProductReview(reviewId: string): Promise<{ message: string; review: ProductReview }> {
  const headers = await getAuthHeaders();
  const response = await fetch(
    `${BASE_URL}/products/approve`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({ review_id: reviewId }),
    }
  );
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to approve review');
  }
  
  return response.json();
}

/**
 * Reject a product review
 */
export async function rejectProductReview(reviewId: string, reason: string): Promise<{ message: string; review: ProductReview }> {
  const headers = await getAuthHeaders();
  const response = await fetch(
    `${BASE_URL}/products/reject`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({ review_id: reviewId, reason }),
    }
  );
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to reject review');
  }
  
  return response.json();
}

/**
 * Delete a product review
 */
export async function deleteProductReview(reviewId: string): Promise<{ message: string }> {
  const headers = await getAuthHeaders();
  const response = await fetch(
    `${BASE_URL}/products/${reviewId}`,
    {
      method: 'DELETE',
      headers,
    }
  );
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete review');
  }
  
  return response.json();
}

/**
 * Get all seller reviews with optional status filter
 */
export async function getSellerReviews(
  status?: 'pending' | 'approved' | 'rejected',
  page = 1,
  limit = 20
): Promise<PaginatedSellerReviewsResponse> {
  const headers = await getAuthHeaders();
  const statusParam = status ? `&status=${status}` : '';
  const response = await fetch(
    `${BASE_URL}/sellers?page=${page}&limit=${limit}${statusParam}`,
    { headers }
  );
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch seller reviews');
  }
  
  return response.json();
}

/**
 * Get seller review statistics
 */
export async function getSellerReviewStats(): Promise<ReviewStatsResponse> {
  const headers = await getAuthHeaders();
  const response = await fetch(
    `${BASE_URL}/sellers/stats`,
    { headers }
  );
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch seller review statistics');
  }
  
  return response.json();
}

/**
 * Approve a seller review
 */
export async function approveSellerReview(reviewId: string): Promise<{ message: string; review: SellerReview }> {
  const headers = await getAuthHeaders();
  const response = await fetch(
    `${BASE_URL}/sellers/approve`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({ review_id: reviewId }),
    }
  );
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to approve review');
  }
  
  return response.json();
}

/**
 * Reject a seller review
 */
export async function rejectSellerReview(reviewId: string, reason: string): Promise<{ message: string; review: SellerReview }> {
  const headers = await getAuthHeaders();
  const response = await fetch(
    `${BASE_URL}/sellers/reject`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({ review_id: reviewId, reason }),
    }
  );
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to reject review');
  }
  
  return response.json();
}

/**
 * Delete a seller review
 */
export async function deleteSellerReview(reviewId: string): Promise<{ message: string }> {
  const headers = await getAuthHeaders();
  const response = await fetch(
    `${BASE_URL}/sellers/${reviewId}`,
    {
      method: 'DELETE',
      headers,
    }
  );
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete review');
  }
  
  return response.json();
}

export type {
  ProductReview,
  SellerReview,
  PaginatedProductReviewsResponse,
  PaginatedSellerReviewsResponse,
  ReviewStatsResponse,
};
