
import { useEffect, useState } from "react";

const taglines = [
    "We do your daily grind, you do grand things.",
    "Assignment & Research Experts.",
    "We do your busy work.",
    "Sagedo: Your Personal Assistant.",
    "From tedious tasks to grand goals.",
    "We do your daily grind, you do grand things.",
    "Assignment & Research Experts.",
    "We do your busy work.",
    "Sagedo: Your Personal Assistant.",
];

export function AnimatedTicker() {
    return (
        <div className="w-full bg-black/5 border-y border-black/5 overflow-hidden py-3">
            <div className="relative flex overflow-x-hidden group">
                <div className="py-2 animate-marquee whitespace-nowrap flex space-x-8">
                    {taglines.map((tag, i) => (
                        <span key={i} className="text-sm font-medium text-foreground/80 mx-4">
                            ✦ {tag}
                        </span>
                    ))}
                </div>

                {/* DUPLICATE FOR INFINITE LOOP */}
                <div className="absolute top-0 py-2 animate-marquee2 whitespace-nowrap flex space-x-8">
                    {taglines.map((tag, i) => (
                        <span key={`clone - ${i} `} className="text-sm font-medium text-foreground/80 mx-4">
                            ✦ {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
