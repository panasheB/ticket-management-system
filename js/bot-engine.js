/**
 * HelpDesk Customer AI Support Bot Engine
 * Handles conversational flows, guided options, exception/out-of-scope management,
 * and integration with the 10 Mongo ticket endpoints.
 */

class HelpDeskBotEngine {
  constructor() {
    this.messages = [];
    this.activeStep = null; // null | 'CREATE_WIZARD' | 'AWAIT_STATUS_ID' | 'AWAIT_COMMENT_ID' | 'AWAIT_COMMENT_TEXT' | 'AWAIT_CANCEL_ID' | 'AWAIT_REOPEN_ID' | 'AWAIT_CUSTOMER_ID'
    this.draftTicket = {};
    this.selectedTicketForAction = null;
    
    // Load customer profile from local storage or default
    this.customer = JSON.parse(localStorage.getItem('pulse_bot_customer') || 'null') || {
      customerId: 'CUS-' + Math.floor(1000 + Math.random() * 9000),
      name: '',
      phoneNumber: '',
      email: ''
    };

    // Keep track of tickets referenced during this session
    this.sessionTickets = JSON.parse(sessionStorage.getItem('pulse_bot_session_tickets') || '[]');

    // Active theme
    this.theme = localStorage.getItem('pulse_bot_theme') || 'dark';

    // SVG Icons
    this.icons = {
      bot: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/><rect width="18" height="12" x="3" y="8" rx="3"/><path d="M9 13v2"/><path d="M15 13v2"/><path d="M2 14h1"/><path d="M21 14h1"/></svg>`,
      user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>`,
      ticket: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/></svg>`,
      search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`,
      send: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
      refresh: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>`,
      check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
      message: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
      close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>`,
      copy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="13" height="13" x="9" y="9" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
      reopen: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>`,
      alert: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`,
      settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
      database: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
      book: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
      thumbsUp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>`,
      thumbsDown: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3"/></svg>`
    };
  }

  init(containerEl) {
    this.container = containerEl;
    this.applyTheme(this.theme);
    this.renderShell();
    this.bindEvents();
    
    // Initial welcome greeting
    if (this.messages.length === 0) {
      this.sendWelcomeMessage();
    }
  }

