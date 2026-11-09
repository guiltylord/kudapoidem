export type BudgetTier = '₽' | '₽₽' | '₽₽₽' | '₽₽₽₽';

export interface FriendDNA {
  budgets: BudgetTier[]; // acceptable budget tiers
  formats: string[]; // e.g. "Крафт", "Вино", "Спешелти кофе", "Необистро", "Паназия", "Стритфуд", "Настолки/Lounge"
  taboos: string[]; // e.g. "Кальяны", "Орущая музыка", "Теснота / столы впритык", "Жирная еда", "Только веган"
  vibe: string; // e.g. "Душевно поболтать", "Погудеть / движ", "Вкусно поесть", "Эстетично / романтично"
}

export interface Friend {
  id: string;
  name: string;
  role: string; // e.g. "Организатор", "UX-дизайнер", "Разработчик"
  avatar: string; // emoji or image
  isOrganizer: boolean;
  dna: FriendDNA;
}

export interface VenueAtmosphere {
  noiseLevel: 'Тихо (слышно шепот)' | 'Умеренно (комфортный разговор)' | 'Шумно / Движ';
  light: 'Приглушенный / Свечи' | 'Теплый рассеянный' | 'Неон / Клубный';
  tableSpacing: 'Просторно (далеко)' | 'Уютно' | 'Плотная посадка';
  music: string; // e.g. "Lo-Fi Beats", "Инди-рок", "Джаз / Соул", "Электроника"
}

export interface Venue {
  id: string;
  name: string;
  city: 'msk' | 'spb';
  district: string;
  metro: string;
  address: string;
  category: string;
  cuisine: string;
  averageCheck: number;
  checkTier: BudgetTier;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  hasHookah: boolean;
  hasVegetarian: boolean;
  atmosphere: VenueAtmosphere;
  vibeTags: string[];
  crowdType: string; // e.g. "Креативщики и IT", "Эстеты винила", "Молодежь / студенты"
  reviewQuotes: {
    author: string;
    text: string;
    vibeBadge: string;
  }[];
  mapsUrl: string;
  phone: string;
}

export interface ParticipantFit {
  friendId: string;
  friendName: string;
  avatar: string;
  reason: string;
  score: number; // 0 - 100
  taboosOk: boolean;
}

export interface MatchScoreResult {
  venue: Venue;
  totalScore: number; // 0 - 100
  participantFits: ParticipantFit[];
  compromiseSummary: string;
  matchedTags: string[];
  tabooSafe: boolean;
  disqualificationReason?: string;
  votes: number;
}
