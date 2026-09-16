import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Briefcase, CheckCircle, ArrowRight, Code, Video, TrendingUp, Cpu, Sparkles, Globe } from 'lucide-react';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

const openRoles = [
  {
    title: 'AI Developer',
    type: 'Full-time / Remote',
    icon: Code,
    description: 'Build and ship production-ready web apps, client portals, and AI interfaces using React, TypeScript, Node.js, and LLM APIs. Focus on rapid delivery, clean architecture, and seamless integrations.',
  },
  {
    title: 'AI Video Editor & Motion Designer',
    type: 'Contract / Remote',
    icon: Video,
    description: 'Produce high-retention short-form and long-form video content leveraging modern AI generative tools, Premiere, and After Effects. Transform rough creative briefs into polished, scroll-stopping narratives.',
  },
  {
    title: 'AI Business Development Executive',
    type: 'Full-time / Remote',
    icon: TrendingUp,
    description: 'Identify and engage prospective B2B clients, qualify inbound founder inquiries, and articulate SAGEDO\'s hybrid execution value. Lead discovery consultations and drive high-ticket deal closings.',
  },
  {
    title: 'AI Systems Engineer',
    type: 'Full-time / Remote',
    icon: Cpu,
    description: 'Architect autonomous agent pipelines, vector search / RAG systems, and telephony voice infrastructure. Connect foundational AI models with robust production backends and enterprise APIs.',
  },
  {
    title: 'AI Operations Generalist',
    type: 'Full-time / Remote',
    icon: Sparkles,
    description: 'Master multi-modal AI tools to execute diverse deliverables across research, asset generation, prompt chaining, and QA. Bridge the gap between engineering and creative workflows with zero friction.',
  },
  {
    title: 'AI Content Strategist',
    type: 'Full-time / Remote',
    icon: Globe,
    description: 'Design and execute high-ranking SEO strategies, B2B technical articles, and programmatic content engines. Combine AI-assisted research with sharp human editorial judgment to scale organic reach.',
  },
];

