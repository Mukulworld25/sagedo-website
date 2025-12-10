import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { Order, Feedback } from "@shared/schema";
import { RefreshCw, CheckCircle2, Clock, Package, Truck, MessageSquare, Star } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Admin() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();

  // ALL HOOKS MUST BE CALLED BEFORE ANY CONDITIONAL RETURNS
  const { data: orders = [], isLoading } = useQuery<Order[]>({
    queryKey: ["/api/admin/orders"],
    enabled: isAuthenticated && user?.isAdmin === true,
  });

  const { data: stats } = useQuery({
    queryKey: ["/api/admin/stats"],
    enabled: isAuthenticated && user?.isAdmin === true,
  });

  const { data: feedbacks = [] } = useQuery<Feedback[]>({
    queryKey: ["/api/admin/feedback"],
    enabled: isAuthenticated && user?.isAdmin === true,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      await apiRequest("PATCH", `/api/admin/orders/${orderId}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/orders"] });
      toast({
        title: "Status Updated",
        description: "Order status has been successfully updated.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Check if user is admin - redirect if not
  useEffect(() => {
    if (!authLoading && (!isAuthenticated || !user?.isAdmin)) {
      window.location.href = "/login";
    }
  }, [authLoading, isAuthenticated, user]);

  // NOW we can have conditional returns (after all hooks)
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated || !user?.isAdmin) {
    return null;
  }

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["/api/admin/orders"] });
    toast({
      title: "Refreshed",
      description: "Order list has been refreshed.",
    });
  };

  const handleUpdateStatus = (orderId: string, status: string) => {
    updateStatusMutation.mutate({ orderId, status });
  };

  const orderStats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
  };

  const statusIcons = {
    pending: Clock,
    processing: Package,
    finalizing: Truck,
    delivered: CheckCircle2,
  };

  const statusColors = {
    pending: "bg-yellow-600",
    processing: "bg-blue-600",
    finalizing: "bg-purple-600",
    delivered: "bg-green-600",
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary to-destructive bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <Button
            onClick={handleRefresh}
            variant="outline"
            data-testid="button-refresh"
            className="glass hover-elevate"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>

        {/* Analytics Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glass p-6 bg-gradient-to-br from-indigo-600/20 to-indigo-700/20">
            <p className="text-sm text-indigo-100 mb-1">Total Logins</p>
            <p className="text-4xl font-black text-foreground">
              {stats?.totalLogins || 0}
            </p>
          </Card>

          <Card className="glass p-6 bg-gradient-to-br from-pink-600/20 to-pink-700/20">
            <p className="text-sm text-pink-100 mb-1">Total Visitors</p>
            <p className="text-4xl font-black text-foreground">
              {stats?.totalVisitors || 0}
            </p>
          </Card>

          <Card className="glass p-6 bg-gradient-to-br from-blue-600/20 to-blue-700/20">
            <p className="text-sm text-blue-100 mb-1">Total Orders</p>
            <p className="text-4xl font-black text-foreground" data-testid="stat-total">
              {orderStats.total}
            </p>
          </Card>

          <Card className="glass p-6 bg-gradient-to-br from-yellow-600/20 to-yellow-700/20">
            <p className="text-sm text-yellow-100 mb-1">Pending Orders</p>
            <p className="text-4xl font-black text-foreground" data-testid="stat-pending">
              {orderStats.pending}
            </p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Most Clicked Services */}
          <Card className="glass p-6">
            <h2 className="text-xl font-bold mb-4">Most Clicked Services</h2>
            <div className="space-y-4">
              {stats?.mostClickedServices?.map((service: any) => (
                <div key={service.id} className="flex items-center justify-between border-b border-border/50 pb-2">
                  <span className="font-medium">{service.name}</span>
                  <Badge variant="secondary">{service.clickCount} clicks</Badge>
                </div>
              ))}
              {(!stats?.mostClickedServices || stats.mostClickedServices.length === 0) && (
                <p className="text-muted-foreground">No data yet.</p>
              )}
            </div>
          </Card>

          {/* Recent Visitors */}
          <Card className="glass p-6">
            <h2 className="text-xl font-bold mb-4">Recent Visitors</h2>
            <div className="space-y-4">
              {stats?.recentVisitors?.map((visitor: any) => (
                <div key={visitor.id} className="flex items-center justify-between border-b border-border/50 pb-2">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{visitor.path}</span>
                    <span className="text-xs text-muted-foreground">{new Date(visitor.visitedAt).toLocaleString()}</span>
                  </div>
                  <Badge variant="outline" className="text-xs max-w-[150px] truncate" title={visitor.userAgent}>
                    {visitor.userAgent}
                  </Badge>
                </div>
              ))}
              {(!stats?.recentVisitors || stats.recentVisitors.length === 0) && (
                <p className="text-muted-foreground">No visitors yet.</p>
              )}
            </div>
          </Card>
        </div>

        {/* Feedback Section */}
        <Card className="glass p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <MessageSquare className="w-6 h-6" />
            User Feedback
          </h2>
          {feedbacks.length > 0 ? (
            <div className="space-y-4">
              {feedbacks.map((feedback) => (
                <div key={feedback.id} className="border-b border-border/50 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < (feedback.rating || 0) ? "text-yellow-500 fill-current" : "text-muted-foreground"
                              }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(feedback.createdAt!).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <p className="text-foreground">{feedback.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No feedback received yet.</p>
          )}
        </Card>

        <h2 className="text-2xl font-bold mb-4">Order Management</h2>
        {/* Orders Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Reusing existing cards but filtered */}
          {/* Actually I replaced the top stats block, so I don't need to duplicate order stats here, 
               but I should probably keep the detailed order status breakdown if useful. 
               Let's just show the detailed breakdown below or keep it simple. 
               The user wanted "useless information" removed. 
               I'll stick to the top 4 cards I defined above which mix Analytics and Orders.
           */}
        </div>

        {/* Orders Table */}
        <Card className="glass overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center">
              <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto" />
            </div>
          ) : orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-card/50 border-b border-border/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Order ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Service
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    const StatusIcon = statusIcons[order.status as keyof typeof statusIcons] || Clock;
                    return (
                      <tr
                        key={order.id}
                        className="border-b border-border/50 hover-elevate"
                        data-testid={`row-order-${order.id}`}
                      >
                        <td className="px-6 py-4 text-sm font-mono text-muted-foreground">
                          {order.id.slice(0, 8)}...
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm text-foreground font-medium">
                              {order.customerName || "N/A"}
                            </p>
                            <p className="text-xs text-muted-foreground">{order.customerEmail}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground">{order.serviceName}</td>
                        <td className="px-6 py-4">
                          <Badge
                            variant="default"
                            className={`${statusColors[order.status as keyof typeof statusColors]} flex items-center gap-1 w-fit`}
                          >
                            <StatusIcon className="w-3 h-3" />
                            {order.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-2">
                            {order.status !== "delivered" && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    handleUpdateStatus(
                                      order.id,
                                      order.status === "pending"
                                        ? "processing"
                                        : order.status === "processing"
                                          ? "finalizing"
                                          : "delivered"
                                    )
                                  }
                                  disabled={updateStatusMutation.isPending}
                                  data-testid={`button-update-${order.id}`}
                                  className="glass hover-elevate"
                                >
                                  Next Stage
                                </Button>
                              </>
                            )}
                            {order.status === "delivered" && (
                              <Badge variant="secondary" className="text-xs">
                                Completed
                              </Badge>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-xl text-muted-foreground">No orders yet.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
