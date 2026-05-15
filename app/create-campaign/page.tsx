'use client';

import { Sidebar } from '../../components/Sidebar';
import { Button } from '../../components/ui/Button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, Sparkles, Layout, Send, Calendar } from 'lucide-react';

export default function CreateCampaignPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <Sidebar />
      
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center px-8 gap-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-all">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-black tracking-tight">Campaign Builder</h1>
        </header>

        <div className="p-8 max-w-3xl mx-auto w-full space-y-10">
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-between px-4">
            {[
              { id: 1, label: 'Basics', icon: Sparkles },
              { id: 2, label: 'Design', icon: Layout },
              { id: 3, label: 'Schedule', icon: Calendar },
            ].map((s) => (
              <div key={s.id} className="flex flex-col items-center gap-2 group cursor-pointer" onClick={() => setStep(s.id)}>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                  step >= s.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-slate-200 text-slate-400'
                }`}>
                  <s.icon size={18} />
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${
                  step >= s.id ? 'text-indigo-600' : 'text-slate-400'
                }`}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* Form Content */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-2 text-center mb-8">
                  <h2 className="text-2xl font-black text-slate-800">Let's name your project</h2>
                  <p className="text-sm text-slate-400 font-medium">This will help you organize your campaigns later.</p>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Campaign Title</label>
                  <input className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-lg" placeholder="Ex: Summer Flash Sale" />
                </div>
                <Button onClick={() => setStep(2)} className="w-full py-5 rounded-2xl font-black">Continue to Design</Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border-2 border-indigo-600 rounded-2xl bg-indigo-50/50">
                        <div className="h-20 bg-indigo-200 rounded-xl mb-3"></div>
                        <p className="text-xs font-bold text-center">Minimalist Clean</p>
                    </div>
                    <div className="p-4 border-2 border-slate-100 rounded-2xl hover:border-indigo-200 cursor-pointer">
                        <div className="h-20 bg-slate-100 rounded-xl mb-3"></div>
                        <p className="text-xs font-bold text-center text-slate-400">Bold & Modern</p>
                    </div>
                 </div>
                 <Button onClick={() => setStep(3)} className="w-full py-5 rounded-2xl font-black">Finalize Schedule</Button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 text-center">
                 <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send size={28}/>
                 </div>
                 <h2 className="text-2xl font-black">Ready to Launch?</h2>
                 <p className="text-sm text-slate-400 mb-6">Your campaign is ready to reach 12.8k subscribers.</p>
                 <Button onClick={() => router.push('/campaigns')} className="w-full py-5 rounded-2xl font-black">Finish & Save</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}