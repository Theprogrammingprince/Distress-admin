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

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar
                activeItem={activeNavItem}
                onItemClick={onNavItemClick}
                isMobileOpen={isMobileSidebarOpen}
                onMobileClose={() => setIsMobileSidebarOpen(false)}
            />

            {/* Main Content */}
            <div className="lg:ml-64 transition-all duration-300">
                {/* Header */}
                <Header onMenuClick={() => setIsMobileSidebarOpen(true)} />

                {/* Dashboard Content */}
                <main className="p-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
                        {statCards.map((stat) => (
                            <StatCard key={stat.id} data={stat} />
                        ))}
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-6">
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
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
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
