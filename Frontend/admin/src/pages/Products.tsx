import { useState } from 'react';
import {
    Plus,
    Search,
    Filter,
    Package,
    ShieldCheck,
    ShieldAlert,
    Edit,
    Trash2,
    Clock
} from 'lucide-react';
import { cn } from '../lib/utils';

const mockProducts = [
    { id: '1', name: 'RTX 4090 GPU', seller: 'John Doe', price: 1599, status: 'verified', stock: 5, category: 'Electronics', added: '2025-12-28' },
    { id: '2', name: 'Designer Leather Jacket', seller: 'Jane Smith', price: 299, status: 'unverified', stock: 12, category: 'Fashion', added: '2026-01-05' },
    { id: '3', name: 'Wireless Headphones', seller: 'Mike Ross', price: 150, status: 'verified', stock: 50, category: 'Electronics', added: '2025-11-20' },
    { id: '4', name: 'Mechanical Keyboard', seller: 'John Doe', price: 120, status: 'verified', stock: 20, category: 'Electronics', added: '2025-12-30' },
    { id: '5', name: 'Smartphone Pro Max', seller: 'Sarah Connor', price: 1199, status: 'pending', stock: 3, category: 'Electronics', added: '2026-01-08' },
];

const Products = () => {
    const [activeTab, setActiveTab] = useState('all');

    const filteredProducts = mockProducts.filter(p => {
        if (activeTab === 'all') return true;
        return p.status === activeTab;
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
                    {['all', 'verified', 'unverified', 'pending'].map((tab) => (
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

                {/* Products Grid/Table */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="bg-card rounded-xl border border-border/50 overflow-hidden hover:border-primary/30 transition-all group hover:shadow-lg hover:shadow-black/20">
                            <div className="aspect-video bg-accent/30 relative flex items-center justify-center">
                                <Package className="w-12 h-12 text-muted-foreground/30" />
                                <div className="absolute top-3 left-3">
                                    <span className={cn(
                                        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold border backdrop-blur-md",
                                        product.status === 'verified' && "bg-green-500/10 text-green-500 border-green-500/20",
                                        product.status === 'pending' && "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
                                        product.status === 'unverified' && "bg-red-500/10 text-red-500 border-red-500/20"
                                    )}>
                                        {product.status === 'verified' && <ShieldCheck className="w-3 h-3" />}
                                        {product.status === 'pending' && <Clock className="w-3 h-3" />}
                                        {product.status === 'unverified' && <ShieldAlert className="w-3 h-3" />}
                                        {product.status}
                                    </span>
                                </div>
                                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-white">
                                    ${product.price}
                                </div>
                            </div>

                            <div className="p-4 space-y-4">
                                <div>
                                    <h3 className="font-bold text-lg truncate">{product.name}</h3>
                                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                                        by <span className="text-foreground font-medium">{product.seller}</span>
                                    </p>
                                </div>

                                <div className="flex justify-between items-center text-xs text-muted-foreground border-y border-border/20 py-2">
                                    <span>Stock: <span className="text-foreground font-medium">{product.stock}</span></span>
                                    <span>Category: <span className="text-foreground font-medium">{product.category}</span></span>
                                </div>

                                <div className="flex gap-2">
                                    <button className="flex-1 flex items-center justify-center gap-2 bg-accent hover:bg-accent/80 p-2 rounded-md text-sm font-medium transition-colors">
                                        <Edit className="w-4 h-4" />
                                        Edit
                                    </button>
                                    <button className="flex-1 flex items-center justify-center gap-2 bg-primary/10 text-primary hover:bg-primary/20 p-2 rounded-md text-sm font-medium transition-colors">
                                        <ShieldCheck className="w-4 h-4" />
                                        Verify
                                    </button>
                                    <button className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-md transition-colors text-muted-foreground">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;
