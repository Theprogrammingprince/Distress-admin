import { useState, useEffect } from 'react';
import {
    Clock,
    CheckCircle2,
    XCircle,
    ShoppingBag,
    Loader2,
    AlertCircle,
    Star,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { getProductReviews, getProductReviewStats, approveProductReview, rejectProductReview, deleteProductReview, type ProductReview } from '../../lib/reviewsApi';
import { cn } from '../../lib/utils';

const ProductReviews = () => {
    const [reviews, setReviews] = useState<ProductReview[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [stats, setStats] = useState({ pending_count: 0, approved_count: 0, rejected_count: 0, total_count: 0, average_rating: 0 });
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        loadReviews();
        loadStats();
    }, [page]);

    async function loadReviews() {
        try {
            setLoading(true);
            setError(null);
            const data = await getProductReviews(undefined, page, 20);
            setReviews(data.reviews);
            setTotalPages(data.totalPages);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load reviews');
        } finally {
            setLoading(false);
        }
    }

    async function loadStats() {
        try {
            const data = await getProductReviewStats();
            setStats(data);
        } catch (err) {
            console.error('Failed to load stats:', err);
        }
    }

    async function handleApprove(reviewId: string) {
        if (!confirm('Approve this review?')) return;
        
        try {
            setActionLoading(true);
            await approveProductReview(reviewId);
            await loadReviews();
            await loadStats();
            alert('Review approved successfully!');
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Failed to approve review');
        } finally {
            setActionLoading(false);
        }
    }

    async function handleReject(reviewId: string) {
        const reason = prompt('Enter rejection reason:');
        if (!reason) return;
        
        try {
            setActionLoading(true);
            await rejectProductReview(reviewId, reason);
            await loadReviews();
            await loadStats();
            alert('Review rejected successfully!');
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Failed to reject review');
        } finally {
            setActionLoading(false);
        }
    }

    async function handleDelete(reviewId: string) {
        if (!confirm('Delete this review permanently?')) return;
        
        try {
            setActionLoading(true);
            await deleteProductReview(reviewId);
            await loadReviews();
            await loadStats();
            alert('Review deleted successfully!');
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Failed to delete review');
        } finally {
            setActionLoading(false);
        }
    }

    function formatDate(dateString: string) {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return `${diffMins} mins ago`;
        if (diffHours < 24) return `${diffHours} hrs ago`;
        return `${diffDays} days ago`;
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Product Reviews</h1>
                <p className="text-muted-foreground mt-1">Moderate customer reviews for products.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="bg-card rounded-xl border border-border p-4">
                    <p className="text-xs text-muted-foreground uppercase font-semibold">Total Reviews</p>
                    <p className="text-2xl font-bold mt-1">{stats.total_count}</p>
                </div>
                <div className="bg-card rounded-xl border border-yellow-500/20 p-4">
                    <p className="text-xs text-yellow-500 uppercase font-semibold">Pending</p>
                    <p className="text-2xl font-bold mt-1 text-yellow-500">{stats.pending_count}</p>
                </div>
                <div className="bg-card rounded-xl border border-green-500/20 p-4">
                    <p className="text-xs text-green-500 uppercase font-semibold">Approved</p>
                    <p className="text-2xl font-bold mt-1 text-green-500">{stats.approved_count}</p>
                </div>
                <div className="bg-card rounded-xl border border-red-500/20 p-4">
                    <p className="text-xs text-red-500 uppercase font-semibold">Rejected</p>
                    <p className="text-2xl font-bold mt-1 text-red-500">{stats.rejected_count}</p>
                </div>
                <div className="bg-card rounded-xl border border-blue-500/20 p-4">
                    <p className="text-xs text-blue-500 uppercase font-semibold">Avg Rating</p>
                    <p className="text-2xl font-bold mt-1 text-blue-500">{stats.average_rating.toFixed(1)} ⭐</p>
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <div>
                        <p className="text-sm font-medium text-red-500">Error loading reviews</p>
                        <p className="text-xs text-red-500/80 mt-1">{error}</p>
                    </div>
                    <button onClick={loadReviews} className="ml-auto px-3 py-1 bg-red-500/20 hover:bg-red-500/30 rounded text-xs font-medium text-red-500">
                        Retry
                    </button>
                </div>
            )}

            {/* Reviews Grid */}
            {!loading && !error && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {reviews.map((review) => (
                    <div key={review.id} className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all flex group shadow-sm hover:shadow-xl hover:shadow-black/40">
                        <div className="w-1/3 bg-accent/20 relative flex items-center justify-center border-r">
                            {review.product?.image_url ? (
                                <img src={review.product.image_url} alt={review.product.name} className="w-full h-full object-cover" />
                            ) : (
                                <ShoppingBag className="w-12 h-12 text-muted-foreground/20 group-hover:scale-110 transition-transform duration-500" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            <div className="absolute top-3 left-3 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded-md text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1">
                                <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                                {review.rating}/5
                            </div>
                            <div className={cn(
                                "absolute bottom-3 left-3 px-2 py-0.5 backdrop-blur-md rounded-md text-[10px] font-bold uppercase tracking-wider",
                                review.status === 'approved' && "bg-green-500/80 text-white",
                                review.status === 'pending' && "bg-yellow-500/80 text-white",
                                review.status === 'rejected' && "bg-red-500/80 text-white"
                            )}>
                                {review.status}
                            </div>
                        </div>

                        <div className="flex-1 p-5 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{review.product?.name || 'Product'}</h3>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">
                                    By <span className="text-foreground font-medium">{review.buyer?.full_name || 'Anonymous'}</span>
                                </p>

                                <div className="p-3 bg-accent/30 rounded-lg border border-border/40 mb-4">
                                    <p className="text-sm text-foreground line-clamp-3">{review.comment}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-border/40">
                                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                                    <Clock className="w-3 h-3" />
                                    {formatDate(review.created_at)}
                                </div>
                                <div className="flex gap-2">
                                    {review.status === 'pending' && (
                                        <>
                                            <button 
                                                onClick={() => handleReject(review.id)}
                                                disabled={actionLoading}
                                                className="p-2 bg-accent hover:bg-black rounded-lg transition-colors border group/btn disabled:opacity-50"
                                            >
                                                <XCircle className="w-4 h-4 text-muted-foreground group-hover/btn:text-red-500 transition-colors" />
                                            </button>
                                            <button 
                                                onClick={() => handleApprove(review.id)}
                                                disabled={actionLoading}
                                                className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-xs font-bold hover:scale-105 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                                            >
                                                {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                                                Approve
                                            </button>
                                        </>
                                    )}
                                    {review.status !== 'pending' && (
                                        <button 
                                            onClick={() => handleDelete(review.id)}
                                            disabled={actionLoading}
                                            className="px-3 py-1 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded text-xs font-medium transition-colors disabled:opacity-50"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            )}

            {/* Empty State */}
            {!loading && !error && reviews.length === 0 && (
                <div className="py-20 text-center bg-card rounded-2xl border border-dashed border-border">
                    <CheckCircle2 className="w-16 h-16 text-green-500/30 mx-auto mb-4" />
                    <h2 className="text-xl font-bold">No reviews found</h2>
                    <p className="text-muted-foreground">There are no product reviews to display.</p>
                </div>
            )}

            {/* Pagination */}
            {!loading && !error && totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        Page <span className="text-foreground font-medium">{page}</span> of {totalPages}
                    </p>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="p-2 border rounded-md disabled:opacity-30 hover:bg-accent transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="p-2 border rounded-md disabled:opacity-30 hover:bg-accent transition-colors"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductReviews;
