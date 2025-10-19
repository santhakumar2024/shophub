# 🚀 Quick Fix Guide - Blank Screen Issue

## Step 1: Stop All Running Processes
Press `Ctrl+C` in both terminal windows to stop everything.

## Step 2: Clear Browser Cache
1. Open your browser
2. Press `Ctrl+Shift+Delete`
3. Clear "Cached images and files"
4. Close all browser tabs for localhost

## Step 3: Restart Backend Server
```bash
cd C:\Users\santhakumar.J.S\Desktop\shophub-ecommerce
npm run server
```

**Wait for:** `JSON Server is running on http://localhost:5000`

## Step 4: Open New Terminal and Start Frontend
```bash
cd C:\Users\santhakumar.J.S\Desktop\shophub-ecommerce
npm run dev
```

**Wait for:** `Local: http://localhost:5173/`

## Step 5: Open Browser
Navigate to: http://localhost:5173

## Common Issues:

### Issue: Port 5000 already in use
```bash
npx kill-port 5000
npm run server
```

### Issue: Port 5173 already in use
```bash
npx kill-port 5173
npm run dev
```

### Issue: Module not found
```bash
rm -rf node_modules package-lock.json
npm install
npm run server  # Terminal 1
npm run dev     # Terminal 2
```

### Issue: Still blank screen
1. Open browser console (F12)
2. Check for errors
3. Make sure both servers are running
4. Try incognito/private mode

## What Should Happen:
✅ Backend: http://localhost:5000 (JSON Server)
✅ Frontend: http://localhost:5173 (Vite Dev Server)
✅ Browser: Shows ShopHub homepage with products

## Test Backend Manually:
Open in browser: http://localhost:5000/products
You should see JSON data with 12 products.

If this doesn't work, the backend isn't running!
