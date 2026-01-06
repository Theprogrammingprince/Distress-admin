import { TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, ResponsiveContainer } from 'recharts';
import type { StatCard as StatCardType } from '../../types';

interface StatCardProps {
    data: StatCardType;
    color?: string;
    chartType?: 'line' | 'bar';
}

export default function StatCard({ data, color = '#3b82f6', chartType = 'line' }: StatCardProps) {
    const chartData = data.chartData?.map((value, index) => ({
        value,
        index,
    })) || [];

    return (
        <div className="bg-white rounded-xl p-5 border border-gray-100">
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1.5">{data.title}</p>
                    <h3 className="text-2xl font-bold text-gray-900">{data.value}</h3>
                </div>
                <div
                    className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${data.changeType === 'increase'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                >
                    {data.changeType === 'increase' ? (
                        <TrendingUp className="w-3 h-3" />
                    ) : (
                        <TrendingDown className="w-3 h-3" />
                    )}
                    <span>{data.change}%</span>
                </div>
            </div>

            {/* Mini Chart */}
            <div className="h-14 -mx-1">
                <ResponsiveContainer width="100%" height="100%">
                    {chartType === 'line' ? (
                        <LineChart data={chartData}>
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke={color}
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    ) : (
                        <BarChart data={chartData}>
                            <Bar dataKey="value" fill={color} radius={[2, 2, 0, 0]} />
                        </BarChart>
                    )}
                </ResponsiveContainer>
            </div>
        </div>
    );
}
