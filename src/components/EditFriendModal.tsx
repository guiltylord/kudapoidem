import React, { useState } from 'react';
import { Friend, BudgetTier } from '../types';
import { AVAILABLE_FORMATS, AVAILABLE_TABOOS, AVAILABLE_VIBES } from '../data/presetFriends';
import { X, ShieldAlert, Sparkles, Check, DollarSign } from 'lucide-react';

interface EditFriendModalProps {
  friend: Friend;
  onSave: (updated: Friend) => void;
  onClose: () => void;
}

const BUDGET_OPTIONS: { tier: BudgetTier; label: string; desc: string }[] = [
  { tier: '₽', label: 'До 1000 ₽', desc: 'Бюджетно' },
  { tier: '₽₽', label: '1000–1800 ₽', desc: 'Комфортно' },
  { tier: '₽₽₽', label: '1800–3000 ₽', desc: 'Премиум' },
  { tier: '₽₽₽₽', label: '3000+ ₽', desc: 'Люкс' },
];

export const EditFriendModal: React.FC<EditFriendModalProps> = ({ friend, onSave, onClose }) => {
  const [name, setName] = useState(friend.name);
  const [role, setRole] = useState(friend.role);
  const [avatar, setAvatar] = useState(friend.avatar);
  const [budgets, setBudgets] = useState<BudgetTier[]>(friend.dna.budgets);
  const [formats, setFormats] = useState<string[]>(friend.dna.formats);
  const [taboos, setTaboos] = useState<string[]>(friend.dna.taboos);
  const [vibe, setVibe] = useState<string>(friend.dna.vibe);

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
    onSave({
      ...friend,
      name,
      role,
      avatar,
      dna: {
        budgets,
        formats,
        taboos,
        vibe,
      },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-md bg-[#131d33] border border-slate-700/80 rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-[#17233d]">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{avatar}</span>
            <div>
              <h3 className="font-bold text-white text-base">ДНК: {name}</h3>
              <p className="text-xs text-slate-400">Настройка предпочтений участника</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1 text-sm">
          {/* Basic Info */}
          <div className="grid grid-cols-4 gap-2">
            <div className="col-span-1">
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Эмодзи</label>
              <input
                type="text"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value.slice(0, 2))}
                className="w-full text-center text-xl py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div className="col-span-3">
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Имя</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              Комфортный бюджет (можно несколько)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {BUDGET_OPTIONS.map((opt) => {
                const isSelected = budgets.includes(opt.tier);
                return (
                  <button
                    key={opt.tier}
                    type="button"
                    onClick={() => toggleBudget(opt.tier)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs">{opt.tier} {opt.desc}</div>
                      <div className="text-[10px] text-slate-400">{opt.label}</div>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Formats */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-2">
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
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/30'
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
            <label className="flex items-center gap-1.5 text-xs font-semibold text-red-400 mb-2">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              Жесткие табу / Стоп-факторы (AI исключит эти места)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {AVAILABLE_TABOOS.map((tb) => {
                const isSelected = taboos.includes(tb);
                return (
                  <button
                    key={tb}
                    type="button"
                    onClick={() => toggleTaboo(tb)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-red-500/20 border border-red-500/60 text-red-300 font-semibold'
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    🚫 {tb}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Vibe mood */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Настроение на вечер
            </label>
            <div className="grid grid-cols-1 gap-1.5">
              {AVAILABLE_VIBES.map((vb) => {
                const isSelected = vibe === vb;
                return (
                  <button
                    key={vb}
                    type="button"
                    onClick={() => setVibe(vb)}
                    className={`px-3 py-2 rounded-xl text-left text-xs font-medium flex items-center justify-between border transition-all ${
                      isSelected
                        ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-200'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span>{vb}</span>
                    {isSelected && <span className="w-2 h-2 rounded-full bg-indigo-400"></span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#17233d] flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
          >
            Отмена
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-bold text-xs shadow-md shadow-cyan-500/20 transition-all"
          >
            Сохранить в банду
          </button>
        </div>
      </div>
    </div>
  );
};
