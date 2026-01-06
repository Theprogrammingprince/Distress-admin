import { useState } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { ChevronDown, TrendingUp } from 'lucide-react';
import { salesData } from '../../data/mockData';

export default function ProductSalesChart() {
    const [category, setCategory] = useState('All Category');
    const [hoveredData, setHoveredData] = useState<{ sales: number; earning: number } | null>(null);

    const totalSales = 2590;
    const totalEarning = 27208;
    const salesChange = 2.87;
    const earningChange = 2.87;

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-8">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Product Sales</h3>
                    </div>

                    {/* Category Dropdown */}
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-all">
                        {category}
                        <ChevronDown className="w-4 h-4" />
                    </button>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            <span className="text-sm text-gray-500">Total Sales</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-gray-900">{totalSales.toLocaleString()}</span>
                            <span className="flex items-center gap-0.5 text-xs font-medium text-green-600">
                                <TrendingUp className="w-3 h-3" />
                                {salesChange}%
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                            <span className="text-sm text-gray-500">Total Earning</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-gray-900">${totalEarning.toLocaleString()}</span>
                            <span className="flex items-center gap-0.5 text-xs font-medium text-green-600">
                                <TrendingUp className="w-3 h-3" />
                                {earningChange}%
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={salesData}
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="earningGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
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
                            dx={-10}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1e293b',
                                border: 'none',
                                borderRadius: '12px',
                                padding: '12px 16px',
                            }}
                            labelStyle={{ color: '#fff', marginBottom: '8px' }}
                            itemStyle={{ color: '#fff', fontSize: '12px' }}
                            formatter={(value: number, name: string) => [
                                `$${value}`,
                                name === 'sales' ? 'Sales' : 'Earning',
                            ]}
                        />
                        <Area
                            type="monotone"
                            dataKey="sales"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            fill="url(#salesGradient)"
                            dot={false}
                            activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
                        />
                        <Area
                            type="monotone"
                            dataKey="earning"
                            stroke="#f97316"
                            strokeWidth={2}
                            fill="url(#earningGradient)"
                            dot={false}
                            activeDot={{ r: 6, fill: '#f97316', stroke: '#fff', strokeWidth: 2 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Legend for June */}
            <div className="flex items-center gap-6 mt-4 pl-8">
                <div className="bg-white rounded-lg shadow-md border border-gray-100 px-4 py-3">
                    <p className="text-sm font-semibold text-gray-900 mb-2">June 2023</p>
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <span className="text-xs text-gray-500">Sales:</span>
                            <span className="text-xs font-semibold text-gray-900">$980</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                            <span className="text-xs text-gray-500">Earning:</span>
                            <span className="text-xs font-semibold text-gray-900">700</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
