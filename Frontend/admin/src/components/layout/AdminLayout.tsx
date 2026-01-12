import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Package,
    MessageSquare,
    CreditCard,
    Settings,
    Menu,
    X,
    Bell,
    Search,
    User,
    ShieldAlert,
    LogOut,
    ChevronDown
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { supabase } from '../../lib/supabase';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const location = useLocation();

    async function handleLogout() {
        await supabase.auth.signOut();
        window.location.reload();
    }

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
        { name: 'Sellers', icon: Users, path: '/admin/sellers' },
        { name: 'Products', icon: Package, path: '/admin/products' },
        {
            name: 'Reviews',
            icon: MessageSquare,
            children: [
                { name: 'Seller Reviews', path: '/admin/reviews/sellers' },
                { name: 'Product Reviews', path: '/admin/reviews/products' }
            ]
        },
        { name: 'Payments', icon: CreditCard, path: '/admin/payments' },
        { name: 'Settings', icon: Settings, path: '/admin/settings' },
    ];

    const currentPath = location.pathname;

    return (
        <div className="flex h-screen bg-background text-foreground overflow-hidden">
            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 flex flex-col bg-card border-r transition-all duration-300 ease-in-out",
                    isSidebarOpen ? "w-64" : "w-20"
                )}
            >
                <div className="flex items-center justify-between h-16 px-4 border-b">
                    <Link to="/admin" className="flex items-center gap-2 font-bold text-xl text-primary">
                        <ShieldAlert className="w-8 h-8" />
                        <span className={cn("transition-opacity", !isSidebarOpen && "sr-only")}>
                            DISTRESS
                        </span>
                    </Link>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-1 hover:bg-accent rounded-md lg:hidden"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto py-4 space-y-1">
                    {menuItems.map((item) => (
                        <div key={item.name}>
                            {item.path ? (
                                <Link
                                    to={item.path}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 mx-2 rounded-md transition-colors",
                                        currentPath === item.path
                                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                            : "hover:bg-accent text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    <item.icon className="w-5 h-5 flex-shrink-0" />
                                    <span className={cn("text-sm font-medium", !isSidebarOpen && "sr-only")}>
                                        {item.name}
                                    </span>
                                </Link>
                            ) : (
                                <div className="px-2">
                                    <div className={cn(
                                        "flex items-center gap-3 px-4 py-3 text-muted-foreground",
                                        !isSidebarOpen && "justify-center"
                                    )}>
                                        <item.icon className="w-5 h-5 flex-shrink-0" />
                                        <span className={cn("text-sm font-medium", !isSidebarOpen && "sr-only")}>
                                            {item.name}
                                        </span>
                                    </div>
                                    {item.children && isSidebarOpen && (
                                        <div className="ml-8 space-y-1 mt-1 border-l pl-2 border-border/50">
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.name}
                                                    to={child.path}
                                                    className={cn(
                                                        "block px-3 py-2 text-sm rounded-md transition-colors",
                                                        currentPath === child.path
                                                            ? "text-primary font-medium"
                                                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                                                    )}
                                                >
                                                    {child.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                <div className="p-4 border-t bg-black/20">
                    <div className={cn("flex items-center gap-3", !isSidebarOpen && "justify-center")}>
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                            <User size={16} />
                        </div>
                        {isSidebarOpen && (
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">Admin User</p>
                                <p className="text-xs text-muted-foreground truncate">admin@distress.com</p>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className={cn(
                "flex-1 flex flex-col transition-all duration-300",
                isSidebarOpen ? "pl-64" : "pl-20"
            )}>
                {/* Top Navbar */}
                <header className="h-16 flex items-center justify-between px-6 bg-card border-b sticky top-0 z-40 backdrop-blur-md bg-card/80">
                    <div className="flex items-center gap-4 flex-1">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 hover:bg-accent rounded-md"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <div className="relative max-w-md w-full hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search everything..."
                                className="w-full bg-background/50 border rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="relative p-2 hover:bg-accent rounded-full transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-card"></span>
                        </button>
                        <div className="h-6 w-[1px] bg-border mx-2"></div>
                        <div className="relative">
                            <button 
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                className="flex items-center gap-2 hover:bg-accent p-1 pr-3 rounded-full transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center overflow-hidden border">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" alt="avatar" />
                                </div>
                                <span className="text-sm font-medium hidden sm:inline-block">Admin Account</span>
                                <ChevronDown className="w-4 h-4 text-muted-foreground" />
                            </button>

                            {showProfileMenu && (
                                <>
                                    <div 
                                        className="fixed inset-0 z-40" 
                                        onClick={() => setShowProfileMenu(false)}
                                    />
                                    <div className="absolute right-0 mt-2 w-56 bg-card rounded-lg shadow-lg border border-border py-2 z-50">
                                        <div className="px-4 py-3 border-b border-border">
                                            <p className="text-sm font-semibold">Admin User</p>
                                            <p className="text-xs text-muted-foreground mt-0.5">john@gmail.com</p>
                                            <span className="inline-block mt-2 px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded">
                                                Super Admin
                                            </span>
                                        </div>
                                        
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/10 transition-colors"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span>Sign Out</span>
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6 bg-background/50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
