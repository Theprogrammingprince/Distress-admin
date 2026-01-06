import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';
import { trafficSources } from '../../data/mockData';

export default function TrafficSources() {
    const total = trafficSources.reduce((acc, item) => acc + item.percentage, 0);

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Sales by traffic source</h3>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-all">
                    Monthly
                    <ChevronDown className="w-4 h-4" />
                </button>
            </div>

            {/* Donut Chart */}
            <div className="flex items-center gap-6">
                <div className="relative w-36 h-36">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={trafficSources}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={60}
                                paddingAngle={4}
                                dataKey="percentage"
                            >
                                {trafficSources.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Center Text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-lg font-bold text-gray-900">100%</p>
                        </div>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex-1 space-y-3">
                    {trafficSources.map((source, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: source.color }}
                                />
                                <span className="text-sm text-gray-600">{source.source}</span>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">{source.percentage}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
