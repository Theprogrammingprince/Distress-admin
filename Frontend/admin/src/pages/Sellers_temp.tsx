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
import { cn } from '../lib/utils';
import { supabaseAdmin } from '../lib/supabase';

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
        console.log('ðŸ”„ loadSellers called, page:', page);
        try {
            setLoading(true);
            setError(null);
            
            const offset = (page - 1) * limit;
            console.log('ðŸ“Š Query params:', { offset, limit, page });
            
            const { data, error: queryError, count } = await supabase
                .from('profiles')
                .select('*', { count: 'exact' })
                .eq('role', 'client')
                .order('created_at', { ascending: false })
                .range(offset, offset + limit - 1);
            
            console.log('ðŸ“¥ Response:', { data, error: queryError, count });
            
            if (queryError) {
                console.error('âŒ Query error:', queryError);
                throw queryError;
            }
            
            console.log('âœ… Setting sellers:', data?.length || 0, 'items');
            setSellers(data || []);
            setTotalPages(Math.ceil((count || 0) / limit));
        } catch (err) {
            console.error('ðŸ’¥ loadSellers error:', err);
            setError(err as Error);
        } finally {
            setLoading(false);
            console.log('ðŸ loadSellers complete');
        }
    }

    async function handleApprove(sellerId: string) {
        if (!confirm('Are you sure you want to approve this seller? They will be able to create products.')) return;
        
        try {
            setActionLoading(true);
            const { error: updateError } = await supabaseAdmin
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
            const { error: updateError } = await supabaseAdmin
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
                            <p className="text-xs text-red-500/80 mt-1">{error}</p>
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
