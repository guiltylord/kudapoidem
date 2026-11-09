import { Friend } from '../types';

export const AVAILABLE_FORMATS = [
  'Крафт',
  'Вино',
  'Спешелти кофе',
  'Необистро',
  'Паназия',
  'Стритфуд',
  'Настолки/Lounge',
  'Коктейли',
  'Пицца / Итальяно',
  'Настойки'
];

export const AVAILABLE_TABOOS = [
  'Кальяны / Дым',
  'Орущая музыка',
  'Теснота / столы впритык',
  'Дорого (чек > 1500₽)',
  'Только веган еда'
];

export const AVAILABLE_VIBES = [
  'Душевно поболтать',
  'Погудеть / выпить крафта',
  'Вкусно поесть без спешки',
  'Эстетично / при свечах',
  'Танцы / движ'
];

export const DEFAULT_FRIENDS: Friend[] = [
  {
    id: 'user-organizer',
    name: 'Ты (Организатор)',
    role: 'Организатор',
    avatar: '😎',
    isOrganizer: true,
    dna: {
      budgets: ['₽', '₽₽', '₽₽₽'],
      formats: ['Крафт', 'Необистро', 'Стритфуд'],
      taboos: ['Кальяны / Дым'],
      vibe: 'Душевно поболтать'
    }
  },
  {
    id: 'friend-sasha',
    name: 'Саша',
    role: 'Разработчик',
    avatar: '👨‍💻',
    isOrganizer: false,
    dna: {
      budgets: ['₽', '₽₽'],
      formats: ['Крафт', 'Стритфуд', 'Пицца / Итальяно'],
      taboos: ['Кальяны / Дым', 'Орущая музыка'],
      vibe: 'Погудеть / выпить крафта'
    }
  },
  {
    id: 'friend-anya',
    name: 'Аня',
    role: 'UX-дизайнер',
    avatar: '🎨',
    isOrganizer: false,
    dna: {
      budgets: ['₽₽', '₽₽₽'],
      formats: ['Вино', 'Спешелти кофе', 'Необистро'],
      taboos: ['Орущая музыка', 'Теснота / столы впритык'],
      vibe: 'Эстетично / при свечах'
    }
  }
];

export const PRESET_ADDITIONAL_FRIENDS: Friend[] = [
  {
    id: 'friend-max',
    name: 'Макс',
    role: 'Продакт-менеджер',
    avatar: '🚀',
    isOrganizer: false,
    dna: {
      budgets: ['₽₽'],
      formats: ['Паназия', 'Настолки/Lounge', 'Крафт'],
      taboos: ['Кальяны / Дым', 'Теснота / столы впритык'],
      vibe: 'Вкусно поесть без спешки'
    }
  },
  {
    id: 'friend-danya',
    name: 'Даня',
    role: 'Стартапер',
    avatar: '⚡',
    isOrganizer: false,
    dna: {
      budgets: ['₽', '₽₽'],
      formats: ['Крафт', 'Настойки', 'Стритфуд'],
      taboos: ['Дорого (чек > 1500₽)'],
      vibe: 'Погудеть / выпить крафта'
    }
  },
  {
    id: 'friend-lera',
    name: 'Лера',
    role: 'Маркетолог',
    avatar: '✨',
    isOrganizer: false,
    dna: {
      budgets: ['₽₽', '₽₽₽'],
      formats: ['Вино', 'Коктейли', 'Необистро'],
      taboos: ['Кальяны / Дым'],
      vibe: 'Эстетично / при свечах'
    }
  }
];
