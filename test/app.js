const LEVEL_BUDGETS = {
  2: 10020,
  3: 15460,
  4: 18580,
  5: 24100,
  6: 28070,
  7: 32090,
  8: 36180,
};

const IDENTITIES = {
  general: { label: '一般戶', rateLabel: '16%', copayKey: 'generalCopay' },
  middleLow: { label: '中低收入戶', rateLabel: '5%', copayKey: 'middleLowCopay' },
  low: { label: '長照低收入戶', rateLabel: '全額補助', copayKey: 'none' },
};

const WEEKS_PER_MONTH = 4.5; // 大月估算：每月約 4.5 週

const WEEKDAYS = [
  { key: 'mon', short: '一', label: '週一' },
  { key: 'tue', short: '二', label: '週二' },
  { key: 'wed', short: '三', label: '週三' },
  { key: 'thu', short: '四', label: '週四' },
  { key: 'fri', short: '五', label: '週五' },
  { key: 'sat', short: '六', label: '週六' },
  { key: 'sun', short: '日', label: '週日' },
];

// 金額與部分負擔依使用者提供之核定單整理。
const SERVICES = [
  { code: 'BA01', name: '基本身體清潔', price: 260, generalCopay: 41, middleLowCopay: 13, category: 'care' },
  { code: 'BA02', name: '基本日常照顧', price: 195, generalCopay: 31, middleLowCopay: 9, category: 'care' },
  { code: 'BA03', name: '測量生命徵象', price: 35, generalCopay: 5, middleLowCopay: 1, category: 'care' },
  { code: 'BA04', name: '協助餵食及灌食', price: 130, generalCopay: 20, middleLowCopay: 6, category: 'care' },
  { code: 'BA05', name: '餐食照顧', price: 310, generalCopay: 49, middleLowCopay: 15, category: 'care' },
  { code: 'BA07', name: '協助沐浴及洗頭', price: 325, generalCopay: 52, middleLowCopay: 16, category: 'care' },
  { code: 'BA08', name: '足部照護', price: 500, generalCopay: 80, middleLowCopay: 20, category: 'care' },
  { code: 'BA09', name: '到宅沐浴車服務 1', price: 2200, generalCopay: 352, middleLowCopay: 110, category: 'care' },
  { code: 'BA09a', name: '到宅沐浴車服務 2', price: 2500, generalCopay: 400, middleLowCopay: 125, category: 'care' },
  { code: 'BA10', name: '翻身拍背', price: 155, generalCopay: 24, middleLowCopay: 7, category: 'care' },
  { code: 'BA11', name: '肢體關節活動', price: 195, generalCopay: 31, middleLowCopay: 9, category: 'care' },
  { code: 'BA12', name: '協助上下樓梯', price: 130, generalCopay: 20, middleLowCopay: 6, category: 'care' },
  { code: 'BA13', name: '陪同外出 30 分', price: 195, generalCopay: 31, middleLowCopay: 9, category: 'care' },
  { code: 'BA14', name: '陪同就醫 90 分', price: 685, generalCopay: 109, middleLowCopay: 34, category: 'care' },
  { code: 'BA15-1', name: '家務協助（自用）30 分', price: 195, generalCopay: 31, middleLowCopay: 9, category: 'care' },
  { code: 'BA15-2', name: '家務協助（共用）', price: 195, generalCopay: 112, middleLowCopay: 101, category: 'care' },
  { code: 'BA16-1', name: '代購（自用）5 公里', price: 130, generalCopay: 20, middleLowCopay: 6, category: 'care' },
  { code: 'BA16-2', name: '代購（共用）5 公里', price: 130, generalCopay: 75, middleLowCopay: 68, category: 'care' },
  { code: 'BA17a', name: '人工氣道管內分泌物抽吸', price: 75, generalCopay: 12, middleLowCopay: 3, category: 'care' },
  { code: 'BA17b', name: '口腔內分泌物抽吸', price: 65, generalCopay: 10, middleLowCopay: 3, category: 'care' },
  { code: 'BA17c', name: '尿管及鼻胃管清潔固定', price: 50, generalCopay: 8, middleLowCopay: 2, category: 'care' },
  { code: 'BA17d1', name: '驗血糖', price: 50, generalCopay: 8, middleLowCopay: 2, category: 'care' },
  { code: 'BA17d2', name: '甘油球', price: 50, generalCopay: 8, middleLowCopay: 2, category: 'care' },
  { code: 'BA17e', name: '依指示置入藥盒', price: 50, generalCopay: 8, middleLowCopay: 2, category: 'care' },
  { code: 'BA18', name: '安全看視 30 分', price: 200, generalCopay: 32, middleLowCopay: 10, category: 'care' },
  { code: 'BA20', name: '陪伴服務 30 分', price: 175, generalCopay: 28, middleLowCopay: 8, category: 'care' },
  { code: 'BA22', name: '巡視（3 次／天）', price: 130, generalCopay: 20, middleLowCopay: 6, category: 'care' },
  { code: 'BA23', name: '協助洗頭', price: 200, generalCopay: 32, middleLowCopay: 10, category: 'care' },
  { code: 'BA24', name: '協助排便', price: 220, generalCopay: 35, middleLowCopay: 11, category: 'care' },

  { code: 'CA07', name: '復能照護 3 次／組', price: 4500, generalCopay: 720, middleLowCopay: 300, category: 'professional' },
  { code: 'CA08', name: '個別化計畫 4 次／組', price: 6000, generalCopay: 960, middleLowCopay: 300, category: 'professional' },
  { code: 'CB01a', name: '營養照護 3 次／組', price: 4500, generalCopay: 720, middleLowCopay: 225, category: 'professional' },
  { code: 'CB02', name: '吞嚥照護 6 次／組', price: 9000, generalCopay: 1440, middleLowCopay: 450, category: 'professional' },
  { code: 'CB03', name: '困擾行為照護', price: 4500, generalCopay: 720, middleLowCopay: 225, category: 'professional' },
  { code: 'CB04', name: '臥床或活動受限', price: 9000, generalCopay: 1440, middleLowCopay: 450, category: 'professional' },
  { code: 'CC01', name: '無障礙空間規劃／2 組', price: 2000, generalCopay: 320, middleLowCopay: 100, category: 'professional' },
  { code: 'CD02', name: '護理指導 4 次／組', price: 6000, generalCopay: 960, middleLowCopay: 300, category: 'professional' },

  { code: 'BB01', name: '日照全第 1 型 2 級', price: 675, generalCopay: 108, middleLowCopay: 33, category: 'daycare' },
  { code: 'BB03', name: '日照全第 2 型 3 級', price: 840, generalCopay: 134, middleLowCopay: 42, category: 'daycare' },
  { code: 'BB05', name: '日照全第 3 型 4 級', price: 920, generalCopay: 147, middleLowCopay: 46, category: 'daycare' },
  { code: 'BB07', name: '日照全第 4 型 5 級', price: 1045, generalCopay: 167, middleLowCopay: 52, category: 'daycare' },
  { code: 'BB09', name: '日照全第 5 型 6 級', price: 1130, generalCopay: 180, middleLowCopay: 56, category: 'daycare' },
  { code: 'BB11', name: '日照全第 6 型 7 級', price: 1210, generalCopay: 193, middleLowCopay: 60, category: 'daycare' },
  { code: 'BB13', name: '日照全第 7 型 8 級', price: 1285, generalCopay: 205, middleLowCopay: 64, category: 'daycare' },
  { code: 'BD01', name: '社區式協助沐浴', price: 200, generalCopay: 32, middleLowCopay: 10, category: 'daycare' },
  { code: 'BD02', name: '社區式晚餐', price: 150, generalCopay: 24, middleLowCopay: 7, category: 'daycare' },
  { code: 'BD03', name: '社區式交通接送', price: 115, generalCopay: 18, middleLowCopay: 5, category: 'daycare' },
];

