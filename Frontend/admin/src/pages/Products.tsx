import { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Filter,
    Package,
    ShieldCheck,
    ShieldAlert,
    Clock,
    Loader2,
    X,
    AlertCircle
} from 'lucide-react';
import { cn } from '../lib/utils';
import { getAllProducts, approveProduct, rejectProduct, type Product } from '../lib/adminApi';

const Products = () => {
    const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const [actionLoading, setActionLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        loadProducts();
    }, [activeTab, page]);

    async function loadProducts() {
        try {
            setLoading(true);
            setError(null);
            const status = activeTab === 'all' ? undefined : activeTab;
            const data = await getAllProducts(status, page, 20);
            setProducts(data.products);
            setTotalPages(data.totalPages);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load products');
        } finally {
            setLoading(false);
        }
    }

    async function handleApprove(productId: string) {
        if (!confirm('Are you sure you want to approve this product?')) return;
        
        try {
            setActionLoading(true);
            await approveProduct(productId);
            await loadProducts();
            alert('Product approved successfully!');
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Failed to approve product');
        } finally {
            setActionLoading(false);
        }
    }

    async function handleReject() {
        if (!selectedProduct || !rejectReason.trim()) {
            alert('Please provide a rejection reason');
            return;
        }

        try {
            setActionLoading(true);
            await rejectProduct(selectedProduct.id, rejectReason);
            setShowRejectModal(false);
            setRejectReason('');
            setSelectedProduct(null);
            await loadProducts();
            alert('Product rejected successfully!');
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Failed to reject product');
        } finally {
            setActionLoading(false);
        }
    }

    const filteredProducts = products.filter(p => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
            p.name.toLowerCase().includes(query) ||
            p.seller.full_name.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)
        );
    });

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Products Management</h1>
                    <p className="text-muted-foreground mt-1">Review, verify, and manage all marketplace listings.</p>
                </div>
                <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-all shadow-lg shadow-primary/20 group">
                    <Plus className="w-4 h-4" />
                    Post New Product
                </button>
            </div>

            <div className="flex flex-col gap-6">
                {/* Tabs */}
                <div className="flex border-b border-border/50 overflow-x-auto scroller-hidden">
                    {(['all', 'pending', 'approved', 'rejected'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "px-6 py-3 text-sm font-medium transition-all relative whitespace-nowrap",
                                activeTab === tab
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                            )}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-[0_0_10px_rgba(255,0,0,0.5)]"></div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Filters/Search Row */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                    <div className="relative w-full lg:max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search products by name or seller..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-card border rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full lg:w-auto">
                        <select className="bg-card border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary flex-1 lg:flex-none">
                            <option>All Categories</option>
                            <option>Electronics</option>
                            <option>Fashion</option>
                            <option>Home & Garden</option>
                        </select>
                        <button className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm hover:bg-accent transition-colors">
                            <Filter className="w-4 h-4" />
                            More Filters
                        </button>
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
                            <p className="text-sm font-medium text-red-500">Error loading products</p>
                            <p className="text-xs text-red-500/80 mt-1">{error}</p>
                        </div>
                        <button onClick={loadProducts} className="ml-auto px-3 py-1 bg-red-500/20 hover:bg-red-500/30 rounded text-xs font-medium text-red-500">
                            Retry
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                        <Package className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                        <p className="text-muted-foreground">No products found</p>
                    </div>
                )}

                {/* Products Grid/Table */}
                {!loading && !error && filteredProducts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="bg-card rounded-xl border border-border/50 overflow-hidden hover:border-primary/30 transition-all group hover:shadow-lg hover:shadow-black/20">
                            <div className="aspect-video bg-accent/30 relative flex items-center justify-center">
                                {product.image_url ? (
                                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                                ) : (
                                    <Package className="w-12 h-12 text-muted-foreground/30" />
                                )}
                                <div className="absolute top-3 left-3">
                                    <span className={cn(
                                        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold border backdrop-blur-md",
                                        product.verification_status === 'approved' && "bg-green-500/10 text-green-500 border-green-500/20",
                                        product.verification_status === 'pending' && "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
                                        product.verification_status === 'rejected' && "bg-red-500/10 text-red-500 border-red-500/20"
                                    )}>
                                        {product.verification_status === 'approved' && <ShieldCheck className="w-3 h-3" />}
                                        {product.verification_status === 'pending' && <Clock className="w-3 h-3" />}
                                        {product.verification_status === 'rejected' && <ShieldAlert className="w-3 h-3" />}
                                        {product.verification_status}
                                    </span>
                                </div>
                                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-white">
                                    {product.currency} {product.price.toLocaleString()}
                                </div>
                            </div>

                            <div className="p-4 space-y-4">
                                <div>
                                    <h3 className="font-bold text-lg truncate">{product.name}</h3>
                                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                                        by <span className="text-foreground font-medium">{product.seller.full_name}</span>
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">{product.seller.email}</p>
                                </div>

                                <div className="flex justify-between items-center text-xs text-muted-foreground border-y border-border/20 py-2">
                                    <span>Stock: <span className="text-foreground font-medium">{product.stock}</span></span>
                                    <span>Category: <span className="text-foreground font-medium">{product.category}</span></span>
                                </div>

                                {product.verification_status === 'pending' && (
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => handleApprove(product.id)}
                                            disabled={actionLoading}
                                            className="flex-1 flex items-center justify-center gap-2 bg-green-500/10 text-green-500 hover:bg-green-500/20 p-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
                                        >
                                            {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                                            Approve
                                        </button>
                                        <button 
                                            onClick={() => {
                                                setSelectedProduct(product);
                                                setShowRejectModal(true);
                                            }}
                                            disabled={actionLoading}
                                            className="flex-1 flex items-center justify-center gap-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 p-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
                                        >
                                            <X className="w-4 h-4" />
                                            Reject
                                        </button>
                                    </div>
                                )}

                                {product.verification_status === 'rejected' && product.rejection_reason && (
                                    <div className="bg-red-500/10 border border-red-500/20 rounded p-2">
                                        <p className="text-xs text-red-500 font-medium mb-1">Rejection Reason:</p>
                                        <p className="text-xs text-red-500/80">{product.rejection_reason}</p>
                                    </div>
                                )}

                                {product.verification_status === 'approved' && (
                                    <div className="bg-green-500/10 border border-green-500/20 rounded p-2 text-center">
                                        <p className="text-xs text-green-500 font-medium">✓ Verified Product</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                )}

                {/* Pagination */}
                {!loading && !error && totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-6">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <span className="text-sm text-muted-foreground">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>

            {/* Reject Modal */}
            {showRejectModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-card rounded-xl border border-border max-w-md w-full p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold">Reject Product</h3>
                            <button onClick={() => setShowRejectModal(false)} className="p-1 hover:bg-accent rounded">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Please provide a reason for rejecting <span className="font-medium text-foreground">{selectedProduct?.name}</span>
                        </p>
                        <textarea
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            placeholder="Enter rejection reason (e.g., unclear images, incomplete information)..."
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
                                Reject Product
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;
