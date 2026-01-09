import { Search, Sun, Bell, MessageSquare, Menu } from 'lucide-react';

interface HeaderProps {
    onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
    return (
        <header className="sticky top-0 z-30 h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6">
            {/* Left Section */}
            <div className="flex items-center gap-4">
                {/* Mobile Menu Button */}
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <Menu className="w-5 h-5 text-gray-600" />
                </button>

                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-64 lg:w-80 h-10 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20 transition-all"
                    />
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
                {/* Icon Buttons */}
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Sun className="w-5 h-5 text-gray-600" />
                </button>

                <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full"></span>
                </button>

                <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MessageSquare className="w-5 h-5 text-gray-600" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* User Profile */}
                <button className="flex items-center gap-2 ml-2">
                    <img
                        src="/img (4).jpg"
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40"%3E%3Crect width="40" height="40" fill="%234F46E5"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="16" font-weight="bold"%3EU%3C/text%3E%3C/svg%3E';
                        }}
                    />
                </button>
            </div>
        </header>
    );
}
