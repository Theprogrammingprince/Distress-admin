import { ChevronDown } from 'lucide-react';
import { recentOrders } from '../../data/mockData';

export default function RecentOrders() {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pending':
                return 'status-badge-pending';
            case 'Completed':
                return 'status-badge-completed';
            case 'Returned':
                return 'bg-orange-50 text-orange-600';
            default:
                return 'bg-gray-50 text-gray-600';
        }
    };

    return (
        <div className="bg-white rounded-xl p-6 border border-gray-100 card-shadow">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                <button className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h10M3 10h10" />
                    </svg>
                    <span className="font-medium">Sort by</span>
                    <ChevronDown className="w-4 h-4" />
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-100">
                            <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-4 bg-gray-50/50">
                                Product
                            </th>
                            <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-4 bg-gray-50/50">
                                Orders ID
                            </th>
                            <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-4 bg-gray-50/50">
                                Customer Name
                            </th>
                            <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-4 bg-gray-50/50">
                                Date
                            </th>
                            <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-4 bg-gray-50/50">
                                Item
                            </th>
                            <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-4 bg-gray-50/50">
                                Price
                            </th>
                            <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-4 bg-gray-50/50">
                                Total
                            </th>
                            <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-4 bg-gray-50/50">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentOrders.map((order) => (
                            <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                <td className="py-3.5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                                            <span className="text-xs font-semibold text-gray-400">
                                                {order.product.substring(0, 2).toUpperCase()}
                                            </span>
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">{order.product}</span>
                                    </div>
                                </td>
                                <td className="py-3.5 text-sm text-gray-600 font-medium">{order.orderId}</td>
                                <td className="py-3.5 text-sm text-gray-600">{order.customerName}</td>
                                <td className="py-3.5 text-sm text-gray-600">{order.date}</td>
                                <td className="py-3.5 text-sm text-gray-600">{order.item}</td>
                                <td className="py-3.5 text-sm text-gray-600">${order.price}</td>
                                <td className="py-3.5 text-sm font-semibold text-gray-900">${order.total}</td>
                                <td className="py-3.5">
                                    <span
                                        className={`inline-flex px-3 py-1 rounded-md text-xs font-medium ${getStatusColor(
                                            order.status
                                        )}`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
