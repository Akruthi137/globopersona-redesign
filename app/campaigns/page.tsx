'use client';

import { Sidebar } from '../../components/Sidebar';
import { Button } from '../../components/ui/Button';
import { 
  Plus, Send, Trash2, Edit3, X, Mail, Clock, 
  BarChart2, Users, MousePointer2, ChevronRight 
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function CampaignsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCampaignName, setNewCampaignName] = useState('');
  
  const [campaigns, setCampaigns] = useState([
    { id: 1, name: 'Summer Product Launch', status: 'Active', date: 'Launched 2d ago', reach: '8.2k', opens: '28%' },
    { id: 2, name: 'Weekly Newsletter #42', status: 'Draft', date: 'Modified 5h ago', reach: '0', opens: '0%' },
    { id: 3, name: 'Holiday Special 2026', status: 'Scheduled', date: 'Starts June 01', reach: '12.8k', opens: '0%' },
  ]);

  useEffect(() => {
    setCampaigns(prev => prev.map(c => {
      const saved = localStorage.getItem(`status-${c.name}`);
      return saved ? { ...c, status: saved, reach: '1.2k', opens: '31%' } : c;
    }));
  }, []);

  const handleSend = (id: number, name: string) => {
    setCampaigns(campaigns.map(c => c.id === id ? { ...c, status: 'Sent', reach: '1.2k', opens: '31%' } : c));
    localStorage.setItem(`status-${name}`, 'Sent');
  };

  const handleAddCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampaignName.trim()) return;
    const newEntry = { id: Date.now(), name: newCampaignName, status: 'Draft', date: 'Created Just Now', reach: '0', opens: '0%' };
    setCampaigns([newEntry, ...campaigns]); 
    setNewCampaignName('');
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <Sidebar />
      <div className="lg:pl-64 flex flex-col min-h-screen">
        
        {/* Header with Glassmorphism */}
        <header className="h-24 bg-white/70 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-10 sticky top-0 z-20">
          <div>
            <h1 className="text-2xl font-black text-slate-800">Campaigns</h1>
            <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em]">Growth & Engagement Hub</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="rounded-2xl shadow-xl shadow-indigo-100 px-6 py-6 font-black transition-transform active:scale-95">
            <Plus size={20} className="mr-2"/> Create New
          </Button>
        </header>

        <div className="p-10 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {campaigns.map((c) => (
              <div key={c.id} className="group bg-white rounded-[2.5rem] border border-slate-100 p-1 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/50 hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                <div className="p-7 space-y-6">
                  {/* Top Row: Icon & Status */}
                  <div className="flex justify-between items-center">
                    <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                      <Mail size={24} />
                    </div>
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      c.status === 'Sent' ? 'bg-emerald-100 text-emerald-600' : 
                      c.status === 'Active' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'
                    }`}>{c.status}</span>
                  </div>

                  {/* Title & Date */}
                  <div>
                    <h3 className="text-xl font-black text-slate-800 leading-tight mb-2">{c.name}</h3>
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                      <Clock size={14}/> {c.date}
                    </div>
                  </div>

                  {/* Mini Stats Row */}
                  <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Reach</span>
                      <div className="flex items-center gap-1 font-black text-slate-700"><Users size={12}/> {c.reach}</div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Opens</span>
                      <div className="flex items-center gap-1 font-black text-slate-700"><BarChart2 size={12}/> {c.opens}</div>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="bg-slate-50/50 px-7 py-5 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex gap-2">
                    <button className="p-2.5 bg-white text-slate-400 hover:text-indigo-600 rounded-xl border border-slate-100 shadow-sm transition-all"><Edit3 size={16}/></button>
                    <button onClick={() => setCampaigns(campaigns.filter(item => item.id !== c.id))} className="p-2.5 bg-white text-slate-400 hover:text-rose-500 rounded-xl border border-slate-100 shadow-sm transition-all"><Trash2 size={16}/></button>
                  </div>
                  
                  {c.status === 'Draft' ? (
                    <button 
                      onClick={() => handleSend(c.id, c.name)}
                      className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200 active:scale-95"
                    >
                      <Send size={14}/> Launch
                    </button>
                  ) : (
                    <button className="flex items-center gap-1 text-indigo-600 font-black text-xs group/btn hover:translate-x-1 transition-transform">
                      View Report <ChevronRight size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- MODERN MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl animate-in zoom-in-95 duration-500">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-black text-slate-800">Launch Project</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"><X size={24}/></button>
            </div>
            <form onSubmit={handleAddCampaign} className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] ml-1">Campaign Name</label>
                <input required value={newCampaignName} onChange={(e) => setNewCampaignName(e.target.value)} className="w-full p-5 bg-slate-50 border-none rounded-2xl outline-none font-bold text-slate-800 text-lg focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="Spring Promo..." />
              </div>
              <Button type="submit" className="w-full py-6 rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 tracking-tight">Create & Save</Button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}