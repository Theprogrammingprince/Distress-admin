import type { NavItem, StatCard, SalesData, ShipmentStatus, Order, SalesOverviewItem, Product } from '../types';

export const currentUser = {
    id: '1',
    name: 'Admin User',
    email: 'admin@distress.com',
    role: 'Super Admin',
};

export const navigationItems: NavItem[] = [
    { id: '1', label: 'Dashboard', icon: 'LayoutDashboard', path: '/' },
    { id: '2', label: 'Products', icon: 'Package', path: '/products' },
    { id: '3', label: 'Payments', icon: 'CreditCard', path: '/payments' },
    { id: '4', label: 'Orders', icon: 'ShoppingBag', path: '/orders' },
    { id: '5', label: 'Chat', icon: 'MessageCircle', path: '/chat' },
    { id: '6', label: 'Mail', icon: 'Mail', path: '/mail' },
    { id: '7', label: 'Calendar', icon: 'Calendar', path: '/calendar' },
];

export const statCards: StatCard[] = [
    {
        id: '1',
        title: 'Total Sales',
        value: '$100.4K',
        icon: 'TrendingUp',
        color: '#8b5cf6',
        bgColor: '#f3e8ff',
    },
    {
        id: '2',
        title: 'Total Customers',
        value: '20.4K',
        icon: 'Users',
        color: '#3b82f6',
        bgColor: '#dbeafe',
    },
    {
        id: '3',
        title: 'Total Products',
        value: '2.4K',
        icon: 'Package',
        color: '#f97316',
        bgColor: '#ffedd5',
    },
    {
        id: '4',
        title: 'Total Orders',
        value: '1.6K',
        icon: 'ShoppingBag',
        color: '#10b981',
        bgColor: '#d1fae5',
    },
];

export const salesData: SalesData[] = [
    { month: 'Jan', value: 45000 },
    { month: 'Feb', value: 52000 },
    { month: 'Mar', value: 48000 },
    { month: 'Apr', value: 61000 },
    { month: 'May', value: 55000 },
    { month: 'Jun', value: 65180 },
    { month: 'Jul', value: 70000 },
    { month: 'Aug', value: 68000 },
    { month: 'Sept', value: 72000 },
    { month: 'Oct', value: 69000 },
    { month: 'Nov', value: 75000 },
    { month: 'Dec', value: 78000 },
];

export const shipmentStatus: ShipmentStatus[] = [
    { status: 'Delivered', percentage: 45, color: '#10b981' },
    { status: 'Returned', percentage: 25, color: '#ef4444' },
    { status: 'On Delivery', percentage: 20, color: '#f59e0b' },
    { status: 'Canceled', percentage: 10, color: '#3b82f6' },
];

export const recentOrders: Order[] = [
    {
        id: '1',
        orderId: '#127981',
        product: 'Denim Jacket',
        productImage: '',
        customerName: 'Alex Ahemd',
        date: '12 nov 2025',
        item: 2,
        price: 100,
        total: 240,
        status: 'Pending',
    },
    {
        id: '2',
        orderId: '#127982',
        product: 'Green Polo',
        productImage: '',
        customerName: 'Adira Sen',
        date: '10 nov 2025',
        item: 1,
        price: 120,
        total: 240,
        status: 'Pending',
    },
    {
        id: '3',
        orderId: '#127983',
        product: 'Formal Blazer',
        productImage: '',
        customerName: 'Alex Ahemd',
        date: '12 nov 2025',
        item: 2,
        price: 100,
        total: 200,
        status: 'Completed',
    },
    {
        id: '4',
        orderId: '#127984',
        product: 'Formal Shirt',
        productImage: '',
        customerName: 'Alexa Martin',
        date: '8 nov 2025',
        item: 1,
        price: 150,
        total: 240,
        status: 'Pending',
    },
    {
        id: '5',
        orderId: '#127985',
        product: 'Denim Jacket',
        productImage: '',
        customerName: 'Alex Ahemd',
        date: '12 nov 2025',
        item: 1,
        price: 100,
        total: 240,
        status: 'Pending',
    },
    {
        id: '6',
        orderId: '#127986',
        product: 'Denim Jacket',
        productImage: '',
        customerName: 'Olly John',
        date: '12 nov 2025',
        item: 1,
        price: 100,
        total: 240,
        status: 'Completed',
    },
];

export const salesOverview: SalesOverviewItem[] = [
    { category: 'Jeans', percentage: 48, color: '#8b5cf6', barColor: '#c4b5fd' },
    { category: 'Shirt', percentage: 30, color: '#ef4444', barColor: '#fca5a5' },
    { category: 'Top', percentage: 25, color: '#f59e0b', barColor: '#fcd34d' },
    { category: 'Pant', percentage: 60, color: '#10b981', barColor: '#6ee7b7' },
    { category: 'Hat', percentage: 35, color: '#3b82f6', barColor: '#93c5fd' },
];

export const productsData: Product[] = [
    {
        id: '1',
        name: 'Wireless Headphones',
        category: 'Electronics',
        price: 99.99,
        stock: 45,
        status: 'In Stock',
    },
    {
        id: '2',
        name: 'Smart Watch',
        category: 'Electronics',
        price: 199.99,
        stock: 12,
        status: 'Low Stock',
    },
    {
        id: '3',
        name: 'Laptop Stand',
        category: 'Accessories',
        price: 49.99,
        stock: 0,
        status: 'Out of Stock',
    },
    {
        id: '4',
        name: 'USB-C Cable',
        category: 'Accessories',
        price: 19.99,
        stock: 150,
        status: 'In Stock',
    },
    {
        id: '5',
        name: 'Mechanical Keyboard',
        category: 'Electronics',
        price: 129.99,
        stock: 28,
        status: 'In Stock',
    },
];
