import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';

interface ComingSoonPageProps {
    activeNavItem: string;
    onNavItemClick: (id: string, path: string) => void;
    title: string;
    description: string;
}

export default function ComingSoonPage({
    activeNavItem,
    onNavItemClick,
    title,
    description,
}: ComingSoonPageProps) {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar
                activeItem={activeNavItem}
                onItemClick={onNavItemClick}
                isMobileOpen={isMobileSidebarOpen}
                onMobileClose={() => setIsMobileSidebarOpen(false)}
            />

            <div className="lg:ml-64">
                <Header onMenuClick={() => setIsMobileSidebarOpen(true)} />

                <main className="p-6">
                    <div className="bg-white rounded-2xl p-12 border border-gray-100 flex flex-col items-center justify-center min-h-[500px]">
                        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                            <span className="text-4xl">🚧</span>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-3">{title}</h1>
                        <p className="text-lg text-gray-500 text-center max-w-md mb-8">
                            {description}
                        </p>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => onNavItemClick('1', '/')}
                                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
                            >
                                Back to Dashboard
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
