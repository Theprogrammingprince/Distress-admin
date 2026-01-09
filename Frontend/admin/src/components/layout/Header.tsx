import { Search, Bell, Mail as MailIcon, Menu, ChevronDown } from 'lucide-react';
import { currentUser } from '../../data/mockData';

interface HeaderProps {
    onMenuClick: () => void;
    isSidebarCollapsed: boolean;
}

export default function Header({ onMenuClick, isSidebarCollapsed }: HeaderProps) {
    return (
        <header className="sticky top-0 z-30 h-20 bg-white border-b border-gray-200 flex items-center justify-between">
            <div className={`flex items-center gap-6 transition-all duration-300 ${isSidebarCollapsed ? 'lg:pl-8' : 'lg:pl-8'} px-6`}>
                {/* Mobile Menu Button */}
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <Menu className="w-5 h-5 text-gray-600" />
                </button>

                {/* Greeting */}
                <div>
                    <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                        Hello,{' '}
                        <span className="text-gray-900">{currentUser.name.split(' ')[0]}</span>{' '}
                        <span className="text-xl">👋</span>
                    </h1>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3 px-6">
                {/* Search - Hidden on mobile */}
                <div className="hidden md:flex relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Search your product"
                        className="w-80 h-11 pl-10 pr-4 bg-gray-50 border-0 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition-all"
                    />
                </div>

                {/* Notification Icons */}
                <button className="relative p-2.5 hover:bg-gray-100 rounded-lg transition-colors">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                </button>

                <button className="relative p-2.5 hover:bg-gray-100 rounded-lg transition-colors">
                    <MailIcon className="w-5 h-5 text-gray-600" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                </button>

                {/* Divider */}
                <div className="w-px h-8 bg-gray-200 mx-1"></div>

                {/* User Profile */}
                <button className="flex items-center gap-3 pl-2 pr-3 py-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-white">
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
