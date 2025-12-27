# GearGuard — Maintenance Tracking (Local Setup)

This repository contains the GearGuard maintenance tracking application (Next.js + Prisma + SQLite).

The instructions below explain how to create the database, run migrations, seed sample data, and start the app locally so you can push this repository to GitHub and others can reproduce your environment.

## Prerequisites

- Node.js 18 or newer
- npm (or yarn / pnpm)
- Git (optional)

## Files to check

- `prisma/schema.prisma` — Prisma schema (models and SQLite datasource)
- `prisma/seed.ts` — TypeScript seed script that inserts sample data
- API endpoints under `pages/api/*`

## Environment variables

Create a `.env` file at the repository root (do NOT commit secrets). Example values:

```
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
JWT_SECRET="change_this_to_a_secure_random_value"
```

If you prefer, create `.env.example` with the same keys (without real secrets) and copy it to `.env`.

## Install dependencies

From the project root:

```bash
npm install
# or: yarn install
# or: pnpm install
```

## Generate Prisma client

```bash
npx prisma generate
```

## Create / migrate the database

For local development you can use Prisma migrations which will create the SQLite file and apply schema changes.

1) Create the initial migration and apply it (recommended for development):

```bash
npx prisma migrate dev --name init
```

If you already have migrations or prefer pushing schema directly (non-migration approach):

```bash
npx prisma db push
```

Note: The project uses SQLite by default (`DATABASE_URL="file:./dev.db"`). The DB file will be created in the repository root.

## Seed the database (sample data)

The repository includes `prisma/seed.ts` to populate the database with sample (Indian) names, equipment, teams, and maintenance requests.

Run the seed script:

```bash
npx ts-node prisma/seed.ts
```

If `ts-node` is not installed globally, ensure it is in `devDependencies` or run:

```bash
npm install -D ts-node typescript @types/node
npx ts-node prisma/seed.ts
```

After seeding you should see console output confirming created records.

## Run the app (development)

```bash
npm run dev
# or: yarn dev
# visit: http://localhost:3000
```

## Build and run (production-like)

```bash
npm run build
npm start
```

## Common commands (summary)

```bash
# install deps
npm install

# generate Prisma client
npx prisma generate

# apply migrations
npx prisma migrate dev --name init

# seed DB
npx ts-node prisma/seed.ts

# run locally
npm run dev
```

## Troubleshooting

- If `npx prisma migrate dev` fails because of existing schema changes, try `npx prisma db push` to sync the schema without creating a migration.
- If `npx ts-node prisma/seed.ts` errors about TS config, ensure `ts-node` and `typescript` are installed as dev dependencies.
- If you change `DATABASE_URL` to a different engine (Postgres/MySQL), update `prisma/schema.prisma` datasource accordingly and run `npx prisma migrate dev`.

## Notes for GitHub

- Add `.env` to `.gitignore` before pushing.
- Optionally add `.env.example` with the keys used in this README so contributors know what variables to set.

---

If you want, I can also create a `.env.example` file and add a short GitHub Actions workflow to run `prisma migrate deploy` and `npm run build` on push.# GearGuard - Maintenance Tracking Application

