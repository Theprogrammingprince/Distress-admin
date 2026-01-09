import { TrendingUp, Users, Package, ShoppingBag } from 'lucide-react';
import type { StatCard as StatCardType } from '../../types';

const iconMap: { [key: string]: React.ElementType } = {
    TrendingUp,
    Users,
    Package,
    ShoppingBag,
};

interface StatCardProps {
    data: StatCardType;
}

export default function StatCard({ data }: StatCardProps) {
    const IconComponent = iconMap[data.icon];

    return (
        <div className="bg-white rounded-xl p-5 border border-gray-100 card-shadow hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500 mb-2">{data.title}</p>
                    <h3 className="text-2xl font-bold text-gray-900">{data.value}</h3>
                </div>
                <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: data.bgColor }}
                >
                    {IconComponent && (
                        <IconComponent className="w-8 h-8" style={{ color: data.color }} />
                    )}
                </div>
            </div>
        </div>
    );
}