const state = {
  identity: 'general',
  level: '2',
  filter: 'all',
  query: '',
  items: [],
};

const els = {
  identitySelect: document.querySelector('#identitySelect'),
  levelSelect: document.querySelector('#levelSelect'),
  budgetAmount: document.querySelector('#budgetAmount'),
  copayRate: document.querySelector('#copayRate'),
  copayLabel: document.querySelector('#copayLabel'),
  serviceSearch: document.querySelector('#serviceSearch'),
  serviceList: document.querySelector('#serviceList'),
  approvedList: document.querySelector('#approvedList'),
  selectedCount: document.querySelector('#selectedCount'),
  serviceTotal: document.querySelector('#serviceTotal'),
  copayTotal: document.querySelector('#copayTotal'),
  remainingAmount: document.querySelector('#remainingAmount'),
  budgetProgress: document.querySelector('#budgetProgress'),
  budgetUsage: document.querySelector('#budgetUsage'),
  budgetHint: document.querySelector('#budgetHint'),
  resetBtn: document.querySelector('#resetBtn'),
  clearItemsBtn: document.querySelector('#clearItemsBtn'),
  template: document.querySelector('#serviceCardTemplate'),
  resultPanel: document.querySelector('#resultPanel'),
  step3Section: document.querySelector('#step3Section'),
  overviewBtn: document.querySelector('#overviewBtn'),
};

const money = new Intl.NumberFormat('zh-TW');
const STORAGE_KEY = 'serviceApprovalMobile-v1';
const SCROLL_PANEL_DELAY = 30;

function saveState() {
  // v7 起不再保存使用紀錄。
  // 每次重新開啟或重新整理網頁，都會從全新的空白核定單開始。
}

function loadState() {
  // 清除舊版本曾寫入的 localStorage，避免歷史資料再次被帶回。
  localStorage.removeItem(STORAGE_KEY);
}

function getService(code) {
  return SERVICES.find(service => service.code === code);
}

function getCopayPerUnit(service) {
  const identity = IDENTITIES[state.identity];
  return identity.copayKey === 'none' ? 0 : service[identity.copayKey];
}

function estimateMonthlyQty(weeklyQty) {
  const weekly = Math.max(0, Math.floor(Number(weeklyQty) || 0));
  if (weekly === 0) return 0;
  return Math.round(weekly * WEEKS_PER_MONTH);
}

function calculateTotals() {
  const budget = LEVEL_BUDGETS[state.level];
  let serviceTotal = 0;
  let copayTotal = 0;

  state.items.forEach(item => {
    const service = getService(item.code);
    if (!service) return;
    serviceTotal += service.price * item.qty;
    copayTotal += getCopayPerUnit(service) * item.qty;
  });

  return {
    budget,
    serviceTotal,
    copayTotal,
    remaining: budget - serviceTotal,
    usage: budget > 0 ? (serviceTotal / budget) * 100 : 0,
  };
}

