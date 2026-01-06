import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import StatCard from '../components/dashboard/StatCard';
import ProductSalesChart from '../components/dashboard/ProductSalesChart';
import TopSellingProducts from '../components/dashboard/TopSellingProducts';
import TopCountries from '../components/dashboard/TopCountries';
import TrafficSources from '../components/dashboard/TrafficSources';
import NewComments from '../components/dashboard/NewComments';
import { statCards } from '../data/mockData';

export default function Dashboard() {
    const [activeNavItem, setActiveNavItem] = useState('1');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const statConfigs = [
        { color: '#3b82f6', chartType: 'line' as const },
        { color: '#22c55e', chartType: 'bar' as const },
        { color: '#06b6d4', chartType: 'line' as const },
        { color: '#ec4899', chartType: 'line' as const },
    ];

    return (
        <div className="min-h-screen bg-[#fafbfc]">
            {/* Sidebar */}
            <Sidebar
                activeItem={activeNavItem}
                onItemClick={setActiveNavItem}
                isCollapsed={isSidebarCollapsed}
                onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                isMobileOpen={isMobileSidebarOpen}
                onMobileClose={() => setIsMobileSidebarOpen(false)}
            />

            {/* Main Content */}
            <div
                className={`
          transition-all duration-300 ease-in-out
          ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}
        `}
            >
                {/* Header */}
                <Header
                    title="Dashboard"
                    subtitle="Here is the summary of overall data"
                    onMenuClick={() => setIsMobileSidebarOpen(true)}
                />

                {/* Dashboard Content */}
                <main className="p-4 lg:p-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-4 lg:mb-6">
                        {statCards.map((stat, index) => (
                            <StatCard
                                key={stat.id}
                                data={stat}
                                color={statConfigs[index].color}
                                chartType={statConfigs[index].chartType}
                            />
                        ))}
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5 mb-4 lg:mb-6">
                        {/* Product Sales Chart - Takes 2 columns on large screens */}
                        <div className="lg:col-span-2">
                            <ProductSalesChart />
                        </div>

                        {/* Top Selling Products */}
                        <div className="lg:col-span-1">
                            <TopSellingProducts />
                        </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
                        {/* Top Countries */}
                        <TopCountries />

                        {/* Traffic Sources */}
                        <TrafficSources />

                        {/* New Comments */}
                        <NewComments />
                    </div>
                </main>
            </div>
        </div>
    );
}
