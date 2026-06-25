import { generateHeadlines } from '../utils/engine';
import { examplesData } from '../utils/examples';

// --- Local State ---
let favorites: string[] = [];
let historyList: Array<{ timestamp: number; title: string; inputs: any }> = [];
let activeTab: 'all' | 'favorites' | 'history' = 'all';
let currentHeadlines: string[] = [];

// --- DOM References ---
const form = document.getElementById('generator-form') as HTMLFormElement;
const generateBtn = document.getElementById('generate-btn') as HTMLButtonElement;
const clearBtn = document.getElementById('clear-btn') as HTMLButtonElement;
const copyAllBtn = document.getElementById('copy-all-btn') as HTMLButtonElement;
const clearFavsBtn = document.getElementById('clear-favs-btn') as HTMLButtonElement;
const clearHistoryBtn = document.getElementById('clear-history-btn') as HTMLButtonElement;

// Inputs
const jobTitleInput = document.getElementById('job-title') as HTMLInputElement;
const industryInput = document.getElementById('industry') as HTMLInputElement;
const expLevelSelect = document.getElementById('experience-level') as HTMLSelectElement;
const skillsInput = document.getElementById('skills') as HTMLInputElement;
const audienceInput = document.getElementById('target-audience') as HTMLInputElement;
const goalSelect = document.getElementById('career-goal') as HTMLSelectElement;
const styleSelect = document.getElementById('headline-style') as HTMLSelectElement;

// Preview Mockup
const previewHeadline = document.getElementById('preview-headline') as HTMLDivElement;
const previewName = document.getElementById('preview-name') as HTMLSpanElement;

// Output Containers
const headlinesResults = document.getElementById('headlines-results') as HTMLDivElement;
const favoritesResults = document.getElementById('favorites-results') as HTMLDivElement;
const historyResults = document.getElementById('history-results') as HTMLDivElement;
const favCountSpan = document.getElementById('fav-count') as HTMLSpanElement;

// Tabs
const tabAll = document.getElementById('tab-all') as HTMLButtonElement;
const tabFavs = document.getElementById('tab-favs') as HTMLButtonElement;
const tabHistory = document.getElementById('tab-history') as HTMLButtonElement;

// Panels
const panelAll = document.getElementById('panel-all') as HTMLDivElement;
const panelFavorites = document.getElementById('panel-favorites') as HTMLDivElement;
const panelHistory = document.getElementById('panel-history') as HTMLDivElement;

// Theme
const themeToggleBtn = document.getElementById('theme-toggle-btn') as HTMLButtonElement;

// --- Initialize LocalStorage State ---
function initStorage() {
  try {
    const storedFavs = localStorage.getItem('favorite_headlines');
    if (storedFavs) {
      favorites = JSON.parse(storedFavs);
    }
  } catch (e) {
    favorites = [];
  }

  try {
    const storedHistory = localStorage.getItem('generation_history');
    if (storedHistory) {
      historyList = JSON.parse(storedHistory);
    }
  } catch (e) {
    historyList = [];
  }

  updateFavCount();
}

function updateFavCount() {
  if (favCountSpan) {
    favCountSpan.textContent = favorites.length.toString();
  }
}

// --- Theme Toggle Logic ---
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    showToast(`Switched to ${isDark ? 'Dark' : 'Light'} Mode`);
  });
}

// --- Toast Notifications System ---
function showToast(message: string) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  // Auto-remove toast after transition completes (3 seconds total)
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// --- Clipboard Copy Helpers ---
async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback if clipboard API fails
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    } catch (e) {
      document.body.removeChild(textarea);
      return false;
    }
  }
}