function getCapacityInfo(service) {
  const { remaining } = calculateTotals();
  const availableAmount = Math.max(0, remaining);
  const additionalUnits = service.price > 0 ? Math.floor(availableAmount / service.price) : 0;
  const item = state.items.find(entry => entry.code === service.code);
  const currentWeeklyQty = Math.max(0, Math.floor(Number(item?.weeklyQty) || 0));
  const currentEstimatedMonthlyQty = estimateMonthlyQty(currentWeeklyQty);

  let additionalWeeklyQty = 0;
  let additionalMonthlyQty = 0;

  // v14：把「還可增加幾單位」換算成居督更直覺的「每週還可增加幾次」。
  // 以目前每週次數為基準，逐次增加，直到換算後的月增量會超過剩餘額度可負擔的單位數。
  for (let delta = 1; delta <= 1000; delta += 1) {
    const nextEstimatedMonthlyQty = estimateMonthlyQty(currentWeeklyQty + delta);
    const monthlyDelta = Math.max(0, nextEstimatedMonthlyQty - currentEstimatedMonthlyQty);
    if (monthlyDelta > additionalUnits) break;
    additionalWeeklyQty = delta;
    additionalMonthlyQty = monthlyDelta;
  }

  const additionalCost = additionalMonthlyQty * service.price;

  return {
    remaining,
    availableAmount,
    additionalUnits,
    additionalWeeklyQty,
    additionalMonthlyQty,
    additionalCost,
  };
}

function capacityMarkup(service) {
  const {
    remaining,
    availableAmount,
    additionalUnits,
    additionalWeeklyQty,
    additionalMonthlyQty,
    additionalCost,
  } = getCapacityInfo(service);

  if (remaining < 0) {
    return `<span class="capacity-empty">目前已超出核定額度，${service.code} 暫無可增加次數</span>`;
  }
  if (remaining === 0) {
    return `<span class="capacity-empty">目前核定額度已使用完畢，${service.code} 暫無可增加次數</span>`;
  }
  if (additionalUnits <= 0 || additionalWeeklyQty <= 0) {
    return `
      <span class="capacity-empty">剩餘 ${money.format(availableAmount)} 元，目前不足以再增加每週服務次數</span>
      <span class="capacity-remaining">${service.code} 單價 ${money.format(service.price)} 元／單位</span>
    `;
  }

  return `
    <span class="capacity-weekly">每週約 <strong>+${additionalWeeklyQty}</strong> 次</span>
    <span class="capacity-monthly">每月約 +${additionalMonthlyQty} 單位｜約 ${money.format(additionalCost)} 元</span>
    <span class="capacity-remaining">目前剩餘額度 ${money.format(availableAmount)} 元</span>
  `;
}

function updateCapacityHints() {
  document.querySelectorAll('.capacity-hint[data-code]').forEach(hint => {
    const service = getService(hint.dataset.code);
    if (!service) return;
    hint.innerHTML = capacityMarkup(service);
    const { remaining, additionalWeeklyQty } = getCapacityInfo(service);
    hint.classList.toggle('capacity-none', remaining <= 0 || additionalWeeklyQty <= 0);
  });
}



