import { Star } from 'lucide-react';
import { recentComments } from '../../data/mockData';

export default function NewComments() {
    return (
        <div className="bg-white rounded-xl p-5 border border-gray-100">
            <h3 className="text-base font-semibold text-gray-900 mb-5">New Comment</h3>

            <div className="space-y-4">
                {recentComments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                            {comment.user.name.split(' ').map(n => n[0]).join('')}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-900 mb-1">{comment.user.name}</h4>

                            {/* Rating */}
                            <div className="flex items-center gap-0.5 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-3 h-3 ${i < comment.rating
                                                ? 'fill-amber-400 text-amber-400'
                                                : 'fill-gray-200 text-gray-200'
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Comment Text */}
                            <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                                {comment.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
