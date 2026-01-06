import { countryData } from '../../data/mockData';

export default function TopCountries() {
    return (
        <div className="bg-white rounded-xl p-5 border border-gray-100">
            <h3 className="text-base font-semibold text-gray-900 mb-5">Top Countries By Sales</h3>

            {/* World Map Placeholder */}
            <div className="relative h-32 mb-5 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg overflow-hidden">
                {/* Simple world map visualization */}
                <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 400 160"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Continents as simple shapes */}
                    <ellipse cx="80" cy="50" rx="45" ry="30" fill="#e0e7ff" opacity="0.5" />
                    <ellipse cx="100" cy="110" rx="22" ry="35" fill="#e0e7ff" opacity="0.5" />
                    <ellipse cx="190" cy="48" rx="28" ry="22" fill="#e0e7ff" opacity="0.5" />
                    <ellipse cx="190" cy="95" rx="28" ry="35" fill="#e0e7ff" opacity="0.5" />
                    <ellipse cx="290" cy="60" rx="55" ry="40" fill="#e0e7ff" opacity="0.5" />
                    <ellipse cx="325" cy="115" rx="22" ry="18" fill="#e0e7ff" opacity="0.5" />

                    {/* Location markers */}
                    <circle cx="75" cy="48" r="3" fill="#3b82f6" />
                    <circle cx="75" cy="48" r="6" fill="#3b82f6" opacity="0.3" />

                    <circle cx="185" cy="45" r="3" fill="#22c55e" />
                    <circle cx="185" cy="45" r="6" fill="#22c55e" opacity="0.3" />

                    <circle cx="195" cy="52" r="2.5" fill="#f59e0b" />
                    <circle cx="195" cy="52" r="5" fill="#f59e0b" opacity="0.3" />

                    <circle cx="290" cy="55" r="3" fill="#ef4444" />
                    <circle cx="290" cy="55" r="6" fill="#ef4444" opacity="0.3" />
                </svg>
            </div>

            {/* Country List */}
            <div className="space-y-3">
                {countryData.map((country, index) => (
                    <div key={index} className="flex items-center gap-2.5">
                        <span className="text-lg">{country.flag}</span>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-medium text-gray-700">{country.country}</span>
                                <span className="text-xs font-semibold text-gray-900">{country.percentage}%</span>
                            </div>
                            <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
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
