import {
    Search,
    Filter,
    ArrowUpRight,
    ArrowDownRight,
    DollarSign,
    Download,
    Info
} from 'lucide-react';
import { cn } from '../lib/utils';

const mockTransactions = [
    { id: 'TX-9021', type: 'escrow_hold', amount: 850.00, seller: 'Sarah Connor', customer: 'John Doe', status: 'held', date: '2026-01-09 10:45' },
    { id: 'TX-9020', type: 'payout', amount: 1240.50, seller: 'Tony Stark', customer: 'N/A', status: 'completed', date: '2026-01-09 08:30' },
    { id: 'TX-9019', type: 'escrow_release', amount: 45.00, seller: 'Peter Parker', customer: 'Mary Jane', status: 'completed', date: '2026-01-08 16:20' },
    { id: 'TX-9018', type: 'escrow_hold', amount: 2100.00, seller: 'Bruce Wayne', customer: 'Harvey Dent', status: 'disputed', date: '2026-01-08 14:15' },
    { id: 'TX-9017', type: 'escrow_hold', amount: 15.99, seller: 'Clark Kent', customer: 'Lois Lane', status: 'held', date: '2026-01-08 12:05' },
];

const Payments = () => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Escrow & Payments</h1>
                    <p className="text-muted-foreground mt-1">Track funds, handle disputes, and manage seller payouts.</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-accent hover:bg-accent/80 px-4 py-2 rounded-lg font-medium transition-all border">
                        <Download className="w-4 h-4" />
                        Export Report
                    </button>
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-all shadow-lg shadow-primary/20">
                        <DollarSign className="w-4 h-4" />
                        Initiate Bulk Payout
                    </button>
                </div>
            </div>

            {/* Summary Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card p-5 rounded-2xl border border-border/50">
                    <p className="text-sm text-muted-foreground mb-1">Total in Escrow</p>
                    <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold">$124,502.20</span>
                        <span className="text-xs text-green-500 font-medium mb-1.5">+2.4%</span>
                    </div>
                </div>
                <div className="bg-card p-5 rounded-2xl border border-border/50">
                    <p className="text-sm text-muted-foreground mb-1">Pending Payouts</p>
                    <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold font-mono">$8,310.00</span>
                    </div>
                </div>
                <div className="bg-card p-5 rounded-2xl border border-border/50">
                    <p className="text-sm text-muted-foreground mb-1">Disputed Funds</p>
                    <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold text-primary font-mono">$1,200.00</span>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden">
                <div className="p-4 border-b flex flex-col md:flex-row justify-between items-center gap-4 bg-black/5">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by TXID or User..."
                            className="w-full bg-background border rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground border rounded hover:bg-accent transition-colors">
                            Last 30 Days
                        </button>
                        <Filter className="w-4 h-4 text-muted-foreground" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-muted/50 text-left border-b">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Transaction ID</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Parties</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Amount</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Status</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y border-border/40">
                            {mockTransactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-accent/40 transition-colors">
                                    <td className="px-6 py-4 font-mono text-sm text-primary font-bold">{tx.id}</td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <div className="flex items-center gap-2 text-sm font-medium">
                                                <ArrowUpRight className="w-3 h-3 text-green-500" />
                                                {tx.seller}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <ArrowDownRight className="w-3 h-3 text-red-500" />
                                                {tx.customer}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-bold">${tx.amount.toLocaleString()}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                                            tx.status === 'completed' && "bg-green-500/10 text-green-500 border-green-500/20",
                                            tx.status === 'held' && "bg-blue-500/10 text-blue-500 border-blue-500/20",
                                            tx.status === 'disputed' && "bg-red-500/10 text-red-500 border-red-500/20"
                                        )}>
                                            {tx.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {tx.status === 'held' && (
                                                <button className="bg-primary hover:opacity-90 text-primary-foreground px-3 py-1 rounded text-xs font-bold transition-all shadow-md shadow-primary/10">
                                                    Release
                                                </button>
                                            )}
                                            <button className="p-2 hover:bg-accent rounded-md transition-colors text-muted-foreground">
                                                <Info className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Payments;
