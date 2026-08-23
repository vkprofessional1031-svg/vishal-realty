import { Mail, Instagram, MessageCircle } from 'lucide-react';
import logo from '../../assets/logo-symbol.png';

export function Footer() {
  return (
    <footer className="pt-16 pb-8" style={{ backgroundColor: '#1A2B5F' }}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Main Footer Content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo & Description */}
          <div>
            <img src={logo} alt="Vishal Realty" className="h-16 w-auto mb-4 brightness-0 invert" />
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ 
                fontFamily: 'DM Sans, sans-serif',
                color: 'rgba(255, 255, 255, 0.7)'
              }}
            >
              Your trusted real estate partner in Chennai for all property needs.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="https://wa.me/916383977798"
                target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
                style={{ backgroundColor: 'rgba(0, 174, 239, 0.2)' }}
                title="WhatsApp"
              >
                <MessageCircle size={20} style={{ color: '#00AEEF' }} />
              </a>
              <a
                href="https://instagram.com/vishalrealtyadyar?igsh=MXRwNHZsdHVyYTBmMw=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
                style={{ backgroundColor: 'rgba(0, 174, 239, 0.2)' }}
                title="Instagram"
              >
                <Instagram size={20} style={{ color: '#00AEEF' }} />
              </a>
              <a
                href="mailto:kishore@vishalrealtychennai.com"
                className="w-10 h-10 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
                style={{ backgroundColor: 'rgba(0, 174, 239, 0.2)' }}
                title="Email"
              >
                <Mail size={20} style={{ color: '#00AEEF' }} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-lg mb-4"
              style={{ 
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontWeight: 700,
                color: '#FFFFFF'
              }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', href: '/#home' },
                { name: 'About Us', href: '/#about' },
                { name: 'Properties', href: '/#updates' },
                { name: 'Services', href: '/#services' },
                { name: 'Contact', href: '/#contact' }
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-[#00AEEF] transition-colors"
                    style={{ 
                      fontFamily: 'DM Sans, sans-serif',
                      color: 'rgba(255, 255, 255, 0.7)'
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3
              className="text-lg mb-4"
              style={{ 
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontWeight: 700,
                color: '#FFFFFF'
              }}
            >
              Our Services
            </h3>
            <ul className="space-y-2">
              {[
                'Residential & Commercial Sales',
                'Property Investment Advisory',
                'Land Acquisition & Development',
                'Joint Venture Consulting',
                'Rentals & Leasing Solutions',
                'Property Management Services'
              ].map((service, index) => (
                <li key={index}>
                  <a
                    href="/#services"
                    className="text-sm hover:text-[#00AEEF] transition-colors"
                    style={{ 
                      fontFamily: 'DM Sans, sans-serif',
                      color: 'rgba(255, 255, 255, 0.7)'
                    }}
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3
              className="text-lg mb-4"
              style={{ 
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontWeight: 700,
                color: '#FFFFFF'
              }}
            >
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li
                className="text-sm"
                style={{ 
                  fontFamily: 'DM Sans, sans-serif',
                  color: 'rgba(255, 255, 255, 0.7)'
                }}
              >
                Kamaraj Avenue,<br />
                2nd Street, Adyar, Chennai - 600 020
              </li>
              <li
                className="text-sm"
                style={{ 
                  fontFamily: 'DM Sans, sans-serif',
                  color: 'rgba(255, 255, 255, 0.7)'
                }}
              >
                Phone: +91 63839 77798
              </li>
              <li
                className="text-sm"
                style={{ 
                  fontFamily: 'DM Sans, sans-serif',
                  color: 'rgba(255, 255, 255, 0.7)'
                }}
              >
                Email: kishore@vishalrealtychennai.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-8 border-t text-center"
          style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          <p
            className="text-sm"
            style={{ 
              fontFamily: 'DM Sans, sans-serif',
              color: 'rgba(255, 255, 255, 0.5)'
            }}
          >
            © {new Date().getFullYear()} Vishal Realty. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}