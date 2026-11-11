// Main Application Controller for HelpDesk Enterprise
document.addEventListener('DOMContentLoaded', async () => {
  const {
    renderSidebar,
    renderHeader,
    renderDashboard,
    renderTicketTable,
    renderTicketDrawer,
    renderModals,
    renderLookupView,
    renderApiHub,
    renderFaqManagement,
    icons
  } = window.Components;

  const state = window.appState;
  const api = window.apiClient;

  // Apply initial theme
  document.documentElement.setAttribute('data-theme', state.theme);

  // Apply initial zoom scale
  let currentZoom = parseFloat(localStorage.getItem('pulse_zoom') || '0.78');
  function applyZoom(val) {
    currentZoom = Math.min(Math.max(val, 0.45), 1.25);
    localStorage.setItem('pulse_zoom', currentZoom.toFixed(2));
    document.body.style.zoom = currentZoom;
    document.documentElement.style.setProperty('--app-zoom', currentZoom);
    const label = document.getElementById('zoom-level-label');
    if (label) label.textContent = `${Math.round(currentZoom * 100)}%`;
  }
  applyZoom(currentZoom);

  // Toast Notification System
  function showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    let icon = icons.pulse;
    if (type === 'success') icon = icons.checkCircle;
    if (type === 'error') icon = icons.alert;

    toast.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="display:flex;align-items:center;justify-content:center;">${icon}</span>
        <span>${message}</span>
      </div>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
  window.showToast = showToast;

  // Initial Fetch of Tickets & FAQs (Strict Live Backend / Local Store)
  async function loadInitialData() {
    state.isLoading = true;
    try {
      // Load Tickets
      const data = await api.getAllTickets();
      const tickets = api._extractTickets ? api._extractTickets(data) : (Array.isArray(data) ? data : (data.data || data.tickets || []));
      state.setTickets(tickets);
      const count = state.tickets.length;
      showToast(`✓ ${count} ticket${count !== 1 ? 's' : ''} loaded from ${api.baseUrl}`, 'success');
    } catch (err) {
      console.warn("API load failed:", err);
      const errMsg = err ? (err.message ? String(err.message) : String(err)) : 'Unknown network error';
      const isCors = errMsg.includes('CORS') || errMsg.includes('Failed to fetch');
      if (isCors) {
        showToast(
          'CORS Error: Your backend must allow browser requests. See fix below.',
          'error'
        );
        window._lastApiError = 'cors';
      } else {
        window._lastApiError = errMsg;
        showToast(`Cannot reach backend: ${errMsg}`, 'error');
      }
      state.setTickets([]);
    }

    try {
      // Load Knowledge Base & FAQs
      const faqs = await api.getAllFaqs();
      state.setFaqs(faqs);
    } catch (faqErr) {
      console.warn("Failed to load FAQs:", faqErr);
    } finally {
      state.isLoading = false;
      renderApp();
    }
  }

  // Master Render Function
  function renderApp() {
    const sidebarEl = document.getElementById('app-sidebar');
    const headerEl = document.getElementById('app-header');
    const contentEl = document.getElementById('app-content');
    const drawerEl = document.getElementById('app-drawer-container');
    const modalEl = document.getElementById('app-modal-container');

    if (sidebarEl) sidebarEl.innerHTML = renderSidebar(state);
    if (headerEl) headerEl.innerHTML = renderHeader(state);

    if (contentEl) {
      if (state.currentView === 'dashboard') {
        contentEl.innerHTML = renderDashboard(state);
      } else if (state.currentView === 'all-tickets' || state.currentView === 'priority-queue' || state.currentView === 'unassigned-queue') {
        contentEl.innerHTML = `
          <div class="view-content">
            ${renderTicketTable(state)}
          </div>
        `;
      } else if (state.currentView === 'lookup') {
        contentEl.innerHTML = renderLookupView(state);
      } else if (state.currentView === 'api-hub') {
        contentEl.innerHTML = renderApiHub(state);
      } else if (state.currentView === 'faqs') {
        contentEl.innerHTML = renderFaqManagement(state);
      }
    }

    if (drawerEl) {
      drawerEl.innerHTML = state.selectedTicket ? renderTicketDrawer(state.selectedTicket) : '';
    }

    if (modalEl) {
      modalEl.innerHTML = renderModals(state);
    }
  }

  // Subscribe to state updates
  state.subscribe(() => {
    renderApp();
  });

  // Global Event Delegation
  document.addEventListener('click', async (e) => {
    // Zoom Out / In Controls
    if (e.target.closest('#btn-zoom-out')) {
      applyZoom(currentZoom - 0.08);
      return;
    }
    if (e.target.closest('#btn-zoom-in')) {
      applyZoom(currentZoom + 0.08);
      return;
    }

    // 1. Navigation items
    const navItem = e.target.closest('[data-nav]');
    if (navItem) {
      e.preventDefault();
      const view = navItem.getAttribute('data-nav');
      state.setView(view);
      return;
    }

    // 2. Theme Toggle
    if (e.target.closest('#btn-theme-toggle')) {
      state.toggleTheme();
      return;
    }

    // 3. Backend status pill / ping / retry handlers
    if (e.target.closest('#btn-retry-live')) {
      showToast(`Pinging ${api.baseUrl}...`, 'info');
      const health = await api.checkHealth();
      if (health.online) {
        showToast(`Connected to backend! Reloading data...`, 'success');
        await loadInitialData();
      } else {
        showToast(`Backend still unreachable at ${api.baseUrl} (${health.error})`, 'error');
      }
      renderApp();
      return;
    }

    if (e.target.closest('#btn-use-mock-fallback')) {
      api.setMode('mock');
      state.setTickets(api.localTickets);
      showToast('Switched to Local Mock Store for testing', 'info');
      renderApp();
      return;
    }

    if (e.target.closest('#btn-backend-settings') || e.target.closest('#btn-hub-ping') || e.target.closest('#btn-test-ping-now')) {
      const res = await api.checkHealth();
      if (res.online) {
        showToast(`Backend connection healthy (${res.elapsed}ms)`, 'success');
      } else {
        showToast(`Backend connection failed to ${api.baseUrl}: ${res.error}`, 'error');
      }
      renderApp();
      return;
    }

    // 4. Refresh Data Button
    if (e.target.closest('#btn-refresh-data')) {
      await loadInitialData();
      return;
    }

    // 5. Open Create Ticket Modal
    if (e.target.closest('#btn-open-create-modal')) {
      state.openModal('create');
      return;
    }

    // 6. Prefill Postman Sample Data
    if (e.target.closest('#btn-prefill-postman') || e.target.closest('#btn-quick-create-sample')) {
      state.openModal('create');
      setTimeout(() => {
        const setVal = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
        setVal('create-customer-id', '1234PANASHE');
        setVal('create-customer-name', 'Panashe Budzinike');
        setVal('create-customer-phone', '0786398208');
        setVal('create-customer-email', 'panashebudzinike@gmail.com');
        setVal('create-channel', 'WHATSAPP');
        setVal('create-priority', 'MEDIUM');
        setVal('create-category', 'APPLICATION');
        setVal('create-subcategory', 'LOGIN_ISSUE');
        setVal('create-subject', 'Unable to access mobile application');
        setVal('create-description', 'I am getting an error when trying to log into the application.');
        setVal('create-device', 'Android (v2.1.0)');
        setVal('create-error-code', 'AUTH-001');
      }, 50);
      return;
    }

    // 7. Close Modals
    if (e.target.closest('.btn-modal-close') || (e.target.classList.contains('modal-overlay') && !e.target.closest('.modal-dialog'))) {
      state.closeModal();
      return;
    }

    // 8. Close Drawer
    if (e.target.closest('#btn-close-drawer') || (e.target.id === 'ticket-drawer-backdrop' && !e.target.closest('.drawer-panel'))) {
      state.clearSelectedTicket();
      return;
    }

    // 9. Copy Ticket ID
    const copyBtn = e.target.closest('.btn-copy-id');
    if (copyBtn) {
      e.stopPropagation();
      const id = copyBtn.getAttribute('data-id');
      navigator.clipboard.writeText(id);
      showToast(`Copied ${id} to clipboard!`, 'success');
      return;
    }

    // 10. View Ticket Details (click row or details button)
    const viewBtn = e.target.closest('.btn-view-ticket');
    const ticketRow = e.target.closest('.ticket-row');
    if (viewBtn || ticketRow) {
      const id = (viewBtn || ticketRow).getAttribute('data-id');
      const ticket = state.tickets ? state.tickets.find(t => t ? (t.ticketId === id || String(t._id) === id) : false) : null;
      if (ticket) {
        state.selectTicket(ticket);
      }
      return;
    }

    // 11. Quick Assign Tech
    const assignQuickBtn = e.target.closest('.btn-assign-quick') || e.target.closest('#drawer-btn-assign');
    if (assignQuickBtn) {
      e.stopPropagation();
      const id = assignQuickBtn.getAttribute('data-id');
      const ticket = state.tickets ? state.tickets.find(t => t ? (t.ticketId === id || String(t._id) === id) : false) : null;
      if (ticket) {
        state.openModal('assign', ticket);
      }
      return;
    }

    // 12. Drawer Edit Priority Button
    const editPriorityBtn = e.target.closest('#drawer-btn-edit-priority');
    if (editPriorityBtn) {
      const id = editPriorityBtn.getAttribute('data-id');
      const ticket = state.tickets ? state.tickets.find(t => t ? (t.ticketId === id || String(t._id) === id) : false) : null;
      if (ticket) {
        state.openModal('edit-priority', ticket);
      }
      return;
    }

    // 13. Drawer Close Ticket Action
    const closeTicketBtn = e.target.closest('#drawer-btn-close-ticket');
    if (closeTicketBtn) {
      const id = closeTicketBtn.getAttribute('data-id');
      if (confirm(`Are you sure you want to CLOSE ticket ${id}?`)) {
        try {
          const res = await api.closeTicket(id, { closedBy: "ADMIN-001" });
          showToast(`Ticket ${id} marked as CLOSED`, 'success');
          await loadInitialData();
        } catch (err) {
          showToast(`Error closing ticket: ${err ? (err.message ? err.message : String(err)) : 'Unknown error'}`, 'error');
        }
      }
      return;
    }

    // 14. Drawer Cancel Ticket Action
    const cancelTicketBtn = e.target.closest('#drawer-btn-cancel-ticket');
    if (cancelTicketBtn) {
      const id = cancelTicketBtn.getAttribute('data-id');
      const ticket = state.tickets ? state.tickets.find(t => t ? (t.ticketId === id || String(t._id) === id) : false) : null;
      if (ticket) {
        state.openModal('cancel', ticket);
      }
      return;
    }

    // 15. Submit Comment in Drawer
    const submitCommentBtn = e.target.closest('#btn-submit-comment');
    if (submitCommentBtn) {
      const id = submitCommentBtn.getAttribute('data-id');
      const input = document.getElementById('drawer-comment-input');
      const text = input ? input.value.trim() : '';
      if (!text) {
        showToast('Please type a comment before sending', 'error');
        return;
      }
      const visEl = document.querySelector('input[name="comment-visibility"]:checked');
      const visibility = visEl ? visEl.value : 'PUBLIC';

      try {
        await api.addComment(id, {
          comment: text,
          createdBy: {
            userId: "ADMIN-001",
            userType: "ADMIN",
            name: "Operations Support Lead"
          },
          visibility
        });
        showToast('Comment recorded to ticket timeline', 'success');
        if (input) input.value = '';
        await loadInitialData();
      } catch (err) {
        showToast(`Failed to add comment: ${err ? (err.message ? err.message : String(err)) : 'Unknown error'}`, 'error');
      }
      return;
    }

    // 16. Submit Create Ticket Modal
    if (e.target.closest('#btn-submit-create-ticket')) {
      const getVal = id => { const el = document.getElementById(id); return el ? el.value.trim() : ''; };
      const custId = getVal('create-customer-id');
      const custName = getVal('create-customer-name');
      const subject = getVal('create-subject');
      const desc = getVal('create-description');

      if (!custId || !custName || !subject || !desc) {
        showToast('Please complete all required fields (Customer, Subject, Description)', 'error');
        return;
      }

      const payload = {
        customer: {
          customerId: custId,
          name: custName,
          phoneNumber: getVal('create-customer-phone'),
          email: getVal('create-customer-email')
        },
        channel: getVal('create-channel') || 'WEB',
        subject: subject,
        description: desc,
        category: getVal('create-category') || 'APPLICATION',
        subcategory: getVal('create-subcategory'),
        priority: getVal('create-priority') || 'MEDIUM',
        metadata: {
          device: getVal('create-device'),
          applicationVersion: '2.1.0',
          errorCode: getVal('create-error-code')
        }
      };

      try {
        const res = await api.createTicket(payload);
        const ticketInfo = res ? (res.ticket ? res.ticket : (res.data ? res.data : res)) : null;
        const newTicketId = ticketInfo ? (ticketInfo.ticketId ? ticketInfo.ticketId : (ticketInfo._id ? String(ticketInfo._id) : 'created')) : 'created';
        showToast(`Ticket ${newTicketId} successfully registered!`, 'success');
        state.closeModal();
        await loadInitialData();
        const extracted = api._extractTickets ? api._extractTickets(ticketInfo) : [ticketInfo];
        if (extracted && extracted.length > 0 && extracted[0]) {
          state.selectTicket(extracted[0]);
        }
      } catch (err) {
        showToast(`Error creating ticket: ${err ? (err.message ? err.message : String(err)) : 'Unknown error'}`, 'error');
      }
      return;
    }

    // 17. Submit Assign Technician Modal
    const submitAssignBtn = e.target.closest('#btn-submit-assign');
    if (submitAssignBtn) {
      const id = submitAssignBtn.getAttribute('data-id');
      const techSelect = document.getElementById('assign-technician-select');
      const assignedByInput = document.getElementById('assign-by-input');
      const techId = techSelect ? techSelect.value : 'TECH-001';
      const tech = (window.PREDEFINED_TECHNICIANS || []).find(t => t.technicianId === techId) || {
        technicianId: techId,
        name: "Technical Support",
        email: "tech@example.com"
      };

      try {
        await api.assignTechnician(id, {
          technician: tech,
          assignedBy: assignedByInput ? assignedByInput.value.trim() : 'ADMIN-001'
        });
        showToast(`Ticket ${id} assigned to ${tech.name}`, 'success');
        state.closeModal();
        await loadInitialData();
      } catch (err) {
        const msg = err ? (err.message ? String(err.message) : String(err)) : 'Unknown error';
        showToast(`Error assigning technician: ${msg}`, 'error');
      }
      return;
    }

    // 18. Submit Edit Priority Modal
    const submitEditPriorityBtn = e.target.closest('#btn-submit-edit-priority');
    if (submitEditPriorityBtn) {
      const id = submitEditPriorityBtn.getAttribute('data-id');
      const prioSelect = document.getElementById('edit-priority-select');
      const descInput = document.getElementById('edit-description-input');

      try {
        await api.updateTicketPriorityAndDescription(id, {
          priority: prioSelect ? prioSelect.value : 'MEDIUM',
          description: descInput ? descInput.value.trim() : ''
        });
        showToast(`Ticket ${id} priority & description updated`, 'success');
        state.closeModal();
        await loadInitialData();
      } catch (err) {
        const msg = err ? (err.message ? String(err.message) : String(err)) : 'Unknown error';
        showToast(`Error updating ticket: ${msg}`, 'error');
      }
      return;
    }

    // 19. Submit Cancel Ticket Modal
    const submitCancelBtn = e.target.closest('#btn-submit-cancel');
    if (submitCancelBtn) {
      const id = submitCancelBtn.getAttribute('data-id');
      const reasonInput = document.getElementById('cancel-reason-input');
      const cancelByInput = document.getElementById('cancel-by-input');
      const reason = reasonInput ? reasonInput.value.trim() : '';

      if (!reason) {
        showToast('Please state a reason for cancellation', 'error');
        return;
      }

      try {
        await api.cancelTicket(id, {
          reason,
          cancelledBy: cancelByInput ? cancelByInput.value.trim() : 'ADMIN-001'
        });
        showToast(`Ticket ${id} has been cancelled`, 'info');
        state.closeModal();
        await loadInitialData();
      } catch (err) {
        const msg = err ? (err.message ? String(err.message) : String(err)) : 'Unknown error';
        showToast(`Error cancelling ticket: ${msg}`, 'error');
      }
      return;
    }

    // 20. Clear Filters Button
    if (e.target.closest('#btn-reset-filters')) {
      state.resetFilters();
      const sInput = document.getElementById('global-search-input');
      if (sInput) sInput.value = '';
      return;
    }

    // 21. Execute Targeted Lookup Query
    if (e.target.closest('#btn-execute-lookup')) {
      const input = document.getElementById('lookup-query-input');
      const query = input ? input.value.trim() : '';
      const resultsContainer = document.getElementById('lookup-results-container');
      if (!query) {
        showToast('Please enter a Ticket ID or Customer ID to search', 'error');
        return;
      }

      resultsContainer.innerHTML = `<div style="text-align:center;padding:30px;">Querying backend...</div>`;
      try {
        let results = [];
        if (query.toUpperCase().startsWith('TKT-')) {
          results = await api.getTicketById(query);
        } else {
          results = await api.getTicketsByCustomerId(query);
          if (!results || results.length === 0) {
            results = await api.getTicketById(query);
          }
        }

        const normalized = api._extractTickets ? api._extractTickets(results) : (Array.isArray(results) ? results : [results]);

        if (!normalized || normalized.length === 0) {
          resultsContainer.innerHTML = `
            <div class="table-card" style="padding:40px;text-align:center;color:var(--text-muted);">
              <h3>No tickets found for "${query}"</h3>
              <p>Verify the identifier and try again.</p>
            </div>
          `;
        } else {
          resultsContainer.innerHTML = `
            <div style="margin-bottom:12px;font-weight:600;color:var(--text-secondary);">
              Found ${normalized.length} record(s):
            </div>
            ${renderTicketTable({ filteredTickets: normalized, filters: state.filters || { status: 'ALL', priority: 'ALL', channel: 'ALL', search: '' } }, null)}
          `;
        }
      } catch (err) {
        resultsContainer.innerHTML = `
          <div class="table-card" style="padding:30px;color:#EF4444;">
            Error querying backend: ${err ? (err.message ? err.message : String(err)) : 'Unknown error'}
          </div>
        `;
      }
      return;
    }

    // 22. API Hub Save URL
    if (e.target.closest('#btn-save-base-url')) {
      const input = document.getElementById('hub-base-url-input');
      if (input) {
        await api.setBaseUrl(input.value);
        showToast(`Base URL updated to ${api.baseUrl}`, 'success');
        state.notify();
      }
      return;
    }

    // 23. API Hub Reset Mock Store
    if (e.target.closest('#btn-reset-mock-data')) {
      if (confirm('Reset ticket store back to initial seed data?')) {
        api.resetMockData();
        await loadInitialData();
        showToast('Mock data store reset to default seed', 'success');
      }
      return;
    }

    // 24. API Hub Individual Endpoint Testers
    const testEp = async (name, fn) => {
      try {
        const res = await fn();
        showToast(`[${name}] executed successfully!`, 'success');
        state.notify();
      } catch (e) {
        showToast(`[${name}] failed: ${e.message}`, 'error');
      }
    };

    if (e.target.closest('#btn-test-ep-create')) {
      testEp('POST create', () => api.createTicket({
        customer: { customerId: "TEST-CUST", name: "Test User", phoneNumber: "0770000000", email: "test@co.zw" },
        channel: "WEB",
        subject: "Diagnostic API Test Ticket",
        description: "Created via API Hub Endpoint Tester",
        category: "APPLICATION",
        priority: "LOW"
      }));
    }
    if (e.target.closest('#btn-test-ep-getall')) {
      testEp('GET getAll', () => api.getAllTickets());
    }
    if (e.target.closest('#btn-test-ep-cust')) {
      testEp('GET by customerId', () => api.getTicketsByCustomerId("1234PANASHE"));
    }
    const getFirstTicketId = () => {
      const first = (state.tickets && state.tickets.length > 0) ? state.tickets[0] : null;
      return first ? (first.ticketId ? first.ticketId : (first._id ? String(first._id) : "TKT-2026-AA37D319")) : "TKT-2026-AA37D319";
    };

    if (e.target.closest('#btn-test-ep-ticket')) {
      testEp('GET by ticketId', () => api.getTicketById(getFirstTicketId()));
    }
    if (e.target.closest('#btn-test-ep-status')) {
      testEp('GET status', () => api.getTicketStatus(getFirstTicketId()));
    }
    if (e.target.closest('#btn-test-ep-patch')) {
      const id = getFirstTicketId();
      if (id) testEp('PATCH ticket', () => api.updateTicketPriorityAndDescription(id, { priority: "HIGH", description: "Updated via API tester" }));
    }
    if (e.target.closest('#btn-test-ep-assign')) {
      const id = getFirstTicketId();
      if (id) testEp('POST assign', () => api.assignTechnician(id, { technician: window.PREDEFINED_TECHNICIANS[0], assignedBy: "ADMIN-001" }));
    }
    if (e.target.closest('#btn-test-ep-patch-status')) {
      const id = getFirstTicketId();
      if (id) testEp('PATCH status', () => api.updateTicketStatus(id, { status: "IN_PROGRESS", updatedBy: "TECH-001" }));
    }
    if (e.target.closest('#btn-test-ep-comment')) {
      const id = getFirstTicketId();
      if (id) testEp('POST comment', () => api.addComment(id, { comment: "Automated test comment", createdBy: { userId: "ADMIN-001", userType: "ADMIN", name: "System" }, visibility: "INTERNAL" }));
    }
    if (e.target.closest('#btn-test-ep-close')) {
      const id = getFirstTicketId();
      if (id) testEp('POST close', () => api.closeTicket(id, { closedBy: "ADMIN-001" }));
    }
    if (e.target.closest('#btn-test-ep-cancel')) {
      const id = getFirstTicketId();
      if (id) testEp('POST cancel', () => api.cancelTicket(id, { cancelledBy: "ADMIN-001", reason: "API Runner cancellation" }));
    }

    // 21. FAQs & Knowledge Base Management Handlers
    if (e.target.closest('#btn-open-add-faq')) {
      state.openModal('faq-add-edit', null);
      return;
    }

    const editFaqBtn = e.target.closest('.btn-edit-faq');
    if (editFaqBtn) {
      const id = editFaqBtn.getAttribute('data-id');
      const faq = (state.faqs || []).find(f => f && (f.faqId === id || String(f._id) === id));
      if (faq) state.openModal('faq-add-edit', faq);
      return;
    }

    const viewFaqProcBtn = e.target.closest('.btn-view-faq-proc');
    if (viewFaqProcBtn) {
      const id = viewFaqProcBtn.getAttribute('data-id');
      const faq = (state.faqs || []).find(f => f && (f.faqId === id || String(f._id) === id));
      if (faq) {
        faq.viewsCount = (Number(faq.viewsCount) || 0) + 1;
        state.openModal('faq-detail', faq);
      }
      return;
    }

    const faqRow = e.target.closest('.faq-table-row');
    if (faqRow && !e.target.closest('button')) {
      const id = faqRow.getAttribute('data-id');
      const faq = (state.faqs || []).find(f => f && (f.faqId === id || String(f._id) === id));
      if (faq) {
        faq.viewsCount = (Number(faq.viewsCount) || 0) + 1;
        state.openModal('faq-detail', faq);
      }
      return;
    }

    const deleteFaqBtn = e.target.closest('.btn-delete-faq');
    if (deleteFaqBtn) {
      const id = deleteFaqBtn.getAttribute('data-id');
      if (confirm(`Are you sure you want to permanently delete FAQ ${id}?`)) {
        try {
          await api.deleteFaq(id);
          state.setFaqs(await api.getAllFaqs());
          showToast(`Deleted FAQ ${id}`, 'info');
        } catch (err) {
          showToast(`Error deleting FAQ: ${err.message}`, 'error');
        }
      }
      return;
    }

    if (e.target.closest('#btn-reset-faqs')) {
      api.resetMockData();
      state.setFaqs(await api.getAllFaqs());
      showToast('Knowledge Base reset to default sample FAQs & procedures!', 'success');
      return;
    }

    const voteFaqBtn = e.target.closest('.btn-vote-faq');
    if (voteFaqBtn) {
      const id = voteFaqBtn.getAttribute('data-id');
      const isUp = voteFaqBtn.getAttribute('data-type') === 'up';
      try {
        await api.voteFaq(id, isUp);
        state.setFaqs(await api.getAllFaqs());
        showToast(isUp ? 'Helpful rating registered 👍' : 'Feedback recorded 👎', 'info');
      } catch (err) {
        console.warn(err);
      }
      return;
    }

    // Dynamic Step adding inside FAQ Modal
    if (e.target.closest('#btn-add-faq-step')) {
      const list = document.getElementById('faq-procedures-list');
      if (list) {
        const stepCards = list.querySelectorAll('.faq-step-card');
        const nextIdx = stepCards.length;
        const newCard = document.createElement('div');
        newCard.className = 'faq-step-card';
        newCard.setAttribute('data-step-index', nextIdx);
        newCard.style.cssText = 'background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:5px;padding:8px;position:relative;';
        newCard.innerHTML = `
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
            <span style="font-weight:700;font-size:0.68rem;color:var(--accent-primary);">
              Step <span class="step-num-label">${nextIdx + 1}</span>
            </span>
            <button type="button" class="btn-remove-faq-step" style="background:none;border:none;color:#EF4444;cursor:pointer;font-size:0.68rem;padding:0;">
              ${icons.trash}
            </button>
          </div>
          <div style="display:flex;gap:6px;margin-bottom:6px;">
            <input type="text" class="form-control step-title-input" placeholder="Step Title (e.g. Verify Credentials)" style="font-size:0.72rem;" required>
          </div>
          <div style="margin-bottom:6px;">
            <textarea class="form-control step-instruction-input" placeholder="Detailed instruction..." style="min-height:44px;font-size:0.7rem;" required></textarea>
          </div>
          <div>
            <input type="text" class="form-control step-tip-input" placeholder="Pro-Tip / Note (Optional)" style="font-size:0.68rem;">
          </div>
        `;
        list.appendChild(newCard);
      }
      return;
    }

    const removeStepBtn = e.target.closest('.btn-remove-faq-step');
    if (removeStepBtn) {
      const card = removeStepBtn.closest('.faq-step-card');
      const list = document.getElementById('faq-procedures-list');
      if (card && list) {
        card.remove();
        list.querySelectorAll('.faq-step-card').forEach((c, idx) => {
          c.setAttribute('data-step-index', idx);
          const lbl = c.querySelector('.step-num-label');
          if (lbl) lbl.textContent = idx + 1;
        });
      }
      return;
    }

    // Submit FAQ Form (Add or Edit)
    if (e.target.closest('#btn-submit-faq')) {
      const editIdEl = document.getElementById('faq-form-edit-id');
      const editId = editIdEl ? editIdEl.value.trim() : '';
      const titleEl = document.getElementById('faq-form-title');
      const title = titleEl ? titleEl.value.trim() : '';

      if (!title) {
        showToast('Please enter an FAQ question / title', 'error');
        return;
      }

      const category = (document.getElementById('faq-form-category') || {}).value || 'APPLICATION';
      const subcategory = (document.getElementById('faq-form-subcategory') || {}).value || '';
      const estimatedTime = (document.getElementById('faq-form-time') || {}).value || '2-3 mins';
      const difficulty = (document.getElementById('faq-form-difficulty') || {}).value || 'Easy';
      const status = (document.getElementById('faq-form-status') || {}).value || 'PUBLISHED';
      const summary = (document.getElementById('faq-form-summary') || {}).value || '';
      const prereqsText = (document.getElementById('faq-form-prereqs') || {}).value || '';
      const prerequisites = prereqsText.split('\n').map(s => s.trim()).filter(Boolean);
      const tagsText = (document.getElementById('faq-form-tags') || {}).value || '';
      const tags = tagsText.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
      const escalationAdvice = (document.getElementById('faq-form-escalation') || {}).value || '';

      const procedures = [];
      const stepCards = document.querySelectorAll('#faq-procedures-list .faq-step-card');
      stepCards.forEach((c, idx) => {
        const sTitle = (c.querySelector('.step-title-input') || {}).value || `Step ${idx + 1}`;
        const sInst = (c.querySelector('.step-instruction-input') || {}).value || 'Follow instructions.';
        const sTip = (c.querySelector('.step-tip-input') || {}).value || '';
        procedures.push({
          step: idx + 1,
          title: sTitle,
          instruction: sInst,
          tip: sTip
        });
      });

      const payload = {
        title,
        category,
        subcategory,
        estimatedTime,
        difficulty,
        status,
        summary,
        tags,
        resolution: {
          overview: summary,
          prerequisites,
          procedures,
          escalationAdvice
        }
      };

      try {
        if (editId) {
          await api.updateFaq(editId, payload);
          showToast(`✓ FAQ ${editId} updated successfully`, 'success');
        } else {
          const res = await api.createFaq(payload);
          showToast(`✓ FAQ ${res.faq ? res.faq.faqId : ''} published successfully!`, 'success');
        }
        state.closeModal();
        state.setFaqs(await api.getAllFaqs());
      } catch (err) {
        showToast(`Error saving FAQ: ${err.message}`, 'error');
      }
      return;
    }
  });

  // Global Change Events (Dropdowns & Selects)
  document.addEventListener('change', async (e) => {
    // Status Filter
    if (e.target.id === 'filter-status') {
      state.setFilter('status', e.target.value);
      return;
    }
    // Priority Filter
    if (e.target.id === 'filter-priority') {
      state.setFilter('priority', e.target.value);
      return;
    }
    // Channel Filter
    if (e.target.id === 'filter-channel') {
      state.setFilter('channel', e.target.value);
      return;
    }
    // Hub Operating Mode
    if (e.target.id === 'hub-mode-select') {
      api.setMode(e.target.value);
      showToast(`API Mode set to ${e.target.value.toUpperCase()}`, 'info');
      return;
    }
    // FAQ Filters
    if (e.target.id === 'faq-category-select') {
      state.setFaqFilter('category', e.target.value);
      return;
    }
    if (e.target.id === 'faq-status-select') {
      state.setFaqFilter('status', e.target.value);
      return;
    }
    // Drawer Quick Status Dropdown
    if (e.target.id === 'drawer-select-status') {
      const id = e.target.getAttribute('data-id');
      const newStatus = e.target.value;
      try {
        await api.updateTicketStatus(id, { status: newStatus, updatedBy: "ADMIN-001" });
        showToast(`Ticket status updated to ${newStatus}`, 'success');
        await loadInitialData();
      } catch (err) {
        const msg = err ? (err.message ? String(err.message) : String(err)) : 'Unknown error';
        showToast(`Failed to update status: ${msg}`, 'error');
      }
      return;
    }
  });

  // Global Input Search Listener (Debounced)
  let searchTimeout = null;
  let faqSearchTimeout = null;
  document.addEventListener('input', (e) => {
    if (e.target.id === 'global-search-input') {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        state.setSearch(e.target.value);
      }, 200);
    }
    if (e.target.id === 'faq-search-input') {
      clearTimeout(faqSearchTimeout);
      faqSearchTimeout = setTimeout(() => {
        state.setFaqSearch(e.target.value);
      }, 200);
    }
  });

  // Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (state.activeModal) {
        state.closeModal();
      } else if (state.selectedTicket) {
        state.clearSelectedTicket();
      }
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const s = document.getElementById('global-search-input');
      if (s) s.focus();
    }
  });

  // Initial load
  await loadInitialData();
  renderApp();
});
