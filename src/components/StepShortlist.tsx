import React, { useState } from 'react';
import { MatchScoreResult } from '../types';
import {
  Flame,
  Volume2,
  Lightbulb,
  Armchair,
  Music,
  MapPin,
  Phone,
  ThumbsUp,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Star,
  Quote,
} from 'lucide-react';

interface StepShortlistProps {
  results: MatchScoreResult[];
  onSelectFinalPlace: (winner: MatchScoreResult) => void;
  onBackToEdit: () => void;
}

export const StepShortlist: React.FC<StepShortlistProps> = ({
  results,
  onSelectFinalPlace,
  onBackToEdit,
}) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [votesState, setVotesState] = useState<{ [venueId: string]: number }>({});
  const [votedVenueId, setVotedVenueId] = useState<string | null>(null);

  const top3 = results.slice(0, 3);
  const currentResult = top3[selectedIdx] || top3[0];

  if (!currentResult) {
    return (
      <div className="p-6 text-center text-slate-400">
        <p>Не найдено подходящих мест. Попробуйте смягчить табу или сменить город.</p>
        <button
          onClick={onBackToEdit}
          className="mt-4 px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-semibold"
        >
          Вернуться к настройкам
        </button>
      </div>
    );
  }

  const { venue, totalScore, participantFits, matchedTags } = currentResult;
  const currentVotes = (votesState[venue.id] || 0) + (selectedIdx === 0 ? 1 : 0); // preset 1 vote for champion

  const handleVote = (venueId: string) => {
    if (votedVenueId === venueId) return;
    setVotesState((prev) => ({
      ...prev,
      [venueId]: (prev[venueId] || 0) + 1,
    }));
    setVotedVenueId(venueId);
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Shortlist Nav Tabs */}
      <div className="flex items-center justify-between gap-1 bg-[#121a2d] p-1.5 rounded-2xl border border-slate-800">
        {top3.map((res, idx) => {
          const isActive = idx === selectedIdx;
          return (
            <button
              key={res.venue.id}
              onClick={() => setSelectedIdx(idx)}
              className={`flex-1 py-2 px-1 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {idx === 0 && <Flame className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />}
              <span>
                {idx === 0 ? 'Топ-1' : idx === 1 ? 'Топ-2' : 'Топ-3'}
              </span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                isActive ? 'bg-black/30 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {res.totalScore}%
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Venue Card */}
      <div className="bg-[#141e33] border border-slate-700/80 rounded-3xl overflow-hidden shadow-xl">
        {/* Photo & Overlays */}
        <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-900">
          <img
            src={venue.imageUrl}
            alt={venue.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141e33] via-black/40 to-black/20"></div>

          {/* Match Score Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1 px-3 py-1 bg-black/75 backdrop-blur-md rounded-full border border-cyan-500/40 text-cyan-300 text-xs font-extrabold shadow-lg">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{totalScore}% VibeMatch</span>
            {selectedIdx === 0 && (
              <span className="ml-1 text-[10px] text-amber-300 font-bold">• Чемпион компромисса</span>
            )}
          </div>

          {/* Rating & District */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <div>
              <span className="text-[11px] font-semibold text-cyan-300 uppercase tracking-wider block">
                {venue.category}
              </span>
              <h2 className="text-xl font-extrabold text-white leading-tight drop-shadow-md">
                {venue.name}
              </h2>
              <div className="flex items-center gap-1 text-slate-300 text-xs mt-0.5">
                <MapPin className="w-3 h-3 text-cyan-400" />
                <span>{venue.metro} • {venue.district}</span>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-amber-500/20 backdrop-blur-md border border-amber-500/40 text-amber-300 px-2 py-1 rounded-xl text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{venue.rating}</span>
              <span className="text-[10px] text-slate-400 font-normal">({venue.reviewsCount})</span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-4">
          {/* Key Atmosphere Telemetry */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-900/80 p-2.5 rounded-2xl border border-slate-800 flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400">Уровень шума</div>
                <div className="font-semibold text-white leading-tight">{venue.atmosphere.noiseLevel}</div>
              </div>
            </div>

            <div className="bg-slate-900/80 p-2.5 rounded-2xl border border-slate-800 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400">Освещение</div>
                <div className="font-semibold text-white leading-tight">{venue.atmosphere.light}</div>
              </div>
            </div>

            <div className="bg-slate-900/80 p-2.5 rounded-2xl border border-slate-800 flex items-center gap-2">
              <Armchair className="w-4 h-4 text-indigo-400 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400">Рассадка</div>
                <div className="font-semibold text-white leading-tight">{venue.atmosphere.tableSpacing}</div>
              </div>
            </div>

            <div className="bg-slate-900/80 p-2.5 rounded-2xl border border-slate-800 flex items-center gap-2">
              <Music className="w-4 h-4 text-purple-400 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400">Музыкальный вайб</div>
                <div className="font-semibold text-white leading-tight truncate">{venue.atmosphere.music}</div>
              </div>
            </div>
          </div>

          {/* Check & Address bar */}
          <div className="flex items-center justify-between text-xs py-2 px-3 bg-slate-900/50 rounded-xl border border-slate-800 text-slate-300">
            <span>Средний чек: <b className="text-emerald-400">~{venue.averageCheck} ₽</b> ({venue.checkTier})</span>
            <span className="text-slate-400 truncate max-w-[170px]">{venue.address}</span>
          </div>

          {/* AI Compromise Breakdown: Why it fits everyone */}
          <div className="bg-gradient-to-br from-[#19243f] to-[#12192b] border border-cyan-500/30 rounded-2xl p-3.5 space-y-2.5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Почему подходит каждому в банде:</span>
              </div>
              <span className="text-[10px] bg-cyan-500/10 text-cyan-300 px-2 py-0.5 rounded-full font-medium">
                AI Match
              </span>
            </div>

            <div className="space-y-2">
              {participantFits.map((fit) => (
                <div key={fit.friendId} className="flex items-start gap-2.5 text-xs">
                  <span className="text-base shrink-0 mt-0.5">{fit.avatar}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200">{fit.friendName}</span>
                      <span className="text-[10px] font-semibold text-cyan-400">{fit.score}%</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-tight mt-0.5">{fit.reason}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Taboo Safety Notice */}
            <div className="pt-2 border-t border-slate-700/60 flex items-center gap-1.5 text-[11px] text-emerald-300 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Стоп-факторы проверены: 100% без дыма кальянов и дискомфорта</span>
            </div>
          </div>

          {/* Vibe Quotes from Maps */}
          {venue.reviewQuotes.length > 0 && (
            <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                <Quote className="w-3 h-3 text-cyan-400" />
                <span>Выжимка атмосферы из карт:</span>
              </div>
              {venue.reviewQuotes.slice(0, 1).map((q, idx) => (
                <div key={idx} className="text-xs text-slate-300 italic">
                  «{q.text}»
                  <span className="block text-[10px] text-slate-500 not-italic mt-0.5 font-medium">
                    — {q.author} • <span className="text-cyan-400">{q.vibeBadge}</span>
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Voting & Decision Buttons */}
          <div className="pt-2 space-y-2">
            <div className="flex items-center gap-2">
              {/* Vote for this spot */}
              <button
                type="button"
                onClick={() => handleVote(venue.id)}
                className={`flex-1 py-3 px-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 border transition-all ${
                  votedVenueId === venue.id
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-md'
                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-600'
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span>
                  {votedVenueId === venue.id ? 'Твой голос учтен!' : 'Голосовать за это место'} ({currentVotes})
                </span>
              </button>
            </div>

            {/* Select as winner CTA */}
            <button
              type="button"
              onClick={() => onSelectFinalPlace(currentResult)}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5 text-slate-950" />
              <span>Утвердить выбор банды 🎉</span>
            </button>

            {/* External Maps Link */}
            <div className="flex items-center justify-between pt-1 text-xs text-slate-400 px-1">
              <a
                href={venue.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-300 flex items-center gap-1 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Открыть на Яндекс Картах</span>
              </a>
              <a
                href={`tel:${venue.phone}`}
                className="hover:text-cyan-300 flex items-center gap-1 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Позвонить</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