function scrollToStep3() {
  if (!els.step3Section) return;
  window.setTimeout(() => {
    els.step3Section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, SCROLL_PANEL_DELAY);
}



function escapeOverviewHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function buildServiceOverviewHtml() {
  const identity = IDENTITIES[state.identity];
  const { budget, serviceTotal, copayTotal, remaining, usage } = calculateTotals();
  const totalWeeklyQty = state.items.reduce(
    (sum, item) => sum + Math.max(0, Math.floor(Number(item.weeklyQty) || 0)),
    0
  );
  const totalMonthlyQty = state.items.reduce(
    (sum, item) => sum + Math.max(0, Math.floor(Number(item.qty) || 0)),
    0
  );

  const serviceRows = state.items.map((item, index) => {
    const service = getService(item.code);
    if (!service) return '';

    const weeklyQty = Math.max(0, Math.floor(Number(item.weeklyQty) || 0));
    const monthlyQty = Math.max(0, Math.floor(Number(item.qty) || 0));
    const weekdayKeys = Array.isArray(item.days) ? item.days : [];
    const weekdayChips = WEEKDAYS.map(day => {
      const active = weekdayKeys.includes(day.key);
      return `<span class="day-chip${active ? ' active' : ''}">${escapeOverviewHtml(day.short)}</span>`;
    }).join('');

    const weeklyShare = totalWeeklyQty > 0 ? (weeklyQty / totalWeeklyQty) * 100 : 0;
    const itemCopay = getCopayPerUnit(service) * monthlyQty;

    return `
      <article class="service-overview-card">
        <div class="service-card-head">
          <div class="service-index">${index + 1}</div>
          <div class="service-title-wrap">
            <div class="service-code">${escapeOverviewHtml(service.code)}</div>
            <h2>${escapeOverviewHtml(service.name)}</h2>
          </div>
          <div class="weekly-number">
            <strong>${weeklyQty}</strong>
            <span>次／週</span>
          </div>
        </div>

        <div class="service-detail-grid">
          <div class="detail-box">
            <span>每週服務</span>
            <strong>${weeklyQty} 次</strong>
          </div>
          <div class="detail-box">
            <span>預估每月</span>
            <strong>${monthlyQty} 單位</strong>
          </div>
          <div class="detail-box copay-detail-box">
            <span>預估部分負擔</span>
            <strong>${money.format(itemCopay)} 元</strong>
          </div>
        </div>

        <div class="weekday-block">
          <span class="mini-label">服務星期</span>
          <div class="day-row">${weekdayChips}</div>
          ${weekdayKeys.length ? '' : '<p class="no-day">尚未指定服務星期</p>'}
        </div>

        <div class="share-block" aria-hidden="true">
          <div class="share-track"><div class="share-bar" style="width:${Math.min(100, weeklyShare).toFixed(1)}%"></div></div>
          <span>占每週總服務次數 ${weeklyShare.toFixed(0)}%</span>
        </div>
      </article>
    `;
  }).join('');

  const usageClass = usage > 100 ? 'over' : usage >= 80 ? 'warning' : '';
  const remainingLabel = remaining < 0
    ? `超出 ${money.format(Math.abs(remaining))} 元`
    : `${money.format(remaining)} 元`;

  return `<!doctype html>
<html lang="zh-Hant">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#5f8fd6">
  <title>服務項目總覽</title>
  <style>
    :root {
      color-scheme: light;
      --bg:#f4f7fc;
      --surface:#fff;
      --surface-soft:#edf4ff;
      --text:#1d3550;
      --muted:#6f8198;
      --line:#d7e2ef;
      --brand:#5f8fd6;
      --brand-dark:#426fa8;
      --brand-soft:#e6efff;
    }
    * { box-sizing:border-box; }
    html { background:var(--bg); }
    body {
      margin:0;
      color:var(--text);
      background:
        radial-gradient(circle at top right, rgba(95,143,214,.18), transparent 36%),
        radial-gradient(circle at top left, rgba(255,238,214,.28), transparent 25%),
        var(--bg);
      font-family:Inter,"Noto Sans TC","PingFang TC","Microsoft JhengHei",system-ui,sans-serif;
    }
    .page { width:min(100%,760px); margin:0 auto; padding:18px 14px 40px; }
    .top {
      display:flex; align-items:flex-start; justify-content:space-between; gap:12px;
      padding:8px 2px 16px;
    }
    .eyebrow { margin:0 0 4px; color:var(--brand); font-size:12px; font-weight:900; letter-spacing:.08em; }
    h1 { margin:0; font-size:28px; line-height:1.15; }
    .print-btn {
      flex:0 0 auto; border:1px solid #c4d5eb; border-radius:12px; background:#fff;
      color:var(--brand-dark); padding:10px 12px; font:inherit; font-size:12px; font-weight:900; cursor:pointer;
    }
    .summary-card {
      padding:17px; border:1px solid var(--line); border-radius:20px; background:rgba(255,255,255,.94);
      box-shadow:0 14px 35px rgba(62,95,138,.09);
    }
    .identity-line { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:14px; }
    .badge { padding:7px 10px; border-radius:999px; background:var(--brand-soft); color:var(--brand-dark); font-size:12px; font-weight:900; }
    .big-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:9px; }
    .big-stat { padding:13px 10px; border-radius:15px; background:var(--surface-soft); text-align:center; }
    .big-stat span { display:block; color:var(--muted); font-size:11px; font-weight:800; }
    .big-stat strong { display:block; margin-top:4px; color:var(--brand-dark); font-size:22px; }
    .budget-row { margin-top:14px; padding-top:14px; border-top:1px solid var(--line); }
    .budget-line { display:flex; align-items:center; justify-content:space-between; gap:14px; margin:5px 0; font-size:13px; }
    .budget-line span { color:var(--muted); font-weight:800; }
    .budget-line strong { text-align:right; }
    .usage-pill { padding:5px 9px; border-radius:999px; background:#e6efff; color:var(--brand-dark); }
    .usage-pill.warning { background:#fff2c7; color:#946200; }
    .usage-pill.over { background:#ffe1df; color:#a83930; }
    .section-title { margin:22px 2px 10px; }
    .section-title p { margin:0 0 3px; color:var(--brand); font-size:11px; font-weight:900; letter-spacing:.08em; }
    .section-title h2 { margin:0; font-size:19px; }
    .service-list { display:grid; gap:11px; }
    .service-overview-card {
      padding:15px; border:1px solid var(--line); border-radius:18px; background:#fff;
      box-shadow:0 9px 24px rgba(62,95,138,.06);
    }
    .service-card-head { display:grid; grid-template-columns:auto 1fr auto; gap:10px; align-items:center; }
    .service-index {
      width:28px; height:28px; display:grid; place-items:center; border-radius:9px;
      background:#f1f5fb; color:var(--muted); font-size:11px; font-weight:900;
    }
    .service-title-wrap h2 { margin:2px 0 0; font-size:16px; }
    .service-code { color:var(--brand); font-size:12px; font-weight:900; }
    .weekly-number { min-width:72px; text-align:right; }
    .weekly-number strong { display:block; color:var(--brand-dark); font-size:30px; line-height:.95; }
    .weekly-number span { display:block; margin-top:4px; color:var(--muted); font-size:11px; font-weight:800; }
    .service-detail-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:8px; margin-top:13px; }
    .detail-box { padding:10px 11px; border-radius:12px; background:#f7faff; border:1px solid #e1eaf5; }
    .detail-box span { display:block; color:var(--muted); font-size:10px; font-weight:800; }
    .detail-box strong { display:block; margin-top:3px; font-size:14px; }
    .copay-detail-box { background:#eef4ff; border-color:#cfdef3; }
    .copay-detail-box strong { color:var(--brand-dark); }
    .weekday-block { margin-top:13px; }
    .mini-label { display:block; margin-bottom:7px; color:var(--muted); font-size:11px; font-weight:900; }
    .day-row { display:grid; grid-template-columns:repeat(7,1fr); gap:5px; }
    .day-chip {
      min-height:32px; display:grid; place-items:center; border:1px solid #d3dfed; border-radius:9px;
      color:#8a9aad; background:#fff; font-size:12px; font-weight:900;
    }
    .day-chip.active { border-color:var(--brand); background:var(--brand); color:#fff; }
    .no-day { margin:7px 0 0; color:#9a6d63; font-size:11px; font-weight:800; }
    .share-block { display:grid; grid-template-columns:1fr auto; gap:8px; align-items:center; margin-top:12px; }
    .share-track { height:6px; overflow:hidden; border-radius:999px; background:#e8eef6; }
    .share-bar { height:100%; border-radius:inherit; background:#9fc4ff; }
    .share-block span { color:var(--muted); font-size:10px; font-weight:800; }
    .note { margin:18px 4px 0; color:var(--muted); font-size:11px; line-height:1.6; text-align:center; }
    @media (max-width:420px) {
      .page { padding-left:10px; padding-right:10px; }
      h1 { font-size:24px; }
      .big-grid { grid-template-columns:1fr 1fr; }
      .big-stat:last-child { grid-column:1 / -1; }
      .service-card-head { grid-template-columns:auto 1fr auto; }
      .service-detail-grid { grid-template-columns:1fr 1fr; }
      .copay-detail-box { grid-column:1 / -1; }
      .weekly-number strong { font-size:26px; }
    }
    @media print {
      body { background:#fff; }
      .page { width:100%; max-width:none; padding:0; }
      .print-btn { display:none; }
      .summary-card,.service-overview-card { box-shadow:none; break-inside:avoid; }
    }
  </style>
</head>
<body>
  <main class="page">
    <header class="top">
      <div>
        <p class="eyebrow">居督行動工具</p>
        <h1>服務項目總覽</h1>
      </div>
      <button class="print-btn" type="button" onclick="window.print()">列印／儲存 PDF</button>
    </header>

    <section class="summary-card">
      <div class="identity-line">
        <span class="badge">${escapeOverviewHtml(identity.label)}</span>
        <span class="badge">CMS 第 ${escapeOverviewHtml(state.level)} 級</span>
        <span class="badge">核定額度 ${money.format(budget)} 元</span>
      </div>
      <div class="big-grid">
        <div class="big-stat"><span>使用服務</span><strong>${state.items.length} 項</strong></div>
        <div class="big-stat"><span>每週總服務</span><strong>${totalWeeklyQty} 次</strong></div>
        <div class="big-stat"><span>預估每月</span><strong>${totalMonthlyQty} 單位</strong></div>
      </div>
      <div class="budget-row">
        <div class="budget-line"><span>預估每月服務總額</span><strong>${money.format(serviceTotal)} 元</strong></div>
        <div class="budget-line"><span>預估部分負擔</span><strong>${money.format(copayTotal)} 元</strong></div>
        <div class="budget-line"><span>額度使用率</span><strong class="usage-pill ${usageClass}">${usage.toFixed(1)}%</strong></div>
        <div class="budget-line"><span>剩餘額度</span><strong>${remainingLabel}</strong></div>
      </div>
    </section>

    <div class="section-title">
      <p>SERVICE OVERVIEW</p>
      <h2>每週服務項目</h2>
    </div>

    <section class="service-list">${serviceRows}</section>
    <p class="note">每月單位數依目前核定單設定顯示；服務星期僅呈現已勾選的星期。若每週次數曾手動修改，可能與勾選星期數不同。</p>
  </main>
</body>
</html>`;
}

function openServiceOverview() {
  if (!state.items.length) {
    alert('請先在 STEP 2 加入至少一項服務，再產出服務項目總覽。');
    return;
  }

  const overviewWindow = window.open('', '_blank');
  if (!overviewWindow) {
    alert('瀏覽器阻擋了新分頁，請允許此網站開啟彈出式視窗後再試一次。');
    return;
  }

  try { overviewWindow.opener = null; } catch (_) {}
  overviewWindow.document.open();
  overviewWindow.document.write(buildServiceOverviewHtml());
  overviewWindow.document.close();
}


function renderBasic() {
  const identity = IDENTITIES[state.identity];
  const budget = LEVEL_BUDGETS[state.level];
  els.identitySelect.value = state.identity;
  els.levelSelect.value = state.level;
  els.budgetAmount.textContent = money.format(budget);
  els.copayRate.textContent = identity.rateLabel;
  els.copayLabel.textContent = identity.label;
}

function bindFastTap(element, handler) {
  let pointerId = null;
  let startX = 0;
  let startY = 0;
  let moved = false;
  let suppressClickUntil = 0;
  const MOVE_LIMIT = 10;

  const clearPress = () => {
    element.classList.remove('touch-pressed');
    pointerId = null;
    moved = false;
  };

  element.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'touch' && event.pointerType !== 'pen') return;
    pointerId = event.pointerId;
    startX = event.clientX;
    startY = event.clientY;
    moved = false;
    element.classList.add('touch-pressed');
  });

  element.addEventListener('pointermove', event => {
    if (event.pointerId !== pointerId) return;
    if (Math.hypot(event.clientX - startX, event.clientY - startY) > MOVE_LIMIT) {
      moved = true;
      element.classList.remove('touch-pressed');
    }
  });

  element.addEventListener('pointercancel', event => {
    if (event.pointerId === pointerId) clearPress();
  });

  element.addEventListener('pointerup', event => {
    if (event.pointerId !== pointerId) return;
    const shouldActivate = !moved;
    clearPress();

    if (shouldActivate) {
      // 直接在觸控放開時執行，不等待瀏覽器後續合成 click。
      suppressClickUntil = performance.now() + 700;
      handler(event);
    }
  });

  element.addEventListener('click', event => {
    // 觸控 pointerup 後通常還會補送 click；這裡避免重複執行。
    if (performance.now() < suppressClickUntil) {
      event.preventDefault();
      return;
    }
    handler(event);
  });
}

