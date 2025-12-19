import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Star, ArrowRight, CheckCircle2, Zap, Users } from "lucide-react";

interface ServiceDetail {
    id: string;
    name: string;
    description: string;
    fullDescription: string;
    whatYouGet: string[];
    process: string[];
    price: number;
    category: string;
    imageUrl: string;
    isGoldenEligible: boolean;
}

interface ServiceDetailModalProps {
    service: ServiceDetail | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ServiceDetailModal({ service, isOpen, onClose }: ServiceDetailModalProps) {
    if (!service) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto glass border-border/50">
                {/* Header with Image */}
                <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-lg">
                    <img
                        src={service.imageUrl}
                        alt={service.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                    {service.isGoldenEligible && (
                        <Badge className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-amber-600 text-white border-0">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            Starter Credit
                        </Badge>
                    )}
                    <div className="absolute bottom-4 left-6 right-6">
                        <Badge variant="secondary" className="mb-2">{service.category}</Badge>
                        <DialogTitle className="text-2xl md:text-3xl font-black text-foreground">
                            {service.name}
                        </DialogTitle>
                    </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-6 p-4 rounded-lg bg-card/50 border border-border/30">
                    <div>
                        <p className="text-sm text-muted-foreground">Price</p>
                        <p className="text-3xl font-black text-primary">₹{service.price}</p>
                    </div>
                </div>

                {/* Full Description */}
                <DialogDescription className="text-base text-muted-foreground mb-6">
                    {service.fullDescription}
                </DialogDescription>

                {/* What You'll Get */}
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        What You'll Get
                    </h3>
                    <ul className="space-y-2">
                        {service.whatYouGet.map((item, index) => (
                            <li key={index} className="flex items-start gap-3 text-muted-foreground">
                                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* How It Works */}
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-500" />
                        How It Works
                    </h3>
                    <ol className="space-y-3">
                        {service.process.map((step, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <span className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-destructive flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                                    {index + 1}
                                </span>
                                <span className="text-muted-foreground">{step}</span>
                            </li>
                        ))}
                    </ol>
                </div>

                {/* Human Touch Note */}
                <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-destructive/10 border border-primary/20 mb-6">
                    <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-foreground">AI + Human Excellence</p>
                            <p className="text-xs text-muted-foreground">
                                Every deliverable is crafted by AI and reviewed by our expert team to ensure quality.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA Button */}
                <Link href={`/orders?service=${encodeURIComponent(service.name)}&price=${service.price}&id=${service.id}`}>
                    <Button
                        className="w-full bg-gradient-to-r from-primary to-destructive hover:opacity-90 text-lg py-6"
                        onClick={onClose}
                    >
                        Order Now - ₹{service.price}
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </Link>
            </DialogContent>
        </Dialog>
    );
}
