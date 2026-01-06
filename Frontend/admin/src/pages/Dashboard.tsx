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

    const statColors = ['#3b82f6', '#22c55e', '#f59e0b', '#8b5cf6'];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar activeItem={activeNavItem} onItemClick={setActiveNavItem} />

            {/* Main Content */}
            <div className="ml-64">
                {/* Header */}
                <Header
                    title="Dashboard"
                    subtitle="Here is the summary of overall data"
                />

                {/* Dashboard Content */}
                <main className="p-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {statCards.map((stat, index) => (
                            <StatCard
                                key={stat.id}
                                data={stat}
                                color={statColors[index % statColors.length]}
                            />
                        ))}
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {/* Product Sales Chart - Takes 2 columns */}
                        <div className="lg:col-span-2">
                            <ProductSalesChart />
                        </div>

                        {/* Top Selling Products */}
                        <div className="lg:col-span-1">
                            <TopSellingProducts />
                        </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
