/* ====================================================================
   Без границ — бета-страница отчёта по мероприятию
   Vanilla JS. Без сборки. Открыть report.html в браузере.
   ==================================================================== */

'use strict';

// Логотип для PDF-шаблона встроен как base64 (а не загружается файлом logo-icon.png):
// при открытии report.html напрямую как file:// (без локального сервера) картинка,
// подгруженная отдельным файлом, "пачкает" canvas — html2canvas.toDataURL() падает
// с SecurityError. Инлайновый data:-URI этого не допускает вообще, вне зависимости
// от того, как открыта страница.
const PDF_LOGO_B64 = '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';

const DEFAULT_EXPENSE_TITLES = ['Аренда площадки', 'Кейтеринг', 'Оборудование и свет', 'Декор и полиграфия'];
const SCHEMA_VERSION = '1.4'; // 1.4: способ оплаты переехал с уровня проекта на каждый платёж (предоплата/постоплата)
const STATUS_LABELS = { planned: 'Запланирован', in_progress: 'В работе', done: 'Завершён', cancelled: 'Отменён' };
const INCOME_PAY_LABELS = { cash: 'нал', cashless: 'безнал' };
const CONTRACTOR_PAY_LABELS = { cash: 'Наличные', transfer: 'Перевод', sbp: 'СБП', invoice: 'Счёт через компанию' };
const LS_KEY = 'bg-report-beta-v2'; // v2: сброс старых данных, чтобы переключатель не показывался сразу
const CONTR_KEY = 'bg-contractors-v1'; // каталог подрядчиков — отдельное хранилище, не зависит от отчётов
const THEME_KEY = 'bg-theme-v1'; // тёмная/светлая тема — не зависит ни от отчёта, ни от каталога подрядчиков
const PROJECTS_KEY = 'bg-projects-base-v1'; // база сохранённых проектов — отдельное хранилище
const AUTOEXPORT_KEY = 'bg-autoexport-v1'; // вкл/выкл авто-скачивание JSON при закрытии страницы — по умолчанию включено

/* ---------- Утилиты ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const uid = () => (crypto.randomUUID ? crypto.randomUUID() : 'id-' + Math.random().toString(36).slice(2) + Date.now().toString(36));
/** Сегодняшняя дата по ЛОКАЛЬНОМУ времени устройства (не UTC) в формате YYYY-MM-DD.
    new Date().toISOString() всегда возвращает дату по UTC — в часовых поясах восточнее
    UTC (вся Россия) это могло «откатывать» дату на день назад ночью/рано утром. */
function todayLocalISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
/** Включено ли авто-скачивание JSON-копии отчёта при закрытии/обновлении страницы.
    По умолчанию (ничего не сохранено в localStorage) — включено. */
function isAutoExportEnabled() {
  try {
    const v = localStorage.getItem(AUTOEXPORT_KEY);
    return v === null ? true : v === '1';
  } catch (_) { return true; }
}

function fmtMoney(n) {
  const v = Number(n) || 0;
  return v.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtDate(iso) {
  if (!iso) return '';
  const d = new Date(iso + (iso.length === 10 ? 'T00:00:00' : ''));
  if (isNaN(d)) return iso;
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}.${mm}.${d.getFullYear()}`;
}
function download(filename, blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}
function slug(s) { return (s || 'report').toLowerCase().replace(/[^a-zа-я0-9]+/gi, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'report'; }
/** Сумма всех предоплат (может вноситься несколькими платежами в разные даты). */
function getTotalPrepaid(income) {
  return ((income && income.prepayments) || []).reduce((s, p) => s + (Number(p.amount) || 0), 0);
}
/** Сумма всех постоплат (как и предоплата — список платежей, не одно число). */
function getTotalPostpaid(income) {
  return ((income && income.postpayments) || []).reduce((s, p) => s + (Number(p.amount) || 0), 0);
}
/** Разбирает income из загружаемого JSON. Способ оплаты (нал/безнал) указывается
    у КАЖДОГО платежа отдельно — так фиксируется, как клиент платит на самом деле
    (например, часть предоплаты налом, часть безналом). Поддерживает более старые
    форматы: плоские числа income.prepaid/income.postpaid (до списков платежей) и
    массив prepayments без paymentMethod (до разделения по способу оплаты) — для
    них способ оплаты по умолчанию считается «нал». */
function parseIncomeIn(income) {
  const src = income || {};
  const normPay = p => ({ id: p.id || uid(), amount: Number(p.amount) || 0, date: p.date || '', paymentMethod: p.paymentMethod === 'cashless' ? 'cashless' : 'cash' });
  const prepayments = Array.isArray(src.prepayments)
    ? src.prepayments.map(normPay)
    : (Number(src.prepaid) > 0 ? [{ id: uid(), amount: Number(src.prepaid) || 0, date: '', paymentMethod: 'cash' }] : []);
  const postpayments = Array.isArray(src.postpayments)
    ? src.postpayments.map(normPay)
    : (Number(src.postpaid) > 0 ? [{ id: uid(), amount: Number(src.postpaid) || 0, date: '', paymentMethod: 'cash' }] : []);
  return { prepayments, postpayments };
}
/** Финансовые итоги отчёта (доход/расход/прибыль) по объекту report — той же формы,
    что и state, и report из buildSnapshot()/сохранённой в «Базе проектов» записи.
    Используется в таблице «Базы проектов», где нет живого state. Расход — просто
    сумма статей, без наценки: наценку за безналичный расчёт студия теперь считает
    и сообщает клиенту сама, приложение её не прибавляет. */
function computeReportFinancials(r) {
  // r.income может быть в старом плоском формате (одним числом, до списков
  // платежей) — parseIncomeIn приводит его к текущему виду, как это уже делают
  // loadReportFromSnapshot()/normalizeReport().
  const income0 = parseIncomeIn(r.income);
  const prepaid = getTotalPrepaid(income0);
  const postpaid = getTotalPostpaid(income0);
  const income = prepaid + postpaid;
  const expense = (r.expenses || []).reduce((s, e) => s + (Number(e.amount) || 0), 0);
  return { prepaid, postpaid, income, expense, profit: income - expense };
}
/** Разбирает заметки из загружаемого JSON: новый формат — массив {id,date,text},
    старый формат (до таблицы заметок) — одна строка без даты (используем дату
    мероприятия как приблизительную дату записи). */
function parseNotesIn(notes, fallbackDate) {
  if (Array.isArray(notes)) return notes.map(n => ({ id: n.id || uid(), date: n.date || '', text: n.text || '' }));
  if (typeof notes === 'string' && notes.trim()) return [{ id: uid(), date: fallbackDate || '', text: notes.trim() }];
  return [];
}

/* ---------- Состояние ---------- */
function newState() {
  return {
    date: '',
    title: '',
    eventType: '',
    status: 'planned',
    venue: '',
    durationHours: '',
    budgetSource: '',
    budgetLink: '',
    presentation: { kind: 'link', name: '', url: '' },
    photosUrl: '',
    expenses: DEFAULT_EXPENSE_TITLES.map(t => ({ id: uid(), title: t, amount: 0, currency: 'руб', isCustom: false, zone: '', description: '', qty: 1, price: 0 })),
    income: { prepayments: [], postpayments: [] },
    checklist: [],
    notes: [],
    results: [],
    contractors: [],
    projectBaseId: '', // id записи в «Базе проектов», если текущий проект открыт/сохранён оттуда — не входит в JSON-снапшот
  };
}
let state = newState();
let history = [];      // массив отчётов для режима динамики
let charts = {};
let contrCharts = {};  // графики аналитики подрядчиков
let projectsBase = []; // «База проектов» — сохранённые через кнопку «Сохранить проект» отчёты
let monthChartYearFilter = null; // «Прибыль по месяцам»: null — обычный вид (или список годов при drill-down),
                                  // иначе — конкретный год, «открытый» кликом по столбцу годового графика

/* ====================================================================
   РЕНДЕР: Проект
   ==================================================================== */
function renderAll() {
  renderExpenses();
  renderChecklist();
  renderResults();
  renderPrepayments();
  renderPostpayments();
  renderNotes();
  recalcFinances();
  syncInputsFromState();
  updateModeBarVisibility();
}

/** Показываем переключатель «Проект/Динамика/Подрядчики», только когда есть что переключать:
    отчёт заполнен, или уже есть история в «Динамике», или сохранённый каталог подрядчиков.
    Отдельно: если пользователь уже НЕ на вкладке «Проект» (например, зашёл по ссылке
    report.html#dynamics на пустой отчёт) — переключатель всё равно показываем, чтобы
    не запереть его на пустой вкладке без единой видимой кнопки для возврата. */
function updateModeBarVisibility() {
  const hasData = !!(
    state.title || state.date || state.budgetSource ||
    getTotalPrepaid(state.income) || getTotalPostpaid(state.income) ||
    state.expenses.some(e => Number(e.amount) > 0) ||
    history.length > 0 ||
    (state.contractors && state.contractors.length > 0) ||
    (projectsBase && projectsBase.length > 0)
  );
  const reportEl = $('#reportMode');
  const onNonReportTab = !!(reportEl && reportEl.hidden);
  const bar = $('.mode-switch-bar');
  if (bar) bar.classList.toggle('visible', hasData || onNonReportTab);
}

function syncInputsFromState() {
  $('#dateInput').value = state.date || '';
  $('#titleInput').value = state.title || '';
  $('#eventTypeInput').value = state.eventType || '';
  $('#statusInput').value = state.status || 'planned';
  $('#venueInput').value = state.venue || '';
  $('#durationInput').value = state.durationHours || '';
  $('#budgetName').textContent = state.budgetSource || 'файл не загружен';
  $('#budgetLinkUrl').value = state.budgetLink || '';
  updateBudgetLink();
  $('#presLink').value = (state.presentation && state.presentation.url) || '';
  updatePresLink();
  $('#photosUrl').value = state.photosUrl || '';
  updatePhotosLink();
}

function renderExpenses() {
  const ul = $('#expenseList');
  ul.innerHTML = '';
  const contrOpts = state.contractors.map(c => `<option value="${c.id}">${escapeHtml(c.name)}</option>`).join('');
  let lastZone = null;
  let n = 0;
  state.expenses.forEach(e => {
    const zone = e.zone || '';
    if (zone && zone !== lastZone) {
      const zh = document.createElement('li');
      zh.className = 'zone-header';
      zh.textContent = zone;
      ul.appendChild(zh);
    }
    lastZone = zone;
    n++;
    const li = document.createElement('li');
    if (e.isCustom) li.classList.add('custom');
    const qtyPriceNote = Number(e.qty) > 1
      ? `<span class="qty-note">${Number(e.qty)} × ${fmtMoney(Number(e.price) || 0)}</span>`
      : '';
    li.innerHTML = `
      <span class="num">${n}.</span>
      <span class="t">${escapeHtml(e.title)}${e.description ? ` <span class="desc">— ${escapeHtml(e.description)}</span>` : ''}${qtyPriceNote}</span>
      <select class="contr-sel" data-id="${e.id}"><option value="">—</option>${contrOpts}</select>
      <input class="a" type="number" min="0" step="0.01" value="${Number(e.amount) || 0}" data-id="${e.id}" />
      <span class="cur">руб</span>
      <button class="del" title="Удалить" data-id="${e.id}">×</button>`;
    const sel = li.querySelector('.contr-sel');
    if (sel && e.contractorId) sel.value = e.contractorId;
    ul.appendChild(li);
  });
  const zoneList = $('#expZoneList');
  if (zoneList) {
    const zones = [...new Set(state.expenses.map(e => e.zone).filter(Boolean))];
    zoneList.innerHTML = zones.map(z => `<option value="${escapeHtml(z)}"></option>`).join('');
  }
  // обработчики суммы
  $$('#expenseList input.a').forEach(inp => {
    inp.addEventListener('input', ev => {
      const id = ev.target.dataset.id;
      const ex = state.expenses.find(x => x.id === id);
      if (ex) { ex.amount = Number(ev.target.value) || 0; recalcFinances(); saveLS(); }
    });
  });
  // обработчики выбора подрядчика
  $$('#expenseList .contr-sel').forEach(sel => {
    sel.addEventListener('change', ev => {
      const id = ev.target.dataset.id;
      const ex = state.expenses.find(x => x.id === id);
      if (ex) { ex.contractorId = ev.target.value || ''; saveLS(); }
    });
  });
  $$('#expenseList .del').forEach(b => {
    b.addEventListener('click', ev => {
      const id = ev.target.dataset.id;
      state.expenses = state.expenses.filter(x => x.id !== id);
      renderExpenses(); recalcFinances(); saveLS();
    });
  });
}

function renderChecklist() {
  const ul = $('#checklist');
  ul.innerHTML = '';
  state.checklist.forEach(c => {
    const li = document.createElement('li');
    if (c.done) li.classList.add('done');
    li.innerHTML = `
      <span class="box" data-id="${c.id}" role="checkbox" aria-checked="${c.done}" tabindex="0"></span>
      <span class="t">${escapeHtml(c.text)}</span>
      <button class="del" data-id="${c.id}" title="Удалить">×</button>`;
    ul.appendChild(li);
  });
  $$('#checklist .box').forEach(cb => {
    const toggle = ev => {
      const id = ev.currentTarget.dataset.id;
      const c = state.checklist.find(x => x.id === id);
      if (c) { c.done = !c.done; renderChecklist(); saveLS(); }
    };
    cb.addEventListener('click', toggle);
    cb.addEventListener('keydown', ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); toggle(ev); } });
  });
  $$('#checklist .del').forEach(b => {
    b.addEventListener('click', ev => {
      const id = ev.target.dataset.id;
      state.checklist = state.checklist.filter(x => x.id !== id);
      renderChecklist(); saveLS();
    });
  });
}

function renderResults() {
  const ul = $('#resultList');
  ul.innerHTML = '';
  state.results.forEach(r => {
    const li = document.createElement('li');
    li.classList.add(r.type);
    li.innerHTML = `
      <span class="badge">${r.type === 'positive' ? '+' : '−'}</span>
      <span class="cat">${escapeHtml(r.category || '—')}</span>
      <span class="t">${escapeHtml(r.text)}</span>
      <button class="del" data-id="${r.id}" title="Удалить">×</button>`;
    ul.appendChild(li);
  });
  $$('#resultList .del').forEach(b => {
    b.addEventListener('click', ev => {
      const id = ev.target.dataset.id;
      state.results = state.results.filter(x => x.id !== id);
      renderResults(); saveLS();
    });
  });
}

/** Список платежей (предоплата и постоплата устроены одинаково: несколько
    платежей, у каждого — сумма, дата и СВОЙ способ оплаты). В реальности клиент
    часто платит смешанно — например, часть предоплаты налом, часть безналом,
    поэтому способ оплаты фиксируется у каждого платежа отдельно, а не один на
    весь проект. Любое поле платежа можно поправить прямо в списке.
    key — 'prepayments' или 'postpayments' в state.income; ulId/totalId — id
    соответствующих элементов в разметке. */
function renderPaymentList(key, ulId, totalId) {
  const ul = $('#' + ulId);
  const list = state.income[key] || [];
  ul.innerHTML = list.map(p => `
    <li>
      <input type="date" class="pd" data-id="${p.id}" title="Дата" value="${p.date || ''}" />
      <input type="number" class="pa" min="0" step="0.01" data-id="${p.id}" value="${Number(p.amount) || 0}" />
      <select class="pm" data-id="${p.id}" title="Способ оплаты">
        <option value="cash"${p.paymentMethod === 'cashless' ? '' : ' selected'}>Нал</option>
        <option value="cashless"${p.paymentMethod === 'cashless' ? ' selected' : ''}>Безнал</option>
      </select>
      <span class="cur">руб</span>
      <button class="del" data-id="${p.id}" title="Удалить">×</button>
    </li>`).join('');
  $$(`#${ulId} .pd`).forEach(inp => {
    inp.addEventListener('input', ev => {
      const id = ev.target.dataset.id;
      const p = (state.income[key] || []).find(x => x.id === id);
      if (p) { p.date = ev.target.value || ''; saveLS(); }
    });
  });
  $$(`#${ulId} .pa`).forEach(inp => {
    inp.addEventListener('input', ev => {
      const id = ev.target.dataset.id;
      const p = (state.income[key] || []).find(x => x.id === id);
      if (p) { p.amount = Number(ev.target.value) || 0; recalcFinances(); saveLS(); updateModeBarVisibility(); }
    });
  });
  $$(`#${ulId} .pm`).forEach(sel => {
    sel.addEventListener('change', ev => {
      const id = ev.target.dataset.id;
      const p = (state.income[key] || []).find(x => x.id === id);
      if (p) { p.paymentMethod = ev.target.value === 'cashless' ? 'cashless' : 'cash'; recalcFinances(); saveLS(); }
    });
  });
  $$(`#${ulId} .del`).forEach(b => {
    b.addEventListener('click', ev => {
      const id = ev.target.dataset.id;
      state.income[key] = (state.income[key] || []).filter(x => x.id !== id);
      renderPaymentList(key, ulId, totalId); recalcFinances(); saveLS(); updateModeBarVisibility();
    });
  });
  const totalEl = $('#' + totalId);
  if (totalEl) totalEl.textContent = fmtMoney(list.reduce((s, p) => s + (Number(p.amount) || 0), 0));
}
function renderPrepayments() { renderPaymentList('prepayments', 'prepaidList', 'prepaidTotal'); }
function renderPostpayments() { renderPaymentList('postpayments', 'postpaidList', 'postpaidTotal'); }

