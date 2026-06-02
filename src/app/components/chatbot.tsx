import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, MessageCircle } from 'lucide-react';

interface Message {
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

interface FlowOption {
  label: string;
  next?: string;
  action?: 'whatsapp' | 'consultation' | 'properties' | 'find_properties' | 'main_menu' | 'more_questions' | 'services_menu';
  value?: string;
}

interface FlowNode {
  message: string;
  options: FlowOption[];
}

const flows: Record<string, FlowNode> = {
  welcome: {
    message: "Hi there! 👋 I'm the Vishal Realty assistant. How can I help you today?",
    options: [
      { label: "🏠 Find a Property", next: "findProperty" },
      { label: "🛠 Our Services", next: "services" },
      { label: "📍 Areas We Cover", next: "areas" },
      { label: "❓ Common Questions", next: "faq" },
      { label: "📞 Talk to Kishore", next: "contact" }
    ]
  },

  // FLOW 1 — Find a Property
  findProperty: {
    message: "What type of property are you looking for?",
    options: [
      { label: "🏠 Apartment", next: "apartment" },
      { label: "🏡 Villa", next: "villa" },
      { label: "🧱 Plot", next: "plot" },
      { label: "🏢 Commercial Space", next: "commercial" }
    ]
  },
  apartment: {
    message: "Are you looking to buy or rent?",
    options: [
      { label: "💰 Buy", next: "apartmentBuy" },
      { label: "🔑 Rent", next: "apartmentRent" }
    ]
  },
  apartmentBuy: {
    message: "We have verified apartments for sale across Chennai. Our team will help you find the perfect match within your budget.",
    options: [
      { label: "🌐 View Properties on Website", action: "properties" },
      { label: "💬 Talk to Kishore on WhatsApp", action: "whatsapp" },
      { label: "⬅️ Back to Main Menu", action: "main_menu" }
    ]
  },
  apartmentRent: {
    message: "We have rental apartments in Adyar, OMR, Besant Nagar and Thiruvanmiyur. Prices start from ₹14,000/month.",
    options: [
      { label: "🌐 View Properties on Website", action: "properties" },
      { label: "💬 Talk to Kishore on WhatsApp", action: "whatsapp" },
      { label: "⬅️ Back to Main Menu", action: "main_menu" }
    ]
  },
  villa: {
    message: "We have independent villas in Thiruvanmiyur and ECR. Prices start from ₹2.4 Cr. Shall I connect you with Kishore?",
    options: [
      { label: "💬 Talk to Kishore on WhatsApp", action: "whatsapp" },
      { label: "⬅️ Back to Main Menu", action: "main_menu" }
    ]
  },
  plot: {
    message: "We have DTCP approved residential plots on ECR and other localities. All plots are legally verified.",
    options: [
      { label: "💬 Talk to Kishore on WhatsApp", action: "whatsapp" },
      { label: "⬅️ Back to Main Menu", action: "main_menu" }
    ]
  },
  commercial: {
    message: "We have commercial office spaces available on OMR and Adyar for lease and sale.",
    options: [
      { label: "💬 Talk to Kishore on WhatsApp", action: "whatsapp" },
      { label: "⬅️ Back to Main Menu", action: "main_menu" }
    ]
  },

  // FLOW 2 — Our Services
  services: {
    message: "We offer 5 core real estate services. Which one interests you?",
    options: [
      { label: "📈 Property Investment Advisory", next: "srvInvestment" },
      { label: "🤝 Real Estate Buying & Selling", next: "srvBuying" },
      { label: "🏢 Joint Venture Development", next: "srvJV" },
      { label: "🔑 Rentals & Leasing", next: "srvRentals" },
      { label: "🛡️ Property Management", next: "srvManagement" }
    ]
  },
  srvInvestment: {
    message: "We provide expert property investment consulting, comparative market analysis and appraisals across Residential, Commercial, Land and Industrial properties.",
    options: [
      { label: "📅 Book Free Consultation", action: "consultation" },
      { label: "⬅️ Back to Services", action: "services_menu" },
      { label: "🏠 Main Menu", action: "main_menu" }
    ]
  },
  srvBuying: {
    message: "We offer buyer and seller agent services, residential and commercial property consulting, and specialise in first-time home buyer guidance.",
    options: [
      { label: "📅 Book Free Consultation", action: "consultation" },
      { label: "⬅️ Back to Services", action: "services_menu" },
      { label: "🏠 Main Menu", action: "main_menu" }
    ]
  },
  srvJV: {
    message: "We facilitate land buying, property development consulting and new construction JV partnerships across Chennai.",
    options: [
      { label: "💬 Talk to Kishore on WhatsApp", action: "whatsapp" },
      { label: "⬅️ Back to Services", action: "services_menu" },
      { label: "🏠 Main Menu", action: "main_menu" }
    ]
  },
  srvRentals: {
    message: "We assist with property rentals, leasing solutions and office space leasing for both residential and commercial properties.",
    options: [
      { label: "🌐 View Properties", action: "properties" },
      { label: "⬅️ Back to Services", action: "services_menu" },
      { label: "🏠 Main Menu", action: "main_menu" }
    ]
  },
  srvManagement: {
    message: "We handle end-to-end property management and relocation assistance for residential and commercial property owners.",
    options: [
      { label: "📅 Book Free Consultation", action: "consultation" },
      { label: "⬅️ Back to Services", action: "services_menu" },
      { label: "🏠 Main Menu", action: "main_menu" }
    ]
  },

  // FLOW 3 — Areas We Cover
  areas: {
    message: "We serve these key localities in Chennai. Which area are you interested in?",
    options: [
      { label: "📍 Adyar", next: "areaAdyar" },
      { label: "📍 OMR", next: "areaOMR" },
      { label: "📍 ECR", next: "areaECR" },
      { label: "📍 Besant Nagar", next: "areaBesant" },
      { label: "📍 Thiruvanmiyur", next: "areaThiruvan" }
    ]
  },
  areaAdyar: {
    message: "Adyar is a premium residential and commercial hub in South Chennai. We have apartments, commercial spaces and land available here.",
    options: [
      { label: "🔍 Find Properties in Adyar", action: "find_properties", value: "Adyar" },
      { label: "💬 Talk to Kishore", action: "whatsapp" },
      { label: "🏠 Main Menu", action: "main_menu" }
    ]
  },
  areaOMR: {
    message: "OMR is Chennai's IT corridor with high rental demand. Great for rental investments and commercial spaces. Studio apartments start from ₹14,000/month.",
    options: [
      { label: "🔍 Find Properties in OMR", action: "find_properties", value: "OMR" },
      { label: "💬 Talk to Kishore", action: "whatsapp" },
      { label: "🏠 Main Menu", action: "main_menu" }
    ]
  },
  areaECR: {
    message: "ECR offers beachfront properties, villas and investment plots. Ideal for villa construction and long-term land investment.",
    options: [
      { label: "🔍 Find Properties in ECR", action: "find_properties", value: "ECR" },
      { label: "💬 Talk to Kishore", action: "whatsapp" },
      { label: "🏠 Main Menu", action: "main_menu" }
    ]
  },
  areaBesant: {
    message: "Besant Nagar is an upscale residential locality with high property values. Close to the beach and premium schools.",
    options: [
      { label: "🔍 Find Properties in Besant Nagar", action: "find_properties", value: "Besant Nagar" },
      { label: "💬 Talk to Kishore", action: "whatsapp" },
      { label: "🏠 Main Menu", action: "main_menu" }
    ]
  },
  areaThiruvan: {
    message: "Thiruvanmiyur is a steadily growing area with a good mix of residential and commercial properties. Independent villas available from ₹2.4 Cr.",
    options: [
      { label: "🔍 Find Properties in Thiruvanmiyur", action: "find_properties", value: "Thiruvanmiyur" },
      { label: "💬 Talk to Kishore", action: "whatsapp" },
      { label: "🏠 Main Menu", action: "main_menu" }
    ]
  },

  // FLOW 4 — Common Questions (FAQ)
  faq: {
    message: "Sure! What would you like to know about?",
    options: [
      { label: "🏢 Buying a Property", next: "faqBuying" },
      { label: "🔑 Renting a Property", next: "faqRenting" },
      { label: "📊 Investment & JV", next: "faqInvestment" },
      { label: "💸 Consultation & Fees", next: "faqFees" }
    ]
  },
  faqBuying: {
    message: "What's your question about buying?",
    options: [
      { label: "📄 What documents do I need?", next: "faqDocs" },
      { label: "⏳ How long does registration take?", next: "faqReg" },
      { label: "🗺️ What is UDS?", next: "faqUDS" },
      { label: "🔍 How to verify a property legally?", next: "faqLegal" }
    ]
  },
  faqDocs: {
    message: "You'll need: Aadhar Card, PAN Card, Income proof, Bank statements (6 months), Sale deed, Encumbrance certificate, and Patta/Chitta for land properties.",
    options: [
      { label: "❓ More Questions", action: "more_questions" },
      { label: "💬 Talk to Kishore", action: "whatsapp" },
      { label: "🏠 Main Menu", action: "main_menu" }
    ]
  },
  faqReg: {
    message: "Typically 1-3 working days once all documents are in order and stamp duty payment is made at the Sub-Registrar's Office.",
    options: [
      { label: "❓ More Questions", action: "more_questions" },
      { label: "💬 Talk to Kishore", action: "whatsapp" },
      { label: "🏠 Main Menu", action: "main_menu" }
    ]
  },
  faqUDS: {
    message: "UDS (Undivided Share of Land) is your proportional share of the total land in an apartment project. It is crucial for legal ownership of your flat.",
    options: [
      { label: "❓ More Questions", action: "more_questions" },
      { label: "💬 Talk to Kishore", action: "whatsapp" },
      { label: "🏠 Main Menu", action: "main_menu" }
    ]
  },
  faqLegal: {
    message: "Check the Encumbrance Certificate, title deed, approved building plan, CMDA/DTCP approval and property tax receipts. We verify all of these before recommending any property.",
    options: [
      { label: "❓ More Questions", action: "more_questions" },
      { label: "💬 Talk to Kishore", action: "whatsapp" },
      { label: "🏠 Main Menu", action: "main_menu" }
    ]
  },
  faqRenting: {
    message: "What's your question about renting?",
    options: [
      { label: "📄 What documents do I need to rent?", next: "faqRentDocs" },
      { label: "💰 What is the security deposit in Chennai?", next: "faqRentDeposit" },
      { label: "⏳ What is an 11-month agreement?", next: "faqRentAgreement" }
    ]
  },
  faqRentDocs: {
    message: "You'll need: Aadhar Card, PAN Card, recent salary slips or income proof, and 2-3 months bank statement.",
    options: [
      { label: "❓ More Questions", action: "more_questions" },
      { label: "💬 Talk to Kishore", action: "whatsapp" },
      { label: "🏠 Main Menu", action: "main_menu" }
    ]
  },
  faqRentDeposit: {
    message: "Usually 2 to 10 months of rent depending on the locality. Adyar and Besant Nagar tend to have higher deposits due to premium demand.",
    options: [
      { label: "❓ More Questions", action: "more_questions" },
      { label: "💬 Talk to Kishore", action: "whatsapp" },
      { label: "🏠 Main Menu", action: "main_menu" }
    ]
  },
  faqRentAgreement: {
    message: "An 11-month agreement avoids mandatory registration under the Registration Act. It is the most common rental format in Chennai and can be renewed after each term.",
    options: [
      { label: "❓ More Questions", action: "more_questions" },
      { label: "💬 Talk to Kishore", action: "whatsapp" },
      { label: "🏠 Main Menu", action: "main_menu" }
    ]
  },
  faqInvestment: {
    message: "A JV (Joint Venture) is a partnership where a landowner provides land and a developer provides construction. Profits or developed units are shared. ECR and OMR provide high rental yields. We provide full investment analysis.",
    options: [
      { label: "💬 Talk to Kishore", action: "whatsapp" },
      { label: "🏠 Main Menu", action: "main_menu" }
    ]
  },
  faqFees: {
    message: "We offer a FREE initial consultation — no charges, no hidden fees. Our service fees are discussed transparently before any engagement.",
    options: [
      { label: "📅 Book Free Consultation", action: "consultation" },
      { label: "💬 Talk to Kishore", action: "whatsapp" },
      { label: "🏠 Main Menu", action: "main_menu" }
    ]
  },

  // FLOW 5 — Talk to Kishore / Contact
  contact: {
    message: "Kishore is available Monday to Sunday. The fastest way to reach him is WhatsApp.\n\n📞 +91 63839 77798\n📧 vishalrealty@outlook.com\n📍 Kamaraj Avenue, 2nd Street, Adyar, Chennai",
    options: [
      { label: "💬 Chat on WhatsApp Now", action: "whatsapp" },
      { label: "📅 Book a Free Consultation", action: "consultation" },
      { label: "⬅️ Back to Main Menu", action: "main_menu" }
    ]
  }
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentNode, setCurrentNode] = useState<FlowNode>(flows.welcome);
  const [isTyping, setIsTyping] = useState(false);
  const [badgeCount, setBadgeCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize welcome flow on load
  useEffect(() => {
    const initTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages([
      {
        sender: 'bot',
        text: flows.welcome.message,
        timestamp: initTime
      }
    ]);
  }, []);

  // Auto-scroll to the bottom of the message container
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Welcome pop-up (8 seconds on first visit) & notification badge (5 seconds)
  useEffect(() => {
    // 5-second online badge notification
    const badgeTimer = setTimeout(() => {
      if (!isOpen) {
        setBadgeCount(1);
      }
    }, 5000);

    // 8-second auto-open on first visit
    const hasSeenWelcome = localStorage.getItem('has-seen-chatbot-welcome');
    const autoOpenTimer = setTimeout(() => {
      if (!hasSeenWelcome && !isOpen) {
        setIsOpen(true);
        setBadgeCount(0);
        localStorage.setItem('has-seen-chatbot-welcome', 'true');
      }
    }, 8000);

    return () => {
      clearTimeout(badgeTimer);
      clearTimeout(autoOpenTimer);
    };
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setBadgeCount(0);
    }
  };

  const handleOptionClick = (option: FlowOption) => {
    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // 1. Add user message
    setMessages((prev) => [
      ...prev,
      {
        sender: 'user',
        text: option.label,
        timestamp: userTime
      }
    ]);

    // 2. Clear current options during transition
    setCurrentNode((prev) => ({ ...prev, options: [] }));
    
    // 3. Trigger Bot Response
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      // Handle Special Action Options
      if (option.action) {
        switch (option.action) {
          case 'whatsapp':
            window.open(
              'https://wa.me/916383977798?text=Hi%2C%20I%20was%20chatting%20with%20the%20Vishal%20Realty%20website%20assistant%20and%20would%20like%20to%20speak%20with%20you%20directly.',
              '_blank',
              'noopener,noreferrer'
            );
            // Re-render current options
            setCurrentNode(flows.contact);
            setMessages((prev) => [
              ...prev,
              {
                sender: 'bot',
                text: "Connecting you to Kishore on WhatsApp...",
                timestamp: botTime
              }
            ]);
            break;

          case 'consultation':
            setIsOpen(false);
            const consultSection = document.getElementById('contact');
            if (consultSection) {
              consultSection.scrollIntoView({ behavior: 'smooth' });
            }
            break;

          case 'properties':
            setIsOpen(false);
            const propSection = document.getElementById('properties');
            if (propSection) {
              propSection.scrollIntoView({ behavior: 'smooth' });
            }
            break;

          case 'find_properties':
            setIsOpen(false);
            const propertiesGrid = document.getElementById('properties');
            if (propertiesGrid) {
              propertiesGrid.scrollIntoView({ behavior: 'smooth' });
            }
            break;

          case 'main_menu':
            setCurrentNode(flows.welcome);
            setMessages((prev) => [
              ...prev,
              {
                sender: 'bot',
                text: flows.welcome.message,
                timestamp: botTime
              }
            ]);
            break;

          case 'more_questions':
            setCurrentNode(flows.faq);
            setMessages((prev) => [
              ...prev,
              {
                sender: 'bot',
                text: flows.faq.message,
                timestamp: botTime
              }
            ]);
            break;

          case 'services_menu':
            setCurrentNode(flows.services);
            setMessages((prev) => [
              ...prev,
              {
                sender: 'bot',
                text: flows.services.message,
                timestamp: botTime
              }
            ]);
            break;
        }
        return;
      }

      // Handle standard conversation flow nodes
      if (option.next && flows[option.next]) {
        const nextNode = flows[option.next];
        setCurrentNode(nextNode);
        setMessages((prev) => [
          ...prev,
          {
            sender: 'bot',
            text: nextNode.message,
            timestamp: botTime
          }
        ]);
      }
    }, 600); // 600ms delay for natural human feel
  };

  return (
    <>
      <style>{`
        @keyframes chatbotBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .cb-dot {
          animation: chatbotBounce 0.6s infinite ease-in-out;
        }
        .cb-dot:nth-child(2) {
          animation-delay: 0.15s;
        }
        .cb-dot:nth-child(3) {
          animation-delay: 0.3s;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Floating Chat Bubble Button */}
      <button
        onClick={toggleChat}
        className="fixed rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 shadow-xl right-6"
        style={{
          bottom: '24px',
          zIndex: 1000,
          backgroundColor: '#1A2B5F',
          width: '56px',
          height: '56px'
        }}
        title="Assistant Support"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} color="white" />
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageSquare size={24} color="white" />
              
              {/* Online pulsing dot badge */}
              <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-[#1A2B5F] animate-ping" />
              <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-[#1A2B5F]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification badge */}
        {!isOpen && badgeCount > 0 && (
          <span 
            className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-md animate-bounce"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            {badgeCount}
          </span>
        )}
      </button>

      {/* Chat Window Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bg-white flex flex-col justify-between overflow-hidden shadow-2xl z-[1000] border border-gray-100 w-[calc(100vw-32px)] sm:w-[380px] h-[70vh] sm:h-[520px] right-4 sm:right-6"
            style={{
              bottom: '90px',
              borderRadius: '16px',
              boxShadow: '0 8px 40px rgba(0,0,0,0.15)'
            }}
          >
            {/* Window Header */}
            <div 
              className="px-4 py-3 flex items-center justify-between shadow-sm"
              style={{ backgroundColor: '#1A2B5F' }}
            >
              <div className="flex items-center gap-3">
                {/* Avatar with VR Initials */}
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                  style={{ backgroundColor: 'rgba(0,174,239,0.1)', color: '#00AEEF', border: '1px solid rgba(0,174,239,0.2)' }}
                >
                  VR
                </div>
                <div>
                  <h4 
                    className="text-white text-sm font-bold"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  >
                    Vishal Realty Assistant
                  </h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span 
                      className="text-[10px]"
                      style={{ color: '#00AEEF', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}
                    >
                      Online — Replies instantly
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={toggleChat}
                className="text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/50 no-scrollbar"
              style={{ maxHeight: 'calc(100% - 130px)' }}
            >
              {messages.map((msg, index) => (
                <div 
                  key={index}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  {/* Message bubble */}
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-[#00AEEF] text-white rounded-tr-none'
                        : 'bg-[#F4F6F9] text-[#1A2B5F] rounded-tl-none border border-gray-100'
                    }`}
                    style={{ 
                      fontFamily: 'DM Sans, sans-serif',
                      whiteSpace: 'pre-wrap'
                    }}
                  >
                    {msg.text}
                  </div>
                  
                  {/* Timestamp */}
                  <span 
                    className="text-[9px] text-gray-400 mt-1 px-1"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {/* Bot Typing Indicator */}
              {isTyping && (
                <div className="flex flex-col items-start">
                  <div className="bg-[#F4F6F9] px-4 py-3 rounded-2xl rounded-tl-none border border-gray-100 flex gap-1 items-center shadow-sm">
                    <span className="w-2 h-2 bg-gray-400 rounded-full cb-dot" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full cb-dot" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full cb-dot" />
                  </div>
                </div>
              )}

              {/* anchor reference for scrolling */}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Reply Selection Area */}
            <div className="p-3 bg-white border-t border-gray-100 flex flex-col gap-2 flex-shrink-0">
              {currentNode.options.length > 0 && !isTyping && (
                <div className="flex flex-wrap gap-1.5 max-h-[140px] overflow-y-auto no-scrollbar py-0.5">
                  {currentNode.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(option)}
                      className="px-3 py-2 text-xs font-bold text-[#1A2B5F] bg-white border border-[#1A2B5F]/20 hover:bg-[#1A2B5F] hover:text-white transition-all rounded-lg cursor-pointer max-w-full truncate"
                      style={{ 
                        fontFamily: 'DM Sans, sans-serif',
                        borderRadius: '6px'
                      }}
                      title={option.label}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
              {/* Fallback info when conversation path reaches a terminal WhatsApp redirect */}
              {currentNode.options.length === 0 && !isTyping && (
                <div className="text-center py-2">
                  <button
                    onClick={() => {
                      setCurrentNode(flows.welcome);
                      const t = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                      setMessages((prev) => [
                        ...prev,
                        { sender: 'bot', text: flows.welcome.message, timestamp: t }
                      ]);
                    }}
                    className="text-xs font-bold text-[#00AEEF] hover:underline cursor-pointer"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    🔄 Restart Conversation Flow
                  </button>
                </div>
              )}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
