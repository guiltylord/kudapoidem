import { describe, it, expect } from 'vitest';
import { runVibeMatch } from './matcher';
import { MOCK_VENUES } from '../data/mockVenues';
import { DEFAULT_FRIENDS } from '../data/presetFriends';
import { Friend } from '../types';

describe('VibeMatch Algorithm Tests', () => {
  it('should rank venues for Moscow with default friends', () => {
    const results = runVibeMatch(MOCK_VENUES, DEFAULT_FRIENDS, 'msk');
    expect(results.length).toBeGreaterThan(0);
    
    // Top result should have high score (> 80)
    expect(results[0].totalScore).toBeGreaterThanOrEqual(80);
    expect(results[0].venue.city).toBe('msk');
    expect(results[0].participantFits.length).toBe(DEFAULT_FRIENDS.length);
  });

  it('should always return results in descending order of score', () => {
    const results = runVibeMatch(MOCK_VENUES, DEFAULT_FRIENDS, 'msk');
    for (let i = 1; i < results.length; i++) {
      expect(results[i - 1].totalScore).toBeGreaterThanOrEqual(results[i].totalScore);
    }
  });

  it('should disqualify or heavily penalize hookah venues when a friend has anti-hookah taboo', () => {
    // Both Organizer and Sasha have 'Кальяны / Дым' taboo
    const results = runVibeMatch(MOCK_VENUES, DEFAULT_FRIENDS, 'msk');
    const hookahVenueResult = results.find(r => r.venue.hasHookah);
    
    expect(hookahVenueResult).toBeDefined();
    expect(hookahVenueResult!.tabooSafe).toBe(false);
    expect(hookahVenueResult!.totalScore).toBeLessThanOrEqual(25);
    expect(hookahVenueResult!.disqualificationReason?.toLowerCase()).toContain('кальян');
  });

  it('should penalize noisy venues when a user has "Орущая музыка" taboo', () => {
    const quietFriend: Friend = {
      id: 'quiet-user',
      name: 'Тихий Гость',
      role: 'Гость',
      avatar: '🤫',
      isOrganizer: false,
      dna: {
        budgets: ['₽₽'],
        formats: ['Вино'],
        taboos: ['Орущая музыка'],
        vibe: 'Душевно поболтать'
      }
    };

    const results = runVibeMatch(MOCK_VENUES, [quietFriend], 'msk');
    const loudVenueResult = results.find(r => r.venue.atmosphere.noiseLevel === 'Шумно / Движ');
    const quietVenueResult = results.find(r => r.venue.atmosphere.noiseLevel === 'Тихо (слышно шепот)');

    expect(loudVenueResult).toBeDefined();
    expect(quietVenueResult).toBeDefined();
    expect(quietVenueResult!.totalScore).toBeGreaterThan(loudVenueResult!.totalScore);
  });

  it('should penalize expensive venues when budget taboo (> 1500) is set', () => {
    const budgetFriend: Friend = {
      id: 'budget-user',
      name: 'Экономный',
      role: 'Студент',
      avatar: '🪙',
      isOrganizer: false,
      dna: {
        budgets: ['₽'],
        formats: ['Крафт', 'Стритфуд'],
        taboos: ['Дорого (чек > 1500₽)'],
        vibe: 'Погудеть / выпить крафта'
      }
    };

    const results = runVibeMatch(MOCK_VENUES, [budgetFriend], 'msk');
    const cheapVenue = results.find(r => r.venue.averageCheck <= 1000);
    const expensiveVenue = results.find(r => r.venue.averageCheck > 1500);

    expect(cheapVenue).toBeDefined();
    expect(expensiveVenue).toBeDefined();
    expect(cheapVenue!.totalScore).toBeGreaterThan(expensiveVenue!.totalScore);
  });

  it('should rank SPB venues correctly when city is spb', () => {
    const results = runVibeMatch(MOCK_VENUES, DEFAULT_FRIENDS, 'spb');
    expect(results.length).toBeGreaterThan(0);
    for (const r of results) {
      expect(r.venue.city).toBe('spb');
    }
  });

  it('should boost relevant venues when express prompt is provided', () => {
    const baselineResults = runVibeMatch(MOCK_VENUES, DEFAULT_FRIENDS, 'msk', '');
    const promptResults = runVibeMatch(MOCK_VENUES, DEFAULT_FRIENDS, 'msk', 'хотим крафт и бургеры');

    const underdogBaseline = baselineResults.find(r => r.venue.id === 'msk-underdog');
    const underdogWithPrompt = promptResults.find(r => r.venue.id === 'msk-underdog');

    expect(underdogBaseline).toBeDefined();
    expect(underdogWithPrompt).toBeDefined();
    expect(underdogWithPrompt!.totalScore).toBeGreaterThanOrEqual(underdogBaseline!.totalScore);
  });

  it('handles single organizer edge case gracefully', () => {
    const soloOrganizer: Friend[] = [DEFAULT_FRIENDS[0]];
    const results = runVibeMatch(MOCK_VENUES, soloOrganizer, 'msk');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].participantFits.length).toBe(1);
    expect(results[0].totalScore).toBeGreaterThan(0);
  });

  it('handles empty friends array edge case without crashing', () => {
    const results = runVibeMatch(MOCK_VENUES, [], 'msk');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].participantFits.length).toBe(0);
  });
});