let derivedRenderFrame = 0;
function scheduleDerivedRender() {
  if (derivedRenderFrame) cancelAnimationFrame(derivedRenderFrame);
  derivedRenderFrame = requestAnimationFrame(() => {
    derivedRenderFrame = 0;
    renderApproved();
    renderTotals();
  });
}

function createWeeklyEditor(service, selectedItem) {
  const weeklyEditor = document.createElement('div');
  weeklyEditor.className = 'weekly-editor';
  weeklyEditor.innerHTML = `
    <div class="weekly-row">
      <span class="weekly-label">一週次數</span>
      <div class="weekly-control">
        <input
          class="weekly-input"
          type="number"
          inputmode="numeric"
          min="0"
          step="1"
          value="${selectedItem.weeklyQty ?? 0}"
          aria-label="${service.code} 一週服務次數"
        />
        <span>次</span>
      </div>
    </div>
    <div class="weekly-hint">選星期會自動帶入次數，仍可手動修改</div>
    <div class="monthly-estimate" aria-live="polite">
      預估每月 <strong>${estimateMonthlyQty(selectedItem.weeklyQty ?? 0)}</strong> 單位
      <span>（每週次數 × 約 4.5 週（大月））</span>
    </div>
    <div class="capacity-box">
      <span class="capacity-title">目前額度還能增加</span>
      <p class="capacity-hint" data-code="${service.code}">${capacityMarkup(service)}</p>
    </div>
    <div class="weekday-editor">
      <span class="weekday-label">服務星期</span>
      <div class="weekday-chips" role="group" aria-label="${service.code} 服務星期">
        ${WEEKDAYS.map(day => `
          <button
            type="button"
            class="weekday-chip${(selectedItem.days || []).includes(day.key) ? ' active' : ''}"
            data-day="${day.key}"
            aria-pressed="${(selectedItem.days || []).includes(day.key)}"
            title="${day.label}"
          >${day.short}</button>
        `).join('')}
      </div>
    </div>
  `;

  const weeklyInput = weeklyEditor.querySelector('.weekly-input');
  weeklyInput.addEventListener('click', event => event.stopPropagation());
  weeklyInput.addEventListener('input', event => updateWeeklyQty(service.code, event.target.value));
  weeklyInput.addEventListener('change', event => updateWeeklyQty(service.code, event.target.value));

  weeklyEditor.querySelectorAll('.weekday-chip').forEach(dayButton => {
    bindFastTap(dayButton, event => {
      event.stopPropagation();
      const selected = toggleWeekday(service.code, dayButton.dataset.day);
      dayButton.classList.toggle('active', selected);
      dayButton.setAttribute('aria-pressed', String(selected));
    });
  });

  return weeklyEditor;
}

