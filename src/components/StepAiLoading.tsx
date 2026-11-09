import React, { useEffect, useState } from 'react';
import { Sparkles, ShieldCheck, Database, BrainCircuit, Check } from 'lucide-react';

interface StepAiLoadingProps {
  onComplete: () => void;
  friendCount: number;
  cityName: string;
}

const STEPS = [
  {
    icon: BrainCircuit,
    title: 'Агрегация ДНК досуга',
    desc: 'Сравниваем бюджеты, любимые форматы и настроения всех участников',
  },
  {
    icon: ShieldCheck,
    title: 'Фильтрация табу и стоп-факторов',
    desc: 'Исключаем места с кальянами, орущей музыкой и неподходящим чеком',
  },
  {
    icon: Database,
    title: 'Семантический анализ отзывов',
    desc: 'Парсим реальный вайб по Яндекс Картам: свет, шум, расстояние между столами',
  },
  {
    icon: Sparkles,
    title: 'Расчет индекса компромисса',
    desc: 'Генерируем Топ-3 с персональным обоснованием для каждого друга',
  },
];

export const StepAiLoading: React.FC<StepAiLoadingProps> = ({ onComplete, friendCount, cityName }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 600);
          return prev;
        }
      });
    }, 750);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="min-h-[500px] flex flex-col items-center justify-center p-4 text-center animate-in fade-in duration-300">
      {/* Central Pulsing AI Core */}
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 animate-spin flex items-center justify-center shadow-xl shadow-cyan-500/30 p-1">
          <div className="w-full h-full bg-[#0c1221] rounded-full flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-cyan-400 animate-pulse" />
          </div>
        </div>
        <div className="absolute inset-0 rounded-full border-2 border-cyan-400/40 animate-ping"></div>
      </div>

      <h3 className="text-lg font-extrabold text-white mb-1">
        VibeMatch AI ищет компромисс...
      </h3>
      <p className="text-xs text-slate-400 mb-6 max-w-xs">
        Город: <span className="text-cyan-400 font-semibold">{cityName}</span> • Банда: <span className="text-cyan-400 font-semibold">{friendCount} чел.</span>
      </p>

      {/* Steps List */}
      <div className="w-full max-w-xs space-y-2.5 text-left">
        {STEPS.map((step, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          const StepIcon = step.icon;

          return (
            <div
              key={step.title}
              className={`p-3 rounded-2xl border transition-all duration-300 flex items-start gap-3 ${
                isDone
                  ? 'bg-slate-900/60 border-emerald-500/30 text-emerald-300'
                  : isCurrent
                  ? 'bg-slate-900 border-cyan-500/50 shadow-md shadow-cyan-500/10 text-white'
                  : 'bg-slate-900/30 border-slate-800 text-slate-500'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                  isDone
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : isCurrent
                    ? 'bg-cyan-500/20 text-cyan-400 animate-pulse'
                    : 'bg-slate-800 text-slate-600'
                }`}
              >
                {isDone ? <Check className="w-4 h-4" /> : <StepIcon className="w-4 h-4" />}
              </div>
              <div>
                <div className="text-xs font-bold leading-snug">{step.title}</div>
                <div className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{step.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
