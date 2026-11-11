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

// Comprehensive Predefined FAQs & Step-by-Step Resolution Procedures
window.SEED_FAQS = [
  {
    faqId: "FAQ-2026-001",
    title: "How to fix mobile application login error (AUTH-001)?",
    category: "APPLICATION",
    subcategory: "LOGIN_ISSUE",
    summary: "Authentication session expired or cached OAuth refresh token is out of sync with the security cluster.",
    estimatedTime: "2-3 mins",
    difficulty: "Easy",
    status: "PUBLISHED",
    viewsCount: 142,
    helpfulCount: 39,
    notHelpfulCount: 2,
    tags: ["login", "mobile", "auth-001", "android", "iphone", "cache"],
    lastUpdated: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    author: {
      userId: "ADMIN-001",
      name: "Operations Lead"
    },
    resolution: {
      overview: "Error code AUTH-001 indicates that local biometric or token tokens in local application storage cannot be validated against the authentication server.",
      prerequisites: [
        "Verify your device has a stable internet connection (Wi-Fi or 4G/5G).",
        "Make sure you remember your account email or registered mobile number."
      ],
      procedures: [
        {
          step: 1,
          title: "Clear App Cache & Temporary Data",
          instruction: "On Android, navigate to **Settings > Apps > HelpDesk App > Storage**, then tap **Clear Cache**. On iOS, force-close the app from the App Switcher.",
          tip: "Do NOT select 'Clear Data' unless you want all offline drafts wiped."
        },
        {
          step: 2,
          title: "Sync Device Date & Time Automatically",
          instruction: "Go to device system settings and turn ON **'Set Time Automatically'** (Network-provided time). Mismatched device clocks reject SSL certificates and OAuth tokens.",
          tip: "A time difference of more than 90 seconds will consistently trigger AUTH-001."
        },
        {
          step: 3,
          title: "Update Application to Latest Release",
          instruction: "Open Google Play Store or Apple App Store and confirm you are running version **2.1.2** or newer.",
          tip: "Version 2.1.0 and older had an unpatched OAuth session bug on Android 14."
        },
        {
          step: 4,
          title: "Initiate Password / Session Token Reset",
          instruction: "Open the app, select 'Trouble Logging In?', enter your phone number, and type the 6-digit verification code sent via SMS or WhatsApp.",
          tip: "Allow 60 seconds before requesting a secondary verification code."
        }
      ],
      relatedLinks: [
        { label: "Download Latest Mobile App Version", url: "#" },
        { label: "Account Security & Credentials Policy", url: "#" }
      ],
      escalationAdvice: "If AUTH-001 continues after Step 4, your account profile may be locked by security policies. Submit a ticket so our L2 engineers can release the session lock."
    }
  },
  {
    faqId: "FAQ-2026-002",
    title: "Double billing / duplicate charge on checkout (PAY-DUP-402)",
    category: "BILLING",
    subcategory: "PAYMENT_FAILED",
    summary: "Concurrent checkout submission or network timeout resulted in a duplicate payment hold on your account.",
    estimatedTime: "1-2 mins",
    difficulty: "Easy",
    status: "PUBLISHED",
    viewsCount: 98,
    helpfulCount: 27,
    notHelpfulCount: 1,
    tags: ["billing", "duplicate", "refund", "invoice", "pay-dup-402", "checkout"],
    lastUpdated: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
    author: {
      userId: "TECH-001",
      name: "Technical Support 01"
    },
    resolution: {
      overview: "When double-clicking checkout or encountering a network timeout during card authorization, our automated payment gateway may place a temporary duplicate pre-authorization hold.",
      prerequisites: [
        "Locate your invoice number or bank transaction reference ID.",
        "Ensure at least 15 minutes have passed since the transaction."
      ],
      procedures: [
        {
          step: 1,
          title: "Check Automatic Void Status in Billing History",
          instruction: "Navigate to **Billing & Invoices** in your portal. Check if the duplicate charge displays as 'VOIDED' or 'PENDING REVERSAL'. Our payment engine automatically voids duplicate holds within 60 minutes.",
          tip: "Most duplicate authorizations drop off your card automatically without manual intervention."
        },
        {
          step: 2,
          title: "Capture the Duplicate Transaction Reference",
          instruction: "Note down both transaction numbers (e.g. TX-9844A and TX-9844B) and the exact timestamps from your bank SMS or banking app statement.",
          tip: "Having both references speeds up technician manual reversal by 80%."
        },
        {
          step: 3,
          title: "Verify You Received Only One License Key",
          instruction: "Check your email inbox to confirm only a single license confirmation email was delivered for the transaction.",
          tip: "If two keys were issued, support can either refund or credit the second key to your next renewal."
        }
      ],
      relatedLinks: [
        { label: "View Invoice & Payment History", url: "#" },
        { label: "Refund & Payment Settlement Policy", url: "#" }
      ],
      escalationAdvice: "If the duplicate hold does not revert within 24 hours, click 'Log a Ticket' below. Select category 'BILLING' and provide the transaction reference for an immediate manual refund."
    }
  },
  {
    faqId: "FAQ-2026-003",
    title: "VPN Gateway connection drops / SSL-VPN timeout",
    category: "NETWORK",
    subcategory: "VPN_ACCESS",
    summary: "Corporate VPN tunnel disconnects intermittently or fails handshake on port 443/1194.",
    estimatedTime: "3-5 mins",
    difficulty: "Moderate",
    status: "PUBLISHED",
    viewsCount: 185,
    helpfulCount: 52,
    notHelpfulCount: 4,
    tags: ["vpn", "network", "remote", "ssl-vpn", "gateway", "tunnel"],
    lastUpdated: new Date(Date.now() - 3600000 * 24 * 1).toISOString(),
    author: {
      userId: "TECH-002",
      name: "Tafadzwa Chitepo"
    },
    resolution: {
      overview: "Remote SSL-VPN drops occur due to MTU size packet fragmentation, firewall inspection timeouts, or outdated client certificate bundles.",
      prerequisites: [
        "Administrative access to your workstation (Windows, macOS, or Linux).",
        "Your company network credentials and active MFA token."
      ],
      procedures: [
        {
          step: 1,
          title: "Switch to TCP Mode / Adjust Gateway MTU",
          instruction: "In the VPN client settings, change the protocol from **UDP 1194** to **TCP 443** (fallback port). Lower your MTU clamp value to **1350** to prevent packet fragmentation across residential ISPs.",
          tip: "TCP 443 easily traverses strict hotel, airport, and mobile hotspot firewalls."
        },
        {
          step: 2,
          title: "Flush Local DNS & Reset Network Adapter",
          instruction: "Open Terminal or Command Prompt as Administrator and run:\n- Windows: `ipconfig /flushdns` then `netsh winsock reset`\n- macOS: `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`",
          tip: "Restart your machine after running the winsock reset command."
        },
        {
          step: 3,
          title: "Update Corporate SSL Client Certificate",
          instruction: "Launch the VPN Client > Preferences > Certificates > Click **'Check for Updated Client Cert'**. If expired, re-download the certificate profile from the intranet portal.",
          tip: "Certificates auto-expire every 180 days per cybersecurity guidelines."
        }
      ],
      relatedLinks: [
        { label: "Regional VPN Gateway Status Map", url: "#" },
        { label: "Download Latest VPN Client Profile (.ovpn)", url: "#" }
      ],
      escalationAdvice: "If connectivity still fails, contact your network engineer with your public IP address so your subnet can be verified in the gateway access control list."
    }
  },
  {
    faqId: "FAQ-2026-004",
    title: "How to cancel or modify subscription auto-renewal?",
    category: "BILLING",
    subcategory: "CANCELLATION",
    summary: "Procedures to switch billing intervals, pause renewals, or cancel services before next invoice cycle.",
    estimatedTime: "1-2 mins",
    difficulty: "Easy",
    status: "PUBLISHED",
    viewsCount: 76,
    helpfulCount: 22,
    notHelpfulCount: 0,
    tags: ["billing", "cancel", "subscription", "renewal", "plan"],
    lastUpdated: new Date(Date.now() - 3600000 * 24 * 7).toISOString(),
    author: {
      userId: "ADMIN-001",
      name: "Operations Lead"
    },
    resolution: {
      overview: "You can modify subscription tiers, downgrade plans, or disable automatic credit card renewal at any time up to 24 hours before your next billing cycle.",
      prerequisites: [
        "Must be logged in as the primary billing owner or organization administrator."
      ],
      procedures: [
        {
          step: 1,
          title: "Access Subscription Settings",
          instruction: "Go to **Account Settings > Plans & Subscriptions**. Here you will see your active plan, seats, and next renewal date.",
          tip: "You retain full feature access until the end of the paid billing period."
        },
        {
          step: 2,
          title: "Toggle Off Auto-Renew",
          instruction: "Click **'Manage Subscription'**, then select **'Turn Off Auto-Renewal'**. Choose your reason from the dropdown and confirm the prompt.",
          tip: "You will receive an instant email confirmation with your cancellation reference ID."
        },
        {
          step: 3,
          title: "Export Your Data & Audit Logs",
          instruction: "Before your plan period concludes, navigate to **Reports > Export Data (CSV / JSON)** to save all your ticket history and metrics.",
          tip: "Data is archived for 90 days after cancellation before permanent deletion."
        }
      ],
      relatedLinks: [
        { label: "Compare Subscription Tiers", url: "#" },
        { label: "Data Retention & Archival Policy", url: "#" }
      ],
      escalationAdvice: "For custom enterprise agreements or VAT tax invoice adjustments, submit a ticket under category 'BILLING' with subcategory 'CANCELLATION'."
    }
  },
  {
    faqId: "FAQ-2026-005",
    title: "High memory usage / slow response on desktop portal",
    category: "APPLICATION",
    subcategory: "PERFORMANCE",
    summary: "High browser RAM consumption or lag when loading large ticket queues with thousands of records.",
    estimatedTime: "2 mins",
    difficulty: "Easy",
    status: "PUBLISHED",
    viewsCount: 110,
    helpfulCount: 31,
    notHelpfulCount: 1,
    tags: ["performance", "speed", "memory", "browser", "chrome", "zoom"],
    lastUpdated: new Date(Date.now() - 3600000 * 24 * 4).toISOString(),
    author: {
      userId: "TECH-004",
      name: "Farai Mataranyika"
    },
    resolution: {
      overview: "When rendering hundreds of live telemetry points, hardware acceleration and browser memory cache may become overloaded on older workstations.",
      prerequisites: [
        "Google Chrome, Microsoft Edge, or Mozilla Firefox updated to latest release."
      ],
      procedures: [
        {
          step: 1,
          title: "Enable Hardware Acceleration",
          instruction: "In Chrome/Edge settings, search for 'Hardware Acceleration' and toggle **'Use graphics acceleration when available'** to ON, then restart your browser.",
          tip: "This offloads UI table animations from the CPU directly to your GPU."
        },
        {
          step: 2,
          title: "Adjust Display Density / Zoom",
          instruction: "Click the **Zoom - / +** buttons on the top right header to set scale to **80% or 75%** (High-Density View). This reduces viewport DOM paint costs.",
          tip: "The high-density view renders up to 50% faster on multi-monitor setups."
        },
        {
          step: 3,
          title: "Purge Service Worker & Local Storage Cache",
          instruction: "Press **Ctrl + Shift + R** (or **Cmd + Shift + R** on Mac) for a hard reload. You can also reset demo cache via Settings > Reset Store.",
          tip: "Clearing stale client cache frees up to 120MB of browser memory immediately."
        }
      ],
      relatedLinks: [
        { label: "System Requirements & Supported Browsers", url: "#" }
      ],
      escalationAdvice: "If memory leaks persist on specific enterprise machines, open a ticket so our application engineers can analyze your workstation console logs."
    }
  },
  {
    faqId: "FAQ-2026-006",
    title: "Hardware peripheral / barcode scanner not responding",
    category: "HARDWARE",
    subcategory: "PERIPHERAL_DEVICE",
    summary: "USB/Bluetooth POS scanner does not send keystrokes or input text into ticket fields.",
    estimatedTime: "3-4 mins",
    difficulty: "Moderate",
    status: "PUBLISHED",
    viewsCount: 64,
    helpfulCount: 19,
    notHelpfulCount: 2,
    tags: ["hardware", "scanner", "barcode", "usb", "terminal", "pos"],
    lastUpdated: new Date(Date.now() - 3600000 * 24 * 6).toISOString(),
    author: {
      userId: "TECH-003",
      name: "Blessing Rudo"
    },
    resolution: {
      overview: "Barcode scanners operating in Virtual COM or Serial mode will not input data into web textboxes without Keyboard Emulation (HID POS) mode enabled.",
      prerequisites: [
        "Scanner programming barcode manual or manufacturer reference sheet.",
        "Direct USB port connection (avoid unpowered USB hubs)."
      ],
      procedures: [
        {
          step: 1,
          title: "Switch Scanner to USB HID Keyboard Emulation Mode",
          instruction: "Scan the configuration barcode labeled **'USB Keyboard (HID)'** from the scanner manual. Listen for the triple confirmation beep.",
          tip: "Do NOT use 'USB Virtual COM' mode unless a specialized driver is running."
        },
        {
          step: 2,
          title: "Configure Enter / Carriage Return Suffix",
          instruction: "Scan the **'Add CR/LF Suffix'** (Enter key) programming barcode. This ensures the scanner automatically submits inputs into the search field.",
          tip: "Without a carriage return suffix, scanned IDs remain uncommitted in the search box."
        },
        {
          step: 3,
          title: "Test Input in Notepad / Text Editor",
          instruction: "Open a plain Notepad window and scan a sample ticket barcode. If the number prints cleanly, the hardware is functional and ready for the web portal.",
          tip: "If text does not appear in Notepad, try a different USB port on the back of the computer."
        }
      ],
      relatedLinks: [
        { label: "Supported Hardware Peripherals List", url: "#" }
      ],
      escalationAdvice: "If the scanner hardware LED is red or flashing erratically, log a ticket under category 'HARDWARE' for replacement dispatch."
    }
  },
  {
    faqId: "FAQ-2026-007",
    title: "WhatsApp & email support notifications not delivering",
    category: "APPLICATION",
    subcategory: "NOTIFICATIONS",
    summary: "Customers or technicians not receiving status update alerts or bot confirmations.",
    estimatedTime: "2 mins",
    difficulty: "Easy",
    status: "PUBLISHED",
    viewsCount: 122,
    helpfulCount: 35,
    notHelpfulCount: 1,
    tags: ["whatsapp", "email", "notifications", "alerts", "bot", "sms"],
    lastUpdated: new Date(Date.now() - 3600000 * 24 * 3).toISOString(),
    author: {
      userId: "ADMIN-001",
      name: "Operations Lead"
    },
    resolution: {
      overview: "Notification delivery delays usually stem from spam filters, WhatsApp 24-hour customer service window restrictions, or phone number formatting.",
      prerequisites: [
        "Valid international phone number with country code (e.g. +263...).",
        "Access to customer email spam / junk folder."
      ],
      procedures: [
        {
          step: 1,
          title: "Verify Phone Number International Formatting",
          instruction: "Confirm phone numbers start with country dial code (e.g., `+263786398208` or standard local format `0786398208`). Strip out any accidental spaces or parentheses.",
          tip: "WhatsApp API rejects phone numbers containing hyphens or symbols."
        },
        {
          step: 2,
          title: "Whitelist Support Email Sender Domain",
          instruction: "Add `no-reply@helpdesk.co.zw` to your email contact list and check the **Junk / Spam / Promotions** folder.",
          tip: "Click 'Report as Not Spam' if found in promotional tabs."
        },
        {
          step: 3,
          title: "Re-initiate Bot Conversation on WhatsApp",
          instruction: "Send any message (e.g., 'Hi' or 'Status') to the official HelpDesk WhatsApp bot number to re-open the Meta 24-hour messaging window.",
          tip: "Meta limits automated business messages once the 24-hour customer inquiry window expires."
        }
      ],
      relatedLinks: [
        { label: "Notification Channels & Webhook Health", url: "#" }
      ],
      escalationAdvice: "If notification failures affect all users, check the API Hub in the portal to verify third-party gateway health."
    }
  },
  {
    faqId: "FAQ-2026-008",
    title: "Two-Factor Authentication (2FA) reset procedures",
    category: "SECURITY",
    subcategory: "ACCOUNT_ACCESS",
    summary: "Lost authenticator app or phone replacement preventing portal login.",
    estimatedTime: "3-4 mins",
    difficulty: "Moderate",
    status: "PUBLISHED",
    viewsCount: 88,
    helpfulCount: 26,
    notHelpfulCount: 1,
    tags: ["security", "2fa", "mfa", "authenticator", "otp", "reset"],
    lastUpdated: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    author: {
      userId: "ADMIN-001",
      name: "Operations Lead"
    },
    resolution: {
      overview: "When replacing mobile devices or losing Google Authenticator keys, emergency backup codes or manager approval are required to reset 2FA.",
      prerequisites: [
        "Emergency recovery codes generated during original 2FA setup.",
        "Access to registered organization email account."
      ],
      procedures: [
        {
          step: 1,
          title: "Use One-Time Emergency Backup Recovery Code",
          instruction: "On the 2FA prompt, click **'Try another way' > 'Enter Emergency Backup Code'**. Paste one of your 8-digit alphanumeric codes saved during enrollment.",
          tip: "Each emergency code can only be used once."
        },
        {
          step: 2,
          title: "Re-enroll New Authenticator Device",
          instruction: "Once logged in, go directly to **User Profile > Security > Reset 2FA**. Scan the new QR code using Google Authenticator, Microsoft Authenticator, or 1Password.",
          tip: "Remember to download a fresh batch of emergency codes."
        },
        {
          step: 3,
          title: "Supervisor Identity Verification (If No Codes Available)",
          instruction: "If all recovery codes are lost, your designated team manager must initiate a 2FA revocation from the Operations Portal Admin panel.",
          tip: "Identity verification takes approximately 15 minutes during operating hours."
        }
      ],
      relatedLinks: [
        { label: "Organization 2FA Security Guidelines", url: "#" }
      ],
      escalationAdvice: "If locked out with urgent priority, submit a high-priority ticket with your employee ID number for supervisor identity verification."
    }
  }
];