function applyServiceCardState(card, service) {
  const button = card.querySelector('.service-main');
  const mark = card.querySelector('.add-mark');
  const selectedItem = state.items.find(item => item.code === service.code);
  card.querySelector('.weekly-editor')?.remove();

  button.setAttribute('aria-pressed', selectedItem ? 'true' : 'false');

  if (selectedItem) {
    card.dataset.selected = 'true';
    mark.textContent = '✓';
    mark.setAttribute('aria-label', '已加入，點一下可取消');
    button.title = '點一下取消此服務';
    card.appendChild(createWeeklyEditor(service, selectedItem));
  } else {
    card.removeAttribute('data-selected');
    mark.textContent = '＋';
    mark.setAttribute('aria-label', '加入此服務');
    button.title = '點一下加入此服務';
  }
}

function findVisibleServiceCard(code) {
  return Array.from(els.serviceList.querySelectorAll('.service-card'))
    .find(card => card.dataset.code === code);
}

function syncVisibleServiceCard(code) {
  const card = findVisibleServiceCard(code);
  const service = getService(code);
  if (card && service) applyServiceCardState(card, service);
}

function renderServices() {
  const normalizedQuery = state.query.trim().toLowerCase();
  const visible = SERVICES.filter(service => {
    const categoryMatch = state.filter === 'all' || service.category === state.filter;
    const queryMatch = !normalizedQuery || `${service.code} ${service.name}`.toLowerCase().includes(normalizedQuery);
    return categoryMatch && queryMatch;
  });

  els.serviceList.innerHTML = '';

  if (!visible.length) {
    els.serviceList.innerHTML = '<div class="no-result">找不到符合的服務項目</div>';
    return;
  }

  visible.forEach(service => {
    const fragment = els.template.content.cloneNode(true);
    const card = fragment.querySelector('.service-card');
    const button = fragment.querySelector('.service-main');
    card.dataset.code = service.code;
    fragment.querySelector('.service-code').textContent = service.code;
    fragment.querySelector('.service-name').textContent = service.name;
    fragment.querySelector('.service-price').textContent = `單價 ${money.format(service.price)} 元｜一般 ${money.format(service.generalCopay)}｜中低 ${money.format(service.middleLowCopay)}`;

    bindFastTap(button, () => toggleService(service.code));
    applyServiceCardState(card, service);
    els.serviceList.appendChild(fragment);
  });
}

