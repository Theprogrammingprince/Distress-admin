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
        <div className="bg-white rounded-lg p-5 border border-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-semibold text-gray-900">Recent Orders</h2>
                <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h10M3 10h10" />
                    </svg>
                    <span className="font-medium">Sort by</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-100">
                            <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wide pb-3 bg-gray-50/30">
                                Product
                            </th>
                            <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wide pb-3 bg-gray-50/30">
                                Orders ID
                            </th>
                            <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wide pb-3 bg-gray-50/30">
                                Customer Name
                            </th>
                            <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wide pb-3 bg-gray-50/30">
                                Date
                            </th>
                            <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wide pb-3 bg-gray-50/30">
                                Item
                            </th>
                            <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wide pb-3 bg-gray-50/30">
                                Price
                            </th>
                            <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wide pb-3 bg-gray-50/30">
                                Total
                            </th>
                            <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wide pb-3 bg-gray-50/30">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentOrders.map((order) => (
                            <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/30 transition-colors">
                                <td className="py-3">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                                            <span className="text-[10px] font-semibold text-gray-400">
                                                {order.product.substring(0, 2).toUpperCase()}
                                            </span>
                                        </div>
                                        <span className="text-[13px] font-medium text-gray-700">{order.product}</span>
                                    </div>
                                </td>
                                <td className="py-3 text-[13px] text-gray-600 font-medium">{order.orderId}</td>
                                <td className="py-3 text-[13px] text-gray-600">{order.customerName}</td>
                                <td className="py-3 text-[13px] text-gray-600">{order.date}</td>
                                <td className="py-3 text-[13px] text-gray-600">{order.item}</td>
                                <td className="py-3 text-[13px] text-gray-600">${order.price}</td>
                                <td className="py-3 text-[13px] font-semibold text-gray-900">${order.total}</td>
                                <td className="py-3">
                                    <span
                                        className={`inline-flex px-2.5 py-0.5 rounded-md text-[11px] font-medium ${getStatusColor(
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
