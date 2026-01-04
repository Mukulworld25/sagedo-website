import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { AnimatePresence, motion } from "framer-motion";
import { BrainCircuit, X } from "lucide-react";

type Notification = {
    id: string;
    type: 'new_user' | 'survey_completed';
    data: any;
};

export default function AdminNotification() {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        // Only connect if user is admin
        if (!user?.isAdmin) return;

        // Determine WS protocol (ws or wss)
        const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
        const wsUrl = `${protocol}//${window.location.host}/ws`;

        const ws = new WebSocket(wsUrl);

        ws.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                const newNotif = {
                    id: Date.now().toString(),
                    type: message.type,
                    data: message.data
                } as Notification;

                // Add to list
                setNotifications((prev) => [newNotif, ...prev]);

                // Auto remove after 8 seconds
                setTimeout(() => {
                    setNotifications((prev) => prev.filter(n => n.id !== newNotif.id));
                }, 8000);

            } catch (e) {
                console.error("WS Parse Error", e);
            }
        };

        return () => {
            ws.close();
        };
    }, [user]);

    if (!user?.isAdmin) return null;

    return (
        <div className="fixed top-24 right-6 z-50 flex flex-col gap-4 w-96 font-sans">
            <AnimatePresence>
                {notifications.map((notif) => (
                    <motion.div
                        key={notif.id}
                        initial={{ x: 300, opacity: 0, scale: 0.9 }}
                        animate={{ x: 0, opacity: 1, scale: 1 }}
                        exit={{ x: 300, opacity: 0, scale: 0.9 }}
                        className="relative overflow-hidden rounded-xl border border-cyan-500/50 bg-black/80 p-4 shadow-[0_0_30px_rgba(6,182,212,0.3)] backdrop-blur-xl"
                    >
                        {/* Holographic scanning line effect */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent animate-scan pointer-events-none" />

                        <div className="flex gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400">
                                <BrainCircuit className="h-7 w-7 animate-pulse" />
                            </div>

                            <div className="flex-1">
                                <h4 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
                                    {notif.type === 'new_user' ? 'New Recruit Detected' : 'Intel Acquired'}
                                </h4>

                                <div className="mt-1 space-y-1 text-sm text-gray-200">
                                    {notif.type === 'new_user' ? (
                                        <>
                                            <p><span className="text-gray-500">Subject:</span> {notif.data.name}</p>
                                            <p><span className="text-gray-500">Email:</span> {notif.data.email}</p>
                                        </>
                                    ) : (
                                        <>
                                            <p><span className="text-gray-500">Agent:</span> {notif.data.name}</p>
                                            <p><span className="text-gray-500">Class:</span> {notif.data.profession}</p>
                                            <p><span className="text-gray-500">Reward:</span> {notif.data.reward} Tokens</p>
                                        </>
                                    )}
                                    <p className="text-xs text-gray-500 mt-2 font-mono">{notif.data.time}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => setNotifications(prev => prev.filter(n => n.id !== notif.id))}
                                className="text-gray-500 hover:text-white"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
