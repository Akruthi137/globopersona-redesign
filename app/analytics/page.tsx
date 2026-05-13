'use client';

import { Sidebar } from '../../components/Sidebar';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MousePointer2, 
  ArrowUpRight, 
  ArrowDownRight,
  RefreshCcw
} from 'lucide-react';
import { useState } from 'react';

export default function AnalyticsPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [view, setView] = useState<'daily' | 'weekly'>('daily');
  
  const dailyData = [
    { day: 'Mon', val: 45 }, { day: 'Tue', val: 72 }, { day: 'Wed', val: 55 },
    { day: 'Thu', val: 85 }, { day: 'Fri', val: 60 }, { day: 'Sat', val: 35 }, { day: 'Sun', val: 90 }
  ];

  const weeklyData = [
    { day: 'W1', val: 80 }, { day: 'W2', val: 40 }, { day: 'W3', val: 65 },
    { day: 'W4', val: 95 }, { day: 'W5', val: 50 }, { day: 'W6', val: 75 }, { day: 'W7', val: 30 }
  ];

  const currentData = view === 'daily' ? dailyData : weeklyData;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Analytics</h1>
          </div>
          <button onClick={handleRefresh} className="p-2 hover:bg-slate-100 rounded-full transition-all">
            <RefreshCcw size={20} className={isRefreshing ? 'animate-spin text-indigo-600' : 'text-slate-400'} />
          </button>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
          
          {/* THE ANALYTICS CARDS (The "Missing" Section) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              { label: 'Total Clicks', val: '4,291', change: '+14%', up: true, icon: MousePointer2 },
              { label: 'Conversion', val: '3.2%', change: '-0.5%', up: false, icon: TrendingUp },
              { label: 'New Leads', val: '158', change: '+8%', up: true, icon: Users },
              { label: 'Revenue', val: '$12.4k', change: '+22%', up: true, icon: BarChart3 },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-all">
                <div className="flex justify-between items-center mb-4">
                  <div className="p-2 bg-slate-50 rounded-lg text-slate-500"><stat.icon size={20} /></div>
                  <div className={`flex items-center text-xs font-bold ${stat.up ? 'text-green-600' : 'text-red-500'}`}>
                    {stat.change} {stat.up ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>}
                  </div>
                </div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{stat.label}</p>
                <h2 className="text-2xl font-black text-slate-800 mt-1">{stat.val}</h2>
              </div>
            ))}
          </div>

          {/* THE CHART SECTION (The working bars) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <div className="flex justify-between items-center mb-12">
              <h3 className="font-bold text-slate-800 text-xl">Engagement Overview</h3>
              <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
                <button 
                  onClick={() => setView('daily')}
                  className={`px-4 py-1.5 text-sm font-bold rounded-lg transition-all ${view === 'daily' ? 'bg-white shadow text-indigo-600' : 'text-slate-400'}`}
                >
                  Daily
                </button>
                <button 
                  onClick={() => setView('weekly')}
                  className={`px-4 py-1.5 text-sm font-bold rounded-lg transition-all ${view === 'weekly' ? 'bg-white shadow text-indigo-600' : 'text-slate-400'}`}
                >
                  Weekly
                </button>
              </div>
            </div>

            {/* BAR CHART DISPLAY */}
            <div className="flex items-end justify-between h-[300px] w-full bg-slate-50/50 rounded-2xl p-6 border-b-2 border-slate-100">
              {currentData.map((item, i) => (
                <div key={i} className="flex-1 flex flex-col items-center group h-full justify-end">
                  <div 
                    className="w-full max-w-[45px] rounded-t-lg transition-all duration-500 ease-out shadow-sm hover:opacity-80"
                    style={{ 
                      height: `${item.val}%`, 
                      backgroundColor: '#6366f1', 
                      display: 'block',
                      minHeight: '8px'
                    }}
                  />
                  <span className="text-[11px] font-bold text-slate-400 mt-4 uppercase tracking-tighter md:tracking-normal">
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}