/** Таблица заметок: несколько записей, у каждой — автоматическая дата
    добавления и текст. Дата проставляется один раз при создании записи. */
function renderNotes() {
  const tbody = $('#notesBody');
  const list = state.notes || [];
  tbody.innerHTML = list.map(n => `
    <tr>
      <td class="nd">${escapeHtml(fmtDate(n.date) || '—')}</td>
      <td class="nt">${escapeHtml(n.text)}</td>
      <td class="na"><button class="del" data-id="${n.id}" title="Удалить">×</button></td>
    </tr>`).join('');
  const empty = $('#notesEmpty');
  if (empty) empty.hidden = list.length > 0;
  $$('#notesBody .del').forEach(b => {
    b.addEventListener('click', ev => {
      const id = ev.target.dataset.id;
      state.notes = (state.notes || []).filter(x => x.id !== id);
      renderNotes(); saveLS();
    });
  });
}

function recalcFinances() {
  const prepaid = getTotalPrepaid(state.income);
  const postpaid = getTotalPostpaid(state.income);
  const totalIncome = prepaid + postpaid;
  const totalExpense = state.expenses.reduce((s, e) => s + (Number(e.amount) || 0), 0);
  const profit = totalIncome - totalExpense;
  $('#totalIncome').textContent = fmtMoney(totalIncome);
  $('#totalExpense').textContent = fmtMoney(totalExpense);
  // Справочная разбивка дохода по фактическому способу оплаты (нал/безнал) —
  // просто сумма по факту внесённых платежей, без какой-либо наценки: студия
  // сама считает и сообщает клиенту наценку за безналичный расчёт, приложение
  // в эти расчёты больше не вмешивается.
  const note = $('#incomeSubnote');
  if (note) {
    const allPayments = [...(state.income.prepayments || []), ...(state.income.postpayments || [])];
    const cash = allPayments.filter(p => p.paymentMethod !== 'cashless').reduce((s, p) => s + (Number(p.amount) || 0), 0);
    const cashless = allPayments.filter(p => p.paymentMethod === 'cashless').reduce((s, p) => s + (Number(p.amount) || 0), 0);
    note.textContent = (cash || cashless) ? `Нал: ${fmtMoney(cash)} руб · Безнал: ${fmtMoney(cashless)} руб` : '';
  }
  const pEl = $('#profit');
  pEl.textContent = fmtMoney(profit);
  const row = pEl.closest('.fin-row');
  row.classList.toggle('pos', profit >= 0);
  row.classList.toggle('neg', profit < 0);
}

function escapeHtml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/* ====================================================================
   ВВОД МЕТАДАННЫХ
   ==================================================================== */
function bindMetadata() {
  $('#dateInput').addEventListener('change', e => { state.date = e.target.value; saveLS(); updateModeBarVisibility(); });
  $('#titleInput').addEventListener('input', e => { state.title = e.target.value; saveLS(); updateModeBarVisibility(); });
  $('#eventTypeInput').addEventListener('input', e => { state.eventType = e.target.value; saveLS(); });
  $('#statusInput').addEventListener('change', e => { state.status = e.target.value; saveLS(); });
  $('#venueInput').addEventListener('input', e => { state.venue = e.target.value; saveLS(); });
  $('#durationInput').addEventListener('input', e => { state.durationHours = e.target.value; saveLS(); });
  $('#photosUrl').addEventListener('input', e => { state.photosUrl = e.target.value; updatePhotosLink(); saveLS(); });
  $('#budgetLinkUrl').addEventListener('input', e => { state.budgetLink = e.target.value; updateBudgetLink(); saveLS(); });

  // презентация
  $('#presLink').addEventListener('input', e => { savePresentation(); updatePresLink(); saveLS(); });
}

function savePresentation() {
  state.presentation = { url: $('#presLink').value || '' };
}
/** Универсальный переключатель кнопки «Открыть» рядом с полем ссылки — используется
    для фото, презентации и сметы: если ссылка введена, кнопка ведёт на неё в новой вкладке. */
function updateOpenLink(url, aSel) {
  const a = $(aSel);
  if (!a) return;
  if (url) { a.href = url; a.classList.remove('disabled'); a.removeAttribute('aria-disabled'); }
  else { a.href = '#'; }
}
function updatePhotosLink() { updateOpenLink(state.photosUrl || '', '#photosOpen'); }
function updatePresLink() { updateOpenLink((state.presentation && state.presentation.url) || '', '#presOpen'); }
function updateBudgetLink() { updateOpenLink(state.budgetLink || '', '#budgetLinkOpen'); }

/* ====================================================================
   ДОБАВЛЕНИЕ: расходы / чек-лист / результаты
   ==================================================================== */
function bindForms() {
  $('#addExpenseForm').addEventListener('submit', e => {
    e.preventDefault();
    const t = $('#expTitle').value.trim();
    const raw = $('#expAmount').value.trim();
    const num = $('#expAmount').valueAsNumber;
    const zone = $('#expZone') ? $('#expZone').value.trim() : '';
    if (!t) return;
    if (!raw || isNaN(num) || num <= 0 || !/^\d+(\.\d+)?$/.test(raw)) {
      $('#expAmount').style.outline = '2px solid var(--neg)';
      setTimeout(() => { $('#expAmount').style.outline = ''; }, 1200);
      return;
    }
    state.expenses.push({ id: uid(), title: t, amount: num, currency: 'руб', isCustom: true, zone, description: '', qty: 1, price: num });
    $('#expTitle').value = ''; $('#expAmount').value = ''; if ($('#expZone')) $('#expZone').value = '';
    renderExpenses(); recalcFinances(); saveLS();
  });

  $('#addPrepaidForm').addEventListener('submit', e => {
    e.preventDefault();
    const raw = $('#prepaidAmount').value.trim();
    const num = $('#prepaidAmount').valueAsNumber;
    const date = $('#prepaidDate').value || '';
    const paymentMethod = $('#prepaidMethod') && $('#prepaidMethod').value === 'cashless' ? 'cashless' : 'cash';
    if (!raw || isNaN(num) || num <= 0) {
      $('#prepaidAmount').style.outline = '2px solid var(--neg)';
      setTimeout(() => { $('#prepaidAmount').style.outline = ''; }, 1200);
      return;
    }
    if (!state.income.prepayments) state.income.prepayments = [];
    state.income.prepayments.push({ id: uid(), amount: num, date, paymentMethod });
    $('#prepaidAmount').value = ''; $('#prepaidDate').value = '';
    renderPrepayments(); recalcFinances(); saveLS(); updateModeBarVisibility();
  });

  $('#addPostpaidForm').addEventListener('submit', e => {
    e.preventDefault();
    const raw = $('#postpaidAmount').value.trim();
    const num = $('#postpaidAmount').valueAsNumber;
    const date = $('#postpaidDate').value || '';
    const paymentMethod = $('#postpaidMethod') && $('#postpaidMethod').value === 'cashless' ? 'cashless' : 'cash';
    if (!raw || isNaN(num) || num <= 0) {
      $('#postpaidAmount').style.outline = '2px solid var(--neg)';
      setTimeout(() => { $('#postpaidAmount').style.outline = ''; }, 1200);
      return;
    }
    if (!state.income.postpayments) state.income.postpayments = [];
    state.income.postpayments.push({ id: uid(), amount: num, date, paymentMethod });
    $('#postpaidAmount').value = ''; $('#postpaidDate').value = '';
    renderPostpayments(); recalcFinances(); saveLS(); updateModeBarVisibility();
  });

  $('#addNoteForm').addEventListener('submit', e => {
    e.preventDefault();
    const t = $('#noteText').value.trim();
    if (!t) return;
    const today = todayLocalISO();
    if (!state.notes) state.notes = [];
    state.notes.push({ id: uid(), date: today, text: t });
    $('#noteText').value = '';
    renderNotes(); saveLS();
  });

  $('#addCheckForm').addEventListener('submit', e => {
    e.preventDefault();
    const t = $('#checkText').value.trim();
    if (!t) return;
    state.checklist.push({ id: uid(), text: t, done: false });
    $('#checkText').value = '';
    renderChecklist(); saveLS();
  });

  $('#addResultForm').addEventListener('submit', e => {
    e.preventDefault();
    const type = $('#resType').value;
    const category = $('#resCategory').value.trim();
    const text = $('#resText').value.trim();
    if (!text) return;
    state.results.push({ id: uid(), type, category, text });
    $('#resCategory').value = ''; $('#resText').value = '';
    renderResults(); saveLS();
  });
}

/* ====================================================================
   EXCEL: импорт / экспорт (SheetJS)
   ==================================================================== */
// Ключевые слова для распознавания колонок шапки таблицы сметы.
// Поддерживает как плоский формат («Статья»/«Сумма»), так и иерархический
// («Наименование»/«Описание»/«Количество»/«Цена»/«Стоимость» + зоны-разделители).
const SMETA_NAME_KEYS = ['статья', 'наименование', 'название', 'позиция'];
const SMETA_DESC_KEYS = ['описание'];
const SMETA_QTY_KEYS = ['количество', 'кол-во', 'кол.'];
const SMETA_PRICE_KEYS = ['цена'];
const SMETA_AMOUNT_KEYS = ['сумма', 'стоимость'];

function findColIndex(headerRow, keys, excludeIdx) {
  return headerRow.findIndex((h, idx) => idx !== excludeIdx && keys.some(k => h === k || h.includes(k)));
}

/** Ищет строку-заголовок таблицы расходов и индексы её колонок. */
function detectSmetaHeader(rows) {
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (!row || !row.length) continue;
    const header = row.map(h => String(h == null ? '' : h).trim().toLowerCase());
    const nameIdx = findColIndex(header, SMETA_NAME_KEYS, -1);
    if (nameIdx === -1) continue;
    const amountIdx = findColIndex(header, SMETA_AMOUNT_KEYS, nameIdx);
    const qtyIdx = findColIndex(header, SMETA_QTY_KEYS, nameIdx);
    const priceIdx = findColIndex(header, SMETA_PRICE_KEYS, nameIdx);
    if (amountIdx === -1 && (qtyIdx === -1 || priceIdx === -1)) continue;
    const descIdx = findColIndex(header, SMETA_DESC_KEYS, nameIdx);
    return { rowIndex: i, nameIdx, descIdx, qtyIdx, priceIdx, amountIdx };
  }
  // не нашли — считаем первую строку заголовком в старом плоском формате
  return { rowIndex: 0, nameIdx: 0, descIdx: -1, qtyIdx: -1, priceIdx: -1, amountIdx: 1 };
}

function numFromCell(v) {
  if (v == null || v === '') return NaN;
  return Number(String(v).replace(/[^\d.-]/g, ''));
}

