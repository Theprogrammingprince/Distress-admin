import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import StatCard from '../components/dashboard/StatCard';
import SalesStatistic from '../components/dashboard/SalesStatistic';
import ShipmentStatus from '../components/dashboard/ShipmentStatus';
import RecentOrders from '../components/dashboard/RecentOrders';
import SalesOverview from '../components/dashboard/SalesOverview';
import { statCards } from '../data/mockData';

interface DashboardProps {
    activeNavItem: string;
    onNavItemClick: (id: string, path: string) => void;
}

export default function Dashboard({ activeNavItem, onNavItemClick }: DashboardProps) {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar
                activeItem={activeNavItem}
                onItemClick={onNavItemClick}
                isMobileOpen={isMobileSidebarOpen}
                onMobileClose={() => setIsMobileSidebarOpen(false)}
                isCollapsed={isSidebarCollapsed}
                onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            />

            {/* Main Content */}
            <div
                className={`transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
                    }`}
            >
                {/* Header */}
                <Header
                    onMenuClick={() => setIsMobileSidebarOpen(true)}
                    isSidebarCollapsed={isSidebarCollapsed}
                />

                {/* Dashboard Content */}
                <main className="p-4 sm:p-6 lg:p-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
                        {statCards.map((stat) => (
                            <StatCard key={stat.id} data={stat} />
                        ))}
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
                        {/* Sales Statistic - Takes 2 columns on xl */}
                        <div className="xl:col-span-2">
                            <SalesStatistic />
                        </div>

                        {/* Shipment Status */}
                        <div className="xl:col-span-1">
                            <ShipmentStatus />
                        </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
                        {/* Recent Orders - Takes 2 columns on xl */}
                        <div className="xl:col-span-2">
                            <RecentOrders />
                        </div>

                        {/* Sales Overview */}
                        <div className="xl:col-span-1">
                            <SalesOverview />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
