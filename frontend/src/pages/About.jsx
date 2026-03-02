import { Link } from 'react-router-dom';
import { ArrowRight, Target, Eye, Heart, Shield, CheckCircle, Award, MessageCircle } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import { companyInfo } from '../data/company';

const About = () => {
  return (
    <div className="min-h-screen pt-32 lg:pt-44" data-testid="about-page">
      {/* Hero Section */}
      <section className="py-16 bg-[rgb(var(--industrial-black))]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <span className="font-mono text-xs uppercase tracking-widest text-[rgb(var(--safety-yellow))] mb-4 block">
              About Us
            </span>
            <h1 className="font-oswald font-bold text-4xl md:text-6xl uppercase tracking-tight text-[rgb(var(--text-primary))] mb-6">
              Building India's <span className="text-[rgb(var(--safety-yellow))]">Industrial</span> Future
            </h1>
            <p className="text-[rgb(var(--text-secondary))] text-lg max-w-3xl leading-relaxed">
              {companyInfo.description}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Story Section - Honest positioning */}
      <section className="py-24 bg-[rgb(var(--industrial-gray))]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="font-mono text-xs uppercase tracking-widest text-[rgb(var(--safety-yellow))] mb-4 block">
                Our Story
              </span>
              <h2 className="font-oswald font-medium text-3xl md:text-4xl uppercase tracking-tight text-[rgb(var(--text-primary))] mb-6">
                Decades of Experience
              </h2>
              <p className="text-[rgb(var(--safety-yellow))] text-lg italic mb-4">
                "{companyInfo.about.storyHighlight}"
              </p>
              <div className="space-y-4 text-[rgb(var(--text-secondary))] leading-relaxed">
                <p>{companyInfo.about.story}</p>
                <p>{companyInfo.about.experience}</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2} direction="left">
              <div className="relative">
                <div className="aspect-[4/3] bg-[rgb(var(--industrial-black))] border border-[rgb(var(--border))] overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                    alt="MWA Industries Facility"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-[rgb(var(--safety-yellow))] p-6">
                  <span className="font-oswald font-bold text-4xl text-black">35+</span>
                  <span className="block font-mono text-xs uppercase text-black/70">Years Legacy</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Experience Badge Section */}
      <section className="py-16 bg-[rgb(var(--industrial-black))]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[rgb(var(--industrial-gray))] border border-[rgb(var(--border))] p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-[rgb(var(--safety-yellow))] flex items-center justify-center shrink-0">
                  <Award size={40} className="text-black" />
                </div>
                <div>
                  <h3 className="font-oswald font-bold text-2xl text-[rgb(var(--text-primary))] uppercase">
                    Experience-Backed Leadership
                  </h3>
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-[rgb(var(--text-secondary))] leading-relaxed">
                  Our core technical leadership is backed by 35+ years of hands-on industry experience. 
                  The founder's father has worked in the fabrication and engineering field for over three decades, 
                  bringing invaluable practical knowledge to every project we undertake.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-[rgb(var(--industrial-gray))]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection>
              <div className="bg-[rgb(var(--industrial-black))] border border-[rgb(var(--border))] p-10 h-full">
                <div className="w-14 h-14 bg-[rgb(var(--safety-yellow))]/10 flex items-center justify-center mb-6">
                  <Eye size={28} className="text-[rgb(var(--safety-yellow))]" />
                </div>
                <h3 className="font-oswald font-medium text-2xl text-[rgb(var(--text-primary))] uppercase mb-4">Our Vision</h3>
                <p className="text-[rgb(var(--text-secondary))] leading-relaxed">{companyInfo.about.vision}</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="bg-[rgb(var(--industrial-black))] border border-[rgb(var(--border))] p-10 h-full">
                <div className="w-14 h-14 bg-[rgb(var(--safety-yellow))]/10 flex items-center justify-center mb-6">
                  <Target size={28} className="text-[rgb(var(--safety-yellow))]" />
                </div>
                <h3 className="font-oswald font-medium text-2xl text-[rgb(var(--text-primary))] uppercase mb-4">Our Mission</h3>
                <p className="text-[rgb(var(--text-secondary))] leading-relaxed">{companyInfo.about.mission}</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-[rgb(var(--industrial-black))]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-[rgb(var(--safety-yellow))] mb-4 block">
              Our Values
            </span>
            <h2 className="font-oswald font-medium text-3xl md:text-5xl uppercase tracking-tight text-[rgb(var(--text-primary))]">
              What We Stand For
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyInfo.values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 0.1}>
                <div className="bg-[rgb(var(--industrial-gray))] border border-[rgb(var(--border))] p-8 text-center h-full hover:border-[rgb(var(--safety-yellow))]/30 transition-colors">
                  <div className="w-12 h-12 bg-[rgb(var(--safety-yellow))] mx-auto mb-6 flex items-center justify-center">
                    {index === 0 && <CheckCircle size={24} className="text-black" />}
                    {index === 1 && <Shield size={24} className="text-black" />}
                    {index === 2 && <Heart size={24} className="text-black" />}
                    {index === 3 && <MessageCircle size={24} className="text-black" />}
                  </div>
                  <h3 className="font-oswald font-medium text-xl text-[rgb(var(--text-primary))] uppercase mb-3">
                    {value.title}
                  </h3>
                  <p className="text-[rgb(var(--text-secondary))] text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Section */}
      <section className="py-24 bg-[rgb(var(--industrial-gray))]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="right">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-[rgb(var(--industrial-black))] border border-[rgb(var(--border))] overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80"
                    alt="Machine Shop"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="aspect-square bg-[rgb(var(--industrial-black))] border border-[rgb(var(--border))] overflow-hidden mt-8">
                  <img 
                    src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=400&q=80"
                    alt="Fabrication Bay"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="aspect-square bg-[rgb(var(--industrial-black))] border border-[rgb(var(--border))] overflow-hidden -mt-8">
                  <img 
                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80"
                    alt="Welding Work"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="aspect-square bg-[rgb(var(--industrial-black))] border border-[rgb(var(--border))] overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80"
                    alt="Quality Check"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <span className="font-mono text-xs uppercase tracking-widest text-[rgb(var(--safety-yellow))] mb-4 block">
                Our Facility
              </span>
              <h2 className="font-oswald font-medium text-3xl md:text-4xl uppercase tracking-tight text-[rgb(var(--text-primary))] mb-6">
                Equipped for Excellence
              </h2>
              <p className="text-[rgb(var(--text-secondary))] leading-relaxed mb-8">
                {companyInfo.about.facility}
              </p>
              <ul className="space-y-3">
                {['Overhead Cranes', 'CNC Machines', 'Welding Bays', 'Blasting & Painting', 'QA Laboratory'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[rgb(var(--text-secondary))]">
                    <CheckCircle size={18} className="text-[rgb(var(--safety-yellow))]" />
                    {item}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Management Message */}
      <section className="py-24 bg-[rgb(var(--industrial-black))]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-[rgb(var(--safety-yellow))] mb-4 block">
              Message from Management
            </span>
            <h2 className="font-oswald font-medium text-3xl md:text-4xl uppercase tracking-tight text-[rgb(var(--text-primary))] mb-8">
              Our Commitment to You
            </h2>
            <blockquote className="text-xl text-[rgb(var(--text-secondary))] leading-relaxed italic mb-8">
              "At MWA Industries, we believe that quality fabrication is the foundation of industrial progress. 
              We are committed to delivering excellence in every project, maintaining the highest standards of 
              safety, and building lasting partnerships with our clients. Your success is our success."
            </blockquote>
            <p className="text-[rgb(var(--safety-yellow))] font-oswald uppercase">— The MWA Industries Team</p>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[rgb(var(--industrial-gray))]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center">
            <h2 className="font-oswald font-bold text-3xl md:text-5xl uppercase tracking-tight text-[rgb(var(--text-primary))] mb-6">
              Partner with <span className="text-[rgb(var(--safety-yellow))]">MWA Industries</span>
            </h2>
            <p className="text-[rgb(var(--text-secondary))] text-lg mb-10 max-w-2xl mx-auto">
              Let's discuss how we can support your fabrication needs with quality, reliability, and expertise.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/request-quote"
                className="group bg-[rgb(var(--safety-yellow))] text-black font-oswald font-bold uppercase px-8 py-4 flex items-center gap-3 hover:brightness-110 transition-all"
                data-testid="about-request-quote-btn"
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
    </div>
  );
};

export default About;
