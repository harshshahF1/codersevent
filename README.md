# Department Inventory & Student Item Issue Management System

Express, EJS and SQLite inventory system with role-based login, item/asset tracking, issue/return/renewal workflows, acknowledgements, exports, audit records and responsive UI.

## Requirements
- Node.js 18+ (Node 20 LTS recommended)
- npm
- Internet only for CDN fonts, Tailwind CSS, Alpine.js and Chart.js. The server and SQLite database run locally.

## Run on Windows
1. Install Node.js LTS from https://nodejs.org/.
2. Open PowerShell or Command Prompt.
3. Run: git clone https://github.com/harshshahF1/codersevent.git
4. Run: cd codersevent
5. Run: npm install
6. Run: npm run seed
7. Run: npm test
8. Run: npm start
9. Open http://localhost:3000

## macOS/Linux
Run the same commands in Terminal.

## Demo logins
- Coordinator: coordinator@dept.edu / Coord@123
- Students: 2026DFIS001 through 2026DFIS008 / Student@123

## Seed scenario
The seed creates M.Sc. DFIS semester I, eight registered students, ten uniquely tracked development boards DB-001 through DB-010 (DB-009 Maintenance, DB-010 Damaged), 20 USB cables, 8 adapters, and two laptops. A loan dated 2026-10-01 is due 2026-10-16. An approved renewal extends the current due date by 15 days, so 2026-10-16 becomes 2026-10-31. Partial returns preserve the outstanding balance. Coordinators can override the system date to demonstrate overdue status.

## Commands
- npm install — install dependencies
- npm run seed — reset and create demo data
- npm test — run date and business-rule tests
- npm start — start at http://localhost:3000

## Data and production notes
SQLite is stored at data/inventory.sqlite and excluded from Git. Demo credentials are public and intended only for local demos. Before deployment set a long random SESSION_SECRET, use HTTPS and secure cookies, use a production session store, change demo passwords, configure backups and add rate limiting. This is a runnable project starter, not a security-audited production deployment.

## Included workflows
Coordinator/student dashboards, inventory and asset creation, item issue, receipt and partial return, renewal request/decision, student directory, storage locations, policy limits, audit records, CSV/PDF issue reports, printable/PDF acknowledgements, CSRF token checks, and tests for date arithmetic and quantity rules.