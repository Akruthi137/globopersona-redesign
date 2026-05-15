'use client';

import { Sidebar } from '../components/Sidebar';
import { Button } from '../components/ui/Button';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { 
  Users, TrendingUp, Mail, Plus, LayoutDashboard, 
  ArrowRight, Target, Edit3, MousePointer2, Sparkles
} from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  
  // Data state for the table
  const [campaignData, setCampaignData] = useState([
    { id: 1, name: 'Summer Product Launch', status: 'Active', sent: '8,234', opens: '28%' },
    { id: 2, name: 'Weekly Newsletter #42', status: 'Scheduled', sent: '-', opens: '-' },
    { id: 3, name: 'Re-engagement Email', status: 'Completed', sent: '12,000', opens: '19%' },
    { id: 4, name: 'Holiday Special 2026', status: 'Draft', sent: '-', opens: '-' },
  ]);

  const weeklyStats = [
    {day:'Mon',val:40}, {day:'Tue',val:70}, {day:'Wed',val:45}, 
    {day:'Thu',val:90}, {day:'Fri',val:65}, {day:'Sat',val:35}, {day:'Sun',val:80}
  ];

  useEffect(() => {
    const savedStatus = localStorage.getItem('newsletterStatus');
    if (savedStatus === 'Sent') {
      setCampaignData(prev => prev.map(c => 
        c.name === 'Weekly Newsletter #42' ? { ...c, status: 'Sent', sent: '1,240', opens: '31%' } : c
      ));
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 relative">
      <Sidebar />
      
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Header - NOW REDIRECTS TO CAMPAIGNS */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg text-white"><LayoutDashboard size={20} /></div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">Overview</h1>
          </div>
          <Button 
            onClick={() => router.push('/campaigns')} 
            className="rounded-xl shadow-lg flex items-center gap-2"
          >
            <Plus size={18} /> New Campaign
          </Button>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
          
          {/* Section 1: Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Subscribers', val: '12,847', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Open Rate', val: '24.8%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Total Clicks', val: '4,291', icon: MousePointer2, color: 'text-amber-600', bg: 'bg-amber-50' },
              { label: 'Campaign Goal', val: '85%', icon: Target, color: 'text-indigo-600', bg: 'bg-indigo-50' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between hover:border-indigo-200 transition-all">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
                  <stat.icon size={20}/>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  <h3 className="text-2xl font-black text-slate-800">{stat.val}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Section 2: Chart & Power Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
              <h3 className="font-black text-slate-800 text-lg mb-10">Weekly Engagement Analytics</h3>
              <div className="flex items-end justify-between h-[200px] gap-2 px-2">
                {weeklyStats.map((s, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-3 h-full justify-end group">
                    <div 
                      className="w-full max-w-[35px] bg-indigo-500 rounded-t-xl transition-all duration-300 group-hover:bg-indigo-400 shadow-lg shadow-indigo-100" 
                      style={{ height: `${s.val}%`, minHeight: '6px' }} 
                    />
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{s.day}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white flex flex-col justify-between relative overflow-hidden shadow-xl shadow-indigo-100">
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                  <Sparkles size={24} />
                </div>
                <h3 className="font-black text-2xl mb-4 leading-tight">Maximize Reach</h3>
                <p className="text-indigo-100 text-sm leading-relaxed mb-6">
                  Check out the new segmentation tools to boost your open rates by 15%.
                </p>
              </div>
              <button onClick={() => router.push('/analytics')} className="relative z-10 w-full py-4 bg-white text-indigo-600 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-indigo-50 transition-all">
                Detailed Analytics <ArrowRight size={18}/>
              </button>
            </div>
          </div>

          {/* Section 3: Full Table */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-7 border-b border-slate-50 flex items-center justify-between">
              <h2 className="font-black text-slate-800 text-lg">Active & Recent Campaigns</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-widest">
                  <tr>
                    <th className="px-8 py-5">Campaign Name</th>
                    <th className="px-8 py-5">Status</th>
                    <th className="px-8 py-5 text-right">Progress</th>
                    <th className="px-8 py-5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {campaignData.map((c) => (
                    <tr key={c.id} className="group hover:bg-slate-50/50 transition-all cursor-pointer" onClick={() => router.push('/campaigns')}>
                      <td className="px-8 py-5 font-bold text-slate-700 group-hover:text-indigo-600">{c.name}</td>
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          c.status === 'Active' ? 'bg-blue-100 text-blue-600' : 
                          c.status === 'Completed' ? 'bg-green-100 text-green-600' : 
                          c.status === 'Draft' ? 'bg-slate-100 text-slate-400' : 'bg-amber-100 text-amber-600'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right font-black text-slate-500">{c.opens !== '-' ? c.opens : '0%'}</td>
                      <td className="px-8 py-5 text-right">
                        <button className="p-2 text-slate-300 hover:text-indigo-600 transition-colors"><Edit3 size={16}/></button>
                      </td>
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