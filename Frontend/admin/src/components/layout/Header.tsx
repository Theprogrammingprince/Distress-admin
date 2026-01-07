import { Search, Bell, Mail as MailIcon, Menu, ChevronDown } from 'lucide-react';
import { currentUser } from '../../data/mockData';

interface HeaderProps {
    onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
    // Get greeting based on time of day
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <header className="h-20 bg-white border-b border-gray-100 px-6 flex items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center gap-6">
                {/* Mobile Menu Button */}
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <Menu className="w-5 h-5 text-gray-600" />
                </button>

                {/* Greeting */}
                <div>
                    <h1 className="text-xl font-bold text-gray-900">
                        {getGreeting()}, <span className="text-emerald-600">{currentUser.name}</span> 👋
                    </h1>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
                {/* Search */}
                <div className="hidden md:flex relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search your product"
                        className="w-64 h-10 pl-10 pr-4 bg-gray-50 border-0 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all"
                    />
                </div>

                {/* Icons */}
                <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MailIcon className="w-5 h-5 text-gray-600" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* User Profile */}
                <button className="flex items-center gap-3 pl-3 pr-4 py-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                        {currentUser.name.charAt(0)}
                    </div>
                    <div className="hidden lg:flex flex-col items-start">
                        <span className="text-sm font-semibold text-gray-900 leading-tight">
                            {currentUser.name}
                        </span>
                        <span className="text-xs text-gray-500">{currentUser.role}</span>
                    </div>
                    <ChevronDown className="hidden lg:block w-4 h-4 text-gray-400" />
                </button>
            </div>
        </header>
    );
}
