// Initial Seed Tickets matching Postman Collection schema
window.SEED_TICKETS = [
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
    description: "I am getting an error when trying to log into the application after updating to latest version.",
    category: "APPLICATION",
    subcategory: "LOGIN_ISSUE",
    priority: "HIGH",
    status: "IN_PROGRESS",
    metadata: {
      device: "Android 14 (Samsung S23)",
      applicationVersion: "2.1.0",
      errorCode: "AUTH-001"
    },
    technician: {
      technicianId: "TECH-001",
      name: "Technical Support 01",
      email: "technician@example.com"
    },
    assignedBy: "ADMIN-001",
    assignedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    comments: [
      {
        commentId: "CMT-1001",
        comment: "Ticket auto-ingested via WhatsApp Support AI Bot.",
        createdBy: { userId: "BOT-001", userType: "SYSTEM", name: "WhatsApp Bot" },
        visibility: "INTERNAL",
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
      },
      {
        commentId: "CMT-1002",
        comment: "I have tried restarting the application and reinstalling, but the issue persists with code AUTH-001.",
        createdBy: { userId: "1234PANASHE", userType: "CUSTOMER", name: "Panashe Budzinike" },
        visibility: "PUBLIC",
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
      },
      {
        commentId: "CMT-1003",
        comment: "Reviewed OAuth session refresh token. Re-authorizing account token from server cache.",
        createdBy: { userId: "TECH-001", userType: "TECHNICIAN", name: "Technical Support 01" },
        visibility: "PUBLIC",
        createdAt: new Date(Date.now() - 1800000).toISOString()
      }
    ],
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
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
    subject: "Invoice payment debited twice on checkout",
    description: "Transaction #TX-9844 deducted the annual license fee twice. Need immediate refund on second charge.",
    category: "BILLING",
    subcategory: "PAYMENT_FAILED",
    priority: "CRITICAL",
    status: "OPEN",
    metadata: {
      device: "Desktop Chrome 124",
      applicationVersion: "Enterprise Web 3.4",
      errorCode: "PAY-DUP-402"
    },
    technician: null,
    comments: [
      {
        commentId: "CMT-2001",
        comment: "Payment gateway webhook indicates concurrent checkout requests.",
        createdBy: { userId: "SYS-ALERT", userType: "SYSTEM", name: "Billing Engine" },
        visibility: "INTERNAL",
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
      }
    ],
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString()
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
    subject: "VPN gateway connectivity dropped for regional team",
    description: "Remote operations team cannot reach corporate file shares through SSL-VPN gateway.",
    category: "NETWORK",
    subcategory: "CONNECTIVITY",
    priority: "CRITICAL",
    status: "IN_PROGRESS",
    metadata: {
      device: "Cisco AnyConnect / Fortinet",
      applicationVersion: "5.0.2",
      errorCode: "NET-GW-504"
    },
    technician: {
      technicianId: "TECH-002",
      name: "Tafadzwa Chitepo",
      email: "t.chitepo@company.com"
    },
    assignedBy: "ADMIN-001",
    assignedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    comments: [
      {
        commentId: "CMT-3001",
        comment: "Failover interface on cluster 2 switched successfully; checking DNS propagation.",
        createdBy: { userId: "TECH-002", userType: "TECHNICIAN", name: "Tafadzwa Chitepo" },
        visibility: "INTERNAL",
        createdAt: new Date(Date.now() - 1200000).toISOString()
      }
    ],
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 1200000).toISOString()
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
    subject: "SMS two-factor verification OTP delayed",
    description: "User unable to sign into customer account because verification SMS takes more than 15 minutes to arrive.",
    category: "ACCOUNT",
    subcategory: "LOGIN_ISSUE",
    priority: "MEDIUM",
    status: "RESOLVED",
    metadata: {
      device: "Apple iPhone 15 Pro",
      applicationVersion: "iOS 2.0.8",
      errorCode: "SMS-GW-TIMEOUT"
    },
    technician: {
      technicianId: "TECH-001",
      name: "Technical Support 01",
      email: "technician@example.com"
    },
    assignedBy: "ADMIN-001",
    assignedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    comments: [
      {
        commentId: "CMT-4001",
        comment: "Telco SMS aggregator resolved congestion. Manually issued backup OTP to verified phone.",
        createdBy: { userId: "TECH-001", userType: "TECHNICIAN", name: "Technical Support 01" },
        visibility: "PUBLIC",
        createdAt: new Date(Date.now() - 3600000 * 1).toISOString()
      }
    ],
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 1).toISOString()
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
    subject: "Receipt printer spooler service offline",
    description: "Thermal printer at POS register #3 is showing offline in warehouse dispatch.",
    category: "HARDWARE",
    subcategory: "DEVICE_OFFLINE",
    priority: "LOW",
    status: "CLOSED",
    closedBy: "ADMIN-001",
    closedAt: new Date(Date.now() - 3600000 * 14).toISOString(),
    metadata: {
      device: "Epson TM-T88VI",
      applicationVersion: "Firmware v4.2",
      errorCode: "PRN-ERR-00"
    },
    technician: {
      technicianId: "TECH-003",
      name: "Blessing Rudo",
      email: "b.rudo@company.com"
    },
    assignedBy: "ADMIN-001",
    comments: [
      {
        commentId: "CMT-5001",
        comment: "USB cable replaced and Windows spooler service restarted. Verified test print.",
        createdBy: { userId: "TECH-003", userType: "TECHNICIAN", name: "Blessing Rudo" },
        visibility: "PUBLIC",
        createdAt: new Date(Date.now() - 3600000 * 14).toISOString()
      }
    ],
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 14).toISOString()
  },
  {
    ticketId: "TKT-2026-44B9E117",
    customer: {
      customerId: "CUS-3022",
      name: "Grace Mpofu",
      phoneNumber: "0771990088",
      email: "grace.mpofu@techmail.com"
    },
    channel: "WEB",
    subject: "Cancelled subscription auto-renewal request",
    description: "Customer requested cancellation of quarterly plan before upcoming billing cycle.",
    category: "BILLING",
    subcategory: "CANCELLATION",
    priority: "LOW",
    status: "CANCELLED",
    cancelledBy: "CUS-3022",
    cancelledReason: "Customer opted for monthly custom billing plan instead.",
    cancelledAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    metadata: {
      device: "MacBook Air / Safari",
      applicationVersion: "Web v3.4",
      errorCode: "N/A"
    },
    technician: null,
    comments: [],
    createdAt: new Date(Date.now() - 3600000 * 30).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 18).toISOString()
  }
];

window.PREDEFINED_TECHNICIANS = [
  {
    technicianId: "TECH-001",
    name: "Technical Support 01",
    email: "technician@example.com",
    role: "L2 Support Specialist"
  },
  {
    technicianId: "TECH-002",
    name: "Tafadzwa Chitepo",
    email: "t.chitepo@company.com",
    role: "Senior Network Engineer"
  },
  {
    technicianId: "TECH-003",
    name: "Blessing Rudo",
    email: "b.rudo@company.com",
    role: "Hardware & Infrastructure Lead"
  },
  {
    technicianId: "TECH-004",
    name: "Farai Mataranyika",
    email: "farai.m@company.com",
    role: "Applications & Core API Engineer"
  }
];