// --- Dynamic Preview Syncing on typing ---
function updateLivePreviewFromInputs() {
  const title = jobTitleInput.value.trim() || 'Your Job Title';
  const skills = skillsInput.value.trim();
  const ind = industryInput.value.trim() || 'Industry';
  
  if (currentHeadlines.length === 0) {
    if (skills) {
      const parsed = skills.split(',').map(s => s.trim()).filter(Boolean).join(' • ');
      previewHeadline.textContent = `${title} | Specialist in ${parsed} | ${ind} Professional`;
    } else {
      previewHeadline.textContent = `${title} | Helping businesses achieve growth | ${ind} Expert`;
    }
  }
}

[jobTitleInput, industryInput, skillsInput].forEach(input => {
  if (input) {
    input.addEventListener('input', updateLivePreviewFromInputs);
  }
});

// --- RENDER FUNCTIONS ---

// 1. Render Generated Headlines
function renderGeneratedHeadlines() {
  if (!headlinesResults) return;

  if (currentHeadlines.length === 0) {
    headlinesResults.innerHTML = `
      <div class="empty-state">
        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364.364l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
        <h3>Ready to Stand Out?</h3>
        <p class="mt-4">Fill out the details on the left and click Generate.</p>
      </div>
    `;
    return;
  }

  // Clear container
  headlinesResults.innerHTML = '';

  currentHeadlines.forEach((headline, index) => {
    const isFav = favorites.includes(headline);
    const len = headline.length;
    const isSafe = len <= 220;

    const item = document.createElement('div');
    item.className = 'headline-item';
    item.setAttribute('data-index', index.toString());
    
    // Add hover listener to update live preview
    item.addEventListener('mouseenter', () => {
      if (previewHeadline) {
        previewHeadline.textContent = headline;
      }
    });

    item.innerHTML = `
      <div class="headline-item-text">"${headline}"</div>
      <button class="icon-btn favorite-toggle ${isFav ? 'active' : ''}" data-headline="${encodeURIComponent(headline)}" title="Save to Favorites">
        <svg width="18" height="18" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
      </button>
      <div class="headline-item-footer">
        <div class="headline-metrics">
          <span class="char-counter ${!isSafe ? 'limit-exceeded' : ''}">${len} / 220 chars</span>
          <span class="badge ${isSafe ? 'badge-success' : 'badge-error'}">${isSafe ? 'LinkedIn-Safe' : 'Over Limit'}</span>
        </div>
        <div class="headline-item-actions">
          <button class="btn btn-secondary btn-sm copy-btn" data-headline="${encodeURIComponent(headline)}">Copy</button>
        </div>
      </div>
    `;

    headlinesResults.appendChild(item);
  });

  // Attach copy listeners
  headlinesResults.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const target = e.target as HTMLButtonElement;
      const text = decodeURIComponent(target.getAttribute('data-headline') || '');
      if (await copyToClipboard(text)) {
        showToast("Headline copied!");
      }
    });
  });

  // Attach favorite listeners
  headlinesResults.querySelectorAll('.favorite-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = (e.target as HTMLElement).closest('.favorite-toggle') as HTMLButtonElement;
      const text = decodeURIComponent(target.getAttribute('data-headline') || '');
      toggleFavorite(text, target);
    });
  });
}

