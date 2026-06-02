import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

const faqCategories = [
  {
    name: 'Buying a Property',
    questions: [
      {
        q: 'What is the first step to buying a property in Chennai?',
        a: 'Start by defining your budget and preferred locality. Then consult a trusted real estate advisor like Vishal Realty to shortlist verified properties that match your requirements.'
      },
      {
        q: 'What documents are required to buy a property?',
        a: 'Key documents include: Aadhar Card, PAN Card, Income proof, Bank statements (6 months), Sale deed, Encumbrance certificate, and Patta/Chitta for land properties.'
      },
      {
        q: 'How long does the property registration process take?',
        a: "Typically 1-3 working days once all documents are in order and the stamp duty payment is made at the Sub-Registrar's Office."
      },
      {
        q: 'What is the difference between UDS and built-up area?',
        a: 'UDS (Undivided Share of Land) is your proportional share of the total land in an apartment project. Built-up area is the total constructed area including walls. UDS is crucial for legal ownership.'
      },
      {
        q: 'How do I verify if a property is legally clear?',
        a: 'Check the Encumbrance Certificate (EC), title deed, approved building plan, CMDA/DTCP approval, and property tax receipts. Vishal Realty verifies all these before recommending any property.'
      }
    ]
  },
  {
    name: 'Renting & Leasing',
    questions: [
      {
        q: 'What documents are needed to rent a property?',
        a: 'Aadhar Card, PAN Card, recent salary slips or income proof, and 2-3 months bank statement. Some landlords may also ask for an employment letter.'
      },
      {
        q: 'What is the typical security deposit in Chennai?',
        a: 'Usually 2 to 10 months of rent depending on the locality and property type. Adyar and Besant Nagar tend to have higher deposits due to premium demand.'
      },
      {
        q: 'What is an 11-month rental agreement and why is it used?',
        a: 'An 11-month agreement avoids the requirement for mandatory registration under the Registration Act. It is the most common rental agreement format in Chennai and can be renewed or renegotiated after each term.'
      }
    ]
  },
  {
    name: 'Investment & Joint Venture',
    questions: [
      {
        q: 'What is a Joint Venture development in real estate?',
        a: 'A JV is a partnership where a landowner provides the land and a builder/developer provides the construction. Profits or developed units are shared as per agreement. Vishal Realty facilitates and advises on such deals.'
      },
      {
        q: 'Which areas in Chennai give the best rental returns?',
        a: 'OMR and ECR offer strong rental yields due to IT workforce demand. Adyar and Besant Nagar command premium rents. Thiruvanmiyur is growing steadily with good returns.'
      },
      {
        q: 'How do I evaluate if a property is a good investment?',
        a: 'Consider location growth potential, rental yield, UDS value, builder reputation, legal clearances, and proximity to employment hubs. Our team provides detailed investment analysis for every property.'
      }
    ]
  },
  {
    name: 'General',
    questions: [
      {
        q: "What is Vishal Realty's consultation fee?",
        a: 'We offer a free initial consultation. Our fees are transparently discussed before any service engagement with no hidden charges.'
      },
      {
        q: 'Do you handle both residential and commercial properties?',
        a: 'Yes. We handle residential apartments, villas, plots, as well as commercial spaces, office leasing, and land transactions across Chennai.'
      },
      {
        q: 'How do I get started with Vishal Realty?',
        a: 'Simply call or WhatsApp us at +91 63839 77798, fill the consultation form on our website, or visit our office at Kamaraj Avenue, 2nd Street, Adyar, Chennai.'
      }
    ]
  }
];

export function FAQ() {
  return (
    <section id="faq" className="py-20 lg:py-24 bg-white">
      <div className="max-w-[1000px] mx-auto px-6">
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
            COMMON QUESTIONS
          </p>
          <h2
            className="text-3xl lg:text-4xl"
            style={{ 
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontWeight: 800,
              color: '#1A2B5F'
            }}
          >
            Frequently Asked Questions
          </h2>
        </div>

        {/* Categories */}
        <div className="space-y-12">
          {faqCategories.map((category, catIdx) => (
            <div key={catIdx} className="space-y-4">
              <h3 
                className="text-lg lg:text-xl font-bold border-b pb-2 mb-4"
                style={{ 
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  color: '#1A2B5F',
                  borderColor: 'rgba(26, 43, 95, 0.1)'
                }}
              >
                {category.name}
              </h3>

              <Accordion.Root type="single" collapsible className="w-full space-y-3">
                {category.questions.map((faq, faqIdx) => {
                  const itemId = `faq-${catIdx}-${faqIdx}`;
                  return (
                    <Accordion.Item 
                      key={faqIdx} 
                      value={itemId} 
                      className="bg-[#F4F6F9] rounded-lg overflow-hidden border border-transparent transition-colors duration-200"
                    >
                      <Accordion.Header className="m-0">
                        <Accordion.Trigger 
                          className="flex justify-between items-center w-full px-6 py-4 text-left font-bold text-sm lg:text-base cursor-pointer transition-colors duration-200 hover:text-[#00AEEF] group"
                          style={{ 
                            fontFamily: 'Plus Jakarta Sans, sans-serif',
                            color: '#1A2B5F'
                          }}
                        >
                          <span className="pr-4">{faq.q}</span>
                          <ChevronDown 
                            size={18} 
                            className="text-[#1A2B5F] group-hover:text-[#00AEEF] transition-transform duration-350 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180 flex-shrink-0" 
                          />
                        </Accordion.Trigger>
                      </Accordion.Header>

                      <Accordion.Content 
                        className="overflow-hidden text-sm data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down"
                        style={{ 
                          fontFamily: 'DM Sans, sans-serif',
                          color: '#4A4A4A'
                        }}
                      >
                        <div className="px-6 pb-5 pt-1 leading-relaxed border-t border-gray-200/50">
                          {faq.a}
                        </div>
                      </Accordion.Content>
                    </Accordion.Item>
                  );
                })}
              </Accordion.Root>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
