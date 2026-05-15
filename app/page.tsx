'use client';

import { Sidebar } from '../components/Sidebar';
import { Button } from '../components/ui/Button';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { 
  Users, TrendingUp, LayoutDashboard, ArrowRight, 
  Target, Edit3, MousePointer2, Sparkles, Plus 
} from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [campaignData, setCampaignData] = useState([
    { id: 1, name: 'Summer Product Launch', status: 'Active', sent: '8,234', opens: '28%' },
    { id: 2, name: 'Weekly Newsletter #42', status: 'Scheduled', sent: '-', opens: '-' },
  ]);

  // SYNC LOGIC: Refresh the list whenever memory changes
  useEffect(() => {
    const syncData = () => {
      const savedList = localStorage.getItem('globalCampaigns');
      if (savedList) setCampaignData(JSON.parse(savedList));
    };
    syncData();
    window.addEventListener('storage', syncData);
    return () => window.removeEventListener('storage', syncData);
  }, []);

  const weeklyStats = [{day:'Mon',val:40}, {day:'Tue',val:70}, {day:'Wed',val:45}, {day:'Thu',val:90}, {day:'Fri',val:65}, {day:'Sat',val:35}, {day:'Sun',val:80}];

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <Sidebar />
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-20">
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg text-white"><LayoutDashboard size={18} /></div>
            <h1 className="text-lg lg:text-xl font-black text-slate-800 tracking-tight">Overview</h1>
          </div>
          <Button onClick={() => router.push('/campaigns')} className="rounded-xl shadow-lg px-4 py-2 text-xs lg:text-sm flex items-center gap-2">
            <Plus size={16} /> <span className="hidden sm:inline">New Campaign</span>
          </Button>
        </header>

        <div className="p-4 lg:p-8 max-w-7xl mx-auto w-full space-y-6 lg:space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              { label: 'Subscribers', val: '12,847', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Open Rate', val: '24.8%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Total Clicks', val: '4,291', icon: MousePointer2, color: 'text-amber-600', bg: 'bg-amber-50' },
              { label: 'Goal', val: '85%', icon: Target, color: 'text-indigo-600', bg: 'bg-indigo-50' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white p-5 rounded-[1.5rem] lg:rounded-[2rem] border border-slate-100 shadow-sm flex items-center lg:flex-col lg:items-start gap-4">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}><stat.icon size={20}/></div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  <h3 className="text-xl lg:text-2xl font-black text-slate-800">{stat.val}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 bg-white rounded-[1.5rem] lg:rounded-[2.5rem] border border-slate-100 p-6 lg:p-8 shadow-sm">
              <h3 className="font-black text-slate-800 text-sm lg:text-lg mb-8">Weekly Engagement</h3>
              <div className="flex items-end justify-between h-[150px] lg:h-[200px] gap-1 lg:gap-2 px-1">
                {weeklyStats.map((s, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <div className="w-full max-w-[30px] bg-indigo-500 rounded-t-lg shadow-md" style={{ height: `${s.val}%`, minHeight: '4px' }} />
                    <span className="text-[9px] lg:text-[10px] font-bold text-slate-400 uppercase">{s.day}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-indigo-600 rounded-[1.5rem] lg:rounded-[2.5rem] p-6 lg:p-8 text-white flex flex-col justify-between shadow-xl shadow-indigo-100">
              <div>
                <Sparkles size={24} className="mb-4 opacity-50" />
                <h3 className="font-black text-xl mb-2 leading-tight">Maximize Reach</h3>
                <p className="text-indigo-100 text-xs lg:text-sm">Personalized tags boost open rates by 15%.</p>
              </div>
              <button onClick={() => router.push('/analytics')} className="w-full py-4 bg-white text-indigo-600 font-bold rounded-2xl mt-6 flex items-center justify-center gap-2 text-sm transition-all hover:bg-indigo-50">Detailed Stats <ArrowRight size={16}/></button>
            </div>
          </div>

          <div className="bg-white rounded-[1.5rem] lg:rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-5 lg:p-7 border-b border-slate-50 font-black text-slate-800 text-lg">Recent Campaigns</div>
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[500px]">
                <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-widest">
                  <tr><th className="px-6 py-4">Campaign Name</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Action</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {campaignData.map((c: any) => (
                    <tr key={c.id} className="hover:bg-slate-50/50 transition-all cursor-pointer" onClick={() => router.push('/campaigns')}>
                      <td className="px-6 py-4 font-bold text-slate-700 text-sm">{c.name}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${c.status === 'Sent' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>{c.status}</span>
                      </td>
                      <td className="px-6 py-4 text-right"><Edit3 size={14} className="inline text-slate-300" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}