// 2. Render Favorites Panel
function renderFavorites() {
  if (!favoritesResults) return;

  if (favorites.length === 0) {
    if (clearFavsBtn) clearFavsBtn.style.display = 'none';
    favoritesResults.innerHTML = `
      <div class="empty-state">
        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
        <p>No favorites saved yet. Click the heart icon next to any generated headline to save it here.</p>
      </div>
    `;
    return;
  }

  if (clearFavsBtn) clearFavsBtn.style.display = 'block';
  favoritesResults.innerHTML = '';

  favorites.forEach((headline, index) => {
    const len = headline.length;
    const isSafe = len <= 220;

    const item = document.createElement('div');
    item.className = 'headline-item';
    
    item.addEventListener('mouseenter', () => {
      if (previewHeadline) {
        previewHeadline.textContent = headline;
      }
    });

    item.innerHTML = `
      <div class="headline-item-text">"${headline}"</div>
      <button class="icon-btn favorite-toggle active" data-headline="${encodeURIComponent(headline)}" title="Remove Favorite">
        <svg width="18" height="18" fill="currentColor" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
      </button>
      <div class="headline-item-footer">
        <div class="headline-metrics">
          <span class="char-counter ${!isSafe ? 'limit-exceeded' : ''}">${len} / 220 chars</span>
          <span class="badge ${isSafe ? 'badge-success' : 'badge-error'}">${isSafe ? 'LinkedIn-Safe' : 'Over Limit'}</span>
        </div>
        <div class="headline-item-actions">
          <button class="btn btn-secondary btn-sm copy-btn" data-headline="${encodeURIComponent(headline)}">Copy</button>
        </div>
      </div>
    `;

    favoritesResults.appendChild(item);
  });

  // Attach copy listeners
  favoritesResults.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const target = e.target as HTMLButtonElement;
      const text = decodeURIComponent(target.getAttribute('data-headline') || '');
      if (await copyToClipboard(text)) {
        showToast("Headline copied!");
      }
    });
  });

  // Attach favorite click listeners to remove it
  favoritesResults.querySelectorAll('.favorite-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = (e.target as HTMLElement).closest('.favorite-toggle') as HTMLButtonElement;
      const text = decodeURIComponent(target.getAttribute('data-headline') || '');
      removeFavorite(text);
    });
  });
}

// 3. Render History Panel
function renderHistory() {
  if (!historyResults) return;

  if (historyList.length === 0) {
    if (clearHistoryBtn) clearHistoryBtn.style.display = 'none';
    historyResults.innerHTML = `
      <div class="empty-state">
        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <p>Your generation history is empty. Generate headlines to save sessions here.</p>
      </div>
    `;
    return;
  }

  if (clearHistoryBtn) clearHistoryBtn.style.display = 'block';
  historyResults.innerHTML = '';

  historyList.forEach((item, index) => {
    const timeStr = new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const card = document.createElement('div');
    card.className = 'headline-item';
    card.style.cursor = 'pointer';
    
    card.innerHTML = `
      <div style="font-weight:600; font-size:0.9rem; color:var(--primary); margin-bottom:0.25rem;">
        Session: ${item.title}
      </div>
      <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.75rem;">
        Generated at ${timeStr} • Style: ${item.inputs.headlineStyle}
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size:0.8rem; color:var(--text-secondary);">Role: ${item.inputs.jobTitle}</span>
        <button class="btn btn-secondary btn-sm load-history-btn" data-index="${index}">Load Session</button>
      </div>
    `;

    historyResults.appendChild(card);
  });

  // Attach load history click listeners
  historyResults.querySelectorAll('.load-history-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const target = e.target as HTMLButtonElement;
      const index = parseInt(target.getAttribute('data-index') || '0');
      loadHistoryItem(index);
    });
  });
}

// --- STATE ACTIONS ---

// Toggle Favorite headline
function toggleFavorite(headline: string, buttonEl?: HTMLButtonElement) {
  const index = favorites.indexOf(headline);
  if (index > -1) {
    favorites.splice(index, 1);
    showToast("Removed from favorites");
    if (buttonEl) {
      buttonEl.classList.remove('active');
      const svg = buttonEl.querySelector('svg');
      if (svg) svg.setAttribute('fill', 'none');
    }
  } else {
    favorites.push(headline);
    showToast("Added to favorites!");
    if (buttonEl) {
      buttonEl.classList.add('active');
      const svg = buttonEl.querySelector('svg');
      if (svg) svg.setAttribute('fill', 'currentColor');
    }
  }
  localStorage.setItem('favorite_headlines', JSON.stringify(favorites));
  updateFavCount();
  if (activeTab === 'favorites') {
    renderFavorites();
  }
}

// Remove favorite directly (usually from favorites tab)
function removeFavorite(headline: string) {
  favorites = favorites.filter(f => f !== headline);
  localStorage.setItem('favorite_headlines', JSON.stringify(favorites));
  updateFavCount();
  showToast("Removed from favorites");
  renderFavorites();
  
  // Also sync state in All list if rendered
  if (activeTab === 'all') {
    renderGeneratedHeadlines();
  }
}

