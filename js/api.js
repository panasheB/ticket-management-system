// API Client for Tickets Man

class TicketApiClient {
  constructor() {
    const CORRECT_BASE_URL = 'http://127.0.0.1:3200/mongo/tickets';
    const savedBaseUrl = localStorage.getItem('helpdesk_api_base_url') || localStorage.getItem('pulse_api_base_url');
    this.baseUrl = (savedBaseUrl && !savedBaseUrl.includes('/mongo/tickets/mongo/tickets')) ? savedBaseUrl : CORRECT_BASE_URL;
    localStorage.setItem('helpdesk_api_base_url', this.baseUrl);
    localStorage.setItem('pulse_api_base_url', this.baseUrl);

    this.cleanBaseUrl = (url) => {
      let u = (url || CORRECT_BASE_URL).trim().replace(/\/+$/, '');
      if (!/^https?:\/\//i.test(u)) u = 'http://' + u;
      // If user typed just the host/port without the path, add it
      if (!u.includes('/mongo/tickets')) u = `${u}/mongo/tickets`;
      // If user typed the full correct URL, strip any accidental duplicates
      u = u.replace(/\/mongo\/tickets(\/mongo\/tickets)+/, '/mongo/tickets');
      return u;
    };

    // Auto-detect environment: if running on Vercel / non-localhost, default to 'auto' so prototype works out-of-the-box!
    const isLocalhost = typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || !window.location.hostname);
    const savedMode = localStorage.getItem('helpdesk_api_mode') || localStorage.getItem('pulse_api_mode');
    this.mode = (savedMode === 'mock' || savedMode === 'auto' || savedMode === 'real') ? savedMode : (isLocalhost ? 'real' : 'auto');
    localStorage.setItem('helpdesk_api_mode', this.mode);
    localStorage.setItem('pulse_api_mode', this.mode);

    this.logs = [];
    this.maxLogs = 40;
    this.isBackendAlive = false;

    // Initialize local fallback/demo store from SEED_TICKETS if available
    const savedTickets = localStorage.getItem('pulse_local_tickets');
    if (!savedTickets) {
      this.localTickets = JSON.parse(JSON.stringify(window.SEED_TICKETS || []));
      this._saveLocal();
    } else {
      try {
        this.localTickets = JSON.parse(savedTickets);
      } catch (e) {
        this.localTickets = JSON.parse(JSON.stringify(window.SEED_TICKETS || []));
      }
    }

    // Initial health check
    this.checkHealth();
  }

  setBaseUrl(url) {
    this.baseUrl = this.cleanBaseUrl(url);
    localStorage.setItem('helpdesk_api_base_url', this.baseUrl);
    localStorage.setItem('pulse_api_base_url', this.baseUrl);
    return this.checkHealth();
  }

  setMode(mode) {
    this.mode = mode;
    localStorage.setItem('helpdesk_api_mode', this.mode);
    localStorage.setItem('pulse_api_mode', this.mode);
    this._updateStatusBadge(this.isBackendAlive, this.mode === 'real' ? 'Live API' : (this.mode === 'mock' ? 'Mock Mode' : 'Auto Mode'));
    if (window.onApiModeChange) {
      try { window.onApiModeChange(this.mode); } catch (e) {}
    }
  }

