import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Shield, Zap, MessageCircle, Lock, Users, ArrowRight, Clock, Layers } from 'lucide-react';

export default function AgencyPartner() {
  return (
    <>
      <Helmet>
        <title>White-Label Agency Partner Program | SAGE DO</title>
        <meta name="description" content="Partner with SAGE DO as your white-label AI development arm. We build websites, apps, and AI solutions under your brand. NDA-protected, 48-hour delivery, wholesale pricing." />
      </Helmet>

      <main className="min-h-screen bg-[#09090b] text-white pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">

          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              Agency Partnership Program
            </div>

            <h1 className="text-4xl lg:text-6xl font-black leading-tight mb-6">
              We Build It.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
                You Brand It.
              </span>
            </h1>

            <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
              Scale your agency's tech capabilities without hiring developers. We work behind the scenes — your client never knows we exist.
            </p>

            <a
              href="https://wa.me/916284925684?text=Hi%20Mukul!%20I%20run%20an%20agency%20and%20I'm%20interested%20in%20your%20white-label%20partnership%20program."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="h-14 px-8 text-lg font-semibold bg-blue-600 hover:bg-blue-500 rounded-xl gap-2">
                <MessageCircle className="w-5 h-5" />
                Discuss Partnership on WhatsApp
              </Button>
            </a>
          </div>

          {/* How It Works */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">How the Partnership Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">1. You Send the Brief</h3>
                <p className="text-zinc-400">Forward your client's requirements to us via WhatsApp or email. We sign an NDA before we see anything.</p>
              </div>

              <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">2. We Build It</h3>
                <p className="text-zinc-400">Our AI + Human team delivers the project in 48 hours to 15 days depending on complexity. Zero branding — fully white-label.</p>
              </div>

              <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                  <Layers className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">3. You Deliver & Bill</h3>
                <p className="text-zinc-400">Present it to your client under your brand. Mark it up 200-300%. We stay invisible. You keep the relationship.</p>
              </div>
            </div>
          </div>

          {/* Why Partner With Us */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Why Agencies Choose Us</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  icon: <Lock className="w-6 h-6 text-blue-400" />,
                  title: "100% NDA Protected",
                  desc: "We sign a mutual NDA before every engagement. Your client will never know we exist. Your brand, your relationship."
                },
                {
                  icon: <Clock className="w-6 h-6 text-cyan-400" />,
                  title: "48-Hour to 15-Day Delivery",
                  desc: "Simple websites in 48 hours. Complex apps in 15 days. We move faster than your internal team ever could."
                },
                {
                  icon: <Shield className="w-6 h-6 text-emerald-400" />,
                  title: "7-Day Bug-Fix Guarantee",
                  desc: "Every deliverable comes with a 7-day technical guarantee. If something breaks, we fix it free — no questions asked."
                },
                {
                  icon: <Users className="w-6 h-6 text-purple-400" />,
                  title: "Wholesale Partner Pricing",
                  desc: "Agency partners get priority pricing below our retail rates. The more volume you send, the better the margins for you."
                }
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                    <p className="text-zinc-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What We Build */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">What We Can Build for Your Clients</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {[
                "Business Websites",
                "Landing Pages",
                "React Native Apps",
                "AI Dashboards",
                "E-Commerce Stores",
                "SEO & Content",
                "Social Media Setup",
                "Custom Automation"
              ].map((service) => (
                <div key={service} className="flex items-center gap-3 p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="font-medium">{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center max-w-2xl mx-auto">
            <div className="p-10 rounded-3xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20">
              <h2 className="text-3xl font-bold mb-4">Ready to Scale Your Agency?</h2>
              <p className="text-zinc-400 mb-8">
                Let's have a 10-minute WhatsApp call. No pitch deck, no formalities — just a founder-to-founder conversation about how we can help you deliver more to your clients.
              </p>
              <a
                href="https://wa.me/916284925684?text=Hi%20Mukul!%20I%20run%20an%20agency%20and%20I'm%20interested%20in%20discussing%20a%20white-label%20partnership."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="h-14 px-8 text-lg font-semibold bg-blue-600 hover:bg-blue-500 rounded-xl gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Start the Conversation
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </a>
              <p className="text-xs text-zinc-500 mt-4">
                Currently partnering with 10+ agencies across India.
              </p>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
