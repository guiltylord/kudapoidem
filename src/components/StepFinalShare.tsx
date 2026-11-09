import React, { useState } from 'react';
import { MatchScoreResult } from '../types';
import {
  Sparkles,
  Share2,
  Copy,
  Check,
  MapPin,
  ExternalLink,
  RotateCcw,
  Users,
  Flame,
  Phone,
} from 'lucide-react';

interface StepFinalShareProps {
  winner: MatchScoreResult;
  sessionTitle: string;
  onReset: () => void;
}

export const StepFinalShare: React.FC<StepFinalShareProps> = ({
  winner,
  sessionTitle,
  onReset,
}) => {
  const [copied, setCopied] = useState(false);
  const { venue, totalScore, participantFits } = winner;

  // Generate Telegram Markdown Card
  const generateTelegramMessage = () => {
    const friendList = participantFits
      .map((p) => `• ${p.avatar} ${p.friendName}: ${p.reason}`)
      .join('\n');

    return `🔥 *Выбор банды утвержден:* ${venue.name}!\n\n` +
      `📅 *Встреча:* ${sessionTitle || 'Пятничный вечер'}\n` +
      `✨ *VibeMatch скор:* ${totalScore}% (компромисс найден)\n` +
      `📍 *Адрес:* ${venue.metro}, ${venue.address}\n` +
      `💳 *Средний чек:* ~${venue.averageCheck} ₽ (${venue.checkTier})\n` +
      `🎵 *Вайб:* ${venue.atmosphere.noiseLevel}, ${venue.atmosphere.music}\n\n` +
      `🤝 *Почему подошло всем:*\n${friendList}\n\n` +
      `🗺️ *Маршрут на картах:* ${venue.mapsUrl}\n\n` +
      `_Подобрано через бот «КудаПойдем» (VibeMatch)_`;
  };

  const handleCopy = () => {
    const text = generateTelegramMessage();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-5 animate-in zoom-in-95 duration-200">
      {/* Celebration Header */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Единогласный компромисс банды!</span>
        </div>
        <h2 className="text-xl font-extrabold text-white">
          Идем в «{venue.name}» 🍸
        </h2>
        <p className="text-xs text-slate-400">
          Спор на 40 минут решен за 30 секунд алгоритмом VibeMatch
        </p>
      </div>

      {/* Styled Result Card (ready for screenshot / sharing) */}
      <div className="bg-[#152037] border-2 border-cyan-500/50 rounded-3xl overflow-hidden shadow-2xl relative">
        <div className="relative h-44 w-full">
          <img
            src={venue.imageUrl}
            alt={venue.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#152037] via-black/40 to-transparent"></div>

          <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-cyan-400/40 text-cyan-300 text-xs font-extrabold flex items-center gap-1 shadow-lg">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{totalScore}% Мэтч</span>
          </div>

          <div className="absolute bottom-3 left-4">
            <span className="text-[10px] text-cyan-300 uppercase tracking-widest font-bold">
              {venue.category}
            </span>
            <h3 className="text-xl font-black text-white leading-tight">
              {venue.name}
            </h3>
            <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-cyan-400" />
              {venue.metro} • {venue.address}
            </p>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {/* Company agreement breakdown */}
          <div className="bg-slate-900/80 rounded-2xl p-3 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                <span>Все участники согласны:</span>
              </div>
              <span className="text-emerald-400 text-[11px] font-semibold">100% компромисс</span>
            </div>

            <div className="space-y-1.5 text-xs">
              {participantFits.map((p) => (
                <div key={p.friendId} className="flex items-center justify-between text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <span>{p.avatar}</span>
                    <span className="font-medium">{p.friendName}</span>
                  </div>
                  <span className="text-[11px] text-slate-400">{p.reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Vibe Tags Pills */}
          <div className="flex flex-wrap gap-1.5 text-[11px]">
            {winner.matchedTags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-medium"
              >
                ✨ {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5">
        {/* Copy for Telegram button */}
        <button
          type="button"
          onClick={handleCopy}
          className={`w-full py-3.5 px-4 rounded-2xl font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-2 ${
            copied
              ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/30'
              : 'bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white shadow-cyan-500/25 active:scale-[0.98]'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-slate-950" />
              <span>Скопировано! Вставь в чат банды 🚀</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Скопировать карточку в Telegram чат 📋</span>
            </>
          )}
        </button>

        {/* Direct Maps & Phone Links */}
        <div className="grid grid-cols-2 gap-2">
          <a
            href={venue.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="py-2.5 px-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            <span>Маршрут в Карты</span>
          </a>

          <a
            href={`tel:${venue.phone}`}
            className="py-2.5 px-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>Позвонить</span>
          </a>
        </div>

        {/* Reset / New Session */}
        <button
          type="button"
          onClick={onReset}
          className="w-full py-2.5 text-center text-xs font-semibold text-slate-400 hover:text-slate-200 flex items-center justify-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Собрать новую встречу</span>
        </button>
      </div>
    </div>
  );
};
