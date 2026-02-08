import { Link, useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Home, LayoutDashboard } from "lucide-react";
import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function OrderSuccess() {
    const search = useSearch();
    const params = new URLSearchParams(search);
    const orderId = params.get("orderId");

    useEffect(() => {
        // Fire confetti on load
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => {
            return Math.random() * (max - min) + min;
        }

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center bg-background">
            <div className="max-w-md w-full text-center space-y-8">

                {/* Success Icon */}
                <div className="relative mx-auto w-24 h-24">
                    <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
                    <div className="relative w-full h-full bg-green-500/10 rounded-full flex items-center justify-center border-2 border-green-500">
                        <CheckCircle2 className="w-12 h-12 text-green-600" />
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl font-black text-foreground">
                        Order Confirmed!
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Thank you for trusting SAGE DO. Your order has been received and is being processed by our experts.
                    </p>
                    {orderId && (
                        <div className="p-3 bg-muted/30 rounded-lg border border-border/50 inline-block">
                            <p className="text-sm font-mono text-muted-foreground">
                                Order ID: <span className="text-foreground font-bold">#{orderId.slice(0, 8)}</span>
                            </p>
                        </div>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                    <Link href="/dashboard">
                        <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-lg h-12 px-8">
                            <LayoutDashboard className="mr-2 h-5 w-5" />
                            Go to Dashboard
                        </Button>
                    </Link>
                    <Link href="/">
                        <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-12 px-8">
                            <Home className="mr-2 h-5 w-5" />
                            Return Home
                        </Button>
                    </Link>
                </div>

                <p className="text-sm text-muted-foreground pt-8">
                    A confirmation email has been sent to your inbox.
                </p>

            </div>
        </div>
    );
}
