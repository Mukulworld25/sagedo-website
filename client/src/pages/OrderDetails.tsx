import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Link, useParams, useLocation } from "wouter";
import {
    ArrowLeft,
    User,
    Mail,
    Package,
    Clock,
    FileText,
    Download,
    CheckCircle2,
    Loader2,
    CreditCard,
    Calendar,
    MessageSquare,
    Upload,
    Inbox
} from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface OrderDetails {
    id: string;
    userId: string;
    serviceName: string;
    customerEmail: string;
    customerName: string;
    requirements: string;
    fileUrls: string[] | null;
    status: string;
    amountPaid: number;
    paymentId: string;
    paymentStatus: string;
    deliveryPreference: 'platform' | 'email';
    deliveryFileUrls: string[] | null;
    deliveryNotes: string | null;
    createdAt: string;
    updatedAt: string;
    deliveredAt: string | null;
    customer: {
        id: string;
        name: string;
        email: string;
        tokenBalance: number;
        hasGoldenTicket: boolean;
    } | null;
}

export default function OrderDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const { isAuthenticated, user } = useAuth();
    const [, navigate] = useLocation();
    const { toast } = useToast();
    const [deliveryNotes, setDeliveryNotes] = useState("");
    const [deliveryFiles, setDeliveryFiles] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const API_URL = ''; // Use relative URL - Vercel proxy forwards to Render

    // Fetch order details
    const { data: order, isLoading, error } = useQuery<OrderDetails>({
        queryKey: ['admin', 'order', id],
        queryFn: async () => {
            const res = await fetch(`${API_URL}/api/admin/orders/${id}`, {
                credentials: 'include'
            });
            if (!res.ok) throw new Error('Failed to fetch order');
            return res.json();
        },
        enabled: !!id && isAuthenticated && user?.isAdmin,
    });

    // Update order status mutation
    const updateStatusMutation = useMutation({
        mutationFn: async ({ status, notes }: { status: string; notes?: string }) => {
            const res = await fetch(`${API_URL}/api/admin/orders/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ status, deliveryNotes: notes })
            });
            if (!res.ok) throw new Error('Failed to update order');
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'order', id] });
            queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] });
            toast({
                title: "Order Updated",
                description: "Order status has been updated successfully.",
            });
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to update order status.",
                variant: "destructive",
            });
        }
    });

    // Check auth
    if (!isAuthenticated || !user?.isAdmin) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center">
                <Card className="glass p-8 text-center">
                    <p className="text-xl text-foreground mb-4">Access Denied</p>
                    <Link href="/login">
                        <Button>Login as Admin</Button>
                    </Link>
                </Card>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center">
                <Card className="glass p-8 text-center">
                    <p className="text-xl text-foreground mb-4">Order not found</p>
                    <Link href="/admin">
                        <Button>Back to Dashboard</Button>
                    </Link>
                </Card>
            </div>
        );
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-500';
            case 'processing': return 'bg-neutral-500';
            case 'finalizing': return 'bg-purple-500';
            case 'delivered': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    };

    const getNextStatus = (currentStatus: string) => {
        const statusFlow = ['pending', 'processing', 'finalizing', 'delivered'];
        const currentIndex = statusFlow.indexOf(currentStatus);
        return currentIndex < statusFlow.length - 1 ? statusFlow[currentIndex + 1] : null;
    };

    const handleUpdateStatus = (newStatus: string) => {
        updateStatusMutation.mutate({
            status: newStatus,
            notes: newStatus === 'delivered' ? deliveryNotes : undefined
        });
    };

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <Link href="/admin">
                    <Button variant="ghost" className="mb-6">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Dashboard
                    </Button>
                </Link>

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-foreground">Order Details</h1>
                        <p className="text-muted-foreground">Order ID: {order.id.slice(0, 8)}...</p>
                    </div>
                    <Badge className={`${getStatusColor(order.status)} text-white px-4 py-2`}>
                        {order.status.toUpperCase()}
                    </Badge>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Order Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Service Info */}
                        <Card className="glass p-6">
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Package className="w-5 h-5 text-primary" />
                                Service Details
                            </h2>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Service</span>
                                    <span className="font-medium text-foreground">{order.serviceName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Amount</span>
                                    <span className="font-bold text-primary">₹{order.amountPaid}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Payment Status</span>
                                    <Badge variant={order.paymentStatus === 'paid' ? 'default' : 'secondary'}>
                                        {order.paymentStatus}
                                    </Badge>
                                </div>
                                {order.paymentId && (
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Payment ID</span>
                                        <span className="text-xs font-mono text-foreground">{order.paymentId}</span>
                                    </div>
                                )}
                            </div>
                        </Card>

                        {/* Customer Requirements */}
                        <Card className="glass p-6">
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-primary" />
                                Customer Requirements
                            </h2>
                            <div className="bg-card/50 p-4 rounded-lg border border-border/30">
                                {order.requirements ? (
                                    <p className="text-foreground whitespace-pre-wrap">{order.requirements}</p>
                                ) : (
                                    <p className="text-muted-foreground italic">No requirements provided</p>
                                )}
                            </div>
                        </Card>

                        {/* Uploaded Files */}
                        <Card className="glass p-6">
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Download className="w-5 h-5 text-primary" />
                                Uploaded Files
                            </h2>
                            {order.fileUrls && order.fileUrls.length > 0 ? (
                                <div className="space-y-2">
                                    {order.fileUrls.map((url, index) => (
                                        <a
                                            key={index}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 p-3 bg-card/50 rounded-lg border border-border/30 hover:border-primary/50 transition-colors"
                                        >
                                            <Download className="w-4 h-4 text-primary" />
                                            <span className="text-foreground">File {index + 1}</span>
                                            <span className="text-xs text-muted-foreground ml-auto">Click to download</span>
                                        </a>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground italic">No files uploaded</p>
                            )}
                        </Card>

                        {/* Customer's Delivery Preference */}
                        <Card className="glass p-6 border-2 border-primary/30">
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Inbox className="w-5 h-5 text-primary" />
                                Customer's Delivery Preference
                            </h2>
                            <div className={`p-4 rounded-lg flex items-center gap-3 ${order.deliveryPreference === 'email'
                                    ? 'bg-blue-500/10 border border-blue-500/30'
                                    : 'bg-green-500/10 border border-green-500/30'
                                }`}>
                                {order.deliveryPreference === 'email' ? (
                                    <>
                                        <Mail className="w-5 h-5 text-blue-500" />
                                        <div>
                                            <p className="font-medium text-foreground">Email Delivery</p>
                                            <p className="text-xs text-muted-foreground">Customer wants delivery via email</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <Package className="w-5 h-5 text-green-500" />
                                        <div>
                                            <p className="font-medium text-foreground">Platform Delivery</p>
                                            <p className="text-xs text-muted-foreground">Customer will download from dashboard</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </Card>

                        {/* Deliver Files - Admin Upload */}
                        <Card className="glass p-6 border-2 border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-orange-500/5">
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Upload className="w-5 h-5 text-amber-500" />
                                Deliver Files
                            </h2>

                            {/* Already delivered files */}
                            {order.deliveryFileUrls && order.deliveryFileUrls.length > 0 && (
                                <div className="mb-4 space-y-2">
                                    <p className="text-sm text-green-500 font-medium">✓ Delivered Files:</p>
                                    {order.deliveryFileUrls.map((url, index) => (
                                        <a
                                            key={index}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 p-2 bg-green-500/10 rounded-lg text-sm"
                                        >
                                            <Download className="w-4 h-4 text-green-500" />
                                            <span>Delivery File {index + 1}</span>
                                        </a>
                                    ))}
                                </div>
                            )}

                            {/* Upload new files */}
                            {order.status !== 'delivered' && (
                                <div className="space-y-4">
                                    <div className="border-2 border-dashed border-amber-500/30 rounded-lg p-6 text-center hover:border-amber-500/50 transition-colors">
                                        <input
                                            id="deliveryFiles"
                                            type="file"
                                            multiple
                                            onChange={(e) => setDeliveryFiles(Array.from(e.target.files || []))}
                                            className="hidden"
                                        />
                                        <label htmlFor="deliveryFiles" className="cursor-pointer flex flex-col items-center gap-2">
                                            <Upload className="w-8 h-8 text-amber-500" />
                                            <p className="text-foreground font-medium">Upload Delivery Files</p>
                                            <p className="text-xs text-muted-foreground">PDF, DOC, ZIP, Images</p>
                                        </label>
                                    </div>

                                    {deliveryFiles.length > 0 && (
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium text-foreground">Selected: {deliveryFiles.length} file(s)</p>
                                            {deliveryFiles.map((file, i) => (
                                                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                    {file.name}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <p className="text-xs text-muted-foreground">
                                        Files will be {order.deliveryPreference === 'email' ? 'emailed to customer' : 'available in customer dashboard'}
                                    </p>
                                </div>
                            )}
                        </Card>

                        {/* Status Update */}
                        <Card className="glass p-6">
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-primary" />
                                Update Status
                            </h2>

                            {/* Status Flow */}
                            <div className="flex items-center justify-between mb-6">
                                {['pending', 'processing', 'finalizing', 'delivered'].map((status, index) => (
                                    <div key={status} className="flex items-center">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${order.status === status
                                            ? getStatusColor(status) + ' text-white'
                                            : ['pending', 'processing', 'finalizing', 'delivered'].indexOf(order.status) > index
                                                ? 'bg-green-500 text-white'
                                                : 'bg-muted text-muted-foreground'
                                            }`}>
                                            {index + 1}
                                        </div>
                                        {index < 3 && (
                                            <div className={`w-12 h-1 ${['pending', 'processing', 'finalizing', 'delivered'].indexOf(order.status) > index
                                                ? 'bg-green-500'
                                                : 'bg-muted'
                                                }`} />
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Delivery Notes (for marking as delivered) */}
                            {order.status !== 'delivered' && (
                                <>
                                    <div className="space-y-2 mb-4">
                                        <Label htmlFor="deliveryNotes">Delivery Notes (optional)</Label>
                                        <Textarea
                                            id="deliveryNotes"
                                            value={deliveryNotes}
                                            onChange={(e) => setDeliveryNotes(e.target.value)}
                                            placeholder="Add notes for the customer..."
                                            className="glass"
                                        />
                                    </div>

                                    {getNextStatus(order.status) && (
                                        <Button
                                            onClick={() => handleUpdateStatus(getNextStatus(order.status)!)}
                                            disabled={updateStatusMutation.isPending}
                                            className="w-full bg-gradient-to-r from-primary to-destructive"
                                        >
                                            {updateStatusMutation.isPending ? (
                                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                            ) : null}
                                            Mark as {getNextStatus(order.status)?.toUpperCase()}
                                        </Button>
                                    )}
                                </>
                            )}

                            {order.status === 'delivered' && order.deliveryNotes && (
                                <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
                                    <p className="text-sm font-medium text-green-500 mb-1">Delivery Notes:</p>
                                    <p className="text-foreground">{order.deliveryNotes}</p>
                                </div>
                            )}
                        </Card>
                    </div>

                    {/* Right Column - Customer Info & Timeline */}
                    <div className="space-y-6">
                        {/* Customer Info */}
                        <Card className="glass p-6">
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <User className="w-5 h-5 text-primary" />
                                Customer
                            </h2>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-foreground">{order.customerName || order.customer?.name || 'N/A'}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-muted-foreground" />
                                    <a
                                        href={`mailto:${order.customerEmail}`}
                                        className="text-primary hover:underline"
                                    >
                                        {order.customerEmail}
                                    </a>
                                </div>
                                {order.customer?.hasGoldenTicket && (
                                    <Badge className="bg-yellow-500 text-white">
                                        Golden Ticket Holder
                                    </Badge>
                                )}
                            </div>
                        </Card>

                        {/* Timeline */}
                        <Card className="glass p-6">
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-primary" />
                                Timeline
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Order Created</p>
                                        <p className="text-foreground">{new Date(order.createdAt).toLocaleString()}</p>
                                    </div>
                                </div>
                                {order.deliveredAt && (
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Delivered</p>
                                            <p className="text-foreground">{new Date(order.deliveredAt).toLocaleString()}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Card>

                        {/* Quick Actions */}
                        <Card className="glass p-6">
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-primary" />
                                Quick Actions
                            </h2>
                            <div className="space-y-2">
                                <a
                                    href={`mailto:${order.customerEmail}?subject=Regarding your SAGEDO order ${order.id.slice(0, 8)}`}
                                    className="block"
                                >
                                    <Button variant="outline" className="w-full">
                                        <Mail className="w-4 h-4 mr-2" />
                                        Email Customer
                                    </Button>
                                </a>
                                <a
                                    href={`https://wa.me/?text=Hi, regarding your SAGEDO order ${order.id.slice(0, 8)}...`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                >
                                    <Button variant="outline" className="w-full">
                                        <MessageSquare className="w-4 h-4 mr-2" />
                                        WhatsApp
                                    </Button>
                                </a>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
