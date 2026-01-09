import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    BarChart3,
    Star,
    Users,
    DollarSign,
    Settings,
    User,
    Menu,
} from 'lucide-react';

interface SidebarProps {
    activeItem: string;
    onItemClick: (id: string, path: string) => void;
    isMobileOpen: boolean;
    onMobileClose: () => void;
}

const navItems = [
    { id: '1', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { id: '2', label: 'Products', icon: Package, path: '/products' },
    { id: '3', label: 'Orders', icon: ShoppingCart, path: '/orders' },
    { id: '4', label: 'Statistics', icon: BarChart3, path: '/statistics' },
    { id: '5', label: 'Reviews', icon: Star, path: '/reviews' },
    { id: '6', label: 'Customers', icon: Users, path: '/customers' },
    { id: '7', label: 'Transactions', icon: DollarSign, path: '/transactions' },
    { id: '8', label: 'Settings', icon: Settings, path: '/settings' },
    { id: '9', label: 'Profile', icon: User, path: '/profile' },
];

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
          fixed top-0 left-0 h-screen bg-white border-r border-gray-200 z-50
          transition-all duration-300 ease-in-out w-64
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col
        `}
            >
                {/* Logo Section */}
                <div className="h-20 flex items-center justify-between px-6 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-gray-900">Starpath</span>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={onMobileClose}
                        className="lg:hidden p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <Menu className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 overflow-y-auto">
                    <ul className="space-y-1">
                        {navItems.map((item) => {
                            const IconComponent = item.icon;
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
                      w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium text-sm
                      transition-all duration-200
                      ${isActive
                                                ? 'bg-blue-50 text-blue-600'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }
                    `}
                                    >
                                        <IconComponent className="w-5 h-5 flex-shrink-0" />
                                        <span className="flex-1 text-left">{item.label}</span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </aside>
        </>
    );
}
