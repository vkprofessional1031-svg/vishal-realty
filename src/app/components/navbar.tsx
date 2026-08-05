import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logo from '../../assets/logo.png';
import logoSymbol from '../../assets/logo-symbol.png';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300"
      style={{ 
        fontFamily: 'DM Sans, sans-serif',
        boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,0.08)' : '0 2px 10px rgba(0,0,0,0.05)'
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center h-16 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={isScrolled ? 'symbol' : 'full'}
                src={isScrolled ? logoSymbol : logo}
                alt="Vishal Realty"
                initial={{ opacity: 0, scale: 0.95, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -5 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="h-14 w-auto object-contain cursor-pointer"
              />
            </AnimatePresence>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="#home" className="text-[#2D2D2D] hover:text-[#00AEEF] transition-colors font-medium">
              Home
            </a>
            <a href="#services" className="text-[#2D2D2D] hover:text-[#00AEEF] transition-colors font-medium">
              Services
            </a>

            <a href="#about" className="text-[#2D2D2D] hover:text-[#00AEEF] transition-colors font-medium">
              About
            </a>
            <a href="#contact" className="text-[#2D2D2D] hover:text-[#00AEEF] transition-colors font-medium">
              Contact
            </a>
          </div>

          {/* Action Buttons Group */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#contact"
              className="px-6 py-2.5 text-white font-medium rounded-md hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#00AEEF', borderRadius: '6px' }}
            >
              Get in Touch
            </a>
            <a
              href="/admin"
              className="px-6 py-2.5 font-medium rounded-md border transition-all hover:bg-[#1A2B5F] hover:text-white"
              style={{
                borderColor: '#1A2B5F',
                color: '#1A2B5F',
                backgroundColor: '#FFFFFF',
                borderRadius: '6px',
              }}
            >
              Admin
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-[#2D2D2D]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              <a
                href="#home"
                className="text-[#2D2D2D] hover:text-[#00AEEF] transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#services"
                className="text-[#2D2D2D] hover:text-[#00AEEF] transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </a>

              <a
                href="#about"
                className="text-[#2D2D2D] hover:text-[#00AEEF] transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#contact"
                className="text-[#2D2D2D] hover:text-[#00AEEF] transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
              <div className="flex flex-col gap-2.5 pt-2">
                <a
                  href="#contact"
                  className="px-6 py-2.5 text-white font-medium rounded-md hover:opacity-90 transition-opacity text-center w-full block"
                  style={{ backgroundColor: '#00AEEF', borderRadius: '6px' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get in Touch
                </a>
                <a
                  href="/admin"
                  className="px-6 py-2.5 font-medium rounded-md border transition-all hover:bg-[#1A2B5F] hover:text-white text-center w-full block"
                  style={{
                    borderColor: '#1A2B5F',
                    color: '#1A2B5F',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '6px',
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Admin
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}