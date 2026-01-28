
import React from 'react';
import { SiteContent } from '../types';
import EditableText from './EditableText';

interface HoursProps {
  content?: SiteContent;
  updateContent?: (key: keyof SiteContent, value: any) => void;
  isEditMode?: boolean;
}

const Hours: React.FC<HoursProps> = ({ content, updateContent, isEditMode = false }) => {
  return (
    <section className="py-24 px-6 max-w-screen-xl mx-auto" id="horaires">
      <div className="bg-charcoal text-white rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="mb-10">
              <span className="text-gold text-[10px] font-bold uppercase tracking-[0.3em] block mb-3">Visitez-nous</span>
              <h2 className="text-4xl font-medium font-display italic">Horaires d'Ouverture</h2>
            </div>
            <div className="space-y-6">
              {[
                { label: 'Lundi - Mardi', time: '09:00 — 18:30' },
                { label: 'Mercredi - Vendredi', time: '09:00 — 20:00' },
                { label: 'Samedi', time: '08:30 — 16:00', highlight: true },
                { label: 'Dimanche', time: 'Fermé', faded: true }
              ].map((row, idx) => (
                <div key={idx} className={`flex justify-between items-center border-b border-white/5 pb-4 ${row.highlight ? 'text-gold' : ''}`}>
                  <span className={`${row.faded ? 'text-white/20 italic' : row.highlight ? 'font-bold' : 'text-white/60'} text-base font-light`}>
                    {row.label}
                  </span>
                  <span className={`text-base ${row.faded ? 'text-white/20 italic' : row.highlight ? 'font-bold' : ''}`}>
                    {row.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:border-l lg:border-white/10 lg:pl-16 flex flex-col justify-center">
            <div className="flex items-start gap-5 mb-8">
              <span className="material-symbols-outlined text-gold text-3xl">location_on</span>
              <div>
                <p className="font-medium text-2xl leading-snug">
                  {content && updateContent ? (
                    <EditableText 
                      value={content.address} 
                      onSave={(v) => updateContent('address', v)} 
                      isEditing={isEditMode} 
                    />
                  ) : (
                    "12 Avenue de l'Opéra"
                  )}
                </p>
                <p className="text-white/50 font-light text-lg">75001 Paris, France</p>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-4 bg-white/5 hover:bg-white/10 py-5 rounded-2xl transition-all border border-white/10 group active:scale-95">
              <span className="material-symbols-outlined text-gold group-hover:scale-110 transition-transform">directions</span>
              <span className="text-xs font-bold uppercase tracking-[0.2em]">Obtenir l'itinéraire</span>
            </button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-gold/10 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-white/5 rounded-full blur-[100px]"></div>
      </div>
    </section>
  );
};

export default Hours;
