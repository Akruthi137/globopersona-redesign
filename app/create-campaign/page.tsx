import { Sidebar } from '../../components/Sidebar';

export default function CreatePage() {
  return (
    <main className="pl-64 min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <div className="p-20 text-center">
        <h1 className="text-3xl font-bold text-slate-800">Campaign Creator</h1>
        <p className="text-slate-500 mt-4">This feature is coming in the next update!</p>
      </div>
    </main>
  );
}