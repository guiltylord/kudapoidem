import React, { useState } from 'react';
import { MOCK_VENUES } from '../data/mockVenues';
import { Venue } from '../types';
import { MapPin, Star, Volume2, Lightbulb, Armchair, Music, ExternalLink, Search } from 'lucide-react';

export const DatabaseExplorerView: React.FC = () => {
  const [selectedCity] = useState<'msk'>('msk');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Крафт', 'Вино', 'Необистро', 'Спешелти', 'Стритфуд', 'Паназия'];

  const filteredVenues = MOCK_VENUES.filter((venue) => {
    if (venue.city !== 'msk') return false;
    if (selectedCategory !== 'all') {
      const allText = `${venue.category} ${venue.cuisine} ${venue.vibeTags.join(' ')}`.toLowerCase();
      if (!allText.includes(selectedCategory.toLowerCase())) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const searchTarget = `${venue.name} ${venue.district} ${venue.metro} ${venue.category} ${venue.vibeTags.join(' ')}`.toLowerCase();
      if (!searchTarget.includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Intro */}
      <div className="bg-[#141e33] border border-slate-800 rounded-3xl p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-white">База заведений</h2>
            <p className="text-xs text-slate-400">
              Кураторская база Москвы и Санкт-Петербурга с AI-вайб тегами
            </p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            {filteredVenues.length} мест
          </span>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по названию, метро, кухне или вайбу..."
            className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700/80 rounded-2xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* List of places */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVenues.map((venue) => (
          <div
            key={venue.id}
            className="bg-[#141e33] border border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:border-slate-700 transition-all"
          >
            <div className="relative h-32 w-full">
              <img
                src={venue.imageUrl}
                alt={venue.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141e33] via-transparent to-black/30"></div>

              <div className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded-lg text-[10px] font-bold text-white uppercase tracking-wider border border-white/10">
                {venue.city === 'msk' ? 'Москва' : 'СПб'} • {venue.metro}
              </div>

              <div className="absolute top-2.5 right-2.5 bg-amber-500/20 backdrop-blur-md border border-amber-500/40 text-amber-300 px-2 py-0.5 rounded-lg text-[11px] font-bold flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{venue.rating}</span>
              </div>

              <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-white leading-tight">
                    {venue.name}
                  </h3>
                  <p className="text-[11px] text-cyan-300 font-medium">
                    {venue.category}
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-slate-950/80 px-2 py-0.5 rounded-md border border-slate-800">
                  ~{venue.averageCheck} ₽
                </span>
              </div>
            </div>

            <div className="p-3.5 space-y-2.5">
              {/* Telemetry chips */}
              <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                <div className="bg-slate-900/80 p-1.5 rounded-xl border border-slate-800/80 flex items-center gap-1.5 text-slate-300">
                  <Volume2 className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span className="truncate">{venue.atmosphere.noiseLevel.split(' ')[0]}</span>
                </div>
                <div className="bg-slate-900/80 p-1.5 rounded-xl border border-slate-800/80 flex items-center gap-1.5 text-slate-300">
                  <Lightbulb className="w-3 h-3 text-amber-400 shrink-0" />
                  <span className="truncate">{venue.atmosphere.light.split(' ')[0]}</span>
                </div>
              </div>

              {/* Vibe Tags */}
              <div className="flex flex-wrap gap-1">
                {venue.vibeTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md bg-slate-900 text-slate-400 text-[10px] font-medium border border-slate-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Review snippet */}
              {venue.reviewQuotes[0] && (
                <div className="text-[11px] text-slate-400 italic bg-slate-900/40 p-2 rounded-xl border border-slate-800/60">
                  «{venue.reviewQuotes[0].text}»
                </div>
              )}

              {/* Map link */}
              <div className="pt-1 flex justify-end">
                <a
                  href={venue.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Открыть на Яндекс Картах</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
