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
    Menu,
    X,
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
    isCollapsed: boolean;
    onToggleCollapse: () => void;
    isMobileOpen: boolean;
    onMobileClose: () => void;
}

export default function Sidebar({
    activeItem,
    onItemClick,
    isCollapsed,
    onToggleCollapse,
    isMobileOpen,
    onMobileClose,
}: SidebarProps) {
    const [isMessagesOpen, setIsMessagesOpen] = useState(true);

    return (
        <>
            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onMobileClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed top-0 left-0 h-screen bg-[#f8fafc] border-r border-gray-200 z-50
          transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-20' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          flex flex-col
        `}
            >
                {/* Header */}
                <div className="h-16 px-4 flex items-center justify-between border-b border-gray-100">
                    {!isCollapsed && (
                        <>
                            <div className="flex items-center gap-2 flex-1">
                                <button
                                    onClick={onToggleCollapse}
                                    className="p-1.5 hover:bg-gray-200 rounded-md transition-colors hidden lg:flex"
                                    title="Toggle Sidebar"
                                >
                                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                                </button>
                                <div className="flex items-center gap-2">
                                    <Package className="w-6 h-6 text-blue-600" />
                                    <span className="text-lg font-bold text-gray-900">Bazar</span>
                                </div>
                            </div>
                            <button
                                onClick={onMobileClose}
                                className="p-1.5 hover:bg-gray-200 rounded-md transition-colors lg:hidden"
                            >
                                <X className="w-5 h-5 text-gray-600" />
                            </button>
                        </>
                    )}
                    {isCollapsed && (
                        <button
                            onClick={onToggleCollapse}
                            className="p-1.5 hover:bg-gray-200 rounded-md transition-colors mx-auto"
                            title="Expand Sidebar"
                        >
                            <ChevronRight className="w-4 h-4 text-gray-600" />
                        </button>
                    )}
                </div>

                {/* Menu Label */}
                {!isCollapsed && (
                    <div className="px-4 py-3">
                        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Menu
                        </p>
                    </div>
                )}

                {/* Navigation */}
                <nav className="flex-1 px-3 pt-2 overflow-y-auto">
                    <ul className="space-y-0.5">
                        {navigationItems.map((item) => {
                            const IconComponent = iconMap[item.icon];
                            const isActive = activeItem === item.id;

                            return (
                                <li key={item.id}>
                                    <button
                                        onClick={() => {
                                            onItemClick(item.id);
                                            if (window.innerWidth < 1024) {
                                                onMobileClose();
                                            }
                                        }}
                                        className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium 
                      transition-all duration-150
                      ${isActive
                                                ? 'bg-blue-600 text-white shadow-sm'
                                                : 'text-gray-700 hover:bg-gray-100'
                                            }
                      ${isCollapsed ? 'justify-center' : ''}
                    `}
                                        title={isCollapsed ? item.label : undefined}
                                    >
                                        {IconComponent && <IconComponent className="w-4 h-4 flex-shrink-0" />}
                                        {!isCollapsed && <span>{item.label}</span>}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Messages Section */}
                    {!isCollapsed && (
                        <div className="mt-6">
                            <button
                                onClick={() => setIsMessagesOpen(!isMessagesOpen)}
                                className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider hover:text-gray-600 transition-colors"
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
                                                <span className="flex-1 text-left text-sm truncate">
                                                    {message.user.name}
                                                </span>
                                                {message.unread && (
                                                    <span className="w-4 h-4 bg-blue-600 text-white text-[10px] font-semibold rounded-full flex items-center justify-center flex-shrink-0">
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
                    )}
                </nav>

                {/* Version Footer */}
                {!isCollapsed && (
                    <div className="px-4 py-3 border-t border-gray-100">
                        <p className="text-xs text-gray-400">v2.0.0</p>
                    </div>
                )}
            </aside>
        </>
    );
}
