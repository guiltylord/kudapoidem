import React, { useState } from 'react';
import { Friend } from '../types';
import { FriendCard } from './FriendCard';
import { PRESET_ADDITIONAL_FRIENDS } from '../data/presetFriends';
import { Sparkles, Users, Plus, MessageSquare, Compass, Mic } from 'lucide-react';

interface StepSessionSetupProps {
  city: 'msk' | 'spb';
  setCity: (city: 'msk' | 'spb') => void;
  sessionTitle: string;
  setSessionTitle: (title: string) => void;
  expressPrompt: string;
  setExpressPrompt: (prompt: string) => void;
  friends: Friend[];
  onEditFriend: (friend: Friend) => void;
  onRemoveFriend: (friendId: string) => void;
  onAddFriend: (friend: Friend) => void;
  onStartMatching: () => void;
}

const QUICK_PROMPTS = [
  'Уютно поболтать и выпить вина',
  'Крафт и пицца, без кальянов',
  'Бюджетно и с настолками',
  'Азиатский рамен в тишине',
  'Движовый вечер с танцами'
];

export const StepSessionSetup: React.FC<StepSessionSetupProps> = ({
  city,
  setCity,
  sessionTitle,
  setSessionTitle,
  expressPrompt,
  setExpressPrompt,
  friends,
  onEditFriend,
  onRemoveFriend,
  onAddFriend,
  onStartMatching,
}) => {
  const [showAddPresetDropdown, setShowAddPresetDropdown] = useState(false);

  // Available presets not yet in company
  const availablePresets = PRESET_ADDITIONAL_FRIENDS.filter(
    (p) => !friends.some((f) => f.id === p.id)
  );

  const handleCreateNewFriend = () => {
    const newFriend: Friend = {
      id: `custom-${Date.now()}`,
      name: `Друг ${friends.length + 1}`,
      role: 'Участник',
      avatar: '🤠',
      isOrganizer: false,
      dna: {
        budgets: ['₽₽'],
        formats: ['Крафт', 'Стритфуд'],
        taboos: ['Кальяны / Дым'],
        vibe: 'Душевно поболтать',
      },
    };
    onAddFriend(newFriend);
    onEditFriend(newFriend); // immediately open editor
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Session Header Card */}
      <div className="bg-gradient-to-br from-[#18233c] to-[#12192b] border border-slate-700/60 rounded-3xl p-4 shadow-lg relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl"></div>

        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-xs text-cyan-300 font-semibold">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>Параметры сессии</span>
          </div>

          {/* City Badge (Fixed to Moscow for MVP) */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700/80 text-xs font-semibold text-cyan-300">
            <span>📍 Москва</span>
          </div>
        </div>

        {/* Title Input */}
        <div>
          <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-1">
            Повод / Название встречи
          </label>
          <input
            type="text"
            value={sessionTitle}
            onChange={(e) => setSessionTitle(e.target.value)}
            placeholder="Например: Пятничный вечер с бандой"
            className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-2xl text-white text-sm font-semibold placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Express Mood & Vibe Prompt */}
      <div className="bg-[#141d31] border border-slate-800 rounded-3xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
            Экспресс-настроение на вечер
          </label>
          <span className="text-[10px] text-slate-400 flex items-center gap-1 bg-slate-800/80 px-2 py-0.5 rounded-full">
            <Mic className="w-3 h-3 text-cyan-400" /> Голосом или текстом
          </span>
        </div>

        <div className="relative">
          <textarea
            rows={2}
            value={expressPrompt}
            onChange={(e) => setExpressPrompt(e.target.value)}
            placeholder="Чего хочется сегодня? Например: хотим тихо посидеть в центре, выпить сидра или вина и чтобы не орала музыка..."
            className="w-full px-3 py-2 bg-slate-900/90 border border-slate-800 rounded-2xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 resize-none"
          />
        </div>

        {/* Quick Tags */}
        <div className="mt-2 flex flex-wrap gap-1.5">
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => setExpressPrompt(prompt)}
              className={`text-[11px] px-2.5 py-1 rounded-xl transition-all ${
                expressPrompt === prompt
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              ✨ {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Friends & DNA Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-cyan-400" />
            <h3 className="font-bold text-white text-sm">
              Банда на вечер ({friends.length})
            </h3>
          </div>
          <span className="text-[11px] text-slate-400">
            ДНК досуга и табу
          </span>
        </div>

        {/* Friends Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {friends.map((friend) => (
            <FriendCard
              key={friend.id}
              friend={friend}
              onEdit={onEditFriend}
              onRemove={onRemoveFriend}
            />
          ))}
        </div>

        {/* Add Friend Controls */}
        <div className="relative pt-1">
          <div className="flex gap-2">
            {availablePresets.length > 0 && (
              <button
                type="button"
                onClick={() => setShowAddPresetDropdown(!showAddPresetDropdown)}
                className="flex-1 py-2 px-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-slate-300 flex items-center justify-center gap-1.5 transition-all"
              >
                <Plus className="w-3.5 h-3.5 text-cyan-400" />
                <span>Добавить друга из базы</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleCreateNewFriend}
              className="py-2 px-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-slate-300 flex items-center justify-center gap-1.5 transition-all"
            >
              <Plus className="w-3.5 h-3.5 text-cyan-400" />
              <span>Создать нового</span>
            </button>
          </div>

          {/* Preset Friends Dropdown */}
          {showAddPresetDropdown && availablePresets.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#17223b] border border-slate-700 rounded-2xl p-2 shadow-2xl z-30 space-y-1">
              <div className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1">
                Выберите готового друга:
              </div>
              {availablePresets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    onAddFriend(preset);
                    setShowAddPresetDropdown(false);
                  }}
                  className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-800/80 transition-colors text-left text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{preset.avatar}</span>
                    <div>
                      <div className="font-bold text-white">{preset.name}</div>
                      <div className="text-[10px] text-slate-400">{preset.role}</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-cyan-400 font-semibold">+ добавить</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main AI Matching CTA Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onStartMatching}
          disabled={friends.length === 0}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:from-cyan-400 hover:via-indigo-400 hover:to-purple-500 text-white font-extrabold text-sm shadow-lg shadow-cyan-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 animate-pulse-glow"
        >
          <Sparkles className="w-5 h-5 text-yellow-300" />
          <span>Найти компромисс (AI VibeMatch) ✨</span>
        </button>
        <p className="text-center text-[11px] text-slate-400 mt-2">
          Сверит ДНК {friends.length} друзей, отсечет табу и выдаст Топ-3
        </p>
      </div>
    </div>
  );
};
