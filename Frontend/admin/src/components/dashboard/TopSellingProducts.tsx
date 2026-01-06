import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TopSellingProducts() {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Top Selling Products</h3>
                <div className="flex items-center gap-2">
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all">
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all">
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Product Card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-500 p-6 h-64">
                {/* Product Image Container */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                        {/* Shoe Image Placeholder - using gradient circle */}
                        <div className="w-48 h-48 relative">
                            {/* Circular Background */}
                            <div className="absolute inset-0 rounded-full bg-white/20"></div>

                            {/* Shoe SVG Illustration */}
                            <svg
                                className="absolute inset-0 w-full h-full"
                                viewBox="0 0 200 200"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* Shoe base */}
                                <ellipse cx="100" cy="130" rx="70" ry="25" fill="#1e3a5f" />
                                {/* Shoe body */}
                                <path
                                    d="M45 110 Q60 70 100 60 Q140 55 160 90 Q165 100 160 115 Q140 130 100 135 Q60 138 45 120 Z"
                                    fill="#374151"
                                />
                                {/* Shoe upper */}
                                <path
                                    d="M55 100 Q70 75 100 68 Q130 63 150 85 Q145 100 130 108 Q100 115 70 110 Q55 107 55 100 Z"
                                    fill="#1f2937"
                                />
                                {/* Swoosh */}
                                <path
                                    d="M65 95 Q100 85 145 100 Q120 105 85 100 Q65 98 65 95 Z"
                                    fill="#84cc16"
                                />
                                {/* Laces */}
                                <path d="M85 78 L95 82 M95 75 L105 80 M105 73 L115 78" stroke="#9ca3af" strokeWidth="2" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Info */}
            <div className="mt-4">
                <h4 className="text-lg font-semibold text-gray-900">Nike Shoes</h4>
                <p className="text-lg font-bold text-gray-900 mt-1">$12.32</p>
            </div>
        </div>
    );
}
