
import React from 'react';
import { HERO_IMAGE } from '../constants';
import { SiteContent } from '../types';
import EditableText from './EditableText';

interface HeroProps {
  content: SiteContent;
  updateContent: (key: keyof SiteContent, value: any) => void;
  isEditMode: boolean;
  onBookingClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ content, updateContent, isEditMode, onBookingClick }) => {
  return (
    <section className="relative h-[85vh] flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          alt="Lumina Studio Interior" 
          className="w-full h-full object-cover scale-105 animate-[slow-zoom_20s_ease-in-out_infinite]" 
          src={HERO_IMAGE} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-charcoal/50 to-charcoal/90"></div>
      </div>
      <div className="relative z-10 flex flex-col gap-8 items-center">
        <div className="flex flex-col gap-3">
          <span className="text-gold text-xs font-bold tracking-[0.5em] uppercase">Lumina Hair Studio</span>
          <h1 className="text-white text-6xl md:text-7xl font-medium leading-[1.1] hero-text">
            <EditableText 
              value={content.heroTitle} 
              onSave={(v) => updateContent('heroTitle', v)} 
              isEditing={isEditMode} 
            />
          </h1>
          <div className="h-0.5 w-16 bg-gold mx-auto mt-2"></div>
        </div>
        <p className="text-white/90 text-sm md:text-base max-w-[400px] font-light leading-relaxed">
          <EditableText 
            value={content.heroSubtitle} 
            onSave={(v) => updateContent('heroSubtitle', v)} 
            isEditing={isEditMode} 
          />
        </p>
        <button 
          onClick={onBookingClick}
          className="mt-4 flex min-w-[240px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-gold text-white text-[11px] font-bold uppercase tracking-[0.2em] shadow-2xl shadow-gold/30 hover:bg-gold/90 transition-all active:scale-95"
        >
          Réserver Maintenant
        </button>
      </div>
      
      <style>{`
        @keyframes slow-zoom {
          0%, 100% { transform: scale(1.05); }
          50% { transform: scale(1.15); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
