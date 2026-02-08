import { motion } from "framer-motion";

const taglines = [
    "We do your daily grind, you do grand things.", // CORE TAGLINE
    "Get your Resume ATS-Optimized in minutes.",
    "Assignments written by Experts, not Bots.",
    "Full Pitch Decks designed for Investors.",
    "Viral Reels Scripts to blow up your Instagram.",
    "We do your daily grind, you do grand things.", // REPEAT
    "LinkedIn Profiles that attract Recruiters.",
    "Research Papers structured perfectly.",
    "We do your daily grind, you do grand things.",
];

export function AnimatedTicker() {
    return (
        <div className="w-full bg-primary/5 border-y border-primary/10 overflow-hidden py-3 relative flex select-none">
            {/* Gradient Masks for smooth fade in/out */}
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-10" />

            <motion.div
                className="flex whitespace-nowrap gap-16"
                animate={{ x: [0, -1000] }} // Adjust based on content width approximated
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 20, // Slow smooth scroll
                }}
            >
                {/* Repeat content enough times to fill screen and loop smoothly */}
                {[...taglines, ...taglines, ...taglines, ...taglines].map((line, i) => (
                    <div key={i} className="flex items-center gap-4 text-sm sm:text-base font-semibold text-muted-foreground">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className={line === "We do your daily grind, you do grand things." ? "text-primary font-bold" : ""}>
                            {line}
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
