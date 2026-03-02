import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Shield, Target, Eye, FileCheck, HardHat } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import { companyInfo } from '../data/company';

const Quality = () => {
  return (
    <div className="min-h-screen pt-32 lg:pt-44" data-testid="quality-page">
      {/* Hero Section */}
      <section className="py-16 bg-industrial-black">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <span className="font-mono text-xs uppercase tracking-widest text-safety-yellow mb-4 block">
              Quality & Safety
            </span>
            <h1 className="font-oswald font-bold text-4xl md:text-6xl uppercase tracking-tight text-white mb-6">
              Commitment to <span className="text-safety-yellow">Excellence</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-3xl leading-relaxed">
              At MWA Industries, quality and safety are not just policies—they are fundamental values that guide every aspect of our operations.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Quality Section */}
      <section className="py-24 bg-industrial-gray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-safety-yellow flex items-center justify-center">
                  <CheckCircle size={28} className="text-black" />
                </div>
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-safety-yellow block">
                    Quality Assurance
                  </span>
                  <h2 className="font-oswald font-medium text-3xl text-white uppercase">
                    Built-In Quality
                  </h2>
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed mb-8">
                {companyInfo.qualityPolicy.statement}
              </p>
              <div className="space-y-4">
                {companyInfo.qualityPolicy.practices.map((practice, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle size={18} className="text-safety-yellow shrink-0 mt-1" />
                    <span className="text-slate-300">{practice}</span>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2} direction="left">
              <div className="relative">
                <div className="aspect-square bg-industrial-black border border-white/10 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80"
                    alt="Quality Inspection"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-safety-yellow p-6">
                  <FileCheck size={32} className="text-black mb-2" />
                  <span className="font-oswald font-bold text-lg text-black block">100%</span>
                  <span className="font-mono text-xs uppercase text-black/70">Documented Process</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Quality Process Timeline */}
      <section className="py-24 bg-industrial-black">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-safety-yellow mb-4 block">
              Our Process
            </span>
            <h2 className="font-oswald font-medium text-3xl md:text-5xl uppercase tracking-tight text-white">
              Quality at Every Step
            </h2>
          </AnimatedSection>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10" />

            {[
              { title: "Material Receipt", desc: "Incoming inspection and material verification against certificates", icon: FileCheck },
              { title: "Fabrication", desc: "In-process quality checks at defined hold points", icon: Target },
              { title: "Welding", desc: "Qualified welders following approved procedures", icon: HardHat },
              { title: "Testing", desc: "NDT, dimensional checks, and hydro testing as required", icon: Eye },
              { title: "Final Inspection", desc: "Complete documentation review and dispatch clearance", icon: CheckCircle },
            ].map((step, index) => (
              <AnimatedSection key={step.title} delay={index * 0.15}>
                <div className={`flex items-center gap-8 mb-12 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className={`bg-industrial-gray border border-white/5 p-8 ${index % 2 === 0 ? 'lg:ml-auto' : 'lg:mr-auto'} max-w-md`}>
                      <span className="font-mono text-xs text-safety-yellow block mb-2">
                        Step {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-oswald font-medium text-xl text-white uppercase mb-3">
                        {step.title}
                      </h3>
                      <p className="text-slate-400 text-sm">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                  <div className="hidden lg:flex w-16 h-16 bg-safety-yellow items-center justify-center shrink-0 relative z-10">
                    <step.icon size={28} className="text-black" />
                  </div>
                  <div className="flex-1 hidden lg:block" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="py-24 bg-industrial-gray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="right" className="order-2 lg:order-1">
              <div className="relative">
                <div className="aspect-square bg-industrial-black border border-white/10 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                    alt="Safety First"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-safety-yellow p-6">
                  <Shield size={32} className="text-black mb-2" />
                  <span className="font-oswald font-bold text-lg text-black block">Zero</span>
                  <span className="font-mono text-xs uppercase text-black/70">Tolerance Policy</span>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2} className="order-1 lg:order-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-safety-yellow flex items-center justify-center">
                  <Shield size={28} className="text-black" />
                </div>
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-safety-yellow block">
                    Workplace Safety
                  </span>
                  <h2 className="font-oswald font-medium text-3xl text-white uppercase">
                    Safety First
                  </h2>
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed mb-8">
                {companyInfo.safetyPolicy.statement}
              </p>
              <div className="space-y-4">
                {companyInfo.safetyPolicy.practices.map((practice, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <Shield size={18} className="text-safety-yellow shrink-0 mt-1" />
                    <span className="text-slate-300">{practice}</span>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Standards Section */}
      <section className="py-24 bg-industrial-black">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-safety-yellow mb-4 block">
              Standards We Follow
            </span>
            <h2 className="font-oswald font-medium text-3xl md:text-5xl uppercase tracking-tight text-white">
              Industry Standards
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "ASME", desc: "Pressure Vessels" },
              { name: "API", desc: "Storage Tanks" },
              { name: "AWS", desc: "Welding Standards" },
              { name: "TEMA", desc: "Heat Exchangers" },
            ].map((standard, index) => (
              <AnimatedSection key={standard.name} delay={index * 0.1}>
                <div className="bg-industrial-gray border border-white/5 p-6 text-center hover:border-safety-yellow/30 transition-colors">
                  <span className="font-oswald font-bold text-2xl text-safety-yellow block mb-2">
                    {standard.name}
                  </span>
                  <span className="text-slate-400 text-sm">{standard.desc}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-12">
            <p className="text-slate-500 text-sm">
              * We follow industry-standard practices. Specific certifications available upon request.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-safety-yellow">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center">
            <h2 className="font-oswald font-bold text-3xl md:text-5xl uppercase tracking-tight text-black mb-6">
              Quality You Can Trust
            </h2>
            <p className="text-black/70 text-lg mb-10 max-w-2xl mx-auto">
              Experience the MWA Industries difference. Request a quote or visit our facility.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/request-quote"
                className="bg-black text-white font-oswald font-bold uppercase px-8 py-4 flex items-center gap-3 hover:bg-industrial-gray transition-colors"
                data-testid="quality-request-quote-btn"
              >
                Request a Quote
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/contact"
                className="border-2 border-black text-black font-oswald uppercase px-8 py-4 hover:bg-black hover:text-white transition-colors"
              >
                Schedule Visit
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Quality;
