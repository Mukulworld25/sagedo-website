import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { Order } from "@shared/schema";
import { RefreshCw, CheckCircle2, Clock, Package, Truck } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Admin() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();

  // Check if user is admin - redirect if not
  useEffect(() => {
    if (!authLoading && (!isAuthenticated || !user?.isAdmin)) {
      window.location.href = "/";
    }
  }, [authLoading, isAuthenticated, user]);

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

  const { data: orders = [], isLoading } = useQuery<Order[]>({
    queryKey: ["/api/admin/orders"],
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

  const stats = {
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

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glass p-6 bg-gradient-to-br from-blue-600/20 to-blue-700/20">
            <p className="text-sm text-blue-100 mb-1">Total Orders</p>
            <p className="text-4xl font-black text-foreground" data-testid="stat-total">
              {stats.total}
            </p>
          </Card>

          <Card className="glass p-6 bg-gradient-to-br from-yellow-600/20 to-yellow-700/20">
            <p className="text-sm text-yellow-100 mb-1">Needs Action</p>
            <p className="text-4xl font-black text-foreground" data-testid="stat-pending">
              {stats.pending}
            </p>
          </Card>

          <Card className="glass p-6 bg-gradient-to-br from-purple-600/20 to-purple-700/20">
            <p className="text-sm text-purple-100 mb-1">In Progress</p>
            <p className="text-4xl font-black text-foreground" data-testid="stat-processing">
              {stats.processing}
            </p>
          </Card>

          <Card className="glass p-6 bg-gradient-to-br from-green-600/20 to-green-700/20">
            <p className="text-sm text-green-100 mb-1">Delivered</p>
            <p className="text-4xl font-black text-foreground" data-testid="stat-delivered">
              {stats.delivered}
            </p>
          </Card>
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
