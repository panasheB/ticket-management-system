# 🎫 HelpDesk Enterprise • Ticket Operations Portal

A modern, responsive, and appealing Ticket Management Web Application built for enterprise support teams and company operations. Designed to consume all **10 APIs** defined in `tickets_management.postman_collection.json`.

---

## ✨ Features

- **Left-Side Navigation Bar**:
  - **Company Logo & HelpDesk Emblem**: Modern SVG brand shield with live status telemetry.
  - **Operations Hub**: Instant navigation between Dashboard, All Tickets, Priority Queue, and Unassigned Pool.
  - **Dark & Light Mode Switcher**: Seamless theme switcher with CSS variable system, persisted across sessions in `localStorage`.
  - **Telemetry Badge**: Displays live connection status to `127.0.0.1:3200` with round-trip response time.
  - **Admin Profile**: `ADMIN-001` avatar and active session role.

- **Dashboard & Analytics**:
  - Live KPI cards: Total Tickets, Open Issues, In Progress, Critical Priority, Resolution Rate.
  - Inflow Channel breakdown: WhatsApp Bot, Web Portal, Email, Phone Helpline.
  - Quick action shortcuts for sample ticket generation and queue filters.

- **Ticket Queue & Interactive Data Table**:
  - Status badges (`Open`, `In Progress`, `Resolved`, `Closed`, `Cancelled`).
  - Priority badges (`Critical`, `High`, `Medium`, `Low`).
  - Channel pills (`WhatsApp`, `Web`, `Email`, `Call`).
  - Real-time search filtering across Ticket ID, Customer Name, Phone, Email, Subject, and Error Codes.
  - Quick actions: 1-click Copy Ticket ID, Assign Technician, View Details.

- **Deep-Dive Ticket Detail Drawer**:
  - Slide-in panel with comprehensive ticket data and customer contact details.
  - Direct call / mail links for customer communication.
  - Technical diagnostics card: Device, App Version, and Error Code (e.g. `AUTH-001`).
  - Technician allocation and assignment details.
  - Interactive activity & communication timeline supporting both **Public** customer responses and **Internal Notes**.
  - One-click ticket closure and cancellation workflows.

- **API Hub & Live Inspector**:
  - Base URL strictly configured to: **`http://127.0.0.1:3200/mongo/tickets`** (matching your live backend and Postman collection).
  - Operating Modes: **Strict Live Backend Only** (default) with real HTTP `fetch` requests, plus optional test modes.
  - Live HTTP inspector showing request method, URL, status code, latency, and full request/response bodies.

---

## 🔌 API Mapping (Base URL: `http://127.0.0.1:3200/mongo/tickets`)

| # | HTTP Method | Endpoint Path | Full Live URL | UI Component / Action |
|---|-------------|---------------|---------------|-----------------------|
| 1 | `POST` | `/create` | `http://127.0.0.1:3200/mongo/tickets/create` | **Create Ticket Modal** (Customer, channel, priority, category, metadata) |
| 2 | `GET` | `/getAll` | `http://127.0.0.1:3200/mongo/tickets/getAll` | **All Tickets Table & Dashboard** (Real-time live sync) |
| 3 | `GET` | `/getAll?customerId=:id` | `http://127.0.0.1:3200/mongo/tickets/getAll?customerId=:id` | **Customer Search & Filters** (e.g. `1234PANASHE`) |
| 4 | `GET` | `/getAll?ticketId=:id` | `http://127.0.0.1:3200/mongo/tickets/getAll?ticketId=:id` | **Global Search & Direct Query** (e.g. `TKT-2026-AA37D319`) |
| 5 | `GET` | `/:ticketId/status` | `http://127.0.0.1:3200/mongo/tickets/:ticketId/status` | **Ticket Header Status & Health Check** |
| 6 | `PATCH` | `/:ticketId` | `http://127.0.0.1:3200/mongo/tickets/:ticketId` | **Edit Priority & Description Modal** in Ticket Drawer |
| 7 | `POST` | `/:ticketId/assign` | `http://127.0.0.1:3200/mongo/tickets/:ticketId/assign` | **Assign Technician Modal** (Assign to `TECH-001`, `TECH-002`, etc.) |
| 8 | `PATCH` | `/:ticketId/status` | `http://127.0.0.1:3200/mongo/tickets/:ticketId/status` | **Status Dropdown Selector** in Ticket Drawer |
| 9 | `POST` | `/:ticketId/comments` | `http://127.0.0.1:3200/mongo/tickets/:ticketId/comments` | **Activity & Communication Timeline** (Public & Internal notes) |
| 10 | `POST` | `/:ticketId/close` | `http://127.0.0.1:3200/mongo/tickets/:ticketId/close` | **Close Ticket Action** (`closedBy: "ADMIN-001"`) |
| 11 | `POST` | `/:ticketId/cancel` | `http://127.0.0.1:3200/mongo/tickets/:ticketId/cancel` | **Cancel Ticket Modal** (Requires reason) |

