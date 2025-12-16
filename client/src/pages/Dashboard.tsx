import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { User, Order } from "@shared/schema";
import { Coins, Gift, TrendingUp, FileText, Download, Trash2, AlertTriangle } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function Dashboard() {
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading } = useAuth();

  const [, setLocation] = useLocation();

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

  const { data: orders = [] } = useQuery<Order[]>({
    queryKey: ["/api/dashboard/orders"],
    enabled: isAuthenticated,
    staleTime: 0,
    refetchOnMount: 'always',
  });

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
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleEarnTokens = (amount: number, type: string, description: string) => {
    earnTokensMutation.mutate({ amount, type, description });
  };

  // Delete Account feature
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL || 'https://sagedo-website.onrender.com';

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

  const tokenBalance = userDetails?.tokenBalance || 0;
  const hasGoldenTicket = userDetails?.hasGoldenTicket || false;

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-2">
              Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
              Welcome back, {userDetails?.firstName || user?.email}!
            </p>
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
                <p className="text-sm text-muted-foreground mb-1">Golden Ticket</p>
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
              <h2 className="text-2xl font-bold text-foreground">🎫 Golden Ticket Ready!</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              You have 1 Golden Ticket! Use it to get any service from our Bar 1 category absolutely FREE.
            </p>
            <Button
              variant="default"
              data-testid="button-use-golden-ticket"
              className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:opacity-90"
            >
              Use Golden Ticket
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
              onClick={() => handleEarnTokens(100, "referral", "Referral bonus")}
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
              onClick={() => handleEarnTokens(50, "survey", "Survey completion")}
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
      </div>
    </div>
  );
}
