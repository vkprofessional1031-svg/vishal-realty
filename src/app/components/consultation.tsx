import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import { Calendar, Phone, Mail, User, BookOpen, MessageSquare } from 'lucide-react';

interface ConsultationFormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  dateTime: string;
  message: string;
}

export function Consultation() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset 
  } = useForm<ConsultationFormData>({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      service: 'Investment Advisory',
      dateTime: '',
      message: ''
    }
  });

  const onSubmit = (data: ConsultationFormData) => {
    const formattedMessage = `Hello Vishal Realty, I would like to book a free consultation.

*Name:* ${data.name}
*Phone:* ${data.phone}
*Email:* ${data.email}
*Service Interested In:* ${data.service}
*Preferred Date & Time:* ${data.dateTime ? new Date(data.dateTime).toLocaleString() : 'Not specified'}
*Requirements/Message:* ${data.message || 'None'}`;

    const encodedMessage = encodeURIComponent(formattedMessage);
    const whatsappUrl = `https://wa.me/916383977798?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    reset();
  };

  return (
    <section id="consultation" className="py-20 lg:py-24 animate-fade-in" style={{ backgroundColor: '#F4F6F9' }}>
      <div className="max-w-[800px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p
            className="text-sm mb-3 tracking-[0.1em] uppercase"
            style={{ 
              color: '#00AEEF',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 600
            }}
          >
            FREE CONSULTATION
          </p>
          <h2
            className="text-3xl lg:text-4xl mb-4 animate-slide-up"
            style={{ 
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontWeight: 800,
              color: '#1A2B5F'
            }}
          >
            Book a Free Consultation
          </h2>
          <p 
            className="text-sm text-gray-600 max-w-md mx-auto"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Fill out the form below to share your requirements. Clicking submit will directly launch WhatsApp to finalize your booking with our experts.
          </p>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl p-8 lg:p-10 border"
          style={{ 
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            borderColor: 'rgba(0,0,0,0.04)'
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Two Column Row for Name and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div>
                <label 
                  className="block text-xs font-bold uppercase mb-2"
                  style={{ color: '#1A2B5F', fontFamily: 'DM Sans, sans-serif' }}
                >
                  Full Name *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <User size={16} />
                  </span>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#00AEEF] ${
                      errors.name ? 'border-red-500' : 'border-gray-200'
                    }`}
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                    {...register('name', { required: 'Full Name is required' })}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1 font-semibold" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label 
                  className="block text-xs font-bold uppercase mb-2"
                  style={{ color: '#1A2B5F', fontFamily: 'DM Sans, sans-serif' }}
                >
                  Phone Number *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Phone size={16} />
                  </span>
                  <input
                    type="tel"
                    placeholder="10-digit mobile number"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#00AEEF] ${
                      errors.phone ? 'border-red-500' : 'border-gray-200'
                    }`}
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                    {...register('phone', { 
                      required: 'Phone Number is required',
                      pattern: {
                        value: /^[6-9]\d{9}$/,
                        message: 'Please enter a valid 10-digit Indian mobile number'
                      }
                    })}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1 font-semibold" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    {errors.phone.message}
                  </p>
                )}
              </div>

            </div>

            {/* Email Address & Service Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Email Address */}
              <div>
                <label 
                  className="block text-xs font-bold uppercase mb-2"
                  style={{ color: '#1A2B5F', fontFamily: 'DM Sans, sans-serif' }}
                >
                  Email Address *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Mail size={16} />
                  </span>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#00AEEF] ${
                      errors.email ? 'border-red-500' : 'border-gray-200'
                    }`}
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                    {...register('email', { 
                      required: 'Email Address is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Please enter a valid email address'
                      }
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 font-semibold" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Service Interested In */}
              <div>
                <label 
                  className="block text-xs font-bold uppercase mb-2"
                  style={{ color: '#1A2B5F', fontFamily: 'DM Sans, sans-serif' }}
                >
                  Service Interested In *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <BookOpen size={16} />
                  </span>
                  <select
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 text-sm bg-white transition-all focus:outline-none focus:ring-2-focus:ring-[#00AEEF]"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                    {...register('service', { required: 'Service selection is required' })}
                  >
                    <option value="Property Investment Advisory">Investment Advisory</option>
                    <option value="Real Estate Buying & Selling">Buying & Selling</option>
                    <option value="Joint Venture Development">JV Development</option>
                    <option value="Rentals & Leasing Solutions">Rentals</option>
                    <option value="Property Management">Property Management</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Preferred Date & Time */}
            <div>
              <label 
                className="block text-xs font-bold uppercase mb-2"
                style={{ color: '#1A2B5F', fontFamily: 'DM Sans, sans-serif' }}
              >
                Preferred Date & Time
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Calendar size={16} />
                </span>
                <input
                  type="datetime-local"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                  {...register('dateTime')}
                />
              </div>
            </div>

            {/* Message / Requirements */}
            <div>
              <label 
                className="block text-xs font-bold uppercase mb-2"
                style={{ color: '#1A2B5F', fontFamily: 'DM Sans, sans-serif' }}
              >
                Message / Requirements
              </label>
              <div className="relative">
                <span className="absolute top-3 left-3 flex items-start pointer-events-none text-gray-400">
                  <MessageSquare size={16} />
                </span>
                <textarea
                  placeholder="Share details about budget, locality, or specific property needs..."
                  rows={4}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                  {...register('message')}
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full text-white font-bold py-4 px-6 rounded-lg uppercase tracking-wider transition-all duration-300 hover:opacity-90 shadow-md cursor-pointer"
                style={{ 
                  backgroundColor: '#00AEEF', 
                  fontFamily: 'DM Sans, sans-serif',
                  boxShadow: '0 4px 15px rgba(0, 174, 239, 0.2)'
                }}
              >
                Book My Free Consultation
              </button>
            </div>

          </form>
        </motion.div>
      </div>
    </section>
  );
}
