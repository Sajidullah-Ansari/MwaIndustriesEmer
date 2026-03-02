import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Upload, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import AnimatedSection from '../components/ui/AnimatedSection';
import { companyInfo, requirementTypes } from '../data/company';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    company_name: '',
    email: '',
    phone: '',
    requirement_type: '',
    message: '',
  });
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error('File size should be less than 10MB');
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });
      if (file) {
        submitData.append('file', file);
      }

      const response = await fetch(`${BACKEND_URL}/api/contact`, {
        method: 'POST',
        body: submitData,
      });

      const result = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        toast.success('Message sent successfully!');
      } else {
        toast.error(result.detail || 'Something went wrong');
      }
    } catch (error) {
      toast.error('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-32 lg:pt-44" data-testid="contact-page">
        <section className="py-24 bg-industrial-black">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 bg-safety-yellow mx-auto mb-8 flex items-center justify-center"
            >
              <CheckCircle size={40} className="text-black" />
            </motion.div>
            <h1 className="font-oswald font-bold text-4xl uppercase text-white mb-4">
              Thank You!
            </h1>
            <p className="text-slate-400 text-lg mb-8">
              Your inquiry has been submitted successfully. Our team will contact you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={`https://wa.me/${companyInfo.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white font-oswald uppercase px-6 py-3 hover:bg-green-600 transition-colors"
              >
                Chat on WhatsApp
              </a>
              <a
                href={`tel:${companyInfo.contact.phone}`}
                className="bg-safety-yellow text-black font-oswald font-bold uppercase px-6 py-3 hover:bg-white transition-colors"
              >
                Call Now
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 lg:pt-44" data-testid="contact-page">
      {/* Hero Section */}
      <section className="py-16 bg-industrial-black">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <span className="font-mono text-xs uppercase tracking-widest text-safety-yellow mb-4 block">
              Contact Us
            </span>
            <h1 className="font-oswald font-bold text-4xl md:text-6xl uppercase tracking-tight text-white mb-6">
              Let's <span className="text-safety-yellow">Talk</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-3xl leading-relaxed">
              Have a project in mind? Get in touch with our team for a quick response.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 bg-industrial-gray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <AnimatedSection className="lg:col-span-2">
              <div className="bg-industrial-black border border-white/5 p-8 h-full">
                <h2 className="font-oswald font-medium text-2xl text-white uppercase mb-8">
                  Get in Touch
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-safety-yellow/10 flex items-center justify-center shrink-0">
                      <MapPin size={20} className="text-safety-yellow" />
                    </div>
                    <div>
                      <h3 className="font-oswald text-white uppercase text-sm mb-1">Address</h3>
                      <p className="text-slate-400 text-sm">{companyInfo.contact.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-safety-yellow/10 flex items-center justify-center shrink-0">
                      <Phone size={20} className="text-safety-yellow" />
                    </div>
                    <div>
                      <h3 className="font-oswald text-white uppercase text-sm mb-1">Phone</h3>
                      <a href={`tel:${companyInfo.contact.phone}`} className="text-slate-400 text-sm hover:text-safety-yellow transition-colors">
                        +91 {companyInfo.contact.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-safety-yellow/10 flex items-center justify-center shrink-0">
                      <Mail size={20} className="text-safety-yellow" />
                    </div>
                    <div>
                      <h3 className="font-oswald text-white uppercase text-sm mb-1">Email</h3>
                      <a href={`mailto:${companyInfo.contact.email}`} className="text-slate-400 text-sm hover:text-safety-yellow transition-colors">
                        {companyInfo.contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-safety-yellow/10 flex items-center justify-center shrink-0">
                      <Clock size={20} className="text-safety-yellow" />
                    </div>
                    <div>
                      <h3 className="font-oswald text-white uppercase text-sm mb-1">Working Hours</h3>
                      <p className="text-slate-400 text-sm">Mon - Sat: 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10">
                  <p className="font-mono text-xs text-slate-500 mb-2">GST Number</p>
                  <p className="font-mono text-sm text-white">{companyInfo.contact.gst}</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection delay={0.2} className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="bg-industrial-black border border-white/5 p-8">
                <h2 className="font-oswald font-medium text-2xl text-white uppercase mb-8">
                  Send us a Message
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="font-mono text-xs uppercase tracking-wide text-slate-500 block mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white placeholder:text-slate-600 focus:border-safety-yellow focus:outline-none transition-colors"
                      placeholder="John Doe"
                      data-testid="contact-name-input"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs uppercase tracking-wide text-slate-500 block mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white placeholder:text-slate-600 focus:border-safety-yellow focus:outline-none transition-colors"
                      placeholder="Your Company"
                      data-testid="contact-company-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="font-mono text-xs uppercase tracking-wide text-slate-500 block mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white placeholder:text-slate-600 focus:border-safety-yellow focus:outline-none transition-colors"
                      placeholder="you@company.com"
                      data-testid="contact-email-input"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs uppercase tracking-wide text-slate-500 block mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white placeholder:text-slate-600 focus:border-safety-yellow focus:outline-none transition-colors"
                      placeholder="+91 9876543210"
                      data-testid="contact-phone-input"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="font-mono text-xs uppercase tracking-wide text-slate-500 block mb-2">
                    Requirement Type *
                  </label>
                  <select
                    name="requirement_type"
                    value={formData.requirement_type}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white focus:border-safety-yellow focus:outline-none transition-colors appearance-none cursor-pointer"
                    data-testid="contact-requirement-select"
                  >
                    <option value="" className="bg-industrial-gray">Select Requirement</option>
                    {requirementTypes.map((type) => (
                      <option key={type} value={type} className="bg-industrial-gray">{type}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label className="font-mono text-xs uppercase tracking-wide text-slate-500 block mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white placeholder:text-slate-600 focus:border-safety-yellow focus:outline-none transition-colors resize-none"
                    placeholder="Describe your requirements..."
                    data-testid="contact-message-input"
                  />
                </div>

                <div className="mb-8">
                  <label className="font-mono text-xs uppercase tracking-wide text-slate-500 block mb-2">
                    Upload Drawing/Specification (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      id="contact-file-upload"
                      accept=".pdf,.dwg,.dxf,.jpg,.jpeg,.png"
                      data-testid="contact-file-input"
                    />
                    <label
                      htmlFor="contact-file-upload"
                      className="flex items-center gap-3 border border-dashed border-white/20 p-4 cursor-pointer hover:border-safety-yellow/50 transition-colors"
                    >
                      <Upload size={20} className="text-slate-500" />
                      <span className="text-slate-400 text-sm">
                        {file ? file.name : 'Click to upload (PDF, DWG, Images - Max 10MB)'}
                      </span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-safety-yellow text-black font-oswald font-bold uppercase py-4 flex items-center justify-center gap-3 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="contact-submit-btn"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send size={18} />
                </button>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-industrial-black">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-oswald font-medium text-3xl text-white uppercase">
              Our Location
            </h2>
          </AnimatedSection>
          <AnimatedSection>
            <div className="aspect-[21/9] bg-industrial-gray border border-white/10 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.394!2d81.5137!3d21.4934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDI5JzM2LjIiTiA4McKwMzAnNDkuMyJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="MWA Industries Location"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Contact;
