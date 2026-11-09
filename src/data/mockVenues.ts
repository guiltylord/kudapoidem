import { Venue } from '../types';

export const MOCK_VENUES: Venue[] = [
  // --- МОСКВА ---
  {
    id: 'msk-krivokolenny-9',
    name: 'Кривоколенный 9',
    city: 'msk',
    district: 'Чистые пруды / Покровка',
    metro: 'Чистые пруды',
    address: 'Кривоколенный пер., 9, стр. 3',
    category: 'Необистро & Винный бар',
    cuisine: 'Европейская / Авторская',
    averageCheck: 1800,
    checkTier: '₽₽₽',
    rating: 4.8,
    reviewsCount: 1420,
    imageUrl: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
    hasHookah: false,
    hasVegetarian: true,
    atmosphere: {
      noiseLevel: 'Умеренно (комфортный разговор)',
      light: 'Теплый рассеянный',
      tableSpacing: 'Просторно (далеко)',
      music: 'Lo-Fi Beats & Ambient Jazz'
    },
    vibeTags: ['Необистро', 'Натуральное вино', 'Без кальянов', 'Эстетично', 'Просторные столы'],
    crowdType: 'Дизайнеры, архитекторы, IT',
    reviewQuotes: [
      {
        author: 'Алексей М. (Яндекс Карты)',
        text: 'Идеальный компромисс для компании: свет теплый, музыка не долбит по ушам, можно спокойно общаться 3 часа.',
        vibeBadge: 'Атмосфера 10/10'
      },
      {
        author: 'Полина В. (2GIS)',
        text: 'Никаких кальянов и дыма. Очень классные закуски на компанию и отличный петнат.',
        vibeBadge: 'Чистый воздух'
      }
    ],
    mapsUrl: 'https://yandex.ru/maps/?text=Кривоколенный+9+Москва',
    phone: '+7 (495) 120-45-89'
  },
  {
    id: 'msk-underdog',
    name: 'Underdog Bar',
    city: 'msk',
    district: 'Китай-город',
    metro: 'Китай-город',
    address: 'ул. Маросейка, 6/8, стр. 1',
    category: 'Крафтовый бар & Стритфуд',
    cuisine: 'Берлинский стритфуд / Бургеры',
    averageCheck: 950,
    checkTier: '₽₽',
    rating: 4.9,
    reviewsCount: 3100,
    imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
    hasHookah: false,
    hasVegetarian: true,
    atmosphere: {
      noiseLevel: 'Шумно / Движ',
      light: 'Неон / Клубный',
      tableSpacing: 'Плотная посадка',
      music: 'Indie Punk & 90s Hip-Hop'
    },
    vibeTags: ['Крафт', 'Берлинский вайб', 'Стритфуд', 'Движ', 'Доступные цены'],
    crowdType: 'Скейтеры, музыканты, IT-бунтари',
    reviewQuotes: [
      {
        author: 'Кирилл С.',
        text: 'Лучший крафт и сидры в центре. Всегда шумно и весело, легендарный дворик!',
        vibeBadge: 'Крафт & Энергия'
      },
      {
        author: 'Мария Д.',
        text: 'Для тихого свидания не подойдет, но в пятницу с друзьями оторваться — номер один в Москве.',
        vibeBadge: 'Пятничный отрыв'
      }
    ],
    mapsUrl: 'https://yandex.ru/maps/?text=Underdog+Маросейка+Москва',
    phone: '+7 (926) 333-12-84'
  },
  {
    id: 'msk-blanc',
    name: 'Blanc Cafe & Garden',
    city: 'msk',
    district: 'Хохловка',
    metro: 'Китай-город',
    address: 'Хохловский пер., 7-9, стр. 2',
    category: 'Ресторан-оранжерея & Lounge',
    cuisine: 'Европейская / Comfort food',
    averageCheck: 2200,
    checkTier: '₽₽₽',
    rating: 4.7,
    reviewsCount: 2250,
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    hasHookah: false,
    hasVegetarian: true,
    atmosphere: {
      noiseLevel: 'Умеренно (комфортный разговор)',
      light: 'Теплый рассеянный',
      tableSpacing: 'Уютно',
      music: 'Downtempo & Organic House'
    },
    vibeTags: ['Оранжерея', 'Зелень', 'Вино', 'Романтично', 'Без кальянов'],
    crowdType: 'Креативный класс, медиа, фотографы',
    reviewQuotes: [
      {
        author: 'Екатерина К.',
        text: 'Утопает в зелени, как будто в Бали посреди Москвы. Разговоры текут рекой, очень красивый свет.',
        vibeBadge: 'Эстетика'
      }
    ],
    mapsUrl: 'https://yandex.ru/maps/?text=Blanc+Хохловский+Москва',
    phone: '+7 (977) 829-32-00'
  },
  {
    id: 'msk-rovesnik',
    name: 'Бар «Ровесник»',
    city: 'msk',
    district: 'Тверской',
    metro: 'Пушкинская',
    address: 'Малый Гнездниковский пер., 9, стр. 2',
    category: '3-этажный молодежный бар',
    cuisine: 'Сэндвичи, настойки, пиво',
    averageCheck: 800,
    checkTier: '₽',
    rating: 4.6,
    reviewsCount: 3800,
    imageUrl: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80',
    hasHookah: false,
    hasVegetarian: true,
    atmosphere: {
      noiseLevel: 'Шумно / Движ',
      light: 'Неон / Клубный',
      tableSpacing: 'Плотная посадка',
      music: 'Pop Indie & Retro Wave'
    },
    vibeTags: ['Настолки на 3 этаже', 'Крафт', 'Бюджетно', 'Танцы', 'Большая компания'],
    crowdType: 'Студенты ВШЭ, джуны, тусовщики',
    reviewQuotes: [
      {
        author: 'Денис Т.',
        text: 'На первом этаже танцы, на третьем можно сесть за настолки. Цены — подарок судьбы в центре.',
        vibeBadge: 'Настолки & Крафт'
      }
    ],
    mapsUrl: 'https://yandex.ru/maps/?text=Ровесник+бар+Москва',
    phone: '+7 (495) 432-11-22'
  },
  {
    id: 'msk-shortlist',
    name: 'Shortlist Books & Spirits',
    city: 'msk',
    district: 'Петровка',
    metro: 'Трубная / Чеховская',
    address: 'ул. Петровка, 26, стр. 3',
    category: 'Коктейльный бар & Книжный салон',
    cuisine: 'Европейские закуски, авторские коктейли',
    averageCheck: 1900,
    checkTier: '₽₽₽',
    rating: 4.9,
    reviewsCount: 980,
    imageUrl: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80',
    hasHookah: false,
    hasVegetarian: true,
    atmosphere: {
      noiseLevel: 'Тихо (слышно шепот)',
      light: 'Приглушенный / Свечи',
      tableSpacing: 'Просторно (далеко)',
      music: 'Vinyl Jazz & Soul'
    },
    vibeTags: ['Книги', 'Спикизи', 'Тихие беседы', 'Коктейли', 'Свечи'],
    crowdType: 'Писатели, журналисты, ценители миксологии',
    reviewQuotes: [
      {
        author: 'Ольга Р.',
        text: 'Никакой орущей музыки. Сидишь в винтажном кресле с книгой и коктейлем, потрясающая акустика.',
        vibeBadge: 'Тишина и джаз'
      }
    ],
    mapsUrl: 'https://yandex.ru/maps/?text=Shortlist+bar+Петровка+Москва',
    phone: '+7 (495) 699-23-45'
  },
  {
    id: 'msk-jpan',
    name: 'J’PAN Japanese Modern Bistro',
    city: 'msk',
    district: 'Китай-город',
    metro: 'Китай-город',
    address: 'ул. Забелина, 1',
    category: 'Японское бистро & Матча-бар',
    cuisine: 'Японская / Рамен / Донбури',
    averageCheck: 1200,
    checkTier: '₽₽',
    rating: 4.8,
    reviewsCount: 2600,
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    hasHookah: false,
    hasVegetarian: true,
    atmosphere: {
      noiseLevel: 'Умеренно (комфортный разговор)',
      light: 'Теплый рассеянный',
      tableSpacing: 'Уютно',
      music: 'Tokyo J-Pop & Lofi Chill'
    },
    vibeTags: ['Паназия', 'Рамен', 'Без алкогольного угара', 'Уютно', 'Вкусно поесть'],
    crowdType: 'Любители азиатской культуры, фуди',
    reviewQuotes: [
      {
        author: 'Влад Н.',
        text: 'Очень теплый свет, вкуснейший рамен и десерты. Нет запаха сигарет или кальянов, всё чисто и свежо.',
        vibeBadge: 'Комфортная еда'
      }
    ],
    mapsUrl: 'https://yandex.ru/maps/?text=JPAN+Забелина+Москва',
    phone: '+7 (915) 130-13-68'
  },
  {
    id: 'msk-veladora',
    name: 'Veladora Cantina',
    city: 'msk',
    district: 'Покровка',
    metro: 'Китай-город',
    address: 'ул. Покровка, 2/1, стр. 1',
    category: 'Мексиканская кантина & Мескалерия',
    cuisine: 'Мексиканская / Такос',
    averageCheck: 1400,
    checkTier: '₽₽',
    rating: 4.8,
    reviewsCount: 1850,
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    hasHookah: false,
    hasVegetarian: true,
    atmosphere: {
      noiseLevel: 'Шумно / Движ',
      light: 'Приглушенный / Свечи',
      tableSpacing: 'Уютно',
      music: 'Cumbia, Latin Funk & Electronica'
    },
    vibeTags: ['Мексика', 'Тако', 'Мескаль', 'Движ', 'Тайный вход'],
    crowdType: 'Креативная молодежь, гурманы',
    reviewQuotes: [
      {
        author: 'Игорь К.',
        text: 'Аутентичный мексиканский подвал без лишнего пафоса. Тако с говядиной — взрыв вкуса.',
        vibeBadge: 'Движовая кантина'
      }
    ],
    mapsUrl: 'https://yandex.ru/maps/?text=Veladora+Москва',
    phone: '+7 (495) 790-21-90'
  },
  {
    id: 'msk-lounge-hookah',
    name: 'Nebula Lounge Bar',
    city: 'msk',
    district: 'Арбат',
    metro: 'Смоленская',
    address: 'Новый Арбат, 21',
    category: 'Кальянный лаундж & PS5',
    cuisine: 'Смешанная / Бургеры / Роллы',
    averageCheck: 2100,
    checkTier: '₽₽₽',
    rating: 4.3,
    reviewsCount: 890,
    imageUrl: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=800&q=80',
    hasHookah: true, // HAS HOOKAH! Will be blocked by anti-hookah taboos!
    hasVegetarian: false,
    atmosphere: {
      noiseLevel: 'Умеренно (комфортный разговор)',
      light: 'Неон / Клубный',
      tableSpacing: 'Уютно',
      music: 'Deep Lounge & Trap'
    },
    vibeTags: ['Кальяны', 'Приставки PS5', 'Неон', 'Диваны'],
    crowdType: 'Кальянные ценители, геймеры',
    reviewQuotes: [
      {
        author: 'Тимур В.',
        text: 'Густой дым, большой выбор табаков, диваны мягкие, играли в FIFA.',
        vibeBadge: 'Кальянный дым'
      }
    ],
    mapsUrl: 'https://yandex.ru/maps/?text=Кальянная+Новый+Арбат',
    phone: '+7 (495) 555-88-22'
  },

  // --- САНКТ-ПЕТЕРБУРГ ---
  {
    id: 'spb-afbrew',
    name: 'AF Brew Taproom',
    city: 'spb',
    district: 'Адмиралтейский / Коломна',
    metro: 'Балтийская',
    address: 'Курляндская ул., 48 (Завод Степана Разина)',
    category: 'Крафтовый тапрум & Пицца из печи',
    cuisine: 'Индийская & Неаполитанская пицца',
    averageCheck: 1100,
    checkTier: '₽₽',
    rating: 4.9,
    reviewsCount: 2900,
    imageUrl: 'https://images.unsplash.com/photo-1538488881522-4321453a6988?auto=format&fit=crop&w=800&q=80',
    hasHookah: false,
    hasVegetarian: true,
    atmosphere: {
      noiseLevel: 'Умеренно (комфортный разговор)',
      light: 'Теплый рассеянный',
      tableSpacing: 'Просторно (далеко)',
      music: 'Post-Punk, Indie Rock'
    },
    vibeTags: ['Культовый крафт', 'Промышленный лофт', 'Пицца', 'Без кальянов', 'Просторные столы'],
    crowdType: 'Питерские айтишники, пивовары, рокеры',
    reviewQuotes: [
      {
        author: 'Михаил Ч.',
        text: 'Огромное пространство на бывшем заводе! Не сидишь локоть к локтю с соседями, 30+ свежайших кранов.',
        vibeBadge: 'Простор & Крафт'
      }
    ],
    mapsUrl: 'https://yandex.ru/maps/?text=AF+Brew+Taproom+СПб',
    phone: '+7 (812) 648-28-88'
  },
  {
    id: 'spb-co-op-garage',
    name: 'Co-op Garage',
    city: 'spb',
    district: 'Сенная / Коломна',
    metro: 'Спасская / Садовая',
    address: 'Гороховая ул., 47 (во дворе)',
    category: 'Гаражный бар & Пицца & Пул',
    cuisine: 'Пицца на тонком тесте / Сидр',
    averageCheck: 950,
    checkTier: '₽₽',
    rating: 4.8,
    reviewsCount: 3400,
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    hasHookah: false,
    hasVegetarian: true,
    atmosphere: {
      noiseLevel: 'Шумно / Движ',
      light: 'Теплый рассеянный',
      tableSpacing: 'Уютно',
      music: 'Garage Rock & Skate Punk'
    },
    vibeTags: ['Бильярд', 'Секретный двор', 'Пицца с лисичками', 'Сидр', 'Питерский вайб'],
    crowdType: 'Художники, райдеры, креативщики',
    reviewQuotes: [
      {
        author: 'Артем З.',
        text: 'Пул-стол прямо посреди бара, классный двор, пицца с грушей и горгонзолой одна из лучших в городе.',
        vibeBadge: 'Бильярд & Двор'
      }
    ],
    mapsUrl: 'https://yandex.ru/maps/?text=Co-op+Garage+Гороховая+СПб',
    phone: '+7 (911) 923-45-67'
  },
  {
    id: 'spb-navina',
    name: 'На Вина! Бар & Магазин',
    city: 'spb',
    district: 'Петроградка',
    metro: 'Петроградская',
    address: 'Большой пр. П.С., 44',
    category: 'Натуральный винный бар',
    cuisine: 'Европейские сыры, тапас, паштеты',
    averageCheck: 1700,
    checkTier: '₽₽₽',
    rating: 4.8,
    reviewsCount: 1600,
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    hasHookah: false,
    hasVegetarian: true,
    atmosphere: {
      noiseLevel: 'Умеренно (комфортный разговор)',
      light: 'Приглушенный / Свечи',
      tableSpacing: 'Уютно',
      music: 'French Chanson & Vinyl Jazz'
    },
    vibeTags: ['Биодинамика', 'Натуральное вино', 'Винил', 'Интеллигентно', 'Без дыма'],
    crowdType: 'Петербуржцы-эстеты, архитекторы, сомелье',
    reviewQuotes: [
      {
        author: 'Светлана М.',
        text: 'Винил играет негромко, ребята за стойкой моментально понимают, что тебе налить под настроение.',
        vibeBadge: 'Виниловый уют'
      }
    ],
    mapsUrl: 'https://yandex.ru/maps/?text=На+Вина+Большой+проспект+СПб',
    phone: '+7 (812) 425-66-88'
  },
  {
    id: 'spb-civil',
    name: 'Civil Coffee Bar & Kitchen',
    city: 'spb',
    district: 'Центральный',
    metro: 'Площадь Восстания',
    address: '8-я Советская ул., 4',
    category: 'Спешелти кофейня & Необистро',
    cuisine: 'Бранчи весь день / Паста / Десерты',
    averageCheck: 1100,
    checkTier: '₽₽',
    rating: 4.9,
    reviewsCount: 2100,
    imageUrl: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80',
    hasHookah: false,
    hasVegetarian: true,
    atmosphere: {
      noiseLevel: 'Тихо (слышно шепот)',
      light: 'Теплый рассеянный',
      tableSpacing: 'Просторно (далеко)',
      music: 'Acoustic & Soft Indie'
    },
    vibeTags: ['Лепнина', 'Высокие потолки', 'Спешелти', 'Бранчи', 'Тихий разговор'],
    crowdType: 'Фрилансеры, книголюбы, любители кофе',
    reviewQuotes: [
      {
        author: 'Наталья Л.',
        text: 'Старинный петербургский зал с камином. Идеально посидеть компанией и услышать друг друга.',
        vibeBadge: 'Красота и тишина'
      }
    ],
    mapsUrl: 'https://yandex.ru/maps/?text=Civil+8-я+Советская+СПб',
    phone: '+7 (921) 942-01-20'
  },
  {
    id: 'spb-camorra',
    name: 'Camorra Pizza e Birra',
    city: 'spb',
    district: 'Центральный',
    metro: 'Маяковская / Чернышевская',
    address: 'Ковенский пер., 14 (во дворе)',
    category: 'Пиццерия & Крафтовый бар',
    cuisine: 'Римская пицца / Крафтовое пиво',
    averageCheck: 900,
    checkTier: '₽₽',
    rating: 4.8,
    reviewsCount: 3600,
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    hasHookah: false,
    hasVegetarian: true,
    atmosphere: {
      noiseLevel: 'Умеренно (комфортный разговор)',
      light: 'Теплый рассеянный',
      tableSpacing: 'Уютно',
      music: 'Italian Retro & Indie'
    },
    vibeTags: ['Хрустящая пицца', 'Секретный дворик', 'Крафт', 'Без пафоса', 'Душевно'],
    crowdType: 'Местные жители Ковенского, фанаты AF Brew',
    reviewQuotes: [
      {
        author: 'Евгений П.',
        text: 'Пицца с козьим сыром и тыквой — шедевр. Быстро, вкусно, без лишней суеты.',
        vibeBadge: 'Честная еда'
      }
    ],
    mapsUrl: 'https://yandex.ru/maps/?text=Camorra+Ковенский+СПб',
    phone: '+7 (812) 925-14-14'
  },
  {
    id: 'spb-laboratorio',
    name: 'Laboratorio Distilita',
    city: 'spb',
    district: 'Центральный / Литейный',
    metro: 'Маяковская',
    address: 'ул. Жуковского, 26',
    category: 'Бар авторских настоек & Тапас',
    cuisine: 'Русские авторские закуски / Сет настоек',
    averageCheck: 850,
    checkTier: '₽',
    rating: 4.7,
    reviewsCount: 1450,
    imageUrl: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=800&q=80',
    hasHookah: false,
    hasVegetarian: true,
    atmosphere: {
      noiseLevel: 'Шумно / Движ',
      light: 'Приглушенный / Свечи',
      tableSpacing: 'Уютно',
      music: 'Acoustic Rock & Russian Indie'
    },
    vibeTags: ['Настойки', 'Душевные посиделки', 'Бюджетно', 'Вечер с друзьями', 'Тапас'],
    crowdType: 'Старые друзья, тусовщики Жуковского',
    reviewQuotes: [
      {
        author: 'Юрий Б.',
        text: 'Настойка бородинская с салом и клюква с перцем. Посидеть с корешами после тяжелой недели — кайф.',
        vibeBadge: 'Душевно'
      }
    ],
    mapsUrl: 'https://yandex.ru/maps/?text=Laboratorio+Distilita+СПб',
    phone: '+7 (965) 002-26-26'
  }
];
