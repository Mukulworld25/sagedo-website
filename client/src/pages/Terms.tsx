// Terms of Service Page - Legal protection for AI services
import { Card } from "@/components/ui/card";
import { Shield, FileText, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function Terms() {
    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-4">
                        <div className="p-4 rounded-full bg-primary/10">
                            <Shield className="w-12 h-12 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">
                        Terms of Service
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Last updated: December 2024
                    </p>
                </div>

                {/* Introduction */}
                <Card className="glass p-8 mb-8">
                    <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                        <FileText className="w-6 h-6 text-primary" />
                        Agreement to Terms
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        By accessing or using SAGE DO AI services, you agree to be bound by these Terms of Service
                        and all applicable laws and regulations. If you do not agree with any of these terms,
                        you are prohibited from using or accessing this service.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        SAGE DO AI provides artificial intelligence-powered services including but not limited to:
                        content creation, resume optimization, ad copy generation, presentation design, research assistance,
                        and other professional services.
                    </p>
                </Card>

                {/* AI Services Disclaimer - CRITICAL */}
                <Card className="glass p-8 mb-8 border-2 border-amber-500/50 bg-amber-500/5">
                    <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-6 h-6 text-amber-500" />
                        AI Services Disclaimer
                    </h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                        <p>
                            The services provided by <span className="text-foreground font-semibold">SAGE DO</span> utilize
                            artificial intelligence technologies, including Large Language Models (LLMs).
                            <span className="text-foreground font-medium"> You acknowledge that these technologies are
                                probabilistic and may produce inaccurate, offensive, biased, or otherwise erroneous
                                outputs ("Hallucinations").</span>
                        </p>
                        <p>
                            All AI-generated outputs, including but not limited to code, text, resumes, and strategies,
                            are provided <span className="text-foreground font-semibold">"as-is"</span> without warranty
                            of any kind, express or implied. SAGE DO does not guarantee the accuracy, completeness,
                            or reliability of any AI-generated content.
                        </p>
                        <p className="text-foreground font-semibold bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
                            ⚠️ You act on AI-generated advice strictly at your own risk.
                        </p>
                    </div>
                </Card>

                {/* Human-in-the-Loop Clause - CRITICAL */}
                <Card className="glass p-8 mb-8 border-2 border-primary/50 bg-primary/5">
                    <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-6 h-6 text-primary" />
                        Client Responsibility for Verification
                    </h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                        <p>
                            The Client acknowledges and agrees that they are <span className="text-foreground font-semibold">
                                solely responsible for the human review and verification</span> of all AI-generated deliverables
                            before any public dissemination, commercial use, or reliance upon such materials.
                        </p>
                        <p className="text-foreground font-semibold bg-primary/10 p-4 rounded-lg border border-primary/30">
                            SAGE DO shall not be liable for any losses or damages arising from the Client's failure
                            to verify the accuracy of the deliverables.
                        </p>
                        <p>
                            This includes but is not limited to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Reviewing all content for factual accuracy</li>
                            <li>Verifying code functionality before deployment</li>
                            <li>Checking resume/CV information before submission</li>
                            <li>Validating business strategies before implementation</li>
                            <li>Proofreading all generated text before publication</li>
                        </ul>
                    </div>
                </Card>

                {/* Service Terms */}
                <Card className="glass p-8 mb-8">
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                        Service Terms
                    </h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                        <h3 className="text-lg font-semibold text-foreground">Payment & Refunds</h3>
                        <p>
                            All payments are processed securely through Razorpay. Once a service has been delivered,
                            refunds are at the sole discretion of SAGE DO. We offer satisfaction guarantees on most
                            services and will work with you to resolve any issues.
                        </p>

                        <h3 className="text-lg font-semibold text-foreground mt-6">Delivery Times</h3>
                        <p>
                            Delivery times are estimates and may vary based on complexity and workload.
                            Standard delivery is 24-48 hours for most services. Rush delivery options may be available
                            at additional cost.
                        </p>

                        <h3 className="text-lg font-semibold text-foreground mt-6">Intellectual Property</h3>
                        <p>
                            Upon full payment, you receive full rights to use the AI-generated deliverables for
                            your personal or commercial purposes. SAGE DO retains the right to use anonymized
                            examples for portfolio and training purposes.
                        </p>

                        <h3 className="text-lg font-semibold text-foreground mt-6">Prohibited Uses</h3>
                        <p>
                            You may not use our services to create content that is illegal, harmful, threatening,
                            abusive, defamatory, or otherwise objectionable. We reserve the right to refuse service
                            to anyone for any reason.
                        </p>
                    </div>
                </Card>

                {/* Limitation of Liability */}
                <Card className="glass p-8 mb-8">
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                        Limitation of Liability
                    </h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                        <p>
                            In no event shall SAGE DO, its directors, employees, partners, agents, suppliers,
                            or affiliates be liable for any indirect, incidental, special, consequential, or
                            punitive damages, including without limitation, loss of profits, data, use, goodwill,
                            or other intangible losses.
                        </p>
                        <p>
                            Our maximum liability for any claim arising out of or relating to these terms or our
                            services shall be limited to the amount paid by you for the specific service in question.
                        </p>
                    </div>
                </Card>

                {/* Contact */}
                <Card className="glass p-8 text-center">
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                        Questions About These Terms?
                    </h2>
                    <p className="text-muted-foreground mb-4">
                        If you have any questions about these Terms of Service, please contact us:
                    </p>
                    <a
                        href="mailto:sagedoai@gmail.com"
                        className="text-primary hover:underline font-semibold"
                    >
                        sagedoai@gmail.com
                    </a>
                </Card>
            </div>
        </div>
    );
}
