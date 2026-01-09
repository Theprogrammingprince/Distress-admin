import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { shipmentStatus } from '../../data/mockData';

export default function ShipmentStatus() {
    return (
        <div className="bg-white rounded-lg p-5 border border-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-semibold text-gray-900">Shipment Status</h2>
                <span className="px-2.5 py-1 bg-gray-100 rounded-md text-[10px] font-medium text-gray-700">
                    Today
                </span>
            </div>

            {/* Donut Chart */}
            <div className="flex flex-col items-center">
                <div className="relative w-44 h-44 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={shipmentStatus}
                                cx="50%"
                                cy="50%"
                                innerRadius={55}
                                outerRadius={80}
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
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 w-full">
                    {shipmentStatus.map((status, index) => (
                        <div key={index} className="flex items-center gap-1.5">
                            <div
                                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                style={{ backgroundColor: status.color }}
                            />
                            <div className="flex-1">
                                <p className="text-[11px] font-medium text-gray-600">{status.status}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
