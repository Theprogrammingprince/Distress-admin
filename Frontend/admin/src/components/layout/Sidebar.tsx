import { useState } from 'react';
import {
    LayoutDashboard,
    ShoppingCart,
    Package,
    Warehouse,
    Users,
    UserCog,
    Settings,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { navigationItems, messages } from '../../data/mockData';

const iconMap: { [key: string]: React.ElementType } = {
    LayoutDashboard,
    ShoppingCart,
    Package,
    Warehouse,
    Users,
    UserCog,
    Settings,
};

interface SidebarProps {
    activeItem: string;
    onItemClick: (id: string) => void;
}

export default function Sidebar({ activeItem, onItemClick }: SidebarProps) {
    const [isMessagesOpen, setIsMessagesOpen] = useState(true);

    return (
        <aside className="w-64 bg-[#f8fafc] h-screen flex flex-col fixed left-0 top-0">
            {/* Logo */}
            <div className="px-5 py-6 flex items-center gap-2">
                <button className="p-1 hover:bg-gray-200 rounded">
                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>
                <div className="flex items-center gap-2">
                    <Package className="w-6 h-6 text-blue-600" />
                    <span className="text-lg font-bold text-gray-900">Bazar</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 pt-2 overflow-y-auto">
                <ul className="space-y-0.5">
                    {navigationItems.map((item) => {
                        const IconComponent = iconMap[item.icon];
                        const isActive = activeItem === item.id;

                        return (
                            <li key={item.id}>
                                <button
                                    onClick={() => onItemClick(item.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${isActive
                                            ? 'bg-blue-600 text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    {IconComponent && <IconComponent className="w-4 h-4" />}
                                    <span>{item.label}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>

                {/* Messages Section */}
                <div className="mt-6">
                    <button
                        onClick={() => setIsMessagesOpen(!isMessagesOpen)}
                        className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide"
                    >
                        <span>Message</span>
                        <div className="flex items-center gap-1">
                            <ChevronLeft className="w-3 h-3" />
                            <ChevronRight className="w-3 h-3" />
                        </div>
                    </button>

                    {isMessagesOpen && (
                        <ul className="mt-2 space-y-0.5">
                            {messages.map((message) => (
                                <li key={message.id}>
                                    <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-all duration-150">
                                        <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                                            <span className="text-xs font-medium text-gray-600">
                                                {message.user.name.charAt(0)}
                                            </span>
                                        </div>
                                        <span className="flex-1 text-left text-sm">{message.user.name}</span>
                                        {message.unread && (
                                            <span className="w-4 h-4 bg-blue-600 text-white text-[10px] font-semibold rounded-full flex items-center justify-center">
                                                {message.unread}
                                            </span>
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* View All Contacts */}
                    <button className="w-full flex items-center gap-2 px-3 py-2 mt-2 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-all duration-150">
                        <Users className="w-4 h-4" />
                        <span>View All Contacts</span>
                    </button>
                </div>
            </nav>

            {/* Footer */}
            <div className="px-3 py-4 text-xs text-gray-400">
                v2.0
            </div>
        </aside>
    );
}
