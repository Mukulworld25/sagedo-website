import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    CheckCircle2,
    Clock,
    MessageCircle,
    AlertCircle,
    Loader2
} from "lucide-react";

interface OrderActivity {
    id: string;
    orderId: string;
    type: string;
    title: string;
    message: string | null;
    isRead: boolean;
    createdBy: string;
    createdAt: string;
}

interface OrderActivityFeedProps {
    orderId: string;
    compact?: boolean;
}

export default function OrderActivityFeed({ orderId, compact = false }: OrderActivityFeedProps) {
    const { data: activities = [], isLoading, error } = useQuery<OrderActivity[]>({
        queryKey: [`/api/orders/${orderId}/activities`],
        enabled: !!orderId,
        refetchInterval: 30000, // Refresh every 30 seconds
    });

    const getIcon = (type: string) => {
        switch (type) {
            case 'status_change':
                return <CheckCircle2 className="w-4 h-4 text-green-500" />;
            case 'info_needed':
                return <AlertCircle className="w-4 h-4 text-yellow-500" />;
            case 'admin_message':
                return <MessageCircle className="w-4 h-4 text-blue-500" />;
            case 'customer_reply':
                return <MessageCircle className="w-4 h-4 text-purple-500" />;
            default:
                return <Clock className="w-4 h-4 text-muted-foreground" />;
        }
    };

    const formatTime = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleString('en-IN', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-4">
                <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (error) {
        return (
            <p className="text-sm text-muted-foreground py-2">
                Unable to load activities
            </p>
        );
    }

    if (activities.length === 0) {
        return (
            <p className="text-sm text-muted-foreground py-2">
                No updates yet. Check back soon!
            </p>
        );
    }

    // Reverse to show oldest first (timeline order)
    const sortedActivities = [...activities].reverse();

    return (
        <div className={compact ? "space-y-2" : "space-y-3"}>
            {!compact && (
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    📍 Order Activity
                    {activities.some(a => !a.isRead) && (
                        <Badge variant="destructive" className="text-xs">New</Badge>
                    )}
                </h3>
            )}

            <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-[9px] top-2 bottom-2 w-[2px] bg-border" />

                {sortedActivities.map((activity, index) => (
                    <div
                        key={activity.id}
                        className={`relative flex gap-3 ${compact ? "py-1.5" : "py-2"}`}
                    >
                        {/* Icon */}
                        <div className="relative z-10 flex-shrink-0 w-5 h-5 flex items-center justify-center bg-background">
                            {getIcon(activity.type)}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className={`font-medium ${compact ? "text-sm" : ""}`}>
                                    {activity.title}
                                </span>
                                {!activity.isRead && (
                                    <span className="w-2 h-2 rounded-full bg-primary" />
                                )}
                            </div>

                            {activity.message && !compact && (
                                <p className="text-sm text-muted-foreground mt-1">
                                    {activity.message}
                                </p>
                            )}

                            <p className="text-xs text-muted-foreground mt-0.5">
                                {formatTime(activity.createdAt)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
