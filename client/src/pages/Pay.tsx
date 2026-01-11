import { useEffect, useState } from "react";
import { useLocation, useSearch } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ShieldCheck, CreditCard, AlertCircle, Lock } from "lucide-react";

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
                amount: Number(pageAmount) * 100,
                currency: 'INR',
                name: 'SAGE DO',
                description: `Payment for Order #${pageOrderId}`,
                order_id: pageRzpOrderId,
                handler: async function (response: any) {
                    try {
                        const verifyResponse = await fetch(`${API_URL}/api/payment/verify`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                orderId: pageOrderId,
                            }),
                        });

                        if (verifyResponse.ok) {
                            setLocation(`/order-success?orderId=${pageOrderId}`);
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

    const [lookupId, setLookupId] = useState("");
    const [pageAmount, setPageAmount] = useState(amount);
    const [pageRzpOrderId, setPageRzpOrderId] = useState(razorpayOrderId);
    const [pageOrderId, setPageOrderId] = useState(orderId);

    const handleLookup = async () => {
        if (!lookupId) return;
        setIsProcessing(true);
        try {
            const res = await fetch('/api/payment/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId: lookupId })
            });
            const data = await res.json();

            if (res.ok) {
                setPageOrderId(lookupId);
                setPageAmount((data.amount / 100).toString()); // Convert paise to rupees
                setPageRzpOrderId(data.id);
                // Clean URL
                setLocation(`/pay?orderId=${lookupId}&amount=${data.amount / 100}&razorpayOrderId=${data.id}`);
            } else {
                toast({
                    title: "Order Not Found",
                    description: data.message || "Please check your Order ID",
                    variant: "destructive"
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch order details",
                variant: "destructive"
            });
        } finally {
            setIsProcessing(false);
        }
    };

    if (!pageOrderId || !pageAmount || !pageRzpOrderId) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background p-4">
                <Card className="max-w-md w-full p-8 border-primary/20 bg-card/50 backdrop-blur">
                    <div className="text-center mb-6">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CreditCard className="w-6 h-6 text-primary" />
                        </div>
                        <h1 className="text-xl font-bold mb-2">Secure Payment Portal</h1>
                        <p className="text-muted-foreground text-sm">Enter your Order ID to proceed</p>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <input
                                type="text"
                                placeholder="Order ID (e.g. 123)"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={lookupId}
                                onChange={(e) => setLookupId(e.target.value)}
                            />
                        </div>
                        <Button
                            className="w-full"
                            onClick={handleLookup}
                            disabled={!lookupId || isProcessing}
                        >
                            {isProcessing ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}
                            Find Order & Pay
                        </Button>
                    </div>

                    <div className="flex justify-center items-center gap-4 text-xs text-muted-foreground opacity-60 pt-6">
                        <div className="flex items-center gap-1">
                            <Lock className="w-3 h-3" /> SSL Secure
                        </div>
                        <div className="flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" /> Verified Business
                        </div>
                    </div>
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
                        <span className="text-2xl font-bold text-foreground">₹{pageAmount}</span>
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

                    <div className="flex justify-center items-center gap-4 text-xs text-muted-foreground opacity-80 pt-2">
                        <div className="flex items-center gap-1">
                            <Lock className="w-3 h-3 text-green-600" /> SSL Secure
                        </div>
                        <div className="flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-blue-600" /> Verified Business
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
