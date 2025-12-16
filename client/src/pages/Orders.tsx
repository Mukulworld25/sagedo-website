import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Upload, CheckCircle2, CreditCard, Sparkles } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useSearch } from "wouter";

// Declare Razorpay on window
declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Orders() {
  const { toast } = useToast();
  const searchString = useSearch();
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    requirements: "",
  });
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);
  const [orderAmount, setOrderAmount] = useState(500); // Default ₹500
  const [deliveryTime, setDeliveryTime] = useState<string>("");
  const API_URL = import.meta.env.VITE_API_URL || 'https://sagedo-website.onrender.com';

  // Read URL params and pre-fill form
  useEffect(() => {
    const params = new URLSearchParams(searchString);
    const serviceName = params.get('service');
    const price = params.get('price');
    const delivery = params.get('delivery');

    if (serviceName) {
      setFormData(prev => ({ ...prev, service: serviceName }));
    }
    if (price) {
      setOrderAmount(parseInt(price, 10));
    }
    if (delivery) {
      setDeliveryTime(delivery);
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
    onSuccess: async (data: any) => {
      const orderId = data.id;
      setCreatedOrderId(orderId);

      // Immediately trigger Razorpay payment
      try {
        // Create Razorpay order
        const response = await fetch(`${API_URL}/api/payment/create-order`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            amount: orderAmount,
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

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Split Layout Container */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left Side - Form Content */}
          <div className="flex-1 lg:max-w-2xl">
            <div className="text-center lg:text-left mb-8">
              <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">
                Place Your Order
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Tell us what you need, and we'll get it done for you.
              </p>
            </div>

            {/* Service Selection Banner - Shows when coming from Services page */}
            {formData.service && (
              <Card className="glass p-6 mb-8 border-2 border-primary/50 bg-gradient-to-r from-primary/10 to-destructive/10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Selected Service:</p>
                      <p className="text-xl font-bold text-foreground">{formData.service}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Amount</p>
                      <p className="text-2xl font-black text-primary">₹{orderAmount}</p>
                    </div>
                    {deliveryTime && (
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Delivery</p>
                        <p className="text-lg font-bold text-foreground">{deliveryTime}</p>
                      </div>
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

                {/* Requirements */}
                <div className="space-y-2">
                  <Label htmlFor="requirements" className="text-foreground">
                    Requirements & Details
                  </Label>
                  <Textarea
                    id="requirements"
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    placeholder="Please describe your requirements in detail..."
                    rows={6}
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

                {/* Order Amount */}
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-foreground">
                    Order Amount (₹) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={orderAmount}
                    onChange={(e) => setOrderAmount(parseInt(e.target.value) || 0)}
                    placeholder="500"
                    min="1"
                    required
                    className="glass border-border/50"
                  />
                  <p className="text-xs text-muted-foreground">Enter the agreed amount for your order</p>
                </div>

                {/* Submit or Payment Button */}
                {!createdOrderId ? (
                  <Button
                    type="submit"
                    size="lg"
                    disabled={orderMutation.isPending || uploadMutation.isPending}
                    data-testid="button-submit-order"
                    className="w-full bg-gradient-to-r from-primary to-destructive hover:opacity-90 text-lg py-6"
                  >
                    {orderMutation.isPending || uploadMutation.isPending
                      ? "Creating Order..."
                      : "Create Order"}
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
            </Card>
          </div>

          {/* Right Side - Full Height Human Image (Hidden on mobile) */}
          <div className="hidden lg:flex lg:flex-col lg:w-1/2 lg:fixed lg:right-0 lg:top-16 lg:bottom-0">
            {/* Full Height Image Container */}
            <div className="relative h-full">
              <img
                src="/gorgeous_woman.png"
                alt="SAGE DO Support"
                className="w-full h-full object-cover"
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


