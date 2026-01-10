import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, Coins } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function OnboardingSurvey() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form State
    const [profession, setProfession] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [mobile, setMobile] = useState("");
    const [aiProficiency, setAiProficiency] = useState("Beginner");

    // Show survey if user exists but hasn't completed onboarding and hasn't skipped it in this session
    useEffect(() => {
        if (!user) return;

        const hasSkipped = sessionStorage.getItem("sagedo_onboarding_skipped");
        if (!user.isOnboardingCompleted && !hasSkipped) {
            // Small delay for better UX
            const timer = setTimeout(() => setOpen(true), 1000);
            return () => clearTimeout(timer);
        }
    }, [user]);

    const handleSubmit = async () => {
        if (!profession || !age || !gender) {
            toast({ title: "Please fill in required fields", variant: "destructive" });
            return;
        }

        try {
            setLoading(true);
            await apiRequest("POST", "/api/user/onboarding", {
                profession,
                age,
                gender,
                mobileNumber: mobile,
                aiProficiency
            });

            // Refetch user to updated token balance and status
            await queryClient.invalidateQueries({ queryKey: ["/api/user"] });

            toast({
                title: "Survey Completed! 🎉",
                description: "You've earned your rewards!",
            });
            setOpen(false);
        } catch (error: any) {
            console.error("Survey submission error:", error);
            const message = error.message || "Failed to submit survey";
            toast({
                title: "Submission Error",
                description: message,
                variant: "destructive"
            });
            setOpen(false);
        } finally {
            setLoading(false);
        }
    };

    const handleSkip = () => {
        // Mark as skipped for this session only
        sessionStorage.setItem("sagedo_onboarding_skipped", "true");
        setOpen(false);
    };

    // Original logic restored
    if (!open) return null;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px] bg-background border-primary/20">
                <DialogHeader>
                    <div className="mx-auto bg-primary/10 p-3 rounded-full mb-2">
                        <Sparkles className="w-8 h-8 text-primary" />
                    </div>
                    <DialogTitle className="text-center text-2xl">Welcome to SAGE DO!</DialogTitle>
                    <DialogDescription className="text-center pt-2">
                        Tell us a bit about yourself to personalize your experience.
                        <div className="flex items-center justify-center gap-2 mt-2 text-primary font-bold">
                            <Coins className="w-4 h-4" />
                            <span>Earn 50 Tokens per answer! (Max 250)</span>
                        </div>
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Profession</Label>
                            <Select onValueChange={setProfession}>
                                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Student">Student</SelectItem>
                                    <SelectItem value="Professional">Professional</SelectItem>
                                    <SelectItem value="Business Owner">Business Owner</SelectItem>
                                    <SelectItem value="Freelancer">Freelancer</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Gender</Label>
                            <Select onValueChange={setGender}>
                                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">Female</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                    <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Age</Label>
                            <Input type="number" placeholder="25" value={age} onChange={(e) => setAge(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label>Mobile (Optional)</Label>
                            <Input placeholder="+91..." value={mobile} onChange={(e) => setMobile(e.target.value)} />
                        </div>
                    </div>

                    <div className="space-y-4 pt-2">
                        <Label>AI Proficiency: {aiProficiency}</Label>
                        <Slider
                            defaultValue={[33]}
                            max={100}
                            step={33}
                            className="w-full"
                            onValueChange={(vals) => {
                                const v = vals[0];
                                if (v < 30) setAiProficiency("Beginner");
                                else if (v < 70) setAiProficiency("Intermediate");
                                else setAiProficiency("Expert");
                            }}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Beginner</span>
                            <span>Expert</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <Button onClick={handleSubmit} disabled={loading} className="w-full gap-2">
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Coins className="w-4 h-4" />}
                        Submit & Claim Rewards
                    </Button>

                    <Button variant="ghost" onClick={handleSkip} disabled={loading} className="w-full text-muted-foreground">
                        Skip
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
