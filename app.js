/* global VENUES_MSK */

const STORAGE_KEY = 'kudapoidem_prefs_v2';

const DAYS = ['Сегодня', 'Завтра', 'В пятницу', 'В субботу', 'Выходные'];

const VIBES = [
  { id: 'quiet_talk', emoji: '🤫', name: 'Поболтать в тишине', desc: 'Слышно друг друга' },
  { id: 'craft_pizza', emoji: '🍺', name: 'Крафт и бар', desc: 'Пиво, сидр, пицца' },
  { id: 'wine_aesthetic', emoji: '🍷', name: 'Вино и красиво', desc: 'Свет, свечи, уют' },
  { id: 'tasty_food', emoji: '🍜', name: 'Вкусно поесть', desc: 'Упор на кухню' },
  { id: 'party', emoji: '🎉', name: 'Громкая тусовка', desc: 'Движ, музыка, танцы' },
  { id: 'boardgames', emoji: '🎲', name: 'Настолки и чилл', desc: 'Посидеть надолго' },
];

const BUDGETS = [
  { id: 1000, label: 'До 1 000 ₽', sub: 'Бюджетно' },
  { id: 1800, label: 'До 1 800 ₽', sub: 'Комфортно' },
  { id: 3000, label: 'До 3 000 ₽', sub: 'Премиум' },
  { id: 0, label: 'Любой чек', sub: 'Не важно' },
];

const TABOOS = [
  { id: 'noHookah', label: '🚭 Без кальянов', positive: false },
  { id: 'noLoudMusic', label: '🔇 Без орущей музыки', positive: false },
  { id: 'requireVegan', label: '🌱 Нужны веган-блюда', positive: true },
  { id: 'spaciousOnly', label: '🪑 Просторно (не впритык)', positive: true },
  { id: 'centerOnly', label: '🚇 Только центр', positive: true },
];

const QUICK_KEYWORDS = ['Китай-город', 'Чистые пруды', 'Рамен', 'Двор', 'Сидр'];

function getDefaultPrefs() {
  return {
    day: 'Завтра',
    vibe: 'quiet_talk',
    budgetMax: 1800,
    taboos: {
      noHookah: false,
      noLoudMusic: false,
      requireVegan: false,
      spaciousOnly: false,
      centerOnly: false,
    },
    customQuery: '',
  };
}

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getYandexMapsUrl(venue) {
  return `https://yandex.ru/maps/?text=${encodeURIComponent(`${venue.name} ${venue.address} Москва`)}`;
}

function get2GisUrl(venue) {
  return `https://2gis.ru/moscow/search/${encodeURIComponent(`${venue.name} ${venue.address}`)}`;
}

function getTgShareUrl(text) {
  return `https://t.me/share/url?url=${encodeURIComponent('https://guiltylord.github.io/kudapoidem/')}&text=${encodeURIComponent(text)}`;
}

/**
 * Алгоритм подбора и объяснения компромиссов.
 * Возвращает отсортированный список мест + статистику отсева.
 */
