import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Gift, Copy, Share2, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Refer() {
    const [referrerName, setReferrerName] = useState('');
    const [copied, setCopied] = useState(false);

    const referralLink = referrerName.trim()
        ? `https://sagedo.in/free-audit?ref=${encodeURIComponent(referrerName.trim().toLowerCase().replace(/\s+/g, '-'))}`
        : '';

    const handleCopy = () => {
        if (referralLink) {
            navigator.clipboard.writeText(referralLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleShare = () => {
        if (referralLink && navigator.share) {
            navigator.share({
                title: 'SAGEDO — Free AI Business Audit',
                text: 'Get a free AI audit for your business from SAGEDO — India\'s first AI + Human execution team.',
                url: referralLink,
            });
        }
    };

    return (
        <>
            <Helmet>
                <title>Refer a Founder — Earn ₹500 Credit | SAGEDO</title>
                <meta name="description" content="Know a founder who needs SAGEDO? Refer them and earn ₹500 credit on your next order when they become a client." />
            </Helmet>

            <div className="min-h-screen bg-background py-20 px-4">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary/20 to-green-500/20 flex items-center justify-center">
                            <Gift className="w-10 h-10 text-primary" />
                        </div>
                        <h1 className="text-4xl font-bold text-foreground mb-3">
                            Refer a Founder, Earn ₹500
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Know someone who needs SAGEDO? Share your unique link and earn ₹500 credit when they become a client.
                        </p>
                    </div>

                    {/* How it works */}
                    <div className="grid gap-4 mb-12">
                        {[
                            { step: "1", title: "Generate your link", desc: "Enter your name below to create your unique referral URL" },
                            { step: "2", title: "Share with founders", desc: "Send your link to founders, friends, or anyone who needs execution help" },
                            { step: "3", title: "Earn ₹500 credit", desc: "When they become a paying SAGEDO client, you get ₹500 off your next order" },
                        ].map((item) => (
                            <div key={item.step} className="flex gap-4 p-4 rounded-xl bg-card border border-border/50">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <span className="text-primary font-bold">{item.step}</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Link Generator */}
                    <div className="p-8 rounded-2xl bg-card border border-border/50">
                        <h2 className="text-xl font-bold text-foreground mb-4">Generate Your Referral Link</h2>
                        <div className="space-y-4">
                            <Input
                                placeholder="Enter your name (e.g. Ravi Kumar)"
                                value={referrerName}
                                onChange={(e) => setReferrerName(e.target.value)}
                                className="bg-background"
                            />
                            {referralLink && (
                                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 flex items-center gap-2">
                                    <code className="text-sm text-primary flex-1 break-all">{referralLink}</code>
                                    <button onClick={handleCopy} className="p-2 hover:bg-primary/10 rounded-lg transition-colors">
                                        {copied ? <CheckCircle className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-muted-foreground" />}
                                    </button>
                                </div>
                            )}
                            <div className="flex gap-3">
                                <Button
                                    className="flex-1 bg-gradient-to-r from-primary to-destructive hover:opacity-90"
                                    onClick={handleCopy}
                                    disabled={!referralLink}
                                >
                                    <Copy className="w-4 h-4 mr-2" /> {copied ? 'Copied!' : 'Copy Link'}
                                </Button>
                                <Button variant="outline" onClick={handleShare} disabled={!referralLink}>
                                    <Share2 className="w-4 h-4 mr-2" /> Share
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* WhatsApp share */}
                    {referralLink && (
                        <div className="mt-6 text-center">
                            <a
                                href={`https://wa.me/?text=${encodeURIComponent(`Hey! I've been working with SAGEDO — India's first AI + Human execution team. They're amazing for websites, automation, and marketing.\n\nGet a FREE AI audit for your business: ${referralLink}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors"
                            >
                                Share on WhatsApp <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
