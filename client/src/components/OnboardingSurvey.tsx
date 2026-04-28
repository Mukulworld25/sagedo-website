import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function OnboardingSurvey() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");

    // Show onboarding if user exists but hasn't completed it
    useEffect(() => {
        if (!user) return;

        const hasSkipped = sessionStorage.getItem("sagedo_onboarding_skipped");
        if (!user.isOnboardingCompleted && !hasSkipped) {
            const timer = setTimeout(() => setOpen(true), 800);
            return () => clearTimeout(timer);
        } else {
            setOpen(false);
        }
    }, [user]);

    const handleSubmit = async () => {
        if (!name.trim()) {
            toast({ title: "Please enter your name", variant: "destructive" });
            return;
        }

        try {
            setLoading(true);
            await apiRequest("POST", "/api/user/onboarding", {
                profession: "Skipped",
                age: "0",
                gender: "Prefer not to say",
                mobileNumber: "",
                aiProficiency: "Beginner",
                referralSource: "Skipped",
                name: name.trim(),
            });

            await queryClient.invalidateQueries({ queryKey: ["/api/user"] });

            toast({
                title: "Welcome to SAGE DO! 🎉",
                description: "Let's get you started.",
            });
            setOpen(false);
        } catch (error: any) {
            console.error("Onboarding error:", error);
            const message = error.message || "Failed to submit";

            if (message.includes("Onboarding already completed")) {
                setOpen(false);
                toast({ title: "Welcome back!", description: "Profile already set up." });
                queryClient.invalidateQueries({ queryKey: ["/api/user"] });
                return;
            }

            toast({
                title: "Error",
                description: message,
                variant: "destructive"
            });
            setOpen(false);
        } finally {
            setLoading(false);
        }
    };

    const handleSkip = () => {
        sessionStorage.setItem("sagedo_onboarding_skipped", "true");
        setOpen(false);
    };

    if (!open) return null;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[380px] bg-background border-primary/20">
                <DialogHeader>
                    <div className="mx-auto bg-primary/10 p-3 rounded-full mb-2">
                        <Sparkles className="w-8 h-8 text-primary" />
                    </div>
                    <DialogTitle className="text-center text-2xl">Welcome to SAGE DO!</DialogTitle>
                    <DialogDescription className="text-center pt-2">
                        What should we call you?
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    <div className="space-y-2">
                        <Label>Your Name</Label>
                        <Input
                            placeholder="e.g. Mukul"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                            autoFocus
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <Button onClick={handleSubmit} disabled={loading} className="w-full gap-2">
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                        Let's Go!
                    </Button>

                    <Button variant="ghost" onClick={handleSkip} disabled={loading} className="w-full text-muted-foreground">
                        Skip
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
