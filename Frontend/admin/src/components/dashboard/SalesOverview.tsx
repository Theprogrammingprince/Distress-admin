import { TrendingUp } from 'lucide-react';
import { salesOverview } from '../../data/mockData';

export default function SalesOverview() {
    const totalSales = 9824;
    const growth = 48;

    return (
        <div className="bg-white rounded-lg p-5 border border-gray-100">
            <h2 className="text-base font-semibold text-gray-900 mb-5">Sales OverView</h2>

            {/* Total Sales */}
            <div className="mb-5">
                <div className="flex items-baseline gap-1.5 mb-1">
                    <h3 className="text-2xl font-bold text-gray-900">{totalSales.toLocaleString()}</h3>
                    <span className="flex items-center gap-0.5 text-xs font-semibold text-emerald-600">
                        {growth}%
                        <TrendingUp className="w-3 h-3" />
                    </span>
                </div>
                <p className="text-[11px] font-medium text-gray-500">Total Sales</p>
            </div>

            {/* Categories */}
            <div className="space-y-3.5">
                {salesOverview.map((item, index) => (
                    <div key={index}>
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-[13px] font-medium text-gray-700">{item.category}</span>
                            <span className="text-[11px] font-semibold text-gray-500">{item.percentage}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
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
