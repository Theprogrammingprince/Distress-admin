import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { Search, Download, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface TransactionsProps {
    activeNavItem: string;
    onNavItemClick: (id: string, path: string) => void;
}

export default function Transactions({ activeNavItem, onNavItemClick }: TransactionsProps) {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const transactions = [
        { id: 'TXN-1001', type: 'income', customer: 'John Doe', amount: 999, method: 'Credit Card', status: 'Completed', date: '2024-01-15' },
        { id: 'TXN-1002', type: 'income', customer: 'Jane Smith', amount: 2499, method: 'PayPal', status: 'Completed', date: '2024-01-14' },
        { id: 'TXN-1003', type: 'expense', customer: 'Supplier ABC', amount: 1500, method: 'Bank Transfer', status: 'Pending', date: '2024-01-14' },
        { id: 'TXN-1004', type: 'income', customer: 'Bob Johnson', amount: 249, method: 'Credit Card', status: 'Completed', date: '2024-01-13' },
        { id: 'TXN-1005', type: 'income', customer: 'Alice Williams', amount: 599, method: 'Debit Card', status: 'Completed', date: '2024-01-13' },
        { id: 'TXN-1006', type: 'expense', customer: 'Vendor XYZ', amount: 800, method: 'Bank Transfer', status: 'Completed', date: '2024-01-12' },
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
                        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
                        <p className="text-sm text-gray-500 mt-1">Track all financial transactions</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm text-gray-500">Total Income</h3>
                                <ArrowUpRight className="w-5 h-5 text-green-600" />
                            </div>
                            <p className="text-2xl font-bold text-gray-900">$45,346</p>
                            <p className="text-sm text-green-600 mt-1">+12.5% from last month</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm text-gray-500">Total Expenses</h3>
                                <ArrowDownRight className="w-5 h-5 text-red-600" />
                            </div>
                            <p className="text-2xl font-bold text-gray-900">$12,300</p>
                            <p className="text-sm text-red-600 mt-1">+5.2% from last month</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm text-gray-500">Net Profit</h3>
                                <ArrowUpRight className="w-5 h-5 text-blue-600" />
                            </div>
                            <p className="text-2xl font-bold text-gray-900">$33,046</p>
                            <p className="text-sm text-blue-600 mt-1">+15.8% from last month</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="relative">
                                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    <input
                                        type="text"
                                        placeholder="Search transactions..."
                                        className="w-64 h-10 pl-10 pr-4 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                                    />
                                </div>
                                <button className="flex items-center gap-2 px-4 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                                    <Download className="w-4 h-4" />
                                    Export
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-100">
                                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Transaction ID</th>
                                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Type</th>
                                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Customer/Vendor</th>
                                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Amount</th>
                                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Method</th>
                                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Date</th>
                                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((txn) => (
                                        <tr key={txn.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{txn.id}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    {txn.type === 'income' ? (
                                                        <ArrowUpRight className="w-4 h-4 text-green-600" />
                                                    ) : (
                                                        <ArrowDownRight className="w-4 h-4 text-red-600" />
                                                    )}
                                                    <span className={`text-sm font-medium ${
                                                        txn.type === 'income' ? 'text-green-600' : 'text-red-600'
                                                    }`}>
                                                        {txn.type === 'income' ? 'Income' : 'Expense'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{txn.customer}</td>
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                                {txn.type === 'income' ? '+' : '-'}${txn.amount}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{txn.method}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{txn.date}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                                                    txn.status === 'Completed'
                                                        ? 'bg-green-50 text-green-600'
                                                        : 'bg-yellow-50 text-yellow-600'
                                                }`}>
                                                    {txn.status}
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
