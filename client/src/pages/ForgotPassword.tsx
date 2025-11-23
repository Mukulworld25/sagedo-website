import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { MessageCircle } from "lucide-react";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [whatsappLink, setWhatsappLink] = useState("");
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/auth/request-reset", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setWhatsappLink(data.whatsappLink);
                toast({
                    title: "Request Received",
                    description: "Please contact support on WhatsApp to complete your password reset.",
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
                    Enter your email address to request a password reset.
                </p>

                {!whatsappLink ? (
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
                            {loading ? "Checking..." : "Request Reset"}
                        </Button>
                    </form>
                ) : (
                    <div className="text-center py-4">
                        <div className="mb-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                            <p className="text-foreground font-medium mb-2">
                                User Found!
                            </p>
                            <p className="text-sm text-muted-foreground mb-4">
                                To reset your password securely, please contact our support team on WhatsApp.
                            </p>
                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white">
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    Chat on WhatsApp
                                </Button>
                            </a>
                        </div>

                        <Link href="/login">
                            <Button variant="outline" className="glass">
                                Return to Login
                            </Button>
                        </Link>
                    </div>
                )}

                <div className="mt-6 text-center">
                    <Link href="/login">
                        <Button variant="link" className="text-primary">
                            Back to Login
                        </Button>
                    </Link>
                </div>
            </Card>
        </div>
    );
}