/** Разбирает лист сметы в список позиций расходов (с зонами) + метаданные (место, время). */
function parseSmetaSheet(rows) {
  const cols = detectSmetaHeader(rows);
  const { nameIdx, descIdx, qtyIdx, priceIdx, amountIdx } = cols;

  // место проведения / время — ищем по всем строкам и колонкам
  let venue = '', durationHours = '';
  for (const row of rows) {
    if (!row) continue;
    for (const cell of row) {
      const s = cell == null ? '' : String(cell);
      if (!venue) {
        const mVenue = s.match(/место\s*провед[её]ния\s*:?\s*(.+)/i);
        if (mVenue && mVenue[1].trim()) venue = mVenue[1].trim();
      }
      if (!durationHours) {
        const mTime = s.match(/^время\s*:?\s*(\d+)/i);
        if (mTime) durationHours = mTime[1];
      }
    }
  }

  const items = [];
  let currentZone = '';
  for (let i = cols.rowIndex + 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row || !row.length) continue;
    const nameCell = nameIdx !== -1 ? row[nameIdx] : null;
    const name = nameCell != null ? String(nameCell).trim() : '';
    if (!name) continue;
    if (/итого/i.test(name)) break;

    const otherIdxs = [descIdx, qtyIdx, priceIdx, amountIdx].filter(idx => idx !== -1);
    const otherEmpty = otherIdxs.every(idx => row[idx] == null || String(row[idx]).trim() === '');
    if (otherIdxs.length && otherEmpty) { currentZone = name; continue; }

    const description = descIdx !== -1 && row[descIdx] != null ? String(row[descIdx]).trim() : '';
    const qty = qtyIdx !== -1 ? (Number(numFromCell(row[qtyIdx])) || 1) : 1;
    const price = priceIdx !== -1 ? (numFromCell(row[priceIdx]) || 0) : 0;
    const amountRaw = amountIdx !== -1 ? numFromCell(row[amountIdx]) : NaN;
    const amount = !isNaN(amountRaw) ? amountRaw : qty * price;
    items.push({ title: name, description, qty, price, amount: amount || 0, zone: currentZone });
  }

  return { items, venue, durationHours };
}

function importExcel(file) {
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      const name = (file.name || '').toLowerCase();
      let wb;
      if (name.endsWith('.csv')) {
        // автоопределение разделителя (запятая или точка с запятой — русская локаль)
        const text = new TextDecoder('utf-8').decode(new Uint8Array(ev.target.result)).replace(/^\uFEFF/, '');
        const firstLine = (text.split(/\r?\n/)[0] || '');
        const fs = firstLine.includes(';') && !firstLine.includes(',') ? ';' : ',';
        wb = XLSX.read(text, { type: 'string', FS: fs, codepage: 65001 });
      } else {
        const data = new Uint8Array(ev.target.result);
        wb = XLSX.read(data, { type: 'array' });
      }
      // берём первый лист, где вообще есть строки с данными
      let rows = [];
      for (const sheetName of wb.SheetNames) {
        const candidate = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], { header: 1, blankrows: false });
        if (candidate.length > 1) { rows = candidate; break; }
        if (!rows.length) rows = candidate;
      }
      if (!rows.length) { alert('Файл пуст'); return; }

      const parsed = parseSmetaSheet(rows);

      // сброс расходов перед заполнением (полная замена). Стандартные 4 статьи-заглушки
      // подсаживаем только для плоских смет без зон — в зонированной смете они не совпадут
      // ни с одной реальной позицией и останутся мусором с нулевой суммой.
      const hasZones = parsed.items.some(it => it.zone);
      state.expenses = hasZones
        ? []
        : DEFAULT_EXPENSE_TITLES.map(t => ({ id: uid(), title: t, amount: 0, currency: 'руб', isCustom: false, zone: '', description: '', qty: 1, price: 0 }));

      let added = 0;
      parsed.items.forEach(it => {
        const exist = !it.zone ? state.expenses.find(e => !e.zone && e.title.toLowerCase() === it.title.toLowerCase()) : null;
        if (exist) {
          exist.amount = it.amount; exist.description = it.description; exist.qty = it.qty; exist.price = it.price;
        } else {
          state.expenses.push({ id: uid(), title: it.title || '(без названия)', amount: it.amount, currency: 'руб', isCustom: true, zone: it.zone, description: it.description, qty: it.qty, price: it.price });
          added++;
        }
      });

      state.budgetSource = file.name;
      if (parsed.venue) state.venue = parsed.venue;
      if (parsed.durationHours) state.durationHours = parsed.durationHours;

      renderExpenses(); recalcFinances(); syncInputsFromState(); updateModeBarVisibility(); saveLS();
      alert(`Смета загружена: ${parsed.items.length} позиций. Добавлено новых статей: ${added}.`);
    } catch (err) {
      console.error(err); alert('Ошибка чтения Excel: ' + err.message);
    }
  };
  reader.readAsArrayBuffer(file);
}