function toggleService(code) {
  const existing = state.items.find(item => item.code === code);
  if (existing) {
    removeService(code);
    return;
  }
  addService(code);
}

function addService(code) {
  if (state.items.some(item => item.code === code)) return;

  state.items.push({ code, qty: 0, weeklyQty: 0, days: [] });
  saveState();

  // v11：只更新剛剛點選的服務卡，不再重畫整個服務清單。
  syncVisibleServiceCard(code);
  scheduleDerivedRender();

  // 保留使用者目前瀏覽位置，不自動捲動或搶焦點，方便繼續選其他服務。
}

function removeService(code) {
  state.items = state.items.filter(item => item.code !== code);
  saveState();

  // v11：取消選取也只縮回目前卡片，減少手機端重排與延遲感。
  syncVisibleServiceCard(code);
  scheduleDerivedRender();
}

function updateQty(code, value) {
  const item = state.items.find(item => item.code === code);
  if (!item) return;
  item.qty = Math.max(0, Math.floor(Number(value) || 0));
  saveState();
  renderApproved();
  renderTotals();
}

function updateWeeklyQty(code, value) {
  const item = state.items.find(item => item.code === code);
  if (!item) return;

  item.weeklyQty = Math.max(0, Math.floor(Number(value) || 0));
  item.qty = estimateMonthlyQty(item.weeklyQty);
  saveState();

  // 不重繪整個服務清單，避免使用者輸入時游標／畫面跳動。
  const input = Array.from(document.querySelectorAll('.weekly-input'))
    .find(el => el.getAttribute('aria-label') === `${code} 一週服務次數`);
  const estimate = input?.closest('.weekly-editor')?.querySelector('.monthly-estimate strong');
  if (estimate) estimate.textContent = String(item.qty);

  scheduleDerivedRender();
}

function toggleWeekday(code, dayKey) {
  const item = state.items.find(item => item.code === code);
  if (!item || !WEEKDAYS.some(day => day.key === dayKey)) return false;

  if (!Array.isArray(item.days)) item.days = [];
  const index = item.days.indexOf(dayKey);
  if (index >= 0) {
    item.days.splice(index, 1);
  } else {
    item.days.push(dayKey);
    item.days.sort((a, b) => {
      const order = WEEKDAYS.map(day => day.key);
      return order.indexOf(a) - order.indexOf(b);
    });
  }

  // v5：點選服務星期時，自動用「已選星期數」帶入一週次數。
  // 例如選一、三、五 => 3 次；選一～五 => 5 次。
  // 使用者之後仍可直接在「一週次數」欄位手動改成其他數字。
  item.weeklyQty = item.days.length;
  item.qty = estimateMonthlyQty(item.weeklyQty);
  saveState();

  // 只更新目前卡片中的數字，不重畫整個服務清單，避免手機畫面跳動。
  const input = Array.from(document.querySelectorAll('.weekly-input'))
    .find(el => el.getAttribute('aria-label') === `${code} 一週服務次數`);
  if (input) input.value = String(item.weeklyQty);
  const estimate = input?.closest('.weekly-editor')?.querySelector('.monthly-estimate strong');
  if (estimate) estimate.textContent = String(item.qty);

  scheduleDerivedRender();
  return item.days.includes(dayKey);
}

function getWeekdaySummary(days = []) {
  return WEEKDAYS
    .filter(day => days.includes(day.key))
    .map(day => day.short)
    .join('、');
}

