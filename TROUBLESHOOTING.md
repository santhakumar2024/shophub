# ⚠️ BLANK SCREEN FIX - FOLLOW THESE STEPS

## 🔴 Problem: Blank Screen / Nothing Shows

### ✅ Solution - Follow These Steps IN ORDER:

## Step 1: Stop Everything
1. Close ALL browser tabs with localhost
2. Press `Ctrl+C` in any terminal running npm
3. Close all terminals

## Step 2: Use the Startup Script (EASIEST METHOD)
```bash
# Just double-click this file:
start.bat
```

This will:
- ✅ Check Node.js installation
- ✅ Install dependencies if needed
- ✅ Start backend server
- ✅ Start frontend server
- ✅ Open two terminal windows automatically

**Wait 10 seconds**, then open: http://localhost:5173

---

## Step 3: Manual Method (If start.bat doesn't work)

### Terminal 1 - Backend:
```bash
cd C:\Users\santhakumar.J.S\Desktop\shophub-ecommerce
npm run server
```

**✅ SUCCESS LOOKS LIKE:**
```
JSON Server is running
http://localhost:5000
```

**❌ ERROR LOOKS LIKE:**
```
Port 5000 is already in use
```
**FIX:** `npx kill-port 5000` then try again

---

### Terminal 2 - Frontend:
```bash
cd C:\Users\santhakumar.J.S\Desktop\shophub-ecommerce
npm run dev
```

**✅ SUCCESS LOOKS LIKE:**
```
VITE v5.x.x ready in xxx ms
➜ Local:   http://localhost:5173/
```

**❌ ERROR LOOKS LIKE:**
```
Port 5173 is already in use
```
**FIX:** `npx kill-port 5173` then try again

---

## Step 4: Test Backend Manually
Open browser and go to: http://localhost:5000/products

**✅ YOU SHOULD SEE:**
JSON data with 12 products starting with:
```json
[
  {
    "id": 1,
    "title": "Premium Wireless Headphones",
    ...
  }
]
```

**❌ IF YOU SEE:** "Cannot GET" or nothing
- Backend is NOT running
- Go back to Step 3, Terminal 1

---

## Step 5: Open Frontend
Go to: http://localhost:5173

**✅ YOU SHOULD SEE:**
- Big blue header "Welcome to ShopHub"
- Product cards with images
- Navigation bar at top

**❌ IF YOU SEE:** Blank white screen
1. Press F12 (open browser console)
2. Look for red error messages
3. Common errors below 👇

---

## 🐛 Common Errors & Fixes

### Error: "Failed to load data"
**Cause:** Backend not running
**Fix:** 
```bash
cd C:\Users\santhakumar.J.S\Desktop\shophub-ecommerce
npm run server
```

### Error: "Module not found"
**Cause:** Dependencies not installed
**Fix:**
```bash
npm install
```

### Error: "Port already in use"
**Fix:**
```bash
npx kill-port 5000
npx kill-port 5173
```

### Error: "Firebase" related
**Cause:** This is OK! App runs in demo mode
**Fix:** Nothing needed, app will work

### Error: Browser shows "Cannot connect"
**Cause:** Frontend server not running
**Fix:**
```bash
npm run dev
```

---

## 🎯 Checklist - All Must Be TRUE

- [ ] Node.js is installed (`node --version` works)
- [ ] You're in the right directory (`cd shophub-ecommerce`)
- [ ] Dependencies installed (`node_modules` folder exists)
- [ ] Backend running (Terminal 1 shows "JSON Server is running")
- [ ] Frontend running (Terminal 2 shows "Local: http://localhost:5173")
- [ ] http://localhost:5000/products shows JSON data
- [ ] Browser console (F12) has no red errors

---

## 🚀 If All Else Fails - Nuclear Option

```bash
# 1. Close EVERYTHING
# 2. Delete and reinstall:
cd C:\Users\santhakumar.J.S\Desktop\shophub-ecommerce
rmdir /s /q node_modules
del package-lock.json
npm install

# 3. Start fresh:
npm run server  # Terminal 1
npm run dev     # Terminal 2
```

---

## 📞 Quick Test Commands

Test if everything is set up correctly:

```bash
# Test 1: Node.js installed?
node --version

# Test 2: In right directory?
dir package.json

# Test 3: Dependencies installed?
dir node_modules

# Test 4: Can start backend?
npm run server

# Test 5: Can start frontend?
npm run dev
```

---

## ✅ SUCCESS Indicators

You'll know it works when:
1. ✅ Two terminal windows are open and running
2. ✅ http://localhost:5000/products shows JSON
3. ✅ http://localhost:5173 shows ShopHub homepage
4. ✅ You can see product cards with images
5. ✅ No red errors in browser console (F12)

---

## 🎉 Still Having Issues?

Check the browser console (Press F12):
- Click "Console" tab
- Look for RED error messages
- The error will tell you what's wrong

Common console errors:
- **"Failed to fetch"** = Backend not running
- **"Module not found"** = Run `npm install`
- **"Firebase"** = Ignore, works in demo mode
- **"Network error"** = Backend on wrong port

---

**Need more help? Check SETUP_GUIDE.md for detailed instructions!**
