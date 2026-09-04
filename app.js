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
  budgetHint: document.querySelector('#budgetHint'),
  resetBtn: document.querySelector('#resetBtn'),
  clearItemsBtn: document.querySelector('#clearItemsBtn'),
  template: document.querySelector('#serviceCardTemplate'),
};

const money = new Intl.NumberFormat('zh-TW');
const STORAGE_KEY = 'serviceApprovalMobile-v1';

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

function renderBasic() {
  const identity = IDENTITIES[state.identity];
  const budget = LEVEL_BUDGETS[state.level];
  els.identitySelect.value = state.identity;
  els.levelSelect.value = state.level;
  els.budgetAmount.textContent = money.format(budget);
  els.copayRate.textContent = identity.rateLabel;
  els.copayLabel.textContent = identity.label;
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

  const selectedCodes = new Set(state.items.map(item => item.code));

  visible.forEach(service => {
    const fragment = els.template.content.cloneNode(true);
    const card = fragment.querySelector('.service-card');
    const button = fragment.querySelector('.service-main');
    fragment.querySelector('.service-code').textContent = service.code;
    fragment.querySelector('.service-name').textContent = service.name;
    fragment.querySelector('.service-price').textContent = `單價 ${money.format(service.price)} 元｜一般 ${money.format(service.generalCopay)}｜中低 ${money.format(service.middleLowCopay)}`;
    const mark = fragment.querySelector('.add-mark');
    const selectedItem = state.items.find(item => item.code === service.code);
    button.setAttribute('aria-pressed', selectedItem ? 'true' : 'false');

    if (selectedCodes.has(service.code) && selectedItem) {
      card.dataset.selected = 'true';
      mark.textContent = '✓';
      mark.setAttribute('aria-label', '已加入，點一下可取消');
      button.title = '點一下取消此服務';

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
        dayButton.addEventListener('click', event => {
          event.stopPropagation();
          const selected = toggleWeekday(service.code, dayButton.dataset.day);
          dayButton.classList.toggle('active', selected);
          dayButton.setAttribute('aria-pressed', String(selected));
        });
      });

      card.appendChild(weeklyEditor);
    }

    button.addEventListener('click', () => toggleService(service.code));
    els.serviceList.appendChild(fragment);
  });
}

function toggleService(code) {
  const existing = state.items.find(item => item.code === code);
  if (existing) {
    // 已選取的服務再次點擊（包含右側勾勾）時，直接取消並縮回卡片。
    removeService(code);
    return;
  }
  addService(code);
}

function addService(code) {
  const existing = state.items.find(item => item.code === code);
  if (!existing) {
    state.items.push({ code, qty: 0, weeklyQty: 0, days: [] });
    saveState();
    renderAll();
  }

  // 保留使用者目前瀏覽位置，不自動捲動或搶焦點，方便繼續選其他服務。
}

function removeService(code) {
  state.items = state.items.filter(item => item.code !== code);
  saveState();
  renderAll();
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

  renderApproved();
  renderTotals();
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

  renderApproved();
  renderTotals();
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

    wrapper.querySelector('.remove-button').addEventListener('click', () => removeService(service.code));
    wrapper.querySelector('.qty-input').addEventListener('change', event => updateQty(service.code, event.target.value));
    wrapper.querySelector('.qty-input').addEventListener('blur', event => updateQty(service.code, event.target.value));
    els.approvedList.appendChild(wrapper);
  });
}

function renderTotals() {
  const budget = LEVEL_BUDGETS[state.level];
  let serviceTotal = 0;
  let copayTotal = 0;

  state.items.forEach(item => {
    const service = getService(item.code);
    if (!service) return;
    serviceTotal += service.price * item.qty;
    copayTotal += getCopayPerUnit(service) * item.qty;
  });

  const remaining = budget - serviceTotal;
  const progress = budget > 0 ? Math.min(100, (serviceTotal / budget) * 100) : 0;

  els.serviceTotal.textContent = money.format(serviceTotal);
  els.copayTotal.textContent = money.format(copayTotal);
  els.remainingAmount.textContent = `${remaining < 0 ? '超出 ' : ''}${money.format(Math.abs(remaining))} 元`;
  els.budgetProgress.style.width = `${progress}%`;

  if (remaining < 0) {
    els.remainingAmount.style.color = '#fed7aa';
    els.budgetProgress.classList.add('over');
    els.budgetHint.classList.add('over');
    els.budgetHint.textContent = `已超出核定額度 ${money.format(Math.abs(remaining))} 元。`;
  } else if (serviceTotal === 0) {
    els.remainingAmount.style.color = '';
    els.budgetProgress.classList.remove('over');
    els.budgetHint.classList.remove('over');
    els.budgetHint.textContent = '目前尚未使用核定額度。';
  } else {
    els.remainingAmount.style.color = '';
    els.budgetProgress.classList.remove('over');
    els.budgetHint.classList.remove('over');
    els.budgetHint.textContent = `已使用 ${progress.toFixed(1)}% 核定額度。`;
  }
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
  button.addEventListener('click', () => {
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

loadState();
renderAll();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
