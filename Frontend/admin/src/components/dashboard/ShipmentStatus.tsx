import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { shipmentStatus } from '../../data/mockData';

export default function ShipmentStatus() {
    return (
        <div className="bg-white rounded-xl p-6 border border-gray-100 card-shadow">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Shipment Status</h2>
                <span className="px-3 py-1.5 bg-gray-100 rounded-lg text-xs font-medium text-gray-700">
                    Today
                </span>
            </div>

            {/* Donut Chart */}
            <div className="flex flex-col items-center">
                <div className="relative w-52 h-52 mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={shipmentStatus}
                                cx="50%"
                                cy="50%"
                                innerRadius={65}
                                outerRadius={95}
                                paddingAngle={3}
                                dataKey="percentage"
                            >
                                {shipmentStatus.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Legend */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-3 w-full">
                    {shipmentStatus.map((status, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div
                                className="w-3 h-3 rounded-full flex-shrink-0"
                                style={{ backgroundColor: status.color }}
                            />
                            <div className="flex-1">
                                <p className="text-xs font-medium text-gray-600">{status.status}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
