
import React, { useState } from 'react';
import { Booking } from '../types';

const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'
];

interface AdminDashboardProps {
  bookings: Booking[];
  onDeleteBooking: (id: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ bookings, onDeleteBooking }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const getBookingForSlot = (time: string) => {
    return bookings.find(b => b.date === selectedDate && b.time === time);
  };

  return (
    <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-gray-100 w-full animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-gray-50">
        <div>
          <h2 className="font-display italic text-3xl text-charcoal">Base de Données</h2>
          <p className="text-gray-400 text-xs uppercase tracking-widest font-bold mt-1">Gestion des Réservations</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Date :</label>
          <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-gray-50 border-none rounded-xl p-3 text-sm focus:ring-1 focus:ring-gold"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {TIME_SLOTS.map((time) => {
          const booking = getBookingForSlot(time);
          const isOccupied = !!booking;

          return (
            <div 
              key={time}
              className={`p-5 rounded-2xl border transition-all ${
                isOccupied 
                ? 'bg-red-50/50 border-red-100 text-red-900' 
                : 'bg-green-50/50 border-green-100 text-green-900'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-lg">{time}</span>
                <span className={`text-[8px] uppercase font-black px-2 py-0.5 rounded-full ${
                  isOccupied ? 'bg-red-200 text-red-700' : 'bg-green-200 text-green-700'
                }`}>
                  {isOccupied ? 'Occupé' : 'Libre'}
                </span>
              </div>
              
              {booking ? (
                <div className="space-y-1">
                  <p className="text-sm font-semibold">{booking.firstName} {booking.lastName}</p>
                  <p className="text-[10px] opacity-70 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">phone</span>
                    {booking.phone}
                  </p>
                  <button 
                    onClick={() => onDeleteBooking(booking.id)}
                    className="mt-3 text-[10px] uppercase font-bold text-red-500 hover:text-red-700 transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">delete</span>
                    Annuler
                  </button>
                </div>
              ) : (
                <p className="text-xs opacity-60 italic">Aucune réservation</p>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-gray-50 p-6 rounded-2xl">
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Toutes les réservations ({bookings.length})</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-gray-400 uppercase tracking-tighter">
                <th className="pb-3 pr-4">Client</th>
                <th className="pb-3 pr-4">Contact</th>
                <th className="pb-3 pr-4">Date</th>
                <th className="pb-3">Heure</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.sort((a,b) => b.date.localeCompare(a.date)).map((b) => (
                <tr key={b.id} className="group hover:bg-white transition-colors">
                  <td className="py-3 pr-4 font-medium">{b.firstName} {b.lastName}</td>
                  <td className="py-3 pr-4 text-gray-500">{b.phone}</td>
                  <td className="py-3 pr-4 font-bold">{new Date(b.date).toLocaleDateString('fr-FR')}</td>
                  <td className="py-3 font-bold text-gold">{b.time}</td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-gray-400 italic">Aucune donnée disponible</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
