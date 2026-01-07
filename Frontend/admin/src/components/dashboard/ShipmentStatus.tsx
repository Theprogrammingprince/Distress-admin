import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { shipmentStatus } from '../../data/mockData';

export default function ShipmentStatus() {
    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Shipment Status</h2>
                <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-medium text-gray-700">
                    Today
                </span>
            </div>

            {/* Donut Chart */}
            <div className="flex flex-col items-center">
                <div className="relative w-48 h-48 mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={shipmentStatus}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={85}
                                paddingAngle={2}
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
                <div className="grid grid-cols-2 gap-4 w-full">
                    {shipmentStatus.map((status, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div
                                className="w-3 h-3 rounded-full flex-shrink-0"
                                style={{ backgroundColor: status.color }}
                            />
                            <div className="flex-1">
                                <p className="text-xs text-gray-600">{status.status}</p>
                                <p className="text-sm font-semibold text-gray-900">{status.percentage}%</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
