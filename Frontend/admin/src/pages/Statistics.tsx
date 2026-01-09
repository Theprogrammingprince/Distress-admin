import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { TrendingUp, Users, ShoppingBag, DollarSign } from 'lucide-react';

interface StatisticsProps {
    activeNavItem: string;
    onNavItemClick: (id: string, path: string) => void;
}

export default function Statistics({ activeNavItem, onNavItemClick }: StatisticsProps) {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

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
                        <h1 className="text-2xl font-bold text-gray-900">Statistics</h1>
                        <p className="text-sm text-gray-500 mt-1">View detailed analytics and performance metrics</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                        {[
                            { title: 'Total Sales', value: '$125,430', icon: DollarSign, color: 'blue' },
                            { title: 'New Customers', value: '1,245', icon: Users, color: 'green' },
                            { title: 'Products Sold', value: '3,542', icon: ShoppingBag, color: 'purple' },
                            { title: 'Growth Rate', value: '+23.5%', icon: TrendingUp, color: 'orange' },
                        ].map((stat, i) => {
                            const Icon = stat.icon;
                            const colorClasses = {
                                blue: 'bg-blue-50 text-blue-600',
                                green: 'bg-green-50 text-green-600',
                                purple: 'bg-purple-50 text-purple-600',
                                orange: 'bg-orange-50 text-orange-600',
                            }[stat.color];

                            return (
                                <div key={i} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                                    <div className={`w-12 h-12 rounded-lg ${colorClasses} flex items-center justify-center mb-4`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                                    <p className="text-sm text-gray-500">{stat.title}</p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue</h2>
                            <div className="h-80 flex items-center justify-center text-gray-400">
                                <p>Revenue chart will be displayed here</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Growth</h2>
                            <div className="h-80 flex items-center justify-center text-gray-400">
                                <p>Customer growth chart will be displayed here</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Products</h2>
                        <div className="space-y-4">
                            {[
                                { name: 'iPhone 14 Pro', sales: 542, revenue: '$538,458' },
                                { name: 'MacBook Pro', sales: 324, revenue: '$809,676' },
                                { name: 'AirPods Pro', sales: 892, revenue: '$222,108' },
                                { name: 'iPad Air', sales: 445, revenue: '$266,555' },
                                { name: 'Apple Watch', sales: 678, revenue: '$270,522' },
                            ].map((product, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <span className="text-blue-600 font-bold text-sm">{i + 1}</span>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">{product.name}</h3>
                                            <p className="text-sm text-gray-500">{product.sales} units sold</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-gray-900">{product.revenue}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