// Load a past history session back into the form and re-generate
function loadHistoryItem(index: number) {
  const session = historyList[index];
  if (!session) return;

  const { inputs } = session;
  jobTitleInput.value = inputs.jobTitle || '';
  industryInput.value = inputs.industry || '';
  expLevelSelect.value = inputs.experienceLevel || 'Mid-Level';
  skillsInput.value = inputs.skills || '';
  audienceInput.value = inputs.targetAudience || '';
  goalSelect.value = inputs.careerGoal || 'Attract Clients';
  styleSelect.value = inputs.headlineStyle || 'Professional';

  showToast("History session loaded!");
  
  // Trigger generation
  generateBtn.click();
  
  // Switch tab back to all
  switchTab('all');
}

// Clear all Favorites
if (clearFavsBtn) {
  clearFavsBtn.addEventListener('click', () => {
    if (confirm("Are you sure you want to delete all saved favorite headlines?")) {
      favorites = [];
      localStorage.setItem('favorite_headlines', JSON.stringify(favorites));
      updateFavCount();
      renderFavorites();
      if (activeTab === 'all') {
        renderGeneratedHeadlines();
      }
      showToast("Favorites cleared");
    }
  });
}

// Clear all History
if (clearHistoryBtn) {
  clearHistoryBtn.addEventListener('click', () => {
    if (confirm("Are you sure you want to delete your recent generation history?")) {
      historyList = [];
      localStorage.setItem('generation_history', JSON.stringify(historyList));
      renderHistory();
      showToast("History cleared");
    }
  });
}

// --- GENERATION TRIGGER ---

function handleGenerate() {
  const jobTitle = jobTitleInput.value.trim();
  const industry = industryInput.value.trim();
  const skills = skillsInput.value.trim();
  const audience = audienceInput.value.trim();

  // Validate form fields basic
  if (!jobTitle || !industry || !skills || !audience) {
    showToast("Please fill out all required fields!");
    form.reportValidity();
    return;
  }

  const inputs = {
    jobTitle,
    industry,
    experienceLevel: expLevelSelect.value,
    skills,
    targetAudience: audience,
    careerGoal: goalSelect.value,
    headlineStyle: styleSelect.value
  };

  // 1. Generate 20 headlines
  currentHeadlines = generateHeadlines(inputs);

  // 2. Save in history (Limit to 10 entries)
  const newHistoryItem = {
    timestamp: Date.now(),
    title: jobTitle,
    inputs
  };
  historyList.unshift(newHistoryItem);
  if (historyList.length > 10) {
    historyList.pop();
  }
  localStorage.setItem('generation_history', JSON.stringify(historyList));

  // 3. Render Output
  renderGeneratedHeadlines();
  renderHistory(); // Refresh history panel
  
  // 4. Update preview with first item in list
  if (previewHeadline && currentHeadlines[0]) {
    previewHeadline.textContent = currentHeadlines[0];
  }

  showToast("Generated 20 professional ideas!");

  // Scroll to output panel if on mobile
  if (window.innerWidth < 768) {
    const outPanel = document.getElementById('output-panel');
    if (outPanel) {
      outPanel.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleGenerate();
  });
}

if (generateBtn) {
  generateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    handleGenerate();
  });
}

// Clear form trigger
if (clearBtn) {
  clearBtn.addEventListener('click', () => {
    form.reset();
    currentHeadlines = [];
    renderGeneratedHeadlines();
    updateLivePreviewFromInputs();
    showToast("Form cleared");
  });
}

// Copy All Headlines
if (copyAllBtn) {
  copyAllBtn.addEventListener('click', async () => {
    if (currentHeadlines.length === 0) {
      showToast("Generate headlines first!");
      return;
    }
    const joined = currentHeadlines.map((h, i) => `${i + 1}. ${h}`).join('\n\n');
    if (await copyToClipboard(joined)) {
      showToast("Copied all 20 headlines to clipboard!");
    }
  });
}

