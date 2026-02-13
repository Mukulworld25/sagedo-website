import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Star, ArrowRight, CheckCircle2, Zap, Trophy, Crown, Shield } from "lucide-react";
import { ServiceDetail } from "@/data/serviceData";

interface ServiceDetailModalProps {
    service: ServiceDetail | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ServiceDetailModal({ service, isOpen, onClose }: ServiceDetailModalProps) {
    if (!service) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass border-border/50 p-0 gap-0">
                {/* Header Image Area */}
                <div className="relative h-56 w-full overflow-hidden">
                    <img
                        src={service.imageUrl}
                        alt={service.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                    {service.isGoldenEligible && (
                        <Badge className="absolute top-4 right-4 bg-amber-500 text-black border-0 font-bold">
                            <Star className="w-3 h-3 mr-1 fill-black" />
                            Starter Friendly
                        </Badge>
                    )}

                    <div className="absolute bottom-6 left-6 right-6">
                        <Badge variant="secondary" className="mb-3 bg-white/20 text-white backdrop-blur-md border-white/10 hover:bg-white/30">
                            {service.category}
                        </Badge>
                        <DialogTitle className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight">
                            {service.name}
                        </DialogTitle>
                        <p className="text-gray-300 text-lg max-w-2xl text-shadow-sm">
                            {service.fullDescription}
                        </p>
                    </div>
                </div>

                <div className="p-6 md:p-8 bg-[#0a0a0a]">
                    {/* Price Range Banner */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20">
                        <div>
                            <p className="text-sm text-amber-500 font-bold uppercase tracking-wider mb-1">Estimated Investment</p>
                            <p className="text-4xl font-black text-white">{service.priceRange}</p>
                        </div>
                        <div className="flex gap-2">
                            <Link href={`/orders?service=${encodeURIComponent(service.name)}&price=${service.price}&id=${service.id}`}>
                                <Button className="bg-amber-500 hover:bg-amber-600 text-black font-bold h-12 px-8 rounded-xl shadow-lg shadow-amber-500/20">
                                    Start Configuration <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Features Grid: Standard vs Premium */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* STANDARD COLUMN */}
                        <div className="space-y-6 p-6 rounded-2xl bg-white/5 border border-white/5">
                            <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-4">
                                <Shield className="w-8 h-8 text-gray-400" />
                                <div>
                                    <h3 className="text-xl font-bold text-white">Standard</h3>
                                    <p className="text-sm text-gray-400">Essential features to get started.</p>
                                </div>
                            </div>
                            <ul className="space-y-4">
                                {service.standardFeatures.map((feat, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-gray-500 mt-0.5 shrink-0" />
                                        <span className="text-gray-300">{feat}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* PREMIUM COLUMN */}
                        <div className="relative space-y-6 p-6 rounded-2xl bg-gradient-to-b from-amber-900/20 to-transparent border border-amber-500/30">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase">
                                Recommended
                            </div>
                            <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-4">
                                <Crown className="w-8 h-8 text-amber-500" />
                                <div>
                                    <h3 className="text-xl font-bold text-amber-500">Premium Upgrade</h3>
                                    <p className="text-sm text-amber-500/80">For professional scaling.</p>
                                </div>
                            </div>
                            <ul className="space-y-4">
                                {service.premiumFeatures.map((feat, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <Zap className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                                        <span className="text-white font-medium">{feat}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 pt-6 border-t border-white/10 text-center">
                                <p className="text-xs text-gray-400 italic">
                                    *You can select Premium add-ons during checkout.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-500">
                            Need a custom enterprise solution? <a href="/contact" className="text-amber-500 hover:underline">Contact Sales</a>
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
