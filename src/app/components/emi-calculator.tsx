import { useState, useMemo } from 'react';

export function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(5000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(20);

  // EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
  const emiCalculation = useMemo(() => {
    const p = loanAmount;
    const r = interestRate / 12 / 100; // Monthly interest rate
    const n = tenureYears * 12; // Tenure in months

    if (p === 0 || r === 0 || n === 0) {
      return { emi: 0, totalInterest: 0, totalAmount: p };
    }

    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emi * n;
    const totalInterest = totalAmount - p;

    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalAmount),
    };
  }, [loanAmount, interestRate, tenureYears]);

  const { emi, totalInterest, totalAmount } = emiCalculation;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Simple Principal vs Interest proportion
  const principalPercent = totalAmount > 0 ? (loanAmount / totalAmount) * 100 : 100;
  const interestPercent = totalAmount > 0 ? (totalInterest / totalAmount) * 100 : 0;

  return (
    <section id="emi-calculator" className="py-20 lg:py-24" style={{ backgroundColor: '#F4F6F9' }}>
      <style dangerouslySetInnerHTML={{__html: `
        .emi-range-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 8px;
          border-radius: 4px;
          outline: none;
        }
        .emi-range-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #00AEEF;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        .emi-range-slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #00AEEF;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
      `}} />
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p
            className="text-sm mb-3 tracking-[0.1em] uppercase"
            style={{ 
              color: '#00AEEF',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 600
            }}
          >
            CALCULATE YOUR EMI
          </p>
          <h2
            className="text-3xl lg:text-4xl mb-4"
            style={{ 
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontWeight: 800,
              color: '#1A2B5F'
            }}
          >
            Home Loan EMI Calculator
          </h2>
          <p 
            className="text-base text-gray-600"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Plan your budget with ease — estimate your monthly payments instantly.
          </p>
        </div>

        {/* Calculator Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          
          {/* Left Side: Inputs */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm flex-1 border border-gray-100 flex flex-col justify-between">
            
            {/* Loan Amount */}
            <div className="mb-8">
              <div className="flex justify-between items-end mb-4">
                <label className="text-sm font-bold text-[#1A2B5F]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  Loan Amount
                </label>
                <div className="flex items-center bg-[#F4F6F9] border border-gray-200 rounded-lg px-3 py-2.5 w-1/2 sm:w-1/3">
                  <span className="text-gray-500 font-bold mr-1">₹</span>
                  <input
                    type="number"
                    min="500000"
                    max="50000000"
                    step="50000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full bg-transparent outline-none text-[#1A2B5F] font-bold text-right"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  />
                </div>
              </div>
              <input 
                type="range"
                min="500000"
                max="50000000"
                step="50000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="emi-range-slider cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #00AEEF ${(loanAmount - 500000) / (50000000 - 500000) * 100}%, #E2E8F0 ${(loanAmount - 500000) / (50000000 - 500000) * 100}%)`,
                }}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                <span>₹5L</span>
                <span>₹5Cr</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="mb-8">
              <div className="flex justify-between items-end mb-4">
                <label className="text-sm font-bold text-[#1A2B5F]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  Interest Rate (% p.a.)
                </label>
                <div className="flex items-center bg-[#F4F6F9] border border-gray-200 rounded-lg px-3 py-2.5 w-1/3 sm:w-1/4">
                  <input
                    type="number"
                    min="6"
                    max="15"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full bg-transparent outline-none text-[#1A2B5F] font-bold text-right"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  />
                  <span className="text-gray-500 font-bold ml-1">%</span>
                </div>
              </div>
              <input 
                type="range"
                min="6"
                max="15"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="emi-range-slider cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #00AEEF ${(interestRate - 6) / (15 - 6) * 100}%, #E2E8F0 ${(interestRate - 6) / (15 - 6) * 100}%)`,
                }}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                <span>6%</span>
                <span>15%</span>
              </div>
            </div>

            {/* Loan Tenure */}
            <div className="mb-2">
              <div className="flex justify-between items-end mb-4">
                <label className="text-sm font-bold text-[#1A2B5F]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  Loan Tenure (Years)
                </label>
                <div className="flex items-center bg-[#F4F6F9] border border-gray-200 rounded-lg px-3 py-2.5 w-1/3 sm:w-1/4">
                  <input
                    type="number"
                    min="1"
                    max="30"
                    step="1"
                    value={tenureYears}
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                    className="w-full bg-transparent outline-none text-[#1A2B5F] font-bold text-right"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  />
                  <span className="text-gray-500 font-bold ml-1">Yr</span>
                </div>
              </div>
              <input 
                type="range"
                min="1"
                max="30"
                step="1"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="emi-range-slider cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #00AEEF ${(tenureYears - 1) / (30 - 1) * 100}%, #E2E8F0 ${(tenureYears - 1) / (30 - 1) * 100}%)`,
                }}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                <span>1 Yr</span>
                <span>30 Yrs</span>
              </div>
            </div>
          </div>

          {/* Right Side: Results */}
          <div className="bg-[#1A2B5F] rounded-2xl p-6 md:p-10 shadow-lg flex-1 flex flex-col justify-center text-white min-w-[300px]">
            <p className="text-sm font-bold uppercase tracking-wider text-white/70 mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Monthly EMI
            </p>
            <h3 className="text-4xl sm:text-5xl font-extrabold mb-10 text-[#00AEEF]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {formatCurrency(emi)} <span className="text-xl sm:text-2xl text-white/80 font-medium font-sans whitespace-nowrap">/ month</span>
            </h3>

            <div className="space-y-6 mb-10">
              <div className="flex justify-between items-center border-b border-white/10 pb-4 flex-wrap gap-2">
                <span className="text-white/80 font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>Principal Amount</span>
                <span className="text-lg font-bold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{formatCurrency(loanAmount)}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-4 flex-wrap gap-2">
                <span className="text-white/80 font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>Total Interest Payable</span>
                <span className="text-lg font-bold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{formatCurrency(totalInterest)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 flex-wrap gap-2">
                <span className="text-white/90 font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>Total Amount Payable</span>
                <span className="text-xl font-bold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{formatCurrency(totalAmount)}</span>
              </div>
            </div>

            {/* Proportion Bar */}
            <div className="w-full h-3 rounded-full flex overflow-hidden mb-4 bg-white/10">
              <div className="h-full bg-white transition-all duration-300" style={{ width: `${principalPercent}%` }} title={`Principal: ${principalPercent.toFixed(1)}%`}></div>
              <div className="h-full bg-[#00AEEF] transition-all duration-300" style={{ width: `${interestPercent}%` }} title={`Interest: ${interestPercent.toFixed(1)}%`}></div>
            </div>
            <div className="flex justify-between text-xs font-medium text-white/70 mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-white"></span> Principal ({principalPercent.toFixed(1)}%)</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#00AEEF]"></span> Interest ({interestPercent.toFixed(1)}%)</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 font-medium mb-4 text-sm sm:text-base" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Want personalized loan guidance based on your income and eligibility?
          </p>
          <a
            href="https://wa.me/916383977798?text=Hello%20Vishal%20Realty%2C%20I%20used%20the%20EMI%20calculator%20on%20your%20website%20and%20would%20like%20personalized%20loan%20guidance."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all"
            style={{ backgroundColor: '#25D366', fontFamily: 'DM Sans, sans-serif' }}
          >
            Talk to Our Team on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
