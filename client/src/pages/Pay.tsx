import { useEffect, useState } from "react";
import { useLocation, useSearch } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ShieldCheck, CreditCard, Lock } from "lucide-react";

declare global {
    interface Window { Razorpay: any; }
}

export default function Pay() {
    const [, setLocation] = useLocation();
    const searchString = useSearch();
    const { toast } = useToast();
    const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [lookupId, setLookupId] = useState("");

    const params = new URLSearchParams(searchString);
    const urlOrderId = params.get('orderId');
    const urlAmount = params.get('amount');
    const urlRzpOrderId = params.get('razorpayOrderId');

    const [pageOrderId, setPageOrderId] = useState(urlOrderId || "");
    const [pageAmount, setPageAmount] = useState(urlAmount || "");
    const [pageRzpOrderId, setPageRzpOrderId] = useState(urlRzpOrderId || "");
    const [pageRzpKeyId, setPageRzpKeyId] = useState("");

    // Load Razorpay SDK
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => setIsRazorpayLoaded(true);
        script.onerror = () => toast({ title: "Connection Error", description: "Failed to load payment gateway. Please refresh.", variant: "destructive" });
        document.body.appendChild(script);
        return () => { try { document.body.removeChild(script); } catch(e) {} };
    }, []);

    // Auto-fetch key_id when we already have orderId + amount from URL (coming from Orders page)
    useEffect(() => {
        if (urlOrderId && urlAmount && !pageRzpKeyId) {
            fetchRazorpayOrder(urlOrderId, Number(urlAmount));
        }
    }, [urlOrderId, urlAmount]);

    const fetchRazorpayOrder = async (orderId: string, amount: number) => {
        setIsProcessing(true);
        try {
            const res = await fetch('https://zsevqsmpvgoipwlhzjoy.supabase.co/functions/v1/create-razorpay-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: amount,
                    service_name: 'SAGEDO Service',
                    order_id: orderId
                })
            });
            const data = await res.json();
            if (res.ok && data.razorpay_order_id) {
                setPageOrderId(orderId);
                setPageAmount(amount.toString());
                setPageRzpOrderId(data.razorpay_order_id);
                setPageRzpKeyId(data.key_id);
            } else {
                toast({ title: "Error", description: data.error || "Failed to initialize payment", variant: "destructive" });
            }
        } catch (error) {
            toast({ title: "Error", description: "Failed to connect to payment server", variant: "destructive" });
        } finally {
            setIsProcessing(false);
        }
    };

    const handleLookup = async () => {
        if (!lookupId) return;
        await fetchRazorpayOrder(lookupId, 0);
        setPageOrderId(lookupId);
    };

    const handlePayment = async () => {
        if (!isRazorpayLoaded || !pageRzpKeyId || !pageRzpOrderId) {
            toast({ title: "Not Ready", description: "Payment gateway still loading, please wait.", variant: "destructive" });
            return;
        }
        setIsProcessing(true);
        try {
            const options = {
                key: pageRzpKeyId,
                amount: Number(pageAmount) * 100,
                currency: 'INR',
                name: 'SAGEDO',
                description: 'Payment for Order #' + pageOrderId,
                order_id: pageRzpOrderId,
                handler: async function (response: any) {
                    try {
                        const verifyResponse = await fetch('https://zsevqsmpvgoipwlhzjoy.supabase.co/functions/v1/verify-razorpay', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                order_id: pageOrderId
                            }),
                        });
                        if (verifyResponse.ok) {
                            setLocation('/order-success?orderId=' + pageOrderId);
                        } else {
                            throw new Error('Verification failed');
                        }
                    } catch (error) {
                        toast({ title: "Payment Verification Failed", description: "Please contact support with your Payment ID.", variant: "destructive" });
                        setIsProcessing(false);
                    }
                },
                prefill: {},
                theme: { color: '#e53e3e' },
                modal: {
                    ondismiss: function () {
                        setIsProcessing(false);
                        toast({ title: "Payment Cancelled", description: "You can try again anytime." });
                    }
                }
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error('Payment Error:', error);
            setIsProcessing(false);
            toast({ title: "Error", description: "Something went wrong initializing payment.", variant: "destructive" });
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
                        <input
                            type="text"
                            placeholder="Order ID"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            value={lookupId}
                            onChange={(e) => setLookupId(e.target.value)}
                        />
                        <Button className="w-full" onClick={handleLookup} disabled={!lookupId || isProcessing}>
                            {isProcessing ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}
                            Find Order & Pay
                        </Button>
                    </div>
                    <div className="flex justify-center items-center gap-4 text-xs text-muted-foreground opacity-60 pt-6">
                        <div className="flex items-center gap-1"><Lock className="w-3 h-3" /> SSL Secure</div>
                        <div className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Verified Business</div>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="max-w-md w-full p-8 relative overflow-hidden">
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
                        <span className="text-2xl font-bold text-foreground">&#8377;{pageAmount}</span>
                    </div>
                    {(!pageRzpKeyId || !pageRzpOrderId) && (
                        <div className="text-center text-sm text-muted-foreground">
                            <Loader2 className="animate-spin w-4 h-4 mx-auto mb-2" />
                            Initializing payment gateway...
                        </div>
                    )}
                    <Button
                        size="lg"
                        className="w-full text-lg h-12 font-bold shadow-lg shadow-primary/20"
                        onClick={handlePayment}
                        disabled={!isRazorpayLoaded || isProcessing || !pageRzpKeyId || !pageRzpOrderId}
                    >
                        {isProcessing ? (
                            <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Processing...</>
                        ) : (
                            'Pay ₹' + pageAmount + ' Now'
                        )}
                    </Button>
                    <div className="flex justify-center items-center gap-4 text-xs text-muted-foreground opacity-80 pt-2">
                        <div className="flex items-center gap-1"><Lock className="w-3 h-3 text-green-600" /> SSL Secure</div>
                        <div className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-blue-600" /> Verified Business</div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
