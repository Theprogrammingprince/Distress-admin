export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: string;
}

export interface NavItem {
    id: string;
    label: string;
    icon: string;
    path: string;
}

export interface StatCard {
    id: string;
    title: string;
    value: string;
    icon: string;
    color: string;
    bgColor: string;
}

export interface SalesData {
    month: string;
    value: number;
}

export interface ShipmentStatus {
    status: string;
    percentage: number;
    color: string;
}

export interface Order {
    id: string;
    orderId: string;
    product: string;
    productImage: string;
    customerName: string;
    date: string;
    item: number;
    price: number;
    total: number;
    status: 'Pending' | 'Completed' | 'Returned';
}

export interface SalesOverviewItem {
    category: string;
    percentage: number;
    color: string;
    barColor: string;
}

export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    status: 'In Stock' | 'Low Stock' | 'Out of Stock';
    image?: string;
}