---

## 🚀 Getting Started

### 1. Open the Web Application
You can open `index.html` directly in any web browser, or serve it locally:

```bash
cd /home/rescue-rascal/.gemini/antigravity/scratch/ticket-management-portal
python3 -m http.server 8080
```
Then navigate to: **`http://localhost:8080`**

### 2. Run the Backend Server (Optional)
If your real backend on `127.0.0.1:3200` is already running, the web app connects to it automatically!

If you want to test with the included mock backend server matching all Postman routes:
```bash
cd /home/rescue-rascal/.gemini/antigravity/scratch/ticket-management-portal
node server/mock-backend.js
```
The server will start listening on port `3200` with full CORS enabled.

---

## 🤖 Customer AI Support Bot (`customer.html`)

A mobile-first, responsive, and glassmorphic conversational assistant for end-customers to log and manage support tickets with direct MongoDB integration.

### Core Bot Capabilities
1. **Interactive Options & Guided Controls**:
   - Quick reply option chips for effortless guidance.
   - Dropdown selectors for categories (`Application`, `Billing`, `Network`, `Account`, `Hardware`, `Other`), urgency/priority (`Low`, `Medium`, `High`, `Critical`), and support channels.
   - Embedded interactive cards right inside the chat stream.
2. **Log a New Ticket**:
   - Stepped wizard directly inside the chat.
   - Pre-fills customer identity, contact info, and device diagnostics.
   - Submits to `POST /mongo/tickets/create` and returns an interactive summary card.
3. **Check Ticket Status**:
   - Input any Ticket ID or pick from recent session history chips.
   - Displays a 4-step progress tracker: `Open` ➔ `Assigned` ➔ `Resolved` ➔ `Closed`.
   - Shows assigned engineer, SLA status, and updates count.
4. **Follow-Up & Add Comments**:
   - Add customer responses directly into the ticket stream via `POST /mongo/tickets/:ticketId/comments`.
5. **View Ticket Discussion / Timeline**:
   - View chronological discussion stream with author badges.
6. **Cancel a Ticket**:
   - Provides guided cancellation reason options (`Resolved independently`, `Duplicate issue`, `No longer required`).
   - Dispatches `POST /mongo/tickets/:ticketId/cancel`.
7. **Re-Open a Ticket**:
   - Re-activates closed or cancelled tickets via `PATCH /mongo/tickets/:ticketId/status` and logs an automated customer reopening note.
8. **View My Tickets (Customer History)**:
   - Queries `GET /mongo/tickets/getAll?customerId=:id` and displays an interactive ticket history list.
9. **Out-of-Scope & Exception Handling**:
   - Detects unrelated/unrecognized queries and politely refocuses the customer back into scope with interactive action buttons.
10. **5 Visual Themes**:
   - **🌙 Dark** (Modern obsidian dark mode)
   - **☀️ Light** (Clean iOS/macOS aesthetic)
   - **🌌 Midnight** (Deep navy blue night mode)
   - **🌲 Emerald** (Lush organic teal/green)
   - **🌆 Sunset** (Vibrant cyberpunk purple/magenta)

