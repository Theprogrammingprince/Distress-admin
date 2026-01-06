import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TopSellingProducts() {
    return (
        <div className="bg-white rounded-xl p-5 border border-gray-100 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-900">Top Selling Products</h3>
                <div className="flex items-center gap-1">
                    <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-600 transition-colors">
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-600 transition-colors">
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Product Card */}
            <div className="flex-1 relative overflow-hidden rounded-xl bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-400 p-6">
                {/* Circular Background */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-44 h-44 rounded-full bg-white/10 backdrop-blur-sm"></div>
                </div>

                {/* Shoe Image */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-40 h-40">
                        {/* Simple Shoe SVG */}
                        <svg
                            className="w-full h-full filter drop-shadow-2xl"
                            viewBox="0 0 200 200"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* Shoe base/sole */}
                            <ellipse cx="100" cy="140" rx="65" ry="22" fill="#1a1a2e" opacity="0.6" />

                            {/* Shoe body - main part */}
                            <path
                                d="M 50 120 Q 55 85 85 75 Q 115 70 145 85 Q 155 95 150 115 L 135 125 Q 110 132 85 130 Q 60 128 50 120 Z"
                                fill="#2d3748"
                            />

                            {/* Shoe upper/toe */}
                            <path
                                d="M 60 105 Q 70 80 95 72 Q 120 68 140 85 Q 135 100 120 107 Q 95 112 70 108 Z"
                                fill="#1a202c"
                            />

                            {/* Nike Swoosh */}
                            <path
                                d="M 70 95 Q 105 88 135 98 Q 115 102 85 98 Q 70 97 70 95 Z"
                                fill="#84cc16"
                                opacity="0.9"
                            />

                            {/* Highlight/shine */}
                            <ellipse cx="105" cy="82" rx="15" ry="8" fill="white" opacity="0.15" />

                            {/* Laces */}
                            <path d="M 80 82 L 88 85" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M 92 80 L 100 83" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M 104 79 L 112 82" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Product Info */}
            <div className="mt-4">
                <h4 className="text-base font-semibold text-gray-900">Nike Shoes</h4>
                <p className="text-base font-bold text-gray-900 mt-0.5">$12.32</p>

                {/* Progress indicator dots */}
                <div className="flex items-center gap-1.5 mt-3">
                    <div className="w-5 h-1 bg-blue-500 rounded-full"></div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                </div>
            </div>
        </div>
    );
}
