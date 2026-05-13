'use client';

import { Sidebar } from '../components/Sidebar';
import { Button } from '../components/ui/Button';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { 
  Users, 
  TrendingUp, 
  Mail, 
  Plus, 
  MoreHorizontal, 
  ArrowUpRight,
  LayoutDashboard,
  X,
  Zap,
  BarChart
} from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  
  const [campaignData, setCampaignData] = useState([
    { id: 1, name: 'Summer Product Launch', status: 'Active', sent: '8,234', opens: '28%', clicks: '1,204', bounce: '0.4%' },
    { id: 2, name: 'Weekly Newsletter #42', status: 'Scheduled', sent: '-', opens: '-', clicks: '-', bounce: '-' },
    { id: 3, name: 'Customer Re-engagement', status: 'Completed', sent: '12,000', opens: '19%', clicks: '2,400', bounce: '1.2%' },
  ]);

  useEffect(() => {
    const savedStatus = localStorage.getItem('newsletterStatus');
    if (savedStatus === 'Sent') {
      setCampaignData(prev => prev.map(c => 
        c.name === 'Weekly Newsletter #42' 
          ? { ...c, status: 'Sent', sent: '1,240', opens: '31%', clicks: '412', bounce: '0.1%' } 
          : c
      ));
    }
  }, []);

  const stats = [
    { label: 'Total Subscribers', value: '12,847', icon: Users },
    { label: 'Avg. Open Rate', value: '24.8%', icon: TrendingUp },
    { label: 'Active Status', value: 'Live', icon: Mail },
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 relative">
      <div className="hidden lg:block"><Sidebar /></div>
      
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg text-white"><LayoutDashboard size={20} /></div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">Overview</h1>
          </div>
          <Button onClick={() => router.push('/campaigns')} className="rounded-xl shadow-lg flex items-center gap-2">
            <Plus size={18} /> New Campaign
          </Button>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-3xl font-black mt-1 text-slate-800">{stat.value}</h3>
              </div>
            ))}
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-7 border-b border-slate-50 font-black text-slate-800 text-lg">Live Campaign Tracking</div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-widest">
                  <tr>
                    <th className="px-8 py-5">Campaign Name</th>
                    <th className="px-8 py-5">Status</th>
                    <th className="px-8 py-5 text-right">Engagement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {campaignData.map((c) => (
                    <tr 
                      key={c.id} 
                      onClick={() => setSelectedCampaign(c)}
                      className="group hover:bg-indigo-50/30 transition-all cursor-pointer"
                    >
                      <td className="px-8 py-5 font-bold text-slate-700 group-hover:text-indigo-600">{c.name}</td>
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                          c.status === 'Sent' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                        }`}>{c.status}</span>
                      </td>
                      <td className="px-8 py-5 text-right font-black text-slate-800">{c.opens}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* --- QUICK VIEW MODAL --- */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl p-8 animate-in slide-in-from-bottom-10 duration-500">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded">Campaign Detail</span>
                <h2 className="text-2xl font-black text-slate-800 mt-2">{selectedCampaign.name}</h2>
              </div>
              <button onClick={() => setSelectedCampaign(null)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200"><X size={20}/></button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-50 p-4 rounded-2xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Total Clicks</p>
                <p className="text-xl font-black text-slate-800">{selectedCampaign.clicks}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Bounce Rate</p>
                <p className="text-xl font-black text-slate-800">{selectedCampaign.bounce}</p>
              </div>
            </div>

            <div className="space-y-3">
               <Button onClick={() => router.push('/analytics')} className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl">
                  <BarChart size={18} /> View Full Analytics
               </Button>
               <Button onClick={() => setSelectedCampaign(null)} className="w-full bg-slate-100 text-slate-600 hover:bg-slate-200 py-4 rounded-2xl">
                  Close Preview
               </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}