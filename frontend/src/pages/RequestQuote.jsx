import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, Upload, CheckCircle, Phone, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import AnimatedSection from '../components/ui/AnimatedSection';
import { companyInfo, requirementTypes, materialTypes, timelineOptions } from '../data/company';
import { services } from '../data/services';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const RequestQuote = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    company_name: '',
    email: '',
    phone: '',
    product_service: '',
    material_type: '',
    quantity: '',
    delivery_location: '',
    timeline: '',
    notes: '',
  });
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const service = params.get('service');
    const industry = params.get('industry');
    
    if (service) {
      setFormData(prev => ({ ...prev, product_service: service }));
    }
    if (industry) {
      setFormData(prev => ({ ...prev, notes: `Industry: ${industry}` }));
    }
  }, [location]);

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

      const response = await fetch(`${BACKEND_URL}/api/rfq`, {
        method: 'POST',
        body: submitData,
      });

      const result = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        toast.success('Quote request submitted successfully!');
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
      <div className="min-h-screen pt-32 lg:pt-44" data-testid="rfq-page">
        <section className="py-24 bg-[rgb(var(--industrial-black))]">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 bg-[rgb(var(--safety-yellow))] mx-auto mb-8 flex items-center justify-center"
            >
              <CheckCircle size={40} className="text-black" />
            </motion.div>
            <h1 className="font-oswald font-bold text-4xl uppercase text-[rgb(var(--text-primary))] mb-4">
              Quote Request Received!
            </h1>
            <p className="text-[rgb(var(--text-secondary))] text-lg mb-8">
              Thank you for your interest. Our team will review your requirements and get back to you within 24 hours with a detailed quotation.
            </p>
            <div className="bg-[rgb(var(--industrial-gray))] border border-[rgb(var(--border))] p-6 mb-8">
              <p className="text-[rgb(var(--text-secondary))] text-sm mb-4">Need immediate assistance?</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href={`https://wa.me/${companyInfo.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-500 text-white font-oswald uppercase px-6 py-3 hover:bg-green-600 transition-colors"
                  data-testid="rfq-success-whatsapp"
                >
                  <MessageCircle size={18} />
                  Chat on WhatsApp
                </a>
                <a
                  href={`tel:${companyInfo.contact.phone}`}
                  className="flex items-center justify-center gap-2 bg-[rgb(var(--safety-yellow))] text-black font-oswald font-bold uppercase px-6 py-3 hover:brightness-110 transition-all"
                  data-testid="rfq-success-call"
                >
                  <Phone size={18} />
                  Call Now
                </a>
              </div>
            </div>
            <Link
              to="/"
              className="text-[rgb(var(--safety-yellow))] font-mono text-sm uppercase tracking-wide hover:underline"
            >
              Back to Home
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 lg:pt-44" data-testid="rfq-page">
      {/* Hero Section */}
      <section className="py-16 bg-[rgb(var(--industrial-black))]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <span className="font-mono text-xs uppercase tracking-widest text-[rgb(var(--safety-yellow))] mb-4 block">
              Request a Quote
            </span>
            <h1 className="font-oswald font-bold text-4xl md:text-6xl uppercase tracking-tight text-[rgb(var(--text-primary))] mb-6">
              Get Your <span className="text-[rgb(var(--safety-yellow))]">Custom Quote</span>
            </h1>
            <p className="text-[rgb(var(--text-secondary))] text-lg max-w-3xl leading-relaxed">
              Fill out the form below with your project details. Our team will review and respond promptly.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 bg-[rgb(var(--industrial-gray))]">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection>
            <form onSubmit={handleSubmit} className="bg-[rgb(var(--industrial-black))] border border-[rgb(var(--border))] p-8 md:p-12">
              {/* Contact Details */}
              <div className="mb-10">
                <h2 className="font-oswald font-medium text-xl text-[rgb(var(--text-primary))] uppercase mb-6 pb-4 border-b border-[rgb(var(--border))]">
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-mono text-xs uppercase tracking-wide text-[rgb(var(--text-secondary))] block mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-[rgb(var(--border))] px-0 py-3 text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-secondary))]/50 focus:border-[rgb(var(--safety-yellow))] focus:outline-none transition-colors"
                      placeholder="John Doe"
                      data-testid="rfq-name-input"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs uppercase tracking-wide text-[rgb(var(--text-secondary))] block mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-[rgb(var(--border))] px-0 py-3 text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-secondary))]/50 focus:border-[rgb(var(--safety-yellow))] focus:outline-none transition-colors"
                      placeholder="Your Company"
                      data-testid="rfq-company-input"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs uppercase tracking-wide text-[rgb(var(--text-secondary))] block mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-[rgb(var(--border))] px-0 py-3 text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-secondary))]/50 focus:border-[rgb(var(--safety-yellow))] focus:outline-none transition-colors"
                      placeholder="you@company.com"
                      data-testid="rfq-email-input"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs uppercase tracking-wide text-[rgb(var(--text-secondary))] block mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-[rgb(var(--border))] px-0 py-3 text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-secondary))]/50 focus:border-[rgb(var(--safety-yellow))] focus:outline-none transition-colors"
                      placeholder="+91 9876543210"
                      data-testid="rfq-phone-input"
                    />
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="mb-10">
                <h2 className="font-oswald font-medium text-xl text-[rgb(var(--text-primary))] uppercase mb-6 pb-4 border-b border-[rgb(var(--border))]">
                  Project Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-mono text-xs uppercase tracking-wide text-[rgb(var(--text-secondary))] block mb-2">
                      Product/Service Type *
                    </label>
                    <select
                      name="product_service"
                      value={formData.product_service}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-[rgb(var(--border))] px-0 py-3 text-[rgb(var(--text-primary))] focus:border-[rgb(var(--safety-yellow))] focus:outline-none transition-colors appearance-none cursor-pointer"
                      data-testid="rfq-service-select"
                    >
                      <option value="" className="bg-[rgb(var(--industrial-gray))]">Select Service</option>
                      {services.map((service) => (
                        <option key={service.id} value={service.title} className="bg-[rgb(var(--industrial-gray))]">
                          {service.title}
                        </option>
                      ))}
                      <option value="Other" className="bg-[rgb(var(--industrial-gray))]">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-mono text-xs uppercase tracking-wide text-[rgb(var(--text-secondary))] block mb-2">
                      Material Type *
                    </label>
                    <select
                      name="material_type"
                      value={formData.material_type}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-[rgb(var(--border))] px-0 py-3 text-[rgb(var(--text-primary))] focus:border-[rgb(var(--safety-yellow))] focus:outline-none transition-colors appearance-none cursor-pointer"
                      data-testid="rfq-material-select"
                    >
                      <option value="" className="bg-[rgb(var(--industrial-gray))]">Select Material</option>
                      {materialTypes.map((type) => (
                        <option key={type} value={type} className="bg-[rgb(var(--industrial-gray))]">{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-mono text-xs uppercase tracking-wide text-[rgb(var(--text-secondary))] block mb-2">
                      Quantity/Weight *
                    </label>
                    <input
                      type="text"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-[rgb(var(--border))] px-0 py-3 text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-secondary))]/50 focus:border-[rgb(var(--safety-yellow))] focus:outline-none transition-colors"
                      placeholder="e.g., 50 MT, 10 pieces"
                      data-testid="rfq-quantity-input"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs uppercase tracking-wide text-[rgb(var(--text-secondary))] block mb-2">
                      Delivery Location *
                    </label>
                    <input
                      type="text"
                      name="delivery_location"
                      value={formData.delivery_location}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-[rgb(var(--border))] px-0 py-3 text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-secondary))]/50 focus:border-[rgb(var(--safety-yellow))] focus:outline-none transition-colors"
                      placeholder="City, State"
                      data-testid="rfq-location-input"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="font-mono text-xs uppercase tracking-wide text-[rgb(var(--text-secondary))] block mb-2">
                    Timeline/Urgency *
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-[rgb(var(--border))] px-0 py-3 text-[rgb(var(--text-primary))] focus:border-[rgb(var(--safety-yellow))] focus:outline-none transition-colors appearance-none cursor-pointer"
                    data-testid="rfq-timeline-select"
                  >
                    <option value="" className="bg-[rgb(var(--industrial-gray))]">Select Timeline</option>
                    {timelineOptions.map((option) => (
                      <option key={option} value={option} className="bg-[rgb(var(--industrial-gray))]">{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mb-10">
                <h2 className="font-oswald font-medium text-xl text-[rgb(var(--text-primary))] uppercase mb-6 pb-4 border-b border-[rgb(var(--border))]">
                  Additional Information
                </h2>

                <div className="mb-6">
                  <label className="font-mono text-xs uppercase tracking-wide text-[rgb(var(--text-secondary))] block mb-2">
                    Notes/Specifications
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-transparent border-b border-[rgb(var(--border))] px-0 py-3 text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-secondary))]/50 focus:border-[rgb(var(--safety-yellow))] focus:outline-none transition-colors resize-none"
                    placeholder="Any specific requirements, specifications, or notes..."
                    data-testid="rfq-notes-input"
                  />
                </div>

                <div>
                  <label className="font-mono text-xs uppercase tracking-wide text-[rgb(var(--text-secondary))] block mb-2">
                    Upload Drawing/Specification (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      id="rfq-file-upload"
                      accept=".pdf,.dwg,.dxf,.jpg,.jpeg,.png"
                      data-testid="rfq-file-input"
                    />
                    <label
                      htmlFor="rfq-file-upload"
                      className="flex items-center gap-3 border border-dashed border-[rgb(var(--border))] p-4 cursor-pointer hover:border-[rgb(var(--safety-yellow))]/50 transition-colors"
                    >
                      <Upload size={20} className="text-[rgb(var(--text-secondary))]" />
                      <span className="text-[rgb(var(--text-secondary))] text-sm">
                        {file ? file.name : 'Click to upload (PDF, DWG, Images - Max 10MB)'}
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[rgb(var(--safety-yellow))] text-black font-oswald font-bold uppercase py-4 flex items-center justify-center gap-3 hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="rfq-submit-btn"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
                <Send size={18} />
              </button>

              <p className="text-center text-[rgb(var(--text-secondary))] text-sm mt-6">
                By submitting, you agree to be contacted by our team regarding your inquiry.
              </p>
            </form>
          </AnimatedSection>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-12 bg-[rgb(var(--safety-yellow))]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-black">
              <p className="font-oswald font-bold text-xl uppercase">Need immediate assistance?</p>
              <p className="text-black/70">Our team is ready to help you.</p>
            </div>
            <div className="flex gap-4">
              <a
                href={`https://wa.me/${companyInfo.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-black text-white font-oswald uppercase px-6 py-3 hover:bg-[rgb(var(--industrial-gray))] transition-colors"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
              <a
                href={`tel:${companyInfo.contact.phone}`}
                className="flex items-center gap-2 bg-white text-black font-oswald font-bold uppercase px-6 py-3 hover:bg-[rgb(var(--industrial-gray))] hover:text-white transition-colors"
              >
                <Phone size={18} />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RequestQuote;
