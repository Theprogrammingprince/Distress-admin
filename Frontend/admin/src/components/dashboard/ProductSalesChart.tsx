import { useState } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';
import { ChevronDown } from 'lucide-react';
import { salesData } from '../../data/mockData';

export default function ProductSalesChart() {
    const [category, setCategory] = useState('All Category');

    const totalSales = 2590;
    const totalEarning = 27208;
    const salesChange = 2.87;
    const earningChange = 2.87;

    return (
        <div className="bg-white rounded-xl p-5 border border-gray-100 h-full">
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-12">
                    <h3 className="text-base font-semibold text-gray-900">Product Sales</h3>

                    {/* Category Dropdown */}
                    <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                        {category}
                        <ChevronDown className="w-4 h-4" />
                    </button>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                            <span className="text-xs text-gray-500">Total Sales</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="text-xl font-bold text-gray-900">{totalSales.toLocaleString()}</span>
                            <span className="text-xs font-medium text-green-600">
                                +{salesChange}%
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-orange-400"></div>
                            <span className="text-xs text-gray-500">Total Earning</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="text-xl font-bold text-gray-900">${totalEarning.toLocaleString()}</span>
                            <span className="text-xs font-medium text-green-600">
                                +{earningChange}%
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={salesData}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="earningGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#fb923c" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#fb923c" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fill: '#94a3b8' }}
                            dy={8}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fill: '#94a3b8' }}
                            dx={-5}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1e293b',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '8px 12px',
                                fontSize: '12px',
                            }}
                            labelStyle={{ color: '#fff', marginBottom: '4px' }}
                            itemStyle={{ color: '#fff', fontSize: '11px' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="sales"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            fill="url(#salesGradient)"
                            dot={false}
                        />
                        <Area
                            type="monotone"
                            dataKey="earning"
                            stroke="#fb923c"
                            strokeWidth={2}
                            fill="url(#earningGradient)"
                            dot={false}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="mt-4 pl-2">
                <div className="inline-flex flex-col gap-1 bg-white rounded-lg border border-gray-100 shadow-sm px-3 py-2">
                    <p className="text-xs font-semibold text-gray-700 mb-1">June 2023</p>
                    <div className="flex items-center gap-2 text-xs">
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <span className="text-gray-500">Sales:</span>
                            <span className="font-semibold text-gray-900">$980</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                            <span className="text-gray-500">Earning:</span>
                            <span className="font-semibold text-gray-900">700</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
