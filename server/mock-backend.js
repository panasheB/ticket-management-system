
const http = require('http');
const url = require('url');

const PORT = process.env.PORT || 3200;

// Seed initial tickets including Postman sample ticket
let tickets = [
  {
    ticketId: "TKT-2026-AA37D319",
    customer: {
      customerId: "1234PANASHE",
      name: "Panashe Budzinike",
      phoneNumber: "0786398208",
      email: "panashebudzinike@gmail.com"
    },
    channel: "WHATSAPP",
    subject: "Unable to access mobile application",
    description: "I am getting an error when trying to log into the application.",
    category: "APPLICATION",
    subcategory: "LOGIN_ISSUE",
    priority: "HIGH",
    status: "IN_PROGRESS",
    metadata: {
      device: "Android",
      applicationVersion: "2.1.0",
      errorCode: "AUTH-001"
    },
    technician: {
      technicianId: "TECH-001",
      name: "Technical Support 01",
      email: "technician@example.com"
    },
    assignedBy: "ADMIN-001",
    assignedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    comments: [
      {
        commentId: "CMT-1001",
        comment: "Ticket registered from WhatsApp bot channel.",
        createdBy: { userId: "BOT-001", userType: "SYSTEM", name: "WhatsApp AI Bot" },
        visibility: "INTERNAL",
        createdAt: new Date(Date.now() - 3600000 * 3).toISOString()
      },
      {
        commentId: "CMT-1002",
        comment: "I have tried restarting the application but the issue persists.",
        createdBy: { userId: "1234PANASHE", userType: "CUSTOMER", name: "Panashe Budzinike" },
        visibility: "PUBLIC",
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
      },
      {
        commentId: "CMT-1003",
        comment: "Investigating OAuth token expiry on Android 14 builds. Cache cleared.",
        createdBy: { userId: "TECH-001", userType: "TECHNICIAN", name: "Technical Support 01" },
        visibility: "PUBLIC",
        createdAt: new Date(Date.now() - 1800000).toISOString()
      }
    ],
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 1800000).toISOString()
  },
  {
    ticketId: "TKT-2026-BC482F10",
    customer: {
      customerId: "12234",
      name: "Tatenda Moyo",
      phoneNumber: "0772114455",
      email: "tatenda.moyo@gmail.com"
    },
    channel: "WEB",
    subject: "Invoice payment debited twice",
    description: "Payment was charged twice on my card for invoice #INV-9902.",
    category: "BILLING",
    subcategory: "PAYMENT_FAILED",
    priority: "CRITICAL",
    status: "OPEN",
    metadata: {
      device: "Chrome / Windows",
      applicationVersion: "Web Portal v3.4",
      errorCode: "PAY-DUP-402"
    },
    technician: null,
    comments: [
      {
        commentId: "CMT-2001",
        comment: "High priority finance flag triggered by amount threshold.",
        createdBy: { userId: "SYSTEM", userType: "SYSTEM", name: "Automated Rules" },
        visibility: "INTERNAL",
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
      }
    ],
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    ticketId: "TKT-2026-F981D02E",
    customer: {
      customerId: "CUS-5089",
      name: "Sharon Zhou",
      phoneNumber: "0719882233",
      email: "sharon.zhou@enterprise.co.zw"
    },
    channel: "EMAIL",
    subject: "VPN gateway connectivity dropped",
    description: "Branch office remote workers are disconnected from core databases.",
    category: "NETWORK",
    subcategory: "CONNECTIVITY",
    priority: "CRITICAL",
    status: "IN_PROGRESS",
    metadata: {
      device: "Cisco AnyConnect",
      applicationVersion: "5.0.2",
      errorCode: "NET-GW-504"
    },
    technician: {
      technicianId: "TECH-002",
      name: "Tafadzwa Chitepo",
      email: "t.chitepo@company.com"
    },
    assignedBy: "ADMIN-001",
    comments: [],
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 1).toISOString()
  },
  {
    ticketId: "TKT-2026-78E41A99",
    customer: {
      customerId: "CUS-7741",
      name: "Kudzai Ndlovu",
      phoneNumber: "0774332211",
      email: "kudzai.ndlovu@outlook.com"
    },
    channel: "CALL",
    subject: "Password reset OTP not arriving",
    description: "Customer called helpline stating SMS OTP is delayed over 20 minutes.",
    category: "ACCOUNT",
    subcategory: "LOGIN_ISSUE",
    priority: "MEDIUM",
    status: "RESOLVED",
    metadata: {
      device: "iPhone 15",
      applicationVersion: "iOS 2.0.8",
      errorCode: "SMS-GW-TIMEOUT"
    },
    technician: {
      technicianId: "TECH-001",
      name: "Technical Support 01",
      email: "technician@example.com"
    },
    assignedBy: "ADMIN-001",
    comments: [
      {
        commentId: "CMT-3001",
        comment: "SMS gateway provider had a temporary queue backlog. Resent manually.",
        createdBy: { userId: "TECH-001", userType: "TECHNICIAN", name: "Technical Support 01" },
        visibility: "PUBLIC",
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
      }
    ],
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    ticketId: "TKT-2026-1188AE04",
    customer: {
      customerId: "CUS-9912",
      name: "Simba Mutasa",
      phoneNumber: "0782334411",
      email: "simba.mutasa@corp.com"
    },
    channel: "WHATSAPP",
    subject: "Printer spooler service offline",
    description: "Receipt printer at terminal 2 is not responding to print jobs.",
    category: "HARDWARE",
    subcategory: "DEVICE_OFFLINE",
    priority: "LOW",
    status: "CLOSED",
    closedBy: "ADMIN-001",
    closedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    metadata: {
      device: "POS Terminal",
      applicationVersion: "Hardware v1.2",
      errorCode: "PRN-ERR-00"
    },
    technician: {
      technicianId: "TECH-003",
      name: "Blessing Rudo",
      email: "b.rudo@company.com"
    },
    comments: [],
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 24).toISOString()
  }
];

