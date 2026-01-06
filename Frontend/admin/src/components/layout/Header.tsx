import { Search, Bell, ChevronDown, Settings, Plus } from 'lucide-react';
import { currentUser } from '../../data/mockData';

interface HeaderProps {
    title: string;
    subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
    return (
        <header className="bg-white border-b border-gray-100 px-8 py-4">
            <div className="flex items-center justify-between">
                {/* Search Bar */}
                <div className="relative w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search Anythings"
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    />
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-6">
                    {/* Balance */}
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl">
                        <span className="text-xs text-gray-500">Your Balance</span>
                        <span className="text-lg font-bold text-gray-900">
                            ${currentUser.balance.toLocaleString()}
                        </span>
                    </div>

                    {/* User Profile */}
                    <button className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-xl transition-all duration-200">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white font-medium">
                            {currentUser.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                            {currentUser.name}
                        </span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                </div>
            </div>

            {/* Page Title Section */}
            <div className="flex items-center justify-between mt-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                    {subtitle && (
                        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    {/* Date Picker */}
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>August 2024</span>
                        <ChevronDown className="w-4 h-4" />
                    </button>

                    {/* Manage Widget */}
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200">
                        <Settings className="w-4 h-4" />
                        <span>Manage Widget Label</span>
                    </button>

                    {/* Add Button */}
                    <button className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/30 hover:bg-blue-600 transition-all duration-200">
                        <Plus className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </header>
    );
}
