import { useState } from 'react';
import { MapPin, Phone, Mail, Send, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';

type ContactFormData = {
  fullName: string;
  phone: string;
  email: string;
  message: string;
};

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section id="contact" className="py-20 lg:py-24" style={{ backgroundColor: '#F4F6F9' }}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <p
            className="text-sm mb-3 tracking-[0.1em] uppercase"
            style={{ 
              color: '#00AEEF',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 600
            }}
          >
            GET IN TOUCH
          </p>
          <h2
            className="text-3xl lg:text-4xl"
            style={{ 
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontWeight: 800,
              color: '#1A2B5F'
            }}
          >
            Contact Us Today
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Map & Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Map Placeholder */}
            <div
              className="rounded-lg mb-6 overflow-hidden"
              style={{ 
                borderRadius: '10px',
                height: '300px',
                backgroundColor: '#E5E7EB'
              }}
            >
              <iframe
                src="https://www.google.com/maps?q=Adyar,+Chennai&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(0, 174, 239, 0.1)' }}
                >
                  <MapPin size={20} style={{ color: '#00AEEF' }} />
                </div>
                <div>
                  <h3
                    className="text-base mb-1"
                    style={{ 
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                      fontWeight: 700,
                      color: '#1A2B5F'
                    }}
                  >
                    Address
                  </h3>
                  <p
                    className="text-sm"
                    style={{ 
                      fontFamily: 'DM Sans, sans-serif',
                      color: '#2D2D2D'
                    }}
                  >
                    Kamaraj Avenue, 2nd Street, Adyar, Chennai - 600 020
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(0, 174, 239, 0.1)' }}
                >
                  <Phone size={20} style={{ color: '#00AEEF' }} />
                </div>
                <div>
                  <h3
                    className="text-base mb-1"
                    style={{ 
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                      fontWeight: 700,
                      color: '#1A2B5F'
                    }}
                  >
                    Phone
                  </h3>
                  <p
                    className="text-sm"
                    style={{ 
                      fontFamily: 'DM Sans, sans-serif',
                      color: '#2D2D2D'
                    }}
                  >
                    +91 63839 77798
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(0, 174, 239, 0.1)' }}
                >
                  <Mail size={20} style={{ color: '#00AEEF' }} />
                </div>
                <div>
                  <h3
                    className="text-base mb-1"
                    style={{ 
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                      fontWeight: 700,
                      color: '#1A2B5F'
                    }}
                  >
                    Email
                  </h3>
                  <p
                    className="text-sm"
                    style={{ 
                      fontFamily: 'DM Sans, sans-serif',
                      color: '#2D2D2D'
                    }}
                  >
                    vishalrealty@outlook.com
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg p-8 h-fit"
            style={{ 
              borderRadius: '10px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}
          >
            {isSuccess ? (
              <div className="text-center py-12">
                <div className="inline-flex w-16 h-16 rounded-full items-center justify-center mb-4" style={{ backgroundColor: 'rgba(0, 174, 239, 0.1)' }}>
                  <Send size={32} style={{ color: '#00AEEF' }} />
                </div>
                <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#1A2B5F' }}>
                  Thank you! We'll get back to you shortly.
                </h3>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label
                    className="block text-sm mb-2"
                    style={{ 
                      fontFamily: 'DM Sans, sans-serif',
                      fontWeight: 500,
                      color: '#1A2B5F'
                    }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    {...register('fullName', { required: 'Full Name is required', minLength: { value: 2, message: 'Minimum 2 characters' } })}
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-[#00AEEF] transition-colors"
                    style={{ 
                      borderRadius: '6px',
                      fontFamily: 'DM Sans, sans-serif'
                    }}
                  />
                  {errors.fullName && <p className="text-sm mt-1" style={{ color: '#D4183D' }}>{errors.fullName.message}</p>}
                </div>

                <div>
                  <label
                    className="block text-sm mb-2"
                    style={{ 
                      fontFamily: 'DM Sans, sans-serif',
                      fontWeight: 500,
                      color: '#1A2B5F'
                    }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 63839 77798"
                    {...register('phone', { 
                      required: 'Phone Number is required',
                      pattern: {
                        value: /^(\+91[\-\s]?)?[7896]\d{9}$|^\d{10}$/i,
                        message: 'Must match Indian phone format (+91 or 10 digits)'
                      }
                    })}
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-[#00AEEF] transition-colors"
                    style={{ 
                      borderRadius: '6px',
                      fontFamily: 'DM Sans, sans-serif'
                    }}
                  />
                  {errors.phone && <p className="text-sm mt-1" style={{ color: '#D4183D' }}>{errors.phone.message}</p>}
                </div>

                <div>
                  <label
                    className="block text-sm mb-2"
                    style={{ 
                      fontFamily: 'DM Sans, sans-serif',
                      fontWeight: 500,
                      color: '#1A2B5F'
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    {...register('email', { 
                      required: 'Email Address is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email format'
                      }
                    })}
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-[#00AEEF] transition-colors"
                    style={{ 
                      borderRadius: '6px',
                      fontFamily: 'DM Sans, sans-serif'
                    }}
                  />
                  {errors.email && <p className="text-sm mt-1" style={{ color: '#D4183D' }}>{errors.email.message}</p>}
                </div>

                <div>
                  <label
                    className="block text-sm mb-2"
                    style={{ 
                      fontFamily: 'DM Sans, sans-serif',
                      fontWeight: 500,
                      color: '#1A2B5F'
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your requirements..."
                    {...register('message', { required: 'Message is required', minLength: { value: 10, message: 'Minimum 10 characters' } })}
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-[#00AEEF] transition-colors resize-none"
                    style={{ 
                      borderRadius: '6px',
                      fontFamily: 'DM Sans, sans-serif'
                    }}
                  />
                  {errors.message && <p className="text-sm mt-1" style={{ color: '#D4183D' }}>{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3.5 text-white font-medium rounded-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-70"
                  style={{ 
                    backgroundColor: '#00AEEF',
                    borderRadius: '6px',
                    fontFamily: 'DM Sans, sans-serif'
                  }}
                >
                  {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
