import { TrendingUp } from 'lucide-react';
import { salesOverview } from '../../data/mockData';

export default function SalesOverview() {
    const totalSales = 9824;
    const growth = 48;

    return (
        <div className="bg-white rounded-xl p-6 border border-gray-100 card-shadow">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Sales OverView</h2>

            {/* Total Sales */}
            <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-1">
                    <h3 className="text-3xl font-bold text-gray-900">{totalSales.toLocaleString()}</h3>
                    <span className="flex items-center gap-0.5 text-sm font-semibold text-emerald-600">
                        {growth}%
                        <TrendingUp className="w-3.5 h-3.5" />
                    </span>
                </div>
                <p className="text-xs font-medium text-gray-500">Total Sales</p>
            </div>

            {/* Categories */}
            <div className="space-y-4">
                {salesOverview.map((item, index) => (
                    <div key={index}>
                        <div className="flex items-center justify-between mb-1.5">
                            <span className="text-sm font-medium text-gray-700">{item.category}</span>
                            <span className="text-xs font-semibold text-gray-500">{item.percentage}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                    width: `${item.percentage}%`,
                                    backgroundColor: item.barColor,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
