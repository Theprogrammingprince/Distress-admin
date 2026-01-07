import {
    LayoutDashboard,
    Package,
    CreditCard,
    ShoppingBag,
    MessageCircle,
    Mail,
    Calendar,
    Settings,
    LogOut,
    X,
    ChevronRight,
    ChevronLeft,
} from 'lucide-react';
import { navigationItems } from '../../data/mockData';

const iconMap: { [key: string]: React.ElementType } = {
    LayoutDashboard,
    Package,
    CreditCard,
    ShoppingBag,
    MessageCircle,
    Mail,
    Calendar,
};

interface SidebarProps {
    activeItem: string;
    onItemClick: (id: string, path: string) => void;
    isMobileOpen: boolean;
    onMobileClose: () => void;
    isCollapsed: boolean;
    onToggleCollapse: () => void;
}

export default function Sidebar({
    activeItem,
    onItemClick,
    isMobileOpen,
    onMobileClose,
    isCollapsed,
    onToggleCollapse,
}: SidebarProps) {
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
          fixed top-0 left-0 h-screen bg-gradient-to-b from-emerald-500 to-teal-600 z-50
          transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-20' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col shadow-xl
        `}
            >
                {/* Logo Section */}
                <div className={`h-20 flex items-center border-b border-white/10 ${isCollapsed ? 'justify-center px-4' : 'justify-between px-6'}`}>
                    {!isCollapsed && (
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <span className="text-2xl font-bold text-white">D</span>
                            </div>
                            <span className="text-xl font-bold text-white">Distress</span>
                        </div>
                    )}

                    {isCollapsed && (
                        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <span className="text-2xl font-bold text-white">D</span>
                        </div>
                    )}

                    {/* Toggle Button - Desktop Only */}
                    <button
                        onClick={onToggleCollapse}
                        className={`hidden lg:flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors ${isCollapsed ? 'absolute -right-4 top-6 bg-emerald-600 hover:bg-emerald-700 shadow-lg' : ''}`}
                    >
                        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                    </button>

                    {/* Close Button - Mobile Only */}
                    <button
                        onClick={onMobileClose}
                        className="lg:hidden p-1 hover:bg-white/10 rounded transition-colors"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-6 overflow-y-auto overflow-x-hidden">
                    <ul className="space-y-1">
                        {navigationItems.map((item) => {
                            const IconComponent = iconMap[item.icon];
                            const isActive = activeItem === item.id;

                            return (
                                <li key={item.id}>
                                    <button
                                        onClick={() => {
                                            onItemClick(item.id, item.path);
                                            if (window.innerWidth < 1024) {
                                                onMobileClose();
                                            }
                                        }}
                                        className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm
                      transition-all duration-200 group relative
                      ${isActive
                                                ? 'bg-white text-emerald-600 shadow-lg shadow-emerald-900/20'
                                                : 'text-white/80 hover:bg-white/10 hover:text-white'
                                            }
                      ${isCollapsed ? 'justify-center' : ''}
                    `}
                                        title={isCollapsed ? item.label : undefined}
                                    >
                                        {IconComponent && (
                                            <IconComponent className="w-5 h-5 flex-shrink-0" />
                                        )}
                                        {!isCollapsed && (
                                            <>
                                                <span className="flex-1 text-left">{item.label}</span>
                                                {isActive && (
                                                    <ChevronRight className="w-4 h-4" />
                                                )}
                                            </>
                                        )}

                                        {/* Tooltip for collapsed state */}
                                        {isCollapsed && (
                                            <span className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                                                {item.label}
                                            </span>
                                        )}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Bottom Section */}
                <div className="px-3 pb-6 space-y-1 border-t border-white/10 pt-4">
                    <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200 group ${isCollapsed ? 'justify-center' : ''}`}>
                        <Settings className="w-5 h-5 flex-shrink-0" />
                        {!isCollapsed && <span className="flex-1 text-left">Settings</span>}
                        {isCollapsed && (
                            <span className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                                Settings
                            </span>
                        )}
                    </button>
                    <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200 group ${isCollapsed ? 'justify-center' : ''}`}>
                        <LogOut className="w-5 h-5 flex-shrink-0" />
                        {!isCollapsed && <span className="flex-1 text-left">Log Out</span>}
                        {isCollapsed && (
                            <span className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                                Log Out
                            </span>
                        )}
                    </button>
                </div>
            </aside>
        </>
    );
}
