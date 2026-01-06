import { countryData } from '../../data/mockData';

export default function TopCountries() {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Countries By Sales</h3>

            {/* World Map Placeholder */}
            <div className="relative h-40 mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl overflow-hidden">
                {/* Simple world map visualization */}
                <svg
                    className="absolute inset-0 w-full h-full opacity-60"
                    viewBox="0 0 400 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* North America */}
                    <ellipse cx="100" cy="70" rx="50" ry="35" fill="#dbeafe" />
                    {/* South America */}
                    <ellipse cx="120" cy="140" rx="25" ry="40" fill="#dbeafe" />
                    {/* Europe */}
                    <ellipse cx="200" cy="65" rx="30" ry="25" fill="#dbeafe" />
                    {/* Africa */}
                    <ellipse cx="200" cy="120" rx="30" ry="40" fill="#dbeafe" />
                    {/* Asia */}
                    <ellipse cx="300" cy="80" rx="60" ry="45" fill="#dbeafe" />
                    {/* Australia */}
                    <ellipse cx="340" cy="150" rx="25" ry="20" fill="#dbeafe" />

                    {/* Location markers */}
                    <circle cx="90" cy="65" r="4" fill="#3b82f6" />
                    <circle cx="90" cy="65" r="8" fill="#3b82f6" opacity="0.3" />

                    <circle cx="190" cy="60" r="4" fill="#22c55e" />
                    <circle cx="190" cy="60" r="8" fill="#22c55e" opacity="0.3" />

                    <circle cx="200" cy="70" r="3" fill="#f59e0b" />
                    <circle cx="200" cy="70" r="6" fill="#f59e0b" opacity="0.3" />

                    <circle cx="300" cy="75" r="4" fill="#ef4444" />
                    <circle cx="300" cy="75" r="8" fill="#ef4444" opacity="0.3" />
                </svg>
            </div>

            {/* Country List */}
            <div className="space-y-3">
                {countryData.map((country, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <span className="text-xl">{country.flag}</span>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">{country.country}</span>
                                <span className="text-sm font-semibold text-gray-900">{country.percentage}%</span>
                            </div>
                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{
                                        width: `${country.percentage}%`,
                                        backgroundColor: country.color,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
