import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';
import { salesData } from '../../data/mockData';

export default function SalesStatistic() {
    const currentMonthData = salesData[5]; // June data (index 5)

    return (
        <div className="bg-white rounded-lg p-5 border border-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-semibold text-gray-900">Sales Statistic</h2>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg text-xs font-medium text-gray-700 transition-colors">
                    Monthly
                    <ChevronDown className="w-3.5 h-3.5" />
                </button>
            </div>

            {/* Chart */}
            <div className="h-64 -mx-2">
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
                            tick={{ fontSize: 11, fill: '#9ca3af' }}
                            dy={8}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fill: '#9ca3af' }}
                            tickFormatter={(value) => `${value / 1000}k`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#fff',
                                border: '1px solid #e5e7eb',
                                borderRadius: '6px',
                                padding: '6px 10px',
                                boxShadow: '0 2px 4px rgb(0 0 0 / 0.1)',
                            }}
                            labelStyle={{ color: '#111827', fontWeight: 600, fontSize: '12px' }}
                            itemStyle={{ color: '#10b981', fontSize: '12px' }}
                            formatter={(value: number | undefined) => value ? [`$${(value / 1000).toFixed(1)}K`, 'Total value'] : ['N/A', 'Total value']}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#10b981"
                            strokeWidth={2.5}
                            fill="url(#salesGradient)"
                            dot={false}
                            activeDot={{ r: 4, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Current Month Label */}
            {currentMonthData && (
                <div className="mt-1 inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 rounded">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                    <span className="text-[10px] font-medium text-gray-600">
                        {currentMonthData.month} 2025
                    </span>
                    <span className="text-[10px] font-semibold text-gray-800">
                        Total value {(currentMonthData.value / 1000).toFixed(1).replace('.', ',')}k
                    </span>
                </div>
            )}
        </div>
    );
}