### Accessing the Bot
- **Dedicated Customer Bot Web App**: [http://127.0.0.1:8080/customer.html](http://127.0.0.1:8080/customer.html)
- **Floating Launcher Widget**: Click the floating circular chat launcher in the bottom-right corner of the Staff Portal at [http://127.0.0.1:8080/index.html](http://127.0.0.1:8080/index.html).

---

## 📚 Knowledge Base & FAQs Management (Self-Service & Staff Portal)

Both the **Customer AI Bot** and the **Operations Portal** now include a complete, synchronized Knowledge Base system with rich mock data and localStorage persistence:

### 🤖 For Customers (AI Bot):
- **Interactive FAQ Explorer**: Instant category filters (`Application`, `Billing`, `Network & VPN`, `Hardware`, `Security & 2FA`) and in-card real-time search.
- **Step-by-Step Resolution Procedures**: Step numbered badges, bold instructions, and highlighted pro-tips.
- **Helpful Rating & 1-Click Ticket Escalation**: Customers can rate whether a procedure resolved their issue. If not, a single click on `"🎟️ Log Ticket"` launches the creation wizard pre-filled with the category and issue description from the FAQ!

### 🛠️ For Service Providers & Staff (Operations Portal):
- **Dedicated Knowledge Base Management Tab**: Navigable from the sidebar with a live article count badge.
- **KPI Metrics**: Total articles, published count, customer views, and customer satisfaction percentage.
- **Full CRUD Management**:
  - View verified resolution procedures in an interactive preview drawer.
  - **Dynamic Step-by-Step Procedure Builder**: Add, remove, and reorder procedure steps with individual titles, instructions, and tips.
  - Publish new FAQs or save as Draft.
  - Edit and delete existing FAQs.
  - Search and filter by category or publication status.
- **Mock Data & Persistence**: Pre-seeded with 8 comprehensive troubleshooting guides (AUTH-001 login error, PAY-DUP-402 billing reversal, VPN drops, barcode scanner HID setup, 2FA reset, etc.), persisted in `localStorage` across portal and bot.

---

## ☁️ Vercel Deployment & Mock / Live Mode Switching

Both the **Staff Operations Portal** and the **Customer AI Bot** are engineered to run as production-ready prototypes on **Vercel** with zero configuration required.

### 3 Operating Modes Available in Bot and Portal:
1. **⚡ Auto Fallback** (*Default for Vercel / Remote Domains*):
   - Attempts to connect to the configured live backend.
   - If the backend is offline, unreachable, or blocked by browser CORS, it **automatically and seamlessly falls back to mock demo data**.
   - Ensures the prototype never crashes or shows blank screens when hosted in the cloud.
2. **📦 Mock Demo Mode**:
   - 100% standalone in-browser simulation using `localStorage`.
   - Creating tickets, status checks, adding comments, cancelling, and reopening work immediately without requiring any local backend server.
3. **🟢 Strict Live API**:
   - Dispatches direct HTTP calls to `http://127.0.0.1:3200/mongo/tickets` (or your custom remote URL).

### How to Switch Modes in the Bot:
- **Dropdown in Bot Header**: Choose between `⚡ Auto Fallback`, `🟢 Live API`, and `📦 Mock Demo`.
- **In-Chat Commands**: Simply type `"switch to mock"`, `"use live backend"`, or `"auto fallback"`.
- **Settings Card**: Type `"settings"` or click the `⚙️` button in the header to change the backend API Base URL, test server ping, or reset the mock store to fresh sample tickets.
- **Automatic Fallback Suggestion**: If you attempt an action in Live API mode and the backend is unreachable, the bot immediately provides an interactive prompt with a 1-click `[📦 Switch to Mock Demo & Retry]` button.

### Deploying to Vercel:
A [`vercel.json`](file:///home/rescue-rascal/.gemini/antigravity/scratch/ticket-management-portal/vercel.json) file is included:
```bash
# Using Vercel CLI:
cd /home/rescue-rascal/.gemini/antigravity/scratch/ticket-management-portal
vercel --prod
```
- Staff Portal: `https://<your-project>.vercel.app/`
- Customer Bot: `https://<your-project>.vercel.app/customer` or `/bot`
