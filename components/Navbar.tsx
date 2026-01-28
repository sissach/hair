
import React from 'react';

interface NavbarProps {
  onBookingClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onBookingClick }) => {
  return (
    <nav className="sticky top-0 z-50 flex items-center bg-white/90 backdrop-blur-md px-6 py-4 justify-between border-b border-gray-100">
      <div className="flex flex-col">
        <h2 className="text-charcoal text-xl font-bold leading-none tracking-tight font-display italic">Lumina</h2>
        <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-gold">Hair Studio</span>
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={onBookingClick}
          className="bg-gold text-white px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all hover:bg-gold/90 hover:shadow-lg hover:shadow-gold/20 active:scale-95 shadow-sm"
        >
          Réserver
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
