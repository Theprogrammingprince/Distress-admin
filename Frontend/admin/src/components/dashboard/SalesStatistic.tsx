import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';
import { salesData } from '../../data/mockData';

export default function SalesStatistic() {
    const currentMonthData = salesData[5]; // June data (index 5)

    return (
        <div className="bg-white rounded-xl p-6 border border-gray-100 card-shadow">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Sales Statistic</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg text-sm text-gray-700 font-medium transition-colors">
                    Monthly
                    <ChevronDown className="w-4 h-4" />
                </button>
            </div>

            {/* Chart */}
            <div className="h-72 -mx-2">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#9ca3af' }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#9ca3af' }}
                            tickFormatter={(value) => `${value / 1000}k`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#fff',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                padding: '8px 12px',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                            }}
                            labelStyle={{ color: '#111827', fontWeight: 600, fontSize: '13px' }}
                            itemStyle={{ color: '#10b981', fontSize: '13px' }}
                            formatter={(value: number | undefined) => value ? [`$${(value / 1000).toFixed(1)}K`, 'Total value'] : ['N/A', 'Total value']}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#10b981"
                            strokeWidth={2.5}
                            fill="url(#salesGradient)"
                            dot={false}
                            activeDot={{ r: 5, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Current Month Label */}
            {currentMonthData && (
                <div className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-md">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-xs font-medium text-gray-700">
                        {currentMonthData.month} 2025
                    </span>
                    <span className="text-xs font-semibold text-gray-900">
                        Total value {(currentMonthData.value / 1000).toFixed(1).replace('.', ',')}k
                    </span>
                </div>
            )}
        </div>
    );
}
