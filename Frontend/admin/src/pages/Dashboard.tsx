import { useState, useEffect } from 'react';
import {
    ShoppingBag,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    Activity,
    Loader2,
    AlertCircle
} from 'lucide-react';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import { cn } from '../lib/utils';
import { getVerificationStats, getPendingProducts } from '../lib/adminApi';

const data = [
    { name: 'Mon', revenue: 4000, orders: 24 },
    { name: 'Tue', revenue: 3000, orders: 13 },
    { name: 'Wed', revenue: 2000, orders: 98 },
    { name: 'Thu', revenue: 2780, orders: 39 },
    { name: 'Fri', revenue: 1890, orders: 48 },
    { name: 'Sat', revenue: 2390, orders: 38 },
    { name: 'Sun', revenue: 3490, orders: 43 },
];

const StatCard = ({ title, value, change, icon: Icon, trend }: any) => (
    <div className="bg-card p-6 rounded-xl border border-border/50 shadow-sm transition-all hover:shadow-md hover:border-primary/20 group">
        <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <Icon className="w-5 h-5 text-primary" />
            </div>
            {trend !== 'neutral' && (
                <div className={cn(
                    "flex items-center text-xs font-medium px-2 py-1 rounded-full",
                    trend === 'up' ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                )}>
                    {trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                    {change}
                </div>
            )}
        </div>
        <h3 className="text-muted-foreground text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold mt-1">{value}</p>
        {trend === 'neutral' && <p className="text-xs text-muted-foreground mt-1">{change}</p>}
    </div>
);

const Dashboard = () => {
    const [stats, setStats] = useState<any>(null);
    const [recentProducts, setRecentProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadDashboardData();
    }, []);

    async function loadDashboardData() {
        try {
            setLoading(true);
            setError(null);
            const [statsData, productsData] = await Promise.all([
                getVerificationStats(),
                getPendingProducts(1, 5)
            ]);
            setStats(statsData);
            setRecentProducts(productsData.products);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-red-500" />
                <div>
                    <p className="font-medium text-red-500">Error loading dashboard</p>
                    <p className="text-sm text-red-500/80 mt-1">{error}</p>
                </div>
                <button onClick={loadDashboardData} className="ml-auto px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded text-sm font-medium text-red-500">
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                <p className="text-muted-foreground mt-1">Welcome back, Admin. Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Pending Products" value={stats?.pending_count || 0} change="Awaiting Review" icon={Clock} trend="neutral" />
                <StatCard title="Approved Products" value={stats?.approved_count || 0} change="Live on Platform" icon={ShoppingBag} trend="up" />
                <StatCard title="Rejected Products" value={stats?.rejected_count || 0} change="Needs Attention" icon={Activity} trend="down" />
                <StatCard title="Total Products" value={stats?.total_count || 0} change="All Time" icon={DollarSign} trend="neutral" />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-card rounded-xl border border-border/50 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold">Revenue Analytics</h3>
                        <div className="flex gap-2">
                            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full cursor-pointer hover:bg-primary/20">7 Days</span>
                            <span className="px-3 py-1 hover:bg-accent text-muted-foreground text-xs font-medium rounded-full cursor-pointer">30 Days</span>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    stroke="#888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `$${value}`}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                                    itemStyle={{ color: 'hsl(var(--primary))' }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-card rounded-xl border border-border/50 p-6">
                    <h3 className="text-lg font-semibold mb-6 text-primary">Recent Pending Products</h3>
                    <div className="space-y-6">
                        {recentProducts.length > 0 ? (
                            recentProducts.map((product, i) => (
                                <div key={product.id} className="flex gap-4 group">
                                    <div className="relative">
                                        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center border group-hover:border-primary/50 transition-colors overflow-hidden">
                                            {product.image_url ? (
                                                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <ShoppingBag className="w-5 h-5 text-muted-foreground" />
                                            )}
                                        </div>
                                        {i < recentProducts.length - 1 && <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1px] h-6 bg-border"></div>}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">
                                            <span className="text-primary font-bold">{product.seller.full_name}</span> posted {product.name}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                            <Clock className="w-3 h-3" />
                                            <span>{new Date(product.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                <ShoppingBag className="w-8 h-8 mx-auto mb-2 opacity-30" />
                                <p className="text-sm">No pending products</p>
                            </div>
                        )}
                    </div>
                    <button className="w-full mt-6 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors border border-dashed rounded-lg hover:border-primary/50">
                        View All Products
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
