import { Friend, MatchScoreResult, ParticipantFit, Venue } from '../types';

export function runVibeMatch(
  venues: Venue[],
  friends: Friend[],
  city: 'msk' | 'spb',
  expressPrompt: string = ''
): MatchScoreResult[] {
  const cityVenues = venues.filter((v) => v.city === city);
  const promptLower = expressPrompt.toLowerCase().trim();

  const results: MatchScoreResult[] = cityVenues.map((venue) => {
    const participantFits: ParticipantFit[] = [];
    let isHardDisqualified = false;
    let disqualificationReason = '';

    // Evaluate fit for each friend
    for (const friend of friends) {
      let friendScore = 60; // base score
      const reasons: string[] = [];
      let friendTabooViolated = false;

      // 1. Check Taboos
      for (const taboo of friend.dna.taboos) {
        if (taboo.includes('Кальяны') && venue.hasHookah) {
          friendScore -= 65;
          friendTabooViolated = true;
          isHardDisqualified = true;
          disqualificationReason = `Заведение содержит кальяны, что нарушает табу: ${friend.name}`;
        }
        if (taboo.includes('Орущая музыка') && venue.atmosphere.noiseLevel === 'Шумно / Движ') {
          friendScore -= 30;
          friendTabooViolated = true;
          reasons.push('Шумновато для беседы');
        }
        if (taboo.includes('Теснота') && venue.atmosphere.tableSpacing === 'Плотная посадка') {
          friendScore -= 20;
          friendTabooViolated = true;
          reasons.push('Тесноватая посадка');
        }
        if (taboo.includes('Дорого') && venue.averageCheck > 1500) {
          friendScore -= 25;
          friendTabooViolated = true;
          reasons.push(`Чек выше 1500₽ (~${venue.averageCheck}₽)`);
        }
        if (taboo.includes('веган') && !venue.hasVegetarian) {
          friendScore -= 40;
          friendTabooViolated = true;
          reasons.push('Мало веганских опций');
        }
      }

      // 2. Budget compatibility
      if (friend.dna.budgets.includes(venue.checkTier)) {
        friendScore += 15;
      } else {
        // Tolerable if off by one tier
        friendScore -= 5;
      }

      // 3. Format compatibility
      let formatMatched = false;
      const venueInfo = `${venue.name} ${venue.category} ${venue.cuisine} ${venue.vibeTags.join(' ')}`.toLowerCase();
      
      for (const fmt of friend.dna.formats) {
        const fmtLower = fmt.toLowerCase();
        if (venueInfo.includes(fmtLower) || 
           (fmtLower.includes('крафт') && (venueInfo.includes('крафт') || venueInfo.includes('пив') || venueInfo.includes('бар'))) ||
           (fmtLower.includes('вино') && (venueInfo.includes('вин') || venueInfo.includes('бистро')))) {
          friendScore += 16;
          formatMatched = true;
          reasons.push(`Любит ${fmt}`);
          break;
        }
      }

      // 4. Vibe compatibility
      const vibeLower = friend.dna.vibe.toLowerCase();
      if (vibeLower.includes('поболтать') && venue.atmosphere.noiseLevel !== 'Шумно / Движ') {
        friendScore += 15;
        reasons.push('Уютный уровень звука для разговора');
      } else if (vibeLower.includes('крафт') && (venueInfo.includes('крафт') || venueInfo.includes('бар'))) {
        friendScore += 15;
        reasons.push('Классный выбор напитков');
      } else if (vibeLower.includes('эстетич') && (venue.vibeTags.includes('Эстетично') || venue.atmosphere.light.includes('Свечи') || venue.vibeTags.includes('Оранжерея') || venue.vibeTags.includes('Необистро'))) {
        friendScore += 15;
        reasons.push('Эстетичный интерьер и мягкий свет');
      } else if (vibeLower.includes('поесть') && venue.rating >= 4.7) {
        friendScore += 14;
        reasons.push('Отличная кухня (рейтинг 4.8+)');
      } else if (vibeLower.includes('движ') && venue.atmosphere.noiseLevel === 'Шумно / Движ') {
        friendScore += 15;
        reasons.push('Движовая тусовка');
      }

      // Taboo respect recognition
      if (!friendTabooViolated) {
        if (friend.dna.taboos.some(t => t.includes('Кальяны')) && !venue.hasHookah) {
          reasons.push('Без кальянов и дыма');
        }
      }

      // Rating bonus
      if (venue.rating >= 4.8) {
        friendScore += 5;
      }

      // Ensure score bounds
      const normalizedScore = Math.max(10, Math.min(99, friendScore));
      
      const combinedReason = reasons.length > 0 
        ? reasons.slice(0, 2).join(' • ') 
        : `Укладывается в средний чек ~${venue.averageCheck}₽`;

      participantFits.push({
        friendId: friend.id,
        friendName: friend.name,
        avatar: friend.avatar,
        score: normalizedScore,
        reason: combinedReason,
        taboosOk: !friendTabooViolated,
      });
    }

    // Express prompt boost
    let promptBoost = 0;
    const matchedPromptKeywords: string[] = [];
    if (promptLower) {
      const keywords = ['пиво', 'крафт', 'вино', 'пицца', 'кофе', 'тихо', 'поболтать', 'движ', 'настолки', 'настойки', 'веган', 'двор', 'романтик'];
      for (const kw of keywords) {
        if (promptLower.includes(kw)) {
          const venueBlob = `${venue.name} ${venue.category} ${venue.cuisine} ${venue.vibeTags.join(' ')} ${venue.atmosphere.music}`.toLowerCase();
          if (venueBlob.includes(kw)) {
            promptBoost += 8;
            matchedPromptKeywords.push(kw);
          }
        }
      }
    }

    // Calculate compromise score: 70% average + 30% min score
    const scores = participantFits.map((f) => f.score);
    const avgScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 80;
    const minScore = scores.length > 0 ? Math.min(...scores) : 80;
    
    // Hard penalty if any taboo was critically violated
    let totalScore = Math.round((avgScore * 0.7) + (minScore * 0.3) + promptBoost);
    if (isHardDisqualified) {
      totalScore = Math.min(25, totalScore - 50);
    }
    totalScore = Math.max(15, Math.min(99, totalScore));

    // Summary creation
    const topParticipantFits = participantFits.map(p => `${p.friendName} (${p.reason})`).join(', ');
    const compromiseSummary = `Компромисс найден: ${topParticipantFits}. Средний чек ~${venue.averageCheck}₽.`;

    const matchedTags = Array.from(new Set([
      ...venue.vibeTags.slice(0, 3),
      venue.atmosphere.noiseLevel.split(' ')[0],
      venue.atmosphere.tableSpacing.split(' ')[0]
    ]));

    return {
      venue,
      totalScore,
      participantFits,
      compromiseSummary,
      matchedTags,
      tabooSafe: !isHardDisqualified,
      disqualificationReason,
      votes: 0
    };
  });

  // Sort by highest match score
  results.sort((a, b) => b.totalScore - a.totalScore);

  return results;
}
