
import React from 'react';
import { SiteContent } from '../types';
import EditableText from './EditableText';

interface FooterProps {
  content: SiteContent;
  updateContent: (key: keyof SiteContent, value: any) => void;
  isEditMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ content, updateContent, isEditMode }) => {
  return (
    <footer className="bg-white pt-24 pb-40 px-8 border-t border-gray-100">
      <div className="flex flex-col items-center gap-16 max-w-screen-xl mx-auto">
        <div className="text-center">
          <h2 className="text-4xl font-medium font-display italic tracking-tight">Lumina</h2>
          <p className="text-[10px] text-gold mt-2 uppercase tracking-[0.5em] font-bold">Paris • Studio</p>
        </div>
        
        <div className="flex gap-14">
          {['share', 'photo_camera', 'mail'].map((icon) => (
            <a key={icon} className="text-charcoal/60 hover:text-gold transition-colors" href="#">
              <span className="material-symbols-outlined text-2xl">{icon}</span>
            </a>
          ))}
        </div>
        
        <div className="text-center space-y-12 w-full">
          <div className="space-y-3">
            <p className="text-2xl font-medium tracking-tight">
              <EditableText 
                value={content.phone} 
                onSave={(v) => updateContent('phone', v)} 
                isEditing={isEditMode} 
              />
            </p>
            <p className="text-base text-gray-400 font-light">
              <EditableText 
                value={content.email} 
                onSave={(v) => updateContent('email', v)} 
                isEditing={isEditMode} 
              />
            </p>
          </div>
          
          <div className="pt-12 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[10px] text-gray-300 uppercase tracking-widest font-medium">© 2024 Lumina Hair Studio</p>
            <div className="flex gap-10 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              <a href="#" className="hover:text-gold transition-colors">Mentions Légales</a>
              <a href="#" className="hover:text-gold transition-colors">Confidentialité</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
