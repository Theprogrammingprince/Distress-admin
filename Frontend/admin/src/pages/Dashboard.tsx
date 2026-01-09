import {
    Users,
    ShoppingBag,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    Activity
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
            <div className={cn(
                "flex items-center text-xs font-medium px-2 py-1 rounded-full",
                trend === 'up' ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
            )}>
                {trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {change}
            </div>
        </div>
        <h3 className="text-muted-foreground text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
);

const Dashboard = () => {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                <p className="text-muted-foreground mt-1">Welcome back, Admin. Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Revenue" value="$45,231.89" change="+20.1%" icon={DollarSign} trend="up" />
                <StatCard title="Active Sellers" value="1,234" change="+12.5%" icon={Users} trend="up" />
                <StatCard title="New Orders" value="567" change="+5.2%" icon={ShoppingBag} trend="up" />
                <StatCard title="Escrow Held" value="$12,345" change="-2.4%" icon={Activity} trend="down" />
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
                    <h3 className="text-lg font-semibold mb-6 text-primary">Recent Activity</h3>
                    <div className="space-y-6">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex gap-4 group">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center border group-hover:border-primary/50 transition-colors overflow-hidden">
                                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`} alt="user" />
                                    </div>
                                    {i < 5 && <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1px] h-6 bg-border"></div>}
                                </div>
                                <div>
                                    <p className="text-sm font-medium">
                                        <span className="text-primary font-bold">Seller #00{i}</span> posted a new product
                                    </p>
                                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                        <Clock className="w-3 h-3" />
                                        <span>{i * 12} mins ago</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors border border-dashed rounded-lg hover:border-primary/50">
                        View All Activity
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
