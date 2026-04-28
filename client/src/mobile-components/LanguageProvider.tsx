import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type Language = "en" | "hi";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
    en: {
        "nav.home": "Home",
        "nav.explore": "Explore",
        "nav.order": "Order",
        "nav.track": "Track",
        "nav.profile": "Profile",

        "profile.personal_info": "Personal Information",
        "profile.security": "Data & Security",
        "profile.referral": "Referral Rewards",
        "profile.language": "Language",
        "profile.sign_out": "Sign Out from System",
        "profile.wallet": "Wallet",
        "profile.credits": "Credits",
        "profile.available": "Available",
        "profile.current_plan": "Current Plan",
        "profile.pro_tier": "Pro Tier",
        "profile.manage_billing": "Manage Billing",
        "profile.service_credit": "Service Credit: Use it for ANY service",
        "profile.delivery_time": "Delivered within 24-48 hours",

        "header.ai_engine": "AI Engine"
    },
    hi: {
        "nav.home": "होम",
        "nav.explore": "खोजें",
        "nav.order": "ऑर्डर",
        "nav.track": "ट्रैक",
        "nav.profile": "प्रोफाइल",

        "profile.personal_info": "व्यक्तिगत जानकारी",
        "profile.security": "डेटा और सुरक्षा",
        "profile.referral": "रेफरल इनाम",
        "profile.language": "भाषा (Language)",
        "profile.sign_out": "सिस्टम से साइन आउट करें",
        "profile.wallet": "बटुआ",
        "profile.credits": "क्रेडिट",
        "profile.available": "उपलब्ध",
        "profile.current_plan": "वर्तमान प्लान",
        "profile.pro_tier": "प्रो टियर",
        "profile.manage_billing": "बिलिंग प्रबंधित करें",
        "profile.service_credit": "सर्विस क्रेडिट: किसी भी सेवा के लिए उपयोग करें",
        "profile.delivery_time": "24-48 घंटों के भीतर डिलीवर",

        "header.ai_engine": "AI इंजन"
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>(() => {
        if (typeof window !== "undefined") {
            return (localStorage.getItem("app_language") as Language) || "en";
        }
        return "en";
    });

    const setLanguage = (newLanguage: Language) => {
        setLanguageState(newLanguage);
        localStorage.setItem("app_language", newLanguage);
        document.documentElement.lang = newLanguage;
    };

    const t = (key: string): string => {
        return translations[language][key] || key;
    };

    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
