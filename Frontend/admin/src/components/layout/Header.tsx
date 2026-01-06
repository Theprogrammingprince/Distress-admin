import { Search, ChevronDown, Calendar, Settings, Plus, Menu, Bell, Pin } from 'lucide-react';
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
            <div className="h-16 px-6 flex items-center justify-between">
                {/* Left Section */}
                <div className="flex items-center gap-4 flex-1">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={onMenuClick}
                        className="p-2 -ml-2 hover:bg-gray-50 rounded-lg transition-colors lg:hidden"
                    >
                        <Menu className="w-5 h-5 text-gray-600" />
                    </button>

                    {/* Search Bar */}
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Search Anythings"
                            className="w-full h-10 pl-10 pr-4 bg-gray-50 border-0 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
                        />
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    {/* Pin Icon */}
                    <button className="hidden md:flex w-9 h-9 items-center justify-center hover:bg-gray-50 rounded-lg transition-colors">
                        <Pin className="w-4 h-4 text-gray-500" />
                    </button>

                    {/* Balance */}
                    <div className="hidden sm:flex flex-col items-end">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wide">Your Balance</span>
                        <span className="text-base font-bold text-gray-900">
                            ${currentUser.balance.toLocaleString()}
                        </span>
                    </div>

                    {/* User Profile */}
                    <button className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                            KR
                        </div>
                        <div className="hidden lg:flex flex-col items-start">
                            <span className="text-sm font-semibold text-gray-900 leading-tight">
                                Khondoker Rasel
                            </span>
                        </div>
                        <ChevronDown className="hidden lg:block w-4 h-4 text-gray-400" />
                    </button>
                </div>
            </div>

            {/* Page Header Section */}
            <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-gray-50">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">{title}</h1>
                    {subtitle && (
                        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    {/* Date Picker */}
                    <button className="flex items-center gap-2 h-9 px-3 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all">
                        <Calendar className="w-3.5 h-3.5 text-gray-500" />
                        <span>August 2024</span>
                        <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                    </button>

                    {/* Manage Widget */}
                    <button className="hidden md:flex items-center gap-2 h-9 px-3 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all">
                        <Settings className="w-3.5 h-3.5 text-gray-500" />
                        <span>Manage Widget Label</span>
                    </button>

                    {/* Add Button */}
                    <button className="w-9 h-9 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white transition-colors shadow-sm">
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </header>
    );
}
