import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { Search, Mail, Phone, MapPin, MoreVertical } from 'lucide-react';

interface CustomersProps {
    activeNavItem: string;
    onNavItemClick: (id: string, path: string) => void;
}

export default function Customers({ activeNavItem, onNavItemClick }: CustomersProps) {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const customers = [
        { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 234 567 8900', location: 'New York, USA', orders: 12, spent: '$2,450' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1 234 567 8901', location: 'Los Angeles, USA', orders: 8, spent: '$1,890' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '+1 234 567 8902', location: 'Chicago, USA', orders: 15, spent: '$3,200' },
        { id: 4, name: 'Alice Williams', email: 'alice@example.com', phone: '+1 234 567 8903', location: 'Houston, USA', orders: 6, spent: '$1,450' },
        { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', phone: '+1 234 567 8904', location: 'Phoenix, USA', orders: 10, spent: '$2,100' },
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
                        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
                        <p className="text-sm text-gray-500 mt-1">Manage your customer database</p>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="relative">
                                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    <input
                                        type="text"
                                        placeholder="Search customers..."
                                        className="w-64 h-10 pl-10 pr-4 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                                    />
                                </div>
                                <button className="px-4 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                                    Add Customer
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-6">
                            {customers.map((customer) => (
                                <div key={customer.id} className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                                <span className="text-blue-600 font-bold text-lg">
                                                    {customer.name.charAt(0)}
                                                </span>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                                                <p className="text-xs text-gray-500">{customer.orders} orders</p>
                                            </div>
                                        </div>
                                        <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                                            <MoreVertical className="w-4 h-4 text-gray-400" />
                                        </button>
                                    </div>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Mail className="w-4 h-4 text-gray-400" />
                                            {customer.email}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Phone className="w-4 h-4 text-gray-400" />
                                            {customer.phone}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <MapPin className="w-4 h-4 text-gray-400" />
                                            {customer.location}
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                        <span className="text-xs text-gray-500">Total Spent</span>
                                        <span className="text-sm font-semibold text-gray-900">{customer.spent}</span>
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