// Оформление экспортируемой сметы (заливки, шрифты) — держим в одном месте,
// чтобы визуальный стиль листа «Смета» было легко поменять.
const XLS_STYLE = {
  title: { font: { bold: true, size: 13 } },
  sub: { font: { italic: true, color: { argb: 'FF666666' } } },
  colHeader: { font: { bold: true, color: { argb: 'FFFFFFFF' } }, fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF6A6A6A' } } },
  zoneHeader: { font: { bold: true, color: { argb: 'FF3A3A3A' } }, fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9D9D9' } } },
  itemTitle: { font: { bold: true } },
  totalCash: { font: { bold: true }, fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE2EFDA' } } },
};

async function exportExcel() {
  const wb = new ExcelJS.Workbook();

  // ---- лист «Смета» — воспроизводим структуру исходного шаблона (шапка + зоны + итоги нал/безнал), с оформлением ----
  const ws1 = wb.addWorksheet('Смета');
  ws1.columns = [{ width: 34 }, { width: 40 }, { width: 12 }, { width: 12 }, { width: 14 }];

  const addMergedRow = (text, style) => {
    const row = ws1.addRow([text]);
    ws1.mergeCells(row.number, 1, row.number, 5);
    if (style) Object.assign(row.getCell(1), style);
    return row;
  };

  addMergedRow(state.title || '(без названия)', XLS_STYLE.title);
  addMergedRow(`Место проведения: ${state.venue || '—'}`, XLS_STYLE.sub);
  addMergedRow(`Время: ${state.durationHours || '—'}`, XLS_STYLE.sub);
  ws1.addRow([]);

  const headerRow = ws1.addRow(['Наименование', 'Описание', 'Количество', 'Цена', 'Стоимость']);
  headerRow.eachCell(cell => Object.assign(cell, XLS_STYLE.colHeader));

  let lastZone = null;
  state.expenses.forEach(e => {
    const zone = e.zone || '';
    if (zone && zone !== lastZone) {
      // как в исходнике: зона занимает A:D, колонка «Стоимость» свободна
      const zr = ws1.addRow([zone]);
      ws1.mergeCells(zr.number, 1, zr.number, 4);
      Object.assign(zr.getCell(1), XLS_STYLE.zoneHeader);
    }
    lastZone = zone;
    const row = ws1.addRow([e.title, e.description || '', Number(e.qty) || 1, Number(e.price) || 0, Number(e.amount) || 0]);
    Object.assign(row.getCell(1), XLS_STYLE.itemTitle);
    row.getCell(4).numFmt = '#,##0.00';
    row.getCell(5).numFmt = '#,##0.00';
  });

  const totalExpense = state.expenses.reduce((s, e) => s + (Number(e.amount) || 0), 0);

  ws1.addRow([]);
  const totalRow = ws1.addRow(['Итого по смете:', '', '', '', totalExpense]);
  ws1.mergeCells(totalRow.number, 1, totalRow.number, 4);
  totalRow.eachCell(cell => Object.assign(cell, XLS_STYLE.totalCash));
  totalRow.getCell(5).numFmt = '#,##0.00';

  // ---- лист «Сводка» ----
  const ws2 = wb.addWorksheet('Сводка');
  ws2.columns = [{ width: 30 }, { width: 30 }];
  const totalPrepaid = getTotalPrepaid(state.income);
  const totalPostpaid = getTotalPostpaid(state.income);
  const totalIncome = totalPrepaid + totalPostpaid;
  const payLabel = m => m === 'cashless' ? 'безнал' : 'нал';
  const summary = [
    ['Дата', fmtDate(state.date) || ''],
    ['Событие', state.title || ''],
    ['Тип праздника', state.eventType || ''],
    ['Статус', STATUS_LABELS[state.status] || ''],
    ['Место проведения', state.venue || ''],
    ['Время (ч)', state.durationHours || ''],
    ['Предоплата', totalPrepaid],
    ...(state.income.prepayments || []).map(p => [`   — ${fmtDate(p.date) || 'без даты'} (${payLabel(p.paymentMethod)})`, Number(p.amount) || 0]),
    ['Постоплата', totalPostpaid],
    ...(state.income.postpayments || []).map(p => [`   — ${fmtDate(p.date) || 'без даты'} (${payLabel(p.paymentMethod)})`, Number(p.amount) || 0]),
    ['Общий доход', totalIncome],
    ['Расход', totalExpense],
    ['Прибыль', totalIncome - totalExpense],
  ];
  summary.forEach(([label, value]) => {
    const row = ws2.addRow([label, value]);
    Object.assign(row.getCell(1), { font: { bold: true } });
    if (typeof value === 'number') row.getCell(2).numFmt = '#,##0.00';
  });
  const profitRow = ws2.lastRow;
  Object.assign(profitRow.getCell(2), { font: { bold: true, color: { argb: totalIncome - totalExpense >= 0 ? 'FF2E7D32' : 'FFC62828' } } });

  const buf = await wb.xlsx.writeBuffer();
  download(`${slug(state.title)}_${state.date || 'nodate'}.xlsx`, new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
}

/* ====================================================================
   PDF: собственный шаблон (html2canvas + jsPDF), не window.print()
   ==================================================================== */
const PDF_PAGE_W_MM = 277;  // альбомная A4 (297мм) минус поля 10мм с каждой стороны
const PDF_PAGE_H_MM = 190;  // альбомная A4 (210мм) минус поля 10мм сверху/снизу
const PDF_MARGIN_MM = 10;
const PDF_PAGE_W_PX = 1046; // ширина шаблона в CSS px = ширина контентной области страницы
const PDF_PAGE_H_PX = 718;  // высота одной страницы в CSS px шаблона

function buildPdfExpenseRows() {
  if (!state.expenses.length) return '<div class="pdf-empty pdf-row">Расходы не добавлены.</div>';
  let html = '';
  let lastZone = null;
  let n = 0;
  state.expenses.forEach(e => {
    const zone = e.zone || '';
    if (zone && zone !== lastZone) html += `<div class="pdf-zone-header pdf-row">${escapeHtml(zone)}</div>`;
    lastZone = zone;
    n++;
    const qtyNote = Number(e.qty) > 1 ? `<span class="qty">${Number(e.qty)} × ${fmtMoney(Number(e.price) || 0)}</span>` : '';
    html += `<div class="pdf-exp-row pdf-row">
      <span class="num">${n}.</span>
      <span class="t">${escapeHtml(e.title)}${e.description ? ` <span class="desc">— ${escapeHtml(e.description)}</span>` : ''}${qtyNote}</span>
      <span class="amt">${fmtMoney(Number(e.amount) || 0)} руб</span>
    </div>`;
  });
  return html;
}

function buildPdfChecklistRows() {
  if (!state.checklist.length) return '<div class="pdf-empty pdf-row">Пункты не добавлены.</div>';
  return state.checklist.map(c => `<div class="pdf-check-row pdf-row${c.done ? ' done' : ''}">
      <span class="box">${c.done ? '✓' : ''}</span>
      <span class="t">${escapeHtml(c.text)}</span>
    </div>`).join('');
}

function buildPdfNotesRows() {
  if (!state.notes.length) return '';
  const rows = state.notes.map(n => `<div class="pdf-note-row pdf-row">
      <span class="d">${escapeHtml(fmtDate(n.date) || '—')}</span>
      <span class="t">${escapeHtml(n.text)}</span>
    </div>`).join('');
  return `<div class="pdf-notes-wrap">${rows}</div>`;
}

function buildPdfResultRows() {
  if (!state.results.length) return '<div class="pdf-empty pdf-row">Результаты не добавлены.</div>';
  return state.results.map(r => `<div class="pdf-result-row pdf-row ${r.type}">
      <span class="badge">${r.type === 'positive' ? '+' : '−'}</span>
      <span class="cat">${escapeHtml(r.category || '—')}</span>
      <span class="t">${escapeHtml(r.text)}</span>
    </div>`).join('');
}

/** Заполняет скрытый #pdfExportRoot HTML-шаблоном отчёта, оформленным как сайт. */
function buildPdfTemplate() {
  const root = $('#pdfExportRoot');
  const prepaid = getTotalPrepaid(state.income);
  const postpaid = getTotalPostpaid(state.income);
  const totalIncome = prepaid + postpaid;
  const totalExpense = state.expenses.reduce((s, e) => s + (Number(e.amount) || 0), 0);
  const profit = totalIncome - totalExpense;
  const payLabel = m => m === 'cashless' ? 'безнал' : 'нал';

  root.innerHTML = `<div class="pdf-doc">
    <div class="pdf-header pdf-row">
      <img src="data:image/png;base64,${PDF_LOGO_B64}" alt="" />
      <div class="brand">Студия декора и флористики «Без границ»<small>Отчёт по мероприятию</small></div>
    </div>
    <div class="pdf-meta pdf-row">
      <div class="pdf-meta-item"><span class="lbl">ДАТА</span><span class="val">${escapeHtml(fmtDate(state.date) || '—')}</span></div>
      <div class="pdf-meta-item"><span class="lbl">СОБЫТИЕ</span><span class="val">${escapeHtml(state.title || '—')}</span></div>
      <div class="pdf-meta-item"><span class="lbl">ТИП ПРАЗДНИКА</span><span class="val">${escapeHtml(state.eventType || '—')}</span></div>
      <div class="pdf-meta-item"><span class="lbl">СТАТУС</span><span class="val">${escapeHtml(STATUS_LABELS[state.status] || '—')}</span></div>
      <div class="pdf-meta-item"><span class="lbl">МЕСТО ПРОВЕДЕНИЯ</span><span class="val">${escapeHtml(state.venue || '—')}</span></div>
      <div class="pdf-meta-item"><span class="lbl">ВРЕМЯ</span><span class="val">${state.durationHours ? escapeHtml(String(state.durationHours)) + ' ч' : '—'}</span></div>
    </div>

    <div class="pdf-section">
      <h2 class="title-finances pdf-row">ФИНАНСЫ</h2>
      <div class="pdf-fin pdf-row">
        <div class="pdf-fin-row"><span>Предоплата</span><span>${fmtMoney(prepaid)} руб</span></div>
        ${(state.income.prepayments || []).map(p => `<div class="pdf-fin-row sub"><span>— ${escapeHtml(fmtDate(p.date) || 'без даты')} (${payLabel(p.paymentMethod)})</span><span>${fmtMoney(Number(p.amount) || 0)} руб</span></div>`).join('')}
        <div class="pdf-fin-row"><span>Постоплата</span><span>${fmtMoney(postpaid)} руб</span></div>
        ${(state.income.postpayments || []).map(p => `<div class="pdf-fin-row sub"><span>— ${escapeHtml(fmtDate(p.date) || 'без даты')} (${payLabel(p.paymentMethod)})</span><span>${fmtMoney(Number(p.amount) || 0)} руб</span></div>`).join('')}
        <div class="pdf-fin-row total"><span>Общий доход</span><span>${fmtMoney(totalIncome)} руб</span></div>
        <div class="pdf-fin-row"><span>Расход</span><span>${fmtMoney(totalExpense)} руб</span></div>
        <div class="pdf-fin-row total ${profit >= 0 ? 'pos' : 'neg'}"><span>Прибыль</span><span>${fmtMoney(profit)} руб</span></div>
      </div>
    </div>

    <div class="pdf-section">
      <h2 class="title-expenses pdf-row">Расходы</h2>
      ${buildPdfExpenseRows()}
    </div>

    <div class="pdf-section">
      <h2 class="title-section pdf-row">ЧЕК-ЛИСТЫ И ЗАМЕТКИ</h2>
      ${buildPdfChecklistRows()}
      ${buildPdfNotesRows()}
    </div>

    <div class="pdf-section">
      <h2 class="title-section pdf-row">РЕЗУЛЬТАТЫ СОБЫТИЯ</h2>
      ${buildPdfResultRows()}
    </div>

    <div class="pdf-footer pdf-row">«Без границ» · Студия декора и флористики</div>
  </div>`;
}

/**
 * Делит один длинный canvas-снимок шаблона на страницы A4, не разрезая ни одну
 * строку (.pdf-row) пополам: если граница страницы попадает внутрь строки,
 * страница обрывается перед этой строкой, а строка целиком уходит на следующую.
 */
function sliceCanvasToPdfPages(canvas, rootEl) {
  const scale = canvas.width / rootEl.offsetWidth;
  const rows = $$('.pdf-row', rootEl)
    .map(el => ({ top: el.offsetTop, bottom: el.offsetTop + el.offsetHeight }))
    .sort((a, b) => a.top - b.top);
  const totalHeight = rootEl.offsetHeight;

  const ranges = [];
  let cutTop = 0;
  while (cutTop < totalHeight - 1) {
    const idealBottom = Math.min(cutTop + PDF_PAGE_H_PX, totalHeight);
    const breaking = rows.find(r => r.top < idealBottom && r.bottom > idealBottom);
    let cutBottom = breaking && breaking.top > cutTop ? breaking.top : idealBottom;
    if (cutBottom <= cutTop) cutBottom = idealBottom; // строка выше страницы целиком — не зависаем
    ranges.push({ top: cutTop, bottom: cutBottom });
    cutTop = cutBottom;
  }

  return ranges.map(({ top, bottom }, i) => {
    const heightPx = bottom - top;
    const slice = document.createElement('canvas');
    slice.width = canvas.width;
    slice.height = Math.round(heightPx * scale);
    slice.getContext('2d').drawImage(
      canvas, 0, Math.round(top * scale), canvas.width, slice.height,
      0, 0, canvas.width, slice.height
    );
    return { canvas: slice, heightPx };
  });
}

async function exportPDF() {
  const root = $('#pdfExportRoot');
  try {
    buildPdfTemplate();

    const imgs = $$('img', root);
    await Promise.all(imgs.map(img => img.complete
      ? Promise.resolve()
      : new Promise(res => { img.onload = res; img.onerror = res; })));

    if (typeof html2canvas !== 'function' || !window.jspdf) {
      throw new Error('Библиотеки html2canvas/jsPDF не загрузились — нужен интернет (они подгружаются с CDN).');
    }

    const canvas = await html2canvas(root, { scale: 2, backgroundColor: currentThemeBgColor(), useCORS: true });
    const pages = sliceCanvasToPdfPages(canvas, root);

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    const mmPerPx = PDF_PAGE_H_MM / PDF_PAGE_H_PX;

    pages.forEach((page, i) => {
      if (i > 0) doc.addPage();
      const heightMm = page.heightPx * mmPerPx;
      doc.addImage(page.canvas.toDataURL('image/jpeg', 0.92), 'JPEG', PDF_MARGIN_MM, PDF_MARGIN_MM, PDF_PAGE_W_MM, heightMm);
      // номер страницы — в поле страницы, ниже картинки; без кириллицы, т.к. встроенные шрифты jsPDF её не знают
      doc.setFontSize(9);
      doc.setTextColor(140);
      doc.text(`${i + 1} / ${pages.length}`, 297 - PDF_MARGIN_MM, 210 - 4, { align: 'right' });
    });

    doc.save(`report_${state.date || 'nodate'}_${slug(state.title)}.pdf`);
  } catch (err) {
    console.error(err);
    alert('Не удалось сформировать PDF: ' + err.message +
      '\n\nЕсли страница открыта двойным кликом (file://) без интернета — проверьте подключение: библиотеки для PDF грузятся с CDN.');
  } finally {
    root.innerHTML = '';
  }
}

/* ====================================================================
   JSON: экспорт / импорт
   ==================================================================== */
function buildSnapshot(label) {
  const totalPrepaid = getTotalPrepaid(state.income);
  const totalPostpaid = getTotalPostpaid(state.income);
  const totalIncome = totalPrepaid + totalPostpaid;
  return {
    schemaVersion: SCHEMA_VERSION,
    exportedAt: new Date().toISOString(),
    label: label || `${state.title || 'Проект'} — ${fmtDate(state.date) || 'без даты'}`,
    report: {
      date: state.date,
      title: state.title,
      eventType: state.eventType,
      status: state.status,
      venue: state.venue || '',
      durationHours: state.durationHours || '',
      budgetSource: state.budgetSource,
      budgetLink: state.budgetLink || '',
      presentation: state.presentation,
      photosUrl: state.photosUrl,
      expenses: state.expenses.map(e => ({ id: e.id, title: e.title, amount: Number(e.amount) || 0, currency: e.currency || 'руб', isCustom: !!e.isCustom, contractorId: e.contractorId || '', zone: e.zone || '', description: e.description || '', qty: Number(e.qty) || 1, price: Number(e.price) || 0 })),
      income: {
        prepayments: (state.income.prepayments || []).map(p => ({ id: p.id, amount: Number(p.amount) || 0, date: p.date || '', paymentMethod: p.paymentMethod === 'cashless' ? 'cashless' : 'cash' })),
        postpayments: (state.income.postpayments || []).map(p => ({ id: p.id, amount: Number(p.amount) || 0, date: p.date || '', paymentMethod: p.paymentMethod === 'cashless' ? 'cashless' : 'cash' })),
        prepaid: totalPrepaid, // для обратной совместимости со старым плоским форматом
        postpaid: totalPostpaid, // для обратной совместимости со старым плоским форматом
        total: totalIncome,
      },
      checklist: state.checklist.map(c => ({ id: c.id, text: c.text, done: !!c.done })),
      notes: (state.notes || []).map(n => ({ id: n.id, date: n.date || '', text: n.text || '' })),
      results: state.results.map(r => ({ id: r.id, type: r.type, category: r.category, text: r.text })),
    },
    contractors: state.contractors,
  };
}

function exportJSON() {
  const snap = buildSnapshot();
  const blob = new Blob([JSON.stringify(snap, null, 2)], { type: 'application/json' });
  download(`report_${state.date || 'nodate'}_${slug(state.title)}.json`, blob);
}

function loadReportFromSnapshot(snap) {
  if (!snap || !snap.report) throw new Error('Неверный формат JSON: нет поля report');
  const r = snap.report;
  const prevContr = Array.isArray(state.contractors) ? state.contractors.slice() : []; // сохранить текущий каталог
  const reportContr = (r.contractors || snap.contractors || []).map(c => ({ id: c.id || uid(), name: c.name || '', phone: c.phone || '', responsible: c.responsible || '', paymentMethod: c.paymentMethod || 'cash', account: c.account || '' }));
  state = {
    date: r.date || '',
    title: r.title || '',
    eventType: r.eventType || '',
    status: r.status || 'planned',
    venue: r.venue || '',
    durationHours: r.durationHours || '',
    budgetSource: r.budgetSource || '',
    budgetLink: r.budgetLink || '',
    presentation: r.presentation || { url: '' },
    photosUrl: r.photosUrl || '',
    expenses: Array.isArray(r.expenses) && r.expenses.length
      ? r.expenses.map(e => ({ id: e.id || uid(), title: e.title, amount: Number(e.amount) || 0, currency: e.currency || 'руб', isCustom: !!e.isCustom, contractorId: e.contractorId || '', zone: e.zone || '', description: e.description || '', qty: Number(e.qty) || 1, price: Number(e.price) || 0 }))
      : DEFAULT_EXPENSE_TITLES.map(t => ({ id: uid(), title: t, amount: 0, currency: 'руб', isCustom: false, zone: '', description: '', qty: 1, price: 0 })),
    income: parseIncomeIn(r.income),
    checklist: (r.checklist || []).map(c => ({ id: c.id || uid(), text: c.text, done: !!c.done })),
    notes: parseNotesIn(r.notes, r.date),
    results: (r.results || []).map(x => ({ id: x.id || uid(), type: x.type, category: x.category, text: x.text })),
    contractors: mergeContractors(prevContr, reportContr), // каталог НЕ затирается, а объединяется
    projectBaseId: '', // обычный импорт JSON не привязывает проект к «Базе проектов» —
                        // связь явно проставляет openProjectFromBase() при открытии из базы
  };
  // Убедимся, что у каждого расхода есть contractorId
  state.expenses.forEach(e => { if (!e.contractorId) e.contractorId = ''; });
  saveContrDir();
  renderAll(); saveLS();
}

function importJSONFile(file) {
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      const snap = JSON.parse(ev.target.result);
      loadReportFromSnapshot(snap);
      switchMode('report');
      alert('Проект загружен: ' + (snap.label || file.name));
    } catch (err) { console.error(err); alert('Ошибка чтения JSON: ' + err.message); }
  };
  reader.readAsText(file);
}

/* ====================================================================
   РЕЖИМ «ДИНАМИКА»
   ==================================================================== */
function importDynJSON(files) {
  let pending = files.length;
  if (!pending) return;
  Array.from(files).forEach(file => {
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const snap = JSON.parse(ev.target.result);
        if (snap && snap.report) history.push(normalizeReport(snap.report, snap.label || file.name, snap.contractors));
        else if (Array.isArray(snap.reports)) snap.reports.forEach(r => history.push(normalizeReport(r)));
        else throw new Error('не найдено поле report');
      } catch (err) { console.error(err); alert(`${file.name}: ${err.message}`); }
      finally {
        if (--pending === 0) { monthChartYearFilter = null; renderDynamics(); }
      }
    };
    reader.readAsText(file);
  });
}

function normalizeReport(r, label, contractors) {
  const incomeState = parseIncomeIn(r.income);
  const prepaid = getTotalPrepaid(incomeState);
  const postpaid = getTotalPostpaid(incomeState);
  const income = prepaid + postpaid;
  const expense = (r.expenses || []).reduce((s, e) => s + (Number(e.amount) || 0), 0);
  return {
    label: label || r.title || 'Без названия',
    date: r.date || '',
    title: r.title || '',
    eventType: r.eventType || 'Другое',
    status: r.status || 'planned',
    expenses: r.expenses || [],
    contractors: contractors || [],
    income, expense, profit: income - expense,
    };
}

/* ====================================================================
   ПОДРЯДЧИКИ
   ==================================================================== */
