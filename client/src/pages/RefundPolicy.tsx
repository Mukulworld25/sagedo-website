import { Card } from "@/components/ui/card";

export default function RefundPolicy() {
    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-black text-foreground mb-8">Refund, Cancellation & Shipping Policy</h1>

                <Card className="glass p-8 space-y-6">
                    <section>
                        <p className="text-sm text-muted-foreground mb-4">
                            Last Updated: December 17, 2025
                        </p>
                        <p className="text-muted-foreground">
                            At SAGE DO, we strive for 100% customer satisfaction. This policy outlines our refund, cancellation, and delivery terms in compliance with the Consumer Protection Act, 2019 and Consumer Protection (E-Commerce) Rules, 2020.
                        </p>
                    </section>

                    {/* Shipping & Delivery Section */}
                    <section className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                        <h2 className="text-2xl font-bold text-foreground mb-4">📦 Shipping & Delivery Policy</h2>

                        <div className="space-y-4 text-muted-foreground">
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">Platform Access & Delivery</h3>
                                <p>SAGE DO is a SaaS (Software-as-a-Service) Platform. <strong className="text-foreground">We do not sell physical products or static digital bundles.</strong> Users purchase a subscription or credits to access our AI-powered workflow software.</p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-foreground mb-2">Delivery Timeline</h3>
                                <p>Services (AI credits/dashboard access) are delivered <strong className="text-foreground">instantly upon successful payment</strong>. For custom service orders, delivery timelines are specified on each service page and typically range from 24 hours to 3-5 business days.</p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-foreground mb-2">Confirmation</h3>
                                <p>A confirmation email is sent to your registered email address immediately after every successful transaction. You can also track your order status in real-time from your dashboard.</p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-foreground mb-2">Delivery Methods</h3>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Email with download links</li>
                                    <li>Direct access through your SAGE DO dashboard</li>
                                    <li>Google Drive or cloud storage links (for large files)</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">1. Refund Eligibility</h2>
                        <p className="text-muted-foreground mb-3">You are eligible for a refund if:</p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li><strong>Service not delivered:</strong> If we fail to deliver the service within the promised timeframe without valid reason</li>
                            <li><strong>Quality issues:</strong> If the delivered service does not meet the specifications you provided and we cannot correct it after reasonable attempts</li>
                            <li><strong>Duplicate payment:</strong> If you were charged multiple times for the same order due to a technical error</li>
                            <li><strong>Service cancellation:</strong> If we are unable to fulfill your order and cancel it</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">2. Non-Refundable Services</h2>
                        <p className="text-muted-foreground mb-3">Refunds will NOT be provided in the following cases:</p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>Services already delivered and accepted by you</li>
                            <li>Changes in requirements after service delivery</li>
                            <li>Delays caused by incomplete or incorrect information provided by you</li>
                            <li>Subjective dissatisfaction with delivered content (when it meets agreed specifications)</li>
                            <li>Token bonuses, promotional credits, or Welcome Bonus credits</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">3. Cancellation Policy</h2>
                        <div className="space-y-3 text-muted-foreground">
                            <p><strong>Before Service Starts:</strong></p>
                            <ul className="list-disc pl-6 space-y-1 mb-3">
                                <li>Full refund if order is cancelled within 1 hour of payment</li>
                                <li>50% refund if cancelled after 1 hour but before work begins</li>
                            </ul>

                            <p><strong>After Work Begins:</strong></p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>No refund once work has commenced</li>
                                <li>Partial delivery may be provided at our discretion</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">4. How to Request a Refund</h2>
                        <div className="space-y-3 text-muted-foreground">
                            <p>To request a refund:</p>
                            <ol className="list-decimal pl-6 space-y-2">
                                <li>Contact us within <strong>7 days</strong> of order placement or service delivery</li>
                                <li>Provide your order ID and reason for refund request</li>
                                <li>Send your request to <strong>hello@sagedo.in</strong> or WhatsApp <strong>+91 6284925684</strong></li>
                                <li>Include any supporting evidence (screenshots, documents, etc.)</li>
                            </ol>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">5. Refund Processing</h2>
                        <div className="space-y-3 text-muted-foreground">
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Review Time:</strong> We will review your refund request within 2-3 business days</li>
                                <li><strong>Approval:</strong> If approved, refund will be initiated within 3-5 business days</li>
                                <li><strong>Processing Time:</strong> Refunds may take 5-10 business days to reflect in your account, depending on your bank/payment method</li>
                                <li><strong>Method:</strong> Refunds are processed through the original payment method (Razorpay)</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">6. Partial Refunds</h2>
                        <p className="text-muted-foreground">
                            In some cases, partial refunds may be issued based on the work completed. This will be determined on a case-by-case basis and communicated to you clearly.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">7. Payment Failures & Failed Transactions</h2>
                        <p className="text-muted-foreground">
                            If a payment fails or is debited from your account but the order is not created, the amount will be automatically refunded by the payment gateway (Razorpay) within 5-7 business days as per RBI guidelines. If not received, contact us with transaction details.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">8. Revision Policy</h2>
                        <div className="space-y-3 text-muted-foreground">
                            <p>Instead of refunds, we offer revisions for quality issues:</p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>Minor revisions: Free of charge if requested within 2 days of delivery</li>
                                <li>Major changes: May incur additional charges</li>
                                <li>Revisions must be for errors in meeting original specifications, not new requirements</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">9. Dispute Resolution</h2>
                        <p className="text-muted-foreground">
                            If you are not satisfied with our refund decision, you may contact our Grievance Officer or file a complaint with the Consumer Protection Authority. We encourage amicable resolution before escalation.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">10. Contact Us</h2>
                        <div className="text-muted-foreground">
                            <p>For refund, cancellation, or delivery queries:</p>
                            <ul className="list-none space-y-1 mt-2">
                                <li><strong>Email:</strong> hello@sagedo.in</li>
                                <li><strong>Phone:</strong> +91 6284925684</li>
                                <li><strong>WhatsApp:</strong> <a href="https://wa.me/916284925684" className="text-primary hover:underline">+91 6284925684</a></li>
                            </ul>
                            <p className="mt-3">
                                <strong>Response Time:</strong> We aim to respond to all queries within 24-48 hours.
                            </p>
                        </div>
                    </section>

                    <section className="border-t pt-6 mt-6">
                        <p className="text-sm text-muted-foreground italic">
                            This Refund & Shipping Policy is subject to the laws of India and complies with the Consumer Protection Act, 2019.
                        </p>
                    </section>
                </Card>
            </div>
        </div>
    );
}
