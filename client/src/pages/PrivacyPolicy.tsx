import { Card } from "@/components/ui/card";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-black text-foreground mb-8">Privacy Policy</h1>

                <Card className="glass p-8 space-y-6">
                    <section>
                        <p className="text-sm text-muted-foreground mb-4">
                            Last Updated: November 22, 2025
                        </p>
                        <p className="text-muted-foreground">
                            SAGE DO ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services, in compliance with the Digital Personal Data Protection Act, 2023 (DPDP Act) and other applicable Indian laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">1. Information We Collect</h2>
                        <div className="space-y-3 text-muted-foreground">
                            <p><strong>Personal Information:</strong></p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>Name, email address, phone number</li>
                                <li>Account credentials (password is encrypted)</li>
                                <li>Delivery address and contact details</li>
                                <li>Payment information (processed securely through Razorpay)</li>
                            </ul>

                            <p className="mt-4"><strong>Automatically Collected Information:</strong></p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>IP address, browser type, device information</li>
                                <li>Session data and cookies for authentication</li>
                                <li>Usage data and analytics</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">2. How We Use Your Information</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>To provide and manage our AI services</li>
                            <li>To process orders and payments</li>
                            <li>To communicate with you about orders and services</li>
                            <li>To improve our services and user experience</li>
                            <li>To comply with legal obligations</li>
                            <li>To send promotional offers (with your consent)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">3. Data Sharing and Disclosure</h2>
                        <div className="space-y-3 text-muted-foreground">
                            <p>We may share your information with:</p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li><strong>Payment Processors:</strong> Razorpay (RBI-approved) for secure payment processing</li>
                                <li><strong>Service Providers:</strong> Third-party vendors who assist in service delivery</li>
                                <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
                            </ul>
                            <p className="mt-3">We do NOT sell your personal data to third parties.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">4. Data Security</h2>
                        <p className="text-muted-foreground">
                            We implement industry-standard security measures including SSL encryption, secure password hashing (bcrypt), and secure session management. Payment data is handled by PCI DSS compliant Razorpay and is never stored on our servers.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">5. Your Rights Under DPDP Act 2023</h2>
                        <div className="space-y-2 text-muted-foreground">
                            <p>You have the right to:</p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li><strong>Access:</strong> Request a copy of your personal data</li>
                                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                                <li><strong>Erasure:</strong> Request deletion of your data</li>
                                <li><strong>Withdraw Consent:</strong> Opt-out of marketing communications</li>
                                <li><strong>Grievance:</strong> File a complaint with the Data Protection Board of India</li>
                            </ul>
                            <p className="mt-3">
                                To exercise these rights, contact us at: <strong>hello@sagedo.in</strong>
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">6. Cookies</h2>
                        <p className="text-muted-foreground">
                            We use essential cookies for authentication and session management. These are necessary for our services to function. We do not use tracking or advertising cookies without your consent.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">7. Data Retention</h2>
                        <p className="text-muted-foreground">
                            We retain your personal data only as long as necessary to provide services, comply with legal obligations, and resolve disputes. Account data is deleted upon your request or after 3 years of inactivity.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">8. Children's Privacy</h2>
                        <p className="text-muted-foreground">
                            Our services are not intended for individuals under 18 years of age. We do not knowingly collect data from children.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">9. Changes to This Policy</h2>
                        <p className="text-muted-foreground">
                            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">10. Grievance Officer (DPDP Act 2023)</h2>
                        <div className="text-muted-foreground">
                            <p className="mb-3">
                                In compliance with the Digital Personal Data Protection Act, 2023, we have appointed a Grievance Officer to address data privacy concerns:
                            </p>
                            <div className="bg-accent/20 p-4 rounded-lg space-y-2 mb-3">
                                <p><strong>Name:</strong> SAGE DO Support Team</p>
                                <p><strong>Email:</strong> hello@sagedo.in</p>
                                <p><strong>Phone:</strong> +91 6284925684</p>
                                <p><strong>Response Time:</strong> Within 24-48 hours</p>
                            </div>
                            <p>
                                For detailed grievance filing process, visit our <a href="/grievance-officer" className="text-primary hover:underline">Grievance Officer page</a>.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">11. Contact Us</h2>
                        <div className="text-muted-foreground">
                            <p>For privacy-related questions or concerns:</p>
                            <ul className="list-none space-y-1 mt-2">
                                <li><strong>Email:</strong> hello@sagedo.in</li>
                                <li><strong>Phone:</strong> +91 6284925684</li>
                                <li><strong>WhatsApp:</strong> https://wa.me/916284925684</li>
                            </ul>
                        </div>
                    </section>

                    <section className="border-t pt-6 mt-6">
                        <p className="text-sm text-muted-foreground italic">
                            This Privacy Policy is governed by the laws of India. For complaints under the DPDP Act 2023, you may contact the Data Protection Board of India.
                        </p>
                    </section>
                </Card>
            </div>
        </div>
    );
}
