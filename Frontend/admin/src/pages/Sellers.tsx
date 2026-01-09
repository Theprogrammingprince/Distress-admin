import { useState } from 'react';
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
    Eye,
    CheckCircle,
    XCircle,
    Mail,
    Clock
} from 'lucide-react';
import { cn } from '../lib/utils';

const mockSellers = [
    { id: '1', name: 'John Doe', email: 'john@example.com', business: 'Doe Electronics', status: 'verified', joined: '2025-10-01', sales: 124, rating: 4.8 },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', business: 'Smith Fashion', status: 'pending', joined: '2025-11-15', sales: 45, rating: 4.2 },
    { id: '3', name: 'Mike Ross', email: 'mike@example.com', business: 'Ross Gadgets', status: 'unverified', joined: '2025-05-20', sales: 89, rating: 3.9 },
    { id: '4', name: 'Sarah Connor', email: 'sarah@example.com', business: 'Connor Parts', status: 'verified', joined: '2025-01-10', sales: 432, rating: 4.9 },
    { id: '5', name: 'Robert Paulson', email: 'robert@example.com', business: 'Soap Co.', status: 'verified', joined: '2025-12-05', sales: 12, rating: 4.5 },
];

const Sellers = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredSellers = mockSellers.filter(seller =>
        seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seller.business.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
                            className="w-full bg-background border rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <button className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm hover:bg-accent transition-colors flex-1 md:flex-none">
                            <Filter className="w-4 h-4" />
                            Filters
                        </button>
                        <div className="h-8 w-[1px] bg-border hidden md:block"></div>
                        <p className="text-sm text-muted-foreground hidden lg:block">
                            Showing <span className="text-foreground font-medium">{filteredSellers.length}</span> of {mockSellers.length} sellers
                        </p>
                    </div>
                </div>

                {/* Sellers Table */}
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
                                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seller.name}`} alt="avatar" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">{seller.name}</p>
                                                <p className="text-xs text-muted-foreground">{seller.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-medium">{seller.business}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border",
                                            seller.status === 'verified' && "bg-green-500/10 text-green-500 border-green-500/20",
                                            seller.status === 'pending' && "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
                                            seller.status === 'unverified' && "bg-red-500/10 text-red-500 border-red-500/20"
                                        )}>
                                            {seller.status === 'verified' && <CheckCircle className="w-3 h-3" />}
                                            {seller.status === 'pending' && <Clock className="w-3 h-3" />}
                                            {seller.status === 'unverified' && <XCircle className="w-3 h-3" />}
                                            {seller.status.charAt(0).toUpperCase() + seller.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">
                                        {new Date(seller.joined).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 hover:bg-primary/10 hover:text-primary rounded-md transition-all text-muted-foreground" title="View Details">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 hover:bg-primary/10 hover:text-primary rounded-md transition-all text-muted-foreground" title="Contact Seller">
                                                <Mail className="w-4 h-4" />
                                            </button>
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

                {/* Pagination */}
                <div className="p-4 border-t flex items-center justify-between bg-black/5">
                    <p className="text-xs text-muted-foreground">
                        Page <span className="text-foreground font-medium">1</span> of 1
                    </p>
                    <div className="flex gap-2">
                        <button disabled className="p-2 border rounded-md disabled:opacity-30">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button disabled className="p-2 border rounded-md disabled:opacity-30">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sellers;
