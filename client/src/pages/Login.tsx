// Redesigned Login page with split layout - Bhindi-style clean design
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Link, useLocation } from "wouter";
import { Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";

export default function Login() {
    const [isRegister, setIsRegister] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
    });
    const { toast } = useToast();
    const { setUser } = useAuth();
    const [location] = useLocation();

    // Check URL for register param
    useEffect(() => {
        if (location.includes('register=true')) {
            setIsRegister(true);
        }
    }, [location]);

    // Password strength indicator
    const getPasswordStrength = (password: string) => {
        if (password.length === 0) return { level: 0, text: '', color: '' };
        if (password.length < 6) return { level: 1, text: 'Too short', color: 'bg-red-500' };
        if (password.length < 8) return { level: 2, text: 'Weak', color: 'bg-orange-500' };
        if (password.length < 10) return { level: 3, text: 'Good', color: 'bg-yellow-500' };
        return { level: 4, text: 'Strong', color: 'bg-green-500' };
    };

    const passwordStrength = getPasswordStrength(formData.password);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
            const API_URL = ''; // Use relative URL - Vercel proxy forwards to Render

            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data.user);

                toast({
                    title: isRegister ? '🎉 Welcome to SAGE DO!' : '✅ Welcome back!',
                    description: isRegister ? "You've received FREE GPT Prompts + 1 Golden Ticket!" : 'Successfully logged in'
                });

                if (data.user.isAdmin) {
                    window.location.href = '/admin';
                } else {
                    window.location.href = '/dashboard';
                }
            } else {
                toast({
                    title: 'Error',
                    description: data.message || 'Login failed',
                    variant: 'destructive'
                });
            }
        } catch (error: any) {
            console.error('Login error:', error);
            toast({
                title: 'Error',
                description: error.message || 'Something went wrong. Please try again.',
                variant: 'destructive'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 bg-background">
                {/* Logo */}
                <Link href="/" className="mb-12">
                    <div className="flex items-center gap-2">
                        <img src="/sagedo_logo_pro_clean.png" alt="SAGE DO" className="h-10 w-auto" />
                        <span className="text-2xl font-black">
                            <span className="text-primary">SAGE</span>
                            <span className="text-foreground">DO</span>
                        </span>
                    </div>
                </Link>

                {/* Form Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                        {isRegister ? 'Sign Up to SAGE DO' : 'Welcome Back'}
                    </h1>
                    <p className="text-muted-foreground">
                        {isRegister
                            ? 'Get FREE GPT Prompts + 1 Golden Ticket on signup!'
                            : 'Login to access your dashboard'}
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {isRegister && (
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Enter your full name"
                                required={isRegister}
                                className="h-12 bg-muted/50 border-border/30 focus:border-primary transition-colors"
                            />
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="Enter your email"
                            required
                            className="h-12 bg-muted/50 border-border/30 focus:border-primary transition-colors"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="Enter your password"
                                required
                                minLength={6}
                                className="h-12 bg-muted/50 border-border/30 focus:border-primary transition-colors pr-12"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>

                        {/* Password Strength Indicator */}
                        {isRegister && formData.password.length > 0 && (
                            <div className="flex items-center gap-2 mt-2">
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4].map((level) => (
                                        <div
                                            key={level}
                                            className={`h-1 w-6 rounded-full transition-colors ${passwordStrength.level >= level ? passwordStrength.color : 'bg-muted'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className={`text-xs font-medium ${passwordStrength.level === 4 ? 'text-green-500' :
                                    passwordStrength.level === 3 ? 'text-yellow-500' :
                                        passwordStrength.level === 2 ? 'text-orange-500' : 'text-red-500'
                                    }`}>
                                    {passwordStrength.text}
                                </span>
                            </div>
                        )}

                        {!isRegister && (
                            <div className="text-right">
                                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base transition-all"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Please wait...' : (
                            <>
                                {isRegister ? 'Continue' : 'Login'}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </Button>
                </form>

                {/* Toggle */}
                <p className="mt-8 text-center text-sm text-muted-foreground">
                    {isRegister ? 'Already have an account?' : "Don't have an account?"}
                    <button
                        onClick={() => {
                            setIsRegister(!isRegister);
                            setFormData({ email: '', password: '', name: '' });
                        }}
                        className="ml-2 text-primary font-semibold hover:underline"
                    >
                        {isRegister ? 'Sign in' : 'Register'}
                    </button>
                    {!isRegister && ' or'}
                </p>

                {/* Terms */}
                <p className="mt-8 text-center text-xs text-muted-foreground">
                    By continuing, you agree to our{' '}
                    <a href="/terms" className="text-primary hover:underline">Terms</a>
                    {' & '}
                    <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
                </p>
            </div>

            {/* Right Side - Hero */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-destructive/20 rounded-full blur-3xl" />
                </div>

                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }} />

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center items-center p-16 text-center">
                    {/* Sales Manager Image */}
                    <div className="mb-8 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-destructive rounded-full blur-xl opacity-40 scale-110" />
                        <img
                            src="/sales_manager.png"
                            alt="SAGE DO Team"
                            className="relative w-48 h-48 rounded-full object-cover border-4 border-white/20 shadow-2xl"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            AI + Human
                        </div>
                    </div>

                    {/* Headline */}
                    <h2 className="text-4xl font-black text-white mb-4 leading-tight">
                        Stop Managing Tasks
                        <br />
                        <span className="text-transparent bg-gradient-to-r from-primary to-destructive bg-clip-text">
                            Start Delegating Them
                        </span>
                    </h2>

                    {/* Subtext */}
                    <p className="text-lg text-slate-300 max-w-md">
                        We Do Your Daily Grind, You Do Grand Things.
                    </p>

                    {/* Features */}
                    <div className="mt-10 grid grid-cols-2 gap-6 text-left">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                                <span className="text-xl">🎯</span>
                            </div>
                            <span className="text-sm text-slate-300">30+ Services</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                                <span className="text-xl">⚡</span>
                            </div>
                            <span className="text-sm text-slate-300">Fast Delivery</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                                <span className="text-xl">🤖</span>
                            </div>
                            <span className="text-sm text-slate-300">AI-Powered</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                                <span className="text-xl">👩‍💼</span>
                            </div>
                            <span className="text-sm text-slate-300">Human Review</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
