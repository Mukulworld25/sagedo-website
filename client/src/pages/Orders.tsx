import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Upload, CheckCircle2, CreditCard, Sparkles, Plus, X, Star, LogIn, Loader2, Clock, Zap, Shield, ArrowRight, CalendarClock, Banknote, Award, TrendingUp, ShieldCheck } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useSearch, Link, useLocation } from "wouter";
import { allServices } from "@/data/serviceData";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

// Declare Razorpay on window
declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Orders() {
  const { toast } = useToast();
  const searchString = useSearch();
  const [, navigate] = useLocation();
  const { isAuthenticated, isLoading } = useAuth();
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    requirements: "",
    deliveryPreference: "platform" as "platform" | "email" | "whatsapp",
  });
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);
  const [orderAmount, setOrderAmount] = useState(0); // Default 0
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  const [isServiceLocked, setIsServiceLocked] = useState(false);
  const [paymentPlan, setPaymentPlan] = useState<'full' | 'half' | 'installment_3x'>('full');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const API_URL = 'https://zsevqsmpvgoipwlhzjoy.supabase.co/functions/v1';

  // Multi-service cart (up to 3 services)
  interface CartItem {
    id: string;
    name: string;
    price: number;
    isGoldenEligible: boolean;
  }
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isGoldenService, setIsGoldenService] = useState(false);

  // Calculate total from cart
  const cartTotal = cart.reduce((sum, item) => sum + (item.isGoldenEligible ? 0 : item.price), 0);
  const hasOnlyFreeServices = cart.length > 0 && cart.every(item => item.isGoldenEligible);

  // Calculate the actual amount due today based on payment plan
  const totalOrderValue = cartTotal > 0 ? cartTotal : orderAmount;
  const dueToday = (() => {
    if (isGoldenService || hasOnlyFreeServices || totalOrderValue === 0) return 0;
    switch (paymentPlan) {
      case 'half': return Math.ceil(totalOrderValue / 2);
      case 'installment_3x': return Math.ceil(totalOrderValue / 3);
      default: return totalOrderValue;
    }
  })();
  const remainingBalance = totalOrderValue - dueToday;
  const canUseInstallments = totalOrderValue >= 15000;
  const canUseHalf = totalOrderValue >= 5000;

  // Resolve selected service details for the preview panel
  const selectedServiceDetails = (() => {
    if (cart.length > 0) {
      return allServices.find(s => s.id === cart[0].id) || null;
    }
    if (formData.service) {
      return allServices.find(s => s.name === formData.service) || null;
    }
    return null;
  })();

  // Read URL params and pre-fill form
  useEffect(() => {
    const params = new URLSearchParams(searchString);
    const serviceName = params.get('service');
    const price = params.get('price');
    const serviceId = params.get('id');
    const goldenTicketMode = params.get('useGoldenTicket');

    // Golden Ticket mode - show info toast
    if (goldenTicketMode === 'true') {
      setTimeout(() => {
        toast({
          title: "🎟️ Starter Credit Mode!",
          description: "Select any Bar 1 service below and it will be FREE!",
        });
      }, 500);
    }

    if (serviceName) {
      setFormData(prev => ({ ...prev, service: serviceName }));
      setIsServiceLocked(true);

      // Lookup service to check if Golden Ticket eligible
      const service = allServices.find(s => s.name === serviceName || s.id === serviceId);
      if (service) {
        const isGolden = service.isGoldenEligible;
        setIsGoldenService(isGolden);

        // Add to cart if not already in
        if (!cart.find(item => item.id === service.id)) {
          setCart([{
            id: service.id,
            name: service.name,
            price: service.price,
            isGoldenEligible: isGolden
          }]);
        }

        setOrderAmount(isGolden ? 0 : service.price);
      } else if (price) {
        setOrderAmount(parseInt(price, 10));
      }
    } else {
      // Direct visit - Clean slate
      setFormData(prev => ({ ...prev, service: "" }));
      setOrderAmount(0);
      setCart([]);
      setIsServiceLocked(false);
      setIsGoldenService(false);
    }
  }, [searchString]);

  // Load Razorpay SDK
  useEffect(() => {
    if ((window as any).Razorpay) {
      setIsRazorpayLoaded(true);
      return;
    }
    if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setIsRazorpayLoaded(true);
    script.onerror = () => {
      console.warn("Razorpay SDK could not be loaded initially.");
      setIsRazorpayLoaded(false);
    };
    document.body.appendChild(script);
  }, []);

  const uploadMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        body: data,
        credentials: "include",
      });
      if (!response.ok) throw new Error("Upload failed");
      return response.json();
    },
  });

  const orderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      const response = await apiRequest("POST", "/api/orders", orderData);
      return response;
    },
    onSuccess: async (response: Response) => {
      const data = await response.json();
      const orderId = data.id;
      setCreatedOrderId(orderId);

      // If it's a FREE Golden Ticket service, skip payment and show success
      if (isGoldenService || hasOnlyFreeServices || orderAmount === 0) {
        navigate(`/order-success?orderId=${orderId}`);
        return; // Skip payment
      }

      // For paid services, trigger Razorpay payment
      try {
        // Create Razorpay order
        // Call Supabase Edge Function directly
        const response = await fetch('https://zsevqsmpvgoipwlhzjoy.supabase.co/functions/v1/create-razorpay-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          
          body: JSON.stringify({
            amount: dueToday,
            service_name: 'SAGE DO Service',
            order_id: orderId
          })
        });

        if (!response.ok) {
          throw new Error('Failed to create payment order');
        }

        const paymentOrder = await response.json();

        // Open Razorpay checkout immediately
        const options = {
          key: paymentOrder.key_id,
          amount: paymentOrder.amount,
          currency: 'INR',
          name: 'SAGE DO',
          description: formData.service,
          order_id: paymentOrder.razorpay_order_id,
          handler: async function (response: any) {
            try {
              // Verify payment on backend
              // Call Supabase verification edge function
              const verifyResponse = await fetch('https://zsevqsmpvgoipwlhzjoy.supabase.co/functions/v1/verify-razorpay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  order_id: orderId
                }),
              });

              if (verifyResponse.ok) {
                // Redirect to success page for conversion tracking
                navigate(`/order-success?orderId=${orderId}`);
              } else {
                throw new Error('Payment verification failed');
              }
            } catch (error) {
              toast({
                title: "Payment Verification Failed",
                description: "Please contact support.",
                variant: "destructive",
              });
            }
          },
          prefill: {
            email: formData.email,
          },
          theme: {
            color: '#3399cc',
          },
          modal: {
            ondismiss: function () {
              toast({
                title: "Payment Cancelled",
                description: "Your order is saved. You can pay later.",
              });
            },
          },
        };

        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
      } catch (error: any) {
        console.error('Payment initiation error:', error);
        console.error('Error details:', error?.message, error?.response);
        toast({
          title: "Payment Failed",
          description: error?.message || "Could not initiate payment. Please try again.",
          variant: "destructive",
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Order Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.service) {
      toast({
        title: "Missing Information",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    let fileUrls: string[] = [];

    if (files.length > 0) {
      const uploadFormData = new FormData();
      files.forEach((file) => {
        uploadFormData.append("files", file);
      });

      try {
        const uploadResult = await uploadMutation.mutateAsync(uploadFormData);
        fileUrls = uploadResult.urls;
      } catch (error) {
        toast({
          title: "File Upload Failed",
          description: "Please try again or proceed without files.",
          variant: "destructive",
        });
        return;
      }
    }

    // Build payment plan details to append to requirements
    const isFree = isGoldenService || hasOnlyFreeServices || totalOrderValue === 0;
    let paymentPlanText = '';
    if (!isFree && paymentPlan !== 'full') {
      const planName = paymentPlan === 'half' ? '50/50 Split' : '3-Part Installments';
      paymentPlanText = `\n\n--- PAYMENT PLAN ---\nPlan: ${planName}\nTotal Contract: ₹${totalOrderValue.toLocaleString('en-IN')}\nDue Today: ₹${dueToday.toLocaleString('en-IN')}\nRemaining: ₹${remainingBalance.toLocaleString('en-IN')}${paymentPlan === 'half' ? ' (due on delivery)' : ` (₹${Math.ceil(totalOrderValue / 3).toLocaleString('en-IN')} at milestone + ₹${(totalOrderValue - Math.ceil(totalOrderValue / 3) * 2).toLocaleString('en-IN')} on delivery)`}\n90% Money-Back Guarantee Acknowledged: Yes\n---`;
    }

    orderMutation.mutate({
      customerName: formData.name,
      customerEmail: formData.email,
      serviceName: formData.service,
      requirements: (formData.requirements || '') + paymentPlanText,
      fileUrls,
      deliveryPreference: formData.deliveryPreference,
      isFreeOrder: isFree,
    });
  };

  const handlePayment = async () => {
    if (!createdOrderId) return;

    if (!isRazorpayLoaded) {
      toast({
        title: "Payment System Loading...",
        description: "Please wait a moment and try again.",
      });
      return;
    }

    try {
      // Create Razorpay order
      // Call Supabase Edge Function
      const response = await fetch('https://zsevqsmpvgoipwlhzjoy.supabase.co/functions/v1/create-razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        
        body: JSON.stringify({
          amount: dueToday,
          service_name: 'SAGE DO Service Final Payment',
          order_id: createdOrderId
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create payment order');
      }

      const paymentOrder = await response.json();

      // Open Razorpay checkout
      const options = {
        key: paymentOrder.key_id,
        amount: paymentOrder.amount,
        currency: 'INR',
        name: 'SAGE DO',
        description: formData.service,
        order_id: paymentOrder.razorpay_order_id,
        handler: async function (response: any) {
          try {
            // Verify payment on backend
            // Call Supabase verification edge function
            const verifyResponse = await fetch('https://zsevqsmpvgoipwlhzjoy.supabase.co/functions/v1/verify-razorpay', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                order_id: createdOrderId,
              }),
            });

            if (verifyResponse.ok) {
              // Redirect to success page
              navigate(`/order-success?orderId=${createdOrderId}`);
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            toast({
              title: "Payment Verification Failed",
              description: "Please contact support.",
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
        },
        theme: {
          color: '#3399cc',
        },
        modal: {
          ondismiss: function () {
            toast({
              title: "Payment Cancelled",
              description: "You can complete payment later from your dashboard.",
            });
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast({
        title: "Payment Error",
        description: "Failed to initiate payment. Please try again.",
        variant: "destructive",
      });
    }
  };



  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ backgroundColor: '#08080a' }}>
      {/* Task W: Visible Atmospheric Hero Background (Crimson Radial Glow + Tech Grid) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true" data-testid="orders-atmospheric-bg">
        {/* 1. Tech Grid Matrix with radial fade mask */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 25%, #000 35%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 25%, #000 35%, transparent 85%)'
          }}
        />

        {/* 2. Primary Crimson Core Glow behind hero title and stat cards */}
        <div 
          className="absolute -top-12 left-1/2 -translate-x-1/2 w-[850px] h-[550px]"
          style={{
            background: 'radial-gradient(circle 420px at 50% 45%, rgba(220, 38, 38, 0.25) 0%, rgba(185, 28, 28, 0.12) 45%, transparent 70%)',
            filter: 'blur(35px)',
          }}
        />

        {/* 3. Secondary subtle right-side ambient crimson glow */}
        <div 
          className="absolute top-28 right-[5%] w-[450px] h-[450px]"
          style={{
            background: 'radial-gradient(circle 260px at 50% 50%, rgba(220, 38, 38, 0.14) 0%, transparent 70%)',
            filter: 'blur(45px)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Split Layout Container - increased gap */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">

          {/* Left Side - Form Content (Rendered first on mobile and desktop) */}
          <div className="flex-1 lg:max-w-xl lg:pr-8 order-1 lg:order-1">
            <div className="text-center lg:text-left mb-6">
              <h1 className="text-4xl md:text-5xl font-black text-foreground mb-3">
                Place Your Order
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground">
                Tell us what you need. Our AI + Human execution team delivers within 24–48 hours.
              </p>
            </div>

            {/* Results Wall — Real Outcomes from Case Studies */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
              <RevealOnScroll delay={0}>
                <div className="p-3 rounded-xl bg-card/60 border border-border/40 flex flex-col h-full">
                  <div className="flex items-center gap-1.5 text-primary text-xs font-semibold mb-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Genesis</span>
                  </div>
                  <span className="text-lg sm:text-xl font-black text-foreground">1,400+</span>
                  <span className="text-[11px] text-muted-foreground leading-tight">Waitlist Signups</span>
                </div>
              </RevealOnScroll>
              <RevealOnScroll delay={60}>
                <div className="p-3 rounded-xl bg-card/60 border border-border/40 flex flex-col h-full">
                  <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold mb-1">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Elevate</span>
                  </div>
                  <span className="text-lg sm:text-xl font-black text-emerald-400">+400%</span>
                  <span className="text-[11px] text-muted-foreground leading-tight">Booking Surge</span>
                </div>
              </RevealOnScroll>
              <RevealOnScroll delay={120}>
                <div className="p-3 rounded-xl bg-card/60 border border-border/40 flex flex-col h-full">
                  <div className="flex items-center gap-1.5 text-blue-400 text-xs font-semibold mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Speed</span>
                  </div>
                  <span className="text-lg sm:text-xl font-black text-blue-400">24–48h</span>
                  <span className="text-[11px] text-muted-foreground leading-tight">First Prototype</span>
                </div>
              </RevealOnScroll>
              <RevealOnScroll delay={180}>
                <div className="p-3 rounded-xl bg-card/60 border border-border/40 flex flex-col h-full">
                  <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Quality</span>
                  </div>
                  <span className="text-lg sm:text-xl font-black text-amber-400">100%</span>
                  <span className="text-[11px] text-muted-foreground leading-tight">Human-Reviewed</span>
                </div>
              </RevealOnScroll>
            </div>

            {/* Cart / Selected Services Banner */}
            {cart.length > 0 && (
              <Card className={`glass p-6 mb-8 border-2 ${isGoldenService || hasOnlyFreeServices ? 'border-yellow-500/50 bg-gradient-to-r from-yellow-500/10 to-amber-500/10' : 'border-primary/50 bg-gradient-to-r from-primary/10 to-destructive/10'}`}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-foreground flex items-center gap-2">
                      {isGoldenService || hasOnlyFreeServices ? (
                        <>
                          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                          Starter Credit Service - FREE!
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          Your Order ({cart.length}/3 services)
                        </>
                      )}
                    </h3>
                    {cart.length < 3 && !hasOnlyFreeServices && !isServiceLocked && (
                      <Link href="/services">
                        <Button variant="outline" className="h-11 lg:h-8 px-3 text-xs gap-1">
                          <Plus className="w-4 h-4" /> Add More
                        </Button>
                      </Link>
                    )}
                  </div>

                  {/* Cart Items */}
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-foreground">{item.name}</span>
                        {item.isGoldenEligible && (
                          <Badge className="bg-gradient-to-r from-yellow-400 to-amber-600 text-black text-xs">
                            ¨ FREE
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        {item.isGoldenEligible ? (
                          <span className="text-green-500 font-bold">₹0</span>
                        ) : (
                          <span className="text-primary font-bold">₹{item.price}</span>
                        )}
                        <button
                          type="button"
                          onClick={() => setCart(cart.filter(c => c.id !== item.id))}
                          className="min-w-[44px] min-h-[44px] -mr-2 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Remove item"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Total */}
                  <div className="flex items-center justify-between pt-3 border-t border-border/30">
                    <span className="text-muted-foreground">Total</span>
                    {hasOnlyFreeServices ? (
                      <span className="text-2xl font-black text-green-500">FREE ¨</span>
                    ) : (
                      <span className="text-2xl font-black text-primary">₹{cartTotal}</span>
                    )}
                  </div>
                </div>
              </Card>
            )}

            <Card className="glass p-8">
              {/* 3-Step Execution Checklist / Progress Indicator */}
              {/* Step Progress Indicator - Mobile-responsive no-truncation */}
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2 p-1.5 rounded-xl bg-neutral-900/80 border border-neutral-800/80 text-[11px] sm:text-xs mb-6">
                <div className={`flex items-center justify-center gap-1 sm:gap-1.5 py-2 px-1 sm:px-2 rounded-lg font-medium transition-all ${
                  formData.email ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50' : 'bg-neutral-800/50 text-neutral-300'
                }`}>
                  {formData.email ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> : <span className="w-4 h-4 rounded-full bg-neutral-700 text-[10px] flex items-center justify-center text-white font-bold shrink-0">1</span>}
                  <span className="whitespace-nowrap"><span className="hidden sm:inline">01 </span>Details</span>
                </div>
                <div className={`flex items-center justify-center gap-1 sm:gap-1.5 py-2 px-1 sm:px-2 rounded-lg font-medium transition-all ${
                  formData.requirements.trim().length > 10 ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50' : 'bg-neutral-800/50 text-neutral-300'
                }`}>
                  {formData.requirements.trim().length > 10 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> : <span className="w-4 h-4 rounded-full bg-neutral-700 text-[10px] flex items-center justify-center text-white font-bold shrink-0">2</span>}
                  <span className="whitespace-nowrap"><span className="hidden sm:inline">02 </span>Brief</span>
                </div>
                <div className={`flex items-center justify-center gap-1 sm:gap-1.5 py-2 px-1 sm:px-2 rounded-lg font-medium transition-all ${
                  termsAccepted ? 'bg-primary/20 text-primary border border-primary/40' : 'bg-neutral-800/50 text-neutral-400'
                }`}>
                  <span className="w-4 h-4 rounded-full bg-primary/30 text-[10px] flex items-center justify-center text-primary font-bold shrink-0">3</span>
                  <span className="whitespace-nowrap"><span className="hidden sm:inline">03 </span>Confirm</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name / Company Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">
                    Name / Company Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="E.g., Jane Doe or Acme Corp"
                    className="glass border-border/50"
                  />
                </div>

                {/* Email - Primary field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    Email Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    data-testid="input-email"
                    required
                    className="glass border-border/50"
                  />
                  <p className="text-xs text-muted-foreground">We'll send order updates to this email</p>
                </div>

                {/* Service - Show if not locked OR if locked but we want to show it as read-only text (which we do via the cart card above) */}
                {/* Actually, per requirements: Hide service input if pre-filled/locked. Only show if manually adding. */}
                {!isServiceLocked && (
                  <div className="space-y-2">
                    <Label htmlFor="service" className="text-foreground">
                      Service Needed <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      placeholder="e.g., AI Ad Copy, Resume, PPT Design"
                      data-testid="input-service"
                      required
                      className="glass border-border/50"
                    />
                  </div>
                )}

                {/* Requirements - Mandatory */}
                <div className="space-y-2">
                  <Label htmlFor="requirements" className="text-foreground">
                    Requirements & Details <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="requirements"
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    placeholder="Please describe your requirements in detail..."
                    rows={6}
                    required
                    data-testid="textarea-requirements"
                    className="glass border-border/50"
                  />
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <Label htmlFor="files" className="text-foreground">
                    Upload Files (Optional)
                  </Label>
                  <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center glass hover-elevate">
                    <input
                      id="files"
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      data-testid="input-files"
                      className="hidden"
                    />
                    <label
                      htmlFor="files"
                      className="cursor-pointer flex flex-col items-center gap-3"
                    >
                      <Upload className="w-12 h-12 text-muted-foreground" />
                      <div>
                        <p className="text-foreground font-medium">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          PDF, DOC, DOCX, ZIP, Images (Max 10MB each)
                        </p>
                      </div>
                    </label>
                  </div>
                  {files.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <p className="text-sm text-foreground font-medium">
                        Selected files: ({files.length})
                      </p>
                      <ul className="space-y-1">
                        {files.map((file, index) => (
                          <li
                            key={index}
                            className="text-sm text-muted-foreground flex items-center gap-2"
                          >
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Delivery Preference */}
                <div className="space-y-3">
                  <Label className="text-foreground">
                    How would you like to receive your delivery? <span className="text-destructive">*</span>
                  </Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <label
                      className={`flex items-center gap-3 p-3.5 sm:p-4 rounded-xl border-2 cursor-pointer transition-all min-h-[52px] ${formData.deliveryPreference === 'platform'
                        ? 'border-primary bg-primary/10'
                        : 'border-border/50 hover:border-primary/30'
                        }`}
                    >
                      <input
                        type="radio"
                        name="deliveryPreference"
                        value="platform"
                        checked={formData.deliveryPreference === 'platform'}
                        onChange={() => setFormData({ ...formData, deliveryPreference: 'platform' })}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${formData.deliveryPreference === 'platform'
                        ? 'border-primary bg-primary'
                        : 'border-muted-foreground'
                        }`}>
                        {formData.deliveryPreference === 'platform' && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-foreground">Dashboard</p>
                        <p className="text-xs text-muted-foreground">Download from your dashboard</p>
                      </div>
                    </label>
                    <label
                      className={`flex items-center gap-3 p-3.5 sm:p-4 rounded-xl border-2 cursor-pointer transition-all min-h-[52px] ${formData.deliveryPreference === 'email'
                        ? 'border-primary bg-primary/10'
                        : 'border-border/50 hover:border-primary/30'
                        }`}
                    >
                      <input
                        type="radio"
                        name="deliveryPreference"
                        value="email"
                        checked={formData.deliveryPreference === 'email'}
                        onChange={() => setFormData({ ...formData, deliveryPreference: 'email' })}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${formData.deliveryPreference === 'email'
                        ? 'border-primary bg-primary'
                        : 'border-muted-foreground'
                        }`}>
                        {formData.deliveryPreference === 'email' && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-foreground">Email</p>
                        <p className="text-xs text-muted-foreground">Receive download link via email</p>
                      </div>
                    </label>
                    <label
                      className={`flex items-center gap-3 p-3.5 sm:p-4 rounded-xl border-2 cursor-pointer transition-all min-h-[52px] ${formData.deliveryPreference === 'whatsapp'
                        ? 'border-primary bg-primary/10'
                        : 'border-border/50 hover:border-primary/30'
                        }`}
                    >
                      <input
                        type="radio"
                        name="deliveryPreference"
                        value="whatsapp"
                        checked={formData.deliveryPreference === 'whatsapp'}
                        onChange={() => setFormData({ ...formData, deliveryPreference: 'whatsapp' })}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${formData.deliveryPreference === 'whatsapp'
                        ? 'border-primary bg-primary'
                        : 'border-muted-foreground'
                        }`}>
                        {formData.deliveryPreference === 'whatsapp' && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-foreground">WhatsApp</p>
                        <p className="text-xs text-muted-foreground">Get update on WhatsApp</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Order Amount - Hide for Golden Ticket OR if Service is Locked (Pre-filled) */}
                {!isGoldenService && !hasOnlyFreeServices && !isServiceLocked && cart.length === 0 && (
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-foreground">
                      Order Amount (₹) <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      value={orderAmount}
                      onChange={(e) => setOrderAmount(parseInt(e.target.value) || 0)}
                      placeholder="Enter amount"
                      min="1"
                      required
                      className="glass border-border/50"
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter the agreed amount for your order
                    </p>
                  </div>
                )}

                {/* Payment Plan Selector - Only for paid orders above threshold */}
                {!isGoldenService && !hasOnlyFreeServices && totalOrderValue > 0 && (
                  <div className="space-y-3">
                    <Label className="text-foreground flex items-center gap-2">
                      <CalendarClock className="w-4 h-4 text-primary" />
                      Payment Plan
                    </Label>
                    <div className="space-y-3">
                      {/* Full Payment */}
                      <label
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentPlan === 'full'
                          ? 'border-primary bg-primary/10'
                          : 'border-border/50 hover:border-primary/30'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentPlan"
                          value="full"
                          checked={paymentPlan === 'full'}
                          onChange={() => setPaymentPlan('full')}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${paymentPlan === 'full'
                          ? 'border-primary bg-primary'
                          : 'border-muted-foreground'
                        }`}>
                          {paymentPlan === 'full' && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-foreground">💳 Pay Full Amount</p>
                          <p className="text-xs text-muted-foreground">₹{totalOrderValue.toLocaleString('en-IN')} today</p>
                        </div>
                      </label>

                      {/* 50/50 Split */}
                      {canUseHalf && (
                        <label
                          className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentPlan === 'half'
                            ? 'border-green-500 bg-green-500/10'
                            : 'border-border/50 hover:border-green-500/30'
                          }`}
                        >
                          <input
                            type="radio"
                            name="paymentPlan"
                            value="half"
                            checked={paymentPlan === 'half'}
                            onChange={() => setPaymentPlan('half')}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${paymentPlan === 'half'
                            ? 'border-green-500 bg-green-500'
                            : 'border-muted-foreground'
                          }`}>
                            {paymentPlan === 'half' && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-foreground">🏗️ 50% Upfront, 50% on Delivery</p>
                            <p className="text-xs text-muted-foreground">₹{Math.ceil(totalOrderValue / 2).toLocaleString('en-IN')} today · ₹{(totalOrderValue - Math.ceil(totalOrderValue / 2)).toLocaleString('en-IN')} on delivery</p>
                          </div>
                          <Badge variant="secondary" className="shrink-0 bg-green-500/20 text-green-400 border-green-500/30 text-xs">Popular</Badge>
                        </label>
                      )}

                      {/* 3x Installments */}
                      {canUseInstallments && (
                        <label
                          className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentPlan === 'installment_3x'
                            ? 'border-purple-500 bg-purple-500/10'
                            : 'border-border/50 hover:border-purple-500/30'
                          }`}
                        >
                          <input
                            type="radio"
                            name="paymentPlan"
                            value="installment_3x"
                            checked={paymentPlan === 'installment_3x'}
                            onChange={() => setPaymentPlan('installment_3x')}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${paymentPlan === 'installment_3x'
                            ? 'border-purple-500 bg-purple-500'
                            : 'border-muted-foreground'
                          }`}>
                            {paymentPlan === 'installment_3x' && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-foreground">📅 3 Interest-Free Installments</p>
                            <p className="text-xs text-muted-foreground">₹{Math.ceil(totalOrderValue / 3).toLocaleString('en-IN')} × 3 — first payment today</p>
                          </div>
                          <Badge variant="secondary" className="shrink-0 bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">0% Interest</Badge>
                        </label>
                      )}
                    </div>

                    {/* Billing Summary */}
                    {paymentPlan !== 'full' && (
                      <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent border border-primary/20 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Total Contract</span>
                          <span className="text-foreground font-medium">₹{totalOrderValue.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-green-400 font-semibold">Due Today</span>
                          <span className="text-green-400 font-bold text-lg">₹{dueToday.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Remaining Balance</span>
                          <span className="text-muted-foreground">₹{remainingBalance.toLocaleString('en-IN')}</span>
                        </div>
                        <p className="text-xs text-muted-foreground pt-2 border-t border-border/20">
                          {paymentPlan === 'half'
                            ? 'Remaining balance due upon project delivery. Deliverables released after full payment.'
                            : 'Installment 2 due at milestone approval. Installment 3 due on final delivery.'}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* 90% Money-Back Guarantee Alert */}
                {!isGoldenService && !hasOnlyFreeServices && totalOrderValue > 0 && (
                  <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/5 border border-green-500/20 flex items-start gap-3">
                    <Shield className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-green-400">90% Money-Back Guarantee</p>
                      <p className="text-xs text-muted-foreground mt-1">Not satisfied? Get 90% of your payment back within 7 days of delivery. 10% retained for API, hosting, and setup costs. <a href="/refund-policy" className="text-primary hover:underline">Full policy →</a></p>
                    </div>
                  </div>
                )}

                {/* Terms & Refund Policy Checkbox - 44px touch target */}
                <label htmlFor="terms-acceptance" className="flex items-start gap-3 p-2 -ml-2 rounded-xl cursor-pointer hover:bg-neutral-900/50 min-h-[44px] transition-colors">
                  <input
                    type="checkbox"
                    id="terms-acceptance"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-border accent-primary cursor-pointer shrink-0"
                  />
                  <span className="text-xs text-muted-foreground leading-relaxed">
                    I agree to the <a href="/terms-of-service" className="text-primary hover:underline py-1 inline-block">Terms of Service</a> and <a href="/refund-policy" className="text-primary hover:underline py-1 inline-block">Refund Policy</a>, including the 90% money-back guarantee and milestone-gated delivery terms.
                  </span>
                </label>

                {/* Reassurance Micro-Copy Block */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 via-neutral-900/90 to-background border border-primary/25 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                    <Zap className="w-4 h-4 text-primary shrink-0" />
                    <span>You're one step from your Execution Vault</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Once submitted, your dedicated tracker activates immediately. Mukul &amp; the engineering team review your brief the same business day, and the hybrid AI-human pipeline begins building your deliverables with guaranteed 24–48h milestone speed.
                  </p>
                </div>

                {/* Submit Button */}
                {!createdOrderId ? (
                  <Button
                    type="submit"
                    size="lg"
                    disabled={orderMutation.isPending || uploadMutation.isPending || !termsAccepted}
                    data-testid="button-submit-order"
                    className={`w-full text-lg py-6 ${isGoldenService || hasOnlyFreeServices
                      ? 'bg-gradient-to-r from-yellow-500 to-amber-600 hover:opacity-90'
                      : !termsAccepted
                        ? 'bg-muted text-muted-foreground cursor-not-allowed'
                        : 'bg-gradient-to-r from-primary to-destructive hover:opacity-90'
                      }`}
                  >
                    {orderMutation.isPending || uploadMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : isGoldenService || hasOnlyFreeServices
                      ? "¨ Submit FREE Order"
                      : paymentPlan === 'full'
                        ? `Pay ₹${totalOrderValue.toLocaleString('en-IN')} & Submit`
                        : `Pay ₹${dueToday.toLocaleString('en-IN')} & Submit`}
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border border-green-500/50 bg-green-500/10">
                      <p className="text-sm text-green-400 font-semibold">… Order Created Successfully!</p>
                      <p className="text-xs text-muted-foreground mt-1">Order ID: {createdOrderId.slice(0, 8)}...</p>
                    </div>

                    <Button
                      type="button"
                      size="lg"
                      onClick={handlePayment}
                      data-testid="button-pay-now"
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:opacity-90 text-lg py-6 flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-5 h-5" />
                      Pay ₹{dueToday.toLocaleString('en-IN')} Now
                    </Button>

                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setFormData({ name: "", email: "", service: "", requirements: "", deliveryPreference: "platform" });
                        setPaymentPlan('full');
                        setTermsAccepted(false);
                        setFiles([]);
                        setCreatedOrderId(null);
                      }}
                      className="w-full"
                    >
                      Create New Order
                    </Button>
                  </div>
                )}
              </form>

              {/* Trust Badges & Credibility Markers */}
              <div className="mt-6 pt-6 border-t border-border/30 space-y-4">
                {/* Verified Trust Badges */}
                <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs">
                  {/* Trustpilot */}
                  <a
                    href="https://www.trustpilot.com/review/sagedo.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 min-h-[44px] sm:min-h-0 px-3 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 text-neutral-300 transition-colors"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="#00b67a" className="shrink-0">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="font-semibold text-white">4.0</span>
                    <span className="text-neutral-400">on Trustpilot</span>
                  </a>

                  {/* MSME Udyam */}
                  <a
                    href="https://udyamregistration.gov.in/Udyam_Verify.aspx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 min-h-[44px] sm:min-h-0 px-3 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 hover:border-emerald-500/30 text-neutral-300 transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                    <span className="text-neutral-400 font-medium">MSME:</span>
                    <span className="text-emerald-400 font-mono text-[11px]">UDYAM-HP-04-0042175</span>
                  </a>

                  {/* 90% Guarantee */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-neutral-300">
                    <Shield className="w-3.5 h-3.5 text-green-400 shrink-0" />
                    <span>90% Money-Back SLA</span>
                  </div>
                </div>

                {/* Payment Security */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                    <span>RBI-Authorized Payment via Razorpay</span>
                  </span>
                  <span>•</span>
                  <span>256-Bit SSL Encrypted</span>
                  <span>•</span>
                  <span>UPI, Cards &amp; Netbanking</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Side - Service Detail Preview Panel */}
          <div className="flex flex-col lg:w-5/12 lg:sticky lg:top-24 lg:self-start order-2 lg:order-2 mb-8 lg:mb-0">
            {selectedServiceDetails ? (
              <div className="space-y-6">
                {/* Service Header Card */}
                <div className="relative rounded-2xl overflow-hidden border border-primary/20 bg-gradient-to-br from-background via-background to-primary/5 p-8 shadow-2xl shadow-primary/5">
                  {/* Glow accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-destructive to-primary" />

                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-destructive/20 flex items-center justify-center shrink-0 border border-primary/20">
                      <Sparkles className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-foreground leading-tight">
                        {selectedServiceDetails.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">{selectedServiceDetails.category}</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {selectedServiceDetails.fullDescription}
                  </p>

                  {/* Price & Delivery */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-background/60 border border-border/30">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Price Range</p>
                      <p className="text-lg font-black text-primary">{selectedServiceDetails.priceRange}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-background/60 border border-border/30">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Delivery</p>
                      <p className="text-lg font-black text-foreground flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        {selectedServiceDetails.deliveryTime || '24-48 hrs'}
                      </p>
                    </div>
                  </div>

                  {/* Standard Features */}
                  <div className="mb-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">What's Included</p>
                    <div className="space-y-2.5">
                      {selectedServiceDetails.standardFeatures.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                          <span className="text-sm text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Premium Features */}
                  {selectedServiceDetails.premiumFeatures.length > 0 && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">Premium Upgrades</p>
                      <div className="space-y-2.5">
                        {selectedServiceDetails.premiumFeatures.map((feature, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <Star className="w-4 h-4 text-amber-500 shrink-0" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Trust & Guarantee Card */}
                <RevealOnScroll delay={100}>
                  <div className="rounded-2xl border border-border/20 bg-background/40 backdrop-blur-sm p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground text-sm">90% Money-Back Guarantee</p>
                        <p className="text-xs text-muted-foreground">90% refund within 7 days of delivery</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground text-sm">AI + Human Excellence</p>
                        <p className="text-xs text-muted-foreground">Every deliverable is human-verified</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-amber-500" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground text-sm">Secure Payment via Razorpay</p>
                        <p className="text-xs text-muted-foreground">SSL encrypted · UPI · Cards · Netbanking</p>
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              </div>
            ) : (
              /* Execution Vault & Proven Outcomes Showcase */
              <div className="space-y-6">
                <RevealOnScroll delay={100}>
                  <div className="relative rounded-2xl overflow-hidden border border-primary/25 bg-gradient-to-br from-background via-neutral-900/60 to-primary/5 p-7 shadow-2xl shadow-primary/5">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-emerald-400 to-primary" />
                    
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-primary/15 text-primary">
                          <Award className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-foreground">The Execution Vault</h3>
                          <p className="text-xs text-muted-foreground">Real outcomes from our hybrid builds</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs border-emerald-500/40 text-emerald-400 bg-emerald-500/10">
                        Live Track Record
                      </Badge>
                    </div>

                    {/* Case Study 1: Project Genesis */}
                    <div className="p-4 rounded-xl bg-card/60 border border-border/40 mb-3 space-y-1.5 hover:border-primary/30 transition-colors">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-foreground">Project Genesis</span>
                        <span className="text-primary font-bold">1,400+ Waitlist</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        B2C startup MVP built, branded, and launched in 18 days. Secured local angel funding based on polished MVP demo &amp; early traction.
                      </p>
                    </div>

                    {/* Case Study 2: Project Elevate */}
                    <div className="p-4 rounded-xl bg-card/60 border border-border/40 mb-3 space-y-1.5 hover:border-emerald-500/30 transition-colors">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-foreground">Project Elevate</span>
                        <span className="text-emerald-400 font-bold">+400% Bookings</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Healthcare specialist clinic digital ecosystem &amp; local SEO takeover. Generated ₹35L+ ROI from high-ticket patient acquisition in 60 days.
                      </p>
                    </div>

                    {/* Verified Trustpilot Review */}
                    <div className="p-4 rounded-xl bg-neutral-900/90 border border-border/30 space-y-2">
                      <div className="flex items-center gap-1 text-[#00b67a]">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <p className="text-xs text-neutral-300 italic leading-relaxed">
                        "Easy-to-use and efficient platform that helps simplify tasks and save time."
                      </p>
                      <p className="text-[10px] text-muted-foreground font-semibold">
                        — Priya Singh, Verified Trustpilot Review
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-border/20 flex flex-col gap-2.5">
                      <p className="text-xs text-muted-foreground text-center">
                        Need to browse our full 30+ service catalog first?
                      </p>
                      <Link href="/services">
                        <Button variant="outline" className="w-full h-11 lg:h-9 text-xs sm:text-sm gap-2 border-primary/30 hover:bg-primary/10">
                          Browse Services Directory <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </RevealOnScroll>

                {/* Trust & Guarantee Card */}
                <RevealOnScroll delay={150}>
                  <div className="rounded-2xl border border-border/20 bg-background/40 backdrop-blur-sm p-5 space-y-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                        <Shield className="w-4 h-4 text-green-500" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground text-xs">90% Money-Back Guarantee</p>
                        <p className="text-[11px] text-muted-foreground">90% refund within 7 days if SLA is not met</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Zap className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground text-xs">AI Speed + Human Engineering</p>
                        <p className="text-[11px] text-muted-foreground">Every line of code &amp; design human-verified</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground text-xs">Sovereign Asset Handover</p>
                        <p className="text-[11px] text-muted-foreground">You own 100% of your source code &amp; database</p>
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}



