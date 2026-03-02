import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Layers, Pipette, Container, Thermometer, Atom, Flame, Settings, Wrench, Zap, Database, ArrowRightLeft } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import { services, serviceCategories } from '../data/services';

const iconMap = {
  Building2, Layers, Pipette, Container, Thermometer, Atom, Flame, Settings, Wrench, Zap, Database, ArrowRightLeft
};

const Services = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen pt-32 lg:pt-44" data-testid="services-page">
      {/* Hero Section */}
      <section className="py-16 bg-industrial-black">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <span className="font-mono text-xs uppercase tracking-widest text-safety-yellow mb-4 block">
              Our Services
            </span>
            <h1 className="font-oswald font-bold text-4xl md:text-6xl uppercase tracking-tight text-white mb-6">
              Fabrication <span className="text-safety-yellow">Capabilities</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-3xl leading-relaxed">
              Comprehensive metal fabrication services for industrial applications. From heavy structures to precision machining, we deliver quality solutions.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 bg-industrial-gray border-y border-white/5 sticky top-20 lg:top-[105px] z-30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-4 overflow-x-auto pb-2 -mb-2 scrollbar-hide">
            {serviceCategories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="font-oswald text-sm uppercase tracking-wide text-slate-400 hover:text-safety-yellow transition-colors whitespace-nowrap px-4 py-2 border border-white/10 hover:border-safety-yellow/30"
              >
                {category.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Services by Category */}
      {serviceCategories.map((category, categoryIndex) => (
        <section 
          key={category.id} 
          id={category.id}
          className={`py-24 ${categoryIndex % 2 === 0 ? 'bg-industrial-black' : 'bg-industrial-gray'}`}
        >
          <div className="max-w-7xl mx-auto px-6">
            <AnimatedSection className="mb-12">
              <span className="font-mono text-xs uppercase tracking-widest text-safety-yellow mb-4 block">
                {String(categoryIndex + 1).padStart(2, '0')}
              </span>
              <h2 className="font-oswald font-medium text-3xl md:text-4xl uppercase tracking-tight text-white">
                {category.name}
              </h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.services.map((serviceId, index) => {
                const service = services.find(s => s.id === serviceId);
                if (!service) return null;
                const Icon = iconMap[service.icon] || Building2;
                
                return (
                  <AnimatedSection key={service.id} delay={index * 0.1}>
                    <div 
                      id={service.id}
                      className="group bg-industrial-black border border-white/5 overflow-hidden hover:border-safety-yellow/30 transition-all duration-500 h-full flex flex-col"
                    >
                      <div className="aspect-[16/10] relative overflow-hidden">
                        <img 
                          src={service.image} 
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-industrial-black via-transparent to-transparent" />
                        <div className="absolute top-4 left-4">
                          <div className="w-10 h-10 bg-safety-yellow flex items-center justify-center">
                            <Icon size={20} className="text-black" />
                          </div>
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="font-oswald font-medium text-xl text-white uppercase mb-3">
                          {service.title}
                        </h3>
                        <p className="text-slate-400 text-sm mb-4 flex-1">
                          {service.description}
                        </p>
                        <div className="mb-4">
                          <span className="font-mono text-xs uppercase tracking-wide text-slate-500 block mb-2">
                            Industries Served:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {service.industries.slice(0, 3).map((industry) => (
                              <span key={industry} className="text-xs text-slate-400 bg-white/5 px-2 py-1">
                                {industry}
                              </span>
                            ))}
                          </div>
                        </div>
                        <Link
                          to={`/request-quote?service=${encodeURIComponent(service.title)}`}
                          className="inline-flex items-center gap-2 text-safety-yellow font-mono text-sm uppercase tracking-wide group-hover:gap-3 transition-all"
                          data-testid={`quote-btn-${service.id}`}
                        >
                          Request Quote <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-24 bg-safety-yellow">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="flex flex-col lg:flex-row justify-between items-center gap-8">
            <div>
              <h2 className="font-oswald font-bold text-3xl md:text-5xl uppercase tracking-tight text-black mb-4">
                Need Custom Fabrication?
              </h2>
              <p className="text-black/70 text-lg">
                Tell us about your requirements and get a customized quote.
              </p>
            </div>
            <Link
              to="/request-quote"
              className="bg-black text-white font-oswald font-bold uppercase px-8 py-4 flex items-center gap-3 hover:bg-industrial-gray transition-colors shrink-0"
              data-testid="services-request-quote-btn"
            >
              Request a Quote
              <ArrowRight size={20} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Services;
