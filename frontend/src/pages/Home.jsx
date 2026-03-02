import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, CheckCircle, Clock, Users, Shield, MessageCircle, Award,
  Building2, Layers, Pipette, Container, Thermometer, Zap, Phone, Mail, MapPin
} from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import CountUp from '../components/ui/CountUp';
import { companyInfo } from '../data/company';
import { services } from '../data/services';
import { industries } from '../data/industries';
import { projects } from '../data/projects';

const iconMap = {
  CheckCircle, Clock, Users, Shield, MessageCircle, Award,
  Building2, Layers, Pipette, Container, Thermometer, Zap
};

const Home = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen" data-testid="home-page">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: heroY }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--industrial-black))] via-transparent to-transparent" />
        </motion.div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 grid-pattern opacity-30" />

        {/* Hero Content */}
        <motion.div 
          className="relative z-10 max-w-7xl mx-auto px-6 py-32 lg:py-0"
          style={{ opacity: heroOpacity }}
        >
          <div className="max-w-3xl">
            {/* Logo Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <img 
                src={companyInfo.logo}
                alt="MWA Industries"
                className="h-20 w-auto object-contain"
              />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="font-oswald font-bold text-5xl md:text-7xl uppercase tracking-tight leading-none text-white mb-6"
            >
              Precision <span className="text-[rgb(var(--safety-yellow))]">Engineering</span>
              <br />
              Heavy Fabrication
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl md:text-2xl text-[rgb(var(--safety-yellow))] italic mb-4 font-light"
            >
              Excellence is our foundation.<br />
              Trust is our legacy.
            </motion.p>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-lg text-slate-300 leading-relaxed mb-10 max-w-xl"
            >
              Your trusted partner for structural steel, piping, pressure vessels, 
              and precision machining. Serving India's leading industries.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/request-quote"
                className="group bg-[rgb(var(--safety-yellow))] text-black font-oswald font-bold uppercase px-8 py-4 flex items-center gap-3 hover:brightness-110 transition-all"
                data-testid="hero-request-quote-btn"
              >
                Request a Quote
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={`tel:${companyInfo.contact.phone}`}
                className="group border border-white/20 text-white font-oswald uppercase px-8 py-4 flex items-center gap-3 hover:bg-white/10 transition-colors"
                data-testid="hero-call-btn"
              >
                <Phone size={20} />
                Call Now
              </a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-12 flex flex-wrap gap-6 text-sm text-slate-400"
            >
              <div className="flex items-center gap-2">
                <Award size={16} className="text-[rgb(var(--safety-yellow))]" />
                <span>35+ Years Legacy</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-[rgb(var(--safety-yellow))]" />
                <span>Quality-First Process</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-[rgb(var(--safety-yellow))]" />
                <span>Safety Culture</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-[rgb(var(--safety-yellow))] rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Brand Strip Section */}
      <section className="py-16 bg-neutral-900 border-y border-neutral-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <img 
              src={companyInfo.logo}
              alt="MWA Industries"
              className="h-16 w-auto object-contain mx-auto mb-4"
            />
            <p className="text-amber-400 text-lg italic mb-4">
              Excellence is our foundation. Trust is our legacy.
            </p>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              A new firm powered by 35+ years of fabrication experience. Our shop is new, our experience is not.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Signals Section - No fake metrics */}
      <section className="py-24 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-400 mb-4 block">
              Why Choose Us
            </span>
            <h2 className="font-oswald font-medium text-3xl md:text-5xl uppercase tracking-tight text-white">
              Built on Quality & Trust
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyInfo.trustSignals.map((signal, index) => {
              const Icon = iconMap[signal.icon];
              return (
                <AnimatedSection key={signal.id} delay={index * 0.1}>
                  <div className="group bg-neutral-900 border border-neutral-800 p-8 hover:border-amber-400/30 transition-all duration-500 h-full">
                    <div className="w-12 h-12 bg-amber-400/10 flex items-center justify-center mb-6 group-hover:bg-amber-400/20 transition-colors">
                      {Icon && <Icon size={24} className="text-amber-400" />}
                    </div>
                    <h3 className="font-oswald font-medium text-xl text-white uppercase mb-3">
                      {signal.title}
                    </h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      {signal.description}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="font-mono text-xs uppercase tracking-widest text-amber-400 mb-4 block">
                Our Story
              </span>
              <h2 className="font-oswald font-medium text-3xl md:text-4xl uppercase tracking-tight text-white mb-6">
                Experience-Backed Leadership
              </h2>
              <p className="text-neutral-400 leading-relaxed mb-6">
                {companyInfo.about.story}
              </p>
              <div className="bg-neutral-950 border border-neutral-800 p-6 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-amber-500 flex items-center justify-center">
                    <span className="font-oswald font-bold text-2xl text-black">35+</span>
                  </div>
                  <div>
                    <p className="font-oswald text-lg text-white uppercase">Years of Industry Experience</p>
                    <p className="text-neutral-400 text-sm">Through our founder's family legacy</p>
                  </div>
                </div>
              </div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-amber-400 font-mono text-sm uppercase tracking-wide hover:gap-3 transition-all"
              >
                Read Full Story <ArrowRight size={14} />
              </Link>
            </AnimatedSection>
            <AnimatedSection delay={0.2} direction="left">
              <div className="relative">
                <div className="aspect-[4/3] bg-neutral-950 border border-neutral-800 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                    alt="Heavy Fabrication Workshop"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Capabilities Overview */}
      <section className="py-24 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-400 mb-4 block">
              Our Capabilities
            </span>
            <h2 className="font-oswald font-medium text-3xl md:text-5xl uppercase tracking-tight text-white mb-4">
              What We Fabricate
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Comprehensive metal fabrication services for industrial applications
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((service, index) => {
              const Icon = iconMap[service.icon] || Building2;
              return (
                <AnimatedSection key={service.id} delay={index * 0.1}>
                  <Link 
                    to={`/services#${service.id}`}
                    className="group block bg-neutral-900 border border-neutral-800 overflow-hidden hover:border-amber-400/30 transition-all duration-500"
                  >
                    <div className="aspect-[16/10] relative overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-amber-400/10 flex items-center justify-center">
                          <Icon size={16} className="text-amber-400" />
                        </div>
                        <h3 className="font-oswald font-medium text-lg text-white uppercase">
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-neutral-400 text-sm mb-4">
                        {service.shortDescription}
                      </p>
                      <span className="text-amber-400 text-sm font-mono uppercase tracking-wide flex items-center gap-2 group-hover:gap-3 transition-all">
                        Learn More <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>

          <AnimatedSection className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 border border-neutral-700 text-white font-oswald uppercase px-8 py-4 hover:bg-neutral-900 transition-colors"
              data-testid="view-all-services-btn"
            >
              View All Services
              <ArrowRight size={18} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-24 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-amber-400 mb-4 block">
                Industries We Serve
              </span>
              <h2 className="font-oswald font-medium text-3xl md:text-5xl uppercase tracking-tight text-white">
                Powering India's Growth
              </h2>
            </div>
            <Link
              to="/industries"
              className="text-[rgb(var(--safety-yellow))] font-mono text-sm uppercase tracking-wide flex items-center gap-2 hover:gap-3 transition-all"
            >
              All Industries <ArrowRight size={14} />
            </Link>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {industries.slice(0, 8).map((industry, index) => (
              <AnimatedSection key={industry.id} delay={index * 0.05}>
                <Link
                  to="/industries"
                  className="group block bg-[rgb(var(--industrial-black))] border border-[rgb(var(--border))] p-6 hover:border-[rgb(var(--safety-yellow))]/30 transition-all duration-500 text-center"
                >
                  <span className="font-oswald text-[rgb(var(--text-primary))] uppercase text-sm group-hover:text-[rgb(var(--safety-yellow))] transition-colors">
                    {industry.name}
                  </span>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 bg-[rgb(var(--industrial-black))]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[rgb(var(--safety-yellow))] mb-4 block">
                Our Work
              </span>
              <h2 className="font-oswald font-medium text-3xl md:text-5xl uppercase tracking-tight text-[rgb(var(--text-primary))]">
                Featured Projects
              </h2>
            </div>
            <Link
              to="/projects"
              className="text-[rgb(var(--safety-yellow))] font-mono text-sm uppercase tracking-wide flex items-center gap-2 hover:gap-3 transition-all"
            >
              View All <ArrowRight size={14} />
            </Link>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((project, index) => (
              <AnimatedSection key={project.id} delay={index * 0.1}>
                <Link 
                  to="/projects"
                  className="group block bg-[rgb(var(--industrial-gray))] border border-[rgb(var(--border))] overflow-hidden hover:border-[rgb(var(--safety-yellow))]/30 transition-all duration-500"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--industrial-gray))] via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[rgb(var(--safety-yellow))] text-black font-mono text-xs uppercase px-3 py-1">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-oswald font-medium text-lg text-[rgb(var(--text-primary))] uppercase mb-2">
                      {project.title}
                    </h3>
                    <p className="text-[rgb(var(--text-secondary))] text-sm mb-3">
                      {project.location}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.highlights.slice(0, 2).map((highlight) => (
                        <span key={highlight} className="text-xs text-[rgb(var(--text-secondary))] bg-[rgb(var(--industrial-black))] px-2 py-1">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[rgb(var(--industrial-gray))] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=1920&q=80)`,
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <h2 className="font-oswald font-bold text-4xl md:text-6xl uppercase tracking-tight text-[rgb(var(--text-primary))] mb-6">
              Ready to Start Your <span className="text-[rgb(var(--safety-yellow))]">Project?</span>
            </h2>
            <p className="text-[rgb(var(--text-secondary))] text-lg mb-10">
              Get in touch with our team. We'll review your requirements and respond promptly.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/request-quote"
                className="group bg-[rgb(var(--safety-yellow))] text-black font-oswald font-bold uppercase px-8 py-4 flex items-center gap-3 hover:brightness-110 transition-all"
                data-testid="cta-request-quote-btn"
              >
                Request a Quote
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="border border-[rgb(var(--border))] text-[rgb(var(--text-primary))] font-oswald uppercase px-8 py-4 hover:bg-[rgb(var(--industrial-black))] transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Strip */}
      <section className="py-12 bg-[rgb(var(--safety-yellow))]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-6 text-black">
              <div className="flex items-center gap-3">
                <Phone size={20} />
                <a href={`tel:${companyInfo.contact.phone}`} className="font-oswald text-lg">
                  +91 {companyInfo.contact.phone}
                </a>
              </div>
              <div className="hidden md:block w-px h-6 bg-black/20" />
              <div className="flex items-center gap-3">
                <Mail size={20} />
                <a href={`mailto:${companyInfo.contact.email}`} className="font-oswald text-lg">
                  {companyInfo.contact.email}
                </a>
              </div>
              <div className="hidden md:block w-px h-6 bg-black/20" />
              <div className="flex items-center gap-3">
                <MapPin size={20} />
                <span className="font-oswald">Raipur, Chhattisgarh</span>
              </div>
            </div>
            <Link
              to="/request-quote"
              className="bg-black text-white font-oswald font-bold uppercase px-6 py-3 hover:bg-[rgb(var(--industrial-gray))] transition-colors"
            >
              Get Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
