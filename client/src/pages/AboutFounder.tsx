import { Helmet } from 'react-helmet-async';

export default function AboutFounder() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>Mukul Dhiman — Founder of SAGEDO | Ex-Tata Lockheed Martin</title>
        <meta name="description" content="Mukul Dhiman is the founder of SAGEDO, India's First AI + Human Hybrid Execution Team. Ex-aerospace engineer from Tata Lockheed Martin, building in Chandigarh." />
      </Helmet>

      <div className="max-w-3xl mx-auto px-6 py-20">
        <div className="mb-10">
          <span className="text-red-500 text-sm font-semibold uppercase tracking-widest">Founder</span>
          <h1 className="text-4xl font-bold mt-3 mb-4">Mukul Dhiman</h1>
          <p className="text-gray-400 text-lg">Founder, SAGEDO &mdash; India's First AI + Human Hybrid Execution Team</p>
        </div>

        <div className="space-y-6 text-gray-300 leading-relaxed">
          <p>
            I am an aerospace engineer who spent years at Tata Lockheed Martin working on defence systems. 
            Precision, execution, zero tolerance for failure — that was the culture I came from.
          </p>
          <p>
            I left to build SAGEDO because I kept watching Indian founders with brilliant ideas fail at execution. 
            Not strategy. Not funding. Execution. The daily grind of websites, SEO, automation, 
            and digital presence that nobody wants to do but everyone needs done.
          </p>
          <p>
            SAGEDO is my answer to that problem. AI speed + human quality. 
            Results in 24-48 hours. Startup-friendly pricing.
          </p>
          <p>
            Based in Chandigarh. Building in public.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <a href="https://x.com/dhiman_muk17135" target="_blank" rel="noopener noreferrer"
            className="px-5 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition">
            Twitter / X
          </a>
          <a href="https://github.com/Mukulworld25" target="_blank" rel="noopener noreferrer"
            className="px-5 py-2 border border-gray-600 text-gray-300 rounded hover:bg-gray-800 transition">
            GitHub
          </a>
          <a href="/" 
            className="px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
            Visit SAGEDO
          </a>
        </div>
      </div>
    </div>
  );
}