function computeMatches(venues, prefs, hiddenIds = []) {
  const hiddenSet = new Set(hiddenIds);
  const query = (prefs.customQuery || '').trim().toLowerCase();
  const queryWords = query ? query.split(/[\s,]+/).filter((w) => w.length >= 2) : [];

  let filteredHookahCount = 0;
  let filteredBudgetCount = 0;

  const candidates = [];

  for (const venue of venues) {
    if (hiddenSet.has(venue.id)) continue;

    // Жесткое табу: кальяны
    if (prefs.taboos.noHookah && venue.hasHookah) {
      filteredHookahCount += 1;
      continue;
    }

    if (prefs.budgetMax > 0 && venue.averageCheck > prefs.budgetMax) {
      filteredBudgetCount += 1;
    }

    let score = 50;
    const reasons = [];
    let isExactMatch = true;

    // 1. Вайб
    const vibeObj = VIBES.find((v) => v.id === prefs.vibe);
    if (prefs.vibe && venue.vibes.includes(prefs.vibe)) {
      score += 32;
      if (vibeObj) {
        reasons.push({ type: 'ok', text: `Подходит под вайб «${vibeObj.name}»` });
      }
    } else {
      score -= 12;
      isExactMatch = false;
    }

    // 2. Бюджет
    if (prefs.budgetMax > 0) {
      if (venue.averageCheck <= prefs.budgetMax) {
        score += 22;
        reasons.push({
          type: 'ok',
          text: `Укладывается в чек до ${prefs.budgetMax} ₽ (~${venue.averageCheck} ₽)`,
        });
      } else if (venue.averageCheck <= prefs.budgetMax + 300) {
        score -= 16;
        isExactMatch = false;
        reasons.push({
          type: 'warn',
          text: `Чек ~${venue.averageCheck} ₽ (чуть выше лимита ${prefs.budgetMax} ₽)`,
        });
      } else {
        score -= 48;
        isExactMatch = false;
        reasons.push({
          type: 'warn',
          text: `Дороговато: ~${venue.averageCheck} ₽ при лимите ${prefs.budgetMax} ₽`,
        });
      }
    }

    // 3. Веган-опции
    if (prefs.taboos.requireVegan) {
      if (venue.hasVegan) {
        score += 18;
        reasons.push({ type: 'ok', text: 'Есть веганские блюда' });
      } else {
        score -= 45;
        isExactMatch = false;
        reasons.push({ type: 'warn', text: 'Мало веган-опций (мясное меню)' });
      }
    }

    // 4. Без орущей музыки
    if (prefs.taboos.noLoudMusic) {
      if (venue.noise === 'quiet') {
        score += 18;
        reasons.push({ type: 'ok', text: 'Тихо — можно спокойно общаться' });
      } else if (venue.noise === 'moderate') {
        score += 10;
        reasons.push({ type: 'ok', text: 'Умеренный звук — не орет' });
      } else {
        score -= 35;
        isExactMatch = false;
        reasons.push({ type: 'warn', text: 'Шумно / движовая музыка' });
      }
    } else if (prefs.vibe === 'quiet_talk' && venue.noise !== 'loud') {
      reasons.push({
        type: 'ok',
        text: venue.noise === 'quiet' ? 'Тихая атмосфера для разговора' : 'Комфортный уровень шума',
      });
    }

    // 5. Без кальянов — подтверждение в карточке
    if (prefs.taboos.noHookah && !venue.hasHookah) {
      reasons.push({ type: 'ok', text: 'Без кальянов и дыма' });
    }

    // 6. Просторно
    if (prefs.taboos.spaciousOnly) {
      if (venue.spacious) {
        score += 12;
        reasons.push({ type: 'ok', text: 'Просторно — столы не впритык' });
      } else {
        score -= 22;
        isExactMatch = false;
        reasons.push({ type: 'warn', text: 'Плотная посадка' });
      }
    }

    // 7. Центр
    if (prefs.taboos.centerOnly) {
      if (venue.center) {
        score += 10;
      } else {
        score -= 25;
        isExactMatch = false;
        reasons.push({ type: 'warn', text: 'За пределами центра' });
      }
    }

    // 8. Пожелание словами
    if (queryWords.length > 0) {
      const blob = `${venue.name} ${venue.category} ${venue.metro} ${venue.address} ${venue.tags.join(' ')} ${venue.quote}`.toLowerCase();
      let wordHits = 0;
      for (const word of queryWords) {
        if (blob.includes(word)) {
          wordHits += 1;
        }
      }
      if (wordHits > 0) {
        score += wordHits * 20;
        reasons.unshift({ type: 'ok', text: `Совпало по запросу «${prefs.customQuery.trim()}»` });
      } else {
        score -= 10;
      }
    }

    // Бонус за рейтинг
    if (venue.rating >= 4.8) score += 4;

    // Если список причин короткий, добавим базовый плюс места
    if (reasons.length === 0) {
      reasons.push({ type: 'ok', text: `Рейтинг ${venue.rating}, чек ~${venue.averageCheck} ₽` });
    }

    const matchPercent = Math.max(25, Math.min(99, Math.round(score)));

    candidates.push({
      venue,
      score: matchPercent,
      isExactMatch,
      reasons: reasons.slice(0, 4),
    });
  }

  candidates.sort((a, b) => {
    if (a.isExactMatch !== b.isExactMatch) return a.isExactMatch ? -1 : 1;
    return b.score - a.score;
  });

  const exactCount = candidates.filter((c) => c.isExactMatch).length;

  return {
    items: candidates,
    exactCount,
    filteredHookahCount,
    filteredBudgetCount,
  };
}