function generateTicketId() {
  const hex = Math.random().toString(16).substring(2, 10).toUpperCase();
  return `TKT-2026-${hex}`;
}

// Request Body Parser helper
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        resolve({});
      }
    });
    req.on('error', err => reject(err));
  });
}

// Response helper
function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
  });
  res.end(JSON.stringify(data, null, 2));
}

const server = http.createServer(async (req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
    });
    return res.end();
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;
  const method = req.method;

  console.log(`[${new Date().toLocaleTimeString()}] ${method} ${pathname}`);

  try {
    // 1. POST /mongo/tickets/create
    if (method === 'POST' && pathname === '/mongo/tickets/create') {
      const body = await parseBody(req);
      const newTicket = {
        ticketId: generateTicketId(),
        customer: body.customer || {
          customerId: "CUS-" + Math.floor(1000 + Math.random() * 9000),
          name: "Anonymous User",
          phoneNumber: "",
          email: ""
        },
        channel: body.channel || "WEB",
        subject: body.subject || "Untitled Ticket",
        description: body.description || "",
        category: body.category || "APPLICATION",
        subcategory: body.subcategory || "GENERAL",
        priority: body.priority || "MEDIUM",
        status: "OPEN",
        metadata: body.metadata || {},
        technician: null,
        comments: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      tickets.unshift(newTicket);
      return sendJSON(res, 201, {
        success: true,
        message: "Ticket created successfully",
        ticket: newTicket
      });
    }

    // 2. GET /mongo/tickets/getAll (with optional ?customerId=... or ?ticketId=...)
    if (method === 'GET' && pathname === '/mongo/tickets/getAll') {
      let filtered = [...tickets];
      if (query.customerId) {
        filtered = filtered.filter(t => t.customer && t.customer.customerId === query.customerId);
      }
      if (query.ticketId) {
        filtered = filtered.filter(t => t.ticketId === query.ticketId);
      }
      return sendJSON(res, 200, filtered);
    }

    // 3. GET /mongo/tickets/:ticketId/status
    const statusMatch = pathname.match(/^\/mongo\/tickets\/([^/]+)\/status$/);
    if (method === 'GET' && statusMatch) {
      const ticketId = statusMatch[1];
      const ticket = tickets.find(t => t.ticketId === ticketId);
      if (!ticket) {
        return sendJSON(res, 404, { success: false, message: `Ticket ${ticketId} not found` });
      }
      return sendJSON(res, 200, {
        ticketId: ticket.ticketId,
        status: ticket.status,
        priority: ticket.priority,
        updatedAt: ticket.updatedAt
      });
    }

    // 4. PATCH /mongo/tickets/:ticketId/status (Update status)
    if (method === 'PATCH' && statusMatch) {
      const ticketId = statusMatch[1];
      const body = await parseBody(req);
      const ticket = tickets.find(t => t.ticketId === ticketId);
      if (!ticket) {
        return sendJSON(res, 404, { success: false, message: `Ticket ${ticketId} not found` });
      }
      if (body.status) ticket.status = body.status;
      if (body.updatedBy) ticket.updatedBy = body.updatedBy;
      ticket.updatedAt = new Date().toISOString();
      return sendJSON(res, 200, {
        success: true,
        message: "Ticket status updated",
        ticket
      });
    }

    // 5. POST /mongo/tickets/:ticketId/assign
    const assignMatch = pathname.match(/^\/mongo\/tickets\/([^/]+)\/assign$/);
    if (method === 'POST' && assignMatch) {
      const ticketId = assignMatch[1];
      const body = await parseBody(req);
      const ticket = tickets.find(t => t.ticketId === ticketId);
      if (!ticket) {
        return sendJSON(res, 404, { success: false, message: `Ticket ${ticketId} not found` });
      }
      ticket.technician = body.technician;
      ticket.assignedBy = body.assignedBy || "ADMIN-001";
      ticket.assignedAt = new Date().toISOString();
      if (ticket.status === 'OPEN') {
        ticket.status = 'IN_PROGRESS';
      }
      ticket.updatedAt = new Date().toISOString();
      return sendJSON(res, 200, {
        success: true,
        message: "Ticket assigned to technician successfully",
        ticket
      });
    }

    // 6. POST /mongo/tickets/:ticketId/comments
    const commentMatch = pathname.match(/^\/mongo\/tickets\/([^/]+)\/comments$/);
    if (method === 'POST' && commentMatch) {
      const ticketId = commentMatch[1];
      const body = await parseBody(req);
      const ticket = tickets.find(t => t.ticketId === ticketId);
      if (!ticket) {
        return sendJSON(res, 404, { success: false, message: `Ticket ${ticketId} not found` });
      }
      const newComment = {
        commentId: "CMT-" + Math.floor(1000 + Math.random() * 9000),
        comment: body.comment || "",
        createdBy: body.createdBy || { userId: "ADMIN-001", userType: "ADMIN", name: "System Admin" },
        visibility: body.visibility || "PUBLIC",
        createdAt: new Date().toISOString()
      };
      if (!ticket.comments) ticket.comments = [];
      ticket.comments.push(newComment);
      ticket.updatedAt = new Date().toISOString();
      return sendJSON(res, 201, {
        success: true,
        message: "Comment added successfully",
        comment: newComment,
        ticket
      });
    }

    // 7. POST /mongo/tickets/:ticketId/close
    const closeMatch = pathname.match(/^\/mongo\/tickets\/([^/]+)\/close$/);
    if (method === 'POST' && closeMatch) {
      const ticketId = closeMatch[1];
      const body = await parseBody(req);
      const ticket = tickets.find(t => t.ticketId === ticketId);
      if (!ticket) {
        return sendJSON(res, 404, { success: false, message: `Ticket ${ticketId} not found` });
      }
      ticket.status = "CLOSED";
      ticket.closedBy = body.closedBy || "ADMIN-001";
      ticket.closedAt = new Date().toISOString();
      ticket.updatedAt = new Date().toISOString();
      return sendJSON(res, 200, {
        success: true,
        message: "Ticket closed successfully",
        ticket
      });
    }

    // 8. POST /mongo/tickets/:ticketId/cancel
    const cancelMatch = pathname.match(/^\/mongo\/tickets\/([^/]+)\/cancel$/);
    if (method === 'POST' && cancelMatch) {
      const ticketId = cancelMatch[1];
      const body = await parseBody(req);
      const ticket = tickets.find(t => t.ticketId === ticketId);
      if (!ticket) {
        return sendJSON(res, 404, { success: false, message: `Ticket ${ticketId} not found` });
      }
      ticket.status = "CANCELLED";
      ticket.cancelledBy = body.cancelledBy || "ADMIN-001";
      ticket.cancelledReason = body.reason || "Cancelled by company support";
      ticket.cancelledAt = new Date().toISOString();
      ticket.updatedAt = new Date().toISOString();
      return sendJSON(res, 200, {
        success: true,
        message: "Ticket cancelled successfully",
        ticket
      });
    }

    // 9. PATCH /mongo/tickets/:ticketId (Update priority & description)
    const baseTicketMatch = pathname.match(/^\/mongo\/tickets\/([^/]+)$/);
    if (method === 'PATCH' && baseTicketMatch) {
      const ticketId = baseTicketMatch[1];
      const body = await parseBody(req);
      const ticket = tickets.find(t => t.ticketId === ticketId);
      if (!ticket) {
        return sendJSON(res, 404, { success: false, message: `Ticket ${ticketId} not found` });
      }
      if (body.priority) ticket.priority = body.priority;
      if (body.description) ticket.description = body.description;
      if (body.subject) ticket.subject = body.subject;
      ticket.updatedAt = new Date().toISOString();
      return sendJSON(res, 200, {
        success: true,
        message: "Ticket updated successfully",
        ticket
      });
    }

    // 10. GET /mongo/tickets/:ticketId (Direct fetch)
    if (method === 'GET' && baseTicketMatch) {
      const ticketId = baseTicketMatch[1];
      const ticket = tickets.find(t => t.ticketId === ticketId);
      if (!ticket) {
        return sendJSON(res, 404, { success: false, message: `Ticket ${ticketId} not found` });
      }
      return sendJSON(res, 200, ticket);
    }

    // Healthcheck / ping route
    if (pathname === '/health' || pathname === '/') {
      return sendJSON(res, 200, {
        service: "Tickets Management API",
        status: "UP",
        port: PORT,
        totalTickets: tickets.length,
        version: "1.0.0"
      });
    }

    // 404
    sendJSON(res, 404, { success: false, error: "Route not found", path: pathname });
  } catch (error) {
    console.error("Server Error:", error);
    sendJSON(res, 500, { success: false, error: error.message });
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`====================================================`);
  console.log(`🚀 Tickets Management Backend API listening on port ${PORT}`);
  console.log(`🔗 Base URL: http://127.0.0.1:${PORT}`);
  console.log(`📁 Postman collection routes ready:`);
  console.log(`   POST  /mongo/tickets/create`);
  console.log(`   GET   /mongo/tickets/getAll`);
  console.log(`   GET   /mongo/tickets/getAll?customerId=:id`);
  console.log(`   GET   /mongo/tickets/getAll?ticketId=:id`);
  console.log(`   GET   /mongo/tickets/:ticketId/status`);
  console.log(`   PATCH /mongo/tickets/:ticketId`);
  console.log(`   POST  /mongo/tickets/:ticketId/assign`);
  console.log(`   PATCH /mongo/tickets/:ticketId/status`);
  console.log(`   POST  /mongo/tickets/:ticketId/comments`);
  console.log(`   POST  /mongo/tickets/:ticketId/close`);
  console.log(`   POST  /mongo/tickets/:ticketId/cancel`);
  console.log(`====================================================`);
});
