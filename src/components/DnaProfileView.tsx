import React, { useState } from 'react';
import { Friend, BudgetTier } from '../types';
import { AVAILABLE_FORMATS, AVAILABLE_TABOOS, AVAILABLE_VIBES } from '../data/presetFriends';
import { Dna, ShieldAlert, Sparkles, Check, DollarSign, Save } from 'lucide-react';

interface DnaProfileViewProps {
  organizer: Friend;
  onUpdateOrganizer: (updated: Friend) => void;
}

const BUDGET_OPTIONS: { tier: BudgetTier; label: string; desc: string }[] = [
  { tier: '₽', label: 'До 1000 ₽', desc: 'Бюджетно' },
  { tier: '₽₽', label: '1000–1800 ₽', desc: 'Комфортно' },
  { tier: '₽₽₽', label: '1800–3000 ₽', desc: 'Премиум' },
  { tier: '₽₽₽₽', label: '3000+ ₽', desc: 'Люкс' },
];

export const DnaProfileView: React.FC<DnaProfileViewProps> = ({ organizer, onUpdateOrganizer }) => {
  const [name, setName] = useState(organizer.name);
  const [avatar, setAvatar] = useState(organizer.avatar);
  const [budgets, setBudgets] = useState<BudgetTier[]>(organizer.dna.budgets);
  const [formats, setFormats] = useState<string[]>(organizer.dna.formats);
  const [taboos, setTaboos] = useState<string[]>(organizer.dna.taboos);
  const [vibe, setVibe] = useState<string>(organizer.dna.vibe);
  const [savedNotification, setSavedNotification] = useState(false);

  const toggleBudget = (tier: BudgetTier) => {
    if (budgets.includes(tier)) {
      if (budgets.length > 1) {
        setBudgets(budgets.filter((b) => b !== tier));
      }
    } else {
      setBudgets([...budgets, tier]);
    }
  };

  const toggleFormat = (fmt: string) => {
    if (formats.includes(fmt)) {
      setFormats(formats.filter((f) => f !== fmt));
    } else {
      setFormats([...formats, fmt]);
    }
  };

  const toggleTaboo = (tb: string) => {
    if (taboos.includes(tb)) {
      setTaboos(taboos.filter((t) => t !== tb));
    } else {
      setTaboos([...taboos, tb]);
    }
  };

  const handleSave = () => {
    onUpdateOrganizer({
      ...organizer,
      name,
      avatar,
      dna: {
        budgets,
        formats,
        taboos,
        vibe,
      },
    });
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Intro banner */}
      <div className="bg-gradient-to-br from-[#182542] to-[#121b2d] border border-cyan-500/30 rounded-3xl p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-2xl shadow-inner">
            <Dna className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white">Твой «ДНК досуга»</h2>
            <p className="text-xs text-slate-300">
              Настраивается 1 раз. Приглашая друзей, сервис автоматически учитывает вкусы каждого.
            </p>
          </div>
        </div>
      </div>

      {/* User Basic Info */}
      <div className="bg-[#141e33] border border-slate-800 rounded-3xl p-4 space-y-4">
        <div className="grid grid-cols-4 gap-2">
          <div className="col-span-1">
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Аватар</label>
            <input
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value.slice(0, 2))}
              className="w-full text-center text-xl py-2 bg-slate-900 border border-slate-700 rounded-2xl text-white focus:outline-none focus:border-cyan-400"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Твое имя в Telegram</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-2xl text-white text-sm font-semibold focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Budgets */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-200 mb-2">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            Комфортный бюджет (выберите подходящие)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {BUDGET_OPTIONS.map((opt) => {
              const isSelected = budgets.includes(opt.tier);
              return (
                <button
                  key={opt.tier}
                  type="button"
                  onClick={() => toggleBudget(opt.tier)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200 shadow-sm'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="font-bold text-xs">{opt.tier} {opt.desc}</div>
                    <div className="text-[10px] text-slate-400">{opt.label}</div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Formats */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-200 mb-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Любимые форматы и кухни
          </label>
          <div className="flex flex-wrap gap-1.5">
            {AVAILABLE_FORMATS.map((fmt) => {
              const isSelected = formats.includes(fmt);
              return (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => toggleFormat(fmt)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {fmt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Taboos */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold text-red-400 mb-2">
            <ShieldAlert className="w-4 h-4 text-red-400" />
            Стоп-факторы и табу (жесткий фильтр алгоритма)
          </label>
          <div className="flex flex-wrap gap-1.5">
            {AVAILABLE_TABOOS.map((tb) => {
              const isSelected = taboos.includes(tb);
              return (
                <button
                  key={tb}
                  type="button"
                  onClick={() => toggleTaboo(tb)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-red-500/20 border border-red-500/60 text-red-300 font-bold shadow-sm'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  🚫 {tb}
                </button>
              );
            })}
          </div>
        </div>

        {/* Default Vibe */}
        <div>
          <label className="block text-xs font-bold text-slate-200 mb-2">
            Базовое настроение
          </label>
          <div className="grid grid-cols-1 gap-1.5">
            {AVAILABLE_VIBES.map((vb) => {
              const isSelected = vibe === vb;
              return (
                <button
                  key={vb}
                  type="button"
                  onClick={() => setVibe(vb)}
                  className={`px-3 py-2.5 rounded-xl text-left text-xs font-medium flex items-center justify-between border transition-all ${
                    isSelected
                      ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-200 font-semibold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span>{vb}</span>
                  {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Save button */}
        <button
          type="button"
          onClick={handleSave}
          className={`w-full py-3 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all ${
            savedNotification
              ? 'bg-emerald-500 text-slate-950'
              : 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-cyan-500/20 hover:from-cyan-400 hover:to-indigo-400'
          }`}
        >
          {savedNotification ? (
            <>
              <Check className="w-4 h-4" />
              <span>Профиль сохранен!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Сохранить мой ДНК профиль</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
