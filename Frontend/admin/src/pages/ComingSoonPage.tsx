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
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar
                activeItem={activeNavItem}
                onItemClick={onNavItemClick}
                isMobileOpen={isMobileSidebarOpen}
                onMobileClose={() => setIsMobileSidebarOpen(false)}
                isCollapsed={isSidebarCollapsed}
                onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            />

            <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
                <Header
                    onMenuClick={() => setIsMobileSidebarOpen(true)}
                    isSidebarCollapsed={isSidebarCollapsed}
                />

                <main className="p-4 sm:p-6 lg:p-8">
                    <div className="bg-white rounded-2xl p-8 lg:p-16 border border-gray-100 flex flex-col items-center justify-center min-h-[600px] text-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mb-8 shadow-lg shadow-emerald-100/50">
                            <span className="text-5xl">🚧</span>
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{title}</h1>
                        <p className="text-base lg:text-lg text-gray-500 max-w-2xl mb-10">
                            {description}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <button
                                onClick={() => onNavItemClick('1', '/')}
                                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors shadow-sm"
                            >
                                Back to Dashboard
                            </button>
                            <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors">
                                Notify Me
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
