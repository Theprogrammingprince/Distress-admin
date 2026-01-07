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
}

export default function Sidebar({
    activeItem,
    onItemClick,
    isMobileOpen,
    onMobileClose,
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
          fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-emerald-500 to-teal-600 z-50
          transition-transform duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          flex flex-col shadow-xl
        `}
            >
                {/* Logo */}
                <div className="h-20 px-6 flex items-center justify-between border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <span className="text-2xl font-bold text-white">D</span>
                        </div>
                        <span className="text-xl font-bold text-white">Distress</span>
                    </div>
                    <button
                        onClick={onMobileClose}
                        className="lg:hidden p-1 hover:bg-white/10 rounded transition-colors"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 overflow-y-auto">
                    <ul className="space-y-2">
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
                      w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                      transition-all duration-200
                      ${isActive
                                                ? 'bg-white text-emerald-600 shadow-lg shadow-emerald-900/20'
                                                : 'text-white/80 hover:bg-white/10 hover:text-white'
                                            }
                    `}
                                    >
                                        {IconComponent && (
                                            <IconComponent className="w-5 h-5" />
                                        )}
                                        <span>{item.label}</span>
                                        {isActive && (
                                            <ChevronRight className="w-4 h-4 ml-auto" />
                                        )}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Bottom Section */}
                <div className="px-4 pb-6 space-y-2 border-t border-white/10 pt-4">
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200">
                        <Settings className="w-5 h-5" />
                        <span>Settings</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200">
                        <LogOut className="w-5 h-5" />
                        <span>Log Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
