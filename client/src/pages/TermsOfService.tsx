import { Card } from "@/components/ui/card";

export default function TermsOfService() {
    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-black text-foreground mb-8">Terms of Service</h1>

                <Card className="glass p-8 space-y-6">
                    <section>
                        <p className="text-sm text-muted-foreground mb-4">
                            Last Updated: November 22, 2025
                        </p>
                        <p className="text-muted-foreground">
                            Welcome to SAGE DO. By accessing or using our website and services, you agree to be bound by these Terms of Service. Please read them carefully.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">1. Acceptance of Terms</h2>
                        <p className="text-muted-foreground">
                            By creating an account or using our services, you accept and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">2. Services Offered</h2>
                        <p className="text-muted-foreground mb-3">
                            SAGE DO provides AI-powered services including but not limited to:
                        </p>
                        <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                            <li>Content creation (ad copies, presentations, documents)</li>
                            <li>Design services (graphics, posters, resumes)</li>
                            <li>Photo and video editing</li>
                            <li>Business automation solutions</li>
                            <li>Other AI-powered digital services as offered</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">3. User Accounts</h2>
                        <div className="space-y-3 text-muted-foreground">
                            <p><strong>Registration:</strong> You must provide accurate information when creating an account.</p>
                            <p><strong>Security:</strong> You are responsible for maintaining the confidentiality of your account credentials.</p>
                            <p><strong>Eligibility:</strong> You must be at least 18 years old to use our services.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">4. Payment Terms</h2>
                        <div className="space-y-3 text-muted-foreground">
                            <ul className="list-disc pl-6 space-y-2">
                                <li>All prices are in Indian Rupees (₹) and inclusive of applicable taxes</li>
                                <li>Payments are processed securely through Razorpay (RBI-approved gateway)</li>
                                <li>We do not store your payment card information</li>
                                <li>Payment is required before service delivery unless otherwise agreed</li>
                                <li>Failed payments may take 5-7 business days to refund per RBI guidelines</li>
                                <li>For refunds, please refer to our Refund Policy</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">5. Service Delivery</h2>
                        <div className="space-y-3 text-muted-foreground">
                            <p>Services are delivered digitally via email or download link within the timeframe specified for each service.</p>
                            <p>Delivery times are estimates and may vary based on service complexity and order volume.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">6. Intellectual Property</h2>
                        <div className="space-y-3 text-muted-foreground">
                            <p><strong>Our Content:</strong> All content, trademarks, and intellectual property on this website are owned by SAGE DO.</p>
                            <p><strong>Your Content:</strong> You retain ownership of content you provide to us. By using our services, you grant us a license to use your content to deliver the requested services.</p>
                            <p><strong>Deliverables:</strong> Upon full payment, you receive the rights to use the deliverables for your stated purpose.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">7. Prohibited Uses</h2>
                        <p className="text-muted-foreground mb-3">You agree NOT to:</p>
                        <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                            <li>Use services for illegal or unauthorized purposes</li>
                            <li>Violate any laws or regulations</li>
                            <li>Infringe on intellectual property rights of others</li>
                            <li>Upload malicious content or viruses</li>
                            <li>Attempt to gain unauthorized access to our systems</li>
                            <li>Resell or redistribute our services without permission</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">8. Warranties and Disclaimers</h2>
                        <div className="space-y-3 text-muted-foreground">
                            <p>We strive to provide high-quality services but make no warranties of:</p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>Uninterrupted or error-free service</li>
                                <li>Specific results or outcomes</li>
                                <li>Accuracy of AI-generated content</li>
                            </ul>
                            <p className="mt-3">Services are provided "as is" and "as available."</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">9. Limitation of Liability</h2>
                        <p className="text-muted-foreground">
                            SAGE DO shall not be liable for any indirect, incidental, special, or consequential damages arising from the use or inability to use our services. Our total liability shall not exceed the amount paid by you for the specific service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">10. Service Modifications</h2>
                        <p className="text-muted-foreground">
                            We reserve the right to modify, suspend, or discontinue any service with or without notice. We will not be liable for any modification, suspension, or discontinuation.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">11. Account Termination</h2>
                        <p className="text-muted-foreground">
                            We may terminate or suspend your account immediately, without prior notice, for violation of these Terms. You may delete your account at any time by contacting us.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">12. Governing Law and Dispute Resolution</h2>
                        <div className="space-y-3 text-muted-foreground">
                            <p><strong>Governing Law:</strong> These Terms are governed by the laws of India.</p>
                            <p><strong>Jurisdiction:</strong> Any disputes shall be subject to the exclusive jurisdiction of the courts of India.</p>
                            <p><strong>Dispute Resolution:</strong> We encourage amicable resolution. Contact our grievance officer first before legal action.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">13. Changes to Terms</h2>
                        <p className="text-muted-foreground">
                            We reserve the right to update these Terms at any time. Changes will be effective immediately upon posting. Continued use of services constitutes acceptance of modified Terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">14. Contact Information</h2>
                        <div className="text-muted-foreground">
                            <p>For questions about these Terms:</p>
                            <ul className="list-none space-y-1 mt-2">
                                <li><strong>Email:</strong> sagedoai00@gmail.com</li>
                                <li><strong>Phone:</strong> +91 7018709291</li>
                                <li><strong>WhatsApp:</strong> https://wa.me/917018709291</li>
                            </ul>
                        </div>
                    </section>

                    <section className="border-t pt-6 mt-6">
                        <p className="text-sm text-muted-foreground italic">
                            By using SAGE DO services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                        </p>
                    </section>
                </Card>
            </div>
        </div>
    );
}
