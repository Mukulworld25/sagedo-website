import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";
import { Mail, CheckCircle } from "lucide-react";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/auth/request-reset', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
                credentials: "include",
            });

            const data = await res.json();

            if (res.ok) {
                setEmailSent(true);
                toast({
                    title: "Email Sent!",
                    description: data.message || "Check your inbox for the reset link.",
                });
            } else {
                toast({
                    title: "Error",
                    description: data.message || "Failed to process request",
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <Card className="glass p-8 w-full max-w-md">
                <h1 className="text-3xl font-black text-foreground mb-2">Forgot Password</h1>
                <p className="text-muted-foreground mb-6">
                    Enter your email address and we'll send you a reset link.
                </p>

                {!emailSent ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-foreground">Email</label>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                                className="mt-1"
                            />
                        </div>

                        <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-primary to-destructive">
                            {loading ? "Sending..." : "Send Reset Link"}
                        </Button>
                    </form>
                ) : (
                    <div className="text-center py-4">
                        <div className="mb-6 p-6 bg-green-500/10 rounded-lg border border-green-500/20">
                            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                            <p className="text-foreground font-medium mb-2">
                                Check Your Email!
                            </p>
                            <p className="text-sm text-muted-foreground">
                                We've sent a password reset link to <strong>{email}</strong>.
                                Click the link in the email to reset your password.
                            </p>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4">
                            Didn't receive the email? Check your spam folder or try again.
                        </p>

                        <Button
                            variant="outline"
                            className="glass"
                            onClick={() => setEmailSent(false)}
                        >
                            Try Again
                        </Button>
                    </div>
                )}

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
