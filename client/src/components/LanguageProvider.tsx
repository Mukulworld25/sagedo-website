import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "hi";

interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    t: (key: string) => string;
}

// Translations
const translations: Record<Language, Record<string, string>> = {
    en: {
        // Navigation
        "nav.home": "Home",
        "nav.services": "Services",
        "nav.about": "About",
        "nav.orders": "Orders",
        "nav.track": "Track",
        "nav.login": "Login",
        "nav.signup": "Sign Up FREE",
        "nav.dashboard": "Dashboard",
        "nav.admin": "Admin",
        "nav.settings": "Settings",
        "nav.logout": "Logout",

        // Home
        "home.tagline": "AI + Human Excellence",
        "home.greeting": "Namaste",
        "home.headline": "Problem? Need Help?",
        "home.subheadline": "Afcoz!",
        "home.description": "We Do Your Daily Grind, You Do Grand Things.",
        "home.subdescription": "Stop wasting time on small problems. Let our AI handle the complex tasks while you focus on what matters most.",
        "home.cta": "Get Started",

        // Settings
        "settings.title": "Settings",
        "settings.appearance": "Appearance",
        "settings.theme": "Theme",
        "settings.theme.light": "Light",
        "settings.theme.dark": "Dark",
        "settings.theme.system": "System",
        "settings.language": "Language",
        "settings.language.en": "English",
        "settings.language.hi": "हिन्दी (Hindi)",
        "settings.notifications": "Notifications",
        "settings.notifications.orders": "Order Updates",
        "settings.notifications.promo": "Promotional Emails",
        "settings.privacy": "Privacy & Security",
        "settings.privacy.password": "Change Password",
        "settings.privacy.download": "Download My Data",
        "settings.privacy.delete": "Delete Account",
        "settings.account": "Account",
        "settings.account.name": "Name",
        "settings.account.email": "Email",
        "settings.account.phone": "Phone",
        "settings.save": "Save Changes",

        // Common
        "common.loading": "Loading...",
        "common.save": "Save",
        "common.cancel": "Cancel",
        "common.delete": "Delete",
        "common.confirm": "Confirm",
        "common.success": "Success!",
        "common.error": "Error",

        // Footer
        "footer.tagline": "We Do Your Daily Grind, You Do Grand Things.",
        "footer.services": "Services",
        "footer.company": "Company",
        "footer.legal": "Legal",
        "footer.connect": "Connect",
        "footer.rights": "All rights reserved.",
    },
    hi: {
        // Navigation
        "nav.home": "होम",
        "nav.services": "सेवाएं",
        "nav.about": "हमारे बारे में",
        "nav.orders": "ऑर्डर",
        "nav.track": "ट्रैक",
        "nav.login": "लॉगिन",
        "nav.signup": "मुफ्त साइन अप",
        "nav.dashboard": "डैशबोर्ड",
        "nav.admin": "एडमिन",
        "nav.settings": "सेटिंग्स",
        "nav.logout": "लॉगआउट",

        // Home
        "home.tagline": "AI + मानव उत्कृष्टता",
        "home.greeting": "नमस्ते",
        "home.headline": "समस्या? मदद चाहिए?",
        "home.subheadline": "बिल्कुल!",
        "home.description": "हम आपका रोज़ का काम करते हैं, आप महान काम करो।",
        "home.subdescription": "छोटी समस्याओं पर समय बर्बाद करना बंद करें। हमारा AI जटिल कार्यों को संभालता है जबकि आप महत्वपूर्ण चीज़ों पर ध्यान देते हैं।",
        "home.cta": "शुरू करें",

        // Settings
        "settings.title": "सेटिंग्स",
        "settings.appearance": "दिखावट",
        "settings.theme": "थीम",
        "settings.theme.light": "लाइट",
        "settings.theme.dark": "डार्क",
        "settings.theme.system": "सिस्टम",
        "settings.language": "भाषा",
        "settings.language.en": "English",
        "settings.language.hi": "हिन्दी",
        "settings.notifications": "सूचनाएं",
        "settings.notifications.orders": "ऑर्डर अपडेट",
        "settings.notifications.promo": "प्रचार ईमेल",
        "settings.privacy": "गोपनीयता और सुरक्षा",
        "settings.privacy.password": "पासवर्ड बदलें",
        "settings.privacy.download": "मेरा डेटा डाउनलोड करें",
        "settings.privacy.delete": "खाता हटाएं",
        "settings.account": "खाता",
        "settings.account.name": "नाम",
        "settings.account.email": "ईमेल",
        "settings.account.phone": "फ़ोन",
        "settings.save": "परिवर्तन सहेजें",

        // Common
        "common.loading": "लोड हो रहा है...",
        "common.save": "सहेजें",
        "common.cancel": "रद्द करें",
        "common.delete": "हटाएं",
        "common.confirm": "पुष्टि करें",
        "common.success": "सफलता!",
        "common.error": "त्रुटि",

        // Footer
        "footer.tagline": "हम आपका रोज़ का काम करते हैं, आप महान काम करो।",
        "footer.services": "सेवाएं",
        "footer.company": "कंपनी",
        "footer.legal": "कानूनी",
        "footer.connect": "जुड़ें",
        "footer.rights": "सर्वाधिकार सुरक्षित।",
    },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>(() => {
        if (typeof window !== "undefined") {
            return (localStorage.getItem("language") as Language) || "en";
        }
        return "en";
    });

    const setLanguage = (newLanguage: Language) => {
        setLanguageState(newLanguage);
        localStorage.setItem("language", newLanguage);
        document.documentElement.lang = newLanguage;
    };

    const t = (key: string): string => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
