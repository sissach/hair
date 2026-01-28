
import React, { useState, useEffect } from 'react';
import { Tab, SiteContent, Service, Booking } from './types';
import { SERVICES, HERO_IMAGE } from './constants';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Services from './components/Services';
import Hours from './components/Hours';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import BookingForm from './components/BookingForm';
import AdminDashboard from './components/AdminDashboard';

const INITIAL_CONTENT: SiteContent = {
  heroTitle: "L'Art de la Coiffure",
  heroSubtitle: "Une expérience de luxe sur-mesure au cœur de Paris.",
  philosophyTitle: "Expertise & Passion",
  philosophyText: "Chez Lumina, nous transcendons la coiffure traditionnelle. Chaque visite est une immersion dans un univers de soin où l'expertise technique rencontre l'élégance intemporelle. Nos stylistes utilisent exclusivement des produits premium pour sublimer l'essence même de votre chevelure.",
  phone: "+33 1 23 45 67 89",
  email: "contact@luminahairstudio.fr",
  address: "12 Avenue de l'Opéra",
  services: SERVICES
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.HOME);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [content, setContent] = useState<SiteContent>(() => {
    const saved = localStorage.getItem('lumina_content');
    return saved ? JSON.parse(saved) : INITIAL_CONTENT;
  });
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('lumina_bookings');
    return saved ? JSON.parse(saved) : [];
  });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('lumina_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const updateContent = (key: keyof SiteContent, value: any) => {
    setContent(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const saveToStorage = () => {
    localStorage.setItem('lumina_content', JSON.stringify(content));
    setHasUnsavedChanges(false);
    alert('Modifications enregistrées avec succès !');
  };

  const resetContent = () => {
    if (confirm('Voulez-vous vraiment réinitialiser tout le contenu ?')) {
      setContent(INITIAL_CONTENT);
      localStorage.removeItem('lumina_content');
      setHasUnsavedChanges(false);
    }
  };

  const handleAddBooking = (newBooking: Booking) => {
    setBookings(prev => [...prev, newBooking]);
  };

  const handleDeleteBooking = (id: string) => {
    if (confirm('Supprimer cette réservation ?')) {
      setBookings(prev => prev.filter(b => b.id !== id));
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === '007') {
      setIsLoggedIn(true);
      setUsername('');
      setPassword('');
    } else {
      alert('Identifiants incorrects');
    }
  };

  const goToBooking = () => setActiveTab(Tab.BOOKING);

  return (
    <div className={`min-h-screen bg-background-light selection:bg-gold/30 ${isEditMode ? 'admin-editing' : ''}`}>
      <Navbar onBookingClick={goToBooking} />
      
      <main className="pb-24">
        {activeTab === Tab.HOME && (
          <div className="animate-in fade-in duration-700">
            <Hero content={content} updateContent={updateContent} isEditMode={isEditMode} onBookingClick={goToBooking} />
            <Philosophy content={content} updateContent={updateContent} isEditMode={isEditMode} />
            <Services content={content} updateContent={updateContent} isEditMode={isEditMode} />
            <Hours content={content} updateContent={updateContent} isEditMode={isEditMode} />
            <Footer content={content} updateContent={updateContent} isEditMode={isEditMode} />
          </div>
        )}

        {activeTab === Tab.SERVICES && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <Services content={content} updateContent={updateContent} isEditMode={isEditMode} />
            <div className="px-8 pb-12 max-w-screen-xl mx-auto">
              <h3 className="font-display italic text-3xl mb-8">Informations Complémentaires</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h4 className="font-bold text-gold uppercase text-xs tracking-widest mb-4">Diagnostic Offert</h4>
                  <p className="text-gray-500 font-light">Nous commençons chaque prestation par une étude approfondie de la morphologie de votre visage et de la nature de vos cheveux.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h4 className="font-bold text-gold uppercase text-xs tracking-widest mb-4">Produits Premium</h4>
                  <p className="text-gray-500 font-light">Nous utilisons exclusivement des gammes professionnelles reconnues pour leur excellence et leur respect de la fibre capillaire.</p>
                </div>
              </div>
            </div>
            <Footer content={content} updateContent={updateContent} isEditMode={isEditMode} />
          </div>
        )}

        {activeTab === Tab.BOOKING && (
          <div className="p-8 animate-in zoom-in-95 duration-500 max-w-screen-xl mx-auto min-h-[70vh] flex flex-col justify-center">
            <BookingForm existingBookings={bookings} onAddBooking={handleAddBooking} />
          </div>
        )}

        {activeTab === Tab.GALLERY && (
          <div className="p-8 animate-in fade-in duration-500 max-w-screen-xl mx-auto">
            <div className="mb-12">
              <span className="text-gold text-[10px] font-bold uppercase tracking-widest">Inspiration</span>
              <h2 className="text-4xl font-medium font-display italic">Galerie</h2>
            </div>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {[1, 2, 3, 4, 5, 6].map((idx) => (
                <div key={idx} className="overflow-hidden rounded-3xl shadow-lg group">
                  <img 
                    src={`https://picsum.photos/seed/hair${idx}/600/${idx % 2 === 0 ? '800' : '400'}`} 
                    alt={`Hair model ${idx}`}
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === Tab.CONTACT && (
          <div className="animate-in slide-in-from-right-4 duration-500">
            <Hours content={content} updateContent={updateContent} isEditMode={isEditMode} />
            <div className="px-8 pb-12 max-w-screen-xl mx-auto">
              <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-100">
                <h3 className="font-display italic text-3xl mb-8">Écrivez-nous</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" placeholder="Nom complet" className="w-full bg-gray-50 border-none rounded-xl p-4 focus:ring-1 focus:ring-gold" />
                    <input type="email" placeholder="Email" className="w-full bg-gray-50 border-none rounded-xl p-4 focus:ring-1 focus:ring-gold" />
                  </div>
                  <textarea placeholder="Votre message" rows={4} className="w-full bg-gray-50 border-none rounded-xl p-4 focus:ring-1 focus:ring-gold"></textarea>
                  <button className="bg-gold text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs shadow-lg shadow-gold/20 active:scale-95 transition-all">
                    Envoyer
                  </button>
                </form>
              </div>
            </div>
            <Footer content={content} updateContent={updateContent} isEditMode={isEditMode} />
          </div>
        )}

        {activeTab === Tab.ADMIN && (
          <div className="p-8 animate-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto min-h-[70vh] flex flex-col items-center justify-center">
            {!isLoggedIn ? (
              <div className="bg-white p-10 rounded-[2rem] shadow-xl border border-gray-100 w-full max-w-lg">
                <div className="text-center mb-8">
                  <span className="material-symbols-outlined text-gold text-5xl mb-4">lock</span>
                  <p className="text-gray-400 text-sm mt-2">Veuillez vous connecter pour accéder à l'administration</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">Nom d'utilisateur</label>
                    <input 
                      type="text" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-gray-50 border-none rounded-xl p-4 focus:ring-1 focus:ring-gold"
                      placeholder="admin"
                      autoComplete="username"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">Mot de passe</label>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-gray-50 border-none rounded-xl p-4 focus:ring-1 focus:ring-gold"
                      placeholder="007"
                      autoComplete="current-password"
                    />
                  </div>
                  <button type="submit" className="w-full bg-charcoal text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-gold transition-colors">
                    Se Connecter
                  </button>
                </form>
              </div>
            ) : (
              <div className="w-full space-y-12">
                <div className="bg-white p-10 rounded-[2rem] shadow-xl border border-gray-100 text-center max-w-lg mx-auto">
                  <span className="material-symbols-outlined text-green-500 text-5xl mb-4">verified_user</span>
                  <h2 className="font-display italic text-3xl mb-2">Espace Administrateur</h2>
                  <p className="text-gray-400 text-sm mb-8">Gérez vos réservations et le contenu du site.</p>
                  
                  <div className="flex flex-col gap-4">
                    <button 
                      onClick={() => { setIsEditMode(!isEditMode); setActiveTab(Tab.HOME); }}
                      className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all ${isEditMode ? 'bg-gold text-white shadow-lg shadow-gold/20' : 'bg-charcoal text-white hover:bg-gold'}`}
                    >
                      {isEditMode ? 'Quitter le mode édition' : 'Éditer le Contenu du Site'}
                    </button>
                    <div className="flex items-center justify-between gap-4 pt-4">
                      <button onClick={resetContent} className="text-[10px] text-red-400 uppercase font-bold tracking-widest hover:text-red-600">
                        Réinitialiser Contenu
                      </button>
                      <button onClick={() => setIsLoggedIn(false)} className="text-[10px] text-gray-400 uppercase font-bold tracking-widest hover:text-charcoal">
                        Déconnexion
                      </button>
                    </div>
                  </div>
                </div>

                <AdminDashboard bookings={bookings} onDeleteBooking={handleDeleteBooking} />
              </div>
            )}
          </div>
        )}
      </main>

      {isLoggedIn && hasUnsavedChanges && (
        <div className="fixed bottom-28 left-1/2 -translate-x-1/2 z-[110] animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-charcoal text-white px-8 py-4 rounded-full shadow-2xl border border-gold/30 flex items-center gap-6">
            <span className="text-xs font-bold uppercase tracking-widest">Modifications non enregistrées</span>
            <button 
              onClick={saveToStorage}
              className="bg-gold text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gold/80 transition-all"
            >
              Enregistrer
            </button>
          </div>
        </div>
      )}

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <style>{`
        .admin-editing [contenteditable]:hover {
          background: rgba(197, 160, 89, 0.05);
        }
        .animate-in { animation-fill-mode: both; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-in-from-bottom-4 { from { transform: translateY(1rem); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes slide-in-from-right-4 { from { transform: translateX(1rem); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes zoom-in-95 { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-in.fade-in { animation-name: fade-in; }
        .animate-in.slide-in-from-bottom-4 { animation-name: slide-in-from-bottom-4; }
        .animate-in.slide-in-from-right-4 { animation-name: slide-in-from-right-4; }
        .animate-in.zoom-in-95 { animation-name: zoom-in-95; }
      `}</style>
    </div>
  );
};

export default App;
