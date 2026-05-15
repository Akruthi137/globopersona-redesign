'use client';

import { Sidebar } from '../../components/Sidebar';
import { Button } from '../../components/ui/Button';
import { 
  UserPlus, 
  X, 
  Trash2, 
  Mail, 
  Search, 
  MoreVertical,
  Filter
} from 'lucide-react';
import { useState } from 'react';

export default function ContactsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('');
  
  // 1. Pre-filled with realistic data to make the page look "Full"
  const [contacts, setContacts] = useState([
    { id: 1, name: 'AKRUTHI SHARE', email: 'akruthi.s@sphoorthy.edu', role: 'CSE Student', color: 'bg-indigo-600' },
    { id: 2, name: 'PRAVEEN KUMAR SHARE', email: 'praveen.k@domain.com', role: 'Project Sponsor', color: 'bg-emerald-600' },
    { id: 3, name: 'Technical Support', email: 'support@globopersona.com', role: 'System Admin', color: 'bg-amber-600' },
    { id: 4, name: 'Placement Cell', email: 'placement@sphoorthy.ac.in', role: 'Career Services', color: 'bg-rose-600' },
  ]);

  // 2. Logic: Save new contact to state
  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail) return;

    const contact = { 
      id: Date.now(), 
      name: newName, 
      email: newEmail, 
      role: newRole || 'New Contact',
      color: 'bg-slate-700' // Default color for new entries
    };

    setContacts([contact, ...contacts]); // Add to the top of the list
    
    // Reset form and close
    setNewName('');
    setNewEmail('');
    setNewRole('');
    setIsModalOpen(false);
  };

  const deleteContact = (id: number) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <Sidebar />
      <div className="lg:pl-64 flex flex-col min-h-screen">
        
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-20">
          <div>
            <h1 className="text-xl font-black tracking-tight">Contact Directory</h1>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{contacts.length} Total Members</p>
          </div>
          <div className="flex gap-3">
            <div className="hidden md:flex items-center bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
              <Search size={16} className="text-slate-400 mr-2" />
              <input type="text" placeholder="Quick search..." className="bg-transparent border-none outline-none text-sm w-40" />
            </div>
            <Button onClick={() => setIsModalOpen(true)} className="rounded-xl shadow-lg shadow-indigo-100 flex items-center gap-2">
              <UserPlus size={18}/> <span className="hidden sm:inline">Add Contact</span>
            </Button>
          </div>
        </header>

        <div className="p-8 max-w-5xl mx-auto w-full space-y-4">
          
          {/* List Headers */}
          <div className="px-6 py-2 grid grid-cols-12 text-[10px] font-black text-slate-400 uppercase tracking-widest hidden md:grid">
            <div className="col-span-5">User Details</div>
            <div className="col-span-4">Email Address</div>
            <div className="col-span-2">Role</div>
            <div className="col-span-1 text-right">Action</div>
          </div>

          {/* Contact Cards */}
          <div className="space-y-3">
            {contacts.map((person) => (
              <div 
                key={person.id} 
                className="bg-white p-4 rounded-[1.5rem] border border-slate-100 shadow-sm flex flex-col md:grid md:grid-cols-12 md:items-center gap-4 hover:border-indigo-200 transition-all group"
              >
                {/* Name & Avatar */}
                <div className="col-span-5 flex items-center gap-4">
                  <div className={`h-12 w-12 ${person.color} rounded-2xl text-white flex items-center justify-center font-black text-lg shadow-inner`}>
                    {person.name[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{person.name}</h3>
                    <p className="text-[10px] font-bold text-slate-400 md:hidden uppercase tracking-wider">{person.role}</p>
                  </div>
                </div>

                {/* Email Section */}
                <div className="col-span-4 flex items-center gap-2 text-slate-500 text-sm font-medium">
                  <Mail size={14} className="text-slate-300" />
                  {person.email}
                </div>

                {/* Role Section (Desktop only) */}
                <div className="col-span-2 hidden md:block">
                  <span className="text-[10px] font-black bg-slate-50 text-slate-500 px-3 py-1 rounded-lg uppercase tracking-wider">
                    {person.role}
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-1 flex justify-end">
                  <button 
                    onClick={() => deleteContact(person.id)}
                    className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                  >
                    <Trash2 size={18}/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- ADD CONTACT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-500">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black text-slate-800">New Contact</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                <X size={20}/>
              </button>
            </div>

            <form onSubmit={handleAddContact} className="space-y-5">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <input 
                  required
                  autoFocus
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-700" 
                  placeholder="Ex: John Doe"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <input 
                  required
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-700" 
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Job Role</label>
                <input 
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-700" 
                  placeholder="Ex: Product Manager"
                />
              </div>
              <Button type="submit" className="w-full py-5 rounded-2xl font-black shadow-xl shadow-indigo-100 transition-transform active:scale-95">
                Save Contact
              </Button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}