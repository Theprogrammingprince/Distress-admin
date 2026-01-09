import { Search, Sun, Bell, MessageSquare, Menu } from 'lucide-react';

interface HeaderProps {
    onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
    return (
        <header className="sticky top-0 z-30 h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 -ml-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                    <Menu className="w-5 h-5 text-gray-600" />
                </button>

                <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-64 lg:w-96 h-10 pl-10 pr-4 bg-gray-50 border-0 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <Sun className="w-5 h-5 text-gray-500" />
                </button>

                <button className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <Bell className="w-5 h-5 text-gray-500" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-white"></span>
                </button>

                <button className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <MessageSquare className="w-5 h-5 text-gray-500" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                </button>

                <button className="flex items-center gap-2 ml-2">
                    <img
                        src="/img (4).jpg"
                        alt="User"
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="36" height="36"%3E%3Crect width="36" height="36" fill="%234F46E5" rx="18"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="14" font-weight="bold"%3EU%3C/text%3E%3C/svg%3E';
                        }}
                    />
                </button>
            </div>
        </header>
    );
}
