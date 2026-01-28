
import React from 'react';
import { SiteContent, Service } from '../types';
import EditableText from './EditableText';

interface ServicesProps {
  content: SiteContent;
  updateContent: (key: keyof SiteContent, value: any) => void;
  isEditMode: boolean;
}

// Composant pour les icônes SVG personnalisées
const ServiceIcon = ({ icon }: { icon: string }) => {
  const iconProps = {
    className: "w-8 h-8",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.2",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (icon) {
    case 'content_cut': // Coupe
      return (
        <svg {...iconProps}>
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="18" r="3" />
          <path d="M7.5 15.5L17 4" />
          <path d="M16.5 15.5L7 4" />
        </svg>
      );
    case 'palette': // Coloration
      return (
        <svg {...iconProps}>
          <path d="M12 21.5C16.6944 21.5 20.5 17.6944 20.5 13C20.5 8.30558 12 2.5 12 2.5C12 2.5 3.5 8.30558 3.5 13C3.5 17.6944 7.30558 21.5 12 21.5Z" />
          <path d="M12 11V15" />
          <path d="M10 13H14" />
        </svg>
      );
    case 'auto_awesome': // Soins
      return (
        <svg {...iconProps}>
          <path d="M12 3V5M12 19V21M3 12H5M19 12H21M5.636 5.636L7.05 7.05M16.95 16.95L18.364 18.364M5.636 18.364L7.05 16.95M16.95 7.05L18.364 5.636" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      );
    case 'wind_power': // Brushing
      return (
        <svg {...iconProps}>
          <path d="M3 13H10M3 10H14M3 16H12" />
          <path d="M15 10C15 8.34315 16.3431 7 18 7C19.6569 7 21 8.34315 21 10C21 11.6569 19.6569 13 18 13" />
          <path d="M18 13V21" />
        </svg>
      );
    default:
      return null;
  }
};

const Services: React.FC<ServicesProps> = ({ content, updateContent, isEditMode }) => {
  const handleServiceUpdate = (id: string, field: keyof Service, newValue: string) => {
    const updatedServices = content.services.map(s => 
      s.id === id ? { ...s, [field]: newValue } : s
    );
    updateContent('services', updatedServices);
  };

  return (
    <section className="py-24 px-6 bg-background-light" id="services">
      <div className="flex items-center justify-between mb-12 px-2 max-w-screen-xl mx-auto">
        <div>
          <span className="text-gold text-[10px] font-bold uppercase tracking-widest">Prestations</span>
          <h2 className="text-charcoal text-4xl font-medium font-display italic">Nos Services</h2>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-screen-xl mx-auto">
        {content.services.map((service) => (
          <div 
            key={service.id} 
            className="group relative bg-white p-8 rounded-[2rem] border border-gray-100 flex flex-col gap-6 shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:scale-105 hover:bg-charcoal transition-all duration-500 ease-in-out cursor-default overflow-hidden"
          >
            {/* Background Accent for Hover */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -mr-16 -mt-16 transition-all duration-700 group-hover:bg-gold/10 group-hover:scale-150"></div>
            
            <div className="relative z-10 bg-gold/10 text-gold rounded-full w-14 h-14 flex items-center justify-center transition-all duration-500 group-hover:bg-gold group-hover:text-white group-hover:rotate-[360deg]">
              <ServiceIcon icon={service.icon} />
            </div>
            
            <div className="relative z-10 flex justify-between items-end">
              <div className="flex-1">
                <h3 className="font-bold text-xl text-charcoal group-hover:text-white transition-colors duration-500">
                  <EditableText 
                    value={service.name} 
                    onSave={(v) => handleServiceUpdate(service.id, 'name', v)} 
                    isEditing={isEditMode} 
                  />
                </h3>
                <p className="text-sm text-gray-400 mt-2 font-light group-hover:text-white/60 transition-colors duration-500">
                  <EditableText 
                    value={service.description} 
                    onSave={(v) => handleServiceUpdate(service.id, 'description', v)} 
                    isEditing={isEditMode} 
                  />
                </p>
              </div>
              <span className="text-gold font-bold text-base whitespace-nowrap ml-4 transition-transform duration-500 group-hover:scale-110">
                Dès <EditableText 
                  value={service.price} 
                  onSave={(v) => handleServiceUpdate(service.id, 'price', v)} 
                  isEditing={isEditMode} 
                />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
