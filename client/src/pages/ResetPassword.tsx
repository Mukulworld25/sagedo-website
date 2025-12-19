import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";
import { CheckCircle, XCircle, Eye, EyeOff } from "lucide-react";

export default function ResetPassword() {
    const [, setLocation] = useLocation();
    const [token, setToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const { toast } = useToast();

    // Extract token from URL
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const urlToken = params.get("token");
        if (urlToken) {
            setToken(urlToken);
        } else {
            setError("Invalid reset link. Please request a new one.");
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast({
                title: "Error",
                description: "Passwords do not match",
                variant: "destructive",
            });
            return;
        }

        if (newPassword.length < 6) {
            toast({
                title: "Error",
                description: "Password must be at least 6 characters",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/auth/reset-password', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, newPassword }),
                credentials: "include",
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess(true);
                toast({
                    title: "Success!",
                    description: "Your password has been reset.",
                });
            } else {
                setError(data.message || "Failed to reset password");
                toast({
                    title: "Error",
                    description: data.message || "Failed to reset password",
                    variant: "destructive",
                });
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
            toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    if (error && !token) {
        return (
            <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <Card className="glass p-8 w-full max-w-md text-center">
                    <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-foreground mb-2">Invalid Link</h1>
                    <p className="text-muted-foreground mb-6">{error}</p>
                    <Link href="/forgot-password">
                        <Button className="bg-gradient-to-r from-primary to-destructive">
                            Request New Link
                        </Button>
                    </Link>
                </Card>
            </div>
        );
    }

    if (success) {
        return (
            <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <Card className="glass p-8 w-full max-w-md text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-foreground mb-2">Password Reset!</h1>
                    <p className="text-muted-foreground mb-6">
                        Your password has been successfully reset. You can now login with your new password.
                    </p>
                    <Link href="/login">
                        <Button className="bg-gradient-to-r from-primary to-destructive">
                            Go to Login
                        </Button>
                    </Link>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <Card className="glass p-8 w-full max-w-md">
                <h1 className="text-3xl font-black text-foreground mb-2">Reset Password</h1>
                <p className="text-muted-foreground mb-6">
                    Enter your new password below.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-foreground">New Password</label>
                        <div className="relative mt-1">
                            <Input
                                type={showPassword ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                                required
                                minLength={6}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-foreground">Confirm Password</label>
                        <Input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            required
                            className="mt-1"
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-destructive">{error}</p>
                    )}

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-primary to-destructive"
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <Link href="/login">
                        <Button variant="ghost" className="text-primary">
                            Back to Login
                        </Button>
                    </Link>
                </div>
            </Card>
        </div>
    );
}