  applyTheme(theme) {
    this.theme = theme;
    localStorage.setItem('pulse_bot_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    const sel = document.getElementById('bot-theme-select');
    if (sel) sel.value = theme;
  }

  saveCustomer() {
    localStorage.setItem('pulse_bot_customer', JSON.stringify(this.customer));
  }

  saveSessionTickets() {
    sessionStorage.setItem('pulse_bot_session_tickets', JSON.stringify(this.sessionTickets));
  }

  recordTicket(ticketId) {
    if (!ticketId) return;
    const cleanId = String(ticketId).trim();
    if (!this.sessionTickets.includes(cleanId)) {
      this.sessionTickets.unshift(cleanId);
      this.saveSessionTickets();
    }
  }

  // =========================================================================
  // UI Rendering & Shell
  // =========================================================================
  renderShell() {
    const currentMode = window.apiClient ? window.apiClient.mode : 'auto';
    this.container.innerHTML = `
      <div class="bot-app-container">
        <!-- Header -->
        <header class="bot-header">
          <div class="bot-profile">
            <div class="bot-avatar-wrapper">
              ${this.icons.bot}
              <div class="bot-online-indicator" id="bot-status-indicator" title="Connected to 127.0.0.1:3200"></div>
            </div>
            <div class="bot-identity">
              <h1>HelpDesk AI <span class="bot-badge-pill">Assistant</span></h1>
              <p>Customer Support &amp; Ticket Operations</p>
            </div>
          </div>
          <div class="bot-header-controls">
            <!-- Operating Mode Switcher -->
            <select class="bot-mode-dropdown" id="bot-mode-select" title="Switch Operating Mode (Live API vs Mock Demo)">
              <option value="auto" ${currentMode === 'auto' ? 'selected' : ''}>⚡ Auto Fallback</option>
              <option value="real" ${currentMode === 'real' ? 'selected' : ''}>🟢 Live API</option>
              <option value="mock" ${currentMode === 'mock' ? 'selected' : ''}>📦 Mock Demo</option>
            </select>
            <select class="theme-dropdown" id="bot-theme-select" title="Switch Visual Theme">
              <option value="dark" ${this.theme === 'dark' ? 'selected' : ''}>🌙 Dark</option>
              <option value="light" ${this.theme === 'light' ? 'selected' : ''}>☀️ Light</option>
              <option value="midnight" ${this.theme === 'midnight' ? 'selected' : ''}>🌌 Midnight</option>
              <option value="emerald" ${this.theme === 'emerald' ? 'selected' : ''}>🌲 Emerald</option>
              <option value="sunset" ${this.theme === 'sunset' ? 'selected' : ''}>🌆 Sunset</option>
            </select>
            <button class="btn-header-action" id="btn-bot-settings" title="Backend &amp; Mock Settings">
              ${this.icons.settings}
            </button>
            <button class="btn-header-action" id="btn-bot-restart" title="Reset Conversation">
              ${this.icons.refresh}
            </button>
          </div>
        </header>

        <!-- Quick Action Nav Strip -->
        <div class="bot-action-strip">
          <button class="strip-pill" data-action="cmd-backend-settings" title="Toggle Mock Mode or change backend URL">
            ${this.icons.database} <span id="strip-mode-label">Mode: ${currentMode === 'real' ? 'Live' : (currentMode === 'mock' ? 'Mock' : 'Auto')}</span>
          </button>
          <button class="strip-pill highlight-pill" data-action="cmd-faqs" style="border-color:var(--bot-accent);background:var(--bot-accent-light);color:var(--bot-accent);font-weight:700;">
            ${this.icons.book} 📚 FAQs &amp; Help
          </button>
          <button class="strip-pill" data-action="cmd-new-ticket">
            ${this.icons.ticket} Log New Ticket
          </button>
          <button class="strip-pill" data-action="cmd-check-status">
            ${this.icons.search} Check Status
          </button>
          <button class="strip-pill" data-action="cmd-follow-up">
            ${this.icons.message} Follow-Up / Note
          </button>
          <button class="strip-pill" data-action="cmd-my-tickets">
            ${this.icons.user} My Tickets
          </button>
          <button class="strip-pill" data-action="cmd-reopen">
            ${this.icons.reopen} Re-Open Ticket
          </button>
          <button class="strip-pill" data-action="cmd-cancel">
            ${this.icons.close} Cancel Ticket
          </button>
        </div>

        <!-- Scrollable Messages Area -->
        <main class="bot-messages-area" id="bot-messages-list"></main>

        <!-- Mobile Sticky Input Bar -->
        <footer class="bot-input-bar-container">
          <div class="input-suggestions-strip" id="bot-quick-chips">
            <button class="suggestion-chip" data-text="Browse FAQs" style="border-color:var(--bot-accent);color:var(--bot-accent);font-weight:700;">📚 FAQs &amp; Solutions</button>
            <button class="suggestion-chip" data-text="Log a new ticket">🎟️ New Ticket</button>
            <button class="suggestion-chip" data-text="Check ticket status">🔍 Check Status</button>
            <button class="suggestion-chip" data-text="Switch to mock data">📦 Mock Mode</button>
            <button class="suggestion-chip" data-text="Backend settings">⚙️ Settings</button>
            <button class="suggestion-chip" data-text="Add a comment to my ticket">💬 Add Comment</button>
            <button class="suggestion-chip" data-text="Reopen my ticket">🔄 Reopen</button>
            <button class="suggestion-chip" data-text="Cancel my ticket">❌ Cancel</button>
            <button class="suggestion-chip" data-text="List all my tickets">📋 My History</button>
          </div>
          <form class="bot-input-form" id="bot-message-form">
            <input 
              type="text" 
              class="bot-text-input" 
              id="bot-user-input" 
              placeholder="Ask a question or select an option above..." 
              autocomplete="off" 
              required
            >
            <button type="submit" class="bot-send-btn" id="btn-bot-send" title="Send Message">
              ${this.icons.send}
            </button>
          </form>
        </footer>
      </div>
    `;
    this.messagesListEl = document.getElementById('bot-messages-list');
  }

  bindEvents() {
    // Mode switch
    const modeSelect = document.getElementById('bot-mode-select');
    if (modeSelect) {
      modeSelect.addEventListener('change', (e) => {
        const newMode = e.target.value;
        if (window.apiClient) {
          window.apiClient.setMode(newMode);
        }
        this.showMiniToast(`Switched to ${newMode === 'real' ? 'Live API' : (newMode === 'mock' ? 'Mock Demo' : 'Auto Fallback')} mode`);
        this.appendBotMessage({
          text: `⚙️ **Operating mode switched to ${newMode === 'real' ? '🟢 Live Backend' : (newMode === 'mock' ? '📦 Demo Mock Data' : '⚡ Auto Fallback')}!**\n\n${newMode === 'mock' ? 'The bot is now using local demo tickets (ideal for prototypes and standalone demos without a local server).' : (newMode === 'auto' ? 'The bot will attempt the backend and seamlessly use mock data if unreachable.' : 'The bot will make direct live requests to your backend at ' + (window.apiClient ? window.apiClient.baseUrl : '127.0.0.1:3200') + '.')}`,
          chips: [
            { label: '🎟️ Log a Ticket', text: 'Log a new ticket' },
            { label: '🔍 Check Status', text: 'Check ticket status' },
            { label: '📋 View Sample Tickets', text: 'List all my tickets' }
          ]
        });
      });
    }

    // Settings button in header
    const settingsBtn = document.getElementById('btn-bot-settings');
    if (settingsBtn) {
      settingsBtn.addEventListener('click', () => {
        this.showBackendSettings();
      });
    }

    // Theme switch
    const themeSelect = document.getElementById('bot-theme-select');
    if (themeSelect) {
      themeSelect.addEventListener('change', (e) => this.applyTheme(e.target.value));
    }

    // Reset button
    const restartBtn = document.getElementById('btn-bot-restart');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        this.messages = [];
        this.activeStep = null;
        this.draftTicket = {};
        this.sendWelcomeMessage();
      });
    }

    // Input form submit
    const form = document.getElementById('bot-message-form');
    const input = document.getElementById('bot-user-input');
    if (form && input) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) return;
        input.value = '';
        this.handleUserTextInput(text);
      });
    }

    // Action strip buttons
    document.addEventListener('click', (e) => {
      const stripPill = e.target.closest('.strip-pill');
      if (stripPill) {
        const act = stripPill.getAttribute('data-action');
        this.executeTopCommand(act);
        return;
      }

      // Quick chip clicks
      const chip = e.target.closest('.suggestion-chip, .opt-chip');
      if (chip) {
        const text = chip.getAttribute('data-text') || chip.innerText.trim();
        const act = chip.getAttribute('data-act');
        const val = chip.getAttribute('data-val');
        if (act && val) {
          this.handleStructuredChipAction(act, val);
        } else if (text) {
          this.handleUserTextInput(text);
        }
        return;
      }

      // Copy ticket ID button
      const copyBtn = e.target.closest('.btn-tkt-copy');
      if (copyBtn) {
        const id = copyBtn.getAttribute('data-id');
        if (id) {
          navigator.clipboard.writeText(id);
          this.showMiniToast(`Copied ${id} to clipboard!`);
        }
        return;
      }

      // Card action buttons (e.g. Follow up, Check status, Cancel, Reopen)
      const cardActionBtn = e.target.closest('.btn-card-action');
      if (cardActionBtn) {
        const act = cardActionBtn.getAttribute('data-action');
        const id = cardActionBtn.getAttribute('data-id');
        this.handleCardAction(act, id);
        return;
      }
    });
  }

  showMiniToast(msg) {
    if (typeof document === 'undefined' || typeof document.createElement !== 'function') return;
    const existing = document.getElementById('bot-mini-toast');
    if (existing) existing.remove();
    const container = document.querySelector('.bot-app-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.id = 'bot-mini-toast';
    toast.style.cssText = `
      position: absolute;
      top: 65px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(15, 23, 42, 0.9);
      color: #FFFFFF;
      padding: 6px 14px;
      border-radius: 9999px;
      font-size: 0.74rem;
      font-weight: 600;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
      animation: fadeInMsg 0.2s ease;
    `;
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  }

  // =========================================================================
  // Messaging Core
  // =========================================================================
  appendUserMessage(text) {
    const msg = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    this.messages.push(msg);
    this.renderMessages();
  }

  appendBotMessage({ text, cardType = null, cardData = null, chips = [] }) {
    const msg = {
      id: 'msg-' + Date.now(),
      sender: 'bot',
      text,
      cardType,
      cardData,
      chips,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    this.messages.push(msg);
    this.renderMessages();
  }

  renderMessages() {
    if (!this.messagesListEl) return;
    this.messagesListEl.innerHTML = this.messages.map(m => {
      const isUser = m.sender === 'user';
      return `
        <div class="msg-row ${isUser ? 'user' : 'bot'}">
          ${!isUser ? `
            <div class="msg-avatar">
              ${this.icons.bot}
            </div>
          ` : ''}
          <div class="msg-bubble-group">
            <div class="msg-bubble">
              <div>${m.text}</div>
              ${m.cardType ? this.renderCard(m.cardType, m.cardData) : ''}
              ${(m.chips && m.chips.length > 0) ? `
                <div class="interactive-chips-grid">
                  ${m.chips.map(c => `
                    <button class="opt-chip" data-text="${c.text || c.label}" data-act="${c.act || ''}" data-val="${c.val || ''}">
                      ${c.icon ? c.icon : ''} ${c.label || c.text}
                    </button>
                  `).join('')}
                </div>
              ` : ''}
            </div>
            <div class="msg-timestamp">${m.time}</div>
          </div>
        </div>
      `;
    }).join('');

    // Auto scroll to bottom
    this.messagesListEl.scrollTop = this.messagesListEl.scrollHeight;
  }

  showTypingIndicator() {
    const typingId = 'typing-indicator-row';
    const existing = document.getElementById(typingId);
    if (existing) return;
    const row = document.createElement('div');
    row.id = typingId;
    row.className = 'msg-row bot';
    row.innerHTML = `
      <div class="msg-avatar">${this.icons.bot}</div>
      <div class="msg-bubble-group">
        <div class="msg-bubble">
          <div class="typing-dots">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
          </div>
        </div>
      </div>
    `;
    this.messagesListEl.appendChild(row);
    this.messagesListEl.scrollTop = this.messagesListEl.scrollHeight;
  }

  removeTypingIndicator() {
    const el = document.getElementById('typing-indicator-row');
    if (el) el.remove();
  }

  // =========================================================================
  // Intent Handling & Conversational Logic
  // =========================================================================
  sendWelcomeMessage() {
    const custName = this.customer.name ? this.customer.name : 'there';
    this.appendBotMessage({
      text: `👋 Hello ${custName}! I am your **HelpDesk Support Assistant**. I can help you search troubleshooting procedures, resolve common issues via our Knowledge Base, or log and track service tickets with our technical operations team.`,
      chips: [
        { label: '📚 FAQs & Solutions', text: 'Browse FAQs' },
        { label: '🎟️ Log a Ticket', text: 'Log a new ticket' },
        { label: '🔍 Check Ticket Status', text: 'Check ticket status' },
        { label: '💬 Add Comment / Follow-Up', text: 'Add comment to ticket' },
        { label: '📋 View My Tickets', text: 'List all my tickets' },
        { label: '🔄 Reopen a Ticket', text: 'Reopen a ticket' },
        { label: '❌ Cancel a Ticket', text: 'Cancel a ticket' },
        { label: '⚙️ Backend & Mock Data', text: 'backend settings' }
      ]
    });
  }

  executeTopCommand(action) {
    if (action === 'cmd-faqs') {
      this.showFaqExplorer();
    } else if (action === 'cmd-new-ticket') {
      this.startTicketCreationWizard();
    } else if (action === 'cmd-check-status') {
      this.promptForStatusCheck();
    } else if (action === 'cmd-follow-up') {
      this.promptForFollowUp();
    } else if (action === 'cmd-my-tickets') {
      this.fetchMyTickets();
    } else if (action === 'cmd-reopen') {
      this.promptForReopen();
    } else if (action === 'cmd-cancel') {
      this.promptForCancel();
    } else if (action === 'cmd-backend-settings') {
      this.showBackendSettings();
    }
  }

  showBackendSettings() {
    this.appendBotMessage({
      text: `⚙️ **Backend & Data Mode Configuration**\n\nConfigure whether the bot should connect to your live backend, use automatic fallback, or run in standalone **Mock Demo Mode** (ideal for prototypes and standalone demos without a local server):`,
      cardType: 'BACKEND_SETTINGS_CARD',
      cardData: {}
    });
  }

  handleUserTextInput(rawText) {
    const text = String(rawText).trim();
    if (!text) return;

    this.appendUserMessage(text);
    this.showTypingIndicator();

    setTimeout(async () => {
      this.removeTypingIndicator();
      await this.processMessage(text);
    }, 450);
  }

  async processMessage(text) {
    const lower = text.toLowerCase();

    // ── Check if we are in an active guided workflow step ──────────────────
    if (this.activeStep === 'AWAIT_STATUS_ID') {
      this.activeStep = null;
      await this.handleCheckStatusById(text);
      return;
    }

    if (this.activeStep === 'AWAIT_COMMENT_ID') {
      this.selectedTicketForAction = text;
      this.activeStep = 'AWAIT_COMMENT_TEXT';
      this.appendBotMessage({
        text: `Got it! What message or update would you like to add to **${text}**?`,
        chips: [
          { label: '✅ Issue is resolved now', text: 'The issue has resolved on my end, thank you!' },
          { label: '⚠️ Still waiting for update', text: 'Any update on this? It is blocking my work.' },
          { label: '❌ Nevermind, cancel it', text: 'Cancel this ticket' }
        ]
      });
      return;
    }

    if (this.activeStep === 'AWAIT_COMMENT_TEXT') {
      const ticketId = this.selectedTicketForAction;
      this.activeStep = null;
      this.selectedTicketForAction = null;
      await this.submitComment(ticketId, text);
      return;
    }

    if (this.activeStep === 'AWAIT_CANCEL_ID') {
      this.selectedTicketForAction = text;
      this.activeStep = 'AWAIT_CANCEL_REASON';
      this.appendBotMessage({
        text: `Please select or type the reason for cancelling ticket **${text}**:`,
        chips: [
          { label: '✅ Resolved on my own', text: 'Resolved independently' },
          { label: '🔄 Duplicate ticket', text: 'Duplicate issue submitted by mistake' },
          { label: '🚫 No longer needed', text: 'No longer required' }
        ]
      });
      return;
    }

    if (this.activeStep === 'AWAIT_CANCEL_REASON') {
      const ticketId = this.selectedTicketForAction;
      this.activeStep = null;
      this.selectedTicketForAction = null;
      await this.submitCancel(ticketId, text);
      return;
    }

    if (this.activeStep === 'AWAIT_REOPEN_ID') {
      this.activeStep = null;
      await this.submitReopen(text);
      return;
    }

    if (this.activeStep === 'AWAIT_CUSTOMER_ID') {
      this.activeStep = null;
      this.customer.customerId = text.toUpperCase();
      this.saveCustomer();
      await this.fetchMyTickets(this.customer.customerId);
      return;
    }

    // ── Intent Matching ───────────────────────────────────────────────────

    // 0. Knowledge Base & FAQs Intent
    if (/(faq|faqs|knowledge|troubleshoot|how\s*to|fix|procedure|solution|steps\s*to|guide|resolve|article|help\s*center)/i.test(lower)) {
      const cleanKeywords = lower
        .replace(/(how\s*to\s*fix|how\s*to|can\s*i|faq|faqs|troubleshoot|guide|steps|procedure|solution|show\s*me|tell\s*me\s*about)/gi, '')
        .trim();
      await this.showFaqExplorer({ search: cleanKeywords });
      return;
    }

    // 1. Log / Create Ticket Intent
    if (/(create|log|open|new|file|submit|report)\s*(a|an)?\s*(ticket|issue|bug|problem|complaint)?/i.test(lower) || lower === 'new ticket') {
      this.startTicketCreationWizard();
      return;
    }

    // 2. Check Status Intent
    if (/(status|track|check|where is|progress|state)\s*(of|my)?\s*(ticket)?/i.test(lower)) {
      this.promptForStatusCheck();
      return;
    }

    // 3. Follow Up / Comment Intent
    if (/(follow\s*up|comment|note|reply|message|add\s*update|respond)/i.test(lower)) {
      this.promptForFollowUp();
      return;
    }

    // 4. My Tickets / History Intent
    if (/(my\s*tickets|ticket\s*history|all\s*my|list\s*tickets|past\s*tickets)/i.test(lower)) {
      await this.fetchMyTickets();
      return;
    }

    // 5. Reopen Intent
    if (/(reopen|re-open|open\s*again|still\s*broken|not\s*fixed|reactivate)/i.test(lower)) {
      this.promptForReopen();
      return;
    }

    // 6. Cancel Intent
    if (/(cancel|withdraw|close\s*my|nevermind|delete)\s*(ticket)?/i.test(lower)) {
      this.promptForCancel();
      return;
    }

    // 7. Greeting / Help Intent
    if (/^(hi|hello|hey|greetings|start|menu|help|options)$/i.test(lower)) {
      this.sendWelcomeMessage();
      return;
    }

    // 8. Backend & Mock Data Mode Intents
    if (/(mock|demo|offline|switch\s*to\s*mock|use\s*mock|use\s*demo|sample\s*data)/i.test(lower)) {
      if (window.apiClient) {
        window.apiClient.setMode('mock');
      }
      this.showMiniToast('Switched to Mock Demo Mode');
      this.appendBotMessage({
        text: `📦 **Switched to Mock Demo Mode!**\n\nThe bot is now using local demo tickets (ideal for prototypes and standalone demos without a local server). All ticket creation, status checks, comments, and cancellations work 100% in-browser!`,
        chips: [
          { label: '🎟️ Log a Ticket', text: 'Log a new ticket' },
          { label: '🔍 Check Status', text: 'Check ticket status' },
          { label: '📋 View Sample Tickets', text: 'List all my tickets' },
          { label: '⚙️ Settings', text: 'backend settings' }
        ]
      });
      return;
    }

    if (/(live\s*api|live\s*mode|real\s*backend|use\s*backend|switch\s*to\s*live)/i.test(lower)) {
      if (window.apiClient) {
        window.apiClient.setMode('real');
      }
      this.showMiniToast('Switched to Live API Mode');
      this.appendBotMessage({
        text: `🟢 **Switched to Live API Mode!**\n\nThe bot will make direct requests to \`${window.apiClient ? window.apiClient.baseUrl : '127.0.0.1:3200'}\`. Ensure your backend server is online and allows CORS.`,
        chips: [
          { label: '🔍 Test Connection (Ping)', act: 'ping_backend' },
          { label: '🎟️ Log a Ticket', text: 'Log a new ticket' },
          { label: '⚙️ Backend Settings', text: 'backend settings' }
        ]
      });
      return;
    }

    if (/(auto\s*mode|auto\s*fallback|switch\s*to\s*auto)/i.test(lower)) {
      if (window.apiClient) {
        window.apiClient.setMode('auto');
      }
      this.showMiniToast('Switched to Auto Fallback Mode');
      this.appendBotMessage({
        text: `⚡ **Switched to Auto Fallback Mode!**\n\nThe bot attempts your live backend and seamlessly falls back to mock data if the server is unreachable (ideal for cloud demos and prototypes).`,
        chips: [
          { label: '🎟️ Log a Ticket', text: 'Log a new ticket' },
          { label: '⚙️ Backend Settings', text: 'backend settings' }
        ]
      });
      return;
    }

    if (/(backend|settings|config|api\s*url|endpoint|mock\s*settings)/i.test(lower)) {
      this.showBackendSettings();
      return;
    }

    // 9. Theme Switch Intent
    if (lower.includes('theme') || lower.includes('dark') || lower.includes('light') || lower.includes('midnight') || lower.includes('emerald') || lower.includes('sunset')) {
      if (lower.includes('light')) this.applyTheme('light');
      else if (lower.includes('midnight')) this.applyTheme('midnight');
      else if (lower.includes('emerald')) this.applyTheme('emerald');
      else if (lower.includes('sunset')) this.applyTheme('sunset');
      else this.applyTheme('dark');

      this.appendBotMessage({
        text: `🎨 Visual theme updated to **${this.theme.toUpperCase()}**! How else can I help?`,
        chips: [
          { label: '🎟️ Log Ticket', text: 'Log a new ticket' },
          { label: '🔍 Check Status', text: 'Check ticket status' }
        ]
      });
      return;
    }

    // 9. Exact Ticket ID Match (e.g., user pasted "TKT-2026-AA37D319" or mongo ID)
    if (/^(tkt-[a-z0-9\-]+|[a-f0-9]{24})$/i.test(text.trim())) {
      await this.handleCheckStatusById(text.trim());
      return;
    }

    // ── Exception / Out-of-Scope Handling ─────────────────────────────────
    this.handleOutOfScope(text);
  }

  handleOutOfScope(userText) {
    this.appendBotMessage({
      text: `I'm your **HelpDesk Virtual Assistant**, specialized strictly in helpdesk & support ticket operations. 

I couldn't quite match *"${userText}"* with an available support workflow. Please select an option below so I can guide you:`,
      chips: [
        { label: '🎟️ Log a Ticket', text: 'Log a new ticket' },
        { label: '🔍 Track a Ticket', text: 'Check ticket status' },
        { label: '💬 Add Comment', text: 'Add comment to ticket' },
        { label: '📋 View My Tickets', text: 'List all my tickets' },
        { label: '🔄 Reopen Ticket', text: 'Reopen a ticket' },
        { label: '❌ Cancel Ticket', text: 'Cancel a ticket' }
      ]
    });
  }

  // =========================================================================
  // Workflow 1: Guided Ticket Creation Wizard
  // =========================================================================
  startTicketCreationWizard(prefills = {}) {
    this.activeStep = 'CREATE_WIZARD';
    this.draftTicket = {
      category: prefills.category || 'APPLICATION',
      priority: prefills.priority || 'MEDIUM',
      channel: 'WEB',
      subject: prefills.subject || '',
      description: prefills.description || '',
      customerId: this.customer.customerId ? this.customer.customerId : '1234PANASHE',
      customerName: this.customer.name ? this.customer.name : 'Panashe Budzinike',
      phoneNumber: this.customer.phoneNumber ? this.customer.phoneNumber : '0786398208',
      email: this.customer.email ? this.customer.email : 'panashe@example.com'
    };

    this.appendBotMessage({
      text: prefills.subject
        ? `I've pre-filled your ticket with details from the FAQ. Please review or adjust below to submit to our operations team:`
        : `Let's log your service ticket. Please configure the details below or adjust the fields to match your issue:`,
      cardType: 'CREATE_WIZARD_FORM',
      cardData: this.draftTicket
    });
  }

  async handleWizardSubmit(formData) {
    this.activeStep = null;
    this.showTypingIndicator();

    // Cache customer details for convenience
    this.customer.customerId = formData.customerId || this.customer.customerId;
    this.customer.name = formData.customerName || this.customer.name;
    this.customer.phoneNumber = formData.phoneNumber || this.customer.phoneNumber;
    this.customer.email = formData.email || this.customer.email;
    this.saveCustomer();

    const payload = {
      customer: {
        customerId: formData.customerId,
        name: formData.customerName,
        phoneNumber: formData.phoneNumber || '',
        email: formData.email || ''
      },
      channel: formData.channel || 'WEB',
      subject: formData.subject,
      description: formData.description,
      category: formData.category || 'APPLICATION',
      subcategory: formData.subcategory || 'GENERAL',
      priority: formData.priority || 'MEDIUM',
      metadata: {
        device: formData.device || (navigator.userAgent.includes('Mobile') ? 'Mobile Web Bot' : 'Desktop Web Bot'),
        applicationVersion: '2.1.0',
        errorCode: formData.errorCode || ''
      }
    };

    try {
      let res;
      if (window.apiClient && typeof window.apiClient.createTicket === 'function') {
        res = await window.apiClient.createTicket(payload);
      } else {
        // Direct fetch
        const resp = await fetch('http://127.0.0.1:3200/mongo/tickets/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload)
        });
        res = await resp.json();
      }

      this.removeTypingIndicator();
      
      const tInfo = res ? (res.ticket ? res.ticket : (res.data ? res.data : res)) : {};
      const newId = tInfo ? (tInfo.ticketId ? tInfo.ticketId : (tInfo._id ? String(tInfo._id) : 'TKT-' + Math.random().toString(16).substring(2,8).toUpperCase())) : 'TKT-NEW';
      
      this.recordTicket(newId);

      this.appendBotMessage({
        text: `🎉 **Success! Your ticket has been logged.** Our operations team has been alerted and will review it shortly.`,
        cardType: 'TICKET_SUMMARY_CARD',
        cardData: {
          ticketId: newId,
          subject: payload.subject,
          category: payload.category,
          status: 'OPEN',
          priority: payload.priority,
          customerName: payload.customer.name,
          createdAt: new Date().toISOString()
        },
        chips: [
          { label: '💬 Add a Note/Comment', act: 'follow_up', val: newId },
          { label: '🔍 Check Status', act: 'check_status', val: newId },
          { label: '❌ Cancel Ticket', act: 'cancel', val: newId }
        ]
      });

    } catch (err) {
      this.removeTypingIndicator();
      const errMsg = err ? (err.message ? String(err.message) : String(err)) : 'Network error';
      const isNet = errMsg.includes('Connection failed') || errMsg.includes('CORS') || errMsg.includes('Failed to fetch') || errMsg.includes('NetworkError');
      this.lastFailedAction = { type: 'CREATE_TICKET', payload };
      this.appendBotMessage({
        text: `⚠️ **Unable to log ticket to live backend:** ${errMsg}.\n\n` +
              (isNet ? `*Tip:* If your backend on port 3200 is not available, switch to **Mock Demo Mode** to test the entire creation workflow using simulated tickets.` : ''),
        chips: isNet ? [
          { label: '📦 Switch to Mock Mode & Retry', act: 'switch_to_mock_and_retry' },
          { label: '⚡ Enable Auto Fallback', act: 'switch_mode', val: 'auto' },
          { label: '⚙️ Backend Settings', text: 'backend settings' }
        ] : [
          { label: '🔄 Try Again', text: 'Log a new ticket' },
          { label: '🏠 Main Menu', text: 'help' }
        ]
      });
    }
  }

  // =========================================================================
  // Workflow 2: Check Ticket Status
  // =========================================================================
  promptForStatusCheck() {
    this.activeStep = 'AWAIT_STATUS_ID';
    const chips = this.sessionTickets.slice(0, 4).map(id => ({
      label: id,
      text: id
    }));

    this.appendBotMessage({
      text: `Please enter your **Ticket ID** (e.g. \`TKT-2026-AA37D319\`) or choose a recent ticket:`,
      chips: chips.length > 0 ? chips : [
        { label: '📋 Look up all my tickets', text: 'List all my tickets' }
      ]
    });
  }

  async handleCheckStatusById(ticketId) {
    this.showTypingIndicator();
    try {
      let raw;
      if (window.apiClient && typeof window.apiClient.getTicketById === 'function') {
        raw = await window.apiClient.getTicketById(ticketId);
      } else {
        const resp = await fetch(`http://127.0.0.1:3200/mongo/tickets/getAll?ticketId=${encodeURIComponent(ticketId)}`);
        raw = await resp.json();
      }

      this.removeTypingIndicator();

      // Normalize with ternary operators
      const list = Array.isArray(raw) ? raw : (raw && Array.isArray(raw.data) ? raw.data : (raw ? [raw] : []));
      const ticket = list.length > 0 ? list[0] : null;

      if (!ticket) {
        this.appendBotMessage({
          text: `🔍 We couldn't find any ticket with ID **${ticketId}**. Please double-check the ID or search using your Customer ID:`,
          chips: [
            { label: '📋 View All My Tickets', text: 'List all my tickets' },
            { label: '🎟️ Log New Ticket', text: 'Log a new ticket' }
          ]
        });
        return;
      }

      this.recordTicket(ticket.ticketId || ticketId);

      const tStatus = ticket.status ? String(ticket.status).toUpperCase() : 'OPEN';
      const tPrio = ticket.priority ? String(ticket.priority).toUpperCase() : 'MEDIUM';
      const custObj = (ticket.customer && typeof ticket.customer === 'object') ? ticket.customer : null;
      const custName = custObj ? (custObj.name ? String(custObj.name) : 'Customer') : (ticket.customer ? String(ticket.customer) : 'Customer');
      const techObj = (ticket.technician && typeof ticket.technician === 'object') ? ticket.technician : null;
      const techName = techObj ? (techObj.name ? String(techObj.name) : 'Assigned Technician') : (typeof ticket.technician === 'string' ? ticket.technician : 'Unassigned');

      this.appendBotMessage({
        text: `Here is the current operational status for **${ticket.ticketId ? ticket.ticketId : ticketId}**:`,
        cardType: 'TICKET_STATUS_CARD',
        cardData: {
          ticketId: ticket.ticketId ? ticket.ticketId : ticketId,
          status: tStatus,
          priority: tPrio,
          subject: ticket.subject ? ticket.subject : '(No Subject)',
          category: ticket.category ? ticket.category : 'APPLICATION',
          customerName: custName,
          techName: techName,
          createdAt: ticket.createdAt ? ticket.createdAt : null,
          commentsCount: Array.isArray(ticket.comments) ? ticket.comments.length : 0
        },
        chips: [
          { label: '💬 Add Comment', act: 'follow_up', val: ticket.ticketId ? ticket.ticketId : ticketId },
          { label: '📜 View Discussion', act: 'view_comments', val: ticket.ticketId ? ticket.ticketId : ticketId },
          tStatus !== 'CLOSED' && tStatus !== 'CANCELLED'
            ? { label: '❌ Cancel Ticket', act: 'cancel', val: ticket.ticketId ? ticket.ticketId : ticketId }
            : { label: '🔄 Reopen Ticket', act: 'reopen', val: ticket.ticketId ? ticket.ticketId : ticketId }
        ].filter(Boolean)
      });

    } catch (err) {
      this.removeTypingIndicator();
      const msg = err ? (err.message ? String(err.message) : String(err)) : 'Error checking status';
      const isNet = msg.includes('Connection failed') || msg.includes('CORS') || msg.includes('Failed to fetch') || msg.includes('NetworkError');
      this.lastFailedAction = { type: 'CHECK_STATUS', ticketId };
      this.appendBotMessage({
        text: `⚠️ Error fetching status for **${ticketId}**: ${msg}\n\n` +
              (isNet ? `*Tip:* Switch to **Mock Demo Mode** to inspect sample tickets without a local backend.` : ''),
        chips: isNet ? [
          { label: '📦 Switch to Mock Demo & Retry', act: 'switch_to_mock_and_retry' },
          { label: '⚡ Enable Auto Fallback', act: 'switch_mode', val: 'auto' },
          { label: '⚙️ Settings', text: 'backend settings' }
        ] : [
          { label: '🔄 Retry', text: ticketId },
          { label: '🏠 Main Menu', text: 'help' }
        ]
      });
    }
  }

  // =========================================================================
  // Workflow 3: Follow-Up & Add Comment
  // =========================================================================
  promptForFollowUp() {
    this.activeStep = 'AWAIT_COMMENT_ID';
    const chips = this.sessionTickets.slice(0, 4).map(id => ({
      label: id,
      text: id
    }));

    this.appendBotMessage({
      text: `Which ticket would you like to follow up or add a comment to?`,
      chips: chips.length > 0 ? chips : [
        { label: '📋 View All My Tickets', text: 'List all my tickets' }
      ]
    });
  }

  async submitComment(ticketId, commentText) {
    this.showTypingIndicator();
    try {
      const payload = {
        comment: commentText,
        createdBy: {
          userId: this.customer.customerId ? this.customer.customerId : 'CUSTOMER',
          userType: 'CUSTOMER',
          name: this.customer.name ? this.customer.name : 'Customer'
        },
        visibility: 'PUBLIC'
      };

      if (window.apiClient && typeof window.apiClient.addComment === 'function') {
        await window.apiClient.addComment(ticketId, payload);
      } else {
        await fetch(`http://127.0.0.1:3200/mongo/tickets/${encodeURIComponent(ticketId)}/comments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      this.removeTypingIndicator();
      this.recordTicket(ticketId);

      this.appendBotMessage({
        text: `✅ **Update posted!** Your note has been added to ticket **${ticketId}** and transmitted to the assigned support engineer.`,
        chips: [
          { label: '📜 View Discussion Stream', act: 'view_comments', val: ticketId },
          { label: '🔍 Check Status', act: 'check_status', val: ticketId }
        ]
      });

    } catch (err) {
      this.removeTypingIndicator();
      const msg = err ? (err.message ? String(err.message) : String(err)) : 'Failed to post note';
      const isNet = msg.includes('Connection failed') || msg.includes('CORS') || msg.includes('Failed to fetch') || msg.includes('NetworkError');
      this.lastFailedAction = { type: 'ADD_COMMENT', ticketId, commentText };
      this.appendBotMessage({
        text: `⚠️ Could not post comment to **${ticketId}**: ${msg}\n\n` +
              (isNet ? `*Tip:* Switch to **Mock Demo Mode** to test notes and activity streams.` : ''),
        chips: isNet ? [
          { label: '📦 Switch to Mock Demo & Retry', act: 'switch_to_mock_and_retry' },
          { label: '⚡ Enable Auto Fallback', act: 'switch_mode', val: 'auto' }
        ] : [
          { label: '🔄 Try Again', text: 'Add a comment to my ticket' },
          { label: '🏠 Main Menu', text: 'help' }
        ]
      });
    }
  }

  // =========================================================================
  // Workflow 4: View Ticket Discussion / Comments Stream
  // =========================================================================
  async viewDiscussionStream(ticketId) {
    this.showTypingIndicator();
    try {
      let raw;
      if (window.apiClient && typeof window.apiClient.getTicketById === 'function') {
        raw = await window.apiClient.getTicketById(ticketId);
      } else {
        const resp = await fetch(`http://127.0.0.1:3200/mongo/tickets/getAll?ticketId=${encodeURIComponent(ticketId)}`);
        raw = await resp.json();
      }

      this.removeTypingIndicator();
      const list = Array.isArray(raw) ? raw : (raw && Array.isArray(raw.data) ? raw.data : [raw]);
      const ticket = list && list.length > 0 ? list[0] : null;

      if (!ticket) {
        this.appendBotMessage({ text: `Could not load comments for ${ticketId}.` });
        return;
      }

      const comments = Array.isArray(ticket.comments) ? ticket.comments : [];

      if (comments.length === 0) {
        this.appendBotMessage({
          text: `ℹ️ Ticket **${ticketId}** does not have any updates or comments yet.`,
          chips: [
            { label: '💬 Post First Comment', act: 'follow_up', val: ticketId },
            { label: '🔍 Status', act: 'check_status', val: ticketId }
          ]
        });
        return;
      }

      this.appendBotMessage({
        text: `📜 **Discussion Stream for ${ticketId}** (${comments.length} update${comments.length !== 1 ? 's' : ''}):`,
        cardType: 'COMMENTS_TIMELINE',
        cardData: {
          ticketId,
          comments
        },
        chips: [
          { label: '💬 Add Reply', act: 'follow_up', val: ticketId },
          { label: '🔍 Check Status', act: 'check_status', val: ticketId }
        ]
      });

    } catch (err) {
      this.removeTypingIndicator();
      const msg = err ? (err.message ? String(err.message) : String(err)) : 'Error loading comments';
      this.appendBotMessage({ text: `⚠️ ${msg}` });
    }
  }

  // =========================================================================
  // Workflow 5: Cancel Ticket
  // =========================================================================
  promptForCancel() {
    this.activeStep = 'AWAIT_CANCEL_ID';
    const chips = this.sessionTickets.slice(0, 4).map(id => ({
      label: id,
      text: id
    }));

    this.appendBotMessage({
      text: `Which ticket would you like to cancel?`,
      chips: chips.length > 0 ? chips : [
        { label: '📋 View All My Tickets', text: 'List all my tickets' }
      ]
    });
  }

  async submitCancel(ticketId, reason) {
    this.showTypingIndicator();
    try {
      const payload = {
        cancelledBy: this.customer.customerId ? this.customer.customerId : 'CUSTOMER',
        reason: reason || 'Resolved by customer'
      };

      if (window.apiClient && typeof window.apiClient.cancelTicket === 'function') {
        await window.apiClient.cancelTicket(ticketId, payload);
      } else {
        await fetch(`http://127.0.0.1:3200/mongo/tickets/${encodeURIComponent(ticketId)}/cancel`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      this.removeTypingIndicator();

      this.appendBotMessage({
        text: `🚫 Ticket **${ticketId}** has been successfully cancelled. Reason: *"${reason}"*.`,
        chips: [
          { label: '🔄 Changed your mind? Reopen it', act: 'reopen', val: ticketId },
          { label: '🎟️ Log a New Ticket', text: 'Log a new ticket' }
        ]
      });

    } catch (err) {
      this.removeTypingIndicator();
      const msg = err ? (err.message ? String(err.message) : String(err)) : 'Failed to cancel ticket';
      const isNet = msg.includes('Connection failed') || msg.includes('CORS') || msg.includes('Failed to fetch') || msg.includes('NetworkError');
      this.lastFailedAction = { type: 'CANCEL_TICKET', ticketId, reason };
      this.appendBotMessage({
        text: `⚠️ Could not cancel **${ticketId}**: ${msg}\n\n` +
              (isNet ? `*Tip:* Switch to **Mock Demo Mode** to test ticket cancellation.` : ''),
        chips: isNet ? [
          { label: '📦 Switch to Mock Demo & Retry', act: 'switch_to_mock_and_retry' },
          { label: '⚡ Enable Auto Fallback', act: 'switch_mode', val: 'auto' }
        ] : [
          { label: '🏠 Main Menu', text: 'help' }
        ]
      });
    }
  }

  // =========================================================================
  // Workflow 6: Reopen Ticket
  // =========================================================================
  promptForReopen() {
    this.activeStep = 'AWAIT_REOPEN_ID';
    const chips = this.sessionTickets.slice(0, 4).map(id => ({
      label: id,
      text: id
    }));

    this.appendBotMessage({
      text: `Which ticket would you like to reopen? Enter the Ticket ID:`,
      chips: chips.length > 0 ? chips : [
        { label: '📋 View All My Tickets', text: 'List all my tickets' }
      ]
    });
  }

  async submitReopen(ticketId) {
    this.showTypingIndicator();
    try {
      const payload = {
        status: 'OPEN',
        updatedBy: this.customer.customerId ? this.customer.customerId : 'CUSTOMER'
      };

      // 1. Update status to OPEN
      if (window.apiClient && typeof window.apiClient.updateTicketStatus === 'function') {
        await window.apiClient.updateTicketStatus(ticketId, payload);
      } else {
        await fetch(`http://127.0.0.1:3200/mongo/tickets/${encodeURIComponent(ticketId)}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      // 2. Add reopening note
      try {
        const commentPayload = {
          comment: "Ticket reopened by customer.",
          createdBy: {
            userId: this.customer.customerId ? this.customer.customerId : 'CUSTOMER',
            userType: 'CUSTOMER',
            name: this.customer.name ? this.customer.name : 'Customer'
          },
          visibility: 'PUBLIC'
        };
        if (window.apiClient && typeof window.apiClient.addComment === 'function') {
          await window.apiClient.addComment(ticketId, commentPayload);
        }
      } catch (e) {
        // non-blocking
      }

      this.removeTypingIndicator();
      this.recordTicket(ticketId);

      this.appendBotMessage({
        text: `🔄 Ticket **${ticketId}** has been **reopened** and moved back into the active queue! Our operations team has been notified.`,
        chips: [
          { label: '💬 Add details on why you reopened', act: 'follow_up', val: ticketId },
          { label: '🔍 Check Status', act: 'check_status', val: ticketId }
        ]
      });

    } catch (err) {
      this.removeTypingIndicator();
      const msg = err ? (err.message ? String(err.message) : String(err)) : 'Failed to reopen';
      const isNet = msg.includes('Connection failed') || msg.includes('CORS') || msg.includes('Failed to fetch') || msg.includes('NetworkError');
      this.lastFailedAction = { type: 'REOPEN_TICKET', ticketId };
      this.appendBotMessage({
        text: `⚠️ Could not reopen **${ticketId}**: ${msg}\n\n` +
              (isNet ? `*Tip:* Switch to **Mock Demo Mode** to test ticket reopening.` : ''),
        chips: isNet ? [
          { label: '📦 Switch to Mock Demo & Retry', act: 'switch_to_mock_and_retry' },
          { label: '⚡ Enable Auto Fallback', act: 'switch_mode', val: 'auto' }
        ] : [
          { label: '🏠 Main Menu', text: 'help' }
        ]
      });
    }
  }

  // =========================================================================
  // Workflow 7: Fetch My Tickets
  // =========================================================================
  async fetchMyTickets(customerId = null) {
    const custId = customerId || this.customer.customerId || '1234PANASHE';
    this.showTypingIndicator();

    try {
      let raw;
      if (window.apiClient && typeof window.apiClient.getTicketsByCustomerId === 'function') {
        raw = await window.apiClient.getTicketsByCustomerId(custId);
      } else {
        const resp = await fetch(`http://127.0.0.1:3200/mongo/tickets/getAll?customerId=${encodeURIComponent(custId)}`);
        raw = await resp.json();
      }

      this.removeTypingIndicator();

      const list = Array.isArray(raw) ? raw : (raw && Array.isArray(raw.data) ? raw.data : (raw ? [raw] : []));
      const valid = list.filter(t => t && typeof t === 'object');

      if (valid.length === 0) {
        this.activeStep = 'AWAIT_CUSTOMER_ID';
        this.appendBotMessage({
          text: `🔍 No tickets found for Customer ID **${custId}**. If your customer ID is different, please type it below:`,
          chips: [
            { label: '🎟️ Log New Ticket Instead', text: 'Log a new ticket' },
            { label: 'Sample: 1234PANASHE', text: '1234PANASHE' }
          ]
        });
        return;
      }

      valid.forEach(t => {
        if (t.ticketId) this.recordTicket(t.ticketId);
      });

      this.appendBotMessage({
        text: `📋 Found **${valid.length} ticket${valid.length !== 1 ? 's' : ''}** for Customer ID **${custId}**:`,
        cardType: 'TICKETS_CAROUSEL',
        cardData: {
          tickets: valid.slice(0, 5)
        },
        chips: [
          { label: '🎟️ Log Another Ticket', text: 'Log a new ticket' }
        ]
      });

    } catch (err) {
      this.removeTypingIndicator();
      const msg = err ? (err.message ? String(err.message) : String(err)) : 'Failed to load tickets';
      const isNet = msg.includes('Connection failed') || msg.includes('CORS') || msg.includes('Failed to fetch') || msg.includes('NetworkError');
      this.lastFailedAction = { type: 'MY_TICKETS', customerId: custId };
      this.appendBotMessage({
        text: `⚠️ Could not retrieve tickets for **${custId}**: ${msg}\n\n` +
              (isNet ? `*Tip:* Switch to **Mock Demo Mode** to view pre-seeded demo tickets.` : ''),
        chips: isNet ? [
          { label: '📦 Switch to Mock Demo & Retry', act: 'switch_to_mock_and_retry' },
          { label: '⚡ Enable Auto Fallback', act: 'switch_mode', val: 'auto' }
        ] : [
          { label: '🎟️ Log a Ticket', text: 'Log a new ticket' },
          { label: '🏠 Main Menu', text: 'help' }
        ]
      });
    }
  }

  // =========================================================================
  // Structured Card Handlers & Renderers
  // =========================================================================
  handleStructuredChipAction(act, val) {
    if (act === 'check_status') {
      this.handleCheckStatusById(val);
    } else if (act === 'follow_up') {
      this.selectedTicketForAction = val;
      this.activeStep = 'AWAIT_COMMENT_TEXT';
      this.appendBotMessage({
        text: `Please type your update or comment for ticket **${val}**:`,
        chips: [
          { label: '✅ Issue is resolved now', text: 'The issue has resolved on my end, thank you!' },
          { label: '⚠️ Need urgent update', text: 'Please provide an update as this is blocking.' }
        ]
      });
    } else if (act === 'view_comments') {
      this.viewDiscussionStream(val);
    } else if (act === 'cancel') {
      this.selectedTicketForAction = val;
      this.activeStep = 'AWAIT_CANCEL_REASON';
      this.appendBotMessage({
        text: `What is the reason for cancelling ticket **${val}**?`,
        chips: [
          { label: '✅ Resolved on my own', text: 'Resolved independently' },
          { label: '🔄 Duplicate ticket', text: 'Duplicate issue' },
          { label: '🚫 No longer needed', text: 'No longer required' }
        ]
      });
    } else if (act === 'reopen') {
      this.submitReopen(val);
    } else if (act === 'switch_mode') {
      if (window.apiClient) {
        window.apiClient.setMode(val);
      }
      this.showMiniToast(`Switched to ${val.toUpperCase()} mode`);
      this.appendBotMessage({
        text: `Switched operating mode to **${val === 'real' ? '🟢 Live API' : (val === 'mock' ? '📦 Mock Demo' : '⚡ Auto Fallback')}**.`
      });
    } else if (act === 'switch_to_mock_and_retry') {
      if (window.apiClient) {
        window.apiClient.setMode('mock');
      }
      this.showMiniToast('Switched to Mock Demo Mode');
      this.appendBotMessage({
        text: `📦 **Switched to Mock Demo Mode!** Retrying your previous request using simulated prototype data...`
      });
      if (this.lastFailedAction) {
        const actToRetry = this.lastFailedAction;
        this.lastFailedAction = null;
        if (actToRetry.type === 'CREATE_TICKET') {
          this.handleWizardSubmit(actToRetry.payload);
        } else if (actToRetry.type === 'CHECK_STATUS') {
          this.handleCheckStatusById(actToRetry.ticketId);
        } else if (actToRetry.type === 'ADD_COMMENT') {
          this.submitComment(actToRetry.ticketId, actToRetry.commentText);
        } else if (actToRetry.type === 'CANCEL_TICKET') {
          this.submitCancel(actToRetry.ticketId, actToRetry.reason);
        } else if (actToRetry.type === 'REOPEN_TICKET') {
          this.submitReopen(actToRetry.ticketId);
        } else if (actToRetry.type === 'MY_TICKETS') {
          this.fetchMyTickets(actToRetry.customerId);
        }
      }
    } else if (act === 'ping_backend') {
      this.showTypingIndicator();
      setTimeout(async () => {
        this.removeTypingIndicator();
        if (window.apiClient) {
          const res = await window.apiClient.checkHealth();
          this.appendBotMessage({
            text: res.online 
              ? `🟢 **Backend is reachable!** Latency: \`${res.elapsed}ms\` to \`${window.apiClient.baseUrl}\`.`
              : `🔴 **Backend is unreachable:** ${res.error || 'Connection failed'}. You can switch to **Mock Demo Mode** to test with simulated data.`,
            chips: !res.online ? [
              { label: '📦 Switch to Mock Demo', act: 'switch_mode', val: 'mock' },
              { label: '⚡ Switch to Auto Fallback', act: 'switch_mode', val: 'auto' }
            ] : []
          });
        }
      }, 300);
    } else if (act === 'view_faq_proc') {
      this.showFaqProcedures(val);
    } else if (act === 'filter_faq_cat') {
      this.showFaqExplorer({ category: val });
    } else if (act === 'vote_faq_helpful') {
      this.voteFaqFromBot(val, true);
    } else if (act === 'vote_faq_unhelpful') {
      this.voteFaqFromBot(val, false);
    } else if (act === 'log_ticket_from_faq') {
      this.logTicketFromFaq(val);
    }
  }

  handleCardAction(act, ticketId) {
    this.handleStructuredChipAction(act, ticketId);
  }

  renderCard(type, data) {
    if (type === 'CREATE_WIZARD_FORM') {
      return this.renderWizardForm(data);
    } else if (type === 'TICKET_SUMMARY_CARD') {
      return this.renderSummaryCard(data);
    } else if (type === 'TICKET_STATUS_CARD') {
      return this.renderStatusCard(data);
    } else if (type === 'COMMENTS_TIMELINE') {
      return this.renderCommentsTimeline(data);
    } else if (type === 'TICKETS_CAROUSEL') {
      return this.renderTicketsList(data);
    } else if (type === 'BACKEND_SETTINGS_CARD') {
      return this.renderBackendSettingsCard(data);
    } else if (type === 'FAQ_EXPLORER_CARD') {
      return this.renderFaqExplorerCard(data);
    } else if (type === 'FAQ_PROCEDURE_CARD') {
      return this.renderFaqProcedureCard(data);
    }
    return '';
  }

  renderWizardForm(d) {
    const formId = 'wizard-form-' + Date.now();
    setTimeout(() => {
      const f = document.getElementById(formId);
      if (f) {
        f.addEventListener('submit', (e) => {
          e.preventDefault();
          const getV = id => { const el = f.querySelector('#' + id); return el ? el.value.trim() : ''; };
          const formData = {
            customerId: getV('wf-cust-id') || 'CUS-001',
            customerName: getV('wf-cust-name') || 'Customer',
            phoneNumber: getV('wf-cust-phone'),
            email: getV('wf-cust-email'),
            category: getV('wf-category'),
            priority: getV('wf-priority'),
            channel: getV('wf-channel'),
            subject: getV('wf-subject'),
            description: getV('wf-desc')
          };
          if (!formData.subject || !formData.description) {
            alert('Please provide both a Subject and Description.');
            return;
          }
          this.handleWizardSubmit(formData);
        });
      }
    }, 50);

    return `
      <form class="bot-embedded-card" id="${formId}">
        <div class="card-title-row">
          <h4>${this.icons.ticket} New Service Ticket</h4>
          <span style="font-size:0.68rem;color:var(--bot-text-muted);">Guided Setup</span>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div class="bot-form-group">
            <label class="bot-form-label">Customer ID *</label>
            <input type="text" id="wf-cust-id" class="bot-input" value="${d.customerId || ''}" required>
          </div>
          <div class="bot-form-group">
            <label class="bot-form-label">Customer Name *</label>
            <input type="text" id="wf-cust-name" class="bot-input" value="${d.customerName || ''}" required>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div class="bot-form-group">
            <label class="bot-form-label">Phone Number</label>
            <input type="text" id="wf-cust-phone" class="bot-input" value="${d.phoneNumber || ''}" placeholder="e.g. 0786398208">
          </div>
          <div class="bot-form-group">
            <label class="bot-form-label">Email Address</label>
            <input type="email" id="wf-cust-email" class="bot-input" value="${d.email || ''}" placeholder="e.g. panashe@example.com">
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div class="bot-form-group">
            <label class="bot-form-label">Category *</label>
            <select id="wf-category" class="bot-select">
              <option value="APPLICATION" ${d.category === 'APPLICATION' ? 'selected' : ''}>Application Issue</option>
              <option value="BILLING"     ${d.category === 'BILLING' ? 'selected' : ''}>Billing &amp; Payments</option>
              <option value="NETWORK"     ${d.category === 'NETWORK' ? 'selected' : ''}>Network Connectivity</option>
              <option value="ACCOUNT"     ${d.category === 'ACCOUNT' ? 'selected' : ''}>Account Access</option>
              <option value="HARDWARE"    ${d.category === 'HARDWARE' ? 'selected' : ''}>Hardware Support</option>
              <option value="OTHER"       ${d.category === 'OTHER' ? 'selected' : ''}>Other</option>
            </select>
          </div>

          <div class="bot-form-group">
            <label class="bot-form-label">Urgency / Priority *</label>
            <select id="wf-priority" class="bot-select">
              <option value="LOW"      ${d.priority === 'LOW' ? 'selected' : ''}>🟢 Low</option>
              <option value="MEDIUM"   ${d.priority === 'MEDIUM' ? 'selected' : ''}>🟡 Medium</option>
              <option value="HIGH"     ${d.priority === 'HIGH' ? 'selected' : ''}>🟠 High</option>
              <option value="CRITICAL" ${d.priority === 'CRITICAL' ? 'selected' : ''}>🔴 Critical</option>
            </select>
          </div>
        </div>

        <div class="bot-form-group">
          <label class="bot-form-label">Support Channel *</label>
          <select id="wf-channel" class="bot-select">
            <option value="WEB" selected>🌐 Customer Web Bot</option>
            <option value="WHATSAPP">💬 WhatsApp Support Bot</option>
            <option value="EMAIL">✉️ Email Support</option>
            <option value="CALL">📞 Helpline Phone Call</option>
          </select>
        </div>

        <div class="bot-form-group">
          <label class="bot-form-label">Issue Subject *</label>
          <input type="text" id="wf-subject" class="bot-input" placeholder="Brief summary of the issue..." required>
        </div>

        <div class="bot-form-group">
          <label class="bot-form-label">Description &amp; Steps to Reproduce *</label>
          <textarea id="wf-desc" class="bot-textarea" placeholder="Describe what happened, error codes, device info..." required></textarea>
        </div>

        <button type="submit" class="bot-btn-submit">
          ${this.icons.send} Submit Ticket to Operations
        </button>
      </form>
    `;
  }

  renderSummaryCard(d) {
    const statusCls = (d.status || 'open').toLowerCase();
    return `
      <div class="ticket-summary-card">
        <div class="tkt-card-header">
          <span class="tkt-card-id">
            ${d.ticketId}
            <button class="btn-tkt-copy" data-id="${d.ticketId}" title="Copy ID">${this.icons.copy}</button>
          </span>
          <span class="bot-status-badge ${statusCls}">
            ${d.status || 'OPEN'}
          </span>
        </div>

        <div style="font-weight:700;font-size:0.86rem;color:var(--bot-text-primary);">
          ${d.subject}
        </div>

        <div class="tkt-meta-grid">
          <div class="tkt-meta-item">
            <span class="meta-k">Category</span>
            <span class="meta-v">${d.category || 'APPLICATION'}</span>
          </div>
          <div class="tkt-meta-item">
            <span class="meta-k">Priority</span>
            <span class="meta-v">${d.priority || 'MEDIUM'}</span>
          </div>
          <div class="tkt-meta-item">
            <span class="meta-k">Customer</span>
            <span class="meta-v">${d.customerName || 'Customer'}</span>
          </div>
          <div class="tkt-meta-item">
            <span class="meta-k">Logged</span>
            <span class="meta-v">Just now</span>
          </div>
        </div>

        <div class="tkt-actions-row">
          <button class="btn-card-action" data-action="follow_up" data-id="${d.ticketId}">
            ${this.icons.message} Add Note
          </button>
          <button class="btn-card-action" data-action="check_status" data-id="${d.ticketId}">
            ${this.icons.search} Refresh
          </button>
          <button class="btn-card-action danger" data-action="cancel" data-id="${d.ticketId}">
            ${this.icons.close} Cancel
          </button>
        </div>
      </div>
    `;
  }

  renderStatusCard(d) {
    const s = (d.status || 'OPEN').toUpperCase();
    const isStep1 = true;
    const isStep2 = (s === 'IN_PROGRESS' || s === 'ASSIGNED' || s === 'RESOLVED' || s === 'CLOSED');
    const isStep3 = (s === 'RESOLVED' || s === 'CLOSED');
    const isStep4 = (s === 'CLOSED');
    const isCancelled = (s === 'CANCELLED');

    return `
      <div class="ticket-summary-card">
        <div class="tkt-card-header">
          <span class="tkt-card-id">
            ${d.ticketId}
            <button class="btn-tkt-copy" data-id="${d.ticketId}" title="Copy ID">${this.icons.copy}</button>
          </span>
          <span class="bot-status-badge ${s.toLowerCase()}">
            ${s}
          </span>
        </div>

        <div style="font-weight:700;font-size:0.86rem;color:var(--bot-text-primary);">
          ${d.subject}
        </div>

        <!-- Stepped Progress Tracker -->
        ${!isCancelled ? `
          <div class="stepped-tracker">
            <div class="step-node ${isStep1 ? (s === 'OPEN' ? 'active' : 'completed') : ''}">
              <div class="step-dot">1</div>
              <span class="step-label">Open</span>
            </div>
            <div class="step-node ${isStep2 ? ((s === 'IN_PROGRESS' || s === 'ASSIGNED') ? 'active' : 'completed') : ''}">
              <div class="step-dot">2</div>
              <span class="step-label">Assigned</span>
            </div>
            <div class="step-node ${isStep3 ? (s === 'RESOLVED' ? 'active' : 'completed') : ''}">
              <div class="step-dot">3</div>
              <span class="step-label">Resolved</span>
            </div>
            <div class="step-node ${isStep4 ? 'completed' : ''}">
              <div class="step-dot">4</div>
              <span class="step-label">Closed</span>
            </div>
          </div>
        ` : `
          <div style="padding:6px 10px;background:rgba(239, 68, 68, 0.1);border-radius:var(--bot-radius-sm);font-size:0.75rem;color:#EF4444;margin:6px 0;">
            🚫 This ticket has been cancelled.
          </div>
        `}

        <div class="tkt-meta-grid">
          <div class="tkt-meta-item">
            <span class="meta-k">Assigned Engineer</span>
            <span class="meta-v">${d.techName || 'Waiting Allocation'}</span>
          </div>
          <div class="tkt-meta-item">
            <span class="meta-k">Priority Level</span>
            <span class="meta-v">${d.priority || 'MEDIUM'}</span>
          </div>
          <div class="tkt-meta-item">
            <span class="meta-k">Category</span>
            <span class="meta-v">${d.category || 'APPLICATION'}</span>
          </div>
          <div class="tkt-meta-item">
            <span class="meta-k">Updates</span>
            <span class="meta-v">${d.commentsCount} note${d.commentsCount !== 1 ? 's' : ''}</span>
          </div>
        </div>

        <div class="tkt-actions-row">
          <button class="btn-card-action" data-action="follow_up" data-id="${d.ticketId}">
            ${this.icons.message} Follow-Up
          </button>
          <button class="btn-card-action" data-action="view_comments" data-id="${d.ticketId}">
            📜 Timeline
          </button>
          ${s !== 'CLOSED' && s !== 'CANCELLED' ? `
            <button class="btn-card-action danger" data-action="cancel" data-id="${d.ticketId}">
              ${this.icons.close} Cancel
            </button>
          ` : `
            <button class="btn-card-action" data-action="reopen" data-id="${d.ticketId}">
              ${this.icons.reopen} Reopen
            </button>
          `}
        </div>
      </div>
    `;
  }

  renderCommentsTimeline(d) {
    const comments = Array.isArray(d.comments) ? d.comments : [];
    return `
      <div class="bot-embedded-card">
        <div class="card-title-row">
          <h4>${this.icons.message} Activity on ${d.ticketId}</h4>
          <span style="font-size:0.68rem;color:var(--bot-text-muted);">${comments.length} entry</span>
        </div>

        <div class="bot-comments-timeline">
          ${comments.map(c => {
            const byObj = (c && c.createdBy && typeof c.createdBy === 'object') ? c.createdBy : null;
            const byName = byObj ? (byObj.name ? String(byObj.name) : 'Staff') : (c && c.createdBy ? String(c.createdBy) : 'Staff');
            const byType = byObj ? (byObj.userType ? String(byObj.userType) : 'STAFF') : 'STAFF';
            const text = c && c.comment ? String(c.comment) : '';
            const time = c && c.createdAt ? new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }) : 'Recently';

            return `
              <div class="bot-comment-entry">
                <div class="bot-comment-meta">
                  <span class="bot-comment-author">${byName} (${byType})</span>
                  <span>${time}</span>
                </div>
                <div style="color:var(--bot-text-primary);line-height:1.4;">${text}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  renderTicketsList(d) {
    const list = Array.isArray(d.tickets) ? d.tickets : [];
    return `
      <div style="display:flex;flex-direction:column;gap:6px;margin-top:6px;">
        ${list.map(t => {
          const tId = t ? (t.ticketId ? String(t.ticketId) : (t._id ? String(t._id) : 'TKT')) : 'TKT';
          const subj = t && t.subject ? String(t.subject) : '(No Subject)';
          const st = t && t.status ? String(t.status).toUpperCase() : 'OPEN';
          const pr = t && t.priority ? String(t.priority).toUpperCase() : 'MEDIUM';

          return `
            <div class="ticket-summary-card" style="padding:8px 10px;margin-top:0;">
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <span class="tkt-card-id" style="font-size:0.76rem;">${tId}</span>
                <span class="bot-status-badge ${st.toLowerCase()}" style="font-size:0.62rem;">${st}</span>
              </div>
              <div style="font-size:0.78rem;font-weight:600;color:var(--bot-text-primary);">${subj}</div>
              <div style="display:flex;gap:4px;margin-top:2px;">
                <button class="btn-card-action" data-action="check_status" data-id="${tId}" style="padding:2px 6px;font-size:0.68rem;">
                  ${this.icons.search} Status
                </button>
                <button class="btn-card-action" data-action="follow_up" data-id="${tId}" style="padding:2px 6px;font-size:0.68rem;">
                  ${this.icons.message} Note
                </button>
                ${st !== 'CLOSED' && st !== 'CANCELLED' ? `
                  <button class="btn-card-action danger" data-action="cancel" data-id="${tId}" style="padding:2px 6px;font-size:0.68rem;">
                    Cancel
                  </button>
                ` : `
                  <button class="btn-card-action" data-action="reopen" data-id="${tId}" style="padding:2px 6px;font-size:0.68rem;">
                    Reopen
                  </button>
                `}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  renderBackendSettingsCard(d) {
    const cardId = 'settings-card-' + Date.now();
    const currentMode = window.apiClient ? window.apiClient.mode : 'auto';
    const currentBaseUrl = window.apiClient ? window.apiClient.baseUrl : 'http://127.0.0.1:3200/mongo/tickets';

    setTimeout(() => {
      const card = document.getElementById(cardId);
      if (!card) return;

      // Mode option clicks
      card.querySelectorAll('.mode-opt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const mode = btn.getAttribute('data-mode');
          if (window.apiClient) {
            window.apiClient.setMode(mode);
          }
          this.showMiniToast(`Switched to ${mode.toUpperCase()} mode`);
          this.appendBotMessage({
            text: `⚙️ **Operating mode set to ${mode === 'real' ? '🟢 Live Backend' : (mode === 'mock' ? '📦 Demo Mock Data' : '⚡ Auto Fallback')}!**\n\n` +
                  (mode === 'mock' ? 'Using local sample tickets (optimal for standalone demos and prototypes).' : (mode === 'auto' ? 'Attempts live API, automatically uses mock data if offline.' : 'Direct HTTP calls to ' + currentBaseUrl + '.'))
          });
        });
      });

      // Save URL
      const saveBtn = card.querySelector('#btn-save-settings-url');
      const urlInput = card.querySelector('#settings-url-input');
      if (saveBtn && urlInput) {
        saveBtn.addEventListener('click', async () => {
          const newUrl = urlInput.value.trim();
          if (!newUrl) return;
          if (window.apiClient) {
            await window.apiClient.setBaseUrl(newUrl);
            this.showMiniToast('Base URL updated!');
            this.appendBotMessage({
              text: `🔗 **Target API Base URL updated to:** \`${window.apiClient.baseUrl}\``
            });
          }
        });
      }

      // Ping
      const pingBtn = card.querySelector('#btn-ping-backend');
      const pingStatus = card.querySelector('#ping-status-text');
      if (pingBtn && pingStatus) {
        pingBtn.addEventListener('click', async () => {
          pingStatus.textContent = 'Testing connection...';
          if (window.apiClient) {
            const res = await window.apiClient.checkHealth();
            pingStatus.textContent = res.online ? `✓ Online (${res.elapsed}ms)` : `✗ Offline: ${res.error || 'Connection failed'}`;
            pingStatus.style.color = res.online ? '#10B981' : '#EF4444';
          }
        });
      }

      // Reset Mock Store
      const resetBtn = card.querySelector('#btn-reset-mock-store');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          if (window.apiClient) {
            window.apiClient.resetMockData();
            this.showMiniToast('Mock store reset to initial sample tickets!');
            this.appendBotMessage({
              text: `🔄 **Demo store reset.** Standard sample tickets (Panashe WhatsApp issues, etc.) have been reloaded into browser storage.`
            });
          }
        });
      }
    }, 50);

    return `
      <div class="bot-embedded-card" id="${cardId}">
        <div class="card-title-row">
          <h4>${this.icons.database} Backend &amp; Data Configuration</h4>
          <span style="font-size:0.68rem;color:var(--bot-text-muted);">Live &amp; Offline Ready</span>
        </div>

        <div>
          <label class="bot-form-label">Operating Mode</label>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:4px;">
            <button type="button" class="btn-card-action mode-opt-btn ${currentMode === 'auto' ? 'active' : ''}" data-mode="auto" style="justify-content:center;${currentMode === 'auto' ? 'border-color:var(--bot-accent);background:var(--bot-accent-light);color:var(--bot-accent);' : ''}">
              ⚡ Auto Fallback
            </button>
            <button type="button" class="btn-card-action mode-opt-btn ${currentMode === 'real' ? 'active' : ''}" data-mode="real" style="justify-content:center;${currentMode === 'real' ? 'border-color:var(--bot-accent);background:var(--bot-accent-light);color:var(--bot-accent);' : ''}">
              🟢 Live API
            </button>
            <button type="button" class="btn-card-action mode-opt-btn ${currentMode === 'mock' ? 'active' : ''}" data-mode="mock" style="justify-content:center;${currentMode === 'mock' ? 'border-color:var(--bot-accent);background:var(--bot-accent-light);color:var(--bot-accent);' : ''}">
              📦 Mock Demo
            </button>
          </div>
          <p style="font-size:0.68rem;color:var(--bot-text-muted);margin-top:4px;line-height:1.4;">
            ${currentMode === 'auto' 
              ? '⚡ <strong>Auto Fallback (Recommended):</strong> Tries live backend, seamlessly uses mock data if server is offline.' 
              : (currentMode === 'mock' 
                ? '📦 <strong>Mock Demo Mode:</strong> 100% standalone simulation using browser storage. No backend needed.' 
                : '🟢 <strong>Strict Live API:</strong> Makes direct HTTP calls to <code>' + currentBaseUrl + '</code>.')}
          </p>
        </div>

        <div class="bot-form-group">
          <label class="bot-form-label">API Base URL</label>
          <div style="display:flex;gap:6px;">
            <input type="text" id="settings-url-input" class="bot-input" value="${currentBaseUrl}">
            <button type="button" class="btn-card-action" id="btn-save-settings-url" style="white-space:nowrap;padding:4px 10px;">
              Save
            </button>
          </div>
        </div>

        <div style="display:flex;align-items:center;justify-content:space-between;padding-top:6px;border-top:1px solid var(--bot-border);font-size:0.72rem;flex-wrap:wrap;gap:6px;">
          <div style="display:flex;align-items:center;gap:6px;">
            <button type="button" class="btn-card-action" id="btn-ping-backend" style="padding:2px 8px;">
              Ping Server
            </button>
            <span id="ping-status-text" style="color:var(--bot-text-muted);font-weight:600;"></span>
          </div>
          <button type="button" class="btn-card-action" id="btn-reset-mock-store" style="padding:2px 8px;">
            ${this.icons.refresh} Reset Mock Store
          </button>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // Knowledge Base & FAQ Methods (Customer Self-Service)
  // =========================================================================
  async showFaqExplorer({ category = 'ALL', search = '' } = {}) {
    let faqs = [];
    if (window.apiClient) {
      try {
        faqs = await window.apiClient.searchFaqs(search, category);
      } catch (e) {
        faqs = (window.SEED_FAQS || []);
      }
    } else {
      faqs = (window.SEED_FAQS || []);
    }

    // Filter published only for customers
    faqs = faqs.filter(f => !f.status || f.status === 'PUBLISHED');

    const catLabel = category === 'ALL' ? 'All Topics' : category;
    const searchLabel = search ? ` matching "${search}"` : '';

    this.appendBotMessage({
      text: `📚 **HelpDesk Knowledge Base & FAQs** (${catLabel}${searchLabel})\n\nSelect a topic below to view verified step-by-step resolution procedures, or use the search bar:`,
      cardType: 'FAQ_EXPLORER_CARD',
      cardData: {
        faqs,
        currentCategory: category,
        searchQuery: search
      },
      chips: [
        { label: '📱 Application', act: 'filter_faq_cat', val: 'APPLICATION' },
        { label: '💳 Billing', act: 'filter_faq_cat', val: 'BILLING' },
        { label: '🌐 Network', act: 'filter_faq_cat', val: 'NETWORK' },
        { label: '⚙️ Hardware', act: 'filter_faq_cat', val: 'HARDWARE' },
        { label: '🔒 Security', act: 'filter_faq_cat', val: 'SECURITY' },
        { label: '📋 All FAQs', act: 'filter_faq_cat', val: 'ALL' },
        { label: '🎟️ Log a Ticket', text: 'Log a new ticket' }
      ]
    });
  }

  async showFaqProcedures(faqId) {
    let faq = null;
    if (window.apiClient) {
      try {
        faq = await window.apiClient.getFaqById(faqId);
      } catch (e) {
        console.warn(e);
      }
    }
    if (!faq) {
      const list = window.SEED_FAQS || [];
      faq = list.find(f => f.faqId === faqId);
    }

    if (!faq) {
      this.appendBotMessage({
        text: `⚠️ Sorry, I could not find resolution procedures for article **${faqId}**. Would you like to log a ticket instead?`,
        chips: [
          { label: '🎟️ Log a Ticket', text: 'Log a new ticket' },
          { label: '📚 Back to FAQs', act: 'filter_faq_cat', val: 'ALL' }
        ]
      });
      return;
    }

    this.appendBotMessage({
      text: `📖 **Resolution Procedures: ${faq.title}**\n\nFollow these step-by-step procedures to resolve this issue:`,
      cardType: 'FAQ_PROCEDURE_CARD',
      cardData: faq,
      chips: [
        { label: '👍 Yes, this fixed it!', act: 'vote_faq_helpful', val: faq.faqId },
        { label: '👎 No, still having issues', act: 'vote_faq_unhelpful', val: faq.faqId },
        { label: '🎟️ Log Ticket for this Issue', act: 'log_ticket_from_faq', val: faq.faqId },
        { label: '📚 Browse More FAQs', act: 'filter_faq_cat', val: 'ALL' }
      ]
    });
  }

  async voteFaqFromBot(faqId, isHelpful) {
    if (window.apiClient) {
      try {
        await window.apiClient.voteFaq(faqId, isHelpful);
      } catch (e) {
        console.warn(e);
      }
    }

    if (isHelpful) {
      this.showMiniToast('Thank you for your feedback! 👍');
      this.appendBotMessage({
        text: `🎉 **Awesome! I'm glad that resolved your issue!**\n\nYour feedback helps us continuously improve our self-service guides. Let me know if you need help with anything else!`,
        chips: [
          { label: '🔍 Check Ticket Status', text: 'Check ticket status' },
          { label: '📋 View My Tickets', text: 'List all my tickets' },
          { label: '📚 Browse Other FAQs', act: 'filter_faq_cat', val: 'ALL' }
        ]
      });
    } else {
      this.showMiniToast('Feedback noted. We are here to help.');
      this.appendBotMessage({
        text: `I understand! Troubleshooting can be tricky. Would you like me to open a ticket for our technical operations team with these details pre-filled?`,
        chips: [
          { label: '🎟️ Yes, Log Ticket for this Issue', act: 'log_ticket_from_faq', val: faqId },
          { label: '🔍 Search More FAQs', act: 'filter_faq_cat', val: 'ALL' }
        ]
      });
    }
  }

  async logTicketFromFaq(faqId) {
    let faq = null;
    if (window.apiClient) {
      try {
        faq = await window.apiClient.getFaqById(faqId);
      } catch (e) {
        console.warn(e);
      }
    }
    if (!faq) {
      faq = (window.SEED_FAQS || []).find(f => f.faqId === faqId);
    }

    const cat = faq ? faq.category : 'APPLICATION';
    const subj = faq ? `Assistance Needed: ${faq.title}` : 'Troubleshooting assistance needed';
    const desc = faq 
      ? `Customer followed self-service procedures in ${faq.faqId} ("${faq.title}") but the issue remains unresolved.\n\nIssue Summary: ${faq.summary}\n\nPlease escalate to technician for manual inspection.`
      : 'Issue encountered following self-service documentation.';

    this.startTicketCreationWizard({ category: cat, subject: subj, description: desc });
  }

  renderFaqExplorerCard(data) {
    const cardId = 'faq-card-' + Date.now();
    const faqs = data.faqs || [];
    const currentCat = data.currentCategory || 'ALL';
    const query = data.searchQuery || '';

    setTimeout(() => {
      const card = document.getElementById(cardId);
      if (!card) return;

      const sInput = card.querySelector('.faq-card-search-input');
      const sBtn = card.querySelector('.btn-faq-card-search');

      const doSearch = () => {
        if (!sInput) return;
        const val = sInput.value.trim();
        this.showFaqExplorer({ category: currentCat, search: val });
      };

      if (sInput) {
        sInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            doSearch();
          }
        });
      }
      if (sBtn) {
        sBtn.addEventListener('click', doSearch);
      }
    }, 50);

    return `
      <div class="bot-embedded-card" id="${cardId}">
        <div class="card-title-row">
          <h4>${this.icons.book} Knowledge Base (${faqs.length} Articles)</h4>
          <span style="font-size:0.68rem;color:var(--bot-text-muted);">Self-Service Resolutions</span>
        </div>

        <div style="display:flex;gap:6px;margin-bottom:8px;">
          <input 
            type="text" 
            class="bot-input faq-card-search-input" 
            placeholder="Search FAQs e.g. login, vpn, billing..." 
            value="${query}"
            style="font-size:0.75rem;"
          >
          <button type="button" class="btn-card-action btn-faq-card-search" style="padding:4px 10px;white-space:nowrap;color:var(--bot-accent);border-color:var(--bot-accent);font-weight:700;">
            ${this.icons.search} Search
          </button>
        </div>

        <div style="max-height:300px;overflow-y:auto;display:flex;flex-direction:column;gap:6px;">
          ${faqs.length === 0 ? `
            <div style="text-align:center;padding:18px;color:var(--bot-text-muted);font-size:0.75rem;">
              No FAQs found matching "${query}". Try another keyword or category above.
            </div>
          ` : faqs.map(f => {
            const procs = (f.resolution && Array.isArray(f.resolution.procedures)) ? f.resolution.procedures : [];
            return `
              <div style="background:var(--bot-surface-2);border:1px solid var(--bot-border);border-radius:6px;padding:8px 10px;">
                <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;margin-bottom:3px;">
                  <span style="font-size:0.62rem;font-weight:700;color:var(--bot-accent);background:var(--bot-accent-light);padding:1px 5px;border-radius:3px;">
                    ${f.category}
                  </span>
                  <span style="font-size:0.62rem;color:var(--bot-text-muted);">
                    ⏱️ ${f.estimatedTime || '2 mins'} • ${f.difficulty || 'Easy'}
                  </span>
                </div>
                <div style="font-weight:700;font-size:0.76rem;color:var(--bot-text);margin-bottom:3px;line-height:1.35;">
                  ${f.title}
                </div>
                <div style="font-size:0.68rem;color:var(--bot-text-muted);line-height:1.35;margin-bottom:6px;">
                  ${f.summary}
                </div>
                <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;">
                  <span style="font-size:0.64rem;color:var(--bot-text-muted);">
                    👍 ${f.helpfulCount || 0} found this helpful
                  </span>
                  <button type="button" class="btn-card-action" data-action="view_faq_proc" data-id="${f.faqId}" style="padding:3px 8px;font-size:0.68rem;color:var(--bot-accent);border-color:var(--bot-accent);font-weight:700;">
                    📋 View ${procs.length} Steps →
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  renderFaqProcedureCard(faq) {
    const cardId = 'faq-proc-' + Date.now();
    const res = faq.resolution || {};
    const procs = Array.isArray(res.procedures) ? res.procedures : [];
    const prereqs = Array.isArray(res.prerequisites) ? res.prerequisites : [];

    return `
      <div class="bot-embedded-card" id="${cardId}">
        <div class="card-title-row">
          <div style="display:flex;align-items:center;gap:6px;">
            <span style="font-size:0.62rem;font-weight:700;color:var(--bot-accent);background:var(--bot-accent-light);padding:1px 6px;border-radius:3px;">
              ${faq.category}
            </span>
            <span style="font-family:'JetBrains Mono',monospace;font-size:0.65rem;color:var(--bot-text-muted);">${faq.faqId}</span>
          </div>
          <span style="font-size:0.65rem;color:var(--bot-text-muted);">
            ⏱️ ${faq.estimatedTime || '2-3 mins'} • ${faq.difficulty || 'Easy'}
          </span>
        </div>

        <h4 style="font-size:0.86rem;font-weight:800;color:var(--bot-text);margin:6px 0 4px;line-height:1.35;">
          ${faq.title}
        </h4>

        <div style="font-size:0.72rem;color:var(--bot-text-muted);line-height:1.4;margin-bottom:8px;">
          ${faq.summary}
        </div>

        ${prereqs.length > 0 ? `
          <div style="background:var(--bot-surface-2);border-left:3px solid var(--bot-accent);border-radius:4px;padding:6px 10px;margin-bottom:10px;">
            <div style="font-size:0.66rem;font-weight:700;color:var(--bot-text);margin-bottom:2px;">Prerequisites:</div>
            <ul style="margin:0;padding-left:14px;font-size:0.66rem;color:var(--bot-text-muted);line-height:1.4;">
              ${prereqs.map(p => `<li>${p}</li>`).join('')}
            </ul>
          </div>
        ` : ''}

        <!-- Numbered Step Procedures -->
        <div style="font-size:0.68rem;font-weight:700;text-transform:uppercase;color:var(--bot-text);margin-bottom:6px;letter-spacing:0.5px;">
          Step-by-Step Resolution Procedures:
        </div>

        <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:10px;">
          ${procs.map((p, idx) => `
            <div style="background:var(--bot-surface-2);border:1px solid var(--bot-border);border-radius:6px;padding:8px 10px;">
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
                <span style="width:18px;height:18px;border-radius:50%;background:var(--bot-accent);color:#FFFFFF;font-weight:800;font-size:0.65rem;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                  ${p.step || idx + 1}
                </span>
                <span style="font-weight:700;font-size:0.75rem;color:var(--bot-text);">
                  ${p.title}
                </span>
              </div>
              <div style="font-size:0.7rem;color:var(--bot-text-muted);line-height:1.45;padding-left:24px;white-space:pre-line;">
                ${p.instruction}
              </div>
              ${p.tip ? `
                <div style="margin-top:4px;margin-left:24px;background:rgba(245,158,11,0.1);border:1px dashed rgba(245,158,11,0.3);border-radius:4px;padding:3px 8px;font-size:0.65rem;color:#D97706;">
                  💡 <strong>Tip:</strong> ${p.tip}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>

        ${res.escalationAdvice ? `
          <div style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.25);border-radius:5px;padding:6px 10px;margin-bottom:10px;">
            <div style="font-size:0.66rem;font-weight:700;color:#EF4444;margin-bottom:2px;">🚨 Still not working?</div>
            <div style="font-size:0.66rem;color:var(--bot-text-muted);line-height:1.35;">${res.escalationAdvice}</div>
          </div>
        ` : ''}

        <div style="display:flex;align-items:center;justify-content:space-between;padding-top:6px;border-top:1px solid var(--bot-border);flex-wrap:wrap;gap:6px;">
          <span style="font-size:0.68rem;color:var(--bot-text-muted);">Did this resolve your issue?</span>
          <div style="display:flex;gap:4px;">
            <button type="button" class="btn-card-action" data-action="vote_faq_helpful" data-id="${faq.faqId}" style="padding:3px 8px;font-size:0.68rem;color:#10B981;border-color:#10B981;">
              👍 Yes, resolved
            </button>
            <button type="button" class="btn-card-action" data-action="vote_faq_unhelpful" data-id="${faq.faqId}" style="padding:3px 8px;font-size:0.68rem;color:#EF4444;border-color:#EF4444;">
              👎 No, need help
            </button>
            <button type="button" class="btn-card-action" data-action="log_ticket_from_faq" data-id="${faq.faqId}" style="padding:3px 8px;font-size:0.68rem;color:var(--bot-accent);border-color:var(--bot-accent);font-weight:700;">
              🎟️ Log Ticket
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

// Global initialization helper
window.HelpDeskBotEngine = HelpDeskBotEngine;
window.PulseBotEngine = HelpDeskBotEngine;
