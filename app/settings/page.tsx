'use client';

import { Sidebar } from '../../components/Sidebar';
import { Button } from '../../components/ui/Button';
import { 
  User, 
  Mail, 
  Trash2, 
  ArrowRight,
  Sparkles,
  School,
  FileText,
  ShieldAlert
} from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const [isDeleted, setIsDeleted] = useState(false);
  
  // 1. Updated State: Now includes Email
  const [profile, setProfile] = useState({
    name: 'AKRUTHI SHARE',
    email: 'akruthi@example.com',
    college: 'Sphoorthy Engineering College',
    bio: 'Computer Science student and developer.'
  });

  const handleDelete = () => {
    const confirmed = window.confirm("Are you sure? This will wipe your current data.");
    if (confirmed) setIsDeleted(true);
  };

  const handleFinishNewProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDeleted(false); 
  };

  // --- VIEW 1: FRESH PROFILE CREATION (Now with Email) ---
  if (isDeleted) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white p-8 rounded-[2rem] shadow-2xl shadow-indigo-100 border border-indigo-50 animate-in zoom-in-95 duration-500">
          <div className="text-center mb-8">
            <div className="inline-flex p-4 bg-indigo-600 text-white rounded-2xl mb-4 shadow-lg shadow-indigo-200">
              <Sparkles size={28} />
            </div>
            <h1 className="text-2xl font-black text-slate-800">Fresh Start</h1>
            <p className="text-slate-500 text-sm">Create your new professional identity.</p>
          </div>

          <form onSubmit={handleFinishNewProfile} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Full Name</label>
              <input 
                required
                className="w-full p-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                placeholder="Enter Name"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Email Address</label>
              <input 
                required
                type="email"
                className="w-full p-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                placeholder="akruthi@example.com"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">College</label>
              <input 
                required
                className="w-full p-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                placeholder="Sphoorthy Engineering College"
                value={profile.college}
                onChange={(e) => setProfile({...profile, college: e.target.value})}
              />
            </div>
            <Button className="w-full py-4 rounded-2xl font-bold mt-4 flex items-center justify-center gap-2">
              Launch Profile <ArrowRight size={18} />
            </Button>
          </form>
        </div>
      </main>
    );
  }

  // --- VIEW 2: EFFICIENT SETTINGS DASHBOARD ---
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <div className="lg:pl-64 min-h-screen flex flex-col">
        <header className="h-20 flex items-center px-8">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Settings</h1>
        </header>

        <div className="p-8 max-w-4xl w-full mx-auto space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="relative">
              <div className="w-32 h-32 bg-indigo-600 rounded-3xl flex items-center justify-center text-white text-4xl font-black shadow-xl shadow-indigo-100">
                {profile.name.charAt(0) || '?'}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-md border border-slate-50">
                <Sparkles size={16} className="text-indigo-600" />
              </div>
            </div>

            <div className="flex-1 space-y-4 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3">
                  <User size={18} className="text-slate-400" />
                  <input 
                    className="bg-transparent border-none focus:ring-0 text-sm font-bold w-full"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                  />
                </div>
                {/* NEW EMAIL FIELD IN SETTINGS */}
                <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3">
                  <Mail size={18} className="text-slate-400" />
                  <input 
                    className="bg-transparent border-none focus:ring-0 text-sm font-bold w-full"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                  />
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3 md:col-span-2">
                  <School size={18} className="text-slate-400" />
                  <input 
                    className="bg-transparent border-none focus:ring-0 text-sm font-bold w-full"
                    value={profile.college}
                    onChange={(e) => setProfile({...profile, college: e.target.value})}
                  />
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3">
                <FileText size={18} className="text-slate-400" />
                <textarea 
                  className="bg-transparent border-none focus:ring-0 text-sm w-full h-20 resize-none"
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="bg-rose-50 rounded-[2rem] p-8 border border-rose-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-4">
              <div className="p-3 bg-white rounded-2xl text-rose-500 shadow-sm">
                <ShieldAlert size={24} />
              </div>
              <div>
                <h4 className="font-bold text-rose-900">Privacy & Data</h4>
                <p className="text-sm text-rose-600/70">Wipe your session and start fresh.</p>
              </div>
            </div>
            <button 
              onClick={handleDelete}
              className="bg-rose-600 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-rose-700 transition-all hover:shadow-lg hover:shadow-rose-100 active:scale-95 flex items-center gap-2"
            >
              <Trash2 size={16} /> Reset Everything
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}