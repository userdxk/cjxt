import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { 
  LayoutDashboard, Camera, Package, BarChart3, HelpCircle, Settings, 
  Bell, Search, PlusCircle, Activity, ShieldCheck, Zap, Layers,
  ChevronRight, ArrowUpRight, CheckCircle2, MoreVertical, Map as MapIcon,
  CircleDot, HelpCircle as SupportIcon, User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './utils';
import { MOCK_STATS, MOCK_BATCHES, TRENDS_DATA } from './mockData';
import { ViewType, Batch } from './types';

// --- Sidebar Component ---
const Sidebar = ({ activeView, onViewChange }: { activeView: ViewType, onViewChange: (view: ViewType) => void }) => {
  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, view: 'dashboard' as const },
    { label: 'Workbench', icon: Camera, view: 'workbench' as const },
    { label: 'Batch Management', icon: Package, view: 'batches' as const },
    { label: 'Reports', icon: BarChart3, view: 'reports' as const },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-50 border-r border-slate-200 flex flex-col z-50">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-green rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-green/20">
            <Activity size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-emerald-900 tracking-tight leading-none uppercase">Chicks ID</h1>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-[0.2em] mt-1">Precision Sorting</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4">
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => onViewChange(item.view)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 group text-left",
              activeView === item.view 
                ? "bg-emerald-100 text-emerald-800 font-bold shadow-sm" 
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            <item.icon size={18} className={cn(activeView === item.view ? "text-emerald-700" : "text-slate-400 group-hover:text-slate-600")} />
            {item.label}
            {activeView === item.view && <motion.div layoutId="active-indicator" className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-700" />}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-200 space-y-1 bg-white/50">
        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors text-left">
          <SupportIcon size={18} className="text-slate-400" />
          Support
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors text-left">
          <Settings size={18} className="text-slate-400" />
          Settings
        </button>
        
        <div className="mt-4 p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center text-white text-xs font-bold">SA</div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-900 truncate">System Admin</p>
            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Active Now</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

// --- TopBar Component ---
const TopBar = ({ title }: { title: string }) => {
  return (
    <header className="sticky top-0 right-0 w-full glass-panel h-16 flex items-center justify-between px-8 z-40">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-black font-display text-emerald-900 tracking-tight">{title}</h2>
        <div className="h-4 w-px bg-slate-200" />
        <span className="text-xs text-slate-500 font-medium">Station #04 - Global Operation</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative group">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Search batches..." 
            className="pl-9 pr-4 py-1.5 bg-slate-100 border-none rounded-full text-xs w-64 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all outline-none"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="relative text-slate-500 hover:text-emerald-700 transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full" />
          </button>
          <button className="text-slate-500 hover:text-emerald-700 transition-colors">
            <Settings size={20} />
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 shadow-sm">
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100" alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
};

// --- Views ---

const DashboardView = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="flex-1 w-full space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 leading-tight">Operational Overview</h1>
            <p className="text-slate-500 mt-2">Real-time throughput and biological identification metrics.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Total Identified', value: '42,890', sub: '+12% vs avg', up: true },
              { label: 'Yield Ratio (F:M)', value: '52:48', sub: 'Stable', bar: 52 },
              { label: 'Avg. Confidence', value: '98.4%', sub: 'Target Achieved', up: true },
            ].map((stat, i) => (
              <div key={i} className="glass-panel p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all border-l-4 border-emerald-600">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{stat.label}</span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-display font-bold text-slate-900">{stat.value}</span>
                  <span className={cn("text-[10px] font-bold", i === 1 ? "text-secondary-blue" : "text-emerald-600")}>{stat.sub}</span>
                </div>
                {stat.bar && (
                  <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4 overflow-hidden flex">
                    <div className="bg-emerald-600 h-full w-[52%]" />
                    <div className="bg-emerald-600/30 h-full w-[48%]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-80 space-y-6">
          <button className="w-full bg-primary-green text-white p-6 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-primary-green/20 hover:scale-[1.02] active:scale-95 transition-all">
            <PlusCircle size={24} />
            Start New Batch
          </button>
          
          <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
            <div className="flex items-center gap-2 text-emerald-400">
              <Zap size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest">System Status</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Hardware sensors active. Calibration verified at 04:00 AM. Connectivity stable across all lines.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 glass-panel p-8 rounded-3xl space-y-8 h-full">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold font-display">Identification Trends</h3>
              <p className="text-sm text-slate-500">Hourly throughput optimization analysis</p>
            </div>
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button className="px-4 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 rounded-lg">24H</button>
              <button className="px-4 py-1.5 text-xs font-bold bg-white text-slate-900 rounded-lg shadow-sm">Today</button>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TRENDS_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8', fontWeight: 600}} dy={10} />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: '#F1F5F9'}} 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="throughput" fill="#004532" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 glass-panel rounded-3xl overflow-hidden flex flex-col h-full">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Live Feed: Line A</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Live</span>
            </div>
          </div>
          <div className="relative flex-1 bg-neutral-900 group">
            <img 
              src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=600" 
              alt="Live Feed" 
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 border border-emerald-500/50 rounded-2xl relative scanning-reticle">
                <motion.div 
                  className="absolute top-0 left-0 w-full h-[2px] bg-emerald-400 shadow-[0_0_10px_#34D399]"
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>
            
            <div className="absolute top-8 left-8 bg-emerald-600 px-3 py-1.5 rounded-lg text-[10px] font-black text-white flex items-center gap-2 shadow-lg">
              <span>FEMALE</span>
              <span className="opacity-70">99.2%</span>
            </div>
            
            <div className="absolute bottom-8 right-8 bg-secondary-blue px-3 py-1.5 rounded-lg text-[10px] font-black text-white flex items-center gap-2 shadow-lg">
              <span>MALE</span>
              <span className="opacity-70">97.8%</span>
            </div>
          </div>
          <div className="p-5 bg-white space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Velocity</span>
              <span className="text-sm font-bold text-slate-900">1,240 p/hr</span>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-3xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
          <h3 className="text-lg font-bold font-display">Recent Batches</h3>
          <button className="text-xs font-bold text-emerald-700 hover:underline">View History</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {['Batch ID', 'Started At', 'Quantity', 'F/M Yield', 'Status', ''].map((h, i) => (
                  <th key={i} className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_BATCHES.slice(0, 3).map((batch) => (
                <tr key={batch.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-xs font-bold text-emerald-900">{batch.id}</td>
                  <td className="px-6 py-4 text-xs text-slate-500 font-medium">{batch.startTime}</td>
                  <td className="px-6 py-4 text-xs font-bold text-slate-900">{batch.totalCount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden flex">
                        <div className="bg-emerald-600 h-full w-[52%]" />
                        <div className="bg-emerald-600/20 h-full w-[48%]" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 tracking-widest">52/48</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm",
                      batch.status === 'In Progress' ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                    )}>
                      {batch.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-emerald-700 transition-colors p-1 rounded-md hover:bg-slate-100"><MoreVertical size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const WorkbenchView = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-140px)]">
      <div className="lg:col-span-8 flex flex-col gap-6">
        <div className="bg-white border p-6 rounded-2xl flex items-center gap-6">
          <div className="p-4 bg-emerald-100 text-emerald-800 rounded-xl">
            <Layers size={24} />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold font-display text-emerald-900">BATCH-#402-HATCHERY-A</h2>
            <p className="text-sm text-slate-500 font-medium tracking-tight">Lohmann Brown-Classic • Station 04</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Session Progress</p>
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold text-emerald-900">1,452 / 2,500</span>
              <div className="w-24 h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="bg-emerald-600 h-full w-[58%]" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 glass-panel rounded-[32px] overflow-hidden relative shadow-2xl shadow-emerald-900/10 border-2 border-emerald-600/20">
          <img src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Main Feed" />
          <div className="absolute inset-0 bg-black/20" />
          
          {/* Overlay elements */}
          <div className="absolute inset-0 flex items-center justify-center p-20">
            <div className="w-full h-full border-2 border-dashed border-white/30 rounded-[40px] flex items-center justify-center">
              <div className="w-64 h-64 border-2 border-emerald-400 rounded-3xl relative flex items-center justify-center shadow-[0_0_50px_rgba(52,211,153,0.3)]">
                <motion.div 
                  className="absolute inset-0 bg-emerald-400/10"
                  animate={{ opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div 
                  className="w-full h-1 bg-emerald-400 shadow-[0_0_20px_#34D399] absolute"
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                />
                <span className="bg-emerald-600 text-white text-[10px] font-black tracking-widest px-3 py-1 rounded absolute -top-4 left-4 shadow-xl">FEMALE - 98.4%</span>
              </div>
            </div>
          </div>
          
          <div className="absolute top-8 left-8 flex items-center gap-3">
            <div className="py-2 px-4 bg-black/60 rounded-full text-white text-xs font-bold backdrop-blur-md border border-white/20 flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              LIVE 4K 60FPS
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 p-2 bg-black/60 rounded-full backdrop-blur-xl border border-white/20">
             <button className="flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold text-xs hover:bg-white/10 transition-colors uppercase tracking-widest">
               <Settings size={16} /> Exposure: Auto
             </button>
             <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white font-black text-sm shadow-xl hover:bg-emerald-500 transition-all uppercase tracking-tighter shadow-emerald-500/50">
               <Zap size={18} /> Capture & Identify
             </button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-4 flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-panel p-5 rounded-3xl space-y-1">
            <CircleDot size={14} className="text-emerald-600" />
            <p className="text-3xl font-bold font-display text-slate-900">812</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Female Yield</p>
          </div>
          <div className="glass-panel p-5 rounded-3xl space-y-1">
            <CircleDot size={14} className="text-secondary-blue" />
            <p className="text-3xl font-bold font-display text-slate-900">640</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Male Found</p>
          </div>
        </div>

        <div className="flex-1 glass-panel rounded-3xl overflow-hidden shadow-sm flex flex-col">
          <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Live Audit Trail</span>
            <span className="text-[8px] font-bold bg-slate-200 px-1.5 py-0.5 rounded uppercase leading-none">Last 10</span>
          </div>
          <div className="flex-1 overflow-auto divide-y divide-slate-100">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="p-4 flex items-center gap-4 hover:bg-emerald-50/5 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-slate-900 overflow-hidden flex-shrink-0 grayscale group-hover:grayscale-0 transition-all duration-300">
                   <img src={`https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=100&h=100&i=${i}`} alt="Chick" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-slate-900">ID: #CH-{7452 + i}</span>
                    <span className="text-[8px] font-bold text-slate-400 uppercase">{i * 12}S AGO</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tighter",
                      i % 2 === 0 ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-600"
                    )}>
                      {i % 2 === 0 ? 'Female' : 'Male'}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">98.4% Conf.</span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-emerald-100 flex items-center justify-center text-[8px] font-bold text-emerald-600">
                   {95 + i}%
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-slate-100 bg-emerald-50/20 text-center">
            <button className="text-[10px] font-black text-emerald-700 uppercase tracking-widest hover:underline">Full History Analysis</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReportsView = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-4xl font-bold text-slate-900">Intelligence Reports</h1>
           <p className="text-slate-500 mt-2 font-medium">Real-time performance tracking and biological yield analysis</p>
        </div>
        <div className="flex gap-4">
           <button className="flex items-center gap-2 px-6 py-3 border border-slate-200 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm">
             <BarChart3 size={14} className="text-slate-400" />
             Last 30 Days
           </button>
           <button className="flex items-center gap-2 px-6 py-3 bg-primary-green text-white rounded-xl text-xs font-black shadow-xl shadow-primary-green/20 hover:scale-105 active:scale-95 transition-all">
             <ArrowUpRight size={14} />
             Export Dataset
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { icon: LayoutDashboard, label: 'Identified', value: '1.28M', trend: '+12%', color: 'text-emerald-600' },
          { icon: ShieldCheck, label: 'Avg Accuracy', value: '98.4%', trend: '+0.2%', color: 'text-emerald-600' },
          { icon: Zap, label: 'Peak Speed', value: '4,200', trend: 'Optimal', color: 'text-secondary-blue' },
          { icon: MapIcon, label: 'Active Zones', value: '14', trend: 'Online', color: 'text-emerald-700' },
        ].map((item, i) => (
          <div key={i} className="glass-panel p-6 rounded-2xl bg-white space-y-3">
             <div className="flex justify-between items-start">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{item.label}</span>
               <item.icon size={16} className="text-slate-400" />
             </div>
             <div className="flex items-end justify-between">
               <span className="text-3xl font-bold font-display">{item.value}</span>
               <span className={cn("text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-slate-50", item.color)}>{item.trend}</span>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-panel p-8 rounded-3xl h-[400px]">
           <h3 className="text-2xl font-bold font-display mb-8">Performance Volatility</h3>
           <ResponsiveContainer width="100%" height="100%">
             <LineChart data={TRENDS_DATA}>
               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
               <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
               <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)'}} />
               <Line type="monotone" dataKey="throughput" stroke="#004532" strokeWidth={3} dot={{r: 4, fill: '#004532'}} />
             </LineChart>
           </ResponsiveContainer>
        </div>

        <div className="glass-panel p-8 rounded-3xl flex flex-col h-[400px]">
           <h3 className="text-2xl font-bold font-display mb-1">Biological Yield</h3>
           <p className="text-xs text-slate-400 font-medium tracking-tight mb-8">Gender distribution across 1.2M subjects</p>
           <div className="flex-1 relative flex flex-col items-center justify-center">
              <PieChart width={200} height={200}>
                <Pie
                  data={[
                    { name: 'Female', value: 51.2 },
                    { name: 'Male', value: 48.8 },
                  ]}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#004532" />
                  <Cell fill="#cbd5e1" />
                </Pie>
              </PieChart>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="block text-2xl font-bold">51.2%</span>
                <span className="text-[8px] font-black text-emerald-700 uppercase tracking-widest">Female</span>
              </div>
              <div className="mt-4 w-full space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded bg-primary-green" />
                    <span className="text-xs font-medium text-slate-600">Female (Layers)</span>
                  </div>
                  <span className="text-xs font-bold">657,455</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded bg-slate-300" />
                    <span className="text-xs font-medium text-slate-600">Male</span>
                  </div>
                  <span className="text-xs font-bold">626,637</span>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const BatchesView = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-4xl font-bold text-slate-900">Batch Management</h1>
           <p className="text-slate-500 mt-2 font-medium">Monitor and organize precision sexing operations</p>
        </div>
        <button className="flex items-center gap-2 bg-primary-green text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl shadow-primary-green/20">
          <PlusCircle size={18} />
          New Batch
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Batches', value: '12', trend: '8% Higher', color: 'text-emerald-700' },
          { label: 'Avg Confidence', value: '98.4%', trend: 'Stable', color: 'text-emerald-600' },
          { label: 'Processed Today', value: '42,850', trend: 'Target Hit', color: 'text-slate-900' },
          { label: 'Female Yield', value: '51.2%', trend: 'Expected', color: 'text-secondary-blue' },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-6 rounded-2xl bg-white">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-3xl font-display font-bold text-slate-900">{stat.value}</span>
              <span className={cn("text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-slate-50", stat.color)}>{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-panel rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white/50">
          <div className="flex items-center gap-4">
             <div className="relative group">
               <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
               <input type="text" placeholder="Filter ID..." className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs w-48 outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all" />
             </div>
             <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors">Apply Filters</button>
          </div>
          <span className="text-xs text-slate-400 font-bold">Showing {MOCK_BATCHES.length} of 124 records</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                {['ID', 'Date', 'Breed', 'Quantity', 'M/F Ratio', 'Status', 'Operator', ''].map((h, i) => (
                  <th key={i} className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white/30 backdrop-blur-sm">
              {MOCK_BATCHES.map((batch) => (
                <tr key={batch.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 text-xs font-bold text-emerald-900">{batch.id}</td>
                  <td className="px-6 py-4 text-xs text-slate-500 font-medium">{batch.date}</td>
                  <td className="px-6 py-4 font-medium text-xs">
                    <span className="px-2 py-1 bg-slate-100 rounded-md text-slate-700">{batch.breed}</span>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-slate-900">{batch.totalCount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <div className="w-20 bg-slate-200 h-1 rounded-full overflow-hidden flex">
                          <div className="bg-emerald-600 h-full w-[52%]" />
                          <div className="bg-slate-600/20 h-full w-[48%]" />
                       </div>
                       <span className="text-[9px] font-bold text-slate-400">52:48</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                      batch.status === 'Completed' ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
                    )}>
                      {batch.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-500">{batch.operator}</td>
                  <td className="px-6 py-4 text-right"><MoreVertical size={16} className="text-slate-300" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-[10px] font-bold text-slate-400">
           <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-50" disabled>Previous</button>
           <div className="flex gap-2">
             <button className="w-8 h-8 rounded bg-emerald-700 text-white">1</button>
             <button className="w-8 h-8 rounded bg-white border border-slate-200 hover:bg-slate-50">2</button>
             <button className="w-8 h-8 rounded bg-white border border-slate-200 hover:bg-slate-50">3</button>
           </div>
           <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <DashboardView />;
      case 'workbench': return <WorkbenchView />;
      case 'batches': return <BatchesView />;
      case 'reports': return <ReportsView />;
      default: return <DashboardView />;
    }
  };

  const getTitle = () => {
    switch (activeView) {
      case 'dashboard': return '雏鸡公母鉴别系统';
      case 'workbench': return 'AI 鉴别工作台';
      case 'batches': return '批次溯源管理';
      case 'reports': return '智能分析统计';
      default: return '雏鸡公母鉴别系统';
    }
  };

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      <main className="flex-1 ml-64 min-w-0 min-h-screen flex flex-col">
        <TopBar title={getTitle()} />
        
        <div className="p-8 max-w-7xl mx-auto w-full flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Floating Notification Example */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed bottom-8 right-8 glass-panel border-emerald-200 p-4 rounded-2xl shadow-2xl flex items-center gap-4 max-w-sm z-50 overflow-hidden"
      >
        <div className="absolute top-0 left-0 h-1 bg-emerald-600 w-full" />
        <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800">
          <CheckCircle2 size={24} />
        </div>
        <div>
          <h4 className="text-xs font-bold text-emerald-900">System Calibrated</h4>
          <p className="text-[10px] text-slate-500 font-medium">Model precision within 0.1% of target.</p>
        </div>
      </motion.div>
    </div>
  );
}