function renderContractors() {
  const tbody = $('#contrBody');
  const empty = $('#contrEmpty');
  tbody.innerHTML = '';
  state.contractors.forEach(c => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${escapeHtml(c.name)}</td>
      <td>${escapeHtml(c.phone)}</td>
      <td>${escapeHtml(c.responsible)}</td>
      <td>${escapeHtml(CONTRACTOR_PAY_LABELS[c.paymentMethod] || c.paymentMethod)}</td>
      <td>${escapeHtml(c.account)}</td>
      <td><button class="btn small del-contr" data-id="${c.id}">×</button></td>`;
    tbody.appendChild(tr);
  });
  empty.hidden = state.contractors.length > 0;
  updateContrCountInfo();
  // наполняем мультиселект в динамике
  const allContr = {};
  history.forEach(h => (h.contractors || []).forEach(c => { allContr[c.id] = c; }));
  (state.contractors || []).forEach(c => { allContr[c.id] = c; });
  const savedIds = getSelectedContrIds();
  populateContrMs(Object.values(allContr));
  setContrMsSelected(savedIds);
  // обновляем селекты в таблице расходов (если видны)
  renderExpenses();
}

function addContractor(data) {
  const c = { id: uid(), name: data.name.trim(), phone: data.phone.trim(), responsible: data.responsible.trim(), paymentMethod: data.paymentMethod, account: data.account.trim() };
  state.contractors.push(c);
  renderContractors(); saveContrDir(); saveLS();
}
function deleteContractor(id) {
  state.contractors = state.contractors.filter(c => c.id !== id);
  state.expenses.forEach(e => { if (e.contractorId === id) e.contractorId = ''; });
  renderContractors(); saveContrDir(); saveLS();
}

/* ====================================================================
   Multi-select (подрядчики) — кастомный виджет с чекбоксами
   ==================================================================== */
function getSelectedContrIds() {
  const list = $('#contrMsList');
  if (!list) return [];
  const checked = list.querySelectorAll('input[type=checkbox]:checked');
  return Array.from(checked).map(cb => cb.value).filter(v => v);
}
function updateContrMsTrigger() {
  const ids = getSelectedContrIds();
  const list = $('#contrMsList');
  if (!list) return;
  const total = list.querySelectorAll('input[type=checkbox]').length;
  const trigger = $('#contrMsTrigger');
  if (ids.length === 0 || ids.length === total) {
    const allCb = $('#contrMsDrop .ms-all input');
    if (allCb) allCb.checked = true;
    trigger.textContent = 'Все подрядчики ▾';
  } else {
    const allCb = $('#contrMsDrop .ms-all input');
    if (allCb) allCb.checked = false;
    trigger.textContent = `Подрядчиков: ${ids.length} ▾`;
  }
}
function populateContrMs(contrList) {
  const list = $('#contrMsList');
  if (!list) return;
  list.innerHTML = contrList.map(c =>
    `<label><input type="checkbox" value="${c.id}" /> ${escapeHtml(c.name)}</label>`
  ).join('');
  updateContrMsTrigger();
}
function setContrMsSelected(ids) {
  const list = $('#contrMsList');
  if (!list) return;
  const allCb = $('#contrMsDrop .ms-all input');
  if (ids.length === 0) { if (allCb) allCb.checked = true; }
  else { if (allCb) allCb.checked = false; }
  list.querySelectorAll('input[type=checkbox]').forEach(cb => {
    cb.checked = ids.includes(cb.value);
  });
  updateContrMsTrigger();
}
function initContrMs() {
  const wrap = $('#contrMsWrap');
  if (!wrap) return;
  const trigger = $('#contrMsTrigger');
  const drop = $('#contrMsDrop');
  if (!trigger || !drop) return;
  trigger.addEventListener('click', e => { e.stopPropagation(); drop.hidden = !drop.hidden; });
  const allCb = drop.querySelector('.ms-all input');
  if (allCb) allCb.addEventListener('change', function() {
    const checked = this.checked;
    const list = $('#contrMsList');
    if (list) list.querySelectorAll('input[type=checkbox]').forEach(cb => { cb.checked = checked; });
    updateContrMsTrigger();
    renderContrAnalytics();
  });
  const list = $('#contrMsList');
  if (list) list.addEventListener('change', e => {
    const cb = e.target.closest('input[type=checkbox]');
    if (!cb) return;
    updateContrMsTrigger();
    renderContrAnalytics();
  });
  document.addEventListener('click', e => {
    if (!wrap.contains(e.target)) drop.hidden = true;
  });
}

function renderContrAnalytics() {
  const resultsEl = $('#dynContrAnalResults');

  Object.values(contrCharts).forEach(c => c && c.destroy());
  contrCharts = {};

  // Собираем подрядчиков из истории + текущего
  const allContractors = {};
  history.forEach(h => (h.contractors || []).forEach(c => { allContractors[c.id] = c; }));
  (state.contractors || []).forEach(c => { allContractors[c.id] = c; });
  const contrList = Object.values(allContractors);

  // Наполняем чекбоксы (с сохранением выбора)
  const savedIds = getSelectedContrIds();
  populateContrMs(contrList);
  setContrMsSelected(savedIds);
  const filterIds = getSelectedContrIds();
  const hasContrFilter = filterIds.length > 0;

  // Собираем все расходы
  const allExpenses = [];
  history.forEach(h => (h.expenses || []).forEach(ex => {
    if (ex.contractorId) allExpenses.push({ contractorId: ex.contractorId, title: ex.title, amount: Number(ex.amount) || 0 });
  }));
  state.expenses.forEach(ex => {
    if (ex.contractorId) allExpenses.push({ contractorId: ex.contractorId, title: ex.title, amount: Number(ex.amount) || 0 });
  });

  // Фильтруем расходы по выбранным подрядчикам (если выбраны)
  const workingExpenses = hasContrFilter ? allExpenses.filter(ex => filterIds.includes(ex.contractorId)) : allExpenses;

  if (!workingExpenses.length) { resultsEl.innerHTML = '<p class="muted">Нет данных с привязкой к выбранным подрядчикам.</p>'; return; }

  // Группировка
  const contrMap = {};
  contrList.forEach(c => { contrMap[c.id] = c.name; });
  const byContr = {};
  const byTitle = {};
  workingExpenses.forEach(ex => {
    if (!byContr[ex.contractorId]) byContr[ex.contractorId] = { total: 0, count: 0, items: {} };
    byContr[ex.contractorId].total += ex.amount;
    byContr[ex.contractorId].count++;
    if (!byContr[ex.contractorId].items[ex.title]) byContr[ex.contractorId].items[ex.title] = { total: 0, count: 0 };
    byContr[ex.contractorId].items[ex.title].total += ex.amount;
    byContr[ex.contractorId].items[ex.title].count++;
    if (!byTitle[ex.title]) byTitle[ex.title] = { total: 0, count: 0, contractors: {} };
    byTitle[ex.title].total += ex.amount;
    byTitle[ex.title].count++;
    if (!byTitle[ex.title].contractors[ex.contractorId]) byTitle[ex.title].contractors[ex.contractorId] = { total: 0, count: 0 };
    byTitle[ex.title].contractors[ex.contractorId].total += ex.amount;
    byTitle[ex.title].contractors[ex.contractorId].count++;
  });

  // Заполняем фильтр наименований (адаптирован под выбранных подрядчиков)
  const itemFilter = $('#dynContrItemFilter');
  const prevItem = itemFilter.value;
  itemFilter.innerHTML = '<option value="">Все наименования</option>' +
    Object.keys(byTitle).sort().map(t => `<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`).join('');
  itemFilter.value = prevItem && byTitle[prevItem] ? prevItem : '';

  const filterItem = itemFilter.value;
  const { txtColor, gridColor } = chartThemeColors();

  function addChartBox(id, height) {
    const existing = document.getElementById(id);
    if (existing) existing.remove();
    const box = document.createElement('div');
    box.id = id;
    box.style.cssText = `position:relative;width:100%;height:${height || 300}px;max-height:${height || 300}px;margin-bottom:16px`;
    const canvas = document.createElement('canvas');
    box.appendChild(canvas);
    resultsEl.appendChild(box);
    return canvas;
  }
  function contrChartOpts(txtColor, gridColor) {
    return { responsive: true, maintainAspectRatio: false, ...chartOpts(txtColor, gridColor) };
  }

  // ======== Рендерим ========
  if (hasContrFilter && !filterItem) {
    // --- Выбраны подрядчики, все наименования ---
    const totalSum = Object.values(byContr).reduce((s, d) => s + d.total, 0);
    const totalCount = Object.values(byContr).reduce((s, d) => s + d.count, 0);

    resultsEl.innerHTML = `
      <div style="display:flex;gap:24px;flex-wrap:wrap;margin-bottom:16px">
        <div><span class="muted">Подрядчики</span><br><strong style="font-size:22px">${filterIds.length}</strong></div>
        <div><span class="muted">Проектов</span><br><strong style="font-size:22px">${totalCount}</strong></div>
        <div><span class="muted">Общая сумма</span><br><strong style="font-size:22px;color:var(--pos)">${fmtMoney(totalSum)}</strong></div>
      </div><div id="contrChart_multi_wrap" style="display:flex;gap:24px;flex-wrap:wrap"></div>`;

    const mwrap = $('#contrChart_multi_wrap');
    const sorted = filterIds.map(id => [id, byContr[id]]).filter(([, d]) => d).sort((a, b) => b[1].total - a[1].total);

    // Bar: общая стоимость по подрядчикам
    const c1 = document.createElement('div');
    c1.style.cssText = 'flex:1 1 350px;min-width:280px;height:360px;position:relative';
    const cv1 = document.createElement('canvas');
    cv1.id = 'contrChart_multi'; c1.appendChild(cv1); mwrap.appendChild(c1);
    contrCharts.multi = new Chart(cv1, {
      type: 'bar',
      data: {
        labels: sorted.map(([id]) => contrMap[id] || id.slice(0, 6)),
        datasets: [{ label: 'Сумма, руб', data: sorted.map(([, d]) => d.total), backgroundColor: palette(sorted.length) }],
      },
      options: {
        ...contrChartOpts(txtColor, gridColor),
        indexAxis: 'y',
        scales: { x: { ticks: { color: txtColor }, grid: { color: gridColor } }, y: { ticks: { color: txtColor }, grid: { color: gridColor } } },
        plugins: { legend: { display: false }, title: { display: true, text: 'Общая стоимость', color: txtColor } },
      },
    });

    // Bar: % доля стоимости в проектах
    const c2 = document.createElement('div');
    c2.style.cssText = 'flex:1 1 350px;min-width:280px;height:360px;position:relative';
    const cv2 = document.createElement('canvas');
    cv2.id = 'contrChart_multi_pct'; c2.appendChild(cv2); mwrap.appendChild(c2);
    contrCharts.multiPct = new Chart(cv2, {
      type: 'bar',
      data: {
        labels: sorted.map(([id]) => contrMap[id] || id.slice(0, 6)),
        datasets: [{
          label: '% доли',
          data: sorted.map(([, d]) => +(d.total / totalSum * 100).toFixed(1)),
          backgroundColor: palette(sorted.length),
        }],
      },
      options: {
        ...contrChartOpts(txtColor, gridColor),
        indexAxis: 'y',
        scales: { x: { ticks: { color: txtColor, callback: v => v + '%' }, grid: { color: gridColor }, max: 100 }, y: { ticks: { color: txtColor }, grid: { color: gridColor } } },
        plugins: { legend: { display: false }, title: { display: true, text: 'Доля от общей суммы, %', color: txtColor }, tooltip: { callbacks: { label: ctx => ctx.parsed.x + '%' } } },
      },
    });

    // Если есть хотя бы 2 наименования — горизонтальный bar по наименованиям
    if (Object.keys(byTitle).length > 1) {
      const byTitleSorted = Object.entries(byTitle).sort((a, b) => b[1].total - a[1].total);
      const c3 = document.createElement('div');
      c3.style.cssText = 'flex:1 1 450px;min-width:300px;height:360px;position:relative';
      const cv3 = document.createElement('canvas');
      cv3.id = 'contrChart_multi_titles'; c3.appendChild(cv3); mwrap.appendChild(c3);
      contrCharts.multiTitles = new Chart(cv3, {
        type: 'bar',
        data: {
          labels: byTitleSorted.map(([t]) => t),
          datasets: [{ label: 'Сумма, руб', data: byTitleSorted.map(([, d]) => d.total), backgroundColor: palette(byTitleSorted.length) }],
        },
        options: {
          ...contrChartOpts(txtColor, gridColor),
          indexAxis: 'y',
          scales: { x: { ticks: { color: txtColor }, grid: { color: gridColor } }, y: { ticks: { color: txtColor }, grid: { color: gridColor } } },
          plugins: { legend: { display: false }, title: { display: true, text: 'По наименованиям (сумма)', color: txtColor } },
        },
      });
    }
  } else if (!hasContrFilter && filterItem) {
    // --- Одно наименование, все подрядчики ---
    const data = byTitle[filterItem];
    if (!data) { resultsEl.innerHTML = '<p class="muted">Нет данных по наименованию.</p>'; return; }
    resultsEl.innerHTML = `
      <div style="display:flex;gap:24px;flex-wrap:wrap;margin-bottom:16px">
        <div><span class="muted">Наименование</span><br><strong style="font-size:22px">${escapeHtml(filterItem)}</strong></div>
        <div><span class="muted">Проектов</span><br><strong style="font-size:22px">${data.count}</strong></div>
        <div><span class="muted">Общая сумма</span><br><strong style="font-size:22px;color:var(--pos)">${fmtMoney(data.total)}</strong></div>
        <div><span class="muted">Средняя</span><br><strong style="font-size:22px">${fmtMoney(data.total/data.count)}</strong></div>
      </div>`;
    const contractors = Object.entries(data.contractors).sort((a, b) => b[1].total - a[1].total);
    const canvas = addChartBox('contrChart_item', Math.min(50 * contractors.length + 40, 400));
    contrCharts.item = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: contractors.map(([cid]) => contrMap[cid] || cid.slice(0, 6)),
        datasets: [{ label: 'Сумма, руб', data: contractors.map(([, d]) => d.total), backgroundColor: palette(contractors.length) }],
      },
      options: {
        ...contrChartOpts(txtColor, gridColor),
        indexAxis: 'y',
        scales: { x: { ticks: { color: txtColor }, grid: { color: gridColor } }, y: { ticks: { color: txtColor }, grid: { color: gridColor } } },
        plugins: { legend: { display: false } },
      },
    });
  } else if (hasContrFilter && filterItem) {
    // --- Конкретные подрядчики + конкретное наименование ---
    const contrNames = filterIds.map(id => contrMap[id]).filter(Boolean);
    const data = byTitle[filterItem];
    if (!data) { resultsEl.innerHTML = '<p class="muted">Нет данных.</p>'; return; }
    resultsEl.innerHTML = `
      <div style="display:flex;gap:24px;flex-wrap:wrap;margin-bottom:16px">
        <div><span class="muted">Подрядчики</span><br><strong style="font-size:22px">${contrNames.map(escapeHtml).join(', ')}</strong></div>
        <div><span class="muted">Наименование</span><br><strong style="font-size:22px">${escapeHtml(filterItem)}</strong></div>
        <div><span class="muted">Кол-во</span><br><strong style="font-size:22px">${data.count}</strong></div>
        <div><span class="muted">Общая сумма</span><br><strong style="font-size:22px;color:var(--pos)">${fmtMoney(data.total)}</strong></div>
        <div><span class="muted">Средняя</span><br><strong style="font-size:22px">${fmtMoney(data.total/data.count)}</strong></div>
      </div>`;
  } else {
    // --- Все подрядчики, все наименования (полный обзор) ---
    const sorted = Object.entries(byContr).sort((a, b) => b[1].total - a[1].total);
    const totalSum = sorted.reduce((s, [, d]) => s + d.total, 0);
    const totalCount = sorted.reduce((s, [, d]) => s + d.count, 0);
    resultsEl.innerHTML = `
      <div style="display:flex;gap:24px;flex-wrap:wrap;margin-bottom:16px">
        <div><span class="muted">Всего подрядчиков</span><br><strong style="font-size:22px">${sorted.length}</strong></div>
        <div><span class="muted">Всего проектов</span><br><strong style="font-size:22px">${totalCount}</strong></div>
        <div><span class="muted">Общая сумма</span><br><strong style="font-size:22px;color:var(--pos)">${fmtMoney(totalSum)}</strong></div>
      </div><div id="contrChart_wrapper" style="display:flex;gap:24px;flex-wrap:wrap"></div>`;
    const wrapper = $('#contrChart_wrapper');
    const top = sorted.slice(0, 10);
    const c1 = document.createElement('div');
    c1.style.cssText = 'flex:1 1 400px;min-width:300px;height:360px;position:relative';
    const canvas1 = document.createElement('canvas');
    canvas1.id = 'contrChart_overview';
    c1.appendChild(canvas1);
    wrapper.appendChild(c1);
    contrCharts.overview = new Chart(canvas1, {
      type: 'bar',
      data: {
        labels: top.map(([cid]) => contrMap[cid] || cid.slice(0, 6)),
        datasets: [{ label: 'Сумма, руб', data: top.map(([, d]) => d.total), backgroundColor: palette(top.length) }],
      },
      options: {
        ...contrChartOpts(txtColor, gridColor),
        indexAxis: 'y',
        scales: { x: { ticks: { color: txtColor }, grid: { color: gridColor } }, y: { ticks: { color: txtColor }, grid: { color: gridColor } } },
        plugins: { legend: { display: false }, title: { display: true, text: 'Топ подрядчиков по сумме', color: txtColor } },
      },
    });
    const byTitleSorted = Object.entries(byTitle).sort((a, b) => b[1].total - a[1].total);
    const c2 = document.createElement('div');
    c2.style.cssText = 'flex:1 1 400px;min-width:300px;height:360px;position:relative';
    const canvas2 = document.createElement('canvas');
    canvas2.id = 'contrChart_titles';
    c2.appendChild(canvas2);
    wrapper.appendChild(c2);
    contrCharts.titles = new Chart(canvas2, {
      type: 'bar',
      data: {
        labels: byTitleSorted.map(([t]) => t),
        datasets: [{ label: 'Сумма, руб', data: byTitleSorted.map(([, d]) => d.total), backgroundColor: palette(byTitleSorted.length) }],
      },
      options: {
        ...contrChartOpts(txtColor, gridColor),
        indexAxis: 'y',
        scales: { x: { ticks: { color: txtColor }, grid: { color: gridColor } }, y: { ticks: { color: txtColor }, grid: { color: gridColor } } },
        plugins: { legend: { display: false }, title: { display: true, text: 'Сводка по наименованиям', color: txtColor } },
      },
    });
  }
}

function renderDynamics() {
  $('#dynCount').textContent = `Загружено: ${history.length}`;

  // KPI по всем загруженным отчётам
  const income = history.reduce((s, r) => s + (r.income || 0), 0);
  const expense = history.reduce((s, r) => s + (r.expense || 0), 0);
  const profit = income - expense;
  $('#kpiCount').textContent = history.length;
  $('#kpiIncome').innerHTML = `${fmtMoney(income)} <span class="cur">руб</span>`;
  $('#kpiExpense').innerHTML = `${fmtMoney(expense)} <span class="cur">руб</span>`;
  const profitEl = $('#kpiProfit');
  profitEl.innerHTML = `${fmtMoney(profit)} <span class="cur">руб</span>`;
  profitEl.closest('.kpi-card').classList.toggle('pos', profit >= 0);
  profitEl.closest('.kpi-card').classList.toggle('neg', profit < 0);

  renderDynTable();
  const empty = $('#dynEmpty');
  const grid = $('#dynGrid');
  if (history.length === 0) {
    Object.values(charts).forEach(c => c && c.destroy());
    charts = {};
    if (empty) empty.hidden = false;
    if (grid) grid.hidden = true;
    return;
  }
  if (empty) empty.hidden = true;
  if (grid) grid.hidden = false;
  renderCharts();
  renderContrAnalytics();
}

function renderDynTable() {
  const tbody = $('#dynTable tbody');
  tbody.innerHTML = '';
  const sorted = [...history].sort((a, b) => (a.date || '').localeCompare(b.date || ''));
  sorted.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${fmtDate(r.date)}</td>
      <td>${escapeHtml(r.title)}</td>
      <td>${escapeHtml(r.eventType)}</td>
      <td>${escapeHtml(STATUS_LABELS[r.status] || r.status)}</td>
      <td>${fmtMoney(r.income)}</td>
      <td>${fmtMoney(r.expense)}</td>
      <td style="color:${r.profit >= 0 ? 'var(--pos)' : 'var(--neg)'}">${fmtMoney(r.profit)}</td>`;
    tbody.appendChild(tr);
  });
}

