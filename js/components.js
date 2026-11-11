// UI Components and Renderers for HelpDesk Enterprise (Compact High-Density Edition)
window.Components = (() => {

  // SVG Vector Icon Library (Compact scalable SVGs)
  const icons = {
    pulse: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
    ticket: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>`,
    dashboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>`,
    alert: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`,
    flame: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
    userCheck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>`,
    search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
    plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
    refresh: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/></svg>`,
    moon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
    sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
    code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    whatsapp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>`,
    web: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    email: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
    phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    x: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    checkCircle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    message: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
    send: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
    user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    edit: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
    copy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`,
    close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
    book: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
    helpCircle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    thumbsUp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>`,
    thumbsDown: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3"/></svg>`,
    trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>`,
    eye: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
    check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
  };

  const formatDate = (isoString) => {
    if (!isoString) return '—';
    try {
      const date = new Date(isoString);
      return isNaN(date.getTime()) ? '—' : date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return '—';
    }
  };

  const formatRelativeTime = (isoString) => {
    if (!isoString) return '—';
    try {
      const time = new Date(isoString).getTime();
      if (isNaN(time)) return '—';
      const ms = Date.now() - time;
      const mins = Math.floor(ms / 60000);
      return mins < 1 ? 'Just now' : (mins < 60 ? `${mins}m ago` : (Math.floor(mins / 60) < 24 ? `${Math.floor(mins / 60)}h ago` : `${Math.floor(mins / 1440)}d ago`));
    } catch (e) {
      return '—';
    }
  };

  const renderChannelPill = (channel) => {
    const c = (channel ? String(channel) : 'WEB').toUpperCase();
    let icon = icons.web;
    let cls = 'web';
    if (c === 'WHATSAPP') { icon = icons.whatsapp; cls = 'whatsapp'; }
    else if (c === 'EMAIL') { icon = icons.email; cls = 'email'; }
    else if (c === 'CALL') { icon = icons.phone; cls = 'call'; }

    return `<span class="channel-pill ${cls}">${icon} ${c}</span>`;
  };

  const renderStatusBadge = (status) => {
    const s = (status ? String(status) : 'OPEN').toUpperCase();
    let cls = s.toLowerCase();
    let label = s.replace('_', ' ');
    return `<span class="badge-status ${cls}"><span style="width:5px;height:5px;border-radius:50%;background:currentColor;display:inline-block"></span> ${label}</span>`;
  };

  const renderPriorityBadge = (priority) => {
    const p = (priority ? String(priority) : 'MEDIUM').toUpperCase();
    let cls = p.toLowerCase();
    let icon = icons.alert;
    if (p === 'CRITICAL') icon = icons.flame;
    return `<span class="badge-priority ${cls}">${icon} ${p}</span>`;
  };

  // Left Sidebar (Compact)
  const renderSidebar = (state) => {
    const metrics = (state && typeof state.getMetrics === 'function') ? state.getMetrics() : { total: 0, critical: 0, unassigned: 0 };
    return `
      <aside class="sidebar">
        <div class="sidebar-header">
          <div class="brand-logo-container">
            <svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div class="brand-info">
            <div class="brand-name">
              HelpDesk <span class="brand-badge">CORE</span>
            </div>
            <div class="brand-tagline">Entity Operations</div>
          </div>
        </div>

        <nav class="sidebar-nav">
          <div class="nav-section-title">Operations</div>
          <a class="nav-item ${state.currentView === 'dashboard' ? 'active' : ''}" data-nav="dashboard">
            <div class="nav-item-icon">${icons.dashboard}</div>
            <span>Dashboard</span>
          </a>
          <a class="nav-item ${state.currentView === 'all-tickets' ? 'active' : ''}" data-nav="all-tickets">
            <div class="nav-item-icon">${icons.ticket}</div>
            <span>All Tickets</span>
            <span class="nav-badge">${metrics && metrics.total !== undefined ? metrics.total : 0}</span>
          </a>
          <a class="nav-item ${state.currentView === 'priority-queue' ? 'active' : ''}" data-nav="priority-queue">
            <div class="nav-item-icon">${icons.flame}</div>
            <span>Priority Queue</span>
            ${metrics && metrics.critical > 0 ? `<span class="nav-badge danger">${metrics.critical}</span>` : ''}
          </a>
          <a class="nav-item ${state.currentView === 'unassigned-queue' ? 'active' : ''}" data-nav="unassigned-queue">
            <div class="nav-item-icon">${icons.userCheck}</div>
            <span>Unassigned</span>
            ${metrics && metrics.unassigned > 0 ? `<span class="nav-badge">${metrics.unassigned}</span>` : ''}
          </a>

          <div class="nav-section-title" style="margin-top:8px;">Tools</div>
          <a class="nav-item ${state.currentView === 'faqs' ? 'active' : ''}" data-nav="faqs">
            <div class="nav-item-icon" style="color:#6366F1;">${icons.book}</div>
            <span>Knowledge Base / FAQs</span>
            <span class="nav-badge" style="background:rgba(99,102,241,0.15);color:#818CF8;">${state.faqs ? state.faqs.length : 0}</span>
          </a>
          <a class="nav-item ${state.currentView === 'lookup' ? 'active' : ''}" data-nav="lookup">
            <div class="nav-item-icon">${icons.search}</div>
            <span>Ticket Query</span>
          </a>
          <a class="nav-item ${state.currentView === 'api-hub' ? 'active' : ''}" data-nav="api-hub">
            <div class="nav-item-icon">${icons.code}</div>
            <span>API Hub (10 APIs)</span>
          </a>
          <a class="nav-item" href="customer.html" target="_blank" title="Open Customer AI Bot in new tab">
            <div class="nav-item-icon" style="color:#10B981;">${icons.message}</div>
            <span>Customer Bot ↗</span>
          </a>
        </nav>

        <div class="sidebar-footer">
          <div class="theme-toggle-row">
            <span>Theme</span>
            <button class="theme-switch-btn" id="btn-theme-toggle" title="Toggle Dark/Light Mode">
              ${state.theme === 'dark' ? icons.sun : icons.moon}
            </button>
          </div>

          <div class="backend-status-pill" id="btn-backend-settings" title="Click to view API settings">
            <div class="status-indicator-dot" id="backend-status-dot"></div>
            <span id="backend-status-label" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
              127.0.0.1:3200
            </span>
          </div>

          <div class="user-profile-widget">
            <div class="user-avatar">AD</div>
            <div class="user-details">
              <div class="user-name">ADMIN-001</div>
              <div class="user-role">Operations Lead</div>
            </div>
          </div>
        </div>
      </aside>
    `;
  };

  // Top Header (Compact)
  const renderHeader = (state) => {
    let title = "Operations Dashboard";
    let subtitle = "System overview & active telemetry";

    if (state.currentView === 'all-tickets') {
      title = "All Tickets Queue";
      subtitle = `${state.filteredTickets.length} of ${state.tickets.length} tickets`;
    } else if (state.currentView === 'priority-queue') {
      title = "Urgent Priority Queue";
      subtitle = "Tickets requiring immediate SLA action";
    } else if (state.currentView === 'unassigned-queue') {
      title = "Unassigned Tickets Pool";
      subtitle = "Pending technician allocation";
    } else if (state.currentView === 'lookup') {
      title = "Ticket & Customer Query";
      subtitle = "Lookup by Ticket ID or Customer ID";
    } else if (state.currentView === 'api-hub') {
      title = "API Hub & Inspector";
      subtitle = "10 Postman collection endpoints";
    } else if (state.currentView === 'faqs') {
      title = "Knowledge Base & FAQs Management";
      subtitle = `${state.filteredFaqs ? state.filteredFaqs.length : 0} of ${state.faqs ? state.faqs.length : 0} resolution articles & customer troubleshooting guides`;
    }

    return `
      <header class="top-header">
        <div class="header-left">
          <div class="header-title-group">
            <h1>${title}</h1>
            <p>${subtitle}</p>
          </div>
          <div class="header-search-bar">
            ${icons.search}
            <input type="text" id="global-search-input" placeholder="Search ID, customer, error code..." value="${state.filters.search || ''}">
          </div>
        </div>
        <div class="header-right">
          <div class="zoom-stepper" title="Live Scale / Density Controls">
            <span>Scale:</span>
            <button class="zoom-btn" id="btn-zoom-out" title="Make Smaller (−8%)">−</button>
            <span id="zoom-level-label">${Math.round((parseFloat(localStorage.getItem('pulse_zoom') || '0.78')) * 100)}%</span>
            <button class="zoom-btn" id="btn-zoom-in" title="Make Larger (+8%)">+</button>
          </div>
          <button class="btn btn-secondary btn-sm" id="btn-refresh-data" title="Refresh all tickets">
            ${icons.refresh} Refresh
          </button>
          <button class="btn btn-primary btn-sm" id="btn-open-create-modal">
            ${icons.plus} New Ticket
          </button>
        </div>
      </header>
    `;
  };

  // Dashboard Overview (Compact)
  // Dashboard Overview (Compact)
  const renderDashboard = (state) => {
    const m = (state && typeof state.getMetrics === 'function') ? state.getMetrics() : {
      total: 0, open: 0, inProgress: 0, critical: 0, resolutionRate: 0, resolved: 0, closed: 0, unassigned: 0,
      channels: { WHATSAPP: 0, WEB: 0, EMAIL: 0, CALL: 0 }
    };
    const ch = m && m.channels ? m.channels : { WHATSAPP: 0, WEB: 0, EMAIL: 0, CALL: 0 };
    const tot = m && m.total ? m.total : 0;

    return `
      <div class="view-content">
        <!-- KPI Metrics Grid -->
        <div class="kpi-grid">
          <div class="kpi-card">
            <div class="kpi-card-header">
              <span class="kpi-label">Total Tickets</span>
              <div class="kpi-icon-pill" style="background:var(--accent-primary-light);color:var(--accent-primary);">${icons.ticket}</div>
            </div>
            <div class="kpi-value-row">
              <span class="kpi-value">${m.total !== undefined ? m.total : 0}</span>
              <span class="kpi-trend positive">Active DB</span>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-card-header">
              <span class="kpi-label">Open Issues</span>
              <div class="kpi-icon-pill" style="background:var(--status-open-bg);color:var(--status-open-text);">${icons.clock}</div>
            </div>
            <div class="kpi-value-row">
              <span class="kpi-value">${m.open !== undefined ? m.open : 0}</span>
              <span class="kpi-trend ${m.open > 3 ? 'negative' : 'positive'}">Need Action</span>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-card-header">
              <span class="kpi-label">In Progress</span>
              <div class="kpi-icon-pill" style="background:var(--status-progress-bg);color:var(--status-progress-text);">${icons.pulse}</div>
            </div>
            <div class="kpi-value-row">
              <span class="kpi-value">${m.inProgress !== undefined ? m.inProgress : 0}</span>
              <span class="kpi-trend positive">Assigned</span>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-card-header">
              <span class="kpi-label">Critical</span>
              <div class="kpi-icon-pill" style="background:var(--priority-critical-bg);color:var(--priority-critical-text);">${icons.flame}</div>
            </div>
            <div class="kpi-value-row">
              <span class="kpi-value">${m.critical !== undefined ? m.critical : 0}</span>
              <span class="kpi-trend negative">Urgent</span>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-card-header">
              <span class="kpi-label">Resolution Rate</span>
              <div class="kpi-icon-pill" style="background:var(--status-resolved-bg);color:var(--status-resolved-text);">${icons.checkCircle}</div>
            </div>
            <div class="kpi-value-row">
              <span class="kpi-value">${m.resolutionRate !== undefined ? m.resolutionRate : 0}%</span>
              <span class="kpi-trend positive">${(m.resolved ? m.resolved : 0) + (m.closed ? m.closed : 0)} Closed</span>
            </div>
          </div>
        </div>

        <!-- Analytical Breakdown Row (Compact) -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px;">
          <!-- Channel Breakdown Card -->
          <div class="table-card" style="padding:10px;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
              <h3 style="font-size:0.82rem;font-weight:700;">Customer Inflow by Channel</h3>
              <span style="font-size:0.65rem;color:var(--text-tertiary);">Telemetry</span>
            </div>
            <div style="display:flex;flex-direction:column;gap:6px;">
              <div>
                <div style="display:flex;justify-content:space-between;font-size:0.72rem;margin-bottom:2px;">
                  <span style="display:flex;align-items:center;gap:4px;">${icons.whatsapp} WhatsApp Bot</span>
                  <span style="font-weight:700;">${ch.WHATSAPP ? ch.WHATSAPP : 0}</span>
                </div>
                <div style="height:4px;background:var(--bg-tertiary);border-radius:2px;overflow:hidden;">
                  <div style="height:100%;background:#25D366;width:${tot > 0 ? (ch.WHATSAPP / tot) * 100 : 0}%;"></div>
                </div>
              </div>

              <div>
                <div style="display:flex;justify-content:space-between;font-size:0.72rem;margin-bottom:2px;">
                  <span style="display:flex;align-items:center;gap:4px;">${icons.web} Web Portal / Bot</span>
                  <span style="font-weight:700;">${ch.WEB ? ch.WEB : 0}</span>
                </div>
                <div style="height:4px;background:var(--bg-tertiary);border-radius:2px;overflow:hidden;">
                  <div style="height:100%;background:#3B82F6;width:${tot > 0 ? (ch.WEB / tot) * 100 : 0}%;"></div>
                </div>
              </div>

              <div>
                <div style="display:flex;justify-content:space-between;font-size:0.72rem;margin-bottom:2px;">
                  <span style="display:flex;align-items:center;gap:4px;">${icons.email} Inbound Email</span>
                  <span style="font-weight:700;">${ch.EMAIL ? ch.EMAIL : 0}</span>
                </div>
                <div style="height:4px;background:var(--bg-tertiary);border-radius:2px;overflow:hidden;">
                  <div style="height:100%;background:#8B5CF6;width:${tot > 0 ? (ch.EMAIL / tot) * 100 : 0}%;"></div>
                </div>
              </div>

              <div>
                <div style="display:flex;justify-content:space-between;font-size:0.72rem;margin-bottom:2px;">
                  <span style="display:flex;align-items:center;gap:4px;">${icons.phone} Phone Helpline</span>
                  <span style="font-weight:700;">${ch.CALL ? ch.CALL : 0}</span>
                </div>
                <div style="height:4px;background:var(--bg-tertiary);border-radius:2px;overflow:hidden;">
                  <div style="height:100%;background:#F59E0B;width:${tot > 0 ? (ch.CALL / tot) * 100 : 0}%;"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Action & Postman Shortcuts Card -->
          <div class="table-card" style="padding:10px;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
                <h3 style="font-size:0.82rem;font-weight:700;">Entity API Integrations</h3>
                <span class="badge-status open">10 APIs Active</span>
              </div>
              <p style="font-size:0.7rem;color:var(--text-tertiary);margin-bottom:8px;">
                Target: <code>http://127.0.0.1:3200</code>
              </p>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
                <button class="btn btn-secondary btn-sm" id="btn-quick-create-sample" style="justify-content:flex-start;">
                  ${icons.plus} Sample Ticket
                </button>
                <button class="btn btn-secondary btn-sm" data-nav="unassigned-queue" style="justify-content:flex-start;">
                  ${icons.userCheck} ${m.unassigned !== undefined ? m.unassigned : 0} Unassigned
                </button>
                <button class="btn btn-secondary btn-sm" data-nav="priority-queue" style="justify-content:flex-start;">
                  ${icons.flame} ${m.critical !== undefined ? m.critical : 0} Critical
                </button>
                <button class="btn btn-secondary btn-sm" data-nav="api-hub" style="justify-content:flex-start;">
                  ${icons.code} Test 10 APIs
                </button>
              </div>
            </div>

            <div style="margin-top:8px;padding:4px 8px;background:var(--bg-tertiary);border-radius:var(--radius-sm);font-size:0.68rem;color:var(--text-secondary);display:flex;align-items:center;justify-content:space-between;">
              <span>Target: <strong>127.0.0.1:3200</strong></span>
              <button class="btn btn-secondary btn-sm" id="btn-test-ping-now" style="padding:2px 5px;">Ping</button>
            </div>
          </div>
        </div>

        <!-- Recent Tickets Table Preview -->
        <div style="margin-bottom:8px;display:flex;align-items:center;justify-content:space-between;">
          <h2 style="font-size:0.92rem;font-weight:700;">Active Tickets</h2>
          <button class="btn btn-secondary btn-sm" data-nav="all-tickets">View All →</button>
        </div>
        ${renderTicketTable(state, 6)}
      </div>
    `;
  };

  // Ticket Table Component (Compact High-Density)
  const renderTicketTable = (state, limit = null) => {
    const rawTickets = state ? (state.filteredTickets ? state.filteredTickets : (state.tickets ? state.tickets : [])) : [];
    let tickets = Array.isArray(rawTickets) ? rawTickets : [];
    if (limit && typeof limit === 'number') {
      tickets = tickets.slice(0, limit);
    }
    const filters = state && state.filters ? state.filters : { status: 'ALL', priority: 'ALL', channel: 'ALL', search: '' };

    return `
      <!-- Filter Toolbar -->
      <div class="toolbar-card">
        <div class="toolbar-filters">
          <select class="filter-select" id="filter-status">
            <option value="ALL" ${filters.status === 'ALL' ? 'selected' : ''}>Status: All</option>
            <option value="OPEN" ${filters.status === 'OPEN' ? 'selected' : ''}>Open</option>
            <option value="IN_PROGRESS" ${filters.status === 'IN_PROGRESS' ? 'selected' : ''}>In Progress</option>
            <option value="RESOLVED" ${filters.status === 'RESOLVED' ? 'selected' : ''}>Resolved</option>
            <option value="CLOSED" ${filters.status === 'CLOSED' ? 'selected' : ''}>Closed</option>
            <option value="CANCELLED" ${filters.status === 'CANCELLED' ? 'selected' : ''}>Cancelled</option>
          </select>

          <select class="filter-select" id="filter-priority">
            <option value="ALL" ${filters.priority === 'ALL' ? 'selected' : ''}>Priority: All</option>
            <option value="CRITICAL" ${filters.priority === 'CRITICAL' ? 'selected' : ''}>Critical</option>
            <option value="HIGH" ${filters.priority === 'HIGH' ? 'selected' : ''}>High</option>
            <option value="MEDIUM" ${filters.priority === 'MEDIUM' ? 'selected' : ''}>Medium</option>
            <option value="LOW" ${filters.priority === 'LOW' ? 'selected' : ''}>Low</option>
          </select>

          <select class="filter-select" id="filter-channel">
            <option value="ALL" ${filters.channel === 'ALL' ? 'selected' : ''}>Channel: All</option>
            <option value="WHATSAPP" ${filters.channel === 'WHATSAPP' ? 'selected' : ''}>WhatsApp</option>
            <option value="WEB" ${filters.channel === 'WEB' ? 'selected' : ''}>Web Portal</option>
            <option value="EMAIL" ${filters.channel === 'EMAIL' ? 'selected' : ''}>Email</option>
            <option value="CALL" ${filters.channel === 'CALL' ? 'selected' : ''}>Phone Call</option>
          </select>

          ${(filters.status !== 'ALL' || filters.priority !== 'ALL' || filters.channel !== 'ALL' || filters.search) ?
            `<button class="btn btn-secondary btn-sm" id="btn-reset-filters">${icons.x} Clear</button>` : ''}
        </div>

        <div style="font-size:0.74rem;color:var(--text-tertiary);">
          Total: <strong>${tickets ? tickets.length : 0}</strong>
        </div>
      </div>

      <!-- Main Table Card -->
      <div class="table-card">
        ${!window.apiClient.isBackendAlive && window.apiClient.mode === 'real' ? `
          <div style="background:rgba(239, 68, 68, 0.08);border:1px solid rgba(239, 68, 68, 0.25);border-radius:var(--radius-sm);padding:8px 12px;margin:8px 10px 10px;display:flex;align-items:center;justify-content:space-between;gap:12px;">
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="color:#EF4444;display:flex;align-items:center;">${icons.alert}</span>
              <div style="font-size:0.72rem;line-height:1.3;">
                <strong>Live Backend Mode:</strong> Calling <code>${window.apiClient.baseUrl}/getAll</code>. If your server is booting or stopped, start it on port <code>3200</code>.
              </div>
            </div>
            <div style="display:flex;gap:6px;flex-shrink:0;">
              <button class="btn btn-secondary btn-sm" id="btn-retry-live" style="padding:2px 8px;font-size:0.68rem;">
                ${icons.refresh} Retry Connection
              </button>
              <button class="btn btn-secondary btn-sm" id="btn-use-mock-fallback" style="padding:2px 8px;font-size:0.68rem;">
                Load Demo Mock Data
              </button>
            </div>
          </div>
        ` : ''}
        <div class="table-responsive">
          <table class="tickets-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Customer</th>
                <th>Channel</th>
                <th>Subject & Category</th>
                <th>Status</th>
                <th>Assigned Tech</th>
                <th style="text-align:right;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${tickets.length === 0 ? `
                <tr>
                  <td colspan="7">
                    <div class="empty-table-state">
                      ${icons.ticket}
                      <h4 style="font-size:0.88rem;margin-bottom:4px;">No tickets match filters</h4>
                      <p style="font-size:0.75rem;">Try resetting search terms</p>
                    </div>
                  </td>
                </tr>
              ` : tickets.map(t => {
                const tId       = t ? (t.ticketId ? String(t.ticketId) : (t._id ? String(t._id) : (t.id ? String(t.id) : '—'))) : '—';
                const custObj   = (t && t.customer && typeof t.customer === 'object') ? t.customer : null;
                const custStr   = (t && typeof t.customer === 'string') ? t.customer : null;
                const custName  = custObj ? (custObj.name ? String(custObj.name) : 'Unknown Customer') : (custStr ? custStr : (t && t.customerName ? String(t.customerName) : 'Unknown Customer'));
                const custSub   = custObj ? (custObj.phoneNumber ? String(custObj.phoneNumber) : (custObj.email ? String(custObj.email) : (custObj.customerId ? String(custObj.customerId) : ''))) : '';
                const channel   = t && t.channel ? String(t.channel) : 'WEB';
                const subject   = t && t.subject ? String(t.subject) : (t && t.title ? String(t.title) : '(No Subject)');
                const category  = t && t.category ? String(t.category) : 'GENERAL';
                const subcat    = t && t.subcategory ? String(t.subcategory) : '';
                const status    = t && t.status ? String(t.status) : 'OPEN';
                const techObj   = (t && t.technician && typeof t.technician === 'object') ? t.technician : null;
                const techStr   = (t && typeof t.technician === 'string') ? t.technician : null;
                const tech      = techObj ? techObj : (techStr ? { name: techStr, technicianId: 'TECH-001' } : null);
                const techId    = tech ? (tech.technicianId ? String(tech.technicianId) : (tech._id ? String(tech._id) : '')) : '';
                const techName  = tech ? (tech.name ? String(tech.name) : 'Technician') : '';
                const techInitials = techId ? techId.slice(-2) : (techName ? techName.substring(0,2).toUpperCase() : 'NA');
                return `
                <tr class="ticket-row" data-id="${tId}">
                  <td>
                    <div class="ticket-id-link">
                      ${tId}
                      <button class="btn-icon-only btn-copy-id" data-id="${tId}" title="Copy ID" style="padding:1px;background:none;border:none;color:var(--text-muted);cursor:pointer;">
                        ${icons.copy}
                      </button>
                    </div>
                  </td>
                  <td>
                    <div style="font-weight:600;color:var(--text-primary);font-size:0.78rem;">${custName}</div>
                    <div style="font-size:0.68rem;color:var(--text-muted);">${custSub}</div>
                  </td>
                  <td>${renderChannelPill(channel)}</td>
                  <td>
                    <div style="font-weight:600;color:var(--text-primary);max-width:240px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:0.78rem;">
                      ${subject}
                    </div>
                    <div style="display:flex;align-items:center;gap:4px;margin-top:2px;">
                      <span class="category-tag">${category}</span>
                      ${subcat ? `<span style="font-size:0.65rem;color:var(--text-muted);">${subcat}</span>` : ''}
                    </div>
                  </td>
                  <td>${renderStatusBadge(status)}</td>
                  <td>
                    ${tech ? `
                      <div style="display:flex;align-items:center;gap:5px;">
                        <span style="width:20px;height:20px;border-radius:50%;background:var(--accent-primary);color:white;display:flex;align-items:center;justify-content:center;font-size:0.64rem;font-weight:700;">
                          ${techInitials}
                        </span>
                        <div style="font-size:0.75rem;font-weight:600;color:var(--text-primary);">${techName}</div>
                      </div>
                    ` : `
                      <button class="btn btn-secondary btn-sm btn-assign-quick" data-id="${tId}" style="padding:2px 6px;font-size:0.7rem;">
                        + Assign
                      </button>
                    `}
                  </td>
                  <td style="text-align:right;">
                    <button class="btn btn-secondary btn-sm btn-view-ticket" data-id="${tId}" style="padding:3px 7px;">
                      View →
                    </button>
                  </td>
                </tr>
              `; }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  };

  // Ticket Detail Drawer Flyout (Compact)
  const renderTicketDrawer = (ticket) => {
    if (!ticket) return '';

    // ── safe field extraction with ternary operators ─────────────────────────
    const tId       = ticket ? (ticket.ticketId ? String(ticket.ticketId) : (ticket._id ? String(ticket._id) : (ticket.id ? String(ticket.id) : '—'))) : '—';
    const status    = ticket && ticket.status ? String(ticket.status) : 'OPEN';
    const priority  = ticket && ticket.priority ? String(ticket.priority) : 'MEDIUM';
    const subject   = ticket && ticket.subject ? String(ticket.subject) : (ticket && ticket.title ? String(ticket.title) : '(No Subject)');
    const desc      = ticket && ticket.description ? String(ticket.description) : (ticket && ticket.details ? String(ticket.details) : 'No description provided.');
    const channel   = ticket && ticket.channel ? String(ticket.channel) : 'WEB';
    const category  = ticket && ticket.category ? String(ticket.category) : 'GENERAL';
    const subcat    = ticket && ticket.subcategory ? String(ticket.subcategory) : '';
    const createdAt = ticket && ticket.createdAt ? String(ticket.createdAt) : null;
    const comments  = ticket && Array.isArray(ticket.comments) ? ticket.comments : [];

    const custObj   = (ticket && ticket.customer && typeof ticket.customer === 'object') ? ticket.customer : null;
    const custStr   = (ticket && typeof ticket.customer === 'string') ? ticket.customer : null;
    const custId    = custObj ? (custObj.customerId ? String(custObj.customerId) : (custObj._id ? String(custObj._id) : (ticket.customerId ? String(ticket.customerId) : '—'))) : (ticket && ticket.customerId ? String(ticket.customerId) : '—');
    const custName  = custObj ? (custObj.name ? String(custObj.name) : 'Unknown') : (custStr ? custStr : (ticket && ticket.customerName ? String(ticket.customerName) : 'Unknown'));
    const custPhone = custObj ? (custObj.phoneNumber ? String(custObj.phoneNumber) : (custObj.phone ? String(custObj.phone) : (ticket.phoneNumber ? String(ticket.phoneNumber) : ''))) : (ticket && ticket.phoneNumber ? String(ticket.phoneNumber) : '');
    const custEmail = custObj ? (custObj.email ? String(custObj.email) : (ticket.email ? String(ticket.email) : '')) : (ticket && ticket.email ? String(ticket.email) : '');

    const techObj   = (ticket && ticket.technician && typeof ticket.technician === 'object') ? ticket.technician : null;
    const techStr   = (ticket && typeof ticket.technician === 'string') ? ticket.technician : (ticket && ticket.assignedTo ? String(ticket.assignedTo) : null);
    const tech      = techObj ? techObj : (techStr ? { name: techStr, technicianId: 'TECH-001' } : null);
    const techName  = tech ? (tech.name ? String(tech.name) : 'Technician') : '';
    const techId    = tech ? (tech.technicianId ? String(tech.technicianId) : (tech._id ? String(tech._id) : '')) : '';
    const assignedBy= ticket && ticket.assignedBy ? String(ticket.assignedBy) : '';
    const assignedAt= ticket && ticket.assignedAt ? String(ticket.assignedAt) : null;

    const metaObj   = (ticket && ticket.metadata && typeof ticket.metadata === 'object') ? ticket.metadata : {};
    const metaDevice= metaObj && metaObj.device ? String(metaObj.device) : '';
    const metaVer   = metaObj && metaObj.applicationVersion ? String(metaObj.applicationVersion) : '';
    const metaErr   = metaObj && metaObj.errorCode ? String(metaObj.errorCode) : '';

    return `
      <div class="drawer-backdrop open" id="ticket-drawer-backdrop">
        <div class="drawer-panel">
          <div class="drawer-header">
            <div class="drawer-title-group">
              <span class="drawer-ticket-id">${tId}</span>
              ${renderStatusBadge(status)}
              ${renderPriorityBadge(priority)}
            </div>
            <button class="drawer-close-btn" id="btn-close-drawer" title="Close (Esc)">
              ${icons.x}
            </button>
          </div>

          <div class="drawer-body">
            <!-- Subject and Description -->
            <div>
              <h2 style="font-size:0.95rem;font-weight:700;color:var(--text-primary);margin-bottom:6px;">
                ${subject}
              </h2>
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:10px;">
                ${renderChannelPill(channel)}
                <span class="category-tag">${category}</span>
                ${subcat ? `<span class="category-tag">${subcat}</span>` : ''}
                <span style="font-size:0.7rem;color:var(--text-muted);">${createdAt ? formatDate(createdAt) : '—'}</span>
              </div>
              <div style="padding:10px;background:var(--bg-tertiary);border-radius:var(--radius-sm);border:1px solid var(--border-color);font-size:0.78rem;color:var(--text-secondary);line-height:1.45;">
                ${desc}
              </div>
            </div>

            <!-- Customer Details Card -->
            <div class="drawer-section-card">
              <div class="drawer-section-title">
                <span>Customer Profile</span>
                <span style="font-size:0.68rem;font-weight:normal;color:var(--text-muted);">ID: ${custId}</span>
              </div>
              <div class="detail-row">
                <span class="label">Name:</span>
                <span class="value">${custName}</span>
              </div>
              <div class="detail-row">
                <span class="label">Phone:</span>
                <span class="value">
                  ${custPhone
                    ? `<a href="tel:${custPhone}" style="color:var(--accent-primary);text-decoration:none;">${custPhone}</a>`
                    : '<span style="color:var(--text-muted);">—</span>'}
                </span>
              </div>
              <div class="detail-row">
                <span class="label">Email:</span>
                <span class="value">
                  ${custEmail
                    ? `<a href="mailto:${custEmail}" style="color:var(--accent-primary);text-decoration:none;">${custEmail}</a>`
                    : '<span style="color:var(--text-muted);">—</span>'}
                </span>
              </div>
            </div>

            <!-- Technician & Assignment Details -->
            <div class="drawer-section-card">
              <div class="drawer-section-title">
                <span>Technician</span>
                <button class="btn btn-secondary btn-sm" id="drawer-btn-assign" data-id="${tId}" style="padding:2px 6px;">
                  ${tech ? 'Reassign' : 'Assign'}
                </button>
              </div>
              ${tech ? `
                <div class="detail-row">
                  <span class="label">Staff:</span>
                  <span class="value">${techName}${techId ? ` (${techId})` : ''}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Assigned By:</span>
                  <span class="value">${assignedBy || '—'}${assignedAt ? ' • ' + formatRelativeTime(assignedAt) : ''}</span>
                </div>
              ` : `
                <div style="font-size:0.76rem;color:var(--text-muted);font-style:italic;">
                  ⚠️ No technician assigned yet.
                </div>
              `}
            </div>

            <!-- Technical Metadata Card -->
            <div class="drawer-section-card">
              <div class="drawer-section-title">Diagnostics &amp; Error</div>
              <div class="detail-row">
                <span class="label">Device:</span>
                <span class="value">${metaDevice || '<span style="color:var(--text-muted);">Not reported</span>'}</span>
              </div>
              <div class="detail-row">
                <span class="label">Version:</span>
                <span class="value">${metaVer || '<span style="color:var(--text-muted);">N/A</span>'}</span>
              </div>
              <div class="detail-row">
                <span class="label">Error Code:</span>
                <span class="value" style="font-family:monospace;${metaErr ? 'color:#DC2626;background:var(--priority-critical-bg);padding:1px 5px;border-radius:3px;' : 'color:var(--text-muted);'}">
                  ${metaErr || 'NONE'}
                </span>
              </div>
            </div>

            <!-- Activity & Comments Stream -->
            <div>
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
                <h3 style="font-size:0.86rem;font-weight:700;color:var(--text-primary);display:flex;align-items:center;gap:5px;">
                  ${icons.message} Activity Stream
                </h3>
                <span style="font-size:0.7rem;color:var(--text-muted);">${comments.length} update${comments.length !== 1 ? 's' : ''}</span>
              </div>

              <!-- Add Comment Input Box -->
              <div style="background:var(--bg-tertiary);border:1px solid var(--border-color);border-radius:var(--radius-sm);padding:10px;margin-bottom:12px;">
                <textarea id="drawer-comment-input" class="form-control" placeholder="Write internal note or public response..." style="min-height:50px;margin-bottom:8px;"></textarea>
                <div style="display:flex;align-items:center;justify-content:space-between;">
                  <div style="display:flex;align-items:center;gap:8px;">
                    <label style="font-size:0.72rem;font-weight:600;color:var(--text-secondary);display:flex;align-items:center;gap:3px;">
                      <input type="radio" name="comment-visibility" value="PUBLIC" checked> Public
                    </label>
                    <label style="font-size:0.72rem;font-weight:600;color:var(--text-secondary);display:flex;align-items:center;gap:3px;">
                      <input type="radio" name="comment-visibility" value="INTERNAL"> Internal
                    </label>
                  </div>
                  <button class="btn btn-primary btn-sm" id="btn-submit-comment" data-id="${tId}">
                    ${icons.send} Send
                  </button>
                </div>
              </div>

              <!-- Stream list -->
              <div class="comments-stream">
                ${comments.length === 0 ? `
                  <div style="text-align:center;padding:16px;color:var(--text-muted);font-size:0.76rem;">
                    No updates yet.
                  </div>
                ` : comments.slice().reverse().map(c => {
                  const cObj  = c && typeof c === 'object' ? c : {};
                  const cBy   = (cObj.createdBy && typeof cObj.createdBy === 'object') ? cObj.createdBy : null;
                  const cName = cBy ? (cBy.name ? String(cBy.name) : 'Staff') : (cObj.createdBy ? String(cObj.createdBy) : 'Staff');
                  const cType = cBy ? (cBy.userType ? String(cBy.userType) : 'STAFF') : 'STAFF';
                  const cText = cObj.comment ? String(cObj.comment) : '';
                  const cTime = cObj.createdAt ? String(cObj.createdAt) : null;
                  const cVis  = cObj.visibility ? String(cObj.visibility) : 'PUBLIC';
                  return `
                  <div class="comment-bubble ${cVis === 'INTERNAL' ? 'internal' : ''}">
                    <div class="comment-header">
                      <div class="comment-author-group">
                        <span>${cName}</span>
                        <span class="comment-author-badge">${cType}</span>
                        ${cVis === 'INTERNAL' ? '<span style="font-size:0.58rem;background:#F59E0B;color:white;padding:1px 4px;border-radius:2px;">INTERNAL</span>' : ''}
                      </div>
                      <span class="comment-time">${cTime ? formatRelativeTime(cTime) : '—'}</span>
                    </div>
                    <div class="comment-text">${cText}</div>
                  </div>
                `}).join('')}
              </div>
            </div>
          </div>

          <!-- Bottom Actions Bar -->
          <div class="drawer-actions-bar">
            <select class="filter-select" id="drawer-select-status" data-id="${tId}" style="flex:1;">
              <option value="OPEN"        ${status === 'OPEN'        ? 'selected' : ''}>Status: Open</option>
              <option value="IN_PROGRESS" ${status === 'IN_PROGRESS' ? 'selected' : ''}>Status: In Progress</option>
              <option value="RESOLVED"    ${status === 'RESOLVED'    ? 'selected' : ''}>Status: Resolved</option>
              <option value="CLOSED"      ${status === 'CLOSED'      ? 'selected' : ''}>Status: Closed</option>
              <option value="CANCELLED"   ${status === 'CANCELLED'   ? 'selected' : ''}>Status: Cancelled</option>
            </select>

            <button class="btn btn-secondary btn-sm" id="drawer-btn-edit-priority" data-id="${tId}" title="Edit Priority">
              ${icons.edit} Priority
            </button>

            ${status !== 'CLOSED' ? `
              <button class="btn btn-secondary btn-sm" id="drawer-btn-close-ticket" data-id="${tId}">
                ${icons.checkCircle} Close
              </button>
            ` : ''}

            ${status !== 'CANCELLED' ? `
              <button class="btn btn-danger btn-sm" id="drawer-btn-cancel-ticket" data-id="${tId}">
                ${icons.close} Cancel
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  };

  // Modals (Compact)
  const renderModals = (state) => {
    if (!state.activeModal) return '';

    // 1. Create Ticket Modal
    if (state.activeModal === 'create') {
      return `
        <div class="modal-overlay open" id="modal-create-ticket">
          <div class="modal-dialog">
            <div class="modal-header">
              <h3>Create Ticket</h3>
              <button class="drawer-close-btn btn-modal-close">${icons.x}</button>
            </div>
            <div class="modal-body">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                <span style="font-size:0.72rem;color:var(--text-tertiary);">POST /mongo/tickets/create</span>
                <button class="btn btn-secondary btn-sm" id="btn-prefill-postman" style="font-size:0.7rem;padding:2px 6px;">
                  Fill Sample (Panashe WhatsApp)
                </button>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Customer ID *</label>
                  <input type="text" id="create-customer-id" class="form-control" placeholder="e.g. 1234PANASHE" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Customer Name *</label>
                  <input type="text" id="create-customer-name" class="form-control" placeholder="e.g. Panashe Budzinike" required>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Phone Number</label>
                  <input type="text" id="create-customer-phone" class="form-control" placeholder="e.g. 0786398208">
                </div>
                <div class="form-group">
                  <label class="form-label">Email</label>
                  <input type="email" id="create-customer-email" class="form-control" placeholder="e.g. panashe@example.com">
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Channel *</label>
                  <select id="create-channel" class="form-control">
                    <option value="WHATSAPP">WhatsApp Support Bot</option>
                    <option value="WEB" selected>Web App / Portal</option>
                    <option value="EMAIL">Email Support</option>
                    <option value="CALL">Helpline Phone Call</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Priority *</label>
                  <select id="create-priority" class="form-control">
                    <option value="LOW">Low</option>
                    <option value="MEDIUM" selected>Medium</option>
                    <option value="HIGH">High</option>
                    <option value="CRITICAL">Critical</option>
                  </select>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Category *</label>
                  <select id="create-category" class="form-control">
                    <option value="APPLICATION" selected>Application</option>
                    <option value="BILLING">Billing & Payments</option>
                    <option value="NETWORK">Network</option>
                    <option value="ACCOUNT">Account</option>
                    <option value="HARDWARE">Hardware</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Subcategory</label>
                  <input type="text" id="create-subcategory" class="form-control" placeholder="e.g. LOGIN_ISSUE">
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Subject *</label>
                <input type="text" id="create-subject" class="form-control" placeholder="Brief issue summary" required>
              </div>

              <div class="form-group">
                <label class="form-label">Description *</label>
                <textarea id="create-description" class="form-control" placeholder="Description of the issue..." required></textarea>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Device Context</label>
                  <input type="text" id="create-device" class="form-control" placeholder="e.g. Android 14">
                </div>
                <div class="form-group">
                  <label class="form-label">Error Code</label>
                  <input type="text" id="create-error-code" class="form-control" placeholder="e.g. AUTH-001">
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary btn-modal-close btn-sm">Cancel</button>
              <button class="btn btn-primary btn-sm" id="btn-submit-create-ticket">
                ${icons.plus} Create Ticket
              </button>
            </div>
          </div>
        </div>
      `;
    }

    // 2. Assign Technician Modal
    if (state.activeModal === 'assign') {
      const ticket = state.modalPayload;
      return `
        <div class="modal-overlay open" id="modal-assign-technician">
          <div class="modal-dialog" style="max-width:440px;">
            <div class="modal-header">
              <h3>Assign Tech: ${ticket ? ticket.ticketId : ''}</h3>
              <button class="drawer-close-btn btn-modal-close">${icons.x}</button>
            </div>
            <div class="modal-body">
              <p style="font-size:0.78rem;color:var(--text-secondary);margin-bottom:8px;">
                Subject: <strong>${ticket ? ticket.subject : ''}</strong>
              </p>

              <div class="form-group">
                <label class="form-label">Select Technician</label>
                <select id="assign-technician-select" class="form-control">
                  ${(window.PREDEFINED_TECHNICIANS || []).map(tech => `
                    <option value="${tech.technicianId}">
                      ${tech.name} (${tech.technicianId})
                    </option>
                  `).join('')}
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Assigned By</label>
                <input type="text" id="assign-by-input" class="form-control" value="ADMIN-001">
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary btn-modal-close btn-sm">Cancel</button>
              <button class="btn btn-primary btn-sm" id="btn-submit-assign" data-id="${ticket ? ticket.ticketId : ''}">
                Confirm
              </button>
            </div>
          </div>
        </div>
      `;
    }

    // 3. Edit Priority & Description Modal
    if (state.activeModal === 'edit-priority') {
      const ticket = state.modalPayload;
      return `
        <div class="modal-overlay open" id="modal-edit-priority">
          <div class="modal-dialog" style="max-width:440px;">
            <div class="modal-header">
              <h3>Update Priority & Description</h3>
              <button class="drawer-close-btn btn-modal-close">${icons.x}</button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label class="form-label">Priority Level</label>
                <select id="edit-priority-select" class="form-control">
                  <option value="LOW" ${ticket && ticket.priority === 'LOW' ? 'selected' : ''}>Low</option>
                  <option value="MEDIUM" ${ticket && ticket.priority === 'MEDIUM' ? 'selected' : ''}>Medium</option>
                  <option value="HIGH" ${ticket && ticket.priority === 'HIGH' ? 'selected' : ''}>High</option>
                  <option value="CRITICAL" ${ticket && ticket.priority === 'CRITICAL' ? 'selected' : ''}>Critical</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Description</label>
                <textarea id="edit-description-input" class="form-control" style="min-height:80px;">${ticket ? ticket.description : ''}</textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary btn-modal-close btn-sm">Cancel</button>
              <button class="btn btn-primary btn-sm" id="btn-submit-edit-priority" data-id="${ticket ? ticket.ticketId : ''}">
                Save
              </button>
            </div>
          </div>
        </div>
      `;
    }

    // 4. Cancel Ticket Modal
    if (state.activeModal === 'cancel') {
      const ticket = state.modalPayload;
      return `
        <div class="modal-overlay open" id="modal-cancel-ticket">
          <div class="modal-dialog" style="max-width:440px;">
            <div class="modal-header">
              <h3>Cancel Ticket ${ticket ? ticket.ticketId : ''}</h3>
              <button class="drawer-close-btn btn-modal-close">${icons.x}</button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label class="form-label">Cancellation Reason *</label>
                <textarea id="cancel-reason-input" class="form-control" placeholder="Reason for cancellation..." required></textarea>
              </div>

              <div class="form-group">
                <label class="form-label">Cancelled By</label>
                <input type="text" id="cancel-by-input" class="form-control" value="ADMIN-001">
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary btn-modal-close btn-sm">Dismiss</button>
              <button class="btn btn-danger btn-sm" id="btn-submit-cancel" data-id="${ticket ? ticket.ticketId : ''}">
                Cancel Ticket
              </button>
            </div>
          </div>
        </div>
      `;
    }

    // 5. FAQ Detail & Procedure Preview Modal
    if (state.activeModal === 'faq-detail') {
      const faq = state.modalPayload || state.selectedFaq;
      if (!faq) return '';
      const res = faq.resolution || {};
      const procs = Array.isArray(res.procedures) ? res.procedures : [];
      const prereqs = Array.isArray(res.prerequisites) ? res.prerequisites : [];
      const links = Array.isArray(res.relatedLinks) ? res.relatedLinks : [];
      const tags = Array.isArray(faq.tags) ? faq.tags : [];
      const helpful = Number(faq.helpfulCount) || 0;
      const notHelpful = Number(faq.notHelpfulCount) || 0;
      const totalVotes = helpful + notHelpful;
      const pct = totalVotes > 0 ? Math.round((helpful / totalVotes) * 100) : 100;

      return `
        <div class="modal-overlay open" id="modal-faq-detail">
          <div class="modal-dialog" style="max-width:680px;max-height:88vh;display:flex;flex-direction:column;">
            <div class="modal-header" style="border-bottom:1px solid var(--border-color);padding:10px 14px;">
              <div style="display:flex;align-items:center;gap:8px;">
                <span class="badge-status open" style="font-size:0.6rem;padding:2px 6px;">${faq.category}</span>
                <span style="font-family:'JetBrains Mono',monospace;font-size:0.68rem;color:var(--text-muted);">${faq.faqId}</span>
                <span class="channel-pill web" style="font-size:0.58rem;">${faq.difficulty || 'Easy'} • ${faq.estimatedTime || '2 mins'}</span>
              </div>
              <button class="drawer-close-btn btn-modal-close">${icons.x}</button>
            </div>

            <div class="modal-body" style="overflow-y:auto;padding:14px;flex:1;">
              <h2 style="font-size:1.05rem;font-weight:800;color:var(--text-primary);margin-bottom:6px;line-height:1.35;">
                ${faq.title}
              </h2>
              <p style="font-size:0.75rem;color:var(--text-secondary);line-height:1.5;margin-bottom:12px;">
                ${faq.summary}
              </p>

              <!-- Overview & Prerequisites -->
              <div style="background:var(--bg-tertiary);border-left:3px solid var(--accent-primary);border-radius:4px;padding:8px 12px;margin-bottom:14px;">
                <div style="font-weight:700;font-size:0.72rem;color:var(--text-primary);margin-bottom:4px;">
                  Overview &amp; Prerequisites
                </div>
                <div style="font-size:0.7rem;color:var(--text-secondary);margin-bottom:6px;line-height:1.4;">
                  ${res.overview || 'Review prerequisites before following resolution procedures.'}
                </div>
                ${prereqs.length > 0 ? `
                  <ul style="margin:0;padding-left:16px;font-size:0.68rem;color:var(--text-tertiary);line-height:1.4;">
                    ${prereqs.map(p => `<li>${p}</li>`).join('')}
                  </ul>
                ` : ''}
              </div>

              <!-- Step-by-Step Procedures -->
              <div style="margin-bottom:14px;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
                  <h4 style="font-size:0.78rem;font-weight:700;color:var(--text-primary);text-transform:uppercase;letter-spacing:0.5px;">
                    Step-by-Step Resolution Procedures (${procs.length} Steps)
                  </h4>
                  <span style="font-size:0.65rem;color:var(--text-muted);">Self-Service Troubleshooting</span>
                </div>

                <div style="display:flex;flex-direction:column;gap:8px;">
                  ${procs.map((p, idx) => `
                    <div style="display:flex;gap:10px;background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:6px;padding:10px;">
                      <div style="width:24px;height:24px;border-radius:50%;background:rgba(99,102,241,0.15);color:#6366F1;font-weight:800;font-size:0.75rem;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        ${p.step || idx + 1}
                      </div>
                      <div style="flex:1;">
                        <div style="font-size:0.76rem;font-weight:700;color:var(--text-primary);margin-bottom:3px;">
                          ${p.title}
                        </div>
                        <div style="font-size:0.72rem;color:var(--text-secondary);line-height:1.45;white-space:pre-line;">
                          ${p.instruction}
                        </div>
                        ${p.tip ? `
                          <div style="margin-top:6px;background:rgba(245,158,11,0.08);border:1px dashed rgba(245,158,11,0.3);border-radius:4px;padding:4px 8px;font-size:0.66rem;color:#D97706;">
                            💡 <strong>Tip:</strong> ${p.tip}
                          </div>
                        ` : ''}
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Escalation Advice -->
              ${res.escalationAdvice ? `
                <div style="background:rgba(239,68,68,0.06);border:1px solid rgba(239,68,68,0.2);border-radius:6px;padding:8px 12px;margin-bottom:12px;">
                  <div style="font-weight:700;font-size:0.7rem;color:#DC2626;margin-bottom:2px;">
                    🚨 Escalation Guidelines
                  </div>
                  <div style="font-size:0.68rem;color:var(--text-secondary);line-height:1.4;">
                    ${res.escalationAdvice}
                  </div>
                </div>
              ` : ''}

              <!-- Feedback & Tags -->
              <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;padding-top:8px;border-top:1px solid var(--border-color);">
                <div style="display:flex;align-items:center;gap:4px;flex-wrap:wrap;">
                  <span style="font-size:0.64rem;color:var(--text-muted);margin-right:2px;">Tags:</span>
                  ${tags.map(t => `
                    <span style="font-size:0.6rem;padding:1px 5px;border-radius:3px;background:var(--bg-tertiary);color:var(--text-tertiary);">#${t}</span>
                  `).join('')}
                </div>
                <div style="display:flex;align-items:center;gap:6px;font-size:0.68rem;color:var(--text-secondary);">
                  <span>Was this procedure helpful?</span>
                  <button class="btn btn-secondary btn-sm btn-vote-faq" data-id="${faq.faqId}" data-type="up" style="padding:2px 6px;">
                    ${icons.thumbsUp} ${helpful}
                  </button>
                  <button class="btn btn-secondary btn-sm btn-vote-faq" data-id="${faq.faqId}" data-type="down" style="padding:2px 6px;">
                    ${icons.thumbsDown} ${notHelpful}
                  </button>
                </div>
              </div>
            </div>

            <div class="modal-footer" style="border-top:1px solid var(--border-color);padding:8px 14px;">
              <button class="btn btn-secondary btn-modal-close btn-sm">Close</button>
              <button class="btn btn-secondary btn-sm btn-edit-faq" data-id="${faq.faqId}">
                ${icons.edit} Edit FAQ
              </button>
            </div>
          </div>
        </div>
      `;
    }

    // 6. Add / Edit FAQ & Procedure Modal
    if (state.activeModal === 'faq-add-edit') {
      const existing = state.modalPayload; // null if adding new
      const isEdit = !!existing;
      const res = (existing && existing.resolution) ? existing.resolution : {};
      const procs = (res && Array.isArray(res.procedures) && res.procedures.length > 0)
        ? res.procedures
        : [
            { step: 1, title: "Initial Verification", instruction: "Check system status and ensure network connection is active.", tip: "Verify with registered credentials." },
            { step: 2, title: "Clear Stale Cache", instruction: "Clear application cache or restart client service.", tip: "Restart application once cache is purged." }
          ];
      const prereqs = (res && Array.isArray(res.prerequisites)) ? res.prerequisites.join('\n') : "Active internet connection.\nValid registered user credentials.";
      const tags = (existing && Array.isArray(existing.tags)) ? existing.tags.join(', ') : "";

      return `
        <div class="modal-overlay open" id="modal-faq-add-edit">
          <div class="modal-dialog" style="max-width:720px;max-height:90vh;display:flex;flex-direction:column;">
            <div class="modal-header" style="border-bottom:1px solid var(--border-color);padding:10px 14px;">
              <div style="display:flex;align-items:center;gap:6px;">
                <span style="display:flex;color:#6366F1;">${icons.book}</span>
                <h3 style="font-size:0.88rem;font-weight:700;">
                  ${isEdit ? `Edit FAQ: ${existing.faqId}` : '+ Add FAQ & Resolution Procedures'}
                </h3>
              </div>
              <button class="drawer-close-btn btn-modal-close">${icons.x}</button>
            </div>

            <div class="modal-body" style="overflow-y:auto;padding:14px;flex:1;">
              <input type="hidden" id="faq-form-edit-id" value="${isEdit ? existing.faqId : ''}">

              <div class="form-row">
                <div class="form-group" style="flex:2;">
                  <label class="form-label">Question / Issue Title *</label>
                  <input type="text" id="faq-form-title" class="form-control" placeholder="e.g. How to resolve AUTH-001 mobile login error?" value="${existing ? existing.title : ''}" required>
                </div>
                <div class="form-group" style="flex:1;">
                  <label class="form-label">Category *</label>
                  <select id="faq-form-category" class="form-control">
                    <option value="APPLICATION" ${existing && existing.category === 'APPLICATION' ? 'selected' : ''}>Application</option>
                    <option value="BILLING" ${existing && existing.category === 'BILLING' ? 'selected' : ''}>Billing</option>
                    <option value="NETWORK" ${existing && existing.category === 'NETWORK' ? 'selected' : ''}>Network & VPN</option>
                    <option value="HARDWARE" ${existing && existing.category === 'HARDWARE' ? 'selected' : ''}>Hardware</option>
                    <option value="SECURITY" ${existing && existing.category === 'SECURITY' ? 'selected' : ''}>Security & 2FA</option>
                    <option value="GENERAL" ${existing && existing.category === 'GENERAL' ? 'selected' : ''}>General</option>
                  </select>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Subcategory / Error Code</label>
                  <input type="text" id="faq-form-subcategory" class="form-control" placeholder="e.g. LOGIN_ISSUE or AUTH-001" value="${existing ? existing.subcategory : ''}">
                </div>
                <div class="form-group">
                  <label class="form-label">Estimated Resolution Time</label>
                  <input type="text" id="faq-form-time" class="form-control" placeholder="e.g. 2-3 mins" value="${existing ? existing.estimatedTime : '2-3 mins'}">
                </div>
                <div class="form-group">
                  <label class="form-label">Difficulty Level</label>
                  <select id="faq-form-difficulty" class="form-control">
                    <option value="Easy" ${existing && existing.difficulty === 'Easy' ? 'selected' : ''}>Easy</option>
                    <option value="Moderate" ${existing && existing.difficulty === 'Moderate' ? 'selected' : ''}>Moderate</option>
                    <option value="Advanced" ${existing && existing.difficulty === 'Advanced' ? 'selected' : ''}>Advanced</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Status</label>
                  <select id="faq-form-status" class="form-control">
                    <option value="PUBLISHED" ${!existing || existing.status === 'PUBLISHED' ? 'selected' : ''}>Published (Active for Bot)</option>
                    <option value="DRAFT" ${existing && existing.status === 'DRAFT' ? 'selected' : ''}>Draft (Internal Only)</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Issue Summary *</label>
                <textarea id="faq-form-summary" class="form-control" style="min-height:50px;" placeholder="Brief explanation of the cause or problem..." required>${existing ? existing.summary : ''}</textarea>
              </div>

              <div class="form-group">
                <label class="form-label">Prerequisites (One per line)</label>
                <textarea id="faq-form-prereqs" class="form-control" style="min-height:45px;" placeholder="e.g. Active Wi-Fi or mobile data...">${prereqs}</textarea>
              </div>

              <!-- Dynamic Procedures Builder -->
              <div style="background:var(--bg-tertiary);border:1px solid var(--border-color);border-radius:6px;padding:10px;margin-bottom:12px;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
                  <div>
                    <label class="form-label" style="font-weight:700;color:var(--text-primary);margin:0;">
                      Step-by-Step Resolution Procedures *
                    </label>
                    <span style="font-size:0.65rem;color:var(--text-tertiary);">Steps customers will follow on the bot to fix their issue</span>
                  </div>
                  <button type="button" class="btn btn-secondary btn-sm" id="btn-add-faq-step" style="font-size:0.66rem;padding:2px 8px;">
                    ${icons.plus} + Add Step
                  </button>
                </div>

                <div id="faq-procedures-list" style="display:flex;flex-direction:column;gap:8px;">
                  ${procs.map((p, idx) => `
                    <div class="faq-step-card" data-step-index="${idx}" style="background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:5px;padding:8px;position:relative;">
                      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
                        <span style="font-weight:700;font-size:0.68rem;color:var(--accent-primary);">
                          Step <span class="step-num-label">${idx + 1}</span>
                        </span>
                        <button type="button" class="btn-remove-faq-step" style="background:none;border:none;color:#EF4444;cursor:pointer;font-size:0.68rem;padding:0;">
                          ${icons.trash}
                        </button>
                      </div>
                      <div style="display:flex;gap:6px;margin-bottom:6px;">
                        <input type="text" class="form-control step-title-input" placeholder="Step Title (e.g. Clear Application Cache)" value="${p.title || ''}" style="font-size:0.72rem;" required>
                      </div>
                      <div style="margin-bottom:6px;">
                        <textarea class="form-control step-instruction-input" placeholder="Detailed instruction..." style="min-height:44px;font-size:0.7rem;" required>${p.instruction || ''}</textarea>
                      </div>
                      <div>
                        <input type="text" class="form-control step-tip-input" placeholder="Pro-Tip / Note (Optional, e.g. Do not delete offline drafts)" value="${p.tip || ''}" style="font-size:0.68rem;">
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <div class="form-row">
                <div class="form-group" style="flex:1;">
                  <label class="form-label">Search Keywords / Tags (Comma-separated)</label>
                  <input type="text" id="faq-form-tags" class="form-control" placeholder="e.g. login, mobile, auth-001, android" value="${tags}">
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Escalation Advice (If self-service fails)</label>
                <input type="text" id="faq-form-escalation" class="form-control" placeholder="e.g. If problem persists after Step 4, submit a ticket under APPLICATION category." value="${res.escalationAdvice || ''}">
              </div>
            </div>

            <div class="modal-footer" style="border-top:1px solid var(--border-color);padding:8px 14px;">
              <button class="btn btn-secondary btn-modal-close btn-sm">Cancel</button>
              <button class="btn btn-primary btn-sm" id="btn-submit-faq" style="background:#6366F1;border-color:#4F46E5;">
                ${isEdit ? 'Save Changes' : 'Publish FAQ & Procedures'}
              </button>
            </div>
          </div>
        </div>
      `;
    }

    return '';
  };

  // Lookup & Customer Search View (Compact)
  const renderLookupView = (state) => {
    return `
      <div class="view-content">
        <div class="table-card" style="padding:10px;margin-bottom:10px;">
          <h2 style="font-size:0.88rem;font-weight:700;margin-bottom:3px;">Direct Ticket & Customer Query</h2>
          <p style="font-size:0.7rem;color:var(--text-tertiary);margin-bottom:8px;">
            Consume <code>GET /mongo/tickets/getAll?customerId=:id</code> or <code>?ticketId=:id</code>
          </p>

          <div style="display:flex;gap:6px;max-width:480px;">
            <input type="text" id="lookup-query-input" class="form-control" placeholder="Enter Ticket ID (e.g. TKT-2026-AA37D319) or Customer ID (e.g. 1234PANASHE)">
            <button class="btn btn-primary btn-sm" id="btn-execute-lookup" style="white-space:nowrap;">
              ${icons.search} Query
            </button>
          </div>
        </div>

        <div id="lookup-results-container">
          <div style="text-align:center;padding:24px;color:var(--text-muted);font-size:0.74rem;">
            Enter an identifier above to run a targeted query.
          </div>
        </div>
      </div>
    `;
  };

  // API Hub & Postman Telemetry View (Compact)
  const renderApiHub = (state) => {
    const logs = window.apiClient.logs || [];
    return `
      <div class="view-content">
        <!-- Configuration Header -->
        <div class="table-card" style="padding:10px;margin-bottom:10px;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
            <div>
              <h2 style="font-size:0.88rem;font-weight:700;">Backend Connection & Telemetry</h2>
              <p style="font-size:0.7rem;color:var(--text-tertiary);">
                Active Target: <strong style="color:var(--accent-primary);">${window.apiClient.baseUrl}</strong>
              </p>
            </div>
            <div style="display:flex;align-items:center;gap:6px;">
              <button class="btn btn-secondary btn-sm" id="btn-hub-ping">
                ${icons.pulse} Ping Endpoint
              </button>
              <button class="btn btn-secondary btn-sm" id="btn-reset-mock-data">
                ${icons.refresh} Reset Mock Store
              </button>
            </div>
          </div>

          <div class="form-row" style="margin-bottom:6px;">
            <div class="form-group">
              <label class="form-label">Base URL (All APIs)</label>
              <div style="display:flex;gap:6px;">
                <input type="text" id="hub-base-url-input" class="form-control" value="${window.apiClient.baseUrl}">
                <button class="btn btn-primary btn-sm" id="btn-save-base-url">Save</button>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Operating Mode</label>
              <select id="hub-mode-select" class="form-control">
                <option value="real" ${window.apiClient.mode === 'real' ? 'selected' : ''}>Strict Live Backend (Direct fetch to 127.0.0.1:3200/mongo/tickets)</option>
                <option value="auto" ${window.apiClient.mode === 'auto' ? 'selected' : ''}>Auto Fallback (Try Live, fallback to local store if offline)</option>
                <option value="mock" ${window.apiClient.mode === 'mock' ? 'selected' : ''}>Local Mock Only (Standalone Demo)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- 10 Postman Collection Endpoints Quick Runner -->
        <div class="table-card" style="padding:10px;margin-bottom:10px;">
          <h3 style="font-size:0.82rem;font-weight:700;margin-bottom:8px;">10 Postman Collection Endpoints (${window.apiClient.baseUrl})</h3>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(210px, 1fr));gap:6px;">
            <div style="padding:8px 10px;background:var(--bg-tertiary);border-radius:var(--radius-sm);display:flex;justify-content:space-between;align-items:center;">
              <div>
                <span class="api-method POST">POST</span>
                <span style="font-family:monospace;font-size:0.72rem;margin-left:4px;">/create</span>
              </div>
              <button class="btn btn-secondary btn-sm" id="btn-test-ep-create" style="padding:2px 6px;">Test</button>
            </div>

            <div style="padding:8px 10px;background:var(--bg-tertiary);border-radius:var(--radius-sm);display:flex;justify-content:space-between;align-items:center;">
              <div>
                <span class="api-method GET">GET</span>
                <span style="font-family:monospace;font-size:0.72rem;margin-left:4px;">/getAll</span>
              </div>
              <button class="btn btn-secondary btn-sm" id="btn-test-ep-getall" style="padding:2px 6px;">Test</button>
            </div>

            <div style="padding:8px 10px;background:var(--bg-tertiary);border-radius:var(--radius-sm);display:flex;justify-content:space-between;align-items:center;">
              <div>
                <span class="api-method GET">GET</span>
                <span style="font-family:monospace;font-size:0.72rem;margin-left:4px;">/getAll?customerId</span>
              </div>
              <button class="btn btn-secondary btn-sm" id="btn-test-ep-cust" style="padding:2px 6px;">Test</button>
            </div>

            <div style="padding:8px 10px;background:var(--bg-tertiary);border-radius:var(--radius-sm);display:flex;justify-content:space-between;align-items:center;">
              <div>
                <span class="api-method GET">GET</span>
                <span style="font-family:monospace;font-size:0.72rem;margin-left:4px;">/getAll?ticketId</span>
              </div>
              <button class="btn btn-secondary btn-sm" id="btn-test-ep-ticket" style="padding:2px 6px;">Test</button>
            </div>

            <div style="padding:8px 10px;background:var(--bg-tertiary);border-radius:var(--radius-sm);display:flex;justify-content:space-between;align-items:center;">
              <div>
                <span class="api-method GET">GET</span>
                <span style="font-family:monospace;font-size:0.72rem;margin-left:4px;">/:id/status</span>
              </div>
              <button class="btn btn-secondary btn-sm" id="btn-test-ep-status" style="padding:2px 6px;">Test</button>
            </div>

            <div style="padding:8px 10px;background:var(--bg-tertiary);border-radius:var(--radius-sm);display:flex;justify-content:space-between;align-items:center;">
              <div>
                <span class="api-method PATCH">PATCH</span>
                <span style="font-family:monospace;font-size:0.72rem;margin-left:4px;">/:id</span>
              </div>
              <button class="btn btn-secondary btn-sm" id="btn-test-ep-patch" style="padding:2px 6px;">Test</button>
            </div>

            <div style="padding:8px 10px;background:var(--bg-tertiary);border-radius:var(--radius-sm);display:flex;justify-content:space-between;align-items:center;">
              <div>
                <span class="api-method POST">POST</span>
                <span style="font-family:monospace;font-size:0.72rem;margin-left:4px;">/:id/assign</span>
              </div>
              <button class="btn btn-secondary btn-sm" id="btn-test-ep-assign" style="padding:2px 6px;">Test</button>
            </div>

            <div style="padding:8px 10px;background:var(--bg-tertiary);border-radius:var(--radius-sm);display:flex;justify-content:space-between;align-items:center;">
              <div>
                <span class="api-method PATCH">PATCH</span>
                <span style="font-family:monospace;font-size:0.72rem;margin-left:4px;">/:id/status</span>
              </div>
              <button class="btn btn-secondary btn-sm" id="btn-test-ep-patch-status" style="padding:2px 6px;">Test</button>
            </div>

            <div style="padding:8px 10px;background:var(--bg-tertiary);border-radius:var(--radius-sm);display:flex;justify-content:space-between;align-items:center;">
              <div>
                <span class="api-method POST">POST</span>
                <span style="font-family:monospace;font-size:0.72rem;margin-left:4px;">/:id/comments</span>
              </div>
              <button class="btn btn-secondary btn-sm" id="btn-test-ep-comment" style="padding:2px 6px;">Test</button>
            </div>

            <div style="padding:8px 10px;background:var(--bg-tertiary);border-radius:var(--radius-sm);display:flex;justify-content:space-between;align-items:center;">
              <div>
                <span class="api-method POST">POST</span>
                <span style="font-family:monospace;font-size:0.72rem;margin-left:4px;">/:id/close</span>
              </div>
              <button class="btn btn-secondary btn-sm" id="btn-test-ep-close" style="padding:2px 6px;">Test</button>
            </div>

            <div style="padding:8px 10px;background:var(--bg-tertiary);border-radius:var(--radius-sm);display:flex;justify-content:space-between;align-items:center;">
              <div>
                <span class="api-method POST">POST</span>
                <span style="font-family:monospace;font-size:0.72rem;margin-left:4px;">/:id/cancel</span>
              </div>
              <button class="btn btn-secondary btn-sm" id="btn-test-ep-cancel" style="padding:2px 6px;">Test</button>
            </div>
          </div>
        </div>

        <!-- Live HTTP Activity Stream -->
        <div class="table-card" style="padding:14px;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
            <h3 style="font-size:0.86rem;font-weight:700;">Live HTTP Activity</h3>
            <span style="font-size:0.68rem;color:var(--text-tertiary);">${logs.length} logged</span>
          </div>

          <div id="api-log-stream" style="max-height:300px;overflow-y:auto;">
            ${logs.length === 0 ? `
              <div style="text-align:center;padding:20px;color:var(--text-muted);font-size:0.75rem;">
                No HTTP requests executed in this session yet.
              </div>
            ` : logs.map(l => `
              <div class="api-log-entry">
                <div style="display:flex;align-items:center;gap:6px;">
                  <span class="api-method ${l.method}">${l.method}</span>
                  <span style="color:var(--text-primary);font-weight:600;font-size:0.7rem;">${l.url}</span>
                  <span style="font-size:0.62rem;padding:1px 4px;border-radius:2px;background:var(--bg-secondary);">${l.mode}</span>
                </div>
                <div style="display:flex;align-items:center;gap:8px;">
                  <span style="color:${l.status === 200 || l.status === 201 ? '#10B981' : '#EF4444'};font-weight:700;">
                    ${l.status}
                  </span>
                  <span style="color:var(--text-muted);">${l.timeMs}ms</span>
                  <span style="color:var(--text-muted);">${l.timestamp}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  };

  // Knowledge Base & FAQ Management View (Service Provider & Staff Operations)
  const renderFaqManagement = (state) => {
    const metrics = (state && typeof state.getFaqMetrics === 'function')
      ? state.getFaqMetrics()
      : { total: 0, published: 0, draft: 0, totalViews: 0, totalHelpful: 0, totalNotHelpful: 0, satisfactionRate: 95 };
    const faqs = (state && Array.isArray(state.filteredFaqs)) ? state.filteredFaqs : [];

    return `
      <div class="view-content">
        <!-- KPI Metrics Bar -->
        <div class="kpi-grid" style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); margin-bottom: 10px;">
          <div class="kpi-card">
            <div class="kpi-icon-wrap" style="background:rgba(99,102,241,0.12);color:#6366F1;">
              ${icons.book}
            </div>
            <div>
              <div class="kpi-value">${metrics.total}</div>
              <div class="kpi-label">Total Articles</div>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-icon-wrap" style="background:rgba(16,185,129,0.12);color:#10B981;">
              ${icons.checkCircle}
            </div>
            <div>
              <div class="kpi-value">${metrics.published}</div>
              <div class="kpi-label">Published for Bot</div>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-icon-wrap" style="background:rgba(59,130,246,0.12);color:#3B82F6;">
              ${icons.eye}
            </div>
            <div>
              <div class="kpi-value">${metrics.totalViews}</div>
              <div class="kpi-label">Customer Views</div>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-icon-wrap" style="background:rgba(245,158,11,0.12);color:#F59E0B;">
              ${icons.thumbsUp}
            </div>
            <div>
              <div class="kpi-value">${metrics.satisfactionRate}%</div>
              <div class="kpi-label">Helpful (${metrics.totalHelpful} 👍 / ${metrics.totalNotHelpful} 👎)</div>
            </div>
          </div>
        </div>

        <!-- Filter & Action Toolbar -->
        <div class="table-card" style="padding:8px 10px;margin-bottom:10px;">
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
            <div style="display:flex;align-items:center;gap:6px;flex:1;min-width:260px;">
              <div style="position:relative;flex:1;max-width:280px;">
                <input 
                  type="text" 
                  id="faq-search-input" 
                  class="form-control" 
                  placeholder="Search questions, procedures, tags..." 
                  value="${(state.faqFilters && state.faqFilters.search) ? state.faqFilters.search : ''}"
                  style="font-size:0.72rem;padding-left:24px;"
                >
                <span style="position:absolute;left:7px;top:50%;transform:translateY(-50%);color:var(--text-muted);display:flex;width:12px;height:12px;">
                  ${icons.search}
                </span>
              </div>

              <select id="faq-category-select" class="form-control" style="width:120px;font-size:0.7rem;">
                <option value="ALL" ${state.faqFilters && state.faqFilters.category === 'ALL' ? 'selected' : ''}>All Categories</option>
                <option value="APPLICATION" ${state.faqFilters && state.faqFilters.category === 'APPLICATION' ? 'selected' : ''}>Application</option>
                <option value="BILLING" ${state.faqFilters && state.faqFilters.category === 'BILLING' ? 'selected' : ''}>Billing</option>
                <option value="NETWORK" ${state.faqFilters && state.faqFilters.category === 'NETWORK' ? 'selected' : ''}>Network & VPN</option>
                <option value="HARDWARE" ${state.faqFilters && state.faqFilters.category === 'HARDWARE' ? 'selected' : ''}>Hardware</option>
                <option value="SECURITY" ${state.faqFilters && state.faqFilters.category === 'SECURITY' ? 'selected' : ''}>Security & 2FA</option>
                <option value="GENERAL" ${state.faqFilters && state.faqFilters.category === 'GENERAL' ? 'selected' : ''}>General</option>
              </select>

              <select id="faq-status-select" class="form-control" style="width:105px;font-size:0.7rem;">
                <option value="ALL" ${state.faqFilters && state.faqFilters.status === 'ALL' ? 'selected' : ''}>All Status</option>
                <option value="PUBLISHED" ${state.faqFilters && state.faqFilters.status === 'PUBLISHED' ? 'selected' : ''}>Published</option>
                <option value="DRAFT" ${state.faqFilters && state.faqFilters.status === 'DRAFT' ? 'selected' : ''}>Draft</option>
              </select>
            </div>

            <div style="display:flex;align-items:center;gap:6px;">
              <button class="btn btn-secondary btn-sm" id="btn-reset-faqs" title="Restore seed sample FAQs">
                ${icons.refresh} Reset Defaults
              </button>
              <button class="btn btn-primary btn-sm" id="btn-open-add-faq" style="background:#6366F1;border-color:#4F46E5;font-weight:700;">
                ${icons.plus} + Add FAQ &amp; Procedure
              </button>
            </div>
          </div>
        </div>

        <!-- FAQs Table Card -->
        <div class="table-card">
          <div class="table-responsive">
            <table class="tickets-table">
              <thead>
                <tr>
                  <th style="width:110px;">FAQ ID</th>
                  <th>Issue / Question &amp; Summary</th>
                  <th style="width:110px;">Category</th>
                  <th style="width:90px;">Procedures</th>
                  <th style="width:100px;">Est. Time</th>
                  <th style="width:110px;">Helpful Votes</th>
                  <th style="width:85px;">Status</th>
                  <th style="width:90px;">Updated</th>
                  <th style="width:110px;text-align:right;">Actions</th>
                </tr>
              </thead>
              <tbody>
                ${faqs.length === 0 ? `
                  <tr>
                    <td colspan="9" style="text-align:center;padding:32px 14px;color:var(--text-muted);">
                      <div style="margin-bottom:6px;color:#6366F1;">${icons.book}</div>
                      <div style="font-weight:700;font-size:0.78rem;margin-bottom:4px;">No FAQs match your search filters</div>
                      <div style="font-size:0.68rem;">Try clearing your search or add a new troubleshooting procedure above.</div>
                    </td>
                  </tr>
                ` : faqs.map(f => {
                  const procs = (f.resolution && Array.isArray(f.resolution.procedures)) ? f.resolution.procedures : [];
                  const helpful = Number(f.helpfulCount) || 0;
                  const notHelpful = Number(f.notHelpfulCount) || 0;
                  const totalV = helpful + notHelpful;
                  const pct = totalV > 0 ? Math.round((helpful / totalV) * 100) : 100;
                  const isPublished = f.status === 'PUBLISHED';

                  return `
                    <tr class="faq-table-row" data-id="${f.faqId}">
                      <td>
                        <span class="ticket-id-link" style="color:#6366F1;">
                          ${f.faqId}
                        </span>
                      </td>
                      <td>
                        <div style="font-weight:700;color:var(--text-primary);font-size:0.73rem;margin-bottom:2px;line-height:1.35;">
                          ${f.title}
                        </div>
                        <div style="color:var(--text-tertiary);font-size:0.65rem;line-height:1.3;max-width:440px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                          ${f.summary}
                        </div>
                        ${Array.isArray(f.tags) && f.tags.length > 0 ? `
                          <div style="display:flex;gap:3px;margin-top:3px;flex-wrap:wrap;">
                            ${f.tags.slice(0, 4).map(t => `
                              <span style="font-size:0.55rem;padding:0 4px;border-radius:2px;background:var(--bg-tertiary);color:var(--text-tertiary);">#${t}</span>
                            `).join('')}
                          </div>
                        ` : ''}
                      </td>
                      <td>
                        <span class="badge-status open" style="font-size:0.58rem;padding:1px 5px;">
                          ${f.category}
                        </span>
                        ${f.subcategory ? `
                          <div style="font-size:0.56rem;color:var(--text-muted);margin-top:2px;font-family:'JetBrains Mono',monospace;">
                            ${f.subcategory}
                          </div>
                        ` : ''}
                      </td>
                      <td>
                        <span class="channel-pill web" style="font-size:0.58rem;cursor:pointer;" title="Click to view step procedures">
                          📋 ${procs.length} Step${procs.length !== 1 ? 's' : ''}
                        </span>
                      </td>
                      <td>
                        <span style="font-size:0.66rem;color:var(--text-secondary);font-weight:600;">
                          ⏱️ ${f.estimatedTime || '2 mins'}
                        </span>
                        <div style="font-size:0.56rem;color:var(--text-muted);">${f.difficulty || 'Easy'}</div>
                      </td>
                      <td>
                        <span style="font-size:0.66rem;color:#10B981;font-weight:700;">
                          👍 ${helpful}
                        </span>
                        <span style="font-size:0.66rem;color:#EF4444;font-weight:700;margin-left:4px;">
                          👎 ${notHelpful}
                        </span>
                        <div style="font-size:0.56rem;color:var(--text-muted);">${pct}% helpful</div>
                      </td>
                      <td>
                        <span class="badge-status ${isPublished ? 'open' : 'closed'}" style="font-size:0.56rem;padding:1px 4px;">
                          ${isPublished ? '● PUBLISHED' : '○ DRAFT'}
                        </span>
                      </td>
                      <td>
                        <span style="font-size:0.62rem;color:var(--text-muted);">
                          ${formatRelativeTime(f.lastUpdated)}
                        </span>
                      </td>
                      <td style="text-align:right;">
                        <div style="display:inline-flex;gap:4px;">
                          <button class="btn btn-secondary btn-sm btn-view-faq-proc" data-id="${f.faqId}" title="View Resolution Procedures" style="padding:2px 5px;">
                            ${icons.eye}
                          </button>
                          <button class="btn btn-secondary btn-sm btn-edit-faq" data-id="${f.faqId}" title="Edit FAQ" style="padding:2px 5px;">
                            ${icons.edit}
                          </button>
                          <button class="btn btn-secondary btn-sm btn-delete-faq" data-id="${f.faqId}" title="Delete FAQ" style="padding:2px 5px;color:#EF4444;">
                            ${icons.trash}
                          </button>
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  };

  return {
    icons,
    renderSidebar,
    renderHeader,
    renderDashboard,
    renderTicketTable,
    renderTicketDrawer,
    renderModals,
    renderLookupView,
    renderApiHub,
    renderFaqManagement,
    renderStatusBadge,
    renderPriorityBadge,
    renderChannelPill,
    formatDate,
    formatRelativeTime
  };
})();
