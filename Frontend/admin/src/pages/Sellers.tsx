import { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
    CheckCircle,
    XCircle,
    Clock,
    Loader2,
    AlertCircle,
    X
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Seller {
    id: string;
    full_name: string;
    email: string;
    phone?: string;
    role: string;
    verification_status?: string;
    seller_verification_status?: string;
    business_name?: string;
    avatar_url?: string;
    created_at: string;
    city?: string;
    state?: string;
    rejection_reason?: string;
}

const Sellers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sellers, setSellers] = useState<Seller[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const [actionLoading, setActionLoading] = useState(false);
    const limit = 20;

    useEffect(() => {
        loadSellers();
    }, [page]);

    async function loadSellers() {
        console.log('🔄 loadSellers called, page:', page);
        try {
            setLoading(true);
            setError(null);
            
            const offset = (page - 1) * limit;
            console.log('📊 Query params:', { offset, limit, page });
            
            const { data, error: queryError, count } = await supabase
                .from('profiles')
                .select('*', { count: 'exact' })
                .eq('role', 'client')
                .order('created_at', { ascending: false })
                .range(offset, offset + limit - 1);
            
            console.log('📥 Response:', { data, error: queryError, count });
            
            if (queryError) {
                console.error('❌ Query error:', queryError);
                throw queryError;
            }
            
            console.log('✅ Setting sellers:', data?.length || 0, 'items');
            setSellers(data || []);
            setTotalPages(Math.ceil((count || 0) / limit));
        } catch (err) {
            console.error('💥 loadSellers error:', err);
            setError(err as Error);
        } finally {
            setLoading(false);
            console.log('🏁 loadSellers complete');
        }
    }

    async function handleApprove(sellerId: string) {
        if (!confirm('Are you sure you want to approve this seller? They will be able to create products.')) return;
        
        try {
            setActionLoading(true);
            const { error: updateError } = await supabase
                .from('profiles')
                .update({ 
                    seller_verification_status: 'verified',
                    seller_verified_at: new Date().toISOString()
                })
                .eq('id', sellerId);
            
            if (updateError) throw updateError;
            await loadSellers();
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
            const { error: updateError } = await supabase
                .from('profiles')
                .update({ 
                    seller_verification_status: 'rejected',
                    seller_rejection_reason: rejectReason,
                    seller_verified_at: new Date().toISOString()
                })
                .eq('id', selectedSeller.id);
            
            if (updateError) throw updateError;
            setShowRejectModal(false);
            setRejectReason('');
            setSelectedSeller(null);
            await loadSellers();
            alert('Seller rejected successfully!');
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Failed to reject seller');
        } finally {
            setActionLoading(false);
        }
    }

    const filteredSellers = sellers.filter(seller =>
        seller.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seller.business_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seller.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Sellers Management</h1>
                    <p className="text-muted-foreground mt-1">Manage and monitor all marketplace sellers.</p>
                </div>
                <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-all shadow-lg shadow-primary/20 group">
                    <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                    Add New Seller
                </button>
            </div>

            <div className="bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden">
                {/* Table Filters */}
                <div className="p-4 border-b flex flex-col md:flex-row justify-between items-center gap-4 bg-black/5">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search sellers by name, email or business..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            disabled={loading}
                            className="w-full bg-background border rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <button className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm hover:bg-accent transition-colors flex-1 md:flex-none" disabled={loading}>
                            <Filter className="w-4 h-4" />
                            Filters
                        </button>
                        <div className="h-8 w-[1px] bg-border hidden md:block"></div>
                        <p className="text-sm text-muted-foreground hidden lg:block">
                            Showing <span className="text-foreground font-medium">{filteredSellers.length}</span> of {sellers.length} sellers
                        </p>
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
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 m-4 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        <div>
                            <p className="text-sm font-medium text-red-500">Error loading sellers</p>
                            <p className="text-xs text-red-500/80 mt-1">{error.message}</p>
                        </div>
                        <button onClick={loadSellers} className="ml-auto px-3 py-1 bg-red-500/20 hover:bg-red-500/30 rounded text-xs font-medium text-red-500">
                            Retry
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && filteredSellers.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">No sellers found</p>
                    </div>
                )}

                {/* Sellers Table */}
                {!loading && !error && filteredSellers.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-muted/50 text-left border-b">
                                <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Seller</th>
                                <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Business</th>
                                <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Joined</th>
                                <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y border-border/40">
                            {filteredSellers.map((seller) => (
                                <tr key={seller.id} className="hover:bg-accent/40 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border group-hover:border-primary/50 transition-colors overflow-hidden">
                                                {seller.avatar_url ? (
                                                    <img src={seller.avatar_url} alt="avatar" />
                                                ) : (
                                                    <span className="text-sm font-bold text-primary">{seller.full_name?.charAt(0) || 'S'}</span>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">{seller.full_name || 'N/A'}</p>
                                                <p className="text-xs text-muted-foreground">{seller.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-medium">{seller.business_name || 'Not provided'}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                                            seller.verification_status === 'approved' 
                                                ? 'bg-green-500/10 text-green-500 border-green-500/20'
                                                : seller.verification_status === 'rejected'
                                                ? 'bg-red-500/10 text-red-500 border-red-500/20'
                                                : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                        }`}>
                                            {seller.verification_status === 'approved' && <CheckCircle className="w-3 h-3" />}
                                            {seller.verification_status === 'pending' && <Clock className="w-3 h-3" />}
                                            {seller.verification_status === 'rejected' && <XCircle className="w-3 h-3" />}
                                            {seller.verification_status ? seller.verification_status.charAt(0).toUpperCase() + seller.verification_status.slice(1) : 'Unknown'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">
                                        {new Date(seller.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {seller.verification_status === 'pending' && (
                                                <>
                                                    <button 
                                                        onClick={() => handleApprove(seller.id)}
                                                        disabled={actionLoading}
                                                        className="px-3 py-1 bg-green-500/10 text-green-500 hover:bg-green-500/20 rounded text-xs font-medium transition-colors disabled:opacity-50"
                                                        title="Approve Seller"
                                                    >
                                                        {actionLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Approve'}
                                                    </button>
                                                    <button 
                                                        onClick={() => {
                                                            setSelectedSeller(seller);
                                                            setShowRejectModal(true);
                                                        }}
                                                        disabled={actionLoading}
                                                        className="px-3 py-1 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded text-xs font-medium transition-colors disabled:opacity-50"
                                                        title="Reject Seller"
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                            {seller.verification_status === 'rejected' && seller.rejection_reason && (
                                                <button className="px-3 py-1 bg-red-500/10 text-red-500 rounded text-xs font-medium" title={seller.rejection_reason}>
                                                    View Reason
                                                </button>
                                            )}
                                            <button className="p-2 hover:bg-accent rounded-md transition-all text-muted-foreground">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                )}

                {/* Pagination */}
                {!loading && !error && totalPages > 1 && (
                <div className="p-4 border-t flex items-center justify-between bg-black/5">
                    <p className="text-xs text-muted-foreground">
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

            {/* Reject Modal */}
            {showRejectModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-card rounded-xl border border-border max-w-md w-full p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold">Reject Seller</h3>
                            <button onClick={() => setShowRejectModal(false)} className="p-1 hover:bg-accent rounded">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Please provide a reason for rejecting <span className="font-medium text-foreground">{selectedSeller?.full_name}</span>
                        </p>
                        <textarea
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            placeholder="Enter rejection reason (e.g., incomplete documentation, invalid business registration)..."
                            className="w-full bg-background border rounded-lg p-3 text-sm min-h-[120px] focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowRejectModal(false)}
                                className="flex-1 px-4 py-2 border rounded-lg text-sm font-medium hover:bg-accent transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReject}
                                disabled={!rejectReason.trim() || actionLoading}
                                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                                Reject Seller
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sellers;
