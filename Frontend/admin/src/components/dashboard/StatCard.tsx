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
        <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-2">{data.title}</p>
                    <h3 className="text-3xl font-bold text-gray-900">{data.value}</h3>
                </div>
                <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: data.bgColor }}
                >
                    {IconComponent && (
                        <IconComponent className="w-7 h-7" style={{ color: data.color }} />
                    )}
                </div>
            </div>
        </div>
    );
}
