import { Home, Building2, Factory, Landmark } from 'lucide-react';

export function CategoryTags() {
  const categories = [
    { icon: Landmark, label: 'Land' },
    { icon: Home, label: 'Residential' },
    { icon: Building2, label: 'Commercial' },
    { icon: Factory, label: 'Industrial' },
  ];

  return (
    <section className="py-6" style={{ backgroundColor: '#F4F6F9' }}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
              style={{ 
                borderLeft: '3px solid #00AEEF',
                fontFamily: 'DM Sans, sans-serif'
              }}
            >
              <category.icon size={20} style={{ color: '#1A2B5F' }} />
              <span className="font-medium" style={{ color: '#1A2B5F' }}>
                {category.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
