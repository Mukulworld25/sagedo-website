import { Card } from "@/components/ui/card";

export default function GrievanceOfficer() {
    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-black text-foreground mb-8">Grievance Officer</h1>

                <Card className="glass p-8 space-y-6">
                    <section>
                        <p className="text-muted-foreground mb-6">
                            In compliance with the Digital Personal Data Protection Act, 2023 (DPDP Act) and Information Technology Act, 2000, SAGE DO has appointed a Grievance Officer to address concerns related to data privacy, content, and user experience.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Grievance Officer Details</h2>
                        <div className="bg-accent/20 p-6 rounded-lg space-y-3">
                            <div>
                                <p className="text-sm text-muted-foreground">Name</p>
                                <p className="text-lg font-semibold text-foreground">SAGE DO Support Team</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Email</p>
                                <p className="text-lg font-semibold text-foreground">support@sagedo.in</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Phone</p>
                                <p className="text-lg font-semibold text-foreground">+91 7018709291</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">WhatsApp</p>
                                <p className="text-lg font-semibold text-foreground">
                                    <a href="https://wa.me/917018709291" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                                        +91 7018709291
                                    </a>
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Response Time</p>
                                <p className="text-lg font-semibold text-foreground">Within 24-48 hours</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">How to File a Grievance</h2>
                        <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                            <li>Send a detailed email to <strong>support@sagedo.in</strong> with subject line "Grievance - [Your Issue]"</li>
                            <li>Include your registered email, phone number, and a clear description of the issue</li>
                            <li>Attach any relevant documents or screenshots</li>
                            <li>Our Grievance Officer will acknowledge your complaint within 24 hours</li>
                            <li>We aim to resolve all grievances within 15 working days</li>
                        </ol>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">Types of Grievances</h2>
                        <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                            <li>Data privacy concerns or unauthorized use of personal data</li>
                            <li>Request for data deletion or correction (DPDP Act rights)</li>
                            <li>Service quality issues or refund disputes</li>
                            <li>Complaints about content or communication</li>
                            <li>Security or fraud concerns</li>
                            <li>Technical issues affecting service access</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-3">Escalation Process</h2>
                        <p className="text-muted-foreground mb-3">
                            If you are not satisfied with the resolution provided by our Grievance Officer:
                        </p>
                        <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                            <li>Request escalation by replying to the resolution email</li>
                            <li>Your case will be reviewed by senior management within 7 working days</li>
                            <li>If still unresolved, you may file a complaint with the Data Protection Board of India (for data privacy issues) or the Consumer Protection Authority (for service disputes)</li>
                        </ol>
                    </section>

                    <section className="border-t pt-6 mt-6">
                        <p className="text-sm text-muted-foreground italic">
                            This Grievance Redressal Mechanism is established in accordance with the Digital Personal Data Protection Act, 2023 and Rule 3(11) of the Information Technology (Intermediaries Guidelines) Rules, 2011.
                        </p>
                    </section>
                </Card>
            </div>
        </div>
    );
}
