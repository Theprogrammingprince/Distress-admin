import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';
import { trafficSources } from '../../data/mockData';

export default function TrafficSources() {
    return (
        <div className="bg-white rounded-xl p-5 border border-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-semibold text-gray-900">Sales by traffic source</h3>
                <button className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
                    Monthly
                    <ChevronDown className="w-3.5 h-3.5" />
                </button>
            </div>

            {/* Donut Chart */}
            <div className="flex items-center justify-center gap-8">
                <div className="relative w-32 h-32">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={trafficSources}
                                cx="50%"
                                cy="50%"
                                innerRadius={42}
                                outerRadius={58}
                                paddingAngle={3}
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
                            <p className="text-xl font-bold text-gray-900">100%</p>
                        </div>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex-1 space-y-2.5">
                    {trafficSources.map((source, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                    style={{ backgroundColor: source.color }}
                                />
                                <span className="text-xs text-gray-600">{source.source}</span>
                            </div>
                            <span className="text-xs font-semibold text-gray-900">{source.percentage}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
