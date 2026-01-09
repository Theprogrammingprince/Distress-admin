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
    [key: string]: string | number; // Index signature for recharts compatibility
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

// Product Approval Types
export interface ProductApprovalRequest {
    id: string;
    productId: string;
    seller: {
        id: string;
        name: string;
        email: string;
        phone: string;
        rating: number;
        totalSales: number;
        joinDate: string;
        verified: boolean;
    };
    product: {
        name: string;
        description: string;
        category: string;
        price: number;
        images: string[];
        quantity: number;
        condition: 'new' | 'like_new' | 'good' | 'fair' | 'poor';
        usageDuration: {
            value: number;
            unit: 'days' | 'months' | 'years';
        };
    };
    verification: {
        receiptImages: string[];
        hasReceipt: boolean;
        receiptVerified: boolean;
        location: {
            country: string;
            state: string;
            city: string;
            zipCode: string;
            coordinates?: {
                lat: number;
                lng: number;
            };
        };
        locationVerified: boolean;
    };
    status: 'pending' | 'approved' | 'rejected' | 'needs_info';
    submittedAt: string;
    reviewedAt?: string;
    reviewedBy?: string;
    rejectionReason?: string;
    requestedInfo?: string;
    securityChecks: {
        imagesReviewed: boolean;
        descriptionReviewed: boolean;
        priceVerified: boolean;
        sellerVerified: boolean;
        receiptVerified: boolean;
        locationVerified: boolean;
        conditionVerified: boolean;
        usageDurationVerified: boolean;
    };
    adminNotes: string[];
}
