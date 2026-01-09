import {
    User,
    Bell,
    Shield,
    Database,
    Save,
    Lock,
    ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';

const Settings = () => {
    const sections = [
        { id: 'profile', label: 'Admin Profile', icon: User, desc: 'Manage your administrative account details' },
        { id: 'security', label: 'Security & Auth', icon: Lock, desc: 'Two-factor authentication and passwords' },
        { id: 'notifications', label: 'Notification Settings', icon: Bell, desc: 'Configure system alerts and emails' },
        { id: 'marketplace', label: 'Marketplace Rules', icon: Shield, desc: 'Commission rates, escrow timeouts, global rules' },
        { id: 'system', label: 'System Status', icon: Database, desc: 'Core server settings and logs' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
                <p className="text-muted-foreground mt-1">Configure the global marketplace environment and admin preferences.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Navigation Sidebar */}
                <div className="lg:col-span-4 space-y-2">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            className={cn(
                                "w-full flex items-center justify-between p-4 rounded-xl border border-transparent transition-all group hover:bg-accent hover:border-border",
                                section.id === 'profile' && "bg-card border-border shadow-sm ring-1 ring-primary/20"
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "p-2 rounded-lg bg-accent group-hover:bg-primary/20 transition-colors",
                                    section.id === 'profile' && "bg-primary/10"
                                )}>
                                    <section.icon className={cn(
                                        "w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors",
                                        section.id === 'profile' && "text-primary"
                                    )} />
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-bold">{section.label}</p>
                                    <p className="text-xs text-muted-foreground whitespace-nowrap">{section.desc}</p>
                                </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1" />
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="lg:col-span-8 bg-card rounded-2xl border border-border shadow-md overflow-hidden flex flex-col">
                    <div className="p-6 border-b bg-gradient-to-r from-primary/5 to-transparent">
                        <h3 className="text-xl font-bold">Admin Profile Settings</h3>
                        <p className="text-sm text-muted-foreground">Changes made here will be visible to other system administrators.</p>
                    </div>

                    <div className="p-8 space-y-6 flex-1">
                        <div className="flex flex-col sm:flex-row gap-8 items-center border-b border-border/50 pb-8">
                            <div className="relative group cursor-pointer">
                                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center border-2 border-dashed border-primary/50 group-hover:bg-primary/30 transition-all overflow-hidden">
                                    <User className="w-12 h-12 text-primary" />
                                </div>
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 rounded-full flex items-center justify-center transition-opacity">
                                    <Save className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="text-center sm:text-left">
                                <h4 className="font-bold">Administrator Avatar</h4>
                                <p className="text-xs text-muted-foreground mt-1 mb-3">JPG, GIF or PNG. Max size of 800K</p>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1.5 bg-accent rounded text-xs font-bold hover:bg-border transition-colors">Upload New</button>
                                    <button className="px-3 py-1.5 text-xs font-bold text-red-500 hover:bg-red-500/10 rounded transition-colors">Remove</button>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Admin Username</label>
                                <input type="text" defaultValue="superadmin_paul" className="w-full bg-background border border-border rounded-lg py-2 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Display Name</label>
                                <input type="text" defaultValue="Paul Prince" className="w-full bg-background border border-border rounded-lg py-2 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Contact Email</label>
                            <input type="email" defaultValue="admin@distress.com" className="w-full bg-background border border-border rounded-lg py-2 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
                        </div>

                        <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 flex gap-4">
                            <Toggle checked />
                            <div className="flex-1">
                                <h5 className="text-sm font-bold text-primary">Biometric Login</h5>
                                <p className="text-xs text-muted-foreground leading-relaxed">Fast-track high-value approvals using FaceID or TouchID when on mobile.</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-black/10 border-t flex justify-between items-center">
                        <p className="text-xs text-muted-foreground">Last saved: 3 hours ago</p>
                        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/30 active:scale-95">
                            <Save className="w-4 h-4" />
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Toggle = ({ checked }: { checked?: boolean }) => (
    <div className={cn(
        "w-10 h-5 rounded-full relative transition-colors cursor-pointer flex-shrink-0 mt-1",
        checked ? "bg-primary" : "bg-muted"
    )}>
        <div className={cn(
            "absolute top-1 w-3 h-3 bg-white rounded-full transition-all shadow-sm",
            checked ? "right-1" : "left-1"
        )} />
    </div>
);

export default Settings;