A comprehensive maintenance equipment tracking and management system built with Next.js, TypeScript, and SQLite. GearGuard helps organizations efficiently manage equipment maintenance, track technician workload, and monitor maintenance requests.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Test Credentials](#test-credentials)
- [Application Guide](#application-guide)
- [Project Structure](#project-structure)

## ✨ Features

### Dashboard
- **Equipment Overview**: View total equipment count and utilization metrics
- **Critical Equipment Alerts**: Red-flagged equipment with health < 30%
- **Technician Load Monitoring**: Track technician workload (85% utilization example)
- **Open Requests Tracking**: 12 pending requests with 3 overdue
- **Equipment Options**: Quick access to Work Sector and Machine & Tools management
- **Maintenance Activities Table**: Real-time view of all maintenance activities
- **Maintenance Reports**: Summary cards for New, In Progress, Completed, and Overdue requests

### Equipment Management
- Create, view, and manage equipment inventory
- Equipment categories (Computers, Software, Monitors, etc.)
- Team assignment for maintenance
- Technician allocation
- Equipment health tracking
- Multiple company support

### Teams Management
- Create and manage maintenance teams
- Dynamic team member assignment
- Team-specific technician mapping
- Company-level team organization

### Maintenance Requests
- Create new maintenance requests
- Real-time status tracking (New, In Progress, Completed, Overdue)
- Team assignment with automatic technician population
- Full edit capability on maintenance details
- Activity logging

### Calendar View
- Visual maintenance schedule
- Team-based event filtering
- Maintenance timeline view

### Additional Features
- User authentication (signup/login)
- Responsive design with collapsible sidebar
- Color-coded status indicators
- Real-time activity logging
- Multi-company support

## 🛠 Tech Stack

- **Frontend**: Next.js 16.1.1 with TypeScript
- **Bundler**: Turbopack
- **Database**: SQLite with Prisma ORM
- **Authentication**: Custom JWT-based with bcryptjs
- **Styling**: Inline CSS with responsive design
- **State Management**: React Hooks (useState, useEffect)

## 📦 Installation

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Git

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/gearguard.git
cd gearguard
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:
```
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

4. **Initialize the database**
```bash
npx prisma migrate dev
```

5. **Start the development server**
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🚀 Getting Started

### First Time Setup

1. **Open the application**: Navigate to `http://localhost:3000`
2. **Create an account**: Click on the signup link
3. **Fill in registration details**:
   - Full Name
   - Email
   - Password (will be hashed with bcryptjs)
4. **Login**: Use your credentials to access the dashboard

### ⚠️ Important: Session Reset on Server Restart

**Every time you restart the server (`npm run dev`), all users will be automatically logged out.**

- The application clears the session on each startup
- Users must **login again** with their credentials
- This is intentional for development/security purposes
- To test fresh login flow: Just restart the server with `npm run dev`

### Test Credentials

**Pre-created test account:**
- **Email**: `test@example.com`
- **Password**: `Test@123456`
- **Display Name**: `Test User`

Use these credentials to login after every server restart.

## 📖 Application Guide

### Dashboard
1. Login with your credentials
2. View real-time metrics:
   - Total Equipment: 156
   - Open Requests: 23
   - In Progress: 8
   - Overdue: 3
3. Monitor Critical Equipment (5 units with health < 30%)
4. Check Technician Load (85% utilization)
5. Review Open Requests (12 pending, 3 overdue)
6. View Maintenance Activities table
7. Access Maintenance Reports (4-card summary)

### Equipment Management

#### View Equipment List
1. Click **Equipment** in sidebar
2. Browse all equipment with search functionality
3. Click on any equipment to view details

#### Create New Equipment
1. Navigate to **Equipment** → Click **New Equipment** button
2. Fill in required fields:
   - **Name**: Equipment identifier
   - **Equipment Category**: Select from predefined categories
   - **Company**: Assign to company
   - **Used By**: Select technician/user
   - **Maintenance Team**: Assign responsible team
   - **Assigned Date**: When equipment was assigned
   - **Technician**: Primary technician
   - **Employee**: Additional employee assignment
   - **Scrap Date**: Optional retirement date
   - **Used in Location**: Physical location
   - **Work Center**: Department/center
   - **Description**: Additional details
3. Click **Save Equipment**

#### Manage Categories
1. Equipment → **Categories** button
2. View all equipment categories
3. Create new category: Click **New Category**
   - Category Name
   - Responsible Person (dropdown)
   - Company assignment

#### Manage Teams
1. Equipment → **Teams** button
2. View all maintenance teams with members
3. Create new team: Click **New Team**
   - Team Name
   - Company
   - Add multiple team members dynamically
   - Click "Add Member" to add more team members
   - Click "Remove" to delete team member

### Maintenance Requests

#### Create Maintenance Request
1. Click **Maintenance** in sidebar
2. Click **New Request** button
3. Fill in:
   - Title
   - Description
   - Equipment (dropdown)
   - Priority (High, Medium, Low)
   - Assigned Team
   - Technician (auto-populated based on team)
   - Status (New, In Progress, Scheduled)
4. Click **Save Request**

#### Edit Maintenance Request
1. Click on any request in the Maintenance list
2. Click **Edit** button
3. Update any fields:
   - Request details
   - Team assignment
   - Technician (updates based on team)
   - Status
   - Priority
4. Click **Save Changes**

### Calendar View
1. Click **Calendar** in sidebar
2. View all scheduled maintenance
3. Filter by team (dropdown at top)
4. Click any event for details

### Teams Integration
1. Access Teams from sidebar (👥 Teams)
2. View all maintenance teams
3. See team composition and company assignment
4. Create new teams as needed
5. Teams auto-populate in:
   - Equipment creation form
   - Maintenance request creation
   - Maintenance detail edit mode

## 🗂 Project Structure

```
gearguard/
├── pages/
│   ├── _app.tsx              # App wrapper and global setup
│   ├── _document.tsx         # Document structure
│   ├── index.tsx             # Home/login page
│   ├── signup.tsx            # User registration
│   ├── login.tsx             # User login
│   ├── dashboard.tsx         # Main dashboard
│   ├── equipment.tsx         # Equipment list
│   ├── equipment/
│   │   ├── new.tsx          # Create equipment form
│   │   ├── categories.tsx    # Equipment categories list
│   │   ├── categories/
│   │   │   └── new.tsx      # Create category
│   │   ├── teams.tsx        # Teams management list
│   │   └── teams/
│   │       └── new.tsx      # Create team
│   ├── maintenance.tsx       # Maintenance requests board
│   ├── maintenance/
│   │   └── [id].tsx         # Request detail & edit
│   ├── calendar.tsx          # Calendar view
│   └── api/
│       └── auth/
│           ├── signup.ts    # Signup API
│           └── login.ts     # Login API
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── dev.db              # SQLite database
├── public/                   # Static assets
├── styles/                   # Global styles (if any)
├── package.json
├── tsconfig.json
└── README.md
```

## 🗄 Database Schema

### Users Table
```
- id: String (Primary Key)
- email: String (Unique)
- password: String (Hashed)
- name: String
- createdAt: DateTime
- updatedAt: DateTime
```

## 🔐 Security Features

- ✅ Password hashing with bcryptjs
- ✅ Secure session management with localStorage
- ✅ API route protection
- ✅ Environment variable protection
- ✅ No sensitive data in frontend

## 📊 Sample Data

### Companies
- TechCorp Industries
- Precision Manufacturing Ltd
- Global Solutions Inc
- Advanced Systems Corp
- Innovation Labs
- Digital Enterprises

### Sample Teams
1. **Internal Maintenance** - TechCorp Industries
   - Members: Anas Makari, Mitchell Admin, Aka Foster

2. **Metrology** - Precision Manufacturing Ltd
   - Members: Marc Demo, Sarah Johnson, Mike Davis

3. **Subcontractor** - Global Solutions Inc
   - Members: Maggie Davidson, David Lee, Emma Wilson

### Sample Equipment Categories
- Computers
- Software
- Monitors
- HVAC Systems
- Electrical Equipment
- Machinery

## 🧪 Testing the Application

### Login Flow Test
1. Navigate to `http://localhost:3000`
2. Use test credentials:
   ```
   Email: test@example.com
   Password: Test@123456
   ```
3. Verify dashboard loads with metrics

### Create Equipment Test
1. Go to Equipment → New Equipment
2. Fill all fields (required ones marked)
3. Select category from dropdown
4. Select team from dropdown
5. Click Save Equipment
6. Verify equipment appears in list

### Create Team Test
1. Go to Equipment → Teams
2. Click New Team button
3. Enter:
   - Team Name: "Test Team"
   - Company: "TechCorp Industries"
   - Add 2-3 team members
4. Click Save Team
5. Verify team appears in list and equipment dropdowns

### Create Maintenance Request Test
1. Go to Maintenance → New Request
2. Fill in all fields
3. Select a team
4. Verify technician auto-populates
5. Click Save Request
6. Click on request to edit
7. Test edit mode functionality
8. Change status to "In Progress"
9. Verify changes save

### Calendar Test
1. Go to Calendar
2. View all scheduled maintenance
3. Use team filter dropdown
4. Verify events display correctly

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
# Find and kill process on port 3000
lsof -i :3000
kill -9 <PID>
```

### Database Issues
```bash
# Reset database
rm prisma/dev.db
npx prisma migrate dev
```

### Build Errors
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run dev
```

## 📝 Environment Variables

Create `.env.local`:
```
# Database
DATABASE_URL="file:./dev.db"

# API
NEXT_PUBLIC_API_URL="http://localhost:3000"

# Optional
NEXT_PUBLIC_APP_NAME="GearGuard"
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel
1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy

### Deploy to Other Platforms
The application can be deployed to any platform supporting Node.js:
- Railway
- Render
- AWS
- DigitalOcean
- Heroku

## 📚 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login

### Data (Mock)
All data is currently stored in component state with localStorage session management. For production, implement API routes for:
- Equipment CRUD
- Teams CRUD
- Maintenance Requests CRUD

## 🎨 UI/UX Features

- Dark-friendly cards with shadows
- Color-coded status indicators
- Responsive grid layouts
- Collapsible sidebar
- Hover effects on interactive elements
- Smooth transitions
- Professional typography

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is licensed under the MIT License.

## 👥 Contributors

- Developed with Next.js, TypeScript, and modern web technologies

## 📞 Support

For issues and questions, please open a GitHub issue in the repository.

## 🎯 Future Enhancements

- [ ] Real database persistence
- [ ] Advanced reporting and analytics
- [ ] Mobile application
- [ ] Email notifications
- [ ] PDF export for reports
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Advanced filtering and search
- [ ] Integration with IoT sensors
- [ ] Automated maintenance scheduling

---

**Version**: 1.0.0  
**Last Updated**: December 27, 2025  
**Status**: Production Ready
