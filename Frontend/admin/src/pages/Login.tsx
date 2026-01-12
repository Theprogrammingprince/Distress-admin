import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { LogIn, Loader2, ShieldCheck } from 'lucide-react';

const Login = ({ onLogin }: { onLogin: () => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            console.log('🔐 Starting login process...');
            console.log('📧 Email:', email);

            const { data, error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            console.log('✅ Sign in response:', { data, error: signInError });

            if (signInError) {
                console.error('❌ Sign in error:', signInError);
                throw signInError;
            }

            if (!data.user) {
                console.error('❌ No user data returned');
                throw new Error('No user data returned from authentication');
            }

            console.log('👤 User authenticated:', data.user.id);
            console.log('🔍 Checking user role in profiles table...');

            // Check if user is super_admin
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', data.user.id)
                .single();

            console.log('📊 Profile query result:', { profile, error: profileError });

            if (profileError) {
                console.error('❌ Profile query error:', {
                    message: profileError.message,
                    details: profileError.details,
                    hint: profileError.hint,
                    code: profileError.code
                });
                await supabase.auth.signOut();
                throw new Error(`Database error: ${profileError.message}. Check console for details.`);
            }

            if (!profile) {
                console.error('❌ No profile found for user:', data.user.id);
                await supabase.auth.signOut();
                throw new Error('No profile found. Please contact administrator.');
            }

            console.log('👔 User role:', profile.role);

            if (profile.role !== 'super_admin') {
                console.error('❌ Access denied. User role:', profile.role);
                await supabase.auth.signOut();
                throw new Error('Access denied. Super admin role required.');
            }

            console.log('✅ Login successful!');
            onLogin();
        } catch (err) {
            console.error('❌ Login failed:', err);
            setError(err instanceof Error ? err.message : 'Failed to login');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-card rounded-2xl border border-border shadow-2xl p-8">
                    <div className="flex items-center justify-center mb-8">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                            <ShieldCheck className="w-8 h-8 text-primary" />
                        </div>
                    </div>
                    
                    <h1 className="text-3xl font-bold text-center mb-2">Admin Login</h1>
                    <p className="text-muted-foreground text-center mb-8">
                        Sign in to access the admin dashboard
                    </p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-background border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="admin@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-background border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm text-red-500">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5" />
                                    Sign In
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                        <p className="text-xs text-blue-500 font-semibold mb-1">First time setup?</p>
                        <p className="text-xs text-muted-foreground">
                            Create a user in Supabase Dashboard and set role to 'super_admin' in the profiles table.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