function buildTop3PollText(topItems, prefs) {
  const vibeObj = VIBES.find((v) => v.id === prefs.vibe);
  const metaParts = [prefs.day];
  if (vibeObj) metaParts.push(vibeObj.name.toLowerCase());
  if (prefs.budgetMax > 0) metaParts.push(`до ${prefs.budgetMax} ₽`);
  if (prefs.taboos.noHookah) metaParts.push('без кальянов');
  if (prefs.taboos.requireVegan) metaParts.push('веган-опции');

  const numEmojis = ['1️⃣', '2️⃣', '3️⃣'];
  const lines = topItems.slice(0, 3).map((item, idx) => {
    const v = item.venue;
    const shortWhy = item.reasons
      .filter((r) => r.type === 'ok')
      .slice(0, 2)
      .map((r) => r.text)
      .join(' • ');
    return [
      `${numEmojis[idx]} ${v.name} (м. ${v.metro}) — ~${v.averageCheck} ₽`,
      `${v.category}${shortWhy ? ` • ${shortWhy}` : ''}`,
      `📍 ${getYandexMapsUrl(v)}`,
    ].join('\n');
  });

  return [
    `Ребят, чтобы не спорить 40 минут — вот Топ-3 на ${metaParts.join(', ')}:`,
    '',
    lines.join('\n\n'),
    '',
    'Голосуем цифрой: 1, 2 или 3? 👇',
  ].join('\n');
}

function buildWinnerInviteText(item, prefs) {
  const v = item.venue;
  return [
    `🎉 Решено: идем ${prefs.day.toLowerCase()} в «${v.name}»!`,
    `📍 ${v.address} (м. ${v.metro})`,
    `💳 Средний чек: ~${v.averageCheck} ₽ • 🕒 ${v.hours}`,
    `🗺️ Маршрут на карте: ${getYandexMapsUrl(v)}`,
  ].join('\n');
}

