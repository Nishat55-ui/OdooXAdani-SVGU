# Step-by-Step Guide to Push GearGuard to GitHub

## Prerequisites
- Git installed on your system
- GitHub account (create at github.com if you don't have one)

---

## 📋 Step-by-Step Instructions

### Step 1: Create a New Repository on GitHub

1. Go to **https://github.com/new**
2. Fill in the repository details:
   - **Repository name**: `gearguard` (or your preferred name)
   - **Description**: "Maintenance Equipment Tracking Application"
   - **Visibility**: Select `Public` or `Private` as preferred
   - **Initialize repository**: DO NOT check "Add README" (we already have one)
   - **Add .gitignore**: Select `Node` from dropdown
   - **Add license**: Optional (MIT is recommended)
3. Click **Create repository**
4. You'll see the repository setup page with URLs and commands

---

### Step 2: Initialize Git in Your Local Project

Open PowerShell/Terminal in your project directory (`c:\Users\admin\Desktop\Odoo`):

```powershell
cd c:\Users\admin\Desktop\Odoo
git init
```

---

### Step 3: Add Your GitHub Remote

Copy the repository URL from GitHub (should look like `https://github.com/yourusername/gearguard.git`)

```powershell
git remote add origin https://github.com/yourusername/gearguard.git
```

Replace `yourusername` with your actual GitHub username.

**Verify remote was added:**
```powershell
git remote -v
```

You should see:
```
origin  https://github.com/yourusername/gearguard.git (fetch)
origin  https://github.com/yourusername/gearguard.git (push)
```

---

### Step 4: Create .gitignore File

If it wasn't created automatically, create `.gitignore`:

```powershell
# Use the .gitignore template for Node.js
# This file should be in the root of your project (c:\Users\admin\Desktop\Odoo\.gitignore)
```

Add these lines to `.gitignore`:
```
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
.coverage/

# Production
.next/
out/
build/
dist/

# Misc
.DS_Store
*.pem
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Debug
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Database
*.db
prisma/dev.db

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

---

### Step 5: Configure Git User (First Time Only)

Set your git user name and email:

```powershell
git config --global user.name "Your Full Name"
git config --global user.email "your.email@example.com"
```

For example:
```powershell
git config --global user.name "John Doe"
git config --global user.email "john@example.com"
```

---

### Step 6: Add Files to Git

Add all files to the staging area:

```powershell
git add .
```

Verify what will be committed:
```powershell
git status
```

You should see all your project files listed as "Changes to be committed"

---

### Step 7: Create First Commit

```powershell
git commit -m "Initial commit: GearGuard maintenance tracking application

- Dashboard with equipment metrics and critical alerts
- Equipment management with categories and teams
- Maintenance request tracking with full CRUD operations
- Team management and technician allocation
- Calendar view for maintenance scheduling
- User authentication with signup/login
- Multiple company support
- Real-time activity logging"
```

---

### Step 8: Change Branch Name (Optional but Recommended)

GitHub now uses `main` as default instead of `master`:

```powershell
git branch -M main
```

---

### Step 9: Push to GitHub

```powershell
git push -u origin main
```

You may be prompted for authentication:
- **Username**: Your GitHub username
- **Password**: Your GitHub personal access token (not your password)

### Create Personal Access Token (If Needed)

If password authentication fails:

1. Go to **GitHub Settings** → **Developer settings** → **Personal access tokens**
2. Click **Generate new token**
3. Select scopes: `repo`, `read:user`
4. Copy the token
5. Use token as password when pushing

---

### Step 10: Verify Push Was Successful

```powershell
git log --oneline
```

Should show your commit. Then check GitHub:
- Go to your repository URL: `https://github.com/yourusername/gearguard`
- Verify files are visible
- Check that README.md displays correctly

---

## 📤 Future Commits and Pushes

After initial setup, for future changes:

```powershell
# Make your changes, then:
git add .
git commit -m "Clear commit message describing changes"
git push origin main
```

---

## 🔄 Common Git Commands

### Check Status
```powershell
git status
```

### View Commit History
```powershell
git log
```

### See Changes Before Committing
```powershell
git diff
```

### Undo Last Commit (Before Push)
```powershell
git reset --soft HEAD~1
```

### Pull Latest Changes
```powershell
git pull origin main
```

---

## ⚠️ Important Notes

1. **Never commit these files**:
   - `node_modules/`
   - `.env` files with real secrets
   - `prisma/dev.db`
   - `.next/` build directory

2. **File Size Limit**: GitHub has a 100MB file size limit. If any file exceeds this, use Git LFS

3. **Sensitive Data**: 
   - Never commit real passwords or API keys
   - Use `.env.local` (in .gitignore)
   - Document required env vars in `.env.example`

4. **Branching Strategy** (for future development):
   ```powershell
   # Create feature branch
   git checkout -b feature/new-feature
   
   # Make changes and commit
   git commit -m "Add new feature"
   
   # Push feature branch
   git push origin feature/new-feature
   
   # Create Pull Request on GitHub UI
   # Merge to main after review
   ```

---

## ✅ Checklist

- [ ] GitHub account created
- [ ] New repository created on GitHub
- [ ] Git initialized locally (`git init`)
- [ ] Remote added (`git remote add origin`)
- [ ] `.gitignore` created with Node entries
- [ ] Git user configured (`git config --global`)
- [ ] Files staged (`git add .`)
- [ ] First commit created (`git commit -m`)
- [ ] Branch renamed to main (`git branch -M main`)
- [ ] Pushed to GitHub (`git push -u origin main`)
- [ ] Verified on GitHub website
- [ ] README.md displays correctly

---

## 🎉 Success!

Your GearGuard project is now on GitHub! Share the repository URL with others:

```
https://github.com/yourusername/gearguard
```

---

## 📞 Need Help?

Common issues and solutions:

### Authentication Failed
- Use personal access token instead of password
- Generate token at: https://github.com/settings/tokens

### Permission Denied
```powershell
# Fix SSH issues or use HTTPS instead
git remote set-url origin https://github.com/yourusername/gearguard.git
```

### Wrong Remote URL
```powershell
# Check current remote
git remote -v

# Update remote
git remote set-url origin https://github.com/yourusername/gearguard.git
```

### Large File Error
- Remove from git history: `git rm --cached filename`
- Add to .gitignore
- Recommit and push
