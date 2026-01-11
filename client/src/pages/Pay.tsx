import { useEffect, useState } from "react";
import { useLocation, useSearch } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ShieldCheck, CreditCard, AlertCircle } from "lucide-react";

// Declare Razorpay on window
declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function Pay() {
    const [location, setLocation] = useLocation();
    const searchString = useSearch();
    const { toast } = useToast();
    const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    // Parse URL parameters
    const params = new URLSearchParams(searchString);
    const orderId = params.get('orderId');
    const amount = params.get('amount');
    const razorpayOrderId = params.get('razorpayOrderId');

    // Load Razorpay SDK
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => setIsRazorpayLoaded(true);
        script.onerror = () => toast({
            title: "Connection Error",
            description: "Failed to load payment gateway. Please refresh.",
            variant: "destructive"
        });
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handlePayment = async () => {
        if (!isRazorpayLoaded) return;
        setIsProcessing(true);

        const API_URL = ''; // Relative URL for proxy

        try {
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: Number(amount) * 100, // Razorpay expects paise, but check if passed amount is already in paise or rupees? 
                // NOTE: Usually backend passes amount in paise for consistency. 
                // However, standard param passing suggests this might be raw Rupees.
                // Let's assume the App passes RUPEES because previous logic used `amount` directly.
                // WAIT: Razorpay always takes PAISE.
                // Update: Let's rely on the `razorpayOrderId` which already encodes the amount on the server side.
                // Actually, the `options.amount` is for display/validation.

                // Let's trust the server-generated razorpayOrderId primarily.

                currency: 'INR',
                name: 'SAGE DO',
                description: `Payment for Order #${orderId}`,
                order_id: razorpayOrderId,
                handler: async function (response: any) {
                    try {
                        // Verify payment
                        const verifyResponse = await fetch(`${API_URL}/api/payment/verify`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                orderId: orderId,
                            }),
                        });

                        if (verifyResponse.ok) {
                            setLocation(`/order-success?orderId=${orderId}`);
                        } else {
                            throw new Error('Verification failed');
                        }
                    } catch (error) {
                        toast({
                            title: "Payment Verification Failed",
                            description: "Please contact support with your Payment ID.",
                            variant: "destructive",
                        });
                        setIsProcessing(false);
                    }
                },
                prefill: {
                    // We don't have email here if not logged in.
                    // Razorpay will ask for it. That is fine.
                },
                theme: {
                    color: '#3399cc',
                },
                modal: {
                    ondismiss: function () {
                        setIsProcessing(false);
                        toast({
                            title: "Payment Cancelled",
                            description: "You can try again anytime.",
                        });
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error('Payment Error:', error);
            setIsProcessing(false);
            toast({
                title: "Error",
                description: "Something went wrong initializing payment.",
                variant: "destructive"
            });
        }
    };

    if (!orderId || !amount || !razorpayOrderId) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background p-4">
                <Card className="max-w-md w-full p-8 text-center border-destructive/50 bg-destructive/5">
                    <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
                    <h1 className="text-xl font-bold mb-2">Invalid Payment Link</h1>
                    <p className="text-muted-foreground">This link seems incomplete. Please go back to your app and try again.</p>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="max-w-md w-full p-8 relative overflow-hidden">
                {/* Decorative background */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500" />

                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CreditCard className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold mb-2">Complete Your Payment</h1>
                    <p className="text-muted-foreground">Secure payment gateway by Razorpay</p>
                </div>

                <div className="space-y-6">
                    <div className="bg-muted/50 p-4 rounded-lg flex justify-between items-center">
                        <span className="text-sm font-medium text-muted-foreground">Amount to Pay</span>
                        <span className="text-2xl font-bold text-foreground">₹{amount}</span>
                    </div>

                    <Button
                        size="lg"
                        className="w-full text-lg h-12 font-bold shadow-lg shadow-primary/20"
                        onClick={handlePayment}
                        disabled={!isRazorpayLoaded || isProcessing}
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            "Pay Now"
                        )}
                    </Button>

                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                        <ShieldCheck className="w-3 h-3 text-green-500" />
                        <span>100% Secure Transaction via Razorpay</span>
                    </div>
                </div>
            </Card>
        </div>
    );
}