// --- Browser UI Controller ---
if (typeof document !== 'undefined') {
  const tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
  if (tg) {
    try {
      tg.ready();
      tg.expand();
    } catch (_) {
      // Ignore outside TG
    }
  }

  function loadPrefs() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return getDefaultPrefs();
      const parsed = JSON.parse(raw);
      const def = getDefaultPrefs();
      return {
        ...def,
        ...parsed,
        taboos: { ...def.taboos, ...(parsed.taboos || {}) },
      };
    } catch (_) {
      return getDefaultPrefs();
    }
  }

  function savePrefs() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.prefs));
    } catch (_) {
      // Ignore storage quota errors
    }
  }

  const state = {
    screen: 'setup', // setup | results | winner
    prefs: loadPrefs(),
    hiddenIds: [],
    selectedWinner: null,
  };

  // DOM refs
  const viewSetup = document.getElementById('view-setup');
  const viewResults = document.getElementById('view-results');
  const viewWinner = document.getElementById('view-winner');
  const stickyBar = document.getElementById('sticky-cta-bar');

  const btnBack = document.getElementById('btn-back');
  const btnBackLabel = document.getElementById('btn-back-label');
  const brandMark = document.getElementById('brand-mark');
  const btnResetTop = document.getElementById('btn-reset-top');

  const daysGroup = document.getElementById('days-group');
  const vibesGrid = document.getElementById('vibes-grid');
  const budgetGrid = document.getElementById('budget-grid');
  const taboosGroup = document.getElementById('taboos-group');
  const customQueryInput = document.getElementById('custom-query');
  const btnClearQuery = document.getElementById('btn-clear-query');
  const quickKeywordsBox = document.getElementById('quick-keywords');
  const btnFindPlaces = document.getElementById('btn-find-places');

  const activeSummary = document.getElementById('active-summary');
  const filterStats = document.getElementById('filter-stats');
  const resultsList = document.getElementById('results-list');
  const btnCopyTop3 = document.getElementById('btn-copy-top3');
  const btnTgShareTop3 = document.getElementById('btn-tg-share-top3');
  const btnRestoreHidden = document.getElementById('btn-restore-hidden');
  const btnEditFilters = document.getElementById('btn-edit-filters');
  const winnerCard = document.getElementById('winner-card');
  const toastEl = document.getElementById('toast');

  let toastTimer = null;
  function showToast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2400);
  }

  function copyToClipboard(text, successMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        () => showToast(successMsg),
        () => fallbackCopy(text, successMsg)
      );
    } else {
      fallbackCopy(text, successMsg);
    }
  }

  function fallbackCopy(text, successMsg) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast(successMsg);
    } catch (_) {
      showToast('Не удалось скопировать');
    }
    document.body.removeChild(ta);
  }

  function setScreen(nextScreen) {
    state.screen = nextScreen;

    viewSetup.classList.toggle('hidden', nextScreen !== 'setup');
    viewResults.classList.toggle('hidden', nextScreen !== 'results');
    viewWinner.classList.toggle('hidden', nextScreen !== 'winner');
    stickyBar.classList.toggle('hidden', nextScreen !== 'setup');

    const isSetup = nextScreen === 'setup';
    btnBack.classList.toggle('hidden', isSetup);
    brandMark.classList.toggle('hidden', !isSetup);
    btnResetTop.classList.toggle('hidden', !isSetup);

    if (nextScreen === 'results') {
      btnBackLabel.textContent = 'Фильтры';
      renderResults();
    } else if (nextScreen === 'winner') {
      btnBackLabel.textContent = 'К Топ-3';
      renderWinner();
    }

    if (tg && tg.BackButton) {
      if (isSetup) {
        tg.BackButton.hide();
      } else {
        tg.BackButton.show();
      }
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function handleBack() {
    if (state.screen === 'winner') {
      setScreen('results');
    } else if (state.screen === 'results') {
      setScreen('setup');
    }
  }

  if (tg && tg.BackButton) {
    tg.BackButton.onClick(handleBack);
  }

  function updateCtaCount() {
    const match = computeMatches(VENUES_MSK, state.prefs, state.hiddenIds);
    if (match.exactCount > 0) {
      btnFindPlaces.textContent = `Показать Топ-3 (подходит ${match.exactCount}) →`;
    } else {
      btnFindPlaces.textContent = 'Показать 3 лучших компромисса →';
    }
  }

  function renderSetup() {
    // 1. Days
    daysGroup.innerHTML = DAYS.map(
      (day) => `
      <button type="button" class="pill-btn ${state.prefs.day === day ? 'active' : ''}" data-day="${esc(day)}">
        ${esc(day)}
      </button>
    `
    ).join('');

    // 2. Vibes
    vibesGrid.innerHTML = VIBES.map(
      (v) => `
      <button type="button" class="vibe-card ${state.prefs.vibe === v.id ? 'active' : ''}" data-vibe="${v.id}">
        <span class="vibe-emoji">${v.emoji}</span>
        <span class="vibe-name">${esc(v.name)}</span>
        <span class="vibe-desc">${esc(v.desc)}</span>
      </button>
    `
    ).join('');

    // 3. Budget
    budgetGrid.innerHTML = BUDGETS.map(
      (b) => `
      <button type="button" class="budget-btn ${state.prefs.budgetMax === b.id ? 'active' : ''}" data-budget="${b.id}">
        <div class="budget-main">${esc(b.label)}</div>
        <div class="budget-sub">${esc(b.sub)}</div>
      </button>
    `
    ).join('');

    // 4. Taboos
    taboosGroup.innerHTML = TABOOS.map((t) => {
      const active = Boolean(state.prefs.taboos[t.id]);
      return `
        <button type="button" class="taboo-btn ${active ? 'active' : ''} ${t.positive ? 'is-positive' : ''}" data-taboo="${t.id}">
          ${esc(t.label)}
        </button>
      `;
    }).join('');

    // 5. Query + quick chips
    customQueryInput.value = state.prefs.customQuery || '';
    btnClearQuery.classList.toggle('hidden', !state.prefs.customQuery);

    const qLower = (state.prefs.customQuery || '').toLowerCase();
    quickKeywordsBox.innerHTML = QUICK_KEYWORDS.map((kw) => {
      const active = qLower.includes(kw.toLowerCase());
      return `<button type="button" class="quick-tag ${active ? 'active' : ''}" data-kw="${esc(kw)}">+ ${esc(kw)}</button>`;
    }).join('');

    updateCtaCount();
  }

  function renderResults() {
    const match = computeMatches(VENUES_MSK, state.prefs, state.hiddenIds);
    const top3 = match.items.slice(0, 3);

    // Summary strip
    const vibeObj = VIBES.find((v) => v.id === state.prefs.vibe);
    const budgetObj = BUDGETS.find((b) => b.id === state.prefs.budgetMax);
    const chips = [
      state.prefs.day,
      vibeObj ? `${vibeObj.emoji} ${vibeObj.name}` : '',
      budgetObj ? budgetObj.label : '',
    ].filter(Boolean);

    for (const t of TABOOS) {
      if (state.prefs.taboos[t.id]) chips.push(t.label);
    }
    if (state.prefs.customQuery.trim()) {
      chips.push(`🔍 ${state.prefs.customQuery.trim()}`);
    }

    activeSummary.innerHTML = chips.map((c) => `<span class="summary-chip">${esc(c)}</span>`).join('');

    const statsParts = [];
    if (match.filteredHookahCount > 0) {
      statsParts.push(`отсеяно кальянных: ${match.filteredHookahCount}`);
    }
    if (match.exactCount === 0 && top3.length > 0) {
      statsParts.push('идеальных совпадений нет — ниже лучшие компромиссы по вашим рамкам');
    } else if (match.exactCount > 0) {
      statsParts.push(`нашлось идеальных мест: ${match.exactCount}`);
    }
    filterStats.textContent = statsParts.join(' • ');

    // Update share link
    const pollText = buildTop3PollText(top3, state.prefs);
    btnTgShareTop3.href = getTgShareUrl(pollText);

    // Cards
    const rankLabels = ['🏆 Топ-1', '🥈 Топ-2', '🥉 Топ-3'];
    if (top3.length === 0) {
      resultsList.innerHTML = `
        <div class="venue-card">
          <h3 class="venue-title">Все места скрыты</h3>
          <p class="venue-quote">Нажми «Вернуть скрытые» ниже, чтобы снова увидеть подборку.</p>
        </div>
      `;
    } else {
      resultsList.innerHTML = top3
        .map((item, idx) => {
          const v = item.venue;
          const rankClass = idx === 0 ? 'rank-1' : '';
          return `
          <article class="venue-card ${rankClass}">
            <div class="card-top">
              <div class="rank-badges">
                <span class="rank-pill">${rankLabels[idx] || `#${idx + 1}`}</span>
                <span class="score-pill">${item.score}% мэтч</span>
              </div>
              <button type="button" class="btn-hide" data-hide-id="${esc(v.id)}" title="Были недавно — заменить другим">
                ✕ Скрыть
              </button>
            </div>

            <div>
              <h3 class="venue-title">${esc(v.name)}</h3>
              <p class="venue-cat">${esc(v.category)}</p>
            </div>

            <div class="venue-meta">
              <span class="meta-item">🚇 ${esc(v.metro)}</span>
              <span class="meta-item meta-check">~${v.averageCheck} ₽</span>
              <span class="meta-item">⭐ ${v.rating}</span>
              <span class="meta-item">🕒 ${esc(v.hours)}</span>
            </div>

            <div class="reasons-box">
              ${item.reasons
                .map(
                  (r) => `
                <div class="reason-row ${r.type}">
                  <span>${r.type === 'ok' ? '✅' : '⚠️'}</span>
                  <span>${esc(r.text)}</span>
                </div>
              `
                )
                .join('')}
            </div>

            <p class="venue-quote">«${esc(v.quote)}»</p>

            <div class="card-actions">
              <button type="button" class="btn-choose" data-choose-id="${esc(v.id)}">
                ✓ Выбрать место
              </button>
              <a href="${getYandexMapsUrl(v)}" target="_blank" rel="noopener noreferrer" class="btn-map-sm">
                🗺️ Карта
              </a>
            </div>
          </article>
        `;
        })
        .join('');
    }

    if (state.hiddenIds.length > 0) {
      btnRestoreHidden.textContent = `Вернуть скрытые (${state.hiddenIds.length})`;
      btnRestoreHidden.classList.remove('hidden');
    } else {
      btnRestoreHidden.classList.add('hidden');
    }
  }

  function renderWinner() {
    const item = state.selectedWinner;
    if (!item) return;
    const v = item.venue;
    const inviteText = buildWinnerInviteText(item, state.prefs);

    winnerCard.innerHTML = `
      <div class="winner-card">
        <span class="winner-badge">🎉 Выбор сделан • ${esc(state.prefs.day)}</span>
        <div>
          <h1 class="winner-title">${esc(v.name)}</h1>
          <p class="venue-cat">${esc(v.category)}</p>
        </div>

        <div class="winner-details">
          <div>📍 <strong>Адрес:</strong> ${esc(v.address)} (м. ${esc(v.metro)})</div>
          <div>💳 <strong>Средний чек:</strong> ~${v.averageCheck} ₽ • ⭐ ${v.rating}</div>
          <div>🕒 <strong>Режим работы:</strong> ${esc(v.hours)}</div>
        </div>

        <div class="reasons-box">
          ${item.reasons
            .map(
              (r) => `
            <div class="reason-row ${r.type}">
              <span>${r.type === 'ok' ? '✅' : '⚠️'}</span>
              <span>${esc(r.text)}</span>
            </div>
          `
            )
            .join('')}
        </div>

        <div class="winner-actions">
          <a href="${getYandexMapsUrl(v)}" target="_blank" rel="noopener noreferrer" class="btn-primary">
            🗺️ Маршрут и бронь (Яндекс Карты)
          </a>

          <div class="winner-row-2">
            <button type="button" id="btn-copy-invite" class="btn-secondary">
              📋 Приглашение в чат
            </button>
            <a href="${get2GisUrl(v)}" target="_blank" rel="noopener noreferrer" class="btn-secondary">
              📍 Открыть в 2GIS
            </a>
          </div>

          <a href="${getTgShareUrl(inviteText)}" target="_blank" rel="noopener noreferrer" class="btn-tg full-width" style="min-height: 46px; border-radius: 12px;">
            ✈️ Отправить точку в Telegram
          </a>
        </div>
      </div>

      <div class="winner-reset">
        <button type="button" id="btn-new-search" class="btn-ghost-sm">↻ Собрать новую встречу</button>
      </div>
    `;

    document.getElementById('btn-copy-invite').addEventListener('click', () => {
      copyToClipboard(inviteText, 'Приглашение скопировано — вставь в чат!');
    });

    document.getElementById('btn-new-search').addEventListener('click', () => {
      state.selectedWinner = null;
      setScreen('setup');
    });
  }

  // --- Event Listeners ---
  daysGroup.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-day]');
    if (!btn) return;
    state.prefs.day = btn.dataset.day;
    savePrefs();
    renderSetup();
  });

  vibesGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-vibe]');
    if (!btn) return;
    const nextVibe = btn.dataset.vibe;
    state.prefs.vibe = nextVibe;

    // Автоматически снимаем конфликт, если выбрали громкую тусовку при старом запрете на громкую музыку
    if (nextVibe === 'party' && state.prefs.taboos.noLoudMusic) {
      state.prefs.taboos.noLoudMusic = false;
      showToast('Снял «Без орущей музыки» под тусовку');
    }

    savePrefs();
    renderSetup();
  });

  budgetGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-budget]');
    if (!btn) return;
    state.prefs.budgetMax = Number(btn.dataset.budget);
    savePrefs();
    renderSetup();
  });

  taboosGroup.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-taboo]');
    if (!btn) return;
    const key = btn.dataset.taboo;
    state.prefs.taboos[key] = !state.prefs.taboos[key];
    savePrefs();
    renderSetup();
  });

  customQueryInput.addEventListener('input', () => {
    state.prefs.customQuery = customQueryInput.value;
    btnClearQuery.classList.toggle('hidden', !state.prefs.customQuery);
    savePrefs();
    updateCtaCount();
  });

  btnClearQuery.addEventListener('click', () => {
    state.prefs.customQuery = '';
    savePrefs();
    renderSetup();
    customQueryInput.focus();
  });

  quickKeywordsBox.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-kw]');
    if (!btn) return;
    const kw = btn.dataset.kw;
    const current = state.prefs.customQuery.trim();
    if (current.toLowerCase().includes(kw.toLowerCase())) {
      // Remove keyword
      const regex = new RegExp(`\\s*${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'ig');
      state.prefs.customQuery = current.replace(regex, '').trim();
    } else {
      state.prefs.customQuery = current ? `${current} ${kw}` : kw;
    }
    savePrefs();
    renderSetup();
  });

  btnResetTop.addEventListener('click', () => {
    state.prefs = getDefaultPrefs();
    state.hiddenIds = [];
    savePrefs();
    renderSetup();
    showToast('Настройки сброшены');
  });

  btnFindPlaces.addEventListener('click', () => {
    setScreen('results');
  });

  btnBack.addEventListener('click', handleBack);
  btnEditFilters.addEventListener('click', () => setScreen('setup'));
  activeSummary.addEventListener('click', () => setScreen('setup'));

  btnCopyTop3.addEventListener('click', () => {
    const match = computeMatches(VENUES_MSK, state.prefs, state.hiddenIds);
    const text = buildTop3PollText(match.items.slice(0, 3), state.prefs);
    copyToClipboard(text, 'Топ-3 скопированы — кидай в чат!');
  });

  resultsList.addEventListener('click', (e) => {
    const hideBtn = e.target.closest('[data-hide-id]');
    if (hideBtn) {
      state.hiddenIds.push(hideBtn.dataset.hideId);
      renderResults();
      showToast('Заменил на следующий вариант');
      return;
    }

    const chooseBtn = e.target.closest('[data-choose-id]');
    if (chooseBtn) {
      const match = computeMatches(VENUES_MSK, state.prefs, state.hiddenIds);
      const found = match.items.find((i) => i.venue.id === chooseBtn.dataset.chooseId);
      if (found) {
        state.selectedWinner = found;
        setScreen('winner');
      }
    }
  });

  btnRestoreHidden.addEventListener('click', () => {
    state.hiddenIds = [];
    renderResults();
    showToast('Все места снова в списке');
  });

  // Initial render
  renderSetup();
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    VIBES,
    BUDGETS,
    TABOOS,
    getDefaultPrefs,
    computeMatches,
    buildTop3PollText,
    buildWinnerInviteText,
  };
}
