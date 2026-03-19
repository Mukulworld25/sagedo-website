import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { User, Order } from "@shared/schema";
import { Coins, Gift, TrendingUp, FileText, Download, Trash2, AlertTriangle, Camera, User as UserIcon, Settings, Clock, Package, Truck, Home as HomeIcon, Timer, Gamepad2, Circle, Eye, EyeOff } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import OrderActivityFeed from "@/components/OrderActivityFeed";
import MiniGame from "@/components/MiniGame";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

export default function Dashboard() {
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading } = useAuth();

  const [, setLocation] = useLocation();
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);
  const [isUploadingProfilePic, setIsUploadingProfilePic] = useState(false);
  const [surveyData, setSurveyData] = useState({
    experience: "",
    feedback: ""
  });
  const [trackingOrderId, setTrackingOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setLocation("/login");
    }
  }, [isAuthenticated, isLoading, setLocation]);

  const { data: userDetails } = useQuery<User>({
    queryKey: ["/api/dashboard/user"],
    enabled: isAuthenticated,
    staleTime: 0, // Always refetch fresh data
    refetchOnMount: 'always',
  });

  const { data: orders = [], isError: ordersError, error: ordersErrorDetails } = useQuery<Order[]>({
    queryKey: ["/api/dashboard/orders"],
    enabled: isAuthenticated,
    staleTime: 0,
    refetchOnMount: 'always',
  });

  // Debug logging
  console.log('Dashboard Debug:', { isAuthenticated, ordersCount: orders.length, ordersError, userDetails: !!userDetails });

  const earnTokensMutation = useMutation({
    mutationFn: async (data: { amount: number; type: string; description: string }) => {
      await apiRequest("POST", "/api/tokens/earn", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/user"] });
      toast({
        title: "Tokens Earned!",
        description: "Your token balance has been updated.",
      });
    },
    onError: async (error: any) => {
      // Try to extract error message from response
      let message = "Failed to earn tokens";
      try {
        if (error.message) message = error.message;
      } catch { }
      toast({
        title: "Cannot Earn Tokens",
        description: message,
        variant: "destructive",
      });
    },
  });

  const handleEarnTokens = (amount: number, type: string, description: string, referralEmail?: string) => {
    earnTokensMutation.mutate({ amount, type, description });
  };

  const handleReferralClick = () => {
    const email = window.prompt("Enter the email address of the person you referred:");
    if (email && email.includes('@')) {
      handleEarnTokens(100, "referral", `Referral bonus for ${email}`, email);
    } else if (email) {
      toast({ title: "Invalid Email", description: "Please enter a valid email address.", variant: "destructive" });
    }
  };

  // Delete Account feature
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const API_URL = ''; // Use relative URL - Vercel proxy forwards to Render

  const deleteAccountMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_URL}/api/auth/account`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to delete account');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Account Deleted",
        description: "Your account has been permanently deleted. Goodbye!",
      });
      localStorage.removeItem('sagedo_user');
      window.location.href = '/';
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
        <p className="text-muted-foreground animate-pulse">Redirecting to login...</p>
      </div>
    );
  }

  // Use API data if available, fallback to AuthContext user data (from login)
  const effectiveUser = userDetails || user;
  const tokenBalance = effectiveUser?.tokenBalance || 0;
  const hasGoldenTicket = effectiveUser?.hasGoldenTicket || false;

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Profile Picture with Upload */}
            {/* Static Profile Picture - Management moved to Settings */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-destructive p-0.5 shadow-sm">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                  {userDetails?.profileImageUrl ? (
                    <img src={userDetails.profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
              </div>
              <Button variant="ghost" className="h-auto p-0 text-xs text-muted-foreground hover:text-primary" onClick={() => setLocation('/settings')}>
                Edit
              </Button>
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-black text-foreground">
                Dashboard
              </h1>
              <p className="text-muted-foreground">
                Welcome back, {userDetails?.name || userDetails?.firstName || user?.email}!
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            {userDetails?.isAdmin && (
              <a href="/admin">
                <Button variant="default" className="bg-gradient-to-r from-primary to-destructive hover:opacity-90">
                  Admin Dashboard
                </Button>
              </a>
            )}
            <a href="/api/logout">
              <Button variant="outline" data-testid="button-logout" className="glass hover-elevate">
                Logout
              </Button>
            </a>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="glass p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Token Balance</p>
                <p className="text-3xl font-black text-foreground" data-testid="text-token-balance">
                  {tokenBalance}
                </p>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500">
                <Coins className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="glass p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
                <p className="text-3xl font-black text-foreground" data-testid="text-total-orders">
                  {orders.length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-r from-neutral-600 to-neutral-500">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="glass p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Starter Credit</p>
                <p className="text-3xl font-black text-foreground" data-testid="text-golden-ticket">
                  {hasGoldenTicket ? "1" : "0"}
                </p>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500">
                <Gift className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        </div>

        {/* Golden Ticket */}
        {hasGoldenTicket && (
          <Card className="glass p-6 mb-8 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border-yellow-500/50">
            <div className="flex items-center gap-3 mb-4">
              <Gift className="w-6 h-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-foreground">🎁 Starter Credit Ready!</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              You have 1 Starter Credit! Use it to get any service from our Bar 1 category absolutely FREE.
            </p>
            <Button
              variant="default"
              data-testid="button-use-golden-ticket"
              className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:opacity-90"
              onClick={() => {
                setLocation('/orders?useGoldenTicket=true');
                toast({ title: "Starter Credit Selected!", description: "Choose a Bar 1 service to redeem your free service." });
              }}
            >
              Use Starter Credit
            </Button>
          </Card>
        )}

        {/* Earn Tokens */}
        <Card className="glass p-6 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            Earn More Tokens
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button
              onClick={handleReferralClick}
              disabled={earnTokensMutation.isPending}
              data-testid="button-earn-referral"
              variant="outline"
              className="glass p-6 h-auto flex-col items-start hover-elevate"
            >
              <p className="text-lg font-bold text-foreground mb-1">Refer a Friend</p>
              <p className="text-sm text-muted-foreground mb-2">Earn 100 tokens per referral</p>
              <Badge className="bg-gradient-to-r from-green-600 to-emerald-600">+100</Badge>
            </Button>

            <Button
              onClick={() => setIsSurveyOpen(true)}
              disabled={earnTokensMutation.isPending}
              data-testid="button-earn-survey"
              variant="outline"
              className="glass p-6 h-auto flex-col items-start hover-elevate"
            >
              <p className="text-lg font-bold text-foreground mb-1">Complete Survey</p>
              <p className="text-sm text-muted-foreground mb-2">Quick 5-minute survey</p>
              <Badge className="bg-gradient-to-r from-neutral-600 to-neutral-500">+50</Badge>
            </Button>

            <Button
              onClick={() => handleEarnTokens(10, "daily_login", "Daily login bonus")}
              disabled={earnTokensMutation.isPending}
              data-testid="button-earn-daily"
              variant="outline"
              className="glass p-6 h-auto flex-col items-start hover-elevate"
            >
              <p className="text-lg font-bold text-foreground mb-1">Daily Login</p>
              <p className="text-sm text-muted-foreground mb-2">Log in every day</p>
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600">+10</Badge>
            </Button>
          </div>
        </Card>

        {/* Order History */}
        <Card className="glass p-6 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <FileText className="w-6 h-6" />
            Order History
          </h2>

          {orders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">You haven't placed any orders yet.</p>
              <a href="/orders">
                <Button className="bg-gradient-to-r from-primary to-destructive hover:opacity-90">
                  Place Your First Order
                </Button>
              </a>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Service</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order: any) => (
                    <tr key={order.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-3 px-4">
                        <span className="text-foreground font-medium">{order.serviceName}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'delivered'
                          ? 'bg-green-500/20 text-green-400'
                          : order.status === 'processing'
                            ? 'bg-blue-500/20 text-blue-400'
                            : order.status === 'finalizing'
                              ? 'bg-purple-500/20 text-purple-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" className="text-xs" onClick={() => setTrackingOrderId(trackingOrderId === order.id ? null : order.id)}>
                            {trackingOrderId === order.id ? (
                              <><EyeOff className="w-3 h-3 mr-1" /> Hide</>
                            ) : (
                              <><Eye className="w-3 h-3 mr-1" /> Track</>
                            )}
                          </Button>
                          <a href={`/api/orders/${order.id}/invoice`} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" variant="ghost" className="text-xs" title="Download Invoice">
                              📄
                            </Button>
                          </a>
                          {order.status === 'delivered' && order.deliveryFileUrls && order.deliveryFileUrls.length > 0 && (
                            <div className="flex gap-1">
                              {order.deliveryFileUrls.map((url: string, i: number) => (
                                <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                                  <Button size="sm" className="text-xs bg-green-600 hover:bg-green-700">
                                    📥 {order.deliveryFileUrls.length > 1 ? `File ${i + 1}` : 'Download'}
                                  </Button>
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* Inline Order Tracking Section */}
        {trackingOrderId && (() => {
          const trackedOrder = orders.find((o: any) => o.id === trackingOrderId);
          if (!trackedOrder) return null;

          const stages = [
            { name: "Pending", description: "Order received and waiting for processing", icon: Clock },
            { name: "Processing", description: "We're working on your order", icon: Package },
            { name: "Finalizing", description: "Quality check and final touches", icon: Truck },
            { name: "Delivered", description: "Order completed and delivered", icon: HomeIcon },
          ];
          const statusToIndex: Record<string, number> = { pending: 0, processing: 1, finalizing: 2, delivered: 3 };
          const currentStageIndex = statusToIndex[(trackedOrder as any).status] || 0;

          // Progress & countdown
          const progressMap: Record<string, number> = { pending: 0, processing: 33, finalizing: 66, delivered: 100 };
          const progress = progressMap[(trackedOrder as any).status] || 0;
          const getDeliveryHours = (deliveryTime?: string | null): number => {
            if (!deliveryTime) return 48;
            const t = deliveryTime.toLowerCase();
            if (t.includes('24 hour')) return 24;
            if (t.includes('48 hour')) return 48;
            if (t.includes('2-3 day')) return 72;
            if (t.includes('3-5 day')) return 120;
            if (t.includes('5-7 day')) return 168;
            return 48;
          };
          const deliveryHours = getDeliveryHours((trackedOrder as any).deliveryTime);
          const orderDate = new Date((trackedOrder as any).createdAt);
          const deliveryDate = new Date(orderDate.getTime() + deliveryHours * 60 * 60 * 1000);
          const now = new Date();
          const timeRemaining = deliveryDate.getTime() - now.getTime();
          const days = Math.max(0, Math.floor(timeRemaining / (1000 * 60 * 60 * 24)));
          const hours = Math.max(0, Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
          const minutes = Math.max(0, Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)));

          return (
            <Card className="glass p-6 mb-8 border-primary/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Timer className="w-6 h-6 text-primary" />
                  Tracking: {(trackedOrder as any).serviceName}
                </h2>
                <Button variant="ghost" size="sm" onClick={() => setTrackingOrderId(null)} className="text-muted-foreground">
                  <EyeOff className="w-4 h-4 mr-1" /> Close
                </Button>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>{(trackedOrder as any).status.charAt(0).toUpperCase() + (trackedOrder as any).status.slice(1)}</span>
                  <span className="font-bold text-primary">{progress}% Complete</span>
                </div>
                <div className="h-3 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-destructive rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left: Timeline + Countdown */}
                <div className="space-y-6">
                  {/* Countdown */}
                  {timeRemaining > 0 && (trackedOrder as any).status !== 'delivered' && (
                    <div className="p-4 bg-neutral-800/50 rounded-xl border border-primary/20">
                      <div className="text-xs text-muted-foreground mb-2">⏱️ Estimated Delivery In:</div>
                      <div className="flex gap-3 justify-center text-center">
                        <div className="bg-neutral-900 rounded-lg p-3 min-w-[55px]">
                          <div className="text-xl font-bold text-primary">{days}</div>
                          <div className="text-xs text-muted-foreground">Days</div>
                        </div>
                        <div className="bg-neutral-900 rounded-lg p-3 min-w-[55px]">
                          <div className="text-xl font-bold text-primary">{hours}</div>
                          <div className="text-xs text-muted-foreground">Hrs</div>
                        </div>
                        <div className="bg-neutral-900 rounded-lg p-3 min-w-[55px]">
                          <div className="text-xl font-bold text-primary">{minutes}</div>
                          <div className="text-xs text-muted-foreground">Min</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Stage Timeline */}
                  <div className="space-y-4">
                    {stages.map((stage, index) => {
                      const isCompleted = index <= currentStageIndex;
                      const isCurrent = index === currentStageIndex;
                      const Icon = stage.icon;
                      return (
                        <div key={stage.name} className={`flex items-center gap-4 ${index < stages.length - 1 ? 'pb-4 border-b border-border/20' : ''}`}>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                            isCompleted
                              ? 'bg-gradient-to-r from-primary to-destructive text-white'
                              : 'bg-neutral-800 text-muted-foreground'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <p className={`font-bold text-sm ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {stage.name}
                              {isCurrent && <span className="ml-2 text-xs text-primary">← Current</span>}
                            </p>
                            <p className="text-xs text-muted-foreground">{stage.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right: Activity Feed + Mini Game */}
                <div className="space-y-6">
                  <div className="glass rounded-xl p-4">
                    <OrderActivityFeed orderId={(trackedOrder as any).id} />
                  </div>
                  {(trackedOrder as any).status !== 'delivered' && (
                    <div className="glass rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Gamepad2 className="w-5 h-5 text-primary" />
                        <span className="text-sm font-bold text-foreground">Play While You Wait</span>
                      </div>
                      <MiniGame />
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })()}
      </div>

      <Dialog open={isSurveyOpen} onOpenChange={setIsSurveyOpen}>
        <DialogContent className="sm:max-w-[425px] glass border-primary/20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Quick Survey 📝</DialogTitle>
            <DialogDescription>
              Help us improve SAGE DO! Complete this quick survey to earn 50 tokens instantly.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-3">
              <Label className="text-base">How has your experience been so far?</Label>
              <RadioGroup
                value={surveyData.experience}
                onValueChange={(val) => setSurveyData({ ...surveyData, experience: val })}
                className="grid grid-cols-3 gap-2"
              >
                <div>
                  <RadioGroupItem value="great" id="great" className="peer sr-only" />
                  <Label
                    htmlFor="great"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <span>😍</span>
                    <span className="text-xs mt-1">Great!</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="okay" id="okay" className="peer sr-only" />
                  <Label
                    htmlFor="okay"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <span>🙂</span>
                    <span className="text-xs mt-1">Okay</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="bad" id="bad" className="peer sr-only" />
                  <Label
                    htmlFor="bad"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <span>😩</span>
                    <span className="text-xs mt-1">Bad</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="feedback">What feature should we add next?</Label>
              <Textarea
                id="feedback"
                placeholder="I wish SAGE DO could..."
                value={surveyData.feedback}
                onChange={(e) => setSurveyData({ ...surveyData, feedback: e.target.value })}
                className="glass"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                if (!surveyData.experience) {
                  toast({ title: "Please rate your experience first!", variant: "destructive" });
                  return;
                }
                handleEarnTokens(50, "survey", "Survey completion");
                setIsSurveyOpen(false);
                setSurveyData({ experience: "", feedback: "" }); // Reset
              }}
              disabled={earnTokensMutation.isPending}
              className="w-full bg-gradient-to-r from-primary to-purple-600"
            >
              Submit & Earn 50 Tokens 💰
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
