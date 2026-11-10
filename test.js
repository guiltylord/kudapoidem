const assert = require('node:assert/strict');
const { VENUES_MSK } = require('./venues.js');
const {
  getDefaultPrefs,
  computeMatches,
  buildTop3PollText,
  buildWinnerInviteText,
} = require('./app.js');

// 1. Все кальянные отсекаются при активном стоп-факторе noHookah
{
  const prefs = getDefaultPrefs();
  prefs.taboos.noHookah = true;
  const res = computeMatches(VENUES_MSK, prefs);
  assert.ok(res.filteredHookahCount >= 2, 'Должны быть отфильтрованы кальянные');
  assert.ok(
    res.items.every((item) => !item.venue.hasHookah),
    'В выдаче не должно быть мест с кальяном'
  );
}

// 2. Сценарий: Тихо поболтать + до 1000₽ + веган + без кальянов
{
  const prefs = getDefaultPrefs();
  prefs.vibe = 'quiet_talk';
  prefs.budgetMax = 1000;
  prefs.taboos.noHookah = true;
  prefs.taboos.requireVegan = true;

  const res = computeMatches(VENUES_MSK, prefs);
  const top3 = res.items.slice(0, 3);
  assert.equal(top3.length, 3, 'Должно быть 3 рекомендации');
  assert.ok(res.exactCount >= 3, 'Должно найтись минимум 3 точных совпадения');
  for (const item of top3) {
    assert.ok(item.venue.averageCheck <= 1000, `${item.venue.name} дороже 1000₽`);
    assert.ok(item.venue.hasVegan, `${item.venue.name} без веган-опций`);
    assert.ok(!item.venue.hasHookah, `${item.venue.name} с кальяном`);
  }
}

// 3. Сценарий: Громкая тусовка + скрытие первого места
{
  const prefs = getDefaultPrefs();
  prefs.vibe = 'party';
  prefs.budgetMax = 1800;

  const res1 = computeMatches(VENUES_MSK, prefs);
  const firstId = res1.items[0].venue.id;

  const res2 = computeMatches(VENUES_MSK, prefs, [firstId]);
  assert.notEqual(res2.items[0].venue.id, firstId, 'Скрытое место не должно возвращаться');
  assert.equal(res2.items[0].venue.id, res1.items[1].venue.id, 'На 1-е место встает 2-е');
}

// 4. Проверка генерации текста для чата
{
  const prefs = getDefaultPrefs();
  const res = computeMatches(VENUES_MSK, prefs);
  const poll = buildTop3PollText(res.items.slice(0, 3), prefs);
  assert.ok(poll.includes('1️⃣') && poll.includes('2️⃣') && poll.includes('3️⃣'));
  assert.ok(poll.includes('yandex.ru/maps'));

  const invite = buildWinnerInviteText(res.items[0], prefs);
  assert.ok(invite.includes(res.items[0].venue.name));
  assert.ok(invite.includes('yandex.ru/maps'));
}

console.log('✅ All 4 VibeMatch logic test suites passed!');
