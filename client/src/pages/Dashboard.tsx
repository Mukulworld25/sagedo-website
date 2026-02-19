import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { User, Order } from "@shared/schema";
import { Coins, Gift, TrendingUp, FileText, Download, Trash2, AlertTriangle, Camera, User as UserIcon, Settings } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
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
                          <a href={`/track?orderId=${order.id}`}>
                            <Button size="sm" variant="outline" className="text-xs">
                              Track
                            </Button>
                          </a>
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