  _buildUrl(endpoint) {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${this.baseUrl}${cleanEndpoint}`;
  }

  _saveLocal() {
    localStorage.setItem('pulse_local_tickets', JSON.stringify(this.localTickets));
  }

  _log(entry) {
    this.logs.unshift({
      id: 'REQ-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      timestamp: new Date().toLocaleTimeString(),
      ...entry
    });
    if (this.logs.length > this.maxLogs) {
      this.logs.pop();
    }
    if (window.onApiLogUpdate) {
      window.onApiLogUpdate(this.logs);
    }
  }

  async checkHealth() {
    const startTime = performance.now();
    const testUrl = this._buildUrl('/getAll');
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch(testUrl, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      const elapsed = Math.round(performance.now() - startTime);

      if (res && res.ok) {
        this.isBackendAlive = true;
        this._updateStatusBadge(true, `Live API (${elapsed}ms)`);
        return { online: true, elapsed };
      } else {
        throw new Error(`HTTP ${res ? res.status : 'ERR'}`);
      }
    } catch (err) {
      this.isBackendAlive = false;
      this._updateStatusBadge(false, this.mode === 'mock' ? 'Mock Engine' : 'Offline (127.0.0.1:3200)');
      return { online: false, error: err.message };
    }
  }

  _updateStatusBadge(online, text) {
    if (typeof document === 'undefined' || typeof document.getElementById !== 'function') return;

    // 1. Staff portal indicators
    const dot = document.getElementById('backend-status-dot');
    const label = document.getElementById('backend-status-label');
    if (dot && label) {
      dot.className = 'status-indicator-dot ' + (this.mode === 'mock' ? 'mock' : (online ? '' : 'warning'));
      const urlDisplay = this.baseUrl.replace(/^https?:\/\//, '');
      const modePrefix = this.mode === 'mock' ? 'Mock Mode' : (this.mode === 'auto' ? (online ? 'Live API (Auto)' : 'Mock Fallback') : (online ? 'Live API' : 'Backend Offline'));
      label.textContent = `${text || modePrefix}: ${urlDisplay}`;
    }

    // 2. Customer Bot indicators
    const botDot = document.getElementById('bot-status-indicator');
    if (botDot) {
      botDot.className = 'bot-online-indicator ' + (this.mode === 'mock' ? 'mock' : (online ? 'online' : (this.mode === 'auto' ? 'auto' : 'offline')));
      botDot.title = `Mode: ${this.mode.toUpperCase()} • ${this.baseUrl}`;
    }

    const bannerDot = document.getElementById('banner-status-dot');
    const bannerMode = document.getElementById('banner-mode-pill');
    const bannerApi = document.getElementById('banner-api-label');
    if (bannerDot) {
      bannerDot.className = 'dot ' + (this.mode === 'mock' ? 'mock' : (online ? 'online' : (this.mode === 'auto' ? 'auto' : 'offline')));
    }
    if (bannerMode) {
      bannerMode.textContent = this.mode.toUpperCase();
      bannerMode.style.background = this.mode === 'mock' ? '#F59E0B' : (this.mode === 'auto' ? '#8B5CF6' : (online ? '#10B981' : '#EF4444'));
      bannerMode.style.color = '#FFFFFF';
    }
    if (bannerApi) {
      bannerApi.textContent = `API: ${this.baseUrl.replace(/^https?:\/\//, '')}`;
    }

    const stripLabel = document.getElementById('strip-mode-label');
    if (stripLabel) {
      stripLabel.textContent = this.mode === 'real' ? 'Mode: Live' : (this.mode === 'mock' ? 'Mode: Mock' : 'Mode: Auto');
    }

    const botModeSelect = document.getElementById('bot-mode-select');
    if (botModeSelect && botModeSelect.value !== this.mode) {
      botModeSelect.value = this.mode;
    }
  }

  // Robustly extract tickets array from various response formats
  // Handles: plain array, { data:[] }, { tickets:[] }, { result:[] }, single object
  _extractTickets(data) {
    if (!data) return [];
    let list = [];
    if (Array.isArray(data)) {
      list = data;
    } else if (data && Array.isArray(data.data)) {
      list = data.data;
    } else if (data && Array.isArray(data.tickets)) {
      list = data.tickets;
    } else if (data && Array.isArray(data.result)) {
      list = data.result;
    } else if (data && Array.isArray(data.results)) {
      list = data.results;
    } else if (data && data.data && Array.isArray(data.data.tickets)) {
      list = data.data.tickets;
    } else if (data && data.data && typeof data.data === 'object') {
      list = [data.data];
    } else if (data && typeof data === 'object') {
      if (data.ticket && typeof data.ticket === 'object') {
        list = [data.ticket];
      } else if (data.ticketId || data._id) {
        list = [data];
      } else {
        const anyArr = Object.values(data).find(v => Array.isArray(v));
        list = anyArr ? anyArr : [data];
      }
    }

    return (Array.isArray(list) ? list : [])
      .filter(t => t && typeof t === 'object')
      .map(t => {
        // Customer extraction with safe ternary fallbacks
        const custObj = (t.customer && typeof t.customer === 'object') ? t.customer : null;
        const custStr = typeof t.customer === 'string' ? t.customer : null;

        const customer = custObj ? {
          customerId: custObj.customerId ? String(custObj.customerId) : (custObj._id ? String(custObj._id) : (t.customerId ? String(t.customerId) : '—')),
          name: custObj.name ? String(custObj.name) : (custObj.customerName ? String(custObj.customerName) : (t.customerName ? String(t.customerName) : 'Unknown Customer')),
          phoneNumber: custObj.phoneNumber ? String(custObj.phoneNumber) : (custObj.phone ? String(custObj.phone) : (t.phoneNumber ? String(t.phoneNumber) : '')),
          email: custObj.email ? String(custObj.email) : (t.email ? String(t.email) : '')
        } : {
          customerId: t.customerId ? String(t.customerId) : '—',
          name: custStr ? custStr : (t.customerName ? String(t.customerName) : 'Unknown Customer'),
          phoneNumber: t.phoneNumber ? String(t.phoneNumber) : '',
          email: t.email ? String(t.email) : ''
        };

        // Technician extraction with safe ternary fallbacks
        const techObj = (t.technician && typeof t.technician === 'object') ? t.technician : null;
        const techStr = typeof t.technician === 'string' ? t.technician : (t.assignedTo ? String(t.assignedTo) : null);

        const technician = techObj ? {
          technicianId: techObj.technicianId ? String(techObj.technicianId) : (techObj._id ? String(techObj._id) : 'TECH-001'),
          name: techObj.name ? String(techObj.name) : 'Technician',
          email: techObj.email ? String(techObj.email) : ''
        } : (techStr ? {
          technicianId: 'TECH-001',
          name: techStr,
          email: ''
        } : null);

        // Metadata safe extraction
        const metaObj = (t.metadata && typeof t.metadata === 'object') ? t.metadata : {};

        // Comments safe extraction
        const comments = Array.isArray(t.comments) ? t.comments.filter(c => c && typeof c === 'object').map(c => {
          const byObj = (c.createdBy && typeof c.createdBy === 'object') ? c.createdBy : null;
          const byStr = typeof c.createdBy === 'string' ? c.createdBy : null;
          return {
            commentId: c.commentId ? String(c.commentId) : 'CMT-' + Math.floor(1000 + Math.random() * 9000),
            comment: c.comment ? String(c.comment) : '',
            createdBy: byObj ? {
              userId: byObj.userId ? String(byObj.userId) : '',
              userType: byObj.userType ? String(byObj.userType) : 'STAFF',
              name: byObj.name ? String(byObj.name) : 'Staff'
            } : {
              userId: '',
              userType: 'STAFF',
              name: byStr ? byStr : 'Staff'
            },
            visibility: c.visibility ? String(c.visibility) : 'PUBLIC',
            createdAt: c.createdAt ? String(c.createdAt) : new Date().toISOString()
          };
        }) : [];

        return {
          ticketId: t.ticketId ? String(t.ticketId) : (t._id ? String(t._id) : (t.id ? String(t.id) : ('TKT-' + Math.random().toString(16).substring(2, 10).toUpperCase()))),
          customer,
          channel: t.channel ? String(t.channel).toUpperCase() : 'WEB',
          subject: t.subject ? String(t.subject) : (t.title ? String(t.title) : '(No Subject)'),
          description: t.description ? String(t.description) : (t.details ? String(t.details) : ''),
          category: t.category ? String(t.category).toUpperCase() : 'APPLICATION',
          subcategory: t.subcategory ? String(t.subcategory) : '',
          priority: t.priority ? String(t.priority).toUpperCase() : 'MEDIUM',
          status: t.status ? String(t.status).toUpperCase() : 'OPEN',
          technician,
          metadata: {
            device: metaObj.device ? String(metaObj.device) : '',
            applicationVersion: metaObj.applicationVersion ? String(metaObj.applicationVersion) : '',
            errorCode: metaObj.errorCode ? String(metaObj.errorCode) : ''
          },
          comments,
          assignedBy: t.assignedBy ? String(t.assignedBy) : '',
          assignedAt: t.assignedAt ? String(t.assignedAt) : null,
          closedBy: t.closedBy ? String(t.closedBy) : '',
          closedAt: t.closedAt ? String(t.closedAt) : null,
          cancelledBy: t.cancelledBy ? String(t.cancelledBy) : '',
          cancelledReason: t.cancelledReason ? String(t.cancelledReason) : (t.reason ? String(t.reason) : ''),
          cancelledAt: t.cancelledAt ? String(t.cancelledAt) : null,
          createdAt: t.createdAt ? String(t.createdAt) : new Date().toISOString(),
          updatedAt: t.updatedAt ? String(t.updatedAt) : new Date().toISOString()
        };
      });
  }

  async _request(endpoint, options = {}, mockHandler) {
    const method = options.method || 'GET';
    const fullUrl = this._buildUrl(endpoint);
    const startTime = performance.now();
    const reqBody = options.body ? JSON.parse(options.body) : null;

    // If explicitly set to mock mode
    if (this.mode === 'mock') {
      const result = await mockHandler();
      const elapsed = Math.round(performance.now() - startTime);
      this._log({
        method,
        url: fullUrl,
        mode: 'MOCK',
        status: 200,
        timeMs: elapsed,
        requestBody: reqBody,
        response: result
      });
      return result;
    }

    // Live API Call
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const reqHeaders = {
        'Accept': 'application/json',
        ...(options.headers || {})
      };
      if (options.body) {
        reqHeaders['Content-Type'] = 'application/json';
      }

      const response = await fetch(fullUrl, {
        ...options,
        mode: 'cors',
        headers: reqHeaders,
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      const elapsed = Math.round(performance.now() - startTime);

      let data;
      const text = await response.text();
      try {
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        data = { raw: text };
      }

      this.isBackendAlive = true;
      this._updateStatusBadge(true, `Live API (${elapsed}ms)`);

      this._log({
        method,
        url: fullUrl,
        mode: 'LIVE',
        status: response.status,
        timeMs: elapsed,
        requestBody: reqBody,
        response: data
      });

      if (!response.ok) {
        const errorMsg = data ? (data.message ? data.message : (data.error ? data.error : `HTTP ${response.status} from ${fullUrl}`)) : `HTTP ${response.status} from ${fullUrl}`;
        throw new Error(errorMsg);
      }

      // Sync local tickets when mutating successfully
      if (['POST', 'PATCH', 'PUT', 'DELETE'].includes(method)) {
        this._syncLocalAfterMutation(endpoint, method, reqBody, data);
      }

      return data;
    } catch (networkError) {
      const elapsed = Math.round(performance.now() - startTime);

      // Detect CORS errors specifically — with safe null checks
      const rawErrMsg = networkError ? (networkError.message ? String(networkError.message) : String(networkError)) : 'Network request failed';
      const isCorsError = rawErrMsg.includes('Failed to fetch')
        || rawErrMsg.includes('NetworkError')
        || rawErrMsg.includes('fetch');

      const friendlyError = isCorsError
        ? `CORS blocked: Your backend at ${fullUrl} needs to send "Access-Control-Allow-Origin: *" header. ` +
          `Postman skips CORS but browsers enforce it. Add CORS middleware to your Express/Node backend.`
        : `Connection failed to ${fullUrl}: ${rawErrMsg}`;

      // Auto mode allows seamless fallback
      if (this.mode === 'auto') {
        this.isBackendAlive = false;
        this._updateStatusBadge(false, 'Offline (Mock Active)');

        console.warn(`[API] Live backend at ${fullUrl} unreachable (${rawErrMsg}). Falling back to local store.`);
        const mockResult = await mockHandler();

        this._log({
          method,
          url: fullUrl,
          mode: 'MOCK_FALLBACK',
          status: 200,
          timeMs: elapsed,
          requestBody: reqBody,
          response: mockResult,
          note: isCorsError ? 'CORS blocked — backend must send CORS headers' : `Live call failed: ${rawErrMsg}`
        });

        return mockResult;
      } else {
        // Strict real mode: propagate exact network error
        this.isBackendAlive = false;
        this._updateStatusBadge(false, 'Offline: 127.0.0.1:3200');

        this._log({
          method,
          url: fullUrl,
          mode: 'LIVE_FAILED',
          status: 'ERR',
          timeMs: elapsed,
          requestBody: reqBody,
          response: { error: friendlyError }
        });

        throw new Error(friendlyError);
      }
    }
  }

  _syncLocalAfterMutation(endpoint, method, reqBody, data) {
    try {
      if (endpoint === '/create' && data) {
        const rawNew = data.ticket ? data.ticket : (data.data ? data.data : (data.ticketId ? data : null));
        if (rawNew) {
          const extracted = this._extractTickets(rawNew);
          if (extracted && extracted.length > 0) {
            this.localTickets.unshift(extracted[0]);
            this._saveLocal();
          }
        }
      }
    } catch (e) {
      console.warn("Local sync notice:", e);
    }
  }

  // =========================================================================
  // 1. POST /mongo/tickets/create
  // =========================================================================
  async createTicket(ticketData) {
    return this._request(
      '/create',
      {
        method: 'POST',
        body: JSON.stringify(ticketData)
      },
      async () => {
        const hex = Math.random().toString(16).substring(2, 10).toUpperCase();
        const newTicket = {
          ticketId: `TKT-2026-${hex}`,
          customer: ticketData ? (ticketData.customer ? ticketData.customer : {
            customerId: "CUS-" + Math.floor(1000 + Math.random() * 9000),
            name: "Customer",
            phoneNumber: "",
            email: ""
          }) : { customerId: "CUS-001", name: "Customer", phoneNumber: "", email: "" },
          channel: ticketData && ticketData.channel ? ticketData.channel : "WEB",
          subject: ticketData && ticketData.subject ? ticketData.subject : "Untitled Issue",
          description: ticketData && ticketData.description ? ticketData.description : "",
          category: ticketData && ticketData.category ? ticketData.category : "APPLICATION",
          subcategory: ticketData && ticketData.subcategory ? ticketData.subcategory : "GENERAL",
          priority: ticketData && ticketData.priority ? ticketData.priority : "MEDIUM",
          status: "OPEN",
          metadata: ticketData && ticketData.metadata ? ticketData.metadata : {},
          technician: null,
          comments: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        this.localTickets.unshift(newTicket);
        this._saveLocal();
        return {
          success: true,
          message: "Ticket created successfully",
          ticket: newTicket
        };
      }
    );
  }

  // =========================================================================
  // 2. GET /mongo/tickets/getAll
  // =========================================================================
  async getAllTickets() {
    const raw = await this._request(
      '/getAll',
      { method: 'GET' },
      async () => {
        return this.localTickets ? [...this.localTickets] : [];
      }
    );
    return this._extractTickets(raw);
  }

  // =========================================================================
  // 3. GET /mongo/tickets/getAll?customerId=:customerId
  // =========================================================================
  async getTicketsByCustomerId(customerId) {
    const raw = await this._request(
      `/getAll?customerId=${encodeURIComponent(customerId)}`,
      { method: 'GET' },
      async () => {
        return this.localTickets ? this.localTickets.filter(t => t && t.customer ? (t.customer.customerId === customerId || String(t.customer) === customerId) : false) : [];
      }
    );
    return this._extractTickets(raw);
  }

  // =========================================================================
  // 4. GET /mongo/tickets/getAll?ticketId=:ticketId
  // =========================================================================
  async getTicketById(ticketId) {
    const raw = await this._request(
      `/getAll?ticketId=${encodeURIComponent(ticketId)}`,
      { method: 'GET' },
      async () => {
        const found = this.localTickets ? this.localTickets.find(t => t ? (t.ticketId === ticketId || t._id === ticketId) : false) : null;
        return found ? [found] : [];
      }
    );
    return this._extractTickets(raw);
  }

  // =========================================================================
  // 5. GET /mongo/tickets/:ticketId/status
  // =========================================================================
  async getTicketStatus(ticketId) {
    return this._request(
      `/${encodeURIComponent(ticketId)}/status`,
      { method: 'GET' },
      async () => {
        const found = this.localTickets ? this.localTickets.find(t => t ? (t.ticketId === ticketId || t._id === ticketId) : false) : null;
        if (!found) throw new Error(`Ticket ${ticketId} not found`);
        return {
          ticketId: found.ticketId ? found.ticketId : ticketId,
          status: found.status ? found.status : 'OPEN',
          priority: found.priority ? found.priority : 'MEDIUM',
          updatedAt: found.updatedAt ? found.updatedAt : new Date().toISOString()
        };
      }
    );
  }

  // =========================================================================
  // 6. PATCH /mongo/tickets/:ticketId (Priority & Description update)
  // =========================================================================
  async updateTicketPriorityAndDescription(ticketId, { priority, description }) {
    return this._request(
      `/${encodeURIComponent(ticketId)}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ priority, description })
      },
      async () => {
        const ticket = this.localTickets ? this.localTickets.find(t => t ? (t.ticketId === ticketId || t._id === ticketId) : false) : null;
        if (!ticket) throw new Error(`Ticket ${ticketId} not found`);
        if (priority) ticket.priority = priority;
        if (description) ticket.description = description;
        ticket.updatedAt = new Date().toISOString();
        this._saveLocal();
        return {
          success: true,
          message: "Ticket updated successfully",
          ticket
        };
      }
    );
  }

  // =========================================================================
  // 7. POST /mongo/tickets/:ticketId/assign (Assign Technician)
  // =========================================================================
  async assignTechnician(ticketId, { technician, assignedBy }) {
    return this._request(
      `/${encodeURIComponent(ticketId)}/assign`,
      {
        method: 'POST',
        body: JSON.stringify({ technician, assignedBy })
      },
      async () => {
        const ticket = this.localTickets ? this.localTickets.find(t => t ? (t.ticketId === ticketId || t._id === ticketId) : false) : null;
        if (!ticket) throw new Error(`Ticket ${ticketId} not found`);
        ticket.technician = technician;
        ticket.assignedBy = assignedBy || "ADMIN-001";
        ticket.assignedAt = new Date().toISOString();
        if (ticket.status === 'OPEN') {
          ticket.status = 'IN_PROGRESS';
        }
        ticket.updatedAt = new Date().toISOString();
        this._saveLocal();
        return {
          success: true,
          message: "Ticket assigned to technician successfully",
          ticket
        };
      }
    );
  }

  // =========================================================================
  // 8. PATCH /mongo/tickets/:ticketId/status (Status update)
  // =========================================================================
  async updateTicketStatus(ticketId, { status, updatedBy }) {
    return this._request(
      `/${encodeURIComponent(ticketId)}/status`,
      {
        method: 'PATCH',
        body: JSON.stringify({ status, updatedBy })
      },
      async () => {
        const ticket = this.localTickets ? this.localTickets.find(t => t ? (t.ticketId === ticketId || t._id === ticketId) : false) : null;
        if (!ticket) throw new Error(`Ticket ${ticketId} not found`);
        ticket.status = status;
        ticket.updatedBy = updatedBy || "ADMIN-001";
        ticket.updatedAt = new Date().toISOString();
        this._saveLocal();
        return {
          success: true,
          message: "Ticket status updated",
          ticket
        };
      }
    );
  }

  // =========================================================================
  // 9. POST /mongo/tickets/:ticketId/comments (Add Comment)
  // =========================================================================
  async addComment(ticketId, { comment, createdBy, visibility }) {
    return this._request(
      `/${encodeURIComponent(ticketId)}/comments`,
      {
        method: 'POST',
        body: JSON.stringify({ comment, createdBy, visibility })
      },
      async () => {
        const ticket = this.localTickets ? this.localTickets.find(t => t ? (t.ticketId === ticketId || t._id === ticketId) : false) : null;
        if (!ticket) throw new Error(`Ticket ${ticketId} not found`);
        const newComment = {
          commentId: "CMT-" + Math.floor(1000 + Math.random() * 9000),
          comment,
          createdBy: createdBy || { userId: "ADMIN-001", userType: "ADMIN", name: "System Admin" },
          visibility: visibility || "PUBLIC",
          createdAt: new Date().toISOString()
        };
        if (!ticket.comments) ticket.comments = [];
        ticket.comments.push(newComment);
        ticket.updatedAt = new Date().toISOString();
        this._saveLocal();
        return {
          success: true,
          message: "Comment added successfully",
          comment: newComment,
          ticket
        };
      }
    );
  }

  // =========================================================================
  // 10. POST /mongo/tickets/:ticketId/close (Close Ticket)
  // =========================================================================
  async closeTicket(ticketId, { closedBy }) {
    return this._request(
      `/${encodeURIComponent(ticketId)}/close`,
      {
        method: 'POST',
        body: JSON.stringify({ closedBy })
      },
      async () => {
        const ticket = this.localTickets ? this.localTickets.find(t => t ? (t.ticketId === ticketId || t._id === ticketId) : false) : null;
        if (!ticket) throw new Error(`Ticket ${ticketId} not found`);
        ticket.status = "CLOSED";
        ticket.closedBy = closedBy || "ADMIN-001";
        ticket.closedAt = new Date().toISOString();
        ticket.updatedAt = new Date().toISOString();
        this._saveLocal();
        return {
          success: true,
          message: "Ticket closed successfully",
          ticket
        };
      }
    );
  }

  // =========================================================================
  // 11. POST /mongo/tickets/:ticketId/cancel (Cancel Ticket)
  // =========================================================================
  async cancelTicket(ticketId, { cancelledBy, reason }) {
    return this._request(
      `/${encodeURIComponent(ticketId)}/cancel`,
      {
        method: 'POST',
        body: JSON.stringify({ cancelledBy, reason })
      },
      async () => {
        const ticket = this.localTickets ? this.localTickets.find(t => t ? (t.ticketId === ticketId || t._id === ticketId) : false) : null;
        if (!ticket) throw new Error(`Ticket ${ticketId} not found`);
        ticket.status = "CANCELLED";
        ticket.cancelledBy = cancelledBy || "ADMIN-001";
        ticket.cancelledReason = reason || "Resolved independently";
        ticket.cancelledAt = new Date().toISOString();
        ticket.updatedAt = new Date().toISOString();
        this._saveLocal();
        return {
          success: true,
          message: "Ticket cancelled successfully",
          ticket
        };
      }
    );
  }

  // Reset store helper
  resetMockData() {
    this.localTickets = JSON.parse(JSON.stringify(window.SEED_TICKETS || []));
    this._saveLocal();
  }
}

window.apiClient = new TicketApiClient();
