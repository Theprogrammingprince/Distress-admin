import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';
import { salesData } from '../../data/mockData';

export default function SalesStatistic() {
    const currentMonthData = salesData[salesData.length - 6]; // June data

    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Sales Statistic</h2>
                <button className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors">
                    Monthly
                    <ChevronDown className="w-4 h-4" />
                </button>
            </div>

            {/* Chart */}
            <div className="h-64 -mx-2">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#94a3b8' }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#94a3b8' }}
                            tickFormatter={(value) => `${value / 1000}k`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#fff',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                padding: '8px 12px',
                            }}
                            labelStyle={{ color: '#111827', fontWeight: 600 }}
                            itemStyle={{ color: '#10b981' }}
                            formatter={(value: number) => [`$${(value / 1000).toFixed(1)}K`, 'Sales']}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#10b981"
                            strokeWidth={3}
                            fill="url(#salesGradient)"
                            dot={false}
                            activeDot={{ r: 6, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Current Month Label */}
            {currentMonthData && (
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-2 bg-emerald-50 rounded-lg">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">
                        {currentMonthData.month} 2025
                    </span>
                    <span className="text-sm font-semibold text-emerald-600">
                        ${(currentMonthData.value / 1000).toFixed(1)}K
                    </span>
                </div>
            )}
        </div>
    );
}
