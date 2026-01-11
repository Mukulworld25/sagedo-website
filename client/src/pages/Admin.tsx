import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState, useMemo } from "react";
import { Link } from "wouter";
import { Order, Feedback } from "@shared/schema";
import {
  RefreshCw, CheckCircle2, Clock, Package, Truck, MessageSquare,
  Star, Eye, Plus, ImageIcon, ThumbsUp, ChevronDown, ChevronUp,
  Download, MoreHorizontal, DollarSign, Users, TrendingUp, Phone
} from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

// Extended Order type to include joined fields from backend
interface AdminOrder extends Order {
  customerMobile?: string;
  customerName?: string;
}

export default function Admin() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  // 1. FETCH DATA
  const { data: orders = [], isLoading: ordersLoading } = useQuery<AdminOrder[]>({
    queryKey: ["/api/admin/orders"],
    enabled: isAuthenticated && user?.isAdmin === true,
  });

  const { data: stats } = useQuery<any>({
    queryKey: ["/api/admin/stats"],
    enabled: isAuthenticated && user?.isAdmin === true,
  });

  const { data: feedbacks = [] } = useQuery<Feedback[]>({
    queryKey: ["/api/admin/feedback"],
    enabled: isAuthenticated && user?.isAdmin === true,
  });

  // 2. MUTATIONS
  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      await apiRequest("PATCH", `/api/admin/orders/${orderId}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/orders"] });
      toast({ title: "Status Updated", description: "Order status updated successfully." });
    },
    onError: (error: Error) => {
      toast({ title: "Update Failed", description: error.message, variant: "destructive" });
    },
  });

  // 3. DERIVED STATS (Revenue)
  const revenue = useMemo(() => {
    return orders.reduce((total, order) => total + (order.amountPaid || 0), 0);
  }, [orders]);

  const filteredOrders = useMemo(() => {
    if (!searchTerm) return orders;
    return orders.filter(o =>
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [orders, searchTerm]);

  // 4. HELPERS
  const openWhatsApp = (mobile: string | undefined, orderId: string) => {
    if (!mobile) {
      toast({ title: "No Mobile Number", description: "This user hasn't provided a mobile number.", variant: "destructive" });
      return;
    }
    // Clean number (remove spaces, ensure +91)
    let phone = mobile.replace(/\s+/g, '');
    if (!phone.startsWith('+')) phone = '+91' + phone;

    const text = `Hello! This is regarding your SageDo order #${orderId.slice(0, 8)}. We have an update for you.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const API_URL = ''; // Relative path

  // Portfolio Mutations (Kept from original)
  const [portfolioTitle, setPortfolioTitle] = useState("");
  const [portfolioDescription, setPortfolioDescription] = useState("");
  const [portfolioImageUrl, setPortfolioImageUrl] = useState("");

  const postPortfolioMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_URL}/api/admin/gallery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title: portfolioTitle,
          description: portfolioDescription,
          imageUrl: portfolioImageUrl || null,
          type: 'work_showcase',
        }),
      });
      if (!response.ok) throw new Error('Failed to post');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      setPortfolioTitle(""); setPortfolioDescription(""); setPortfolioImageUrl("");
      toast({ title: "Portfolio Updated!", description: "Work added to portfolio." });
    },
  });

  // AUTH CHECK
  useEffect(() => {
    if (!authLoading && (!isAuthenticated || !user?.isAdmin)) {
      window.location.href = "/login";
    }
  }, [authLoading, isAuthenticated, user]);

  if (authLoading || !isAuthenticated || !user?.isAdmin) return null;

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    processing: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    finalizing: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    delivered: "bg-green-500/10 text-green-500 border-green-500/20",
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* HEADER */}
      <div className="bg-card border-b pt-24 pb-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Command Center</h1>
            <p className="text-muted-foreground">Manage orders, users, and content from one place.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => queryClient.invalidateQueries()}>
              <RefreshCw className="w-4 h-4 mr-2" /> Refresh
            </Button>
            <Button onClick={() => window.open('/pay', '_blank')}>
              <DollarSign className="w-4 h-4 mr-2" /> Payment Link
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{revenue.toLocaleString('en-IN')}</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.filter(o => o.status !== 'delivered').length}</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalUsers || 0}</div>
              <p className="text-xs text-muted-foreground">+{stats?.todaySignups || 0} today</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Site Visitors</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalVisitors || 0}</div>
              <p className="text-xs text-muted-foreground">Live tracking active</p>
            </CardContent>
          </Card>
        </div>

        {/* CHARTS & INSIGHTS ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* 1. REVENUE TRENDS (Last 7 Days) */}
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" /> Revenue Trends (Last 7 Days)
              </CardTitle>
              <CardDescription>Daily income from orders.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48 flex items-end justify-between gap-2 pt-4">
                {(() => {
                  const last7Days = [...Array(7)].map((_, i) => {
                    const d = new Date();
                    d.setDate(d.getDate() - (6 - i));
                    const dateStr = d.toLocaleDateString();
                    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
                    return { dateStr, dayName, amount: 0 };
                  });

                  orders.forEach(o => {
                    if (o.createdAt && o.amountPaid) {
                      const oDate = new Date(o.createdAt).toLocaleDateString();
                      const day = last7Days.find(d => d.dateStr === oDate);
                      if (day) day.amount += o.amountPaid;
                    }
                  });

                  const maxVal = Math.max(...last7Days.map(d => d.amount), 100);

                  return last7Days.map((d, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
                      <div
                        className="w-full bg-primary/20 hover:bg-primary/40 rounded-t-md transition-all relative group"
                        style={{ height: `${(d.amount / maxVal) * 100}%` }}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity shadow-sm whitespace-nowrap">
                          ₹{d.amount}
                        </div>
                      </div>
                      <span className="text-[10px] text-muted-foreground uppercase">{d.dayName}</span>
                    </div>
                  ));
                })()}
              </div>
            </CardContent>
          </Card>

          {/* 2. TOP SERVICES */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" /> Top Services
              </CardTitle>
              <CardDescription>Best selling services by order count.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(() => {
                  const serviceCounts: Record<string, number> = {};
                  orders.forEach(o => {
                    serviceCounts[o.serviceName] = (serviceCounts[o.serviceName] || 0) + 1;
                  });
                  const sorted = Object.entries(serviceCounts)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 5);

                  if (sorted.length === 0) return <p className="text-sm text-muted-foreground">No sales yet.</p>;

                  return sorted.map(([name, count], i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2 truncate">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-muted text-muted-foreground'}`}>
                          {i + 1}
                        </div>
                        <span className="text-sm truncate max-w-[150px]" title={name}>{name}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {count} sold
                      </Badge>
                    </div>
                  ));
                })()}
              </div>
            </CardContent>
          </Card>
        </div>
        {/* MAIN INTERFACE */}
        <Tabs defaultValue="orders" className="space-y-4">
          <TabsList>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="visitors">Live Traffic</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4">
            <div className="flex items-center justify-between">
              <Input
                placeholder="Search orders..."
                className="max-w-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="text-sm text-muted-foreground">
                Showing {filteredOrders.length} orders
              </div>
            </div>

            <Card>
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm text-left">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Order ID</th>
                      <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Customer</th>
                      <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Service</th>
                      <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Status</th>
                      <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Paid</th>
                      <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 font-mono">{order.id.slice(0, 8)}</td>
                        <td className="p-4">
                          <div className="font-medium">{order.customerName || "Guest"}</div>
                          <div className="text-xs text-muted-foreground">{order.customerEmail}</div>
                          {order.customerMobile && (
                            <div className="text-xs text-green-600 flex items-center mt-1">
                              <Phone className="w-3 h-3 mr-1" /> {order.customerMobile}
                            </div>
                          )}
                        </td>
                        <td className="p-4">{order.serviceName}</td>
                        <td className="p-4">
                          <Badge className={statusColors[order.status] || "bg-secondary"}>
                            {order.status}
                          </Badge>
                        </td>
                        <td className="p-4 font-medium">
                          {order.amountPaid ? `₹${order.amountPaid}` : 'Free'}
                        </td>
                        <td className="p-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/orders/${order.id}`}>View Details</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(order.id)}>
                                Copy Order ID
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => updateStatusMutation.mutate({ orderId: order.id, status: 'processing' })}>
                                Mark Processing
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => updateStatusMutation.mutate({ orderId: order.id, status: 'delivered' })}>
                                Mark Delivered
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onSelect={() => openWhatsApp(order.customerMobile, order.id)}>
                                <MessageSquare className="w-4 h-4 mr-2" /> WhatsApp User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Recent Signups</CardTitle>
                <CardDescription>Latest users joined the platform.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats?.recentSignups?.map((u: any) => (
                    <div key={u.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">{u.name || "No Name"}</p>
                        <p className="text-sm text-muted-foreground">{u.email}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                  {(!stats?.recentSignups || stats.recentSignups.length === 0) && (
                    <p className="text-muted-foreground">No users found.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>



          <TabsContent value="visitors">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-500" /> Live Traffic Log
                </CardTitle>
                <CardDescription>Real-time visitor tracking (Last 20).</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-0">
                  <div className="grid grid-cols-12 gap-4 text-xs font-bold text-muted-foreground border-b pb-2 mb-2 px-2">
                    <div className="col-span-3">Time</div>
                    <div className="col-span-6">Page / Path</div>
                    <div className="col-span-3">Device</div>
                  </div>
                  {stats?.recentVisitors?.map((v: any, i: number) => (
                    <div key={i} className="grid grid-cols-12 gap-4 text-sm items-center py-2 px-2 hover:bg-muted/50 rounded transition-colors border-b border-border/40">
                      <div className="col-span-3 text-muted-foreground">
                        {new Date(v.visitedAt).toLocaleTimeString()}
                      </div>
                      <div className="col-span-6 font-mono text-xs truncate text-blue-600 dark:text-blue-400">
                        {v.path}
                      </div>
                      <div className="col-span-3 text-xs text-muted-foreground truncate" title={v.userAgent}>
                        {v.userAgent.includes('Mobile') ? '📱 Mobile' : '💻 Desktop'}
                      </div>
                    </div>
                  ))}
                  {(!stats?.recentVisitors || stats.recentVisitors.length === 0) && (
                    <div className="text-center py-8 text-muted-foreground">No traffic recorded yet.</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback">
            <Card>
              <CardHeader>
                <CardTitle>User Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feedbacks.map((f) => (
                    <div key={f.id} className="border p-4 rounded-md">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < (f.rating || 0) ? "text-yellow-500 fill-current" : "text-muted-foreground"}`} />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">{new Date(f.createdAt!).toLocaleDateString()}</span>
                      </div>
                      <p>{f.message}</p>
                    </div>
                  ))}
                  {feedbacks.length === 0 && <p className="text-muted-foreground">No feedback yet.</p>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio">
            <Card>
              <CardHeader>
                <CardTitle>Add to Portfolio</CardTitle>
                <CardDescription>Showcase your work on the landing page.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label>Title</Label>
                  <Input value={portfolioTitle} onChange={e => setPortfolioTitle(e.target.value)} placeholder="Project Name" />
                </div>
                <div className="grid gap-2">
                  <Label>Description</Label>
                  <Textarea value={portfolioDescription} onChange={e => setPortfolioDescription(e.target.value)} placeholder="What did you do?" />
                </div>
                <div className="grid gap-2">
                  <Label>Image URL</Label>
                  <Input value={portfolioImageUrl} onChange={e => setPortfolioImageUrl(e.target.value)} placeholder="https://..." />
                </div>
                <Button onClick={() => postPortfolioMutation.mutate()} disabled={postPortfolioMutation.isPending}>
                  {postPortfolioMutation.isPending ? "Posting..." : "Add to Showcase"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div >
  );
}
