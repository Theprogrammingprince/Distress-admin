import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from 'lucide-react';

interface DashboardProps {
    activeNavItem: string;
    onNavItemClick: (id: string, path: string) => void;
}

export default function Dashboard({ activeNavItem, onNavItemClick }: DashboardProps) {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const stats = [
        { id: 1, title: 'Total Revenue', value: '$45,231', change: '+20.1%', trend: 'up', icon: DollarSign, color: 'blue' },
        { id: 2, title: 'Total Orders', value: '1,234', change: '+15.3%', trend: 'up', icon: ShoppingCart, color: 'green' },
        { id: 3, title: 'Total Customers', value: '8,549', change: '+8.2%', trend: 'up', icon: Users, color: 'purple' },
        { id: 4, title: 'Total Products', value: '1,254', change: '-2.4%', trend: 'down', icon: Package, color: 'orange' },
    ];

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
                        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                        <p className="text-sm text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                        {stats.map((stat) => {
                            const Icon = stat.icon;
                            const colorClasses = {
                                blue: 'bg-blue-50 text-blue-600',
                                green: 'bg-green-50 text-green-600',
                                purple: 'bg-purple-50 text-purple-600',
                                orange: 'bg-orange-50 text-orange-600',
                            }[stat.color];

                            return (
                                <div key={stat.id} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`w-12 h-12 rounded-lg ${colorClasses} flex items-center justify-center`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div className={`flex items-center gap-1 text-sm font-medium ${
                                            stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                            {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                                            {stat.change}
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                                    <p className="text-sm text-gray-500">{stat.title}</p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Sales Overview</h2>
                            <div className="h-64 flex items-center justify-center text-gray-400">
                                <p>Chart will be rendered here</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Category</h2>
                            <div className="h-64 flex items-center justify-center text-gray-400">
                                <p>Chart will be rendered here</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-100">
                                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">Order ID</th>
                                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">Customer</th>
                                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">Product</th>
                                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">Amount</th>
                                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <tr key={i} className="border-b border-gray-50">
                                            <td className="py-4 text-sm font-medium text-gray-900">#ORD-{1000 + i}</td>
                                            <td className="py-4 text-sm text-gray-600">Customer {i}</td>
                                            <td className="py-4 text-sm text-gray-600">Product {i}</td>
                                            <td className="py-4 text-sm font-semibold text-gray-900">${(Math.random() * 500 + 50).toFixed(2)}</td>
                                            <td className="py-4">
                                                <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-600">
                                                    Completed
                                                </span>
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
