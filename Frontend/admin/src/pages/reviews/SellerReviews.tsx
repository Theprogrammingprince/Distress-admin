import { useState } from 'react';
import {
    XCircle,
    Clock,
    Eye,
    FileText,
    MapPin,
    AlertTriangle
} from 'lucide-react';

const mockApplications = [
    {
        id: 'APP-001',
        name: 'Sarah Jenkins',
        businessName: 'Jenkins Tech Hub',
        email: 'sarah@jenkins.com',
        location: 'Lagos, Nigeria',
        date: '2026-01-08',
        docs: ['ID_Card.pdf', 'Business_License.png'],
        status: 'pending'
    },
    {
        id: 'APP-002',
        name: 'Obi Wan',
        businessName: 'Jedi Collectibles',
        email: 'obi@force.com',
        location: 'Abuja, Nigeria',
        date: '2026-01-07',
        docs: ['Utility_Bill.pdf'],
        status: 'pending'
    },
    {
        id: 'APP-003',
        name: 'Amaka Eze',
        businessName: 'Amaka Styles',
        email: 'amaka@styles.com',
        location: 'Enugu, Nigeria',
        date: '2026-01-09',
        docs: ['ID_Card.png', 'Tax_Clearance.pdf'],
        status: 'pending'
    },
];

const SellerReviews = () => {
    const [selectedApp, setSelectedApp] = useState<any>(null);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Seller Sign-up Review</h1>
                <p className="text-muted-foreground mt-1">Review and approve new seller applications.</p>
            </div>

            <div className="bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-muted/50 text-left border-b">
                                <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Application ID</th>
                                <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Business / Seller</th>
                                <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Location</th>
                                <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y border-border/40">
                            {mockApplications.map((app) => (
                                <tr key={app.id} className="hover:bg-accent/40 transition-colors group">
                                    <td className="px-6 py-4 font-mono text-sm text-primary">{app.id}</td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="text-sm font-medium">{app.businessName}</p>
                                            <p className="text-xs text-muted-foreground">{app.name} • {app.email}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                            <MapPin className="w-3 h-3" />
                                            {app.location}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                                            <Clock className="w-3 h-3" />
                                            Pending Review
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => setSelectedApp(app)}
                                            className="inline-flex items-center gap-2 bg-accent hover:bg-primary hover:text-primary-foreground px-3 py-1.5 rounded-md text-sm font-medium transition-all"
                                        >
                                            <Eye className="w-4 h-4" />
                                            Review
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {mockApplications.length === 0 && (
                        <div className="p-12 text-center">
                            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                                <Clock className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <p className="text-muted-foreground">No pending applications found.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Review Modal Placeholder */}
            {selectedApp && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-card w-full max-w-2xl rounded-2xl border border-border overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b flex justify-between items-center bg-accent/30">
                            <div>
                                <h3 className="text-xl font-bold">Review Application: {selectedApp.id}</h3>
                                <p className="text-sm text-muted-foreground">Submitted on {selectedApp.date}</p>
                            </div>
                            <button onClick={() => setSelectedApp(null)} className="p-2 hover:bg-accent rounded-full transition-colors">
                                <XCircle className="w-6 h-6 text-muted-foreground" />
                            </button>
                        </div>

                        <div className="p-6 grid grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h4 className="text-sm font-semibold uppercase text-primary">Seller Details</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm">
                                        <span className="w-24 text-muted-foreground font-medium">Full Name</span>
                                        <span className="font-semibold">{selectedApp.name}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <span className="w-24 text-muted-foreground font-medium">Business</span>
                                        <span className="font-semibold">{selectedApp.businessName}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <span className="w-24 text-muted-foreground font-medium">Email</span>
                                        <span className="font-semibold underline underline-offset-2">{selectedApp.email}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-sm font-semibold uppercase text-primary">Documents</h4>
                                <div className="space-y-2">
                                    {selectedApp.docs.map((doc: string) => (
                                        <div key={doc} className="flex items-center justify-between p-2 bg-accent/50 rounded-lg border border-border/50 group hover:border-primary/50 cursor-pointer transition-all">
                                            <div className="flex items-center gap-2">
                                                <FileText className="w-4 h-4 text-primary" />
                                                <span className="text-xs font-medium truncate max-w-[120px]">{doc}</span>
                                            </div>
                                            <Eye className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mx-6 p-4 bg-yellow-500/5 rounded-xl border border-yellow-500/20 flex gap-4 items-start">
                            <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-yellow-500/90 leading-relaxed">
                                Please verify that the business license matches the provided seller information. Check for any inconsistencies in the documents before approving.
                            </p>
                        </div>

                        <div className="p-6 border-t bg-black/10 flex gap-3">
                            <button className="flex-1 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-red-foreground py-2.5 rounded-xl font-bold transition-all border border-red-500/20">
                                Reject Application
                            </button>
                            <button className="flex-1 bg-primary text-primary-foreground hover:opacity-90 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-primary/20">
                                Approve & Verify
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SellerReviews;
