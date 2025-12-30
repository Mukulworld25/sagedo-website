import { useState, useEffect, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { CheckCircle2, Circle, Clock, Package, Truck, Home, Star, MessageSquare, ShieldCheck, Zap, Heart, Gamepad2, Timer } from "lucide-react";
import { Order } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import MiniGame from "@/components/MiniGame";
import OrderActivityFeed from "@/components/OrderActivityFeed";

export default function Tracking() {
  const { toast } = useToast();
  const [orderId, setOrderId] = useState("");
  const [searchedOrderId, setSearchedOrderId] = useState("");

  // Auto-read orderId from URL params (from Dashboard Track button)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlOrderId = urlParams.get('orderId');
    if (urlOrderId) {
      setOrderId(urlOrderId);
      setSearchedOrderId(urlOrderId);
    }
  }, []);

  // Feedback state
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");

  const { data: order, isLoading } = useQuery<Order>({
    queryKey: ["/api/orders", searchedOrderId],
    enabled: !!searchedOrderId,
  });

  // Auto-scroll to order details when order is loaded from URL
  useEffect(() => {
    if (order && searchedOrderId) {
      const element = document.getElementById('order-details');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      }
    }
  }, [order, searchedOrderId]);

  const feedbackMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/feedback", { rating, message });
    },
    onSuccess: () => {
      toast({
        title: "Thank you!",
        description: "Your feedback helps us improve.",
      });
      setMessage("");
      setRating(5);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) {
      toast({
        title: "Missing Order ID",
        description: "Please enter your order ID.",
        variant: "destructive",
      });
      return;
    }
    setSearchedOrderId(orderId);
  };

  const stages = [
    {
      name: "Pending",
      description: "Order received and waiting for processing",
      icon: Clock,
    },
    {
      name: "Processing",
      description: "We're working on your order",
      icon: Package,
    },
    {
      name: "Finalizing",
      description: "Quality check and final touches",
      icon: Truck,
    },
    {
      name: "Delivered",
      description: "Order completed and delivered",
      icon: Home,
    },
  ];

  const statusToIndex: Record<string, number> = {
    pending: 0,
    processing: 1,
    finalizing: 2,
    delivered: 3,
  };

  const currentStageIndex = order ? statusToIndex[order.status] : -1;

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* 3-Column Hero: Girl LEFT | Tracking CENTER | Girl RIGHT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center min-h-[600px]">

          {/* LEFT: Girl 1 - Pink Saree */}
          <div className="hidden lg:block h-[550px] relative">
            <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/girl_left.png"
                alt="Customer Support"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
            {/* Badge */}
            <div className="absolute bottom-6 left-6 glass px-4 py-2 rounded-full">
              <span className="text-sm font-bold">✨ Premium Support</span>
            </div>
          </div>

          {/* CENTER: Tracking Form */}
          <div className="w-full space-y-6">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">
                Track Your <span className="text-primary">Order</span>
              </h1>
              <p className="text-muted-foreground">
                Enter your order ID to see real-time status ✨
              </p>
            </div>

            <Card className="glass p-8 border-primary/20 shadow-2xl">
              <form onSubmit={handleTrack} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="orderId" className="text-lg font-bold">
                    Order ID
                  </Label>
                  <Input
                    id="orderId"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="Enter order ID (e.g. #1234)"
                    data-testid="input-order-id"
                    className="h-12 text-lg"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  data-testid="button-track-order"
                  className="w-full h-12 text-lg bg-gradient-to-r from-primary to-destructive hover:opacity-90"
                >
                  {isLoading ? "Tracking..." : "Track Order 🚀"}
                </Button>
              </form>
            </Card>

            <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <span>Trusted by 1000+ Indians</span>
            </div>
          </div>

          {/* RIGHT: Girl 2 - Pink Saree */}
          <div className="hidden lg:block h-[550px] relative">
            <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/girl_right.png"
                alt="AI Assistant"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
            {/* Badge */}
            <div className="absolute bottom-6 right-6 glass px-4 py-2 rounded-full">
              <span className="text-sm font-bold">🤖 AI Powered</span>
            </div>
          </div>

        </div>
      </div>

      {/* Content Section Below */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">


        {/* Order Details */}
        {order && (
          <Card id="order-details" className="glass p-8 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Order Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Order ID</p>
                <p className="text-foreground font-mono" data-testid="text-order-id">
                  {order.id}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Service</p>
                <p className="text-foreground" data-testid="text-service-name">
                  {order.serviceName}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Customer</p>
                <p className="text-foreground">{order.customerName || order.customerEmail}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Order Date</p>
                <p className="text-foreground">
                  {new Date(order.createdAt!).toLocaleDateString()}
                </p>
              </div>
              {order.deliveredAt && (
                <div>
                  <p className="text-sm text-muted-foreground">Delivered Date</p>
                  <p className="text-foreground">
                    {new Date(order.deliveredAt).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Order Activity Timeline */}
        {order && (
          <Card className="glass p-6 mb-8">
            <OrderActivityFeed orderId={order.id} />
          </Card>
        )}

        {/* Progress Bar + Mini Game Section (only show when order is found and not delivered) */}
        {order && order.status !== 'delivered' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Visual Progress Bar */}
            <Card className="glass p-6">
              <div className="flex items-center gap-3 mb-4">
                <Timer className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-bold text-foreground">Order Progress</h3>
              </div>

              {/* Progress percentage based on status */}
              {(() => {
                const progressMap: Record<string, number> = {
                  pending: 0,
                  processing: 33,
                  finalizing: 66,
                  delivered: 100,
                };
                const progress = progressMap[order.status] || 0;

                // Calculate countdown timer
                const getDeliveryHours = (deliveryTime?: string | null): number => {
                  if (!deliveryTime) return 48; // Default 48 hours
                  const timeStr = deliveryTime.toLowerCase();
                  if (timeStr.includes('24 hour')) return 24;
                  if (timeStr.includes('48 hour')) return 48;
                  if (timeStr.includes('2-3 day')) return 72;
                  if (timeStr.includes('3-5 day')) return 120;
                  if (timeStr.includes('5-7 day')) return 168;
                  if (timeStr.includes('7-10 day')) return 240;
                  if (timeStr.includes('10-15 day')) return 360;
                  if (timeStr.includes('15 day') || timeStr.includes('15+ day')) return 360;
                  return 48;
                };

                const deliveryHours = getDeliveryHours((order as any).deliveryTime);
                const orderDate = new Date(order.createdAt!);
                const deliveryDate = new Date(orderDate.getTime() + deliveryHours * 60 * 60 * 1000);
                const now = new Date();
                const timeRemaining = deliveryDate.getTime() - now.getTime();

                const days = Math.max(0, Math.floor(timeRemaining / (1000 * 60 * 60 * 24)));
                const hours = Math.max(0, Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
                const minutes = Math.max(0, Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)));

                return (
                  <>
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                      <span className="font-bold text-primary">{progress}% Complete</span>
                    </div>
                    <div className="h-4 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-destructive rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    {/* Countdown Timer */}
                    {timeRemaining > 0 && (
                      <div className="mt-4 p-4 bg-neutral-800/50 rounded-lg border border-primary/20">
                        <div className="text-xs text-muted-foreground mb-2">⏱️ Estimated Delivery In:</div>
                        <div className="flex gap-3 justify-center text-center">
                          <div className="bg-neutral-900 rounded-lg p-3 min-w-[60px]">
                            <div className="text-2xl font-bold text-primary">{days}</div>
                            <div className="text-xs text-muted-foreground">Days</div>
                          </div>
                          <div className="bg-neutral-900 rounded-lg p-3 min-w-[60px]">
                            <div className="text-2xl font-bold text-primary">{hours}</div>
                            <div className="text-xs text-muted-foreground">Hours</div>
                          </div>
                          <div className="bg-neutral-900 rounded-lg p-3 min-w-[60px]">
                            <div className="text-2xl font-bold text-primary">{minutes}</div>
                            <div className="text-xs text-muted-foreground">Mins</div>
                          </div>
                        </div>
                        <div className="text-xs text-center text-muted-foreground mt-2">
                          Expected by: {deliveryDate.toLocaleDateString()} at {deliveryDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    )}
                    {timeRemaining <= 0 && order.status !== 'delivered' && (
                      <div className="mt-4 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30 text-center">
                        <span className="text-yellow-500 text-sm font-medium">
                          ⏰ Your order is taking longer than expected. We're on it!
                        </span>
                      </div>
                    )}

                    <p className="text-sm text-muted-foreground mt-3">
                      {order.status === 'pending' && 'Your order is in the queue. We\'ll start working on it soon!'}
                      {order.status === 'processing' && 'We\'re actively working on your order. Great things take time!'}
                      {order.status === 'finalizing' && 'Almost there! Final quality checks in progress.'}
                    </p>
                  </>
                );
              })()}
            </Card>

            {/* Mini Game - Play while you wait */}
            <Card className="glass p-6">
              <div className="flex items-center gap-3 mb-4">
                <Gamepad2 className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-bold text-foreground">Play While You Wait</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Click the red dots before they disappear! 🎯
              </p>
              <MiniGame />
            </Card>
          </div>
        )}

        {/* Progress Timeline */}
        {order && (
          <Card className="glass p-8 mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              Order Progress
            </h2>
            <div className="space-y-8">
              {stages.map((stage, index) => {
                const isCompleted = index <= currentStageIndex;
                const isCurrent = index === currentStageIndex;
                const Icon = stage.icon;

                return (
                  <div
                    key={stage.name}
                    className={`relative flex items-start gap-6 ${index < stages.length - 1 ? "pb-8" : ""
                      }`}
                    data-testid={`stage-${stage.name.toLowerCase()}`}
                  >
                    {/* Vertical Line */}
                    {index < stages.length - 1 && (
                      <div
                        className={`absolute left-6 top-12 w-0.5 h-full ${index < currentStageIndex ? "bg-primary" : "bg-border"
                          }`}
                      />
                    )}

                    {/* Icon Circle */}
                    <div
                      className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 ${isCompleted
                        ? "bg-gradient-to-r from-primary to-destructive border-transparent"
                        : isCurrent
                          ? "bg-background border-primary animate-pulse-glow"
                          : "bg-background border-border"
                        }`}
                    >
                      {isCompleted && index !== currentStageIndex ? (
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      ) : isCurrent ? (
                        <Icon className="w-6 h-6 text-primary" />
                      ) : (
                        <Circle className="w-6 h-6 text-muted-foreground" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <h3
                        className={`text-lg font-bold ${isCompleted ? "text-foreground" : "text-muted-foreground"
                          }`}
                      >
                        {stage.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {stage.description}
                      </p>
                      {isCurrent && (
                        <div className="mt-2">
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-primary to-destructive text-white">
                            Current Stage
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {order.deliveryNotes && (
              <div className="mt-8 p-4 glass rounded-lg border border-border/50">
                <h4 className="text-sm font-semibold text-foreground mb-2">Delivery Notes</h4>
                <p className="text-sm text-muted-foreground">{order.deliveryNotes}</p>
              </div>
            )}
          </Card>
        )}

        {/* No Order Found */}
        {searchedOrderId && !order && !isLoading && (
          <Card className="glass p-12 text-center mb-12">
            <p className="text-xl text-muted-foreground">
              No order found with ID: <strong>{searchedOrderId}</strong>
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Please check your order ID and try again.
            </p>
          </Card>
        )}

        {/* Feedback & Trust Section - Redesigned */}
        <div className="space-y-6">
          {/* Feedback Form - Compact Design */}
          <Card className="glass p-6 border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-destructive flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Share Your Experience</h2>
                <p className="text-sm text-muted-foreground">Your feedback helps us improve</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex gap-1 justify-center md:justify-start">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`p-1 transition-transform hover:scale-110 ${star <= rating ? "text-yellow-500" : "text-neutral-600"}`}
                  >
                    <Star className="w-7 h-7 fill-current" />
                  </button>
                ))}
              </div>
              <div className="flex-1 flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you think..."
                  className="bg-background/50"
                />
                <Button
                  onClick={() => feedbackMutation.mutate()}
                  disabled={feedbackMutation.isPending || !message.trim()}
                  className="bg-gradient-to-r from-primary to-destructive shrink-0"
                >
                  {feedbackMutation.isPending ? "..." : "Submit"}
                </Button>
              </div>
            </div>
          </Card>

          {/* Trust Badges - Horizontal Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-neutral-800/50 border border-neutral-700/50">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Secure & Private</h3>
                <p className="text-xs text-muted-foreground">100% encrypted data</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-neutral-800/50 border border-neutral-700/50">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-600/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Fast Delivery</h3>
                <p className="text-xs text-muted-foreground">Speed + quality</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-neutral-800/50 border border-neutral-700/50">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-red-600/20 flex items-center justify-center">
                <Heart className="w-6 h-6 text-pink-500" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Satisfaction</h3>
                <p className="text-xs text-muted-foreground">100% guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
