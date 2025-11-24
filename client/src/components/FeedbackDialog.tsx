import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";

export function FeedbackDialog() {
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(5);
    const [message, setMessage] = useState("");
    const { toast } = useToast();

    const mutation = useMutation({
        mutationFn: async () => {
            await apiRequest("POST", "/api/feedback", { rating, message });
        },
        onSuccess: () => {
            toast({
                title: "Thank you!",
                description: "Your feedback helps us improve.",
            });
            setOpen(false);
            setMessage("");
            setRating(5);
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to submit feedback. Please try again.",
                variant: "destructive",
            });
        },
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Give Feedback
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] glass">
                <DialogHeader>
                    <DialogTitle>We value your feedback</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex justify-center space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                className={`p-1 transition-colors ${star <= rating ? "text-yellow-500" : "text-muted-foreground"
                                    }`}
                            >
                                <Star className="w-8 h-8 fill-current" />
                            </button>
                        ))}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="message">Your Message</Label>
                        <Textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Tell us what you think..."
                            className="glass"
                        />
                    </div>
                    <Button
                        onClick={() => mutation.mutate()}
                        disabled={mutation.isPending || !message.trim()}
                        className="bg-gradient-to-r from-primary to-destructive"
                    >
                        {mutation.isPending ? "Submitting..." : "Submit Feedback"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