const Careers = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    linkedin: '',
    portfolio: '',
    role: '',
    experience: '',
    whySagedo: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error('Application submission error:', error);
    }

    // Also send a WhatsApp notification
    const message = encodeURIComponent(
      `New Job Application via sagedo.in/careers\n\n` +
      `Name: ${formData.name}\n` +
      `Role: ${formData.role}\n` +
      `Experience: ${formData.experience}\n` +
      `LinkedIn: ${formData.linkedin}\n` +
      `Portfolio: ${formData.portfolio}\n` +
      `Why SAGE DO: ${formData.whySagedo}`
    );
    window.open(`https://wa.me/916284925684?text=${message}`, '_blank');

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Helmet>
        <title>Careers at SAGEDO — Join India's First AI + Human Execution Team</title>
        <meta name="description" content="Join SAGE DO and work at the intersection of AI and human execution. Open roles in AI development, video editing, business development, systems engineering, operations, and content strategy. Remote-first, founder-led." />
      </Helmet>

      <main className="min-h-screen bg-[#09090b] text-white pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">

          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 mb-6">
              <Briefcase className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-violet-300 font-medium">We're Hiring</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-violet-100 to-cyan-300 bg-clip-text text-transparent">
              Build the Future of Execution
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              SAGE DO isn't just another agency. We're building India's first AI + Human hybrid execution engine. 
              If you want to ship real work for real businesses — not sit in meetings — this is your place.
            </p>
          </div>

          {/* Why Join */}
          <div className="grid md:grid-cols-3 gap-4 mb-16">
            {[
              { title: 'Founder-Led', desc: 'Work directly with Mukul. No middle management, no red tape.', gradient: 'from-rose-500/10 to-orange-500/10', border: 'border-rose-500/20' },
              { title: 'Remote-First', desc: 'Work from anywhere in India. Results matter, not your location.', gradient: 'from-emerald-500/10 to-teal-500/10', border: 'border-emerald-500/20' },
              { title: 'Real Impact', desc: "Every project ships. You'll see your work live within 48 hours.", gradient: 'from-violet-500/10 to-blue-500/10', border: 'border-violet-500/20' },
            ].map((item, i) => (
              <RevealOnScroll key={i} delay={i * 75}>
                <div className={`bg-gradient-to-br ${item.gradient} border ${item.border} rounded-2xl p-6 h-full`}>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-zinc-400">{item.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* Open Roles */}
          <div className="mb-16">
            <RevealOnScroll>
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Open Positions</h2>
            </RevealOnScroll>
            <div className="grid md:grid-cols-2 gap-4">
              {openRoles.map((role, i) => (
                <RevealOnScroll key={i} delay={i * 50}>
                  <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 hover:border-violet-500/30 transition-colors h-full">
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 bg-violet-500/10 rounded-xl">
                        <role.icon className="w-5 h-5 text-violet-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-white">{role.title}</h3>
                        <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full">{role.type}</span>
                        <p className="text-sm text-zinc-400 mt-2">{role.description}</p>
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>

          {/* Application Form */}
          <RevealOnScroll delay={100} className="max-w-2xl mx-auto">
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 md:p-8">
              {isSuccess ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Application Received!</h3>
                  <p className="text-zinc-400 mb-6">
                    Mukul will personally review your application and get back to you within 48 hours via WhatsApp.
                  </p>
                  <Button onClick={() => setIsSuccess(false)} variant="outline">
                    Submit Another Application
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-xl font-bold text-white mb-1">Apply Now</h2>
                  <p className="text-sm text-zinc-500 mb-4">Don't see your role? Apply anyway — we're always looking for exceptional people.</p>

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
                      <label className="text-sm font-medium text-zinc-300">Role You're Applying For *</label>
                      <select
                        name="role" value={formData.role} onChange={handleChange} required
                        className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                      >
                        <option value="">Select a role</option>
                        {openRoles.map((role) => (
                          <option key={role.title} value={role.title}>{role.title}</option>
                        ))}
                        <option value="Other">Other (specify in message)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-zinc-300">LinkedIn URL</label>
                      <Input
                        name="linkedin" value={formData.linkedin} onChange={handleChange}
                        placeholder="https://linkedin.com/in/..." className="mt-1 bg-zinc-800/50 border-zinc-700"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-zinc-300">Portfolio / GitHub URL</label>
                      <Input
                        name="portfolio" value={formData.portfolio} onChange={handleChange}
                        placeholder="https://..." className="mt-1 bg-zinc-800/50 border-zinc-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-zinc-300">Years of Experience *</label>
                    <select
                      name="experience" value={formData.experience} onChange={handleChange} required
                      className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                    >
                      <option value="">Select experience</option>
                      <option value="0-1 years (Fresher)">0-1 years (Fresher)</option>
                      <option value="1-3 years">1-3 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="5+ years">5+ years</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-zinc-300">Why SAGE DO? *</label>
                    <Textarea
                      name="whySagedo" value={formData.whySagedo} onChange={handleChange}
                      placeholder="What excites you about working here? What can you bring to the team?"
                      required rows={3} className="mt-1 bg-zinc-800/50 border-zinc-700"
                    />
                  </div>

                  <Button
                    type="submit" disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 text-white font-semibold py-6 text-base"
                  >
                    {isSubmitting ? 'Submitting...' : (
                      <>Submit Application <ArrowRight className="w-4 h-4 ml-2" /></>
                    )}
                  </Button>

                  <p className="text-xs text-zinc-600 text-center">
                    By applying, you consent to us storing your information per our <a href="/privacy-policy" className="underline text-zinc-500">Privacy Policy</a>.
                  </p>
                </form>
              )}
            </div>
          </RevealOnScroll>
        </div>
      </main>
    </>
  );
};

export default Careers;
