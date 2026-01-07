import { ChevronDown } from 'lucide-react';
import { recentOrders } from '../../data/mockData';

export default function RecentOrders() {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pending':
                return 'bg-red-50 text-red-600';
            case 'Completed':
                return 'bg-emerald-50 text-emerald-600';
            case 'Returned':
                return 'bg-orange-50 text-orange-600';
            default:
                return 'bg-gray-50 text-gray-600';
        }
    };

    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
                <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    <span>Sort by</span>
                    <ChevronDown className="w-4 h-4" />
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-100">
                            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">
                                Product
                            </th>
                            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">
                                Orders ID
                            </th>
                            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">
                                Customer Name
                            </th>
                            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">
                                Date
                            </th>
                            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">
                                Item
                            </th>
                            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">
                                Price
                            </th>
                            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">
                                Total
                            </th>
                            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentOrders.map((order) => (
                            <tr key={order.id} className="border-b border-gray-50">
                                <td className="py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                            <span className="text-sm font-semibold text-gray-400">
                                                {order.product.substring(0, 2)}
                                            </span>
                                        </div>
                                        <span className="text-sm font-medium text-gray-900">{order.product}</span>
                                    </div>
                                </td>
                                <td className="py-4 text-sm text-gray-600">{order.orderId}</td>
                                <td className="py-4 text-sm text-gray-600">{order.customerName}</td>
                                <td className="py-4 text-sm text-gray-600">{order.date}</td>
                                <td className="py-4 text-sm text-gray-600">{order.item}</td>
                                <td className="py-4 text-sm text-gray-600">${order.price}</td>
                                <td className="py-4 text-sm font-semibold text-gray-900">${order.total}</td>
                                <td className="py-4">
                                    <span
                                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
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
