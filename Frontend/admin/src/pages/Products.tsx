import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { productsData } from '../data/mockData';
import { Search, Plus, Filter } from 'lucide-react';

interface ProductsProps {
    activeNavItem: string;
    onNavItemClick: (id: string, path: string) => void;
}

export default function Products({ activeNavItem, onNavItemClick }: ProductsProps) {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'In Stock':
                return 'bg-emerald-50 text-emerald-600';
            case 'Low Stock':
                return 'bg-orange-50 text-orange-600';
            case 'Out of Stock':
                return 'bg-red-50 text-red-600';
            default:
                return 'bg-gray-50 text-gray-600';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar
                activeItem={activeNavItem}
                onItemClick={onNavItemClick}
                isMobileOpen={isMobileSidebarOpen}
                onMobileClose={() => setIsMobileSidebarOpen(false)}
            />

            <div className="lg:ml-64">
                <Header onMenuClick={() => setIsMobileSidebarOpen(true)} />

                <main className="p-6">
                    <div className="bg-white rounded-2xl p-6 border border-gray-100">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">Products</h1>

                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        className="w-64 h-10 pl-10 pr-4 bg-gray-50 border-0 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500/20"
                                    />
                                </div>
                                <button className="flex items-center gap-2 px-4 h-10 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors">
                                    <Filter className="w-4 h-4" />
                                    Filter
                                </button>
                                <button className="flex items-center gap-2 px-4 h-10 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors">
                                    <Plus className="w-4 h-4" />
                                    Add Product
                                </button>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-100">
                                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">
                                            Product Name
                                        </th>
                                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">
                                            Category
                                        </th>
                                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">
                                            Price
                                        </th>
                                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">
                                            Stock
                                        </th>
                                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">
                                            Status
                                        </th>
                                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productsData.map((product) => (
                                        <tr key={product.id} className="border-b border-gray-50">
                                            <td className="py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                                        <span className="text-sm font-semibold text-gray-400">
                                                            {product.name.substring(0, 2)}
                                                        </span>
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-900">{product.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 text-sm text-gray-600">{product.category}</td>
                                            <td className="py-4 text-sm font-semibold text-gray-900">${product.price}</td>
                                            <td className="py-4 text-sm text-gray-600">{product.stock}</td>
                                            <td className="py-4">
                                                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(product.status)}`}>
                                                    {product.status}
                                                </span>
                                            </td>
                                            <td className="py-4">
                                                <div className="flex items-center gap-2">
                                                    <button className="px-3 py-1 text-xs font-medium text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                                                        Edit
                                                    </button>
                                                    <button className="px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
