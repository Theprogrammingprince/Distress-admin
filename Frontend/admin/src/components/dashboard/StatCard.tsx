import { TrendingUp, TrendingDown } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { StatCard as StatCardType } from '../../types';

interface StatCardProps {
    data: StatCardType;
    color?: string;
}

export default function StatCard({ data, color = '#3b82f6' }: StatCardProps) {
    const chartData = data.chartData?.map((value, index) => ({
        value,
        index,
    })) || [];

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <p className="text-sm text-gray-500 font-medium">{data.title}</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{data.value}</h3>
                </div>
                <div
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${data.changeType === 'increase'
                            ? 'bg-green-50 text-green-600'
                            : 'bg-red-50 text-red-600'
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
            <div className="h-16">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id={`gradient-${data.id}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={color} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke={color}
                            strokeWidth={2}
                            fill={`url(#gradient-${data.id})`}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
