'use client';

import { Sidebar } from '../../components/Sidebar';
import { Button } from '../../components/ui/Button';
import { UserPlus, Search, Mail, Phone, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function ContactsPage() {
  // 1. Move the list into State so it can change
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Suhasini Rao', email: 'suhasini@example.com', phone: '+91 98450 12345', role: 'Premium User' },
    { id: 2, name: 'Aniket Sharma', email: 'aniket.s@testmail.com', phone: '+91 91234 56789', role: 'Basic User' },
    { id: 3, name: 'Praveen Kumar', email: 'praveen.k@gmail.com', phone: '+91 88776 54321', role: 'Admin' },
  ]);

  // 2. Function to add a fresh contact
  const handleAddContact = () => {
    const newContact = {
      id: Date.now(), // Unique ID
      name: 'New Contact',
      email: 'new.user@example.com',
      phone: '+91 00000 00000',
      role: 'Just Added'
    };
    
    // This adds the new contact to the top of the array
    setContacts([newContact, ...contacts]);
  };

  // 3. Optional: Function to delete a contact
  const deleteContact = (id: number) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  return (
    <main className="pl-64 min-h-screen bg-[#F8FAFC] text-slate-900">
      <Sidebar />
      
      <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Contacts</h1>
          <p className="text-sm text-slate-500">Manage your {contacts.length} connections</p>
        </div>
        <Button 
          onClick={handleAddContact}
          className="flex items-center gap-2 active:scale-95 transition-transform bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100"
        >
          <UserPlus size={18} /> Add New Contact
        </Button>
      </header>

      <div className="p-8 max-w-6xl mx-auto space-y-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search contacts..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
        </div>

        <div className="grid gap-4">
          {contacts.map((person) => (
            <div 
              key={person.id} 
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between hover:border-indigo-300 transition-all group animate-in slide-in-from-left-4 duration-300"
            >
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-lg ${
                  person.name === 'New Contact' ? 'bg-green-100 text-green-600' : 'bg-indigo-100 text-indigo-600'
                }`}>
                  {person.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{person.name}</h3>
                  <p className={`text-xs font-medium ${
                    person.name === 'Fresh Contact' ? 'text-green-600' : 'text-indigo-600'
                  }`}>{person.role}</p>
                </div>
              </div>
              
              <div className="hidden md:flex gap-8 items-center text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <Mail size={16} /> {person.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} /> {person.phone}
                </div>
              </div>
              
              <button 
                onClick={() => deleteContact(person.id)}
                className="text-slate-300 hover:text-red-500 transition-colors p-2"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}