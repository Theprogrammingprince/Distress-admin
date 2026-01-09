import {
    ShieldAlert,
    Clock,
    CheckCircle2,
    XCircle,
    Timer,
    ShoppingBag
} from 'lucide-react';

const mockProductQueue = [
    { id: 'PRD-101', name: 'iPhone 15 Pro (Mint)', seller: 'Sarah Connor', price: 850, category: 'Electronics', reason: 'High-value item', date: '6 mins ago' },
    { id: 'PRD-102', name: 'Vintage Leather Satchel', seller: 'Indiana Jones', price: 120, category: 'Fashion', reason: 'New seller', date: '12 mins ago' },
    { id: 'PRD-103', name: 'Core i9 processor', seller: 'Tony Stark', price: 450, category: 'Electronics', reason: 'Unverified serial', date: '45 mins ago' },
    { id: 'PRD-104', name: 'Supreme Tee (Limited)', seller: 'hype_beast', price: 200, category: 'Fashion', reason: 'Brand restriction', date: '2 hrs ago' },
];

const ProductReviews = () => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Product Review Queue</h1>
                <p className="text-muted-foreground mt-1">Verify listings before they go live on the marketplace.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {mockProductQueue.map((item) => (
                    <div key={item.id} className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all flex group shadow-sm hover:shadow-xl hover:shadow-black/40">
                        <div className="w-1/3 bg-accent/20 relative flex items-center justify-center border-r">
                            <ShoppingBag className="w-12 h-12 text-muted-foreground/20 group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            <div className="absolute top-3 left-3 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded-md text-[10px] font-bold text-white uppercase tracking-wider">
                                {item.category}
                            </div>
                        </div>

                        <div className="flex-1 p-5 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{item.name}</h3>
                                    <span className="text-sm font-mono text-muted-foreground">#{item.id}</span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Posted by <span className="text-foreground font-medium">{item.seller}</span> • <span className="font-bold text-primary">${item.price}</span>
                                </p>

                                <div className="flex items-start gap-2 p-2 bg-red-500/5 rounded-lg border border-red-500/10 mb-4">
                                    <ShieldAlert className="w-4 h-4 text-primary mt-0.5" />
                                    <div>
                                        <p className="text-xs font-semibold text-primary">Flag Reason</p>
                                        <p className="text-xs text-muted-foreground">{item.reason}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-border/40">
                                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                                    <Clock className="w-3 h-3" />
                                    {item.date}
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 bg-accent hover:bg-black rounded-lg transition-colors border group/btn">
                                        <XCircle className="w-4 h-4 text-muted-foreground group-hover/btn:text-red-500 transition-colors" />
                                    </button>
                                    <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-xs font-bold hover:scale-105 transition-all shadow-lg shadow-primary/20">
                                        <CheckCircle2 className="w-4 h-4" />
                                        Approve
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {mockProductQueue.length === 0 && (
                <div className="py-20 text-center bg-card rounded-2xl border border-dashed border-border">
                    <CheckCircle2 className="w-16 h-16 text-green-500/30 mx-auto mb-4" />
                    <h2 className="text-xl font-bold">Queue is empty</h2>
                    <p className="text-muted-foreground">All products have been reviewed. Good job!</p>
                </div>
            )}

            {/* Verification Logic Tip */}
            <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 flex gap-4">
                <Timer className="w-6 h-6 text-blue-500 flex-shrink-0" />
                <div>
                    <h4 className="text-sm font-bold text-blue-500">Auto-Reject Countdown</h4>
                    <p className="text-xs text-muted-foreground max-w-2xl leading-relaxed">
                        Unreviewed listings are automatically archived after 12 hours. High-value items ($500+) require double-admin verification as per security protocol.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductReviews;
