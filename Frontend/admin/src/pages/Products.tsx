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
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'In Stock':
                return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'Low Stock':
                return 'bg-orange-50 text-orange-600 border-orange-100';
            case 'Out of Stock':
                return 'bg-red-50 text-red-600 border-red-100';
            default:
                return 'bg-gray-50 text-gray-600 border-gray-100';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar
                activeItem={activeNavItem}
                onItemClick={onNavItemClick}
                isMobileOpen={isMobileSidebarOpen}
                onMobileClose={() => setIsMobileSidebarOpen(false)}
                isCollapsed={isSidebarCollapsed}
                onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            />

            <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
                <Header
                    onMenuClick={() => setIsMobileSidebarOpen(true)}
                    isSidebarCollapsed={isSidebarCollapsed}
                />

                <main className="p-4 sm:p-6 lg:p-8">
                    <div className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 shadow-sm">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div>
                                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Products</h1>
                                <p className="text-sm text-gray-500 mt-1">Manage your product inventory</p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <div className="relative">
                                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        className="w-full sm:w-64 h-10 pl-10 pr-4 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/20 transition-all"
                                    />
                                </div>
                                <button className="flex items-center gap-2 px-4 h-10 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-lg text-sm font-medium transition-colors">
                                    <Filter className="w-4 h-4" />
                                    <span className="hidden sm:inline">Filter</span>
                                </button>
                                <button className="flex items-center gap-2 px-4 h-10 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
                                    <Plus className="w-4 h-4" />
                                    <span className="hidden sm:inline">Add Product</span>
                                    <span className="sm:hidden">Add</span>
                                </button>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto -mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full align-middle px-6 lg:px-8">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="border-b border-gray-100">
                                            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-4">
                                                Product Name
                                            </th>
                                            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-4">
                                                Category
                                            </th>
                                            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-4">
                                                Price
                                            </th>
                                            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-4">
                                                Stock
                                            </th>
                                            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-4">
                                                Status
                                            </th>
                                            <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider pb-4">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productsData.map((product, index) => (
                                            <tr key={product.id} className={`border-b border-gray-50 ${index === productsData.length - 1 ? 'border-0' : ''}`}>
                                                <td className="py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                                            <span className="text-sm font-bold text-emerald-600">
                                                                {product.name.substring(0, 2).toUpperCase()}
                                                            </span>
                                                        </div>
                                                        <span className="text-sm font-medium text-gray-900">{product.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 text-sm text-gray-600">{product.category}</td>
                                                <td className="py-4 text-sm font-semibold text-gray-900">${product.price.toFixed(2)}</td>
                                                <td className="py-4 text-sm text-gray-600">{product.stock} units</td>
                                                <td className="py-4">
                                                    <span className={`inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold border ${getStatusColor(product.status)}`}>
                                                        {product.status}
                                                    </span>
                                                </td>
                                                <td className="py-4">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button className="px-3 py-1.5 text-xs font-medium text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                                                            Edit
                                                        </button>
                                                        <button className="px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
                    </div>
                </main>
            </div>
        </div>
    );
}
