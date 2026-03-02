import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { companyInfo } from '../../data/company';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Industries', path: '/industries' },
  { name: 'Projects', path: '/projects' },
  { name: 'Quality', path: '/quality' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:block bg-industrial-gray border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <a href={`mailto:${companyInfo.contact.email}`} className="flex items-center gap-2 hover:text-safety-yellow transition-colors">
              <Mail size={14} />
              {companyInfo.contact.email}
            </a>
            <a href={`tel:${companyInfo.contact.phone}`} className="flex items-center gap-2 hover:text-safety-yellow transition-colors">
              <Phone size={14} />
              +91 {companyInfo.contact.phone}
            </a>
          </div>
          <div className="text-xs text-slate-500 font-mono">
            GST: {companyInfo.contact.gst}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.nav
        className={`fixed top-0 lg:top-[41px] left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-industrial-black/95 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3" data-testid="nav-logo">
              <div className="relative">
                <div className="w-12 h-12 bg-safety-yellow flex items-center justify-center">
                  <span className="font-oswald font-bold text-black text-xl">M</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white" />
              </div>
              <div className="hidden sm:block">
                <span className="font-oswald font-bold text-xl text-white tracking-tight">MWA</span>
                <span className="font-oswald text-xl text-safety-yellow tracking-tight ml-1">Industries</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-oswald text-sm uppercase tracking-wide px-4 py-2 transition-colors relative group ${
                    location.pathname === link.path 
                      ? 'text-safety-yellow' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                  data-testid={`nav-${link.name.toLowerCase()}`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-safety-yellow transition-all duration-300 ${
                    location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link
                to="/request-quote"
                className="bg-safety-yellow text-black font-oswald font-bold uppercase text-sm px-6 py-3 hover:bg-white transition-colors duration-300"
                data-testid="nav-request-quote-btn"
              >
                Request Quote
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white"
              data-testid="mobile-menu-btn"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/90" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div
              className="absolute top-20 left-0 right-0 bg-industrial-gray border-b border-white/10"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-6 space-y-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      className={`block font-oswald text-lg uppercase tracking-wide py-3 border-b border-white/5 ${
                        location.pathname === link.path 
                          ? 'text-safety-yellow' 
                          : 'text-slate-300'
                      }`}
                      data-testid={`mobile-nav-${link.name.toLowerCase()}`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  className="pt-4"
                >
                  <Link
                    to="/request-quote"
                    className="block bg-safety-yellow text-black font-oswald font-bold uppercase text-center py-4"
                    data-testid="mobile-request-quote-btn"
                  >
                    Request Quote
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
