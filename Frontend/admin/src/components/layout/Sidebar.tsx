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
    Menu as MenuIcon,
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
          fixed top-0 left-0 h-screen bg-white z-50
          transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-20' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          flex flex-col
          shadow-sm
        `}
            >
                {/* Header */}
                <div className="h-16 px-5 flex items-center justify-between shrink-0">
                    {!isCollapsed ? (
                        <>
                            <div className="flex items-center gap-2.5">
                                <button
                                    onClick={onToggleCollapse}
                                    className="p-1 hover:bg-gray-100 rounded transition-colors hidden lg:flex"
                                >
                                    <ChevronLeft className="w-4 h-4 text-gray-500" />
                                </button>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                                        <Package className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-xl font-bold text-gray-900">Bazar</span>
                                </div>
                            </div>
                            <button
                                onClick={onMobileClose}
                                className="p-1 hover:bg-gray-100 rounded transition-colors lg:hidden"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={onToggleCollapse}
                            className="p-1.5 hover:bg-gray-100 rounded mx-auto transition-colors"
                        >
                            <ChevronRight className="w-4 h-4 text-gray-500" />
                        </button>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 overflow-y-auto">
                    {/* Menu Items */}
                    <ul className="space-y-1">
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
                      w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium
                      transition-all duration-200
                      ${isActive
                                                ? 'bg-blue-600 text-white'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }
                      ${isCollapsed ? 'justify-center' : 'gap-3'}
                    `}
                                        title={isCollapsed ? item.label : undefined}
                                    >
                                        {IconComponent && (
                                            <IconComponent className={`${isCollapsed ? 'w-5 h-5' : 'w-4 h-4'} flex-shrink-0`} />
                                        )}
                                        {!isCollapsed && <span>{item.label}</span>}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Messages Section */}
                    {!isCollapsed && (
                        <div className="mt-8">
                            <button
                                onClick={() => setIsMessagesOpen(!isMessagesOpen)}
                                className="flex items-center justify-between w-full px-3 mb-3 group"
                            >
                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                    Message
                                </span>
                                <div className="flex items-center gap-0.5 text-gray-400">
                                    <ChevronLeft className="w-3 h-3" />
                                    <ChevronRight className="w-3 h-3" />
                                </div>
                            </button>

                            {isMessagesOpen && (
                                <ul className="space-y-1">
                                    {messages.map((message) => (
                                        <li key={message.id}>
                                            <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-all duration-200 group">
                                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-xs font-semibold text-gray-500">
                                                        {message.user.name.split(' ').map(n => n[0]).join('')}
                                                    </span>
                                                </div>
                                                <span className="flex-1 text-left text-sm text-gray-700">
                                                    {message.user.name}
                                                </span>
                                                {message.unread && (
                                                    <span className="w-5 h-5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                                        {message.unread}
                                                    </span>
                                                )}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {/* View All Contacts */}
                            <button className="w-full flex items-center gap-2 px-3 py-2.5 mt-2 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-all duration-200">
                                <Users className="w-4 h-4" />
                                <span>View All Contacts</span>
                            </button>
                        </div>
                    )}
                </nav>

                {/* Version */}
                {!isCollapsed && (
                    <div className="px-5 py-4 border-t border-gray-100 shrink-0">
                        <p className="text-xs text-gray-400">v2.0.0</p>
                    </div>
                )}
            </aside>
        </>
    );
}
