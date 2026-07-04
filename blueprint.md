# Project Blueprint: Automated Property Manager
**Platform Strategy & Overview**  
*Target Market: Australian Indie Landlords & PG Operators*

---

## 1. Target Audience
This platform is specifically designed for the "Indie" property market in Australia. These users are currently underserved by massive, expensive enterprise software and rely too heavily on messy spreadsheets.

*   **Primary User:** Independent Landlords and Property Investors.
*   **Secondary User:** Operators of PGs (Paying Guest accommodations) and small multi-family units.
*   **Portfolio Size:** Managing anywhere from 5 to 50 rental units.
*   **Pain Points:** Overwhelmed by manual data entry, scattered tenant communications, and the constant fear of accidentally breaching local compliance laws.

---

## 2. Key Features
The platform operates as a quiet background assistant rather than a clunky software suite.

*   **Frictionless Tenant Web Portal:** A mobile-responsive web app for tenants to pay rent and log maintenance tickets via secure "magic links" (no app downloads required).
*   **Streamlined Property Setup:** An intuitive, step-by-step form for landlords to quickly input property details, tenant information, and lease dates without dealing with cluttered menus.
*   **Smart Maintenance Triage:** Automated text analysis categorizes incoming repair requests, tagging them by issue type (e.g., Plumbing, Electrical) and urgency level.
*   **Exception-Based Dashboard:** A unified landlord control panel that hides the noise and only displays what needs immediate attention (e.g., Overdue Rent, Urgent Repairs, Expiring Leases).
*   **Automated Expiry Workflows:** The system automatically flags leases that are 30 days from expiring and prompts the landlord to renew or end the tenancy.

---

## 3. Core Differentiators
What separates this platform from legacy property management tools:

*   **No-App Experience for Tenants:** By utilizing Progressive Web Apps (PWAs) and email magic links, you remove the friction of getting tenants to adopt new software.
*   **Radical Simplicity:** Instead of the overwhelming interfaces of enterprise systems, we offer a clean, focused experience that requires zero training for a landlord to start using immediately.
*   **Compliance as a Service:** The system acts as a legal safeguard, actively tracking Service Level Agreements (SLAs) for maintenance and warning the landlord before a breach occurs.

---

## 4. Important Laws to Look Out For (Australia)
Building PropTech in Australia requires strict adherence to local regulations. The platform must account for the following:

*   **Residential Tenancies Act (RTA):** Each state (VIC, NSW, QLD, etc.) has variations of the RTA. The software must handle state-specific forms, notice periods, and security deposit (Bond) lodgement rules.
*   **Urgent vs. Non-Urgent Maintenance SLAs:** By law, "Urgent" repairs (e.g., gas leaks, burst water services) require the landlord to respond within 24–48 hours. If missed, tenants can authorize repairs and force reimbursement. The software *must* prioritize these automatically.
*   **Privacy Act 1988 (Data Sovereignty):** Tenant Personally Identifiable Information (PII) like passports or Medicare cards must be securely stored.

---

## 5. Technology Stack & Build Architecture
To execute this lean, automated platform, the system relies on a modern web stack designed for rapid development and high scalability.

*   **Core Languages:** **TypeScript & JavaScript** to maintain a unified, type-safe codebase across both the frontend and backend.
*   **Frontend Framework (Next.js & React):** Powers both the Landlord Dashboard (desktop-optimized) and the Tenant Web Portal (mobile-optimized). Next.js is utilized for secure API routing and fast Server-Side Rendering (SSR).
*   **UI Styling (Tailwind CSS):** Utilized for rapidly building the exception-based UI and ensuring perfect mobile responsiveness without bloated custom stylesheets.
*   **Database & Backend (Supabase/PostgreSQL):** Handles robust relational data mapping. Crucially, the database must be hosted in the **Sydney (ap-southeast-2) region** to ensure data sovereignty compliance with Australian privacy laws. Supabase also manages the secure passwordless "Magic Link" authentication for tenants.
*   **Hosting & Communications:** **Vercel** is used for deploying the web application to the edge, ensuring fast load times globally. **Resend** or **SendGrid** handles transactional emails, delivering the magic login links and urgent SLA alerts.

---

## 6. Development Timeline (From Scratch Build)
Building a robust Minimum Viable Product (MVP) completely from scratch, including rigorous testing and bug fixing, will take approximately 8 to 10 weeks.

*   **Weeks 1–2: Architecture & Database Foundation:** Setup Supabase in the Sydney region, define the PostgreSQL database schemas, and implement the secure "Magic Link" authentication flow.
*   **Weeks 3–4: Core Backend & API Development:** Build the backend logic for property creation, rent ledgers, and the smart maintenance triage routing.
*   **Weeks 5–6: Frontend Interface Build:** Develop the mobile-responsive tenant web app (PWA) and the desktop-optimized exception-based Landlord Dashboard.
*   **Weeks 7–8: Integration & Internal Testing:** Connect the frontend to the backend, set up automated CRON jobs for 30-day lease expiry alerts, and configure transactional email routing. Conduct thorough internal testing to identify bugs.
*   **Weeks 9–10: Beta Testing & Bug Fixing:** Onboard 3 to 5 beta testers to use the platform in real-world scenarios. Focus exclusively on fixing bugs, edge cases, and polishing the UI before public release.

---

## 7. Additional Features (Future Scope & Scaling)
Beyond the core MVP, the platform will integrate high-value features specifically tailored for the Australian market and advanced automation.

*   **AI-Powered PDF Lease Extraction (Zero-Touch Onboarding):** An advanced feature to allow landlords to upload a raw PDF lease, with the backend AI instantly extracting tenant names, dates, and amounts to auto-fill the database.
*   **ATO-Ready EOFY Reports:** June 30 is a major pain point for AU landlords. The system will automatically generate a single, consolidated Income & Expense PDF report compliant with Australian Taxation Office (ATO) standards.
*   **Accounting Integrations:** One-click export of rent ledgers and maintenance expenses directly to popular Australian accounting tools like Xero or MYOB.
*   **Automated Rent Increase Notices:** Based on state-specific RTA laws limiting how often rent can be increased (e.g., once every 12 months), the system will calculate the legal date for the next allowable increase and draft the required notice form.
*   **Integrated Vendor Marketplace:** A future module allowing landlords to directly forward "Urgent" plumbing or electrical tickets to vetted local Australian tradies directly from the dashboard.

---

## 8. Omitted Enterprise Features
We intentionally skipped 12 features commonly found in legacy ERP systems because our core mission is radical simplicity. Adding these features would create an overwhelming interface and completely defeat our core differentiator of being frictionless and easy to use.

*   **HR & Payroll Functions:** Software modules for managing internal employee shifts, timesheets, and salaries.
*   **Inventory & Asset Management:** Systems for tracking individual pieces of furniture, appliances, or spare parts across a facility.
*   **Space Management & Property Allocation:** Tools used for commercial office desk assignments or complex facility mapping.
*   **Preventive Maintenance Schedules & Notifications:** Calendars for scheduling commercial-grade routine infrastructure audits and checks.
*   **Maintenance Team Management:** Routing and dispatch modules for managing in-house, full-time maintenance fleets.
*   **Meter Readings \& Utility Bills:** Manual sub-metering calculators and utility invoicing modules.