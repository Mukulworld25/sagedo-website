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
    name: 'Get Found on Google Maps & AI Search',
    description: 'Get your shop, workshop or clinic found on Google Maps and AI search. Chat with SAGEDO on WhatsApp for a plan that fits your budget.',
    provider: {
      '@type': 'Organization',
      name: 'SAGEDO',
      url: 'https://sagedo.in'
    },
    areaServed: {
      '@type': 'Country',
      name: 'India'
    },
    serviceType: 'Local SEO & AI Search Visibility'
  };

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary">
          <Helmet>
            <title>Get Found on Google Maps & AI Search | SAGEDO</title>
            <meta
              name="description"
              content="Get your shop, workshop or clinic found on Google Maps and AI search. Chat with SAGEDO on WhatsApp for a plan that fits your budget."
            />
            <link rel="canonical" href="https://sagedo.in/visibility" />
            <meta property="og:title" content="Get Found on Google Maps & AI Search | SAGEDO" />
            <meta
              property="og:description"
              content="Get your shop, workshop or clinic found on Google Maps and AI search. Chat with SAGEDO on WhatsApp for a plan that fits your budget."
            />
            <meta property="og:url" content="https://sagedo.in/visibility" />
            <meta property="og:type" content="website" />
            <meta name="twitter:title" content="Get Found on Google Maps & AI Search | SAGEDO" />
            <meta
              name="twitter:description"
              content="Get your shop, workshop or clinic found on Google Maps and AI search. Chat with SAGEDO on WhatsApp for a plan that fits your budget."
            />
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

          {/* 10-Point Visibility Checklist Section */}
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
