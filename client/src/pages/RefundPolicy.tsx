import { Card } from "@/components/ui/card";

export default function RefundPolicy() {
    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-black text-foreground mb-8">Refund, Cancellation & Shipping Policy</h1>

                <Card className="glass p-8 space-y-6">
                    <section>
                        <p className="text-sm text-muted-foreground mb-4">
                            Last Updated: October 25, 2026
                        </p>
                        <p className="text-muted-foreground">
                            At SAGE DO, we strive for 100% customer satisfaction. This policy outlines our refund, cancellation, and delivery terms in compliance with the Consumer Protection Act, 2019 and Consumer Protection (E-Commerce) Rules, 2020.
                        </p>
                    </section>

                    {/* Shipping & Delivery Section */}
                    <section className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                        <h2 className="text-2xl font-bold text-foreground mb-4">📦 Service Handover & Delivery Policy</h2>

                        <div className="space-y-4 text-muted-foreground">
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">Bespoke Digital & Revenue Infrastructure</h3>
                                <p>SAGE DO delivers custom digital engineering, revenue systems, and sovereign AI automations. Deliverables include bespoke software codebases, cloud infrastructure, WhatsApp Cloud API integrations, and CRM architectures governed by transparent milestone deliverables.</p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-foreground mb-2">48-Hour Functional Prototype & Delivery Timelines</h3>
                                <p>All builds are backed by our <strong className="text-foreground">48-Hour Functional Prototype Guarantee</strong>. Full production milestones are phased: 7 calendar days for SMB LaunchPad Starter, 10–12 days for LaunchPad Growth, 14 days for Digital Presence Engine, 28 days for Sovereign Revenue Engine™, and 45–60 days for Enterprise Infrastructure.</p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-foreground mb-2">Confirmation & Progress Tracking</h3>
                                <p>A confirmation email and onboarding access are provided immediately upon order placement. Clients receive a dedicated WhatsApp communication channel and live milestone tracking with your assigned growth engineer.</p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-foreground mb-2">Handover Methods</h3>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Direct repository handover (GitHub/GitLab) with full source code rights</li>
                                    <li>Sovereign VPS deployment with verified production environment variables</li>
                                    <li>Credentials and administrative console access handover</li>
                                    <li>Walkthrough video documentation and technical training session</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">1. Refund Eligibility</h2>
                        <p className="text-muted-foreground mb-3">You are eligible for a refund if:</p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li><strong>Service not delivered:</strong> If we fail to deliver the agreed milestone within the promised timeframe without valid mutual extension</li>
                            <li><strong>Quality issues:</strong> If the delivered milestone does not meet the technical specifications agreed upon and cannot be corrected during reasonable revision sprints</li>
                            <li><strong>Duplicate payment:</strong> If you were charged multiple times for the same order due to a payment gateway error</li>
                            <li><strong>Service cancellation:</strong> If we are unable to fulfill your order and cancel the engagement</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">2. Non-Refundable Services</h2>
                        <p className="text-muted-foreground mb-3">Refunds will NOT be provided in the following cases:</p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>Milestones already formally approved and signed off by you</li>
                            <li>Changes in scope or requirements requested after milestone delivery</li>
                            <li>Delays caused by failure to provide required domain/API access or content assets</li>
                            <li>Subjective aesthetic preference changes when deliverables strictly satisfy agreed wireframes/specifications</li>
                            <li>Promotional discounts, pilot waivers, or complimentary discovery sessions</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">3. Cancellation Policy</h2>
                        <div className="space-y-3 text-muted-foreground">
                            <p><strong>Before Service Starts:</strong></p>
                            <ul className="list-disc pl-6 space-y-1 mb-3">
                                <li>Full (100%) refund if the order is cancelled within 1 hour of payment before resource allocation</li>
                                <li>50% refund if cancelled after 1 hour but before prototype sprint commencement</li>
                            </ul>

                            <p><strong>After Work Begins:</strong></p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>Governed by our <strong className="text-foreground">Milestone-Gated 90% Money-Back Guarantee</strong>. If an agreed milestone cannot satisfy verified specifications following revision sprints, the client is entitled to a 90% refund of that milestone fee.</li>
                                <li>The remaining 10% strictly covers incurred, non-recoverable hard costs (cloud provisioning, third-party API tokens, domain/SSL registries, and gateway fees).</li>
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

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">11. Milestone-Gated 90% Money-Back Guarantee</h2>
                        <div className="space-y-3 text-muted-foreground">
                            <ul className="list-disc pl-6 space-y-2">
                                <li>SAGE DO delivers bespoke engineering and digital infrastructure backed by our <strong>Milestone-Gated 90% Money-Back Guarantee</strong>.</li>
                                <li>Every engagement includes our <strong>48-Hour Functional Prototype Guarantee</strong>. If we fail to deliver an agreed milestone or verifiable specifications cannot be satisfied following reasonable revision sprints, the client is entitled to a <strong>90% refund of the milestone fee</strong>.</li>
                                <li>The remaining 10% is retained strictly for non-recoverable, irreversible third-party cloud and infrastructure costs (VPS provisioning, domain/SSL registries, third-party LLM/WhatsApp API consumption, and payment gateway settlement charges).</li>
                                <li>Refund requests must be submitted within <strong>7 calendar days</strong> of milestone handover.</li>
                                <li>This guarantee applies to the specific milestone amount paid, maintaining total transparency throughout delivery.</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">12. Installment Payment Refund Policy</h2>
                        <div className="space-y-3 text-muted-foreground">
                            <p>For orders placed under a split payment plan (50/50 or 3-Part Installments):</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Refunds are calculated as <strong>90% of the total amount paid to date</strong>, not the total contract value.</li>
                                <li><strong>Example:</strong> If you paid ₹20,000 of a ₹60,000 contract, your refund = 90% of ₹20,000 = ₹18,000.</li>
                                <li>Outstanding installments are automatically cancelled upon refund approval.</li>
                                <li>Refund requests must be submitted before the next installment due date.</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">13. Milestone-Gated Delivery</h2>
                        <div className="space-y-3 text-muted-foreground">
                            <p>For orders under split payment plans, deliverables are released in stages corresponding to each payment milestone.</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>50/50 Plan:</strong> Phase 1 deliverables released after 50% payment. Final deliverables released after balance payment.</li>
                                <li><strong>3-Part Plan:</strong> Deliverables released in 3 stages — after each installment is received.</li>
                                <li>Final project files, source code, and admin access are transferred only after full payment is complete.</li>
                            </ul>
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
