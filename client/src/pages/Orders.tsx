import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Upload, CheckCircle2, CreditCard, Sparkles, Plus, X, Star, LogIn } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useSearch, Link, useLocation } from "wouter";
import { allServices } from "@/data/serviceData";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";

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
    deliveryPreference: "platform" as "platform" | "email",
  });
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);
  const [orderAmount, setOrderAmount] = useState(500); // Default ₹500
  const API_URL = ''; // Use relative URL - Vercel proxy forwards to Render

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
          title: "🎫 Golden Ticket Mode!",
          description: "Select any Bar 1 service below and it will be FREE!",
        });
      }, 500);
    }

    if (serviceName) {
      setFormData(prev => ({ ...prev, service: serviceName }));

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
    }
  }, [searchString]);

  // Load Razorpay SDK
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
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
        toast({
          title: "Order Submitted Successfully! 🎉",
          description: "Your FREE service order has been received. We'll contact you soon!",
        });
        // Reset form
        setFormData({ name: "", email: "", service: "", requirements: "" });
        setFiles([]);
        setCart([]);
        setCreatedOrderId(null);
        return; // Skip payment
      }

      // For paid services, trigger Razorpay payment
      try {
        // Create Razorpay order
        const response = await fetch(`${API_URL}/api/payment/create-order`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            amount: cartTotal > 0 ? cartTotal : orderAmount,
            orderId: orderId
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create payment order');
        }

        const paymentOrder = await response.json();

        // Open Razorpay checkout immediately
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_RsCG3btmCdudEN',
          amount: paymentOrder.amount,
          currency: 'INR',
          name: 'SAGE DO',
          description: formData.service,
          order_id: paymentOrder.id,
          handler: async function (response: any) {
            try {
              // Verify payment on backend
              const verifyResponse = await fetch(`${API_URL}/api/payment/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  orderId: orderId,
                }),
              });

              if (verifyResponse.ok) {
                toast({
                  title: "Payment Successful! 🎉",
                  description: "Your order is being processed. We'll contact you soon!",
                });
                // Reset form
                setFormData({ name: "", email: "", service: "", requirements: "" });
                setFiles([]);
                setCreatedOrderId(null);
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

    orderMutation.mutate({
      customerName: formData.name,
      customerEmail: formData.email,
      serviceName: formData.service,
      requirements: formData.requirements,
      fileUrls,
      deliveryPreference: formData.deliveryPreference,
    });
  };

  const handlePayment = async () => {
    if (!createdOrderId) return;

    try {
      // Create Razorpay order
      const response = await fetch(`${API_URL}/api/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          amount: orderAmount,
          orderId: createdOrderId
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment order');
      }

      const paymentOrder = await response.json();

      // Open Razorpay checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_RsCG3btmCdudEN',
        amount: paymentOrder.amount,
        currency: 'INR',
        name: 'SAGE DO',
        description: formData.service,
        order_id: paymentOrder.id,
        handler: async function (response: any) {
          try {
            // Verify payment on backend
            const verifyResponse = await fetch(`${API_URL}/api/payment/verify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId: createdOrderId,
              }),
            });

            if (verifyResponse.ok) {
              toast({
                title: "Payment Successful! 🎉",
                description: "Your order is being processed. We'll contact you soon!",
              });

              // Reset form
              setFormData({ name: "", email: "", service: "", requirements: "" });
              setFiles([]);
              setCreatedOrderId(null);
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

  // If not authenticated, show login required message
  if (!isLoading && !isAuthenticated) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto text-center">
          <Card className="glass p-12">
            <LogIn className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h1 className="text-3xl font-black text-foreground mb-4">
              Login Required
            </h1>
            <p className="text-muted-foreground mb-8">
              Please login or create an account to place an order. It only takes a minute!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary to-destructive">
                  <LogIn className="w-4 h-4 mr-2" /> Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Sign Up FREE
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Split Layout Container - increased gap */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">

          {/* Left Side - Form Content - narrower to create space */}
          <div className="flex-1 lg:max-w-xl lg:pr-8">
            <div className="text-center lg:text-left mb-8">
              <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">
                Place Your Order
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Tell us what you need, and we'll get it done for you.
              </p>
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
                          Golden Ticket Service - FREE!
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          Your Order ({cart.length}/3 services)
                        </>
                      )}
                    </h3>
                    {cart.length < 3 && !hasOnlyFreeServices && (
                      <Link href="/services">
                        <Button variant="outline" size="sm" className="gap-1">
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
                            ✨ FREE
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
                          className="text-muted-foreground hover:text-destructive transition-colors"
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
                      <span className="text-2xl font-black text-green-500">FREE ✨</span>
                    ) : (
                      <span className="text-2xl font-black text-primary">₹{cartTotal}</span>
                    )}
                  </div>
                </div>
              </Card>
            )}

            <Card className="glass p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
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

                {/* Service - Only show if not pre-filled from URL */}
                {!formData.service && (
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
                  <div className="grid grid-cols-2 gap-4">
                    <label
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.deliveryPreference === 'platform'
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
                      <div className={`w-4 h-4 rounded-full border-2 ${formData.deliveryPreference === 'platform'
                        ? 'border-primary bg-primary'
                        : 'border-muted-foreground'
                        }`}>
                        {formData.deliveryPreference === 'platform' && (
                          <div className="w-full h-full rounded-full bg-white scale-50" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Dashboard</p>
                        <p className="text-xs text-muted-foreground">Download from your dashboard</p>
                      </div>
                    </label>
                    <label
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.deliveryPreference === 'email'
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
                      <div className={`w-4 h-4 rounded-full border-2 ${formData.deliveryPreference === 'email'
                        ? 'border-primary bg-primary'
                        : 'border-muted-foreground'
                        }`}>
                        {formData.deliveryPreference === 'email' && (
                          <div className="w-full h-full rounded-full bg-white scale-50" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Email</p>
                        <p className="text-xs text-muted-foreground">Receive download link via email</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Order Amount - Hide for Golden Ticket services */}
                {!isGoldenService && !hasOnlyFreeServices && (
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-foreground">
                      Order Amount (₹) <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      value={cartTotal > 0 ? cartTotal : orderAmount}
                      onChange={(e) => setOrderAmount(parseInt(e.target.value) || 0)}
                      placeholder="500"
                      min="1"
                      required
                      className="glass border-border/50"
                      disabled={cart.length > 0}
                    />
                    <p className="text-xs text-muted-foreground">
                      {cart.length > 0 ? 'Amount calculated from selected services' : 'Enter the agreed amount for your order'}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                {!createdOrderId ? (
                  <Button
                    type="submit"
                    size="lg"
                    disabled={orderMutation.isPending || uploadMutation.isPending}
                    data-testid="button-submit-order"
                    className={`w-full text-lg py-6 ${isGoldenService || hasOnlyFreeServices
                      ? 'bg-gradient-to-r from-yellow-500 to-amber-600 hover:opacity-90'
                      : 'bg-gradient-to-r from-primary to-destructive hover:opacity-90'
                      }`}
                  >
                    {orderMutation.isPending || uploadMutation.isPending
                      ? "Submitting..."
                      : isGoldenService || hasOnlyFreeServices
                        ? "✨ Submit FREE Order"
                        : `Pay ₹${cartTotal > 0 ? cartTotal : orderAmount} & Submit`}
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border border-green-500/50 bg-green-500/10">
                      <p className="text-sm text-green-400 font-semibold">✅ Order Created Successfully!</p>
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
                      Pay ₹{orderAmount} Now
                    </Button>

                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setFormData({ name: "", email: "", service: "", requirements: "" });
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

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-border/30">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-muted-foreground">100% Secure Payment</span>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  {/* Razorpay */}
                  <div className="px-3 py-2 bg-card/50 rounded-lg border border-border/30 flex items-center gap-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 18.5L4 16V8.5l8 4v8zM12 11L4.5 7 12 3l7.5 4L12 11zm8 5l-6.5 3.25V13l6.5-3.25V16z" />
                    </svg>
                    <span className="text-xs font-medium">Razorpay</span>
                  </div>
                  {/* Visa */}
                  <div className="px-3 py-2 bg-card/50 rounded-lg border border-border/30">
                    <span className="text-xs font-bold text-blue-500">VISA</span>
                  </div>
                  {/* Mastercard */}
                  <div className="px-3 py-2 bg-card/50 rounded-lg border border-border/30">
                    <div className="flex -space-x-1">
                      <div className="w-4 h-4 rounded-full bg-red-500" />
                      <div className="w-4 h-4 rounded-full bg-yellow-500" />
                    </div>
                  </div>
                  {/* UPI */}
                  <div className="px-3 py-2 bg-card/50 rounded-lg border border-border/30">
                    <span className="text-xs font-bold text-green-600">UPI</span>
                  </div>
                  {/* SSL */}
                  <div className="px-3 py-2 bg-card/50 rounded-lg border border-border/30 flex items-center gap-1">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-xs font-medium">SSL</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Side - Full Height Human Image (Hidden on mobile) */}
          <div className="hidden lg:flex lg:flex-col lg:w-5/12 lg:fixed lg:right-0 lg:top-16 lg:bottom-0 lg:p-6">
            {/* Full Height Image Container */}
            <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl border border-border/20">
              <img
                src="/gorgeous_woman.png"
                alt="SAGE DO Support"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-transparent" />

              {/* Content overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-8 space-y-6">
                {/* AI + Human Badge */}
                <div className="flex items-center gap-3 bg-background/80 backdrop-blur-sm p-4 rounded-xl w-fit">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">AI + Human Excellence</p>
                    <p className="text-sm text-muted-foreground">We'll handle it for you ✨</p>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="bg-background/80 backdrop-blur-sm p-4 rounded-xl space-y-3">
                  <div className="flex items-center gap-2 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-medium">Fast 24-48 hour delivery</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-medium">100% Satisfaction guarantee</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-medium">Secure payment via Razorpay</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


