import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    resolvedTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>(() => {
        if (typeof window !== "undefined") {
            return (localStorage.getItem("theme") as Theme) || "dark";
        }
        return "dark";
    });

    const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark");

    // Apply dark class immediately on mount to prevent flash
    if (typeof window !== "undefined" && !document.documentElement.classList.contains("dark")) {
        const savedTheme = localStorage.getItem("theme") as Theme;
        if (!savedTheme || savedTheme === "dark" || savedTheme === "system") {
            document.documentElement.classList.add("dark");
        }
    }

    useEffect(() => {
        const root = document.documentElement;

        const applyTheme = (newTheme: "light" | "dark") => {
            if (newTheme === "dark") {
                root.classList.add("dark");
            } else {
                root.classList.remove("dark");
            }
            setResolvedTheme(newTheme);
        };

        if (theme === "system") {
            const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            applyTheme(systemPrefersDark ? "dark" : "light");

            // Listen for system theme changes
            const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
            const handler = (e: MediaQueryListEvent) => applyTheme(e.matches ? "dark" : "light");
            mediaQuery.addEventListener("change", handler);
            return () => mediaQuery.removeEventListener("change", handler);
        } else {
            applyTheme(theme);
        }
    }, [theme]);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