let dynIEMetric = 'all';      // 'income' | 'profit' | 'expense' | 'all' — что показывает график
let dynIEUnits = 'currency';  // 'currency' | 'percent' — в рублях или в % от дохода периода
const IE_NEUTRAL_COLOR = '#7a8cff'; // цвет «Прибыли», когда она показана ВМЕСТЕ с доходом/расходом (не по знаку +/-)

/** График «Доход/Расход/Прибыль по месяцам» (показатель выбирается в select, единицы —
    переключателем ₽/%) с drill-down по годам: если в выборке встречаются разные года —
    сначала рисуем свёрнутый график по годам (клик по столбцу года «открывает» его —
    показывает месяцы только этого года + кнопку возврата). Если год всего один — сразу
    показываем месяцы.
    В режиме «%» за 100% берётся ДОХОД периода (сумма по всем проектам периода): расход —
    его доля от дохода (как принято говорить «расходы — 70% от выручки»; может быть больше
    100%, если период в убытке), прибыль — остаток (100% − расход%, может уйти в минус).
    Доли считаются по суммам периода целиком, а не усреднением % отдельных проектов —
    иначе крупные и мелкие проекты искажали бы картину. */
function renderMonthProfitChart(canvasEl, txtColor, gridColor, posColor, negColor) {
  const byMonth = {};
  history.forEach(r => {
    const m = (r.date || '').slice(0, 7) || '—';
    if (!byMonth[m]) byMonth[m] = { income: 0, expense: 0 };
    byMonth[m].income += (r.income || 0);
    byMonth[m].expense += (r.expense || 0);
  });
  const years = [...new Set(Object.keys(byMonth).map(m => m.slice(0, 4)).filter(Boolean))].sort();
  // если выбранный ранее год исчез из текущей выборки — сбрасываем drill-down
  if (monthChartYearFilter && !years.includes(monthChartYearFilter)) monthChartYearFilter = null;

  const periodEl = $('#chartMonthPeriod');
  const backBtn = $('#monthChartBackBtn');
  const showYearsView = years.length > 1 && !monthChartYearFilter;
  if (backBtn) backBtn.hidden = !(years.length > 1 && monthChartYearFilter);

  const isPercent = dynIEUnits === 'percent';
  const unitSuffix = isPercent ? ', % от дохода' : ', руб';
  const showIncome = dynIEMetric === 'income' || dynIEMetric === 'all';
  const showExpense = dynIEMetric === 'expense' || dynIEMetric === 'all';
  const showProfit = dynIEMetric === 'profit' || dynIEMetric === 'all';
  const profitAlone = dynIEMetric === 'profit'; // единственный показатель — красим по знаку +/-, как раньше

  function buildDatasets(labels, sumsByLabel) {
    const sums = labels.map(l => sumsByLabel[l] || { income: 0, expense: 0 });
    const expensePct = s => (s.income > 0 ? Math.round((s.expense / s.income) * 1000) / 10 : 0);
    const incomeData = isPercent ? sums.map(() => 100) : sums.map(s => s.income);
    const expenseData = isPercent ? sums.map(s => expensePct(s)) : sums.map(s => s.expense);
    const profitData = isPercent ? sums.map(s => Math.round((100 - expensePct(s)) * 10) / 10) : sums.map(s => s.income - s.expense);
    const datasets = [];
    if (showIncome) datasets.push({ label: `Доход${unitSuffix}`, data: incomeData, backgroundColor: posColor });
    if (showExpense) datasets.push({ label: `Расход${unitSuffix}`, data: expenseData, backgroundColor: negColor });
    if (showProfit) datasets.push({
      label: `Прибыль${unitSuffix}`, data: profitData,
      backgroundColor: profitAlone ? profitData.map(v => v < 0 ? negColor : posColor) : IE_NEUTRAL_COLOR,
    });
    return datasets;
  }

  if (showYearsView) {
    const byYear = {};
    Object.keys(byMonth).forEach(m => {
      const y = m.slice(0, 4) || '—';
      if (!byYear[y]) byYear[y] = { income: 0, expense: 0 };
      byYear[y].income += byMonth[m].income;
      byYear[y].expense += byMonth[m].expense;
    });
    const yearLabels = Object.keys(byYear).sort();
    if (periodEl) periodEl.textContent = 'по годам';
    charts.month = new Chart(canvasEl, {
      type: 'bar',
      data: { labels: yearLabels, datasets: buildDatasets(yearLabels, byYear) },
      options: {
        ...chartOpts(txtColor, gridColor, isPercent),
        onClick: (evt, elements) => {
          if (!elements.length) return;
          monthChartYearFilter = yearLabels[elements[0].index];
          renderCharts();
        },
        onHover: (evt, elements, chart) => { chart.canvas.style.cursor = elements.length ? 'pointer' : 'default'; },
      },
    });
    return;
  }

  const monthKeys = monthChartYearFilter ? Object.keys(byMonth).filter(m => m.startsWith(monthChartYearFilter)) : Object.keys(byMonth);
  const months = monthKeys.sort();
  if (periodEl) periodEl.textContent = monthChartYearFilter ? `по месяцам — ${monthChartYearFilter}` : 'по месяцам';
  charts.month = new Chart(canvasEl, {
    type: 'bar',
    data: { labels: months, datasets: buildDatasets(months, byMonth) },
    options: chartOpts(txtColor, gridColor, isPercent),
  });
}

