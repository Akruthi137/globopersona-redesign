'use client';

import { Sidebar } from '../../components/Sidebar';
import { Button } from '../../components/ui/Button';
import { 
  Plus, Send, Trash2, Edit3, X, Mail, Clock, 
  BarChart2, ShieldCheck, Sparkles, ArrowUpRight
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function CampaignsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCampaignName, setNewCampaignName] = useState('');
  
  const [campaigns, setCampaigns] = useState([
    { id: 1, name: 'Summer Product Launch', status: 'Active', date: 'Launched 2d ago', color: 'bg-indigo-600' },
    { id: 2, name: 'Weekly Newsletter #42', status: 'Draft', date: 'Modified 5h ago', color: 'bg-blue-600' },
    { id: 3, name: 'Holiday Special 2026', status: 'Scheduled', date: 'Starts June 01', color: 'bg-slate-900' },
  ]);

  useEffect(() => {
    const saved = localStorage.getItem('globalCampaigns');
    if (saved) setCampaigns(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('globalCampaigns', JSON.stringify(campaigns));
    window.dispatchEvent(new Event('storage'));
  }, [campaigns]);

  const handleSend = (id: number, name: string) => {
    setCampaigns(campaigns.map(c => c.id === id ? { ...c, status: 'Sent' } : c));
    localStorage.setItem(`status-${name}`, 'Sent');
  };

  const handleAddCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampaignName.trim()) return;
    const newEntry = { id: Date.now(), name: newCampaignName, status: 'Draft', date: 'Just now', color: 'bg-indigo-600' };
    setCampaigns([newEntry, ...campaigns]); 
    setNewCampaignName('');
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#FAFBFF] text-slate-900">
      <Sidebar />
      <div className="lg:pl-64 flex flex-col min-h-screen">
        
        {/* Modern Sleek Header */}
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-6 lg:px-12 sticky top-0 z-20">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
              Campaigns <Sparkles className="text-indigo-500" size={20} />
            </h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Strategic Marketing Hub</p>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="group relative flex items-center gap-3 bg-slate-900 hover:bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-slate-200 transition-all duration-300 active:scale-95"
          >
            <Plus size={18} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-300" />
            <span>New Campaign</span>
          </button>
        </header>

        <div className="p-6 lg:p-12 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {campaigns.map((c) => (
              <div key={c.id} className="group bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-2xl hover:shadow-indigo-50 transition-all duration-500">
                <div className="flex justify-between items-start mb-8">
                  <div className={`w-14 h-14 ${c.color} rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100 group-hover:scale-110 transition-transform duration-500`}>
                    <Mail size={24} />
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    c.status === 'Sent' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-500'
                  }`}>
                    {c.status}
                  </span>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-black text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">{c.name}</h3>
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                    <span className="flex items-center gap-1"><Clock size={14}/> {c.date}</span>
                    <span className="flex items-center gap-1 text-indigo-400"><ShieldCheck size={14}/> Verified</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <div className="flex gap-2">
                    <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"><Edit3 size={18}/></button>
                    <button onClick={() => setCampaigns(campaigns.filter(i => i.id !== c.id))} className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"><Trash2 size={18}/></button>
                  </div>
                  
                  {c.status === 'Draft' ? (
                    <button 
                      onClick={() => handleSend(c.id, c.name)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl text-xs font-black flex items-center gap-2 shadow-lg shadow-indigo-100 transition-all active:scale-95"
                    >
                      <Send size={14}/> Launch
                    </button>
                  ) : (
                    <button className="text-slate-800 font-black text-[10px] uppercase flex items-center gap-1 hover:text-indigo-600 transition-colors">
                      View Insights <ArrowUpRight size={14}/>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Elegant Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl animate-in zoom-in-95 duration-500">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-black text-slate-800">Start Project</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 bg-slate-100 rounded-full text-slate-400"><X size={20}/></button>
            </div>
            <form onSubmit={handleAddCampaign} className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Campaign Title</label>
                <input required value={newCampaignName} onChange={(e) => setNewCampaignName(e.target.value)} className="w-full p-5 bg-slate-50 border-none rounded-2xl outline-none font-bold text-slate-800 text-lg focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="Spring Promo..." />
              </div>
              <Button type="submit" className="w-full py-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-lg shadow-xl shadow-indigo-100">
                Confirm & Create
              </Button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}