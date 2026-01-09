import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { Search, Filter, Download, Eye, Trash2 } from 'lucide-react';

interface OrdersProps {
    activeNavItem: string;
    onNavItemClick: (id: string, path: string) => void;
}

export default function Orders({ activeNavItem, onNavItemClick }: OrdersProps) {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('all');

    const orders = [
        { id: 'ORD-1001', customer: 'John Doe', product: 'iPhone 14 Pro', amount: 999, status: 'Completed', date: '2024-01-15' },
        { id: 'ORD-1002', customer: 'Jane Smith', product: 'MacBook Pro', amount: 2499, status: 'Processing', date: '2024-01-14' },
        { id: 'ORD-1003', customer: 'Bob Johnson', product: 'AirPods Pro', amount: 249, status: 'Pending', date: '2024-01-14' },
        { id: 'ORD-1004', customer: 'Alice Williams', product: 'iPad Air', amount: 599, status: 'Completed', date: '2024-01-13' },
        { id: 'ORD-1005', customer: 'Charlie Brown', product: 'Apple Watch', amount: 399, status: 'Cancelled', date: '2024-01-13' },
        { id: 'ORD-1006', customer: 'Diana Prince', product: 'Magic Keyboard', amount: 299, status: 'Completed', date: '2024-01-12' },
        { id: 'ORD-1007', customer: 'Ethan Hunt', product: 'HomePod Mini', amount: 99, status: 'Processing', date: '2024-01-12' },
        { id: 'ORD-1008', customer: 'Fiona Gallagher', product: 'AirTag 4 Pack', amount: 99, status: 'Completed', date: '2024-01-11' },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Completed':
                return 'bg-green-50 text-green-600 border-green-100';
            case 'Processing':
                return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'Pending':
                return 'bg-yellow-50 text-yellow-600 border-yellow-100';
            case 'Cancelled':
                return 'bg-red-50 text-red-600 border-red-100';
            default:
                return 'bg-gray-50 text-gray-600 border-gray-100';
        }
    };

    const filteredOrders = selectedStatus === 'all' 
        ? orders 
        : orders.filter(order => order.status.toLowerCase() === selectedStatus);

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar
                activeItem={activeNavItem}
                onItemClick={onNavItemClick}
                isMobileOpen={isMobileSidebarOpen}
                onMobileClose={() => setIsMobileSidebarOpen(false)}
            />

            <div className="lg:ml-64 transition-all duration-300">
                <Header onMenuClick={() => setIsMobileSidebarOpen(true)} />

                <main className="p-6">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
                        <p className="text-sm text-gray-500 mt-1">Manage and track all customer orders</p>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                        <input
                                            type="text"
                                            placeholder="Search orders..."
                                            className="w-64 h-10 pl-10 pr-4 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                                        />
                                    </div>
                                    <select
                                        value={selectedStatus}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                        className="h-10 px-4 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="completed">Completed</option>
                                        <option value="processing">Processing</option>
                                        <option value="pending">Pending</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="flex items-center gap-2 px-4 h-10 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors">
                                        <Filter className="w-4 h-4" />
                                        Filter
                                    </button>
                                    <button className="flex items-center gap-2 px-4 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                                        <Download className="w-4 h-4" />
                                        Export
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-100">
                                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">
                                            <input type="checkbox" className="rounded border-gray-300" />
                                        </th>
                                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Order ID</th>
                                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Customer</th>
                                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Product</th>
                                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Date</th>
                                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Amount</th>
                                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Status</th>
                                        <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders.map((order) => (
                                        <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <input type="checkbox" className="rounded border-gray-300" />
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{order.customer}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{order.product}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">${order.amount}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button className="p-1.5 hover:bg-blue-50 text-blue-600 rounded transition-colors">
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-1.5 hover:bg-red-50 text-red-600 rounded transition-colors">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                                Showing {filteredOrders.length} of {orders.length} orders
                            </p>
                            <div className="flex items-center gap-2">
                                <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                                    Previous
                                </button>
                                <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                                    1
                                </button>
                                <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                                    2
                                </button>
                                <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                                    3
                                </button>
                                <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
