import { TrendingUp } from 'lucide-react';
import { salesOverview } from '../../data/mockData';

export default function SalesOverview() {
    const totalSales = 9824;
    const growth = 48;

    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Sales OverView</h2>

            {/* Total Sales */}
            <div className="mb-6">
                <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-bold text-gray-900">{totalSales.toLocaleString()}</h3>
                    <span className="flex items-center gap-1 text-sm font-semibold text-emerald-600">
                        {growth}%
                        <TrendingUp className="w-4 h-4" />
                    </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Total Sales</p>
            </div>

            {/* Categories */}
            <div className="space-y-4">
                {salesOverview.map((item, index) => (
                    <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">{item.category}</span>
                            <span className="text-sm font-semibold text-gray-900">{item.percentage}%</span>
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
