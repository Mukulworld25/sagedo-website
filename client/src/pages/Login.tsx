// Fixed login page
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
    const [isRegister, setIsRegister] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
    });
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                toast({
                    title: isRegister ? '🎉 Welcome to SAGE DO!' : '✅ Welcome back!',
                    description: isRegister ? "You've received ₹150 + 1 Golden Ticket!" : 'Successfully logged in'
                });

                if (data.user.isAdmin) {
                    window.location.href = '/admin';
                } else {
                    window.location.href = '/dashboard';
                }
            } else {
                toast({
                    title: 'Error',
                    description: data.message,
                    variant: 'destructive'
                });
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Something went wrong. Please try again.',
                variant: 'destructive'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <Card className="glass p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black bg-gradient-to-r from-primary to-destructive bg-clip-text text-transparent mb-2">
                        {isRegister ? 'Create Account' : 'Welcome Back'}
                    </h1>
                    <p className="text-muted-foreground">
                        {isRegister ? 'Join SAGE DO and get ₹150 + 1 Golden Ticket!' : 'Login to access your dashboard'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {isRegister && (
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="John Doe"
                                required={isRegister}
                                className="glass border-border/50"
                            />
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@example.com"
                            required
                            className="glass border-border/50"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="••••••••"
                            required
                            minLength={6}
                            className="glass border-border/50"
                        />
                        {isRegister && (
                            <p className="text-xs text-muted-foreground">At least 6 characters</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-primary to-destructive hover:opacity-90"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : (isRegister ? 'Create Account' : 'Login')}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                        {isRegister ? 'Already have an account?' : "Don't have an account?"}
                        <button
                            onClick={() => {
                                setIsRegister(!isRegister);
                                setFormData({ email: '', password: '', name: '' });
                            }}
                            className="ml-2 text-primary font-semibold hover:underline"
                        >
                            {isRegister ? 'Login' : 'Register'}
                        </button>
                    </p>
                </div>
            </Card>
        </div>
    );
}
