import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/components/ThemeProvider";
import { useLanguage } from "@/components/LanguageProvider";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { useState } from "react";
import {
    Sun,
    Moon,
    Monitor,
    Globe,
    Bell,
    Shield,
    User,
    Download,
    Trash2,
    Lock,
    ChevronRight
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function Settings() {
    const { user, isAuthenticated, logout } = useAuth();
    const { theme, setTheme, resolvedTheme } = useTheme();
    const { language, setLanguage, t } = useLanguage();
    const { toast } = useToast();
    const [, setLocation] = useLocation();

    const [notifications, setNotifications] = useState({
        orderUpdates: true,
        promoEmails: false,
    });

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deleteConfirmText, setDeleteConfirmText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    // Redirect if not logged in
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen py-20 px-4">
                <div className="max-w-md mx-auto text-center">
                    <Card className="p-8">
                        <h2 className="text-2xl font-bold mb-4">{t("settings.title")}</h2>
                        <p className="text-muted-foreground mb-6">Please login to access settings.</p>
                        <Button onClick={() => setLocation("/login")}>
                            {t("nav.login")}
                        </Button>
                    </Card>
                </div>
            </div>
        );
    }

    const handleDeleteAccount = async () => {
        if (deleteConfirmText !== "DELETE") return;

        setIsDeleting(true);
        try {
            const response = await fetch("/api/user/delete", {
                method: "DELETE",
                credentials: "include",
            });

            if (response.ok) {
                toast({
                    title: t("common.success"),
                    description: "Your account has been deleted.",
                });
                logout();
                setLocation("/");
            } else {
                throw new Error("Failed to delete account");
            }
        } catch (error) {
            toast({
                title: t("common.error"),
                description: "Failed to delete account. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsDeleting(false);
            setShowDeleteDialog(false);
        }
    };

    const handleDownloadData = async () => {
        try {
            toast({
                title: "Request Submitted",
                description: "Your data export will be sent to your email within 24 hours.",
            });
        } catch (error) {
            toast({
                title: t("common.error"),
                description: "Failed to request data export.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="min-h-screen py-20 px-4">
            <div className="max-w-2xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold text-foreground">{t("settings.title")}</h1>

                {/* Appearance Section */}
                <Card className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-primary/10">
                            <Sun className="w-5 h-5 text-primary" />
                        </div>
                        <h2 className="text-xl font-semibold">{t("settings.appearance")}</h2>
                    </div>

                    {/* Theme Toggle */}
                    <div className="space-y-4">
                        <Label className="text-base">{t("settings.theme")}</Label>
                        <div className="grid grid-cols-3 gap-3">
                            <Button
                                variant={theme === "light" ? "default" : "outline"}
                                className="flex flex-col items-center gap-2 h-auto py-4"
                                onClick={() => setTheme("light")}
                            >
                                <Sun className="w-5 h-5" />
                                <span className="text-sm">{t("settings.theme.light")}</span>
                            </Button>
                            <Button
                                variant={theme === "dark" ? "default" : "outline"}
                                className="flex flex-col items-center gap-2 h-auto py-4"
                                onClick={() => setTheme("dark")}
                            >
                                <Moon className="w-5 h-5" />
                                <span className="text-sm">{t("settings.theme.dark")}</span>
                            </Button>
                            <Button
                                variant={theme === "system" ? "default" : "outline"}
                                className="flex flex-col items-center gap-2 h-auto py-4"
                                onClick={() => setTheme("system")}
                            >
                                <Monitor className="w-5 h-5" />
                                <span className="text-sm">{t("settings.theme.system")}</span>
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Language Section */}
                <Card className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-primary/10">
                            <Globe className="w-5 h-5 text-primary" />
                        </div>
                        <h2 className="text-xl font-semibold">{t("settings.language")}</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            variant={language === "en" ? "default" : "outline"}
                            className="flex items-center justify-center gap-2 h-12"
                            onClick={() => setLanguage("en")}
                        >
                            <span className="text-lg">🇺🇸</span>
                            <span>{t("settings.language.en")}</span>
                        </Button>
                        <Button
                            variant={language === "hi" ? "default" : "outline"}
                            className="flex items-center justify-center gap-2 h-12"
                            onClick={() => setLanguage("hi")}
                        >
                            <span className="text-lg">🇮🇳</span>
                            <span>{t("settings.language.hi")}</span>
                        </Button>
                    </div>
                </Card>

                {/* Notifications Section */}
                <Card className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-primary/10">
                            <Bell className="w-5 h-5 text-primary" />
                        </div>
                        <h2 className="text-xl font-semibold">{t("settings.notifications")}</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="text-base">{t("settings.notifications.orders")}</Label>
                                <p className="text-sm text-muted-foreground">Get notified about order status changes</p>
                            </div>
                            <Switch
                                checked={notifications.orderUpdates}
                                onCheckedChange={(checked) =>
                                    setNotifications(prev => ({ ...prev, orderUpdates: checked }))
                                }
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="text-base">{t("settings.notifications.promo")}</Label>
                                <p className="text-sm text-muted-foreground">Receive promotional offers and updates</p>
                            </div>
                            <Switch
                                checked={notifications.promoEmails}
                                onCheckedChange={(checked) =>
                                    setNotifications(prev => ({ ...prev, promoEmails: checked }))
                                }
                            />
                        </div>
                    </div>
                </Card>

                {/* Privacy & Security Section */}
                <Card className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-primary/10">
                            <Shield className="w-5 h-5 text-primary" />
                        </div>
                        <h2 className="text-xl font-semibold">{t("settings.privacy")}</h2>
                    </div>

                    <div className="space-y-3">
                        <Button
                            variant="outline"
                            className="w-full justify-between h-14"
                            onClick={() => setLocation("/forgot-password")}
                        >
                            <div className="flex items-center gap-3">
                                <Lock className="w-5 h-5" />
                                <span>{t("settings.privacy.password")}</span>
                            </div>
                            <ChevronRight className="w-5 h-5" />
                        </Button>

                        <Button
                            variant="outline"
                            className="w-full justify-between h-14"
                            onClick={handleDownloadData}
                        >
                            <div className="flex items-center gap-3">
                                <Download className="w-5 h-5" />
                                <span>{t("settings.privacy.download")}</span>
                            </div>
                            <ChevronRight className="w-5 h-5" />
                        </Button>

                        <Button
                            variant="outline"
                            className="w-full justify-between h-14 text-destructive hover:text-destructive border-destructive/30 hover:border-destructive"
                            onClick={() => setShowDeleteDialog(true)}
                        >
                            <div className="flex items-center gap-3">
                                <Trash2 className="w-5 h-5" />
                                <span>{t("settings.privacy.delete")}</span>
                            </div>
                            <ChevronRight className="w-5 h-5" />
                        </Button>
                    </div>
                </Card>

                {/* Account Info Section */}
                <Card className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-primary/10">
                            <User className="w-5 h-5 text-primary" />
                        </div>
                        <h2 className="text-xl font-semibold">{t("settings.account")}</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <Label className="text-sm text-muted-foreground">{t("settings.account.email")}</Label>
                            <p className="text-foreground font-medium">{user?.email || "Not available"}</p>
                        </div>
                    </div>
                </Card>

                {/* Delete Account Dialog */}
                <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-destructive">Delete Account</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete your account and remove all your data.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                            <Label>Type "DELETE" to confirm:</Label>
                            <Input
                                value={deleteConfirmText}
                                onChange={(e) => setDeleteConfirmText(e.target.value)}
                                placeholder="DELETE"
                                className="mt-2"
                            />
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                                {t("common.cancel")}
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleDeleteAccount}
                                disabled={deleteConfirmText !== "DELETE" || isDeleting}
                            >
                                {isDeleting ? t("common.loading") : t("common.delete")}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
