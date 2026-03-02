import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Target, Eye, Heart, Shield, CheckCircle } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import { companyInfo } from '../data/company';

const About = () => {
  return (
    <div className="min-h-screen pt-32 lg:pt-44" data-testid="about-page">
      {/* Hero Section */}
      <section className="py-16 bg-industrial-black">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <span className="font-mono text-xs uppercase tracking-widest text-safety-yellow mb-4 block">
              About Us
            </span>
            <h1 className="font-oswald font-bold text-4xl md:text-6xl uppercase tracking-tight text-white mb-6">
              Building India's <span className="text-safety-yellow">Industrial</span> Future
            </h1>
            <p className="text-slate-400 text-lg max-w-3xl leading-relaxed">
              {companyInfo.description}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-industrial-gray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="font-mono text-xs uppercase tracking-widest text-safety-yellow mb-4 block">
                Our Story
              </span>
              <h2 className="font-oswald font-medium text-3xl md:text-4xl uppercase tracking-tight text-white mb-6">
                A Legacy of Excellence
              </h2>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p>{companyInfo.about.story}</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2} direction="left">
              <div className="relative">
                <div className="aspect-[4/3] bg-industrial-black border border-white/10 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                    alt="MWA Industries Facility"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-safety-yellow p-6">
                  <span className="font-oswald font-bold text-4xl text-black">15+</span>
                  <span className="block font-mono text-xs uppercase text-black/70">Years Experience</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-industrial-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection>
              <div className="bg-industrial-gray border border-white/5 p-10 h-full">
                <div className="w-14 h-14 bg-safety-yellow/10 flex items-center justify-center mb-6">
                  <Eye size={28} className="text-safety-yellow" />
                </div>
                <h3 className="font-oswald font-medium text-2xl text-white uppercase mb-4">Our Vision</h3>
                <p className="text-slate-400 leading-relaxed">{companyInfo.about.vision}</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="bg-industrial-gray border border-white/5 p-10 h-full">
                <div className="w-14 h-14 bg-safety-yellow/10 flex items-center justify-center mb-6">
                  <Target size={28} className="text-safety-yellow" />
                </div>
                <h3 className="font-oswald font-medium text-2xl text-white uppercase mb-4">Our Mission</h3>
                <p className="text-slate-400 leading-relaxed">{companyInfo.about.mission}</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-industrial-gray">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-safety-yellow mb-4 block">
              Our Values
            </span>
            <h2 className="font-oswald font-medium text-3xl md:text-5xl uppercase tracking-tight text-white">
              What We Stand For
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyInfo.values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 0.1}>
                <div className="bg-industrial-black border border-white/5 p-8 text-center h-full hover:border-safety-yellow/30 transition-colors">
                  <div className="w-12 h-12 bg-safety-yellow mx-auto mb-6 flex items-center justify-center">
                    {index === 0 && <CheckCircle size={24} className="text-black" />}
                    {index === 1 && <Shield size={24} className="text-black" />}
                    {index === 2 && <Heart size={24} className="text-black" />}
                    {index === 3 && <Eye size={24} className="text-black" />}
                  </div>
                  <h3 className="font-oswald font-medium text-xl text-white uppercase mb-3">
                    {value.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Section */}
      <section className="py-24 bg-industrial-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="right">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-industrial-gray border border-white/10 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80"
                    alt="Machine Shop"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square bg-industrial-gray border border-white/10 overflow-hidden mt-8">
                  <img 
                    src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&q=80"
                    alt="Fabrication Bay"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square bg-industrial-gray border border-white/10 overflow-hidden -mt-8">
                  <img 
                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80"
                    alt="Welding Work"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square bg-industrial-gray border border-white/10 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80"
                    alt="Quality Check"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <span className="font-mono text-xs uppercase tracking-widest text-safety-yellow mb-4 block">
                Our Facility
              </span>
              <h2 className="font-oswald font-medium text-3xl md:text-4xl uppercase tracking-tight text-white mb-6">
                Equipped for Excellence
              </h2>
              <p className="text-slate-400 leading-relaxed mb-8">
                {companyInfo.about.facility}
              </p>
              <ul className="space-y-3">
                {['Overhead Cranes', 'CNC Machines', 'Welding Bays', 'Blasting & Painting', 'QA Laboratory'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-300">
                    <CheckCircle size={18} className="text-safety-yellow" />
                    {item}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Management Message */}
      <section className="py-24 bg-industrial-gray">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-safety-yellow mb-4 block">
              Message from Management
            </span>
            <h2 className="font-oswald font-medium text-3xl md:text-4xl uppercase tracking-tight text-white mb-8">
              Our Commitment to You
            </h2>
            <blockquote className="text-xl text-slate-300 leading-relaxed italic mb-8">
              "At MWA Industries, we believe that quality fabrication is the foundation of industrial progress. 
              We are committed to delivering excellence in every project, maintaining the highest standards of 
              safety, and building lasting partnerships with our clients. Your success is our success."
            </blockquote>
            <p className="text-safety-yellow font-oswald uppercase">— The MWA Industries Team</p>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-industrial-black">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center">
            <h2 className="font-oswald font-bold text-3xl md:text-5xl uppercase tracking-tight text-white mb-6">
              Partner with <span className="text-safety-yellow">MWA Industries</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
              Let's discuss how we can support your fabrication needs with quality, reliability, and expertise.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/request-quote"
                className="group bg-safety-yellow text-black font-oswald font-bold uppercase px-8 py-4 flex items-center gap-3 hover:bg-white transition-colors"
                data-testid="about-request-quote-btn"
              >
                Request a Quote
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="border border-white/20 text-white font-oswald uppercase px-8 py-4 hover:bg-white/10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default About;
