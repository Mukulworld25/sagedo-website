import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, Circle, Clock, Package, Truck, Home } from "lucide-react";
import { Order } from "@shared/schema";

export default function Tracking() {
  const { toast } = useToast();
  const [orderId, setOrderId] = useState("");
  const [searchedOrderId, setSearchedOrderId] = useState("");

  const { data: order, isLoading } = useQuery<Order>({
    queryKey: ["/api/orders", searchedOrderId],
    enabled: !!searchedOrderId,
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
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            Track Your Order
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Enter your order ID to see the current status.
          </p>
        </div>

        {/* Search Form */}
        <Card className="glass p-8 mb-8">
          <form onSubmit={handleTrack} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="orderId" className="text-foreground">
                Order ID
              </Label>
              <Input
                id="orderId"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter your order ID"
                data-testid="input-order-id"
                className="glass border-border/50"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              data-testid="button-track-order"
              className="w-full bg-gradient-to-r from-primary to-destructive hover:opacity-90"
            >
              {isLoading ? "Tracking..." : "Track Order"}
            </Button>
          </form>
        </Card>

        {/* Order Details */}
        {order && (
          <Card className="glass p-8 mb-8">
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

        {/* Progress Timeline */}
        {order && (
          <Card className="glass p-8">
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
                    className={`relative flex items-start gap-6 ${
                      index < stages.length - 1 ? "pb-8" : ""
                    }`}
                    data-testid={`stage-${stage.name.toLowerCase()}`}
                  >
                    {/* Vertical Line */}
                    {index < stages.length - 1 && (
                      <div
                        className={`absolute left-6 top-12 w-0.5 h-full ${
                          index < currentStageIndex ? "bg-primary" : "bg-border"
                        }`}
                      />
                    )}

                    {/* Icon Circle */}
                    <div
                      className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                        isCompleted
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
                        className={`text-lg font-bold ${
                          isCompleted ? "text-foreground" : "text-muted-foreground"
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
          <Card className="glass p-12 text-center">
            <p className="text-xl text-muted-foreground">
              No order found with ID: <strong>{searchedOrderId}</strong>
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Please check your order ID and try again.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
