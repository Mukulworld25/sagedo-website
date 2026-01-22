import { motion } from "framer-motion";
import { User } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Zap } from "lucide-react";

interface ExperienceScoreProps {
    user: User | null;
}

export function ExperienceScore({ user }: ExperienceScoreProps) {
    // Simple "Gamification" Logic
    // Base score: 20% for just being here
    let score = 20;

    if (user) {
        score += 20; // Signed up
        if (user.profession) score += 20; // Profile filled
        if (user.name) score += 10;
        // Future: Add logic for "services viewed" or "orders placed"
    }

    // Cap at 90% to always leave room for "Unlock Priority Support" motivation
    // unless they are actually a VIP.
    if (score > 90) score = 90;

    return (
        <Card className="mb-8 border-primary/20 bg-primary/5 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Trophy className="w-24 h-24 text-primary" />
            </div>

            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-primary/10 text-primary">
                            <Zap className="w-4 h-4" />
                        </div>
                        <h3 className="font-semibold text-lg">
                            AI Readiness Score: <span className="text-primary">{score}%</span>
                        </h3>
                    </div>
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                        Level 1: Novice
                    </span>
                </div>

                <Progress value={score} className="h-2 mb-4" />

                <p className="text-sm text-muted-foreground">
                    {score < 100 ? (
                        <>
                            🚀 <strong>Tip:</strong> Complete your first order to reach 100% and unlock{" "}
                            <span className="text-primary font-medium">Executive Priority Support</span>.
                        </>
                    ) : (
                        "🎉 You are an AI Power User!"
                    )}
                </p>
            </CardContent>
        </Card>
    );
}
