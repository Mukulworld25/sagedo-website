import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { LazyMotion, domAnimation, MotionConfig, m } from 'framer-motion';
import VisibilityHero from '@/components/visibility/VisibilityHero';
import PersonaSwitcher, { type PersonaId } from '@/components/visibility/PersonaSwitcher';
import ArchitectureSection from '@/components/visibility/ArchitectureSection';
import ProofSection from '@/components/visibility/ProofSection';
import ChooserWidget from '@/components/visibility/ChooserWidget';

export default function Visibility() {
  const [activePersona, setActivePersona] = useState<PersonaId>('local_shop');

  const scrollToChooser = (personaId?: PersonaId) => {
    if (personaId) {
      setActivePersona(personaId);
    }
    const element = document.getElementById('chooser');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPersonas = () => {
    const element = document.getElementById('personas');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Modern Search Visibility (SEO + AEO + GEO)',
    description: 'Multi-engine search visibility across Google Maps 3-Pack, Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO).',
    provider: {
      '@type': 'Organization',
      name: 'SAGEDO',
      url: 'https://sagedo.in'
    },
    areaServed: {
      '@type': 'Country',
      name: 'India'
    },
    serviceType: 'Search Engine Optimization & AI Discoverability'
  };

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary">
          <Helmet>
            <title>Modern Search Visibility (SEO + AEO + GEO) | SAGEDO</title>
            <meta
              name="description"
              content="Modern Search Visibility across Google Maps 3-Pack, Perplexity, Claude, ChatGPT Search & Gemini. Dedicated search visibility engines for North India SMBs, shops, manufacturers & clinics."
            />
            <link rel="canonical" href="https://sagedo.in/visibility" />
            <meta property="og:title" content="Modern Search Visibility (SEO + AEO + GEO) | SAGEDO" />
            <meta
              property="og:description"
              content="Modern Search Visibility across Google Maps 3-Pack, Perplexity, Claude, ChatGPT Search & Gemini. Dedicated search visibility engines for North India SMBs, shops, manufacturers & clinics."
            />
            <meta property="og:url" content="https://sagedo.in/visibility" />
            <meta property="og:type" content="website" />
            <script type="application/ld+json">
              {JSON.stringify(serviceJsonLd)}
            </script>
          </Helmet>

          {/* Hero Section */}
          <m.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <VisibilityHero
              onConfigureClick={() => scrollToChooser()}
              onExplorePersonasClick={scrollToPersonas}
            />
          </m.section>

          {/* Target Persona Switcher Section */}
          <m.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <PersonaSwitcher
              activePersona={activePersona}
              onPersonaChange={setActivePersona}
              onConfigureClick={(persona) => scrollToChooser(persona)}
            />
          </m.section>

          {/* Architecture Section */}
          <m.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <ArchitectureSection />
          </m.section>

          {/* 10-Gate Quality Assurance & Proof Section */}
          <m.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProofSection />
          </m.section>

          {/* 3-Tap Chooser Section */}
          <m.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <ChooserWidget activePersona={activePersona} />
          </m.section>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
