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
    MessageCircle,
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
        <aside className="w-64 bg-white h-screen flex flex-col border-r border-gray-100 fixed left-0 top-0">
            {/* Logo */}
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <Package className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-gray-900">Bazar</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 overflow-y-auto">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4 px-3">
                    Menu
                </p>
                <ul className="space-y-1">
                    {navigationItems.map((item) => {
                        const IconComponent = iconMap[item.icon];
                        const isActive = activeItem === item.id;

                        return (
                            <li key={item.id}>
                                <button
                                    onClick={() => onItemClick(item.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                            ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                >
                                    {IconComponent && <IconComponent className="w-5 h-5" />}
                                    <span>{item.label}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>

                {/* Messages Section */}
                <div className="mt-8">
                    <button
                        onClick={() => setIsMessagesOpen(!isMessagesOpen)}
                        className="flex items-center justify-between w-full px-3 mb-4"
                    >
                        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Message
                        </p>
                        <ChevronDown
                            className={`w-4 h-4 text-gray-400 transition-transform ${isMessagesOpen ? 'rotate-180' : ''
                                }`}
                        />
                    </button>

                    {isMessagesOpen && (
                        <ul className="space-y-1">
                            {messages.map((message) => (
                                <li key={message.id}>
                                    <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-all duration-200">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                            <MessageCircle className="w-4 h-4 text-gray-500" />
                                        </div>
                                        <span className="flex-1 text-left">{message.user.name}</span>
                                        {message.unread && (
                                            <span className="w-5 h-5 bg-blue-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
                                                {message.unread}
                                            </span>
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* View All Contacts */}
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 mt-2 text-sm text-blue-500 font-medium hover:bg-blue-50 rounded-xl transition-all duration-200">
                        <Users className="w-4 h-4" />
                        <span>View All Contacts</span>
                    </button>
                </div>
            </nav>
        </aside>
    );
}
