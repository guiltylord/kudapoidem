import React from 'react';
import { Friend } from '../types';
import { Edit3, Trash2, ShieldAlert } from 'lucide-react';

interface FriendCardProps {
  friend: Friend;
  onEdit: (friend: Friend) => void;
  onRemove?: (friendId: string) => void;
}

export const FriendCard: React.FC<FriendCardProps> = ({ friend, onEdit, onRemove }) => {
  return (
    <div className="bg-[#162035]/90 border border-slate-800/90 hover:border-slate-700/80 rounded-2xl p-3.5 transition-all shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center text-xl shadow-inner">
            {friend.avatar}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white text-sm">{friend.name}</span>
              {friend.isOrganizer && (
                <span className="text-[10px] bg-cyan-500/15 text-cyan-300 px-1.5 py-0.5 rounded-md font-semibold border border-cyan-500/25">
                  Организатор
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400">{friend.role}</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(friend)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
            title="Редактировать предпочтения"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          {!friend.isOrganizer && onRemove && (
            <button
              onClick={() => onRemove(friend.id)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800 transition-colors"
              title="Удалить из банды"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Preferences Preview */}
      <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex flex-wrap items-center gap-1.5 text-[11px]">
        {/* Budgets */}
        <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 font-semibold border border-emerald-500/20">
          {friend.dna.budgets.join(', ')}
        </span>

        {/* Favorite Formats */}
        {friend.dna.formats.slice(0, 2).map((fmt) => (
          <span key={fmt} className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-medium">
            {fmt}
          </span>
        ))}
        {friend.dna.formats.length > 2 && (
          <span className="text-[10px] text-slate-400">+{friend.dna.formats.length - 2}</span>
        )}

        {/* Taboos */}
        {friend.dna.taboos.map((taboo) => (
          <span
            key={taboo}
            className="px-2 py-0.5 rounded-md bg-red-500/10 text-red-300 font-medium border border-red-500/20 flex items-center gap-1"
          >
            <ShieldAlert className="w-2.5 h-2.5" />
            {taboo}
          </span>
        ))}

        {/* Vibe */}
        <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 font-medium border border-indigo-500/20 ml-auto">
          {friend.dna.vibe}
        </span>
      </div>
    </div>
  );
};
