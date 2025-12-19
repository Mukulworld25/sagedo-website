import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function VerifyEmail() {
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [message, setMessage] = useState("");
    const [location] = useLocation();

    useEffect(() => {
        const verify = async () => {
            // Extract token from URL
            const searchParams = new URLSearchParams(window.location.search);
            const token = searchParams.get("token");

            if (!token) {
                setStatus("error");
                setMessage("No verification token found.");
                return;
            }

            try {
                await apiRequest("POST", "/api/auth/verify-email", { token });
                setStatus("success");
            } catch (error: any) {
                setStatus("error");
                setMessage(error.message || "Verification failed. The link may be expired.");
            }
        };

        verify();
    }, []);

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
            <Card className="max-w-md w-full p-8 text-center glass">
                {status === "loading" && (
                    <div className="flex flex-col items-center">
                        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                        <h1 className="text-2xl font-bold mb-2">Verifying Email...</h1>
                        <p className="text-muted-foreground">Please wait while we verify your email address.</p>
                    </div>
                )}

                {status === "success" && (
                    <div className="flex flex-col items-center">
                        <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                        <h1 className="text-2xl font-bold mb-2">Email Verified!</h1>
                        <p className="text-muted-foreground mb-6">
                            Thank you for verifying your email. You can now access all features.
                        </p>
                        <Link href="/dashboard">
                            <Button className="w-full bg-gradient-to-r from-primary to-destructive">
                                Go to Dashboard
                            </Button>
                        </Link>
                    </div>
                )}

                {status === "error" && (
                    <div className="flex flex-col items-center">
                        <XCircle className="h-16 w-16 text-destructive mb-4" />
                        <h1 className="text-2xl font-bold mb-2">Verification Failed</h1>
                        <p className="text-muted-foreground mb-6">{message}</p>
                        <Link href="/contact">
                            <Button variant="outline" className="w-full mb-3">
                                Contact Support
                            </Button>
                        </Link>
                        <Link href="/">
                            <Button variant="ghost" className="w-full">
                                Go Home
                            </Button>
                        </Link>
                    </div>
                )}
            </Card>
        </div>
    );
}
