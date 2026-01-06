import { Search, ChevronDown, Calendar, Settings, Plus, Menu, Bell } from 'lucide-react';
import { currentUser } from '../../data/mockData';

interface HeaderProps {
    title: string;
    subtitle?: string;
    onMenuClick: () => void;
}

export default function Header({ title, subtitle, onMenuClick }: HeaderProps) {
    return (
        <header className="bg-white border-b border-gray-100">
            {/* Top Bar */}
            <div className="h-14 px-4 lg:px-6 flex items-center justify-between border-b border-gray-50">
                {/* Left Section */}
                <div className="flex items-center gap-3 flex-1">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={onMenuClick}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
                        aria-label="Open Menu"
                    >
                        <Menu className="w-5 h-5 text-gray-600" />
                    </button>

                    {/* Search Bar */}
                    <div className="relative w-full max-w-xs lg:max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search Anythings"
                            className="w-full pl-9 pr-3 py-2 bg-gray-50 border-0 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500/30 focus:bg-white transition-all"
                        />
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-2 lg:gap-4">
                    {/* Notification Bell - Hidden on mobile */}
                    <button className="hidden md:flex w-9 h-9 items-center justify-center hover:bg-gray-100 rounded-lg transition-colors">
                        <Bell className="w-4 h-4 text-gray-600" />
                    </button>

                    {/* Balance - Hidden on small screens */}
                    <div className="hidden sm:flex items-center gap-2 text-sm">
                        <span className="text-gray-500 text-xs">Your Balance</span>
                        <span className="font-bold text-gray-900 text-sm">
                            ${currentUser.balance.toLocaleString()}
                        </span>
                    </div>

                    {/* User Profile */}
                    <button className="flex items-center gap-2 hover:bg-gray-50 rounded-lg px-2 py-1.5 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white text-xs font-semibold">
                            KR
                        </div>
                        <span className="hidden lg:block text-sm font-medium text-gray-900">
                            {currentUser.name}
                        </span>
                        <ChevronDown className="hidden lg:block w-3.5 h-3.5 text-gray-500" />
                    </button>
                </div>
            </div>

            {/* Page Header */}
            <div className="px-4 lg:px-6 py-3 lg:py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                <div>
                    <h1 className="text-lg lg:text-xl font-bold text-gray-900">{title}</h1>
                    {subtitle && (
                        <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
                    )}
                </div>

                <div className="flex items-center gap-2 lg:gap-3 overflow-x-auto">
                    {/* Date Picker */}
                    <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap">
                        <Calendar className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">August 2024</span>
                        <ChevronDown className="w-3.5 h-3.5" />
                    </button>

                    {/* Manage Widget - Hidden on mobile */}
                    <button className="hidden md:flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap">
                        <Settings className="w-3.5 h-3.5" />
                        <span>Manage Widget Label</span>
                    </button>

                    {/* Add Button */}
                    <button className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors shadow-sm flex-shrink-0">
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </header>
    );
}
