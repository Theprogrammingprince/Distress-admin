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
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    User,
    X
} from 'lucide-react';
import { getPendingSellers, getSellerStats, approveSeller, rejectSeller } from '../../lib/sellerApi';

interface Seller {
    id: string;
    full_name: string;
    email: string;
    phone?: string;
    role: string;
    avatar_url?: string;
    created_at: string;
    business_name?: string;
    business_reg_number?: string;
    nin?: string;
    street_address?: string;
    city?: string;
    state?: string;
    verification_status?: string;
    seller_verification_status?: string;
    rejection_reason?: string;
}

const SellerReviews = () => {
    const [sellers, setSellers] = useState<Seller[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [stats, setStats] = useState({ verified_count: 0, pending_count: 0, unverified_count: 0, total_count: 0 });
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [actionLoading, setActionLoading] = useState(false);
    const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectReason, setRejectReason] = useState('');

    useEffect(() => {
        loadSellers();
        loadStats();
    }, [page]);

    async function loadSellers() {
        try {
            setLoading(true);
            setError(null);
            const data = await getPendingSellers(page, 20);
            setSellers(data.sellers);
            setTotalPages(data.totalPages);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load pending sellers');
        } finally {
            setLoading(false);
        }
    }

    async function loadStats() {
        try {
            const data = await getSellerStats();
            setStats(data);
        } catch (err) {
            console.error('Failed to load stats:', err);
        }
    }

    async function handleApprove(sellerId: string) {
        if (!confirm('Approve this seller? They will be able to create products.')) return;
        
        try {
            setActionLoading(true);
            await approveSeller(sellerId);
            await loadSellers();
            await loadStats();
            setSelectedSeller(null);
            alert('Seller approved successfully!');
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Failed to approve seller');
        } finally {
            setActionLoading(false);
        }
    }

    async function handleReject() {
        if (!selectedSeller || !rejectReason.trim()) {
            alert('Please provide a rejection reason');
            return;
        }
        
        try {
            setActionLoading(true);
            await rejectSeller(selectedSeller.id, rejectReason);
            await loadSellers();
            await loadStats();
            setShowRejectModal(false);
            setRejectReason('');
            setSelectedSeller(null);
            alert('Seller rejected successfully!');
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Failed to reject seller');
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
                <h1 className="text-3xl font-bold tracking-tight">Pending Sellers</h1>
                <p className="text-muted-foreground mt-1">Review and approve sellers waiting for verification.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-card rounded-xl border border-border p-4">
                    <p className="text-xs text-muted-foreground uppercase font-semibold">Total Sellers</p>
                    <p className="text-2xl font-bold mt-1">{stats.total_count}</p>
                </div>
                <div className="bg-card rounded-xl border border-yellow-500/20 p-4">
                    <p className="text-xs text-yellow-500 uppercase font-semibold">Pending</p>
                    <p className="text-2xl font-bold mt-1 text-yellow-500">{stats.pending_count}</p>
                </div>
                <div className="bg-card rounded-xl border border-green-500/20 p-4">
                    <p className="text-xs text-green-500 uppercase font-semibold">Verified</p>
                    <p className="text-2xl font-bold mt-1 text-green-500">{stats.verified_count}</p>
                </div>
                <div className="bg-card rounded-xl border border-red-500/20 p-4">
                    <p className="text-xs text-red-500 uppercase font-semibold">Unverified</p>
                    <p className="text-2xl font-bold mt-1 text-red-500">{stats.unverified_count}</p>
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
                        <p className="text-sm font-medium text-red-500">Error loading sellers</p>
                        <p className="text-xs text-red-500/80 mt-1">{error}</p>
                    </div>
                    <button onClick={loadSellers} className="ml-auto px-3 py-1 bg-red-500/20 hover:bg-red-500/30 rounded text-xs font-medium text-red-500">
                        Retry
                    </button>
                </div>
            )}

            {/* Sellers Cards */}
            {!loading && !error && (
            <div className="grid grid-cols-1 gap-6">
                {sellers.map((seller) => (
                    <div key={seller.id} className="bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden hover:border-primary/30 transition-all">
                        {/* Card Header */}
                        <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 border-b">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20 overflow-hidden">
                                        {seller.avatar_url ? (
                                            <img src={seller.avatar_url} alt="seller" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-2xl font-bold text-primary">{seller.full_name?.charAt(0) || 'S'}</span>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">{seller.full_name || 'N/A'}</h3>
                                        <p className="text-sm text-muted-foreground">{seller.email}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                                                <Clock className="w-3 h-3" />
                                                Pending Review
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                Joined {formatDate(seller.created_at)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card Body - Seller Details */}
                        <div className="p-4 md:p-6">
                            {/* Rejection Reason if exists */}
                            {seller.rejection_reason && (
                                <div className="mb-4 bg-red-500/10 border border-red-500/20 rounded-lg p-3 md:p-4">
                                    <p className="text-xs font-semibold text-red-500 uppercase mb-1 flex items-center gap-2">
                                        <AlertTriangle className="w-3 h-3" />
                                        Rejection Reason
                                    </p>
                                    <p className="text-sm text-red-600 dark:text-red-400">{seller.rejection_reason}</p>
                                </div>
                            )}

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                                {/* Personal Information */}
                                <div className="space-y-3 md:space-y-4">
                                    <h4 className="text-xs md:text-sm font-semibold uppercase text-primary flex items-center gap-2">
                                        <User className="w-3 h-3 md:w-4 md:h-4" />
                                        Personal Information
                                    </h4>
                                    <div className="space-y-2 md:space-y-3 pl-4 md:pl-6">
                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Full Name</p>
                                            <p className="text-sm font-medium break-words">{seller.full_name || 'Not provided'}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Email</p>
                                            <p className="text-sm font-medium break-all">{seller.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Phone</p>
                                            <p className="text-sm font-medium">{seller.phone || 'Not provided'}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">NIN</p>
                                            <p className="text-sm font-medium">{seller.nin || 'Not provided'}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Business Information */}
                                <div className="space-y-3 md:space-y-4">
                                    <h4 className="text-xs md:text-sm font-semibold uppercase text-primary flex items-center gap-2">
                                        <FileText className="w-3 h-3 md:w-4 md:h-4" />
                                        Business Information
                                    </h4>
                                    <div className="space-y-2 md:space-y-3 pl-4 md:pl-6">
                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Business Name</p>
                                            <p className="text-sm font-medium break-words">{seller.business_name || 'Not provided'}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Registration Number</p>
                                            <p className="text-sm font-medium">{seller.business_reg_number || 'Not provided'}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Street Address</p>
                                            <p className="text-sm font-medium break-words">{seller.street_address || 'Not provided'}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Location</p>
                                            <p className="text-sm font-medium flex items-center gap-1">
                                                {seller.city && seller.state ? (
                                                    <>
                                                        <MapPin className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                                                        <span className="break-words">{seller.city}, {seller.state}</span>
                                                    </>
                                                ) : (
                                                    'Not provided'
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card Footer - Actions */}
                        {(seller.verification_status === 'pending' || seller.verification_status === 'rejected') && (
                        <div className="p-4 md:p-6 border-t bg-black/5 flex flex-col sm:flex-row gap-2 md:gap-3">
                            <button
                                onClick={() => {
                                    setSelectedSeller(seller);
                                    setShowRejectModal(true);
                                }}
                                disabled={actionLoading || seller.verification_status === 'rejected'}
                                className="flex-1 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white py-2.5 md:py-3 rounded-xl text-sm md:text-base font-bold transition-all border border-red-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                <XCircle className="w-4 h-4" />
                                <span className="hidden sm:inline">Reject Seller</span>
                                <span className="sm:hidden">Reject</span>
                            </button>
                            <button
                                onClick={() => handleApprove(seller.id)}
                                disabled={actionLoading}
                                className="flex-1 bg-primary text-primary-foreground hover:opacity-90 py-2.5 md:py-3 rounded-xl text-sm md:text-base font-bold transition-all shadow-lg shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                                    <>
                                        <CheckCircle2 className="w-4 h-4" />
                                        <span className="hidden sm:inline">Approve Seller</span>
                                        <span className="sm:hidden">Approve</span>
                                    </>
                                )}
                            </button>
                        </div>
                        )}
                    </div>
                ))}
            </div>
            )}

            {/* Empty State */}
            {!loading && !error && sellers.length === 0 && (
                <div className="py-20 text-center bg-card rounded-2xl border border-dashed border-border">
                    <CheckCircle2 className="w-16 h-16 text-green-500/30 mx-auto mb-4" />
                    <h2 className="text-xl font-bold">No pending sellers</h2>
                    <p className="text-muted-foreground">There are no sellers waiting for approval.</p>
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

            {/* Reject Modal */}
            {showRejectModal && selectedSeller && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-card w-full max-w-lg rounded-2xl border border-border overflow-hidden shadow-2xl">
                        <div className="p-6 border-b flex justify-between items-center bg-red-500/5">
                            <div>
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    <AlertTriangle className="w-5 h-5 text-red-500" />
                                    Reject Seller Application
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Rejecting: <span className="font-semibold">{selectedSeller.full_name}</span>
                                </p>
                            </div>
                            <button onClick={() => {
                                setShowRejectModal(false);
                                setRejectReason('');
                            }} className="p-2 hover:bg-accent rounded-full transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="text-sm font-semibold mb-2 block">
                                    Rejection Reason <span className="text-red-500">*</span>
                                </label>
                                <p className="text-xs text-muted-foreground mb-2">
                                    Provide a clear reason for rejection. This will be sent to the seller.
                                </p>
                                <textarea
                                    value={rejectReason}
                                    onChange={(e) => setRejectReason(e.target.value)}
                                    placeholder="e.g., Incomplete business registration documents, Invalid NIN, Business address not verifiable..."
                                    className="w-full bg-background border rounded-lg p-3 text-sm min-h-[120px] focus:outline-none focus:ring-2 focus:ring-red-500"
                                    autoFocus
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    {rejectReason.length} characters
                                </p>
                            </div>

                            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                                <p className="text-xs text-yellow-600 dark:text-yellow-500 flex items-start gap-2">
                                    <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    <span>
                                        The seller will be notified via email about the rejection and can reapply after addressing the issues mentioned.
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className="p-6 border-t bg-black/5 flex gap-3">
                            <button
                                onClick={() => {
                                    setShowRejectModal(false);
                                    setRejectReason('');
                                }}
                                className="flex-1 bg-accent hover:bg-accent/80 py-3 rounded-xl font-bold transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReject}
                                disabled={actionLoading || !rejectReason.trim()}
                                className="flex-1 bg-red-500 text-white hover:bg-red-600 py-3 rounded-xl font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {actionLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <>
                                        <XCircle className="w-4 h-4" />
                                        Confirm Rejection
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SellerReviews;
