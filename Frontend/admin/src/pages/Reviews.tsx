import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { Star, ThumbsUp, MessageCircle } from 'lucide-react';

interface ReviewsProps {
    activeNavItem: string;
    onNavItemClick: (id: string, path: string) => void;
}

export default function Reviews({ activeNavItem, onNavItemClick }: ReviewsProps) {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const reviews = [
        { id: 1, customer: 'John Doe', product: 'iPhone 14 Pro', rating: 5, comment: 'Excellent product! Highly recommended.', date: '2024-01-15', helpful: 24 },
        { id: 2, customer: 'Jane Smith', product: 'MacBook Pro', rating: 4, comment: 'Great laptop, but a bit expensive.', date: '2024-01-14', helpful: 18 },
        { id: 3, customer: 'Bob Johnson', product: 'AirPods Pro', rating: 5, comment: 'Best earbuds I\'ve ever owned!', date: '2024-01-13', helpful: 32 },
        { id: 4, customer: 'Alice Williams', product: 'iPad Air', rating: 4, comment: 'Good tablet for the price.', date: '2024-01-12', helpful: 15 },
        { id: 5, customer: 'Charlie Brown', product: 'Apple Watch', rating: 3, comment: 'Decent watch, but battery could be better.', date: '2024-01-11', helpful: 8 },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar
                activeItem={activeNavItem}
                onItemClick={onNavItemClick}
                isMobileOpen={isMobileSidebarOpen}
                onMobileClose={() => setIsMobileSidebarOpen(false)}
            />

            <div className="lg:ml-64 transition-all duration-300">
                <Header onMenuClick={() => setIsMobileSidebarOpen(true)} />

                <main className="p-6">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
                        <p className="text-sm text-gray-500 mt-1">Manage customer reviews and feedback</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-2">
                                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                <h3 className="text-2xl font-bold text-gray-900">4.6</h3>
                            </div>
                            <p className="text-sm text-gray-500">Average Rating</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-2">
                                <MessageCircle className="w-5 h-5 text-blue-600" />
                                <h3 className="text-2xl font-bold text-gray-900">1,234</h3>
                            </div>
                            <p className="text-sm text-gray-500">Total Reviews</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-2">
                                <ThumbsUp className="w-5 h-5 text-green-600" />
                                <h3 className="text-2xl font-bold text-gray-900">89%</h3>
                            </div>
                            <p className="text-sm text-gray-500">Positive Reviews</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-900">Recent Reviews</h2>
                        </div>

                        <div className="divide-y divide-gray-100">
                            {reviews.map((review) => (
                                <div key={review.id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h3 className="font-medium text-gray-900">{review.customer}</h3>
                                            <p className="text-sm text-gray-500">{review.product}</p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${
                                                        i < review.rating
                                                            ? 'text-yellow-500 fill-yellow-500'
                                                            : 'text-gray-300'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">{review.comment}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-500">{review.date}</span>
                                        <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                            <ThumbsUp className="w-4 h-4" />
                                            {review.helpful} helpful
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
