import { Search, ChevronDown, Calendar, Settings, Plus } from 'lucide-react';
import { currentUser } from '../../data/mockData';

interface HeaderProps {
    title: string;
    subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
    return (
        <header className="bg-white border-b border-gray-100">
            {/* Top Bar */}
            <div className="px-6 py-3 flex items-center justify-between border-b border-gray-50">
                {/* Search Bar */}
                <div className="relative w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search Anythings"
                        className="w-full pl-9 pr-3 py-2 bg-gray-50 border-0 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500/30 focus:bg-white transition-all"
                    />
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    {/* Icon buttons placeholder */}
                    <div className="w-8 h-8 flex items-center justify-center">
                        {/* Notification bell icon placeholder */}
                    </div>

                    {/* Balance */}
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500">Your Balance</span>
                        <span className="font-bold text-gray-900">${currentUser.balance.toLocaleString()}</span>
                    </div>

                    {/* User Profile */}
                    <button className="flex items-center gap-2.5 hover:bg-gray-50 rounded-lg px-2 py-1.5 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white text-xs font-semibold">
                            KR
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                            {currentUser.name}
                        </span>
                        <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                    </button>
                </div>
            </div>

            {/* Page Header */}
            <div className="px-6 py-4 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">{title}</h1>
                    {subtitle && (
                        <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    {/* Date Picker */}
                    <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <Calendar className="w-3.5 h-3.5" />
                        <span className="text-xs">August 2024</span>
                        <ChevronDown className="w-3.5 h-3.5" />
                    </button>

                    {/* Manage Widget */}
                    <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-700 hover:bg-gray-50 transition-colors">
                        <Settings className="w-3.5 h-3.5" />
                        <span>Manage Widget Label</span>
                    </button>

                    {/* Add Button */}
                    <button className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors shadow-sm">
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </header>
    );
}
