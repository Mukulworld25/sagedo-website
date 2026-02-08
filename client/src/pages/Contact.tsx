import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import {
    Mail,
    Phone,
    MapPin,
    MessageCircle,
    Send,
    Clock,
    CheckCircle
} from "lucide-react";

export default function Contact() {
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await apiRequest("POST", "/api/contact", formData);

            setSubmitted(true);
            toast({
                title: "Message Sent!",
                description: "We'll get back to you within 24 hours.",
            });

            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to send message. Please try again or use WhatsApp.",
                variant: "destructive"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen py-20 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-foreground mb-4">Contact Us</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Have a question or need help? We're here for you.
                        Reach out and we'll get back to you within 24 hours.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <Card className="p-8">
                        <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

                        {submitted ? (
                            <div className="text-center py-12">
                                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                                <p className="text-muted-foreground mb-6">
                                    Your message has been received. We'll respond within 24 hours.
                                </p>
                                <Button onClick={() => setSubmitted(false)}>
                                    Send Another Message
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-foreground">Name *</label>
                                        <Input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Your name"
                                            required
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-foreground">Email *</label>
                                        <Input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="you@example.com"
                                            required
                                            className="mt-1"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-foreground">Subject *</label>
                                    <Input
                                        type="text"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        placeholder="How can we help?"
                                        required
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-foreground">Message *</label>
                                    <Textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="Tell us more about your inquiry..."
                                        required
                                        rows={5}
                                        className="mt-1"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-primary to-destructive"
                                >
                                    {isSubmitting ? (
                                        "Sending..."
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4 mr-2" />
                                            Send Message
                                        </>
                                    )}
                                </Button>
                            </form>
                        )}
                    </Card>

                    {/* Contact Information */}
                    <div className="space-y-6">
                        <Card className="p-6">
                            <h2 className="text-xl font-bold mb-6">Contact Information</h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-lg bg-primary/10">
                                        <Mail className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Email</h3>
                                        <a href="mailto:hello@sagedo.in" className="text-primary hover:underline">
                                            hello@sagedo.in
                                        </a>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            For general inquiries and support
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-lg bg-primary/10">
                                        <Phone className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Phone</h3>
                                        <a href="tel:+916284925684" className="text-primary hover:underline">
                                            +91 6284925684
                                        </a>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Mon-Sat, 10:00 AM - 7:00 PM IST
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-lg bg-[#25D366]/10">
                                        <MessageCircle className="w-5 h-5 text-[#25D366]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">WhatsApp</h3>
                                        <a
                                            href="https://wa.me/916284925684?text=Hi%20SAGE%20DO,%20I%20have%20a%20query"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#25D366] hover:underline"
                                        >
                                            +91 6284925684
                                        </a>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Quick responses, available 24/7
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-lg bg-primary/10">
                                        <MapPin className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Address</h3>
                                        <p className="text-muted-foreground">
                                            SAGE DO<br />
                                            Chandigarh, India
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-primary/10">
                                    <Clock className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">Response Time</h3>
                                    <p className="text-muted-foreground">
                                        We typically respond within <strong className="text-foreground">24 hours</strong>.
                                        For urgent matters, please reach out via WhatsApp for faster support.
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6 bg-gradient-to-br from-primary/10 to-destructive/10 border-primary/20">
                            <h3 className="font-bold mb-2">Need Immediate Help?</h3>
                            <p className="text-muted-foreground mb-4">
                                Chat with us directly on WhatsApp for instant support.
                            </p>
                            <a
                                href="https://wa.me/916284925684?text=Hi%20SAGE%20DO,%20I%20need%20urgent%20support"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button className="w-full bg-[#25D366] hover:bg-[#128C7E]">
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    Chat on WhatsApp
                                </Button>
                            </a>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
