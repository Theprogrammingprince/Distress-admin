import { NavItem, Message, StatCard, SalesData, CountryData, TrafficSource, Comment } from '../types';

export const navigationItems: NavItem[] = [
    { id: '1', label: 'Dashboard', icon: 'LayoutDashboard', path: '/', badge: undefined },
    { id: '2', label: 'Orders', icon: 'ShoppingCart', path: '/orders', badge: undefined },
    { id: '3', label: 'Products', icon: 'Package', path: '/products', badge: undefined },
    { id: '4', label: 'Inventory', icon: 'Warehouse', path: '/inventory', badge: undefined },
    { id: '5', label: 'Customer', icon: 'Users', path: '/customers', badge: undefined },
    { id: '6', label: 'Manage User', icon: 'UserCog', path: '/manage-users', badge: undefined },
    { id: '7', label: 'Settings', icon: 'Settings', path: '/settings', badge: undefined },
];

export const messages: Message[] = [
    { id: '1', user: { name: 'Abir Mahmud' }, unread: undefined },
    { id: '2', user: { name: 'Jessia Pie' }, unread: undefined },
    { id: '3', user: { name: 'Hendai Kowa' }, unread: 1 },
    { id: '4', user: { name: 'Levrino' }, unread: undefined },
];

export const statCards: StatCard[] = [
    {
        id: '1',
        title: 'Total Visitor',
        value: '$45,987',
        change: 12.87,
        changeType: 'increase',
        chartData: [30, 40, 35, 50, 45, 60, 55, 70, 65, 80, 75, 90],
    },
    {
        id: '2',
        title: 'Total products',
        value: '$632,235',
        change: 85.23,
        changeType: 'increase',
        chartData: [20, 30, 25, 35, 40, 38, 45, 50, 48, 55, 60, 65],
    },
    {
        id: '3',
        title: 'Total Product Views',
        value: '$25,987',
        change: 90.89,
        changeType: 'increase',
        chartData: [40, 35, 45, 40, 50, 45, 55, 50, 60, 55, 65, 70],
    },
    {
        id: '4',
        title: 'Average Orders',
        value: '$19,214',
        change: 21.12,
        changeType: 'increase',
        chartData: [25, 30, 28, 35, 32, 40, 38, 45, 42, 50, 48, 55],
    },
];

export const salesData: SalesData[] = [
    { month: 'Jan', sales: 400, earning: 300 },
    { month: 'Feb', sales: 350, earning: 280 },
    { month: 'Mar', sales: 500, earning: 400 },
    { month: 'Apr', sales: 420, earning: 350 },
    { month: 'May', sales: 480, earning: 380 },
    { month: 'Jun', sales: 980, earning: 700 },
    { month: 'Jul', sales: 600, earning: 500 },
    { month: 'Aug', sales: 550, earning: 450 },
    { month: 'Sep', sales: 620, earning: 520 },
    { month: 'Oct', sales: 580, earning: 480 },
    { month: 'Nov', sales: 640, earning: 540 },
    { month: 'Dec', sales: 700, earning: 600 },
];

export const countryData: CountryData[] = [
    { country: 'United States', flag: '🇺🇸', percentage: 35, color: '#3b82f6' },
    { country: 'United Kingdom', flag: '🇬🇧', percentage: 25, color: '#22c55e' },
    { country: 'Germany', flag: '🇩🇪', percentage: 20, color: '#f59e0b' },
    { country: 'France', flag: '🇫🇷', percentage: 12, color: '#ef4444' },
    { country: 'Others', flag: '🌍', percentage: 8, color: '#8b5cf6' },
];

export const trafficSources: TrafficSource[] = [
    { source: 'Direct', percentage: 45, color: '#3b82f6' },
    { source: 'Social', percentage: 30, color: '#22c55e' },
    { source: 'Referral', percentage: 15, color: '#f59e0b' },
    { source: 'Email', percentage: 10, color: '#ef4444' },
];

export const recentComments: Comment[] = [
    {
        id: '1',
        user: { name: 'Kathryn Murphy' },
        rating: 5,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lec dolor vel est interdum.',
        date: '2 hours ago',
    },
    {
        id: '2',
        user: { name: 'Leslie Alexander' },
        rating: 4,
        text: 'Great product! Fast shipping and excellent quality.',
        date: '5 hours ago',
    },
];

export const currentUser = {
    id: '1',
    name: 'Khondoker Rasel',
    email: 'rasel@example.com',
    balance: 1365,
};
