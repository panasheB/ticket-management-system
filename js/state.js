// Application State Manager for HelpDesk
class AppStateManager {
  constructor() {
    this.currentView = 'dashboard';
    this.tickets = [];
    this.filteredTickets = [];
    this.selectedTicket = null;
    this.isLoading = false;

    // Filters
    this.filters = {
      status: 'ALL',
      priority: 'ALL',
      channel: 'ALL',
      search: ''
    };

    // FAQs and Knowledge Base
    this.faqs = [];
    this.filteredFaqs = [];
    this.selectedFaq = null;
    this.faqFilters = {
      category: 'ALL',
      status: 'ALL',
      search: ''
    };

    // Active Modal
    this.activeModal = null;
    this.modalPayload = null;

    // Theme (defaults to dark mode for sleek modern dev/ops feel)
    this.theme = localStorage.getItem('pulse_theme') || 'dark';

    // Listeners
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.applyFilters();
    this.applyFaqFilters();
    this.listeners.forEach(fn => fn(this));
  }

  setTheme(theme) {
    this.theme = theme;
    localStorage.setItem('pulse_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    this.notify();
  }

  toggleTheme() {
    const nextTheme = this.theme === 'dark' ? 'light' : 'dark';
    this.setTheme(nextTheme);
  }

  setView(view) {
    this.currentView = view;
    // Preset filters according to view
    if (view === 'priority-queue') {
      this.filters.priority = 'CRITICAL';
      this.filters.status = 'ALL';
    } else if (view === 'unassigned-queue') {
      this.filters.status = 'OPEN';
    }
    this.notify();
  }

  setFilter(key, value) {
    this.filters[key] = value;
    this.notify();
  }

  setSearch(query) {
    this.filters.search = query.toLowerCase().trim();
    this.notify();
  }

  resetFilters() {
    this.filters = {
      status: 'ALL',
      priority: 'ALL',
      channel: 'ALL',
      search: ''
    };
    this.notify();
  }

  setTickets(tickets) {
    // Normalize through api._extractTickets if available, so every field is null-safe
    const raw = Array.isArray(tickets) ? tickets
              : (tickets && Array.isArray(tickets.data)) ? tickets.data
              : (tickets && Array.isArray(tickets.tickets)) ? tickets.tickets
              : (tickets && typeof tickets === 'object' ? [tickets] : []);
    this.tickets = (window.apiClient && typeof window.apiClient._extractTickets === 'function')
      ? window.apiClient._extractTickets(raw)
      : raw.filter(t => t && typeof t === 'object');

    // If a ticket is currently selected, refresh its reference safely using ternary checks
    if (this.selectedTicket) {
      const selId = this.selectedTicket ? (this.selectedTicket.ticketId ? this.selectedTicket.ticketId : (this.selectedTicket._id ? String(this.selectedTicket._id) : null)) : null;
      const refreshed = (selId && this.tickets) ? this.tickets.find(t => t ? (t.ticketId === selId || String(t._id) === selId) : false) : null;
      if (refreshed) this.selectedTicket = refreshed;
    }
    this.notify();
  }

  selectTicket(ticket) {
    if (!ticket) {
      this.selectedTicket = null;
    } else {
      const normalized = (window.apiClient && typeof window.apiClient._extractTickets === 'function')
        ? window.apiClient._extractTickets(ticket)
        : [ticket];
      this.selectedTicket = (normalized && normalized.length > 0) ? normalized[0] : ticket;
    }
    this.notify();
  }

  clearSelectedTicket() {
    this.selectedTicket = null;
    this.notify();
  }

  openModal(modalName, payload = null) {
    this.activeModal = modalName;
    this.modalPayload = payload;
    this.notify();
  }

  closeModal() {
    this.activeModal = null;
    this.modalPayload = null;
    this.notify();
  }

  applyFilters() {
    let result = Array.isArray(this.tickets) ? [...this.tickets] : [];

    // Filter out any null or non-object records
    result = result.filter(t => t && typeof t === 'object');

    // Priority filter
    if (this.filters.priority !== 'ALL') {
      if (this.filters.priority === 'CRITICAL_HIGH') {
        result = result.filter(t => t ? (t.priority === 'CRITICAL' || t.priority === 'HIGH') : false);
      } else {
        result = result.filter(t => t ? (t.priority === this.filters.priority) : false);
      }
    }

    // Status filter
    if (this.filters.status !== 'ALL') {
      result = result.filter(t => t ? (t.status === this.filters.status) : false);
    }

    // Channel filter
    if (this.filters.channel !== 'ALL') {
      result = result.filter(t => t ? (t.channel === this.filters.channel) : false);
    }

    // Special View filters
    if (this.currentView === 'unassigned-queue') {
      result = result.filter(t => t ? !t.technician : false);
    } else if (this.currentView === 'priority-queue') {
      result = result.filter(t => t ? (t.priority === 'CRITICAL' || t.priority === 'HIGH') : false);
    }

    // Search query matching ticketId, customer name/email/phone, subject, description, errorCode
    if (this.filters.search) {
      const q = String(this.filters.search).toLowerCase();
      result = result.filter(t => {
        if (!t) return false;
        const ticketIdMatch = t.ticketId ? String(t.ticketId).toLowerCase().includes(q) : false;
        const subjectMatch = t.subject ? String(t.subject).toLowerCase().includes(q) : false;
        const descMatch = t.description ? String(t.description).toLowerCase().includes(q) : false;
        const custNameMatch = (t.customer && t.customer.name) ? String(t.customer.name).toLowerCase().includes(q) : false;
        const custIdMatch = (t.customer && t.customer.customerId) ? String(t.customer.customerId).toLowerCase().includes(q) : false;
        const custEmailMatch = (t.customer && t.customer.email) ? String(t.customer.email).toLowerCase().includes(q) : false;
        const custPhoneMatch = (t.customer && t.customer.phoneNumber) ? String(t.customer.phoneNumber).includes(q) : false;
        const errorCodeMatch = (t.metadata && t.metadata.errorCode) ? String(t.metadata.errorCode).toLowerCase().includes(q) : false;
        return ticketIdMatch || subjectMatch || descMatch || custNameMatch || custIdMatch || custEmailMatch || custPhoneMatch || errorCodeMatch;
      });
    }

    this.filteredTickets = result;
  }

  getMetrics() {
    const list = Array.isArray(this.tickets) ? this.tickets.filter(t => t && typeof t === 'object') : [];
    const total = list.length;
    const open = list.filter(t => t ? t.status === 'OPEN' : false).length;
    const inProgress = list.filter(t => t ? (t.status === 'IN_PROGRESS' || t.status === 'ASSIGNED') : false).length;
    const resolved = list.filter(t => t ? t.status === 'RESOLVED' : false).length;
    const closed = list.filter(t => t ? t.status === 'CLOSED' : false).length;
    const cancelled = list.filter(t => t ? t.status === 'CANCELLED' : false).length;
    const critical = list.filter(t => t ? t.priority === 'CRITICAL' : false).length;
    const high = list.filter(t => t ? t.priority === 'HIGH' : false).length;
    const unassigned = list.filter(t => t ? (!t.technician && t.status !== 'CLOSED' && t.status !== 'CANCELLED') : false).length;

    // Channel counts
    const channels = {
      WHATSAPP: list.filter(t => t ? t.channel === 'WHATSAPP' : false).length,
      WEB: list.filter(t => t ? t.channel === 'WEB' : false).length,
      EMAIL: list.filter(t => t ? t.channel === 'EMAIL' : false).length,
      CALL: list.filter(t => t ? t.channel === 'CALL' : false).length
    };

    return {
      total,
      open,
      inProgress,
      resolved,
      closed,
      cancelled,
      critical,
      high,
      unassigned,
      channels,
      resolutionRate: total > 0 ? Math.round(((resolved + closed) / total) * 100) : 0
    };
  }

  // =========================================================================
  // FAQ & Knowledge Base State Handlers
  // =========================================================================
  setFaqs(faqs) {
    this.faqs = Array.isArray(faqs) ? faqs.filter(f => f && typeof f === 'object') : [];
    if (this.selectedFaq) {
      const id = this.selectedFaq.faqId || String(this.selectedFaq._id);
      const refreshed = this.faqs.find(f => f && (f.faqId === id || String(f._id) === id));
      if (refreshed) this.selectedFaq = refreshed;
    }
    this.notify();
  }

  selectFaq(faq) {
    this.selectedFaq = faq || null;
    this.notify();
  }

  clearSelectedFaq() {
    this.selectedFaq = null;
    this.notify();
  }

  setFaqFilter(key, value) {
    this.faqFilters[key] = value;
    this.notify();
  }

  setFaqSearch(query) {
    this.faqFilters.search = String(query || '').toLowerCase().trim();
    this.notify();
  }

  applyFaqFilters() {
    let list = Array.isArray(this.faqs) ? [...this.faqs] : [];
    list = list.filter(f => f && typeof f === 'object');

    if (this.faqFilters.category && this.faqFilters.category !== 'ALL') {
      list = list.filter(f => f.category === this.faqFilters.category);
    }

    if (this.faqFilters.status && this.faqFilters.status !== 'ALL') {
      list = list.filter(f => f.status === this.faqFilters.status);
    }

    if (this.faqFilters.search) {
      const q = this.faqFilters.search.toLowerCase();
      list = list.filter(f => {
        const titleMatch = f.title ? f.title.toLowerCase().includes(q) : false;
        const summaryMatch = f.summary ? f.summary.toLowerCase().includes(q) : false;
        const subcatMatch = f.subcategory ? f.subcategory.toLowerCase().includes(q) : false;
        const tagMatch = Array.isArray(f.tags) ? f.tags.some(t => String(t).toLowerCase().includes(q)) : false;
        const procMatch = (f.resolution && Array.isArray(f.resolution.procedures))
          ? f.resolution.procedures.some(p => (p.title && p.title.toLowerCase().includes(q)) || (p.instruction && p.instruction.toLowerCase().includes(q)))
          : false;
        return titleMatch || summaryMatch || subcatMatch || tagMatch || procMatch;
      });
    }

    this.filteredFaqs = list;
  }

  getFaqMetrics() {
    const list = Array.isArray(this.faqs) ? this.faqs : [];
    const total = list.length;
    const published = list.filter(f => f.status === 'PUBLISHED').length;
    const draft = list.filter(f => f.status === 'DRAFT').length;
    const totalViews = list.reduce((acc, f) => acc + (Number(f.viewsCount) || 0), 0);
    const totalHelpful = list.reduce((acc, f) => acc + (Number(f.helpfulCount) || 0), 0);
    const totalNotHelpful = list.reduce((acc, f) => acc + (Number(f.notHelpfulCount) || 0), 0);
    const totalVotes = totalHelpful + totalNotHelpful;
    const satisfactionRate = totalVotes > 0 ? Math.round((totalHelpful / totalVotes) * 100) : 95;

    return {
      total,
      published,
      draft,
      totalViews,
      totalHelpful,
      totalNotHelpful,
      satisfactionRate
    };
  }
}

window.appState = new AppStateManager();
