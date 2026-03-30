

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden py-24">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1724992609104-d0bb884b9cb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVubmFpJTIwY2l0eSUyMHNreWxpbmUlMjBhZXJpYWwlMjB2aWV3fGVufDF8fHx8MTc3NDgyNzgyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Chennai cityscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(26, 43, 95, 0.85)' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-12 text-center">
        {/* Main Heading */}
        <div className="mb-8">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight"
            style={{ 
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.02em'
            }}
          >
            Your Trusted Real Estate Partner in Chennai
          </h1>
          
          <p
            className="text-xl md:text-2xl mb-4"
            style={{ 
              fontFamily: 'DM Sans, sans-serif',
              color: '#FFFFFF',
              opacity: 0.95,
              lineHeight: '1.6'
            }}
          >
            From finding your dream home to building sustainable futures
          </p>

          <p
            className="text-lg md:text-xl mb-10"
            style={{ 
              fontFamily: 'DM Sans, sans-serif',
              color: '#00AEEF',
              fontWeight: 500
            }}
          >
            Rental • Real Estate • Construction • Solar • Interior Design
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <a
            href="#contact"
            className="group relative px-6 md:px-10 py-4 text-white font-medium rounded-lg overflow-hidden transition-all duration-300 hover:scale-105"
            style={{ 
              backgroundColor: '#00AEEF',
              borderRadius: '8px',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '18px',
              boxShadow: '0 8px 24px rgba(0, 174, 239, 0.3)'
            }}
          >
            <span className="relative z-10">Get Started Today</span>
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ 
                background: 'linear-gradient(45deg, #00AEEF, #0088CC)'
              }}
            ></div>
          </a>
        </div>
      </div>
    </section>
  );
}