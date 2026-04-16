import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, Phone, CheckCircle, ArrowRight, MessageCircle, Zap, Shield, Star } from 'lucide-react';

const timeSlots = [
  '10:00 AM - 10:30 AM',
  '11:00 AM - 11:30 AM',
  '12:00 PM - 12:30 PM',
  '2:00 PM - 2:30 PM',
  '3:00 PM - 3:30 PM',
  '4:00 PM - 4:30 PM',
  '5:00 PM - 5:30 PM',
  '7:00 PM - 7:30 PM',
];

const BookCall = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    businessName: '',
    businessType: '',
    preferredDate: '',
    preferredTime: '',
    challenge: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send to backend
      await fetch('/api/book-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error('Booking submission error:', error);
    }

    // Always redirect to WhatsApp with booking context
    const message = encodeURIComponent(
      `Hi Mukul! I just booked a strategy call on sagedo.in.\n\n` +
      `Name: ${formData.name}\n` +
      `Business: ${formData.businessName}\n` +
      `Preferred Date: ${formData.preferredDate}\n` +
      `Preferred Time: ${formData.preferredTime}\n` +
      `Challenge: ${formData.challenge}\n\n` +
      `Looking forward to connecting!`
    );
    window.open(`https://wa.me/916284925684?text=${message}`, '_blank');

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Get tomorrow's date as minimum selectable date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <>
      <Helmet>
        <title>Book a Free Strategy Call — SAGEDO | Talk to the Founder</title>
        <meta name="description" content="Book a free 30-minute strategy call with Mukul Dhiman, founder of SAGEDO. Discuss your business challenges and get a tailored execution roadmap. No sales pitch." />
      </Helmet>

      <main className="min-h-screen bg-[#09090b] text-white pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">

          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500/10 to-amber-500/10 border border-rose-500/20 rounded-full px-4 py-1.5 mb-6">
              <Phone className="w-4 h-4 text-rose-400" />
              <span className="text-sm text-rose-300 font-medium">Free • No Obligation • 30 Minutes</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-rose-100 to-rose-300 bg-clip-text text-transparent">
              Book a Strategy Call with the Founder
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Talk directly to Mukul Dhiman — ex-Tata Lockheed Martin engineer turned AI builder. 
              Get a brutally honest assessment of where your business stands digitally and exactly what to fix first.
            </p>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto">
            {[
              { icon: Zap, label: '24-Hour Response', color: 'text-amber-400' },
              { icon: Shield, label: 'Zero Sales Pitch', color: 'text-emerald-400' },
              { icon: Star, label: '67+ Projects Done', color: 'text-rose-400' },
              { icon: MessageCircle, label: 'WhatsApp Follow-up', color: 'text-blue-400' },
            ].map((badge, i) => (
              <div key={i} className="flex flex-col items-center gap-2 bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
                <badge.icon className={`w-5 h-5 ${badge.color}`} />
                <span className="text-xs text-zinc-400 text-center">{badge.label}</span>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Left: What to Expect */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4 text-white">What You'll Get</h2>
                <div className="space-y-4">
                  {[
                    { title: '5-Point Digital Health Check', desc: 'Website, SEO, social, automation, lead capture — scored honestly.' },
                    { title: 'Custom Execution Roadmap', desc: 'Exactly what to build first, how long it takes, and what it costs.' },
                    { title: 'Competitor Analysis', desc: 'Quick scan of your top 3 competitors and where you can beat them.' },
                    { title: 'No-BS Pricing', desc: 'Transparent quote on the spot — no "let me get back to you" games.' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-white text-sm">{item.title}</p>
                        <p className="text-xs text-zinc-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-rose-500/10 to-amber-500/10 border border-rose-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                </div>
                <p className="text-sm text-zinc-300 italic mb-3">
                  "I was skeptical about a free call but Mukul gave me more actionable advice in 30 minutes than my agency did in 3 months. We signed up for the Full Launch the same week."
                </p>
                <p className="text-xs text-zinc-500">— Startup Founder, Delhi</p>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3">
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 md:p-8">
                {isSuccess ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Call Booked!</h3>
                    <p className="text-zinc-400 mb-6">
                      You'll receive a WhatsApp confirmation within 2 hours. Mukul will personally reach out to confirm the exact time.
                    </p>
                    <Button
                      onClick={() => window.open('https://wa.me/916284925684', '_blank')}
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" /> Chat on WhatsApp Now
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h2 className="text-xl font-bold text-white mb-1">Pick Your Slot</h2>
                    <p className="text-sm text-zinc-500 mb-4">All fields marked * are required</p>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-zinc-300">Full Name *</label>
                        <Input
                          name="name" value={formData.name} onChange={handleChange}
                          placeholder="Your name" required className="mt-1 bg-zinc-800/50 border-zinc-700"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-zinc-300">WhatsApp Number *</label>
                        <Input
                          name="whatsapp" value={formData.whatsapp} onChange={handleChange}
                          placeholder="+91 XXXXX XXXXX" required className="mt-1 bg-zinc-800/50 border-zinc-700"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-zinc-300">Email *</label>
                        <Input
                          name="email" type="email" value={formData.email} onChange={handleChange}
                          placeholder="you@example.com" required className="mt-1 bg-zinc-800/50 border-zinc-700"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-zinc-300">Business Name</label>
                        <Input
                          name="businessName" value={formData.businessName} onChange={handleChange}
                          placeholder="Your company/brand" className="mt-1 bg-zinc-800/50 border-zinc-700"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-zinc-300">What does your business do? *</label>
                      <Input
                        name="businessType" value={formData.businessType} onChange={handleChange}
                        placeholder="e.g., E-commerce, SaaS, Restaurant, Coaching..." required
                        className="mt-1 bg-zinc-800/50 border-zinc-700"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-zinc-300 flex items-center gap-1">
                          <Calendar className="w-4 h-4" /> Preferred Date *
                        </label>
                        <Input
                          name="preferredDate" type="date" value={formData.preferredDate}
                          onChange={handleChange} min={minDate} required
                          className="mt-1 bg-zinc-800/50 border-zinc-700"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-zinc-300 flex items-center gap-1">
                          <Clock className="w-4 h-4" /> Preferred Time *
                        </label>
                        <select
                          name="preferredTime" value={formData.preferredTime} onChange={handleChange}
                          required
                          className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                        >
                          <option value="" className="text-zinc-500">Select a time slot</option>
                          {timeSlots.map((slot) => (
                            <option key={slot} value={slot} className="text-white">{slot}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-zinc-300">What's your biggest challenge right now? *</label>
                      <Textarea
                        name="challenge" value={formData.challenge} onChange={handleChange}
                        placeholder="e.g., No one finds my business on Google, need a website, want to automate sales..."
                        required rows={3} className="mt-1 bg-zinc-800/50 border-zinc-700"
                      />
                    </div>

                    <Button
                      type="submit" disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-semibold py-6 text-base"
                    >
                      {isSubmitting ? 'Booking...' : (
                        <>Book My Free Call <ArrowRight className="w-4 h-4 ml-2" /></>
                      )}
                    </Button>

                    <p className="text-xs text-zinc-600 text-center">
                      By booking, you agree to our <a href="/privacy-policy" className="underline text-zinc-500">Privacy Policy</a>. 
                      We'll never spam you.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default BookCall;