// --- TABS SWITCHER ---
function switchTab(tab: 'all' | 'favorites' | 'history') {
  activeTab = tab;
  
  // Reset tab buttons active classes
  [tabAll, tabFavs, tabHistory].forEach(btn => {
    if (btn) btn.classList.remove('active');
  });

  // Hide all panels
  if (panelAll) panelAll.style.display = 'none';
  if (panelFavorites) panelFavorites.style.display = 'none';
  if (panelHistory) panelHistory.style.display = 'none';

  // Activate selected tab & panel
  if (tab === 'all') {
    if (tabAll) tabAll.classList.add('active');
    if (panelAll) panelAll.style.display = 'block';
    renderGeneratedHeadlines();
  } else if (tab === 'favorites') {
    if (tabFavs) tabFavs.classList.add('active');
    if (panelFavorites) panelFavorites.style.display = 'block';
    renderFavorites();
  } else if (tab === 'history') {
    if (tabHistory) tabHistory.classList.add('active');
    if (panelHistory) panelHistory.style.display = 'block';
    renderHistory();
  }
}

[tabAll, tabFavs, tabHistory].forEach(tabEl => {
  if (tabEl) {
    tabEl.addEventListener('click', () => {
      const selected = tabEl.getAttribute('data-tab') as any;
      switchTab(selected);
    });
  }
});

// --- FAQ ACCORDION HANDLERS ---
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const trigger = item.querySelector('.faq-trigger');
  if (trigger) {
    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      
      // Close all other FAQ items for neatness
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('open');
        const otherTrigger = otherItem.querySelector('.faq-trigger');
        if (otherTrigger) {
          otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      if (!isOpen) {
        item.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      } else {
        item.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  }
});

// --- POPULAR EXAMPLES FILTER HANDLERS ---
const exampleTabBtns = document.querySelectorAll('.example-tab-btn');
const examplesContainer = document.getElementById('examples-results-container');

if (examplesContainer) {
  exampleTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active tab buttons
      exampleTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const roleKey = btn.getAttribute('data-role') || '';
      const list = examplesData[roleKey] || [];

      // Re-render examples block
      examplesContainer.innerHTML = '';
      list.forEach(item => {
        const card = document.createElement('div');
        card.className = 'example-headline-card';
        card.innerHTML = `
          <div class="example-headline-text">"${item.headline}"</div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
            <span class="example-headline-role">${item.role}</span>
            <button class="btn btn-secondary btn-sm copy-example-btn" data-text="${encodeURIComponent(item.headline)}">Copy</button>
          </div>
        `;
        examplesContainer.appendChild(card);
      });

      // Re-attach listeners to copy buttons in examples
      attachExampleCopyListeners();
    });
  });

  // Attach copy function to examples
  function attachExampleCopyListeners() {
    document.querySelectorAll('.copy-example-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const target = e.target as HTMLButtonElement;
        const text = decodeURIComponent(target.getAttribute('data-text') || '');
        if (await copyToClipboard(text)) {
          showToast("Example headline copied!");
        }
      });
    });
  }

  // Initial call
  attachExampleCopyListeners();
}

// --- KEYBOARD SHORTCUTS ---
window.addEventListener('keydown', (e) => {
  // 1. Ctrl + Enter => Generate Headlines
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault();
    handleGenerate();
  }
  
  // 2. Escape => Clear form (if inputs are focused)
  if (e.key === 'Escape') {
    const activeEl = document.activeElement;
    if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'SELECT')) {
      e.preventDefault();
      if (clearBtn) clearBtn.click();
    }
  }
});

// --- ON PAGE LOAD ---
window.addEventListener('DOMContentLoaded', () => {
  initStorage();
  updateLivePreviewFromInputs();
});
