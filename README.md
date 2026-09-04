<div align="center">

  <a href="https://www.idexi.tech" target="_blank" rel="noopener noreferrer">
    <img src="./public/logo-white-horizontal.png" alt="idexi Logo" width="260" />
  </a>

  <br />
  <br />

  <h1>idexi — Intelligent Event Solutions</h1>

  <p align="center">
    Digital ticketing, smart gate check-in, and instant attendee photo delivery.
  </p>

  <p align="center">
    <a href="https://www.idexi.tech"><strong>Live Site: https://www.idexi.tech</strong></a>
  </p>

  <p align="center">
    <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" /></a>
    <a href="https://react.dev"><img src="https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" /></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  </p>

</div>

---

## Overview

idexi connects digital ticketing, entry operations, and attendee photo distribution for live events into a single unified platform.

```
┌────────────────────────────────────────────────────────┐
│                      idexi Platform                    │
└───────────┬────────────────┬────────────────┬──────────┘
            │                │                │
            ▼                ▼                ▼
    ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
    │  idexi Pass  │ │  idexi Flow  │ │  idexi Face  │
    │ Smart Digital│ │ Zero-Hardware│ │ Instant Face │
    │ Dynamic Pass │ │ Access Ctrl  │ │ Photo Deliv. │
    └──────────────┘ └──────────────┘ └──────────────┘
```

---

## Core Products

### 1. [idexi Pass](https://www.idexi.tech/services/pass) — Smart Digital Ticketing
* Anti-fraud rotating QR credentials with offline gate validation.
* Delivered to attendees via SMS, email, and mobile wallet passes.
* Built-in tier clearance for VIP, general admission, and session access.

### 2. [idexi Flow](https://www.idexi.tech/services/flow) — Gate Access & Operations
* Turn any smartphone into an entry scanner without dedicated hardware.
* Sub-second credential verification with real-time sync across all gates.
* Real-time capacity monitoring and ingress flow telemetry.

### 3. [idexi Face](https://www.idexi.tech/services/face) — Instant Photo Delivery
* Facial recognition indexing matching attendees to event photography in real time.
* Private, branded photo galleries delivered directly to each attendee.
* No manual tagging or sorting required by event staff.

---

## Technical Architecture

```
idexi/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout, metadata, SEO schemas, theme
│   │   ├── page.tsx                # Homepage
│   │   ├── about/                  # Company and leadership
│   │   ├── how-it-works/           # Operational lifecycle
│   │   ├── pricing/                # Event tiers and packages
│   │   ├── privacy-security/       # Data privacy and encryption
│   │   ├── use-cases/              # Event vertical playbooks
│   │   └── services/               # Pass, Flow, and Face service pages
│   ├── components/                 # UI components and navigation
│   └── hooks/                      # Performance and interaction hooks
└── public/                         # Brand assets and static media
```

---

## Quick Start

### Prerequisites
* Node.js 18.17+
* npm, pnpm, or bun

### Local Development

```bash
# Clone the repository
git clone https://github.com/Saif-Alqdessi/idexi.git
cd idexi

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Team & Credits

### Leadership
* **Saif Alqdessi** — Co-Founder & Tech Lead
* **Jafar Alkhadrawi** — Co-Founder & Business Operations

### Development & Architecture
* **Mahmoud Al-Esawi** ([@MahmoudEsawi](https://github.com/MahmoudEsawi)) — Full-stack web architecture, UI/UX implementation, and frontend performance.

---

<div align="center">
  <p>
    <a href="https://www.idexi.tech"><strong>idexi.tech</strong></a> • © 2026 idexi. All rights reserved.
  </p>
</div>