function renderApproved() {
  els.selectedCount.textContent = `${state.items.length} 項`;
  els.approvedList.innerHTML = '';

  if (!state.items.length) {
    els.approvedList.className = 'approved-list empty-state';
    els.approvedList.textContent = '尚未加入服務項目';
    return;
  }

  els.approvedList.className = 'approved-list';

  state.items.forEach(item => {
    const service = getService(item.code);
    if (!service) return;

    const weekdaySummary = getWeekdaySummary(item.days || []);
    const wrapper = document.createElement('article');
    wrapper.className = 'approved-item';
    wrapper.innerHTML = `
      <div class="approved-top">
        <div>
          <div class="approved-code">${service.code}</div>
          <p class="approved-name">${service.name}</p>
          <p class="approved-weekly">每週 ${item.weeklyQty ?? 0} 次${weekdaySummary ? `｜${weekdaySummary}` : ''}｜預估每月 ${item.qty} 單位</p>
        </div>
        <button class="remove-button" type="button">移除</button>
      </div>
      <div class="approved-controls">
        <label class="qty-field">
          <span>預估／核定月單位數</span>
          <input class="qty-input" type="number" inputmode="numeric" min="0" step="1" value="${item.qty}" aria-label="${service.code} 核定單位數" />
        </label>
        <div class="item-subtotal">
          <span>小計</span>
          <strong>${money.format(service.price * item.qty)} 元</strong>
        </div>
      </div>
    `;

    bindFastTap(wrapper.querySelector('.remove-button'), () => removeService(service.code));
    wrapper.querySelector('.qty-input').addEventListener('change', event => updateQty(service.code, event.target.value));
    wrapper.querySelector('.qty-input').addEventListener('blur', event => updateQty(service.code, event.target.value));
    els.approvedList.appendChild(wrapper);
  });
}

function renderTotals() {
  const { budget, serviceTotal, copayTotal, remaining, usage } = calculateTotals();
  const progress = Math.min(100, usage);
  const isOver = usage > 100;
  const isWarning = usage >= 80 && usage <= 100;

  els.serviceTotal.textContent = money.format(serviceTotal);
  els.copayTotal.textContent = money.format(copayTotal);
  els.remainingAmount.textContent = `${remaining < 0 ? '超出 ' : ''}${money.format(Math.abs(remaining))} 元`;
  els.budgetUsage.textContent = `${usage.toFixed(1)}%`;
  els.budgetProgress.style.width = `${progress}%`;

  els.budgetProgress.classList.toggle('warning', isWarning);
  els.budgetProgress.classList.toggle('over', isOver);
  els.budgetUsage.classList.toggle('warning', isWarning);
  els.budgetUsage.classList.toggle('over', isOver);

  if (remaining < 0) {
    els.remainingAmount.style.color = '#fed7aa';
    els.budgetHint.classList.add('over');
    els.budgetHint.textContent = `已使用 ${usage.toFixed(1)}%，超出核定額度 ${money.format(Math.abs(remaining))} 元。`;
  } else if (serviceTotal === 0) {
    els.remainingAmount.style.color = '';
    els.budgetHint.classList.remove('over');
    els.budgetHint.textContent = '目前尚未使用核定額度。';
  } else if (usage >= 100) {
    els.remainingAmount.style.color = '';
    els.budgetHint.classList.remove('over');
    els.budgetHint.textContent = '核定額度已使用完畢。';
  } else if (usage >= 80) {
    els.remainingAmount.style.color = '';
    els.budgetHint.classList.remove('over');
    els.budgetHint.textContent = `已使用 ${usage.toFixed(1)}% 核定額度，請留意剩餘額度。`;
  } else {
    els.remainingAmount.style.color = '';
    els.budgetHint.classList.remove('over');
    els.budgetHint.textContent = `已使用 ${usage.toFixed(1)}% 核定額度。`;
  }

  // v14：服務卡片展開時，同步顯示「依目前剩餘額度，每週約還可增加幾次」。
  updateCapacityHints();
}

function renderAll() {
  renderBasic();
  renderServices();
  renderApproved();
  renderTotals();
}

els.identitySelect.addEventListener('change', event => {
  state.identity = event.target.value;
  saveState();
  renderBasic();
  renderTotals();
});

els.levelSelect.addEventListener('change', event => {
  state.level = event.target.value;
  saveState();
  renderBasic();
  renderTotals();
});

els.serviceSearch.addEventListener('input', event => {
  state.query = event.target.value;
  renderServices();
});

document.querySelectorAll('.filter-chip').forEach(button => {
  bindFastTap(button, () => {
    state.filter = button.dataset.filter;
    document.querySelectorAll('.filter-chip').forEach(chip => chip.classList.toggle('active', chip === button));
    renderServices();
  });
});

els.clearItemsBtn.addEventListener('click', () => {
  if (!state.items.length) return;
  if (confirm('確定要清除全部核定項目嗎？')) {
    state.items = [];
    saveState();
    renderAll();
  }
});

els.resetBtn.addEventListener('click', () => {
  if (confirm('確定要清空目前資料並回到預設值嗎？')) {
    state.identity = 'general';
    state.level = '2';
    state.items = [];
    state.filter = 'all';
    state.query = '';
    els.serviceSearch.value = '';
    document.querySelectorAll('.filter-chip').forEach(chip => chip.classList.toggle('active', chip.dataset.filter === 'all'));
    saveState();
    renderAll();
  }
});



// v16：從 STEP 3 另開新分頁產出服務項目總覽。
els.overviewBtn?.addEventListener('click', openServiceOverview);

loadState();
renderAll();

bindFastTap(els.resultPanel, () => scrollToStep3());
els.resultPanel?.addEventListener('keydown', event => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    scrollToStep3();
  }
});


// v9：取消 Service Worker 離線快取，避免手機長時間停留在舊版本。
// GitHub Pages 本身即可讓電腦關機後仍從手機連線使用。
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) await registration.unregister();
    } catch (_) {}

    if ('caches' in window) {
      try {
        const keys = await caches.keys();
        await Promise.all(
          keys
            .filter(key => key.startsWith('service-approval-mobile-'))
            .map(key => caches.delete(key))
        );
      } catch (_) {}
    }
  });
}
