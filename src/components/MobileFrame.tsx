import React from 'react';
import { Sparkles, User, MapPin, Calendar } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
  activeTab: 'session' | 'dna' | 'database';
  setActiveTab: (tab: 'session' | 'dna' | 'database') => void;
  canGoBack?: boolean;
  onGoBack?: () => void;
  title?: string;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  children,
  activeTab,
  setActiveTab,
  canGoBack,
  onGoBack,
  title = 'КудаПойдем | VibeMatch',
}) => {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex justify-center">
      {/* Real mobile-first container (max-w-md, clean layout) */}
      <div className="w-full max-w-md min-h-screen flex flex-col bg-[#0e1626] shadow-2xl relative">
        {/* Clean Header */}
        <header className="sticky top-0 z-40 bg-[#131c31]/95 backdrop-blur-md border-b border-slate-800/80 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {canGoBack ? (
              <button
                type="button"
                onClick={onGoBack}
                className="p-1 -ml-1 text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 text-xs font-semibold"
              >
                <span className="text-lg leading-none">‹</span> Назад
              </button>
            ) : (
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center shadow-md shadow-cyan-500/20">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            )}
            <div>
              <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                {title}
                <span className="text-[10px] bg-cyan-500/15 text-cyan-300 px-1.5 py-0.5 rounded font-medium border border-cyan-500/30">
                  Москва
                </span>
              </h1>
              <p className="text-[10px] text-slate-400">Поиск места для компании</p>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 px-4 py-4 pb-24 space-y-4">
          {children}
        </main>

        {/* Bottom Navigation */}
        <nav aria-label="Основная навигация" className="fixed bottom-0 w-full max-w-md z-40 bg-[#11192c]/95 backdrop-blur-lg border-t border-slate-800/80 px-4 py-2.5 flex items-center justify-around shadow-2xl">
          <button
            type="button"
            onClick={() => setActiveTab('session')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
              activeTab === 'session'
                ? 'text-cyan-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className={`w-5 h-5 ${activeTab === 'session' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[11px]">Встреча</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('dna')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
              activeTab === 'dna'
                ? 'text-cyan-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className={`w-5 h-5 ${activeTab === 'dna' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[11px]">Мои вкусы</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('database')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
              activeTab === 'database'
                ? 'text-cyan-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MapPin className={`w-5 h-5 ${activeTab === 'database' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[11px]">База мест</span>
          </button>
        </nav>
      </div>
    </div>
  );
};
