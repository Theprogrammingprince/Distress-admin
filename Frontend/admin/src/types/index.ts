export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    balance: number;
}

export interface NavItem {
    id: string;
    label: string;
    icon: string;
    path: string;
    badge?: number;
}

export interface Message {
    id: string;
    user: {
        name: string;
        avatar?: string;
    };
    unread?: number;
}

export interface StatCard {
    id: string;
    title: string;
    value: string;
    change: number;
    changeType: 'increase' | 'decrease';
    chartData?: number[];
}

export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    rating: number;
}

export interface SalesData {
    month: string;
    sales: number;
    earning: number;
}

export interface CountryData {
    country: string;
    flag: string;
    percentage: number;
    color: string;
}

export interface TrafficSource {
    source: string;
    percentage: number;
    color: string;
}

export interface Comment {
    id: string;
    user: {
        name: string;
        avatar?: string;
    };
    rating: number;
    text: string;
    date: string;
}
