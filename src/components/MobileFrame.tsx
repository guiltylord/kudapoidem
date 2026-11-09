import React, { useState } from 'react';
import { Smartphone, Monitor, Wifi, Battery, Signal, Sparkles, User, MapPin, Calendar } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
  activeTab: 'session' | 'dna' | 'database';
  setActiveTab: (tab: 'session' | 'dna' | 'database') => void;
  onResetToStep1?: () => void;
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
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);

  // Current time for phone status bar
  const currentTime = '20:15';

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col items-center justify-start p-0 md:py-6 md:px-4">
      {/* Top desktop control bar */}
      <aside aria-label="Режимы отображения" className="hidden md:flex items-center justify-between w-full max-w-[430px] mb-3 px-3 py-2 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 text-xs text-slate-400 shadow-lg">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-medium text-slate-300">Telegram Mini App MVP</span>
        </div>
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800/80">
          <button
            onClick={() => setIsPhoneFrame(true)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
              isPhoneFrame
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Эмуляция экрана смартфона"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Смартфон</span>
          </button>
          <button
            onClick={() => setIsPhoneFrame(false)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
              !isPhoneFrame
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Широкий экран"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Широкий</span>
          </button>
        </div>
      </aside>

      {/* Main Container - Phone or Full Width */}
      <div
        className={`w-full transition-all duration-300 flex flex-col ${
          isPhoneFrame
            ? 'max-w-[420px] min-h-[850px] md:h-[890px] md:rounded-[44px] md:border-[8px] md:border-slate-800/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden relative bg-[#0e1626]'
            : 'max-w-2xl min-h-screen md:rounded-3xl border border-slate-800 bg-[#0e1626] overflow-hidden'
        }`}
      >
        {/* Phone Dynamic Island / Speaker Notch (only visible on desktop phone frame) */}
        {isPhoneFrame && (
          <div className="hidden md:flex justify-center pt-2 pb-1 bg-[#0e1626] z-50">
            <div className="w-28 h-4 bg-black rounded-full flex items-center justify-end px-3">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800"></div>
            </div>
          </div>
        )}

        {/* Telegram App Header */}
        <header className="sticky top-0 z-40 bg-[#131c31]/95 backdrop-blur-md border-b border-slate-800/80 px-4 pt-3 pb-3 flex flex-col gap-2">
          {/* iOS / Android status indicators */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold px-1">
            <span>{currentTime}</span>
            <div className="flex items-center gap-1.5 text-slate-300">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>

          {/* Telegram Mini App Top Nav Bar */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              {canGoBack ? (
                <button
                  onClick={onGoBack}
                  className="p-1 -ml-1 text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 text-xs font-medium"
                >
                  <span className="text-base leading-none">‹</span> Назад
                </button>
              ) : (
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center shadow-sm shadow-cyan-500/30">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              )}
              <div>
                <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-1">
                  {title}
                  <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.2 rounded font-semibold border border-cyan-500/30">
                    bot
                  </span>
                </h1>
                <p className="text-[10px] text-slate-400">мини-приложение в Telegram</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                className="w-7 h-7 rounded-full bg-slate-800/80 hover:bg-slate-700/80 flex items-center justify-center text-slate-300 text-xs font-bold transition-colors"
                title="Опции"
              >
                •••
              </button>
              <button
                className="w-7 h-7 rounded-full bg-slate-800/80 hover:bg-slate-700/80 flex items-center justify-center text-slate-400 hover:text-slate-200 text-xs font-semibold transition-colors"
                title="Закрыть"
              >
                ✕
              </button>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto px-4 py-4 pb-24 space-y-4">
          {children}
        </main>

        {/* Telegram Bottom Navigation Bar */}
        <nav aria-label="Основная навигация" className="absolute bottom-0 left-0 right-0 z-40 bg-[#11192c]/95 backdrop-blur-lg border-t border-slate-800/80 px-4 py-2 flex items-center justify-around shadow-2xl">
          <button
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
            onClick={() => setActiveTab('dna')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
              activeTab === 'dna'
                ? 'text-cyan-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className={`w-5 h-5 ${activeTab === 'dna' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[11px]">ДНК досуга</span>
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
              activeTab === 'database'
                ? 'text-cyan-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MapPin className={`w-5 h-5 ${activeTab === 'database' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[11px]">Все места</span>
          </button>
        </nav>
      </div>
    </div>
  );
};
