import { Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { companyInfo } from '../../data/company';

const StickyContactBar = () => {
  const whatsappUrl = `https://wa.me/${companyInfo.contact.whatsapp}?text=Hello%20MWA%20Industries,%20I%20would%20like%20to%20enquire%20about%20your%20fabrication%20services.`;

  return (
    <>
      {/* Desktop - Side buttons */}
      <div className="hidden lg:flex fixed right-6 bottom-1/3 flex-col gap-3 z-40">
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-green-600 transition-colors group"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.3 }}
          whileHover={{ scale: 1.1 }}
          data-testid="whatsapp-btn-desktop"
        >
          <MessageCircle size={24} />
          <span className="absolute right-full mr-3 bg-industrial-gray text-white text-sm px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Chat on WhatsApp
          </span>
        </motion.a>
        <motion.a
          href={`tel:${companyInfo.contact.phone}`}
          className="w-14 h-14 bg-safety-yellow rounded-full flex items-center justify-center text-black shadow-lg hover:bg-white transition-colors group"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.3 }}
          whileHover={{ scale: 1.1 }}
          data-testid="call-btn-desktop"
        >
          <Phone size={24} />
          <span className="absolute right-full mr-3 bg-industrial-gray text-white text-sm px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Call Now
          </span>
        </motion.a>
      </div>

      {/* Mobile - Bottom bar */}
      <motion.div
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-industrial-gray border-t border-white/10 z-40 safe-area-inset-bottom"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <div className="grid grid-cols-2 divide-x divide-white/10">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-4 text-green-400 hover:bg-green-500/10 transition-colors"
            data-testid="whatsapp-btn-mobile"
          >
            <MessageCircle size={20} />
            <span className="font-oswald text-sm uppercase">WhatsApp</span>
          </a>
          <a
            href={`tel:${companyInfo.contact.phone}`}
            className="flex items-center justify-center gap-2 py-4 text-safety-yellow hover:bg-safety-yellow/10 transition-colors"
            data-testid="call-btn-mobile"
          >
            <Phone size={20} />
            <span className="font-oswald text-sm uppercase">Call Now</span>
          </a>
        </div>
      </motion.div>
    </>
  );
};

export default StickyContactBar;
