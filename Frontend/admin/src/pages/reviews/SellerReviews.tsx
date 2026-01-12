import { useState, useEffect } from 'react';
import {
    XCircle,
    Clock,
    Eye,
    FileText,
    MapPin,
    AlertTriangle,
    Loader2,
    AlertCircle,
    Star,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    User
} from 'lucide-react';
import { getSellerReviews, getSellerReviewStats, approveSellerReview, rejectSellerReview, deleteSellerReview, type SellerReview } from '../../lib/reviewsApi';
import { cn } from '../../lib/utils';

const SellerReviews = () => {
    const [reviews, setReviews] = useState<SellerReview[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [stats, setStats] = useState({ pending_count: 0, approved_count: 0, rejected_count: 0, total_count: 0, average_rating: 0 });
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [actionLoading, setActionLoading] = useState(false);
    const [selectedReview, setSelectedReview] = useState<SellerReview | null>(null);

    useEffect(() => {
        loadReviews();
        loadStats();
    }, [page]);

    async function loadReviews() {
        try {
            setLoading(true);
            setError(null);
            const data = await getSellerReviews(undefined, page, 20);
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
            const data = await getSellerReviewStats();
            setStats(data);
        } catch (err) {
            console.error('Failed to load stats:', err);
        }
    }

    async function handleApprove(reviewId: string) {
        if (!confirm('Approve this seller review?')) return;
        
        try {
            setActionLoading(true);
            await approveSellerReview(reviewId);
            await loadReviews();
            await loadStats();
            setSelectedReview(null);
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
            await rejectSellerReview(reviewId, reason);
            await loadReviews();
            await loadStats();
            setSelectedReview(null);
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
            await deleteSellerReview(reviewId);
            await loadReviews();
            await loadStats();
            setSelectedReview(null);
            alert('Review deleted successfully!');
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Failed to delete review');
        } finally {
            setActionLoading(false);
        }
    }

    function formatDate(dateString: string) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Seller Reviews</h1>
                <p className="text-muted-foreground mt-1">Moderate customer reviews for sellers.</p>
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

            {/* Reviews Table */}
            {!loading && !error && (
            <div className="bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-muted/50 text-left border-b">
                                <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Seller</th>
                                <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Reviewer</th>
                                <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Rating</th>
                                <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y border-border/40">
                            {reviews.map((review) => (
                                <tr key={review.id} className="hover:bg-accent/40 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border group-hover:border-primary/50 transition-colors overflow-hidden">
                                                {review.seller?.avatar_url ? (
                                                    <img src={review.seller.avatar_url} alt="seller" />
                                                ) : (
                                                    <User className="w-5 h-5 text-primary" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">{review.seller?.business_name || review.seller?.full_name || 'Unknown'}</p>
                                                <p className="text-xs text-muted-foreground">{review.seller?.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-medium">{review.buyer?.full_name || 'Anonymous'}</p>
                                        <p className="text-xs text-muted-foreground">{review.buyer?.email}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                            <span className="text-sm font-bold">{review.rating}/5</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border",
                                            review.status === 'approved' && "bg-green-500/10 text-green-500 border-green-500/20",
                                            review.status === 'pending' && "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
                                            review.status === 'rejected' && "bg-red-500/10 text-red-500 border-red-500/20"
                                        )}>
                                            {review.status === 'approved' && <CheckCircle2 className="w-3 h-3" />}
                                            {review.status === 'pending' && <Clock className="w-3 h-3" />}
                                            {review.status === 'rejected' && <XCircle className="w-3 h-3" />}
                                            {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">
                                        {formatDate(review.created_at)}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => setSelectedReview(review)}
                                            className="inline-flex items-center gap-2 bg-accent hover:bg-primary hover:text-primary-foreground px-3 py-1.5 rounded-md text-sm font-medium transition-all"
                                        >
                                            <Eye className="w-4 h-4" />
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            )}

            {/* Empty State */}
            {!loading && !error && reviews.length === 0 && (
                <div className="py-20 text-center bg-card rounded-2xl border border-dashed border-border">
                    <CheckCircle2 className="w-16 h-16 text-green-500/30 mx-auto mb-4" />
                    <h2 className="text-xl font-bold">No reviews found</h2>
                    <p className="text-muted-foreground">There are no seller reviews to display.</p>
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

            {/* Review Detail Modal */}
            {selectedReview && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-card w-full max-w-2xl rounded-2xl border border-border overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b flex justify-between items-center bg-accent/30">
                            <div>
                                <h3 className="text-xl font-bold">Seller Review Details</h3>
                                <p className="text-sm text-muted-foreground">Submitted on {formatDate(selectedReview.created_at)}</p>
                            </div>
                            <button onClick={() => setSelectedReview(null)} className="p-2 hover:bg-accent rounded-full transition-colors">
                                <XCircle className="w-6 h-6 text-muted-foreground" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="flex items-center gap-4 p-4 bg-accent/30 rounded-xl">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border overflow-hidden">
                                    {selectedReview.seller?.avatar_url ? (
                                        <img src={selectedReview.seller.avatar_url} alt="seller" className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-8 h-8 text-primary" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-lg">{selectedReview.seller?.business_name || selectedReview.seller?.full_name}</p>
                                    <p className="text-sm text-muted-foreground">{selectedReview.seller?.email}</p>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                                    <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                                    <span className="text-xl font-bold text-yellow-500">{selectedReview.rating}/5</span>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold uppercase text-primary mb-2">Review Comment</h4>
                                <div className="p-4 bg-accent/20 rounded-lg border border-border">
                                    <p className="text-sm text-foreground leading-relaxed">{selectedReview.comment}</p>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold uppercase text-primary mb-2">Reviewer Information</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 text-sm">
                                        <span className="w-24 text-muted-foreground font-medium">Name</span>
                                        <span className="font-semibold">{selectedReview.buyer?.full_name || 'Anonymous'}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <span className="w-24 text-muted-foreground font-medium">Email</span>
                                        <span className="font-semibold">{selectedReview.buyer?.email || 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <span className="w-24 text-muted-foreground font-medium">Status</span>
                                        <span className={cn(
                                            "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border",
                                            selectedReview.status === 'approved' && "bg-green-500/10 text-green-500 border-green-500/20",
                                            selectedReview.status === 'pending' && "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
                                            selectedReview.status === 'rejected' && "bg-red-500/10 text-red-500 border-red-500/20"
                                        )}>
                                            {selectedReview.status.charAt(0).toUpperCase() + selectedReview.status.slice(1)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t bg-black/10 flex gap-3">
                            {selectedReview.status === 'pending' ? (
                                <>
                                    <button 
                                        onClick={() => handleReject(selectedReview.id)}
                                        disabled={actionLoading}
                                        className="flex-1 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white py-2.5 rounded-xl font-bold transition-all border border-red-500/20 disabled:opacity-50"
                                    >
                                        {actionLoading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Reject Review'}
                                    </button>
                                    <button 
                                        onClick={() => handleApprove(selectedReview.id)}
                                        disabled={actionLoading}
                                        className="flex-1 bg-primary text-primary-foreground hover:opacity-90 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                                    >
                                        {actionLoading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Approve Review'}
                                    </button>
                                </>
                            ) : (
                                <button 
                                    onClick={() => handleDelete(selectedReview.id)}
                                    disabled={actionLoading}
                                    className="flex-1 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white py-2.5 rounded-xl font-bold transition-all border border-red-500/20 disabled:opacity-50"
                                >
                                    {actionLoading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Delete Review'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SellerReviews;
