import { Card } from "@/components/ui/card";

export default function ShippingPolicy() {
    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-black text-foreground mb-8">Shipping and Delivery Policy</h1>

                <Card className="glass p-8 space-y-6">
                    <section>
                        <p className="text-sm text-muted-foreground mb-4">
                            Last Updated: December 17, 2025
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">Service Delivery</h2>
                        <p className="text-muted-foreground">
                            SAGE DO is a Platform-as-a-Service (PaaS). <strong className="text-foreground">We do not ship physical products.</strong> All our services are delivered digitally.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">Delivery Timeline</h2>
                        <p className="text-muted-foreground">
                            Services (AI credits/dashboard access) are delivered <strong className="text-foreground">instantly upon successful payment</strong>. For custom service orders, delivery timelines are specified on each service page and typically range from 24 hours to 3-5 business days depending on the complexity of the request.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">Confirmation</h2>
                        <p className="text-muted-foreground">
                            A confirmation email is sent to your registered email address immediately after every successful transaction. You can also track your order status in real-time from your dashboard.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">Digital Delivery Methods</h2>
                        <div className="text-muted-foreground">
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Email with download links</li>
                                <li>Direct access through your SAGE DO dashboard</li>
                                <li>Google Drive or cloud storage links (for large files)</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">Support</h2>
                        <div className="text-muted-foreground">
                            <p className="mb-3">For any delivery issues or concerns, please contact us:</p>
                            <ul className="list-none space-y-1">
                                <li><strong>Email:</strong> sagedoai00@gmail.com</li>
                                <li><strong>Phone:</strong> +91 7018709291</li>
                                <li><strong>WhatsApp:</strong> <a href="https://wa.me/917018709291" className="text-primary hover:underline">+91 7018709291</a></li>
                            </ul>
                        </div>
                    </section>

                    <section className="border-t pt-6 mt-6">
                        <p className="text-sm text-muted-foreground italic">
                            If you have not received your delivery within the specified timeframe, please contact our support team and we will resolve the issue promptly.
                        </p>
                    </section>
                </Card>
            </div>
        </div>
    );
}
