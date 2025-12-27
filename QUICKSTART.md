# GearGuard - Quick Start Guide

## ⚡ 5-Minute Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/gearguard.git
cd gearguard
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
```bash
# Copy example file
cp .env.example .env.local

# Edit .env.local with your values (default values should work for local development)
```

### 4. Start the Application
```bash
npm run dev
```

### 5. Open in Browser
Navigate to: **http://localhost:3000**

---

## ⚠️ Important: Login Required on Each Server Restart

**Every time you restart the server, you must login again.**

The application automatically clears the session on server startup for security purposes.

- ✅ Start server: `npm run dev`
- ✅ Go to: `http://localhost:3000`
- ✅ Login with test account:
  - Email: `test@example.com`
  - Password: `Test@123456`
- ✅ Access dashboard
- ✅ Restart server anytime: Session will be cleared and you'll need to login again

---

## 🔐 Test Account

```
Email: test@example.com
Password: Test@123456
```

**Use this account every time you restart the server to login.**

---

## 📍 Main Pages

| Page | URL | Description |
|------|-----|-------------|
| Login | `/login` | User authentication |
| Signup | `/signup` | Create new account |
| Dashboard | `/dashboard` | Main overview |
| Equipment | `/equipment` | Equipment list & management |
| Maintenance | `/maintenance` | Maintenance requests |
| Calendar | `/calendar` | Schedule view |
| Equipment Categories | `/equipment/categories` | Manage categories |
| Equipment Teams | `/equipment/teams` | Manage teams |

---

## 🚀 Build Commands

```bash
# Development (with hot reload)
npm run dev

# Production build
npm run build

# Run production version
npm start

# Linting (if configured)
npm run lint
```

---

## 📂 Key Files

- `pages/dashboard.tsx` - Main dashboard
- `pages/equipment/` - Equipment management
- `pages/maintenance/` - Maintenance requests
- `prisma/schema.prisma` - Database schema
- `package.json` - Dependencies and scripts
- `README.md` - Full documentation
- `.env.local` - Environment variables (create locally)

---

## ✨ Features to Explore

1. **Dashboard**
   - View equipment metrics
   - Monitor critical equipment
   - Check technician load
   - See maintenance activities

2. **Equipment Management**
   - Create new equipment
   - Manage categories
   - Organize teams
   - Assign technicians

3. **Maintenance Tracking**
   - Create requests
   - Assign teams
   - Track status
   - Edit details

4. **Calendar**
   - View schedules
   - Filter by team
   - Plan maintenance

---

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
# Kill the process
lsof -i :3000
kill -9 <PID>

# Or use different port
npm run dev -- -p 3001
```

### Database Issues
```bash
# Reset database
rm prisma/dev.db
npx prisma migrate dev
```

### Dependencies Error
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📝 Notes

- Passwords are hashed with bcryptjs
- Data is stored in SQLite (dev.db)
- Session stored in localStorage
- All styling is inline CSS
- Responsive design with collapsible sidebar

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [SQLite Documentation](https://www.sqlite.org/docs.html)

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make changes and commit: `git commit -m "Add your feature"`
3. Push to GitHub: `git push origin feature/your-feature`
4. Create a Pull Request

---

## 📞 Support

For issues, please check:
1. This file for common problems
2. The main README.md for detailed documentation
3. GitHub issues tab for known problems

---

**Happy coding! 🚀**
