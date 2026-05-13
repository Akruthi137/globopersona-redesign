'use client';

import { Sidebar } from '../../components/Sidebar';
import { Button } from '../../components/ui/Button';
import { Mail, Send, Clock, CheckCircle, Plus, MoreVertical, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function CampaignsPage() {
  const [isCreating, setIsCreating] = useState(false);
  const [campaigns, setCampaigns] = useState([
    { id: 1, name: 'Summer Product Launch', status: 'Active', type: 'Email', date: 'May 10, 2026' },
    { id: 2, name: 'Weekly Newsletter #42', status: 'Draft', type: 'Newsletter', date: 'May 15, 2026' },
    { id: 3, name: 'Customer Re-engagement', status: 'Sent', type: 'Automation', date: 'Apr 28, 2026' },
  ]);

  // Function to simulate sending a draft campaign
  const handleSendCampaign = (id: number) => {
  setCampaigns(campaigns.map(c => 
    c.id === id ? { ...c, status: 'Sending...' } : c
  ));

  setTimeout(() => {
    setCampaigns(prev => prev.map(c => 
      c.id === id ? { ...c, status: 'Sent' } : c
    ));
    
    // --- ADD THIS LINE ---
    // This tells the browser: "The Weekly Newsletter is now Sent!"
    localStorage.setItem('newsletterStatus', 'Sent');
  }, 1500);
};

  const addNewCampaign = () => {
    setIsCreating(true);
    const newC = {
      id: Date.now(),
      name: 'Untitled Campaign',
      status: 'Draft',
      type: 'Email',
      date: 'Just now'
    };
    setTimeout(() => {
      setCampaigns([newC, ...campaigns]);
      setIsCreating(false);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="lg:pl-64 flex flex-col min-h-screen">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-800">Campaigns</h1>
            <p className="text-xs md:text-sm text-slate-500 hidden sm:block">Manage and track your marketing efforts</p>
          </div>
          <Button 
            onClick={addNewCampaign} 
            disabled={isCreating}
            className="flex items-center gap-2 shadow-lg shadow-indigo-100"
          >
            {isCreating ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
            <span>New Campaign</span>
          </Button>
        </header>

        <div className="p-4 md:p-8 max-w-6xl mx-auto w-full">
          {/* Responsive Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {campaigns.map((c) => (
              <div 
                key={c.id} 
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
              >
                {/* Status Indicator Bar */}
                <div className={`absolute top-0 left-0 w-full h-1 ${
                  c.status === 'Sent' ? 'bg-green-500' : 
                  c.status === 'Active' ? 'bg-blue-500' : 'bg-amber-400'
                }`} />

                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${
                    c.status === 'Sent' ? 'bg-green-50' : 'bg-indigo-50'
                  }`}>
                    {c.status === 'Sent' ? <CheckCircle className="text-green-600" size={24} /> : <Mail className="text-indigo-600" size={24} />}
                  </div>
                  <button className="text-slate-300 hover:text-slate-600"><MoreVertical size={20} /></button>
                </div>

                <h3 className="font-bold text-slate-800 text-lg mb-1 group-hover:text-indigo-600 transition-colors">
                  {c.name}
                </h3>
                <p className="text-sm text-slate-500 mb-6 flex items-center gap-2">
                  <Clock size={14} /> {c.date}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    c.status === 'Sent' ? 'bg-green-100 text-green-700' : 
                    c.status === 'Active' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {c.status}
                  </span>

                  {c.status === 'Draft' && (
                    <button 
                      onClick={() => handleSendCampaign(c.id)}
                      className="flex items-center gap-2 text-indigo-600 font-bold text-sm hover:bg-indigo-50 px-3 py-1 rounded-lg transition-colors"
                    >
                      <Send size={16} /> Send Now
                    </button>
                  )}
                  
                  {c.status === 'Sending...' && (
                    <span className="flex items-center gap-2 text-slate-400 text-sm animate-pulse">
                      <Loader2 size={16} className="animate-spin" /> Processing
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}