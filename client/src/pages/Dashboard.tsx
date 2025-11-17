import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { User, Order } from "@shared/schema";
import { Coins, Gift, TrendingUp, FileText, Download } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";

export default function Dashboard() {
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: userDetails } = useQuery<User>({
    queryKey: ["/api/dashboard/user"],
    enabled: isAuthenticated,
  });

  const { data: orders = [] } = useQuery<Order[]>({
    queryKey: ["/api/dashboard/orders"],
    enabled: isAuthenticated,
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
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
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
          <a href="/api/logout">
            <Button variant="outline" data-testid="button-logout" className="glass hover-elevate">
              Logout
            </Button>
          </a>
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
              <div className="p-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600">
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
              <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600">+50</Badge>
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
        <Card className="glass p-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">Order History</h2>
          {orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Order ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Service</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-border/50 hover-elevate">
                      <td className="py-3 px-4 text-sm text-muted-foreground font-mono">{order.id.slice(0, 8)}...</td>
                      <td className="py-3 px-4 text-sm text-foreground">{order.serviceName}</td>
                      <td className="py-3 px-4 text-sm">
                        <Badge variant={order.status === "delivered" ? "default" : "secondary"}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {new Date(order.createdAt!).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No orders yet. Place your first order to get started!</p>
            </div>
          )}
        </Card>

        {/* Offline AI Tools */}
        <Card className="glass p-6 mt-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Offline AI Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button variant="outline" className="glass p-6 h-auto flex-col items-start hover-elevate">
              <FileText className="w-8 h-8 mb-3 text-primary" />
              <p className="text-lg font-bold text-foreground mb-1">Text Generator</p>
              <p className="text-sm text-muted-foreground">Generate content offline</p>
            </Button>

            <Button variant="outline" className="glass p-6 h-auto flex-col items-start hover-elevate">
              <Download className="w-8 h-8 mb-3 text-primary" />
              <p className="text-lg font-bold text-foreground mb-1">PDF Export</p>
              <p className="text-sm text-muted-foreground">Export orders as PDF</p>
            </Button>

            <Button variant="outline" className="glass p-6 h-auto flex-col items-start hover-elevate">
              <TrendingUp className="w-8 h-8 mb-3 text-primary" />
              <p className="text-lg font-bold text-foreground mb-1">Analytics</p>
              <p className="text-sm text-muted-foreground">View usage stats</p>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
