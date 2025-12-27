# 🔐 Session Reset on Server Restart - Feature Documentation

## Overview

GearGuard is configured to **automatically clear all user sessions every time the server restarts**. This means:

✅ Every time you run `npm run dev`, all users are logged out
✅ Users must re-login with their credentials  
✅ Fresh session for security testing
✅ Perfect for development and testing

---

## How It Works

### Code Implementation

The session clearing is implemented in `pages/_app.tsx`:

```typescript
useEffect(() => {
  // Clear user session on app startup - requires re-login on each server restart
  localStorage.removeItem('user');
  localStorage.removeItem('sessionId');
}, []);
```

This hook runs when the app first loads and clears:
- `user` - Stored user object from localStorage
- `sessionId` - Session identifier

### What Gets Cleared

```
✓ User login session
✓ User credentials stored locally
✓ Session ID/token
```

### What Does NOT Get Cleared

```
✓ Database (SQLite dev.db remains)
✓ Created equipment/data (persists)
✓ Created users (persists)
✓ Maintenance requests (persists)
```

---

## Workflow Example

### First Time Using Application

```
1. npm run dev
2. Open http://localhost:3000 
3. See login page (because session was cleared)
4. Login with: test@example.com / Test@123456
5. Use application (create equipment, requests, etc.)
```

### Restart Server (Ctrl+C, then npm run dev again)

```
1. Ctrl+C to stop server
2. npm run dev to restart
3. Browser still shows dashboard (cached)
4. Refresh page (F5) or navigate anywhere
5. Redirected to login page
6. Login again with: test@example.com / Test@123456
7. Continue using application
```

### Create New User and Restart

```
1. Create new account: myemail@test.com / mypassword
2. Login successfully
3. Use application
4. Restart server (npm run dev)
5. Session cleared, redirected to login
6. Can login with: myemail@test.com / mypassword
   (Account was created and persisted in database)
```

---

## Test Credentials (Always Available)

```
📧 Email:    test@example.com
🔐 Password: Test@123456
```

**Use these credentials to login after every server restart.**

---

## Why This Design?

### Advantages

✅ **Security Testing**: Test login flow repeatedly
✅ **Fresh Start**: Each development session starts clean
✅ **Bug Testing**: Verify logout functionality works
✅ **Session Validation**: Test session expiration handling
✅ **Security Practice**: Forces regular re-authentication

### Perfect For

- Development teams
- Testing login flows
- Security assessments
- Demo presentations
- Training purposes

---

## Changing This Behavior (If Needed)

If you want to **disable this feature** and keep users logged in across restarts:

### Option 1: Comment Out the Code

Edit `pages/_app.tsx`:

```typescript
useEffect(() => {
  // COMMENTED OUT - Keep sessions across restarts
  // localStorage.removeItem('user');
  // localStorage.removeItem('sessionId');
}, []);
```

### Option 2: Remove the useEffect Entirely

Delete the entire useEffect hook from `pages/_app.tsx`.

---

## Production Deployment

When deploying to production (Vercel, Railway, etc.):

**Consider whether you want to keep this behavior.**

- **Keep it**: Good for security (users re-login on deployments)
- **Remove it**: Better UX (users stay logged in across restarts)

To remove for production:
1. Edit `pages/_app.tsx`
2. Remove or comment out the localStorage clear code
3. Deploy

---

## Testing This Feature

### Verify Session is Cleared

```powershell
# 1. Start server
npm run dev

# 2. Login with test account
# Email: test@example.com
# Password: Test@123456

# 3. Open browser DevTools (F12)
# Application > Local Storage > http://localhost:3000
# You should see 'user' key with your user data

# 4. Stop server (Ctrl+C)
# 5. Start server again (npm run dev)

# 6. Check DevTools again
# Local Storage should be empty (or 'user' key deleted)

# 7. Refresh page - redirected to login
```

### Create Test Data and Verify Persistence

```
1. Login and create equipment: "Test Monitor"
2. Create team: "Test Team"
3. Create maintenance request
4. Restart server
5. Login again
6. Equipment, team, request still exist ✓
```

---

## Troubleshooting

### Still Logged In After Restart?

**Issue**: Session persists after restart

**Solution**:
```
1. Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R on Mac)
2. Clear browser cache
3. Check DevTools - Local Storage should be empty
4. Verify code in _app.tsx has useEffect hook
```

### Can't Login After Restart?

**Issue**: Login not working

**Solution**:
```
1. Try test account: test@example.com / Test@123456
2. Check if account exists (was created before restart)
3. Try creating new account via signup
4. Check browser console for errors (F12)
```

### Want to Keep Session?

**Issue**: Don't want to re-login every restart

**Solution**: Edit `pages/_app.tsx` and comment out/remove the session clearing code

---

## Document Updates

The following files have been updated to document this behavior:

- ✅ **README.md** - "Getting Started" section
- ✅ **QUICKSTART.md** - Added session reset explanation
- ✅ **_app.tsx** - Code implementation with comments
- ✅ **This file** - Complete feature documentation

---

## Summary

```
What Happens: Session cleared on server restart
When: Every time npm run dev starts
Why: Security and testing purposes
Result: Users must re-login
Data: Equipment/requests persist (in database)
Credentials: test@example.com / Test@123456
```

---

**Status**: ✅ Implemented and Documented  
**Version**: 1.0.0  
**Date**: December 27, 2025