function renderCharts() {
  Object.values(charts).forEach(c => c && c.destroy());
  charts = {};
  const c1 = $('#chartMonth'), c2 = $('#chartType'), c3 = $('#chartStatus'), c4 = $('#chartExpenses');
  const { txtColor, gridColor, posColor, negColor } = chartThemeColors();

  // 1) По месяцам: прибыль (убыточные — красным). Если в выборке несколько разных
  // лет — сначала показываем свёрнутый график по годам (см. renderMonthProfitChart).
  renderMonthProfitChart(c1, txtColor, gridColor, posColor, negColor);

  // 2) По типам праздника: кол-во и прибыль
  const byType = {};
  history.forEach(r => { byType[r.eventType] = byType[r.eventType] || { count: 0, profit: 0 }; byType[r.eventType].count++; byType[r.eventType].profit += r.profit; });
  const types = Object.keys(byType);
  charts.type = new Chart(c2, {
    type: 'doughnut',
    data: { labels: types, datasets: [{ data: types.map(t => byType[t].count), backgroundColor: palette(types.length) }] },
    options: { ...chartOpts(txtColor, gridColor), plugins: { legend: { labels: { color: txtColor, position: 'right' } } } },
  });

  // 3) По статусам
  const byStatus = {};
  history.forEach(r => { const k = STATUS_LABELS[r.status] || r.status; byStatus[k] = (byStatus[k] || 0) + 1; });
  const st = Object.keys(byStatus);
  charts.status = new Chart(c3, {
    type: 'doughnut',
    data: { labels: st, datasets: [{ data: st.map(k => byStatus[k]), backgroundColor: palette(st.length) }] },
    options: { ...chartOpts(txtColor, gridColor), plugins: { legend: { labels: { color: txtColor, position: 'right' } } } },
  });

  // 4) Структура расходов (среднее по статьям)
  const expAgg = {}, expCnt = {};
  history.forEach(r => (r.expenses || []).forEach(e => {
    const t = e.title || '(прочее)';
    expAgg[t] = (expAgg[t] || 0) + (Number(e.amount) || 0);
    expCnt[t] = (expCnt[t] || 0) + 1;
  }));
  const expTitles = Object.keys(expAgg);
  charts.expenses = new Chart(c4, {
    type: 'bar',
    data: { labels: expTitles, datasets: [{ label: 'Средняя сумма, руб', data: expTitles.map(t => Math.round(expAgg[t] / Math.max(1, expCnt[t]))), backgroundColor: '#7a8cff' }] },
    options: { ...chartOpts(txtColor, gridColor), indexAxis: 'y' },
  });
}
function chartOpts(txtColor, gridColor, percentAxis) {
  return {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: txtColor } },
      ...(percentAxis ? { tooltip: { callbacks: { label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y}%` } } } : {}),
    },
    scales: {
      x: { ticks: { color: txtColor }, grid: { color: gridColor } },
      y: { ticks: { color: txtColor, callback: percentAxis ? (v => v + '%') : undefined }, grid: { color: gridColor } },
    },
  };
}
function palette(n) {
  const base = ['#5fcf80', '#7a8cff', '#e0a84a', '#e06c6c', '#56c7c0', '#c77aff', '#9a9a9a', '#b5d65f'];
  return Array.from({ length: n }, (_, i) => base[i % base.length]);
}

/* ====================================================================
   БАЗА ПРОЕКТОВ — сохранённые кнопкой «Сохранить проект» отчёты (localStorage)
   ==================================================================== */
function loadProjectsBase() {
  try {
    const raw = localStorage.getItem(PROJECTS_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch (_) { return []; }
}
function saveProjectsBase() {
  try { localStorage.setItem(PROJECTS_KEY, JSON.stringify(projectsBase)); } catch (_) {}
}

/** Сохраняет текущий state в «Базу проектов»: если проект уже был открыт/сохранён
    оттуда (state.projectBaseId), обновляет ту же запись, иначе создаёт новую. */
function saveCurrentProjectToBase() {
  const snap = buildSnapshot();
  const now = new Date().toISOString();
  const existingIdx = state.projectBaseId ? projectsBase.findIndex(p => p.id === state.projectBaseId) : -1;
  if (existingIdx !== -1) {
    projectsBase[existingIdx] = { id: state.projectBaseId, savedAt: now, label: snap.label, report: snap.report, contractors: snap.contractors };
    saveProjectsBase();
    return { updated: true, id: state.projectBaseId };
  }
  const id = uid();
  projectsBase.push({ id, savedAt: now, label: snap.label, report: snap.report, contractors: snap.contractors });
  state.projectBaseId = id;
  saveProjectsBase();
  saveLS();
  return { updated: false, id };
}

function deleteProjectFromBase(id) {
  projectsBase = projectsBase.filter(p => p.id !== id);
  saveProjectsBase();
  if (state.projectBaseId === id) state.projectBaseId = '';
  renderProjectsBase();
  updateModeBarVisibility();
}

/** Открывает сохранённый проект из базы во вкладке «Проект» — со всеми данными,
    и привязывает state к этой записи, чтобы повторное «Сохранить проект» обновляло
    её, а не создавало дубликат. */
function openProjectFromBase(id) {
  const p = projectsBase.find(x => x.id === id);
  if (!p) return;
  loadReportFromSnapshot({ label: p.label, report: p.report, contractors: p.contractors });
  state.projectBaseId = id;
  saveLS();
  switchMode('report');
}

function exportProjectsBase() {
  if (!projectsBase.length) { alert('База проектов пуста — нечего экспортировать.'); return; }
  const payload = { type: 'projects-base', schemaVersion: SCHEMA_VERSION, exportedAt: new Date().toISOString(), count: projectsBase.length, projects: projectsBase };
  download(`projects-base_${todayLocalISO()}.json`, new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }));
}

/** Импорт базы проектов из одного или нескольких JSON-файлов разом (можно выделить
    сразу несколько файлов в диалоге выбора). Каждый файл понимает три формата:
    выгрузку целой базы ({type:'projects-base', projects:[...]}), просто массив
    таких же записей, и одиночный экспорт одного проекта (JSON, полученный через
    «↥ Экспорт → JSON» во вкладке «Проект») — тогда из файла добавляется 1 проект.
    Один файл с ошибкой не прерывает импорт остальных — все ошибки собираются
    и показываются одним сообщением в конце. */
function importProjectsBaseFiles(files) {
  let pending = files.length;
  if (!pending) return;
  let added = 0, updated = 0;
  const fileErrors = [];

  const finish = () => {
    saveProjectsBase();
    renderProjectsBase();
    updateModeBarVisibility();
    let msg = `Импорт завершён. Добавлено: ${added}, обновлено: ${updated}. Всего в базе: ${projectsBase.length}.`;
    if (fileErrors.length) msg += `\n\nНе удалось импортировать (${fileErrors.length}):\n` + fileErrors.join('\n');
    alert(msg);
  };

  Array.from(files).forEach(file => {
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const data = JSON.parse(ev.target.result);
        let incoming;
        if (Array.isArray(data)) incoming = data;
        else if (Array.isArray(data.projects)) incoming = data.projects;
        else if (data.report) incoming = [{ id: data.id, savedAt: data.exportedAt, label: data.label, report: data.report, contractors: data.contractors || [] }];
        else throw new Error('не найдено ни поле "projects", ни поле "report"');

        incoming.forEach(p => {
          // Экспорт ОДНОГО проекта (кнопка «Экспорт → JSON» на вкладке «Проект») не несёт
          // своего id записи базы — buildSnapshot() его не добавляет. Раньше при отсутствии
          // p.id всегда генерировался новый случайный uid(), и повторный импорт того же файла
          // (или того же события из другого файла) создавал дубль, а не обновлял существующую
          // запись. Теперь для файлов без id ищем уже сохранённый проект с той же датой и
          // названием события — это тот же случай, что считается «совпадением» при сохранении
          // текущего отчёта кнопкой «Сохранить проект» (через state.projectBaseId), только для
          // данных, пришедших извне, такой привязки нет и приходится сопоставлять по содержимому.
          let id = p.id;
          if (!id) {
            const date = (p.report && p.report.date) || '';
            const title = (p.report && p.report.title) || '';
            const existing = (date || title) && projectsBase.find(x =>
              (x.report && x.report.date) === date && (x.report && x.report.title) === title);
            id = existing ? existing.id : uid();
          }
          const entry = { id, savedAt: p.savedAt || new Date().toISOString(), label: p.label || (p.report && p.report.title) || 'Без названия', report: p.report || {}, contractors: p.contractors || [] };
          const idx = projectsBase.findIndex(x => x.id === id);
          if (idx !== -1) { projectsBase[idx] = entry; updated++; } else { projectsBase.push(entry); added++; }
        });
      } catch (err) {
        console.error(err);
        fileErrors.push(`${file.name}: ${err.message}`);
      } finally {
        if (--pending === 0) finish();
      }
    };
    reader.onerror = () => {
      fileErrors.push(`${file.name}: не удалось прочитать файл`);
      if (--pending === 0) finish();
    };
    reader.readAsText(file);
  });
}

/** Сколько у проекта заметок и положительных/отрицательных результатов — для колонки
    «Записи» в таблице базы. */
function countProjectRecords(r) {
  const notes = Array.isArray(r.notes) ? r.notes.length : (typeof r.notes === 'string' && r.notes.trim() ? 1 : 0);
  const results = Array.isArray(r.results) ? r.results : [];
  return {
    notes,
    positive: results.filter(x => x.type === 'positive').length,
    negative: results.filter(x => x.type !== 'positive').length,
  };
}

function renderProjectsBase() {
  const tbody = $('#projectsBody');
  if (!tbody) return;
  const empty = $('#projectsEmpty');
  const countInfo = $('#projectsCountInfo');
  const sorted = [...projectsBase].sort((a, b) => ((a.report && a.report.date) || '').localeCompare((b.report && b.report.date) || ''));
  tbody.innerHTML = sorted.map(p => {
    const r = p.report || {};
    const fin = computeReportFinancials(r);
    const c = countProjectRecords(r);
    // счётчики кликабельны: ведут в режим «Записи» с прокруткой к записям этого проекта
    const counts = [];
    if (c.notes) counts.push(`<button type="button" class="rec-count rec-jump" data-id="${p.id}" title="Показать заметки этого проекта">📝 ${c.notes}</button>`);
    if (c.positive || c.negative) counts.push(`<button type="button" class="rec-count rec-jump" data-id="${p.id}" title="Показать результаты этого проекта">`
      + (c.positive ? `<span class="p">＋${c.positive}</span>` : '')
      + (c.negative ? `<span class="m">−${c.negative}</span>` : '') + '</button>');
    const countsCell = counts.length ? `<span class="rec-counts">${counts.join('')}</span>` : '<span class="rec-counts"><span class="none">—</span></span>';
    return `<tr data-id="${p.id}" title="Двойной клик — открыть проект">
      <td>${escapeHtml(r.title || '—')}</td>
      <td>${escapeHtml(fmtDate(r.date) || '—')}</td>
      <td>${escapeHtml(STATUS_LABELS[r.status] || r.status || '—')}</td>
      <td>${countsCell}</td>
      <td>${fmtMoney(fin.prepaid)}</td>
      <td>${fmtMoney(fin.income)}</td>
      <td>${fmtMoney(fin.expense)}</td>
      <td style="color:${fin.profit >= 0 ? 'var(--pos)' : 'var(--neg)'}">${fmtMoney(fin.profit)}</td>
      <td><button type="button" class="btn small del-project" data-id="${p.id}" title="Удалить из базы">×</button></td>
    </tr>`;
  }).join('');
  if (empty) empty.hidden = projectsBase.length > 0;
  if (countInfo) countInfo.textContent = 'Всего в базе: ' + projectsBase.length;
  renderProjectRecords();
}

/* ---------- База проектов: режим «Записи» ---------- */
let projRecFilter = 'all';   // 'all' | 'note' | 'positive' | 'negative'
let projRecSearch = '';

/** Собирает заметки и результаты всех проектов базы в один плоский список.
    У результатов нет собственной даты (в модели только type/category/text), поэтому
    для них берём дату самого мероприятия — иначе их некуда поставить в ленте по датам. */
function buildProjectRecords() {
  const out = [];
  projectsBase.forEach(p => {
    const r = p.report || {};
    const eventDate = r.date || '';
    const title = r.title || p.label || 'Без названия';
    parseNotesIn(r.notes, eventDate).forEach(n => {
      out.push({ projectId: p.id, projectTitle: title, date: n.date || eventDate, kind: 'note', category: '', text: n.text || '' });
    });
    (Array.isArray(r.results) ? r.results : []).forEach(x => {
      out.push({
        projectId: p.id, projectTitle: title, date: eventDate,
        kind: x.type === 'positive' ? 'positive' : 'negative',
        category: x.category || '', text: x.text || '',
      });
    });
  });
  return out.sort((a, b) => (b.date || '').localeCompare(a.date || '')); // новые сверху
}

function renderProjectRecords() {
  const feed = $('#recFeed');
  if (!feed) return;
  const empty = $('#recEmpty');
  const q = projRecSearch.trim().toLowerCase();
  const list = buildProjectRecords().filter(rec => {
    if (projRecFilter !== 'all' && rec.kind !== projRecFilter) return false;
    if (!q) return true;
    return (rec.text + ' ' + rec.category + ' ' + rec.projectTitle).toLowerCase().includes(q);
  });
  const kindLabel = { note: 'Заметка', positive: 'Результат', negative: 'Результат' };
  feed.innerHTML = list.map(rec => `
    <div class="rec-card ${rec.kind}" data-id="${rec.projectId}" title="Открыть проект">
      <span class="d">${escapeHtml(fmtDate(rec.date) || '—')}</span>
      <div class="body">
        <div class="top">
          <span class="rec-proj">${escapeHtml(rec.projectTitle)}</span>
          <span class="rec-kind ${rec.kind}">${kindLabel[rec.kind]}${rec.category ? ' · ' + escapeHtml(rec.category) : ''}</span>
        </div>
        <div class="txt">${escapeHtml(rec.text)}</div>
      </div>
      <span class="go">открыть проект →</span>
    </div>`).join('');
  if (empty) {
    empty.hidden = list.length > 0;
    empty.textContent = (q || projRecFilter !== 'all') ? 'Ничего не найдено по этому фильтру.' : 'Записей пока нет.';
  }
}

/** Переключение «Таблица / Записи» внутри вкладки «База проектов». */
function switchProjectsView(view) {
  const isRecords = view === 'records';
  const tableEl = $('#projectsTableView');
  const recEl = $('#projectsRecordsView');
  if (tableEl) tableEl.hidden = isRecords;
  if (recEl) recEl.hidden = !isRecords;
  $$('#projViewSwitch .proj-view-btn').forEach(b => b.classList.toggle('active', (b.dataset.view === 'records') === isRecords));
}

/** Переход из таблицы по клику на счётчик: открывает режим «Записи», прокручивает к
    первой записи проекта и на пару секунд подсвечивает все его записи. */
function jumpToProjectRecords(projectId) {
  switchProjectsView('records');
  const cards = $$(`#recFeed .rec-card[data-id="${projectId}"]`);
  if (!cards.length) return;
  cards.forEach(c => c.classList.add('flash'));
  cards[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
  setTimeout(() => cards.forEach(c => c.classList.remove('flash')), 2500);
}

function bindProjects() {
  $('#newProjectBtn').addEventListener('click', () => {
    if (!confirm('Начать новый проект? Если текущий не сохранён в базу — несохранённые изменения будут потеряны.')) return;
    state = newState();
    renderAll(); saveLS();
  });
  $('#saveProjectBtn').addEventListener('click', () => {
    if (!state.title && !state.date) {
      alert('Заполните хотя бы название или дату мероприятия перед сохранением в базу.');
      return;
    }
    const { updated } = saveCurrentProjectToBase();
    const info = $('#saveProjectInfo');
    if (info) info.textContent = (updated ? 'Обновлено в базе' : 'Сохранено в базу') + ' · всего в базе: ' + projectsBase.length;
    updateModeBarVisibility();
  });

  $('#projectsImportInput').addEventListener('change', e => { if (e.target.files.length) importProjectsBaseFiles(e.target.files); e.target.value = ''; });
  $('#projectsExportBtn').addEventListener('click', exportProjectsBase);
  $('#projectsClearBtn').addEventListener('click', () => {
    if (!projectsBase.length) return;
    if (!confirm('Удалить ВСЕ сохранённые проекты из базы? Если не экспортировали — сначала выгрузите базу. Действие необратимо.')) return;
    projectsBase = [];
    saveProjectsBase();
    renderProjectsBase();
    updateModeBarVisibility();
  });
  $('#projectsBody').addEventListener('click', e => {
    // счётчик записей — уводит в режим «Записи» к записям этого проекта
    const jump = e.target.closest('.rec-jump');
    if (jump) { e.stopPropagation(); jumpToProjectRecords(jump.dataset.id); return; }
    const btn = e.target.closest('.del-project');
    if (!btn) return;
    e.stopPropagation();
    if (confirm('Удалить проект из базы?')) deleteProjectFromBase(btn.dataset.id);
  });
  $('#projectsBody').addEventListener('dblclick', e => {
    // двойной клик по счётчику не должен ещё и открывать проект
    if (e.target.closest('.rec-jump')) { e.stopPropagation(); return; }
    const tr = e.target.closest('tr');
    if (!tr || !tr.dataset.id) return;
    openProjectFromBase(tr.dataset.id);
  });

  // ---- режим «Записи» ----
  $$('#projViewSwitch .proj-view-btn').forEach(b => {
    b.addEventListener('click', () => switchProjectsView(b.dataset.view));
  });
  $$('#recFilters .rec-filter').forEach(b => {
    b.addEventListener('click', () => {
      projRecFilter = b.dataset.filter;
      $$('#recFilters .rec-filter').forEach(x => x.classList.toggle('active', x === b));
      renderProjectRecords();
    });
  });
  $('#recSearch')?.addEventListener('input', e => { projRecSearch = e.target.value; renderProjectRecords(); });
  $('#recFeed')?.addEventListener('click', e => {
    const card = e.target.closest('.rec-card');
    if (card && card.dataset.id) openProjectFromBase(card.dataset.id);
  });
}

/* ---------- Multi-select (проекты базы) в «Динамике» — тот же виджет, что у подрядчиков ---------- */
function getSelectedProjIds() {
  const list = $('#projMsList');
  if (!list) return [];
  return Array.from(list.querySelectorAll('input[type=checkbox]:checked')).map(cb => cb.value).filter(Boolean);
}
function updateProjMsTrigger() {
  const ids = getSelectedProjIds();
  const list = $('#projMsList');
  if (!list) return;
  const total = list.querySelectorAll('input[type=checkbox]').length;
  const trigger = $('#projMsTrigger');
  const allCb = $('#projMsDrop .ms-all input');
  if (ids.length === 0 || ids.length === total) {
    if (allCb) allCb.checked = true;
    trigger.textContent = 'Все проекты базы ▾';
  } else {
    if (allCb) allCb.checked = false;
    trigger.textContent = `Проектов: ${ids.length} ▾`;
  }
}
function populateProjMs(list) {
  const el = $('#projMsList');
  if (!el) return;
  el.innerHTML = list.map(p => {
    const r = p.report || {};
    const dateNote = r.date ? ` — ${fmtDate(r.date)}` : '';
    return `<label><input type="checkbox" value="${p.id}" /> ${escapeHtml(r.title || p.label || 'Без названия')}${escapeHtml(dateNote)}</label>`;
  }).join('');
  updateProjMsTrigger();
}
function setProjMsSelected(ids) {
  const list = $('#projMsList');
  if (!list) return;
  list.querySelectorAll('input[type=checkbox]').forEach(cb => { cb.checked = ids.includes(cb.value); });
  updateProjMsTrigger();
}
/** Пересобирает history из отмеченных в мультиселекте проектов базы (пусто/все = вся база). */
function applyProjMsSelection() {
  const ids = getSelectedProjIds();
  const list = $('#projMsList');
  const total = list ? list.querySelectorAll('input[type=checkbox]').length : 0;
  const chosen = (ids.length === 0 || ids.length === total) ? projectsBase : projectsBase.filter(p => ids.includes(p.id));
  history = chosen.map(p => normalizeReport(p.report, p.label, p.contractors));
  monthChartYearFilter = null;
  renderDynamics();
}
function initProjMs() {
  const wrap = $('#projMsWrap');
  if (!wrap) return;
  const trigger = $('#projMsTrigger');
  const drop = $('#projMsDrop');
  if (!trigger || !drop) return;
  trigger.addEventListener('click', e => { e.stopPropagation(); drop.hidden = !drop.hidden; });
  const allCb = drop.querySelector('.ms-all input');
  if (allCb) allCb.addEventListener('change', function () {
    const checked = this.checked;
    const list = $('#projMsList');
    if (list) list.querySelectorAll('input[type=checkbox]').forEach(cb => { cb.checked = checked; });
    updateProjMsTrigger();
    applyProjMsSelection();
  });
  const list = $('#projMsList');
  if (list) list.addEventListener('change', e => {
    if (!e.target.closest('input[type=checkbox]')) return;
    updateProjMsTrigger();
    applyProjMsSelection();
  });
  document.addEventListener('click', e => { if (!wrap.contains(e.target)) drop.hidden = true; });
}
/** Вызывается при каждом переключении на вкладку «Динамика»: наполняет мультиселект
    базой (сохраняя текущий выбор) и, если история ещё не загружена вручную, а в базе
    ≥2 проектов — по умолчанию подставляет в «Динамику» всю базу целиком. */
function maybeAutoLoadDynamicsFromBase() {
  const wrap = $('#projMsWrap');
  if (!projectsBase.length) { if (wrap) wrap.hidden = true; return; }
  if (wrap) wrap.hidden = false;
  const savedIds = getSelectedProjIds();
  populateProjMs(projectsBase);
  setProjMsSelected(savedIds);
  if (history.length === 0 && projectsBase.length >= 2) {
    setProjMsSelected(projectsBase.map(p => p.id));
    applyProjMsSelection();
  }
}

/* ====================================================================
   ПЕРЕКЛЮЧЕНИЕ РЕЖИМОВ
   ==================================================================== */
function switchMode(mode) {
  const isReport = mode === 'report';
  const isDyn = mode === 'dynamics';
  const isContr = mode === 'contractors';
  const isProjects = mode === 'projects';
  $('#reportMode').hidden = !isReport;
  $('#dynamicsMode').hidden = !isDyn;
  $('#contractorsMode').hidden = !isContr;
  $('#projectsMode').hidden = !isProjects;
  $$('.mode-btn').forEach(b => b.classList.toggle('active', b.dataset.mode === mode));
  if (isDyn) { maybeAutoLoadDynamicsFromBase(); renderDynamics(); }
  if (isProjects) renderProjectsBase();
  if (isContr) renderContractors();
  updateModeBarVisibility();
}

/* ====================================================================
   LocalStorage (автосохранение)
   ==================================================================== */
function saveLS() {
  try { localStorage.setItem(LS_KEY, JSON.stringify(buildSnapshot())); } catch (_) {}
}
function loadLS() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return false;
    const snap = JSON.parse(raw);
    if (snap && snap.report) { loadReportFromSnapshot(snap); return true; }
  } catch (_) {}
  return false;
}

/* ====================================================================
   Тема (тёмная/светлая) — отдельная настройка браузера, не часть отчёта
   ==================================================================== */
function applyTheme(theme) {
  const isLight = theme === 'light';
  document.documentElement.dataset.theme = isLight ? 'light' : '';
  if (!isLight) delete document.documentElement.dataset.theme;
  const btn = $('#themeToggle');
  if (btn) btn.textContent = isLight ? '☀️ Светлая' : '🌙 Тёмная';
  try { localStorage.setItem(THEME_KEY, isLight ? 'light' : 'dark'); } catch (_) {}
  // графики Chart.js красятся JS-опциями (не CSS-переменными) и уже отрисованы —
  // если открыта «Динамика», перерисуем их сразу в цветах новой темы
  const dynEl = $('#dynamicsMode');
  if (dynEl && !dynEl.hidden) renderDynamics();
}
function initTheme() {
  let saved = 'dark';
  try { saved = localStorage.getItem(THEME_KEY) || 'dark'; } catch (_) {}
  applyTheme(saved);
  const btn = $('#themeToggle');
  if (btn) btn.addEventListener('click', () => {
    applyTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light');
  });
}
/** Базовый цвет фона текущей темы — фолбэк для html2canvas на случай прозрачных зон. */
function currentThemeBgColor() {
  return document.documentElement.dataset.theme === 'light' ? '#F1F0EE' : '#2A2A2A';
}
/** Цвет текста/сетки для графиков Chart.js — эти цвета задаются JS-опциями, а не CSS,
    поэтому var(--...) тут не работает и тему нужно читать явно. */
function chartThemeColors() {
  const isLight = document.documentElement.dataset.theme === 'light';
  return isLight
    ? { txtColor: '#4B4F53', gridColor: 'rgba(52,56,61,.10)', posColor: '#2F7D5E', negColor: '#B23B3B' }
    : { txtColor: '#E8E8E8', gridColor: 'rgba(255,255,255,.08)', posColor: '#5FCF80', negColor: '#E06C6C' };
}

/* ---------- Каталог подрядчиков: отдельное хранилище ---------- */
// Объединяет существующий каталог с входящими подрядчиками (дедуп по id и имени)
function mergeContractors(existing, incoming) {
  const norm = s => (s || '').trim().toLowerCase();
  const byId = new Map();
  const names = new Set();
  existing.forEach(c => { if (c && c.id) { byId.set(c.id, c); if (c.name) names.add(norm(c.name)); } });
  incoming.forEach(c => {
    if (!c || !c.name || !c.name.trim()) return;
    if (c.id && byId.has(c.id)) return;
    if (names.has(norm(c.name))) return;
    byId.set(c.id || uid(), c);
    names.add(norm(c.name));
  });
  return [...byId.values()];
}
function saveContrDir() {
  try { localStorage.setItem(CONTR_KEY, JSON.stringify(state.contractors || [])); } catch (_) {}
}
function loadContrDir() {
  try {
    const raw = localStorage.getItem(CONTR_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.map(c => ({ id: c.id || uid(), name: c.name || '', phone: c.phone || '', responsible: c.responsible || '', paymentMethod: c.paymentMethod || 'cash', account: c.account || '' })) : [];
  } catch (_) { return []; }
}

/* ====================================================================
   ИНИЦИАЛИЗАЦИЯ
   ==================================================================== */
function bindContractors() {
  // Поле телефона принимает любой формат ввода (+7 (900) 123-45-67 и т.п.) —
  // лимит в 11 цифр считается ТОЛЬКО по цифрам, символы форматирования (+, скобки,
  // пробелы, дефисы) в счёт не идут и не обрезаются раньше времени.
  const phoneInput = $('#contrPhone');
  if (phoneInput) phoneInput.addEventListener('input', () => {
    let digits = 0;
    let out = '';
    for (const ch of phoneInput.value) {
      if (/\d/.test(ch)) {
        digits++;
        if (digits > 11) continue; // лишние цифры сверх 11-й не допускаем
      }
      out += ch;
    }
    if (out !== phoneInput.value) phoneInput.value = out;
  });

  // Сохранение подрядчика
  $('#contrSaveBtn').addEventListener('click', () => {
    const name = $('#contrName').value.trim();
    if (!name) { alert('Введите наименование подрядчика.'); return; }
    const phone = $('#contrPhone').value.replace(/\D/g, '');
    if (phone && phone.length !== 11) { alert('Телефон должен содержать ровно 11 цифр.'); return; }
    addContractor({
      name,
      phone,
      responsible: $('#contrResp').value,
      paymentMethod: $('#contrPay').value,
      account: $('#contrAccount').value,
    });
    $('#contrName').value = ''; $('#contrPhone').value = ''; $('#contrResp').value = ''; $('#contrAccount').value = '';
  });
  // Удаление подрядчика (делегация)
  $('#contrBody').addEventListener('click', e => {
    const btn = e.target.closest('.del-contr');
    if (btn && confirm('Удалить подрядчика?')) deleteContractor(btn.dataset.id);
  });
  // Инициализация мультиселекта + фильтр наименований
  initContrMs();
  const itemf = $('#dynContrItemFilter');
  if (itemf) itemf.addEventListener('change', renderContrAnalytics);

  // Загрузка базы подрядчиков из contractors-base.js (window.CONTRACTORS_BASE).
  // Раньше грузили contractors-base.json через fetch(), но fetch() локальных файлов
  // не работает при открытии report.html напрямую как file:// (без сервера) — в отличие
  // от <script src>, который грузится в обоих случаях одинаково.
  const loadBtn = $('#contrLoadBaseBtn');
  if (loadBtn) loadBtn.addEventListener('click', () => {
    if (!confirm('Загрузить базу подрядчиков из файла? Существующие подрядчики останутся, дубликаты будут пропущены.')) return;
    try {
      const data = window.CONTRACTORS_BASE;
      if (!data) throw new Error('contractors-base.js не подключён или не загрузился');
      const incoming = Array.isArray(data) ? data : (data.contractors || []);
      const before = state.contractors.length;
      state.contractors = mergeContractors(state.contractors, incoming);
      const added = state.contractors.length - before;
      saveContrDir(); saveLS(); renderContractors();
      updateContrCountInfo();
      alert('Готово. Добавлено новых: ' + added + '. Всего в каталоге: ' + state.contractors.length + '.');
    } catch (err) {
      alert('Не удалось загрузить базу: ' + err.message + '\nФайл contractors-base.js должен лежать рядом с report.html и быть подключён в <head>/перед app.js.');
    }
  });
  // Экспорт базы подрядчиков в JSON
  const expBtn = $('#contrExportBaseBtn');
  if (expBtn) expBtn.addEventListener('click', () => {
    if (!state.contractors.length) { alert('Каталог подрядчиков пуст.'); return; }
    const blob = new Blob([JSON.stringify({ type: 'contractors-base', count: state.contractors.length, contractors: state.contractors }, null, 2)], { type: 'application/json' });
    download('contractors-base.json', blob);
  });
}

function updateContrCountInfo() {
  const el = $('#contrCountInfo');
  if (el) el.textContent = 'Всего в каталоге: ' + (state.contractors ? state.contractors.length : 0);
}
/** Чекбокс «Автосохранение JSON» в топбаре — вкл/выкл автоскачивание JSON при
    закрытии/обновлении страницы (см. beforeunload в report.html). Настройка хранится
    в localStorage и не зависит от конкретного отчёта. */
function initAutoExportToggle() {
  const cb = $('#autoExportToggle');
  if (!cb) return;
  cb.checked = isAutoExportEnabled();
  cb.addEventListener('change', () => {
    try { localStorage.setItem(AUTOEXPORT_KEY, cb.checked ? '1' : '0'); } catch (_) {}
  });
}
function init() {
  initTheme();
  initAutoExportToggle();
  bindMetadata();
  bindForms();
  bindContractors();
  bindProjects();
  initProjMs();

  $('#excelInput').addEventListener('change', e => { if (e.target.files[0]) importExcel(e.target.files[0]); e.target.value = ''; });
  $('#jsonInput').addEventListener('change', e => { if (e.target.files[0]) importJSONFile(e.target.files[0]); e.target.value = ''; });
  $('#dynJsonInput').addEventListener('change', e => { if (e.target.files.length) importDynJSON(e.target.files); e.target.value = ''; });
  $('#clearDynBtn').addEventListener('click', () => {
    history = [];
    monthChartYearFilter = null;
    setProjMsSelected([]); // визуально снимаем галочки в мультиселекте базы, историю не пересобираем
    renderDynamics();
  });
  $('#monthChartBackBtn').addEventListener('click', () => { monthChartYearFilter = null; renderCharts(); });
  $('#ieMetricSelect')?.addEventListener('change', e => { dynIEMetric = e.target.value; renderCharts(); });
  $$('#ieUnitsSwitch .chart-switch-btn').forEach(b => {
    b.addEventListener('click', () => {
      dynIEUnits = b.dataset.units;
      $$('#ieUnitsSwitch .chart-switch-btn').forEach(x => x.classList.toggle('active', x === b));
      renderCharts();
    });
  });
  $$('.mode-btn').forEach(b => b.addEventListener('click', () => switchMode(b.dataset.mode)));

  // восстановление из LocalStorage или старт с пустым
  // сначала восстанавливаем каталог подрядчиков (он живёт отдельно от отчётов)
  state.contractors = loadContrDir();
  // «База проектов» тоже живёт отдельно от текущего отчёта
  projectsBase = loadProjectsBase();
  // затем восстанавливаем отчёт из LocalStorage или стартуем с пустым
  loadLS();
  // каталог подрядчиков не должен затираться при загрузке отчёта — подстрахуемся
  state.contractors = mergeContractors(state.contractors, loadContrDir());
  renderAll();

  // глубокая ссылка: report.html#dynamics → сразу режим динамики
  if (window.location.hash === '#dynamics') switchMode('dynamics');

  // Маячок для report.html: подтверждает, что app.js не просто загрузился как файл,
  // а реально выполнился до конца и навесил все обработчики (кнопки импорта/экспорта,
  // сохранения и т.п.). Без этого сбой загрузки app.js (например, антивирус при первом
  // открытии file:// сразу после распаковки) проходит совсем без видимой ошибки —
  // страница выглядит обычной, но ни одна кнопка фактически не работает.
  window.__appReady = true;
}

document.addEventListener('DOMContentLoaded', init);
