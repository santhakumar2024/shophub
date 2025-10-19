# ShopHub E-commerce Platform - Complete Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- Firebase account (for authentication)
- Code editor (VS Code recommended)

### Installation Steps

1. **Navigate to project directory**
```bash
cd shophub-ecommerce
```

2. **Install dependencies**
```bash
npm install
```

3. **Firebase Setup**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Google Authentication:
     - Go to Authentication → Sign-in method
     - Enable Google provider
   - Get your config from Project Settings
   - Create `.env` file in root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. **Start the backend server (JSON Server)**
```bash
npm run server
```
Backend will run on http://localhost:5000

5. **In a new terminal, start the frontend**
```bash
npm run dev
```
Frontend will run on http://localhost:5173

## 📱 Features Overview

### User Features
- ✅ Browse products with images and details
- 🔍 Search products by name/description
- 🎯 Filter by category
- 📊 Sort by price, rating, name
- 🛒 Add to cart with quantity control
- ❤️ Wishlist functionality (login required)
- 📦 Stock validation (out-of-stock items blocked)
- 🔐 Google OAuth login
- 📍 Multiple shipping addresses
- 💳 Checkout process
- 📋 Order history with status tracking
- 📱 Responsive design

### Admin Features (admin@shophub.com)
- 📊 Dashboard with statistics
- 📦 Order management
- 🔄 Order status updates (On Process → Shipped → Delivered)
- 📈 Product inventory management
- ⚠️ Low stock alerts
- 📝 Stock updates

## 🎯 User Flow

### Shopping Flow
1. Browse homepage → View featured products & categories
2. Click "Products" → See all products with filters
3. Search/Filter → Find specific products
4. Click product → View details
5. Add to cart/wishlist
6. Login with Google (if not logged in)
7. View cart → Adjust quantities
8. Checkout → Select/Add delivery address
9. Confirm order
10. View in Dashboard → Track order status

### Admin Flow
1. Login with admin@shophub.com
2. Access Admin Panel (Shield icon in navbar)
3. View statistics dashboard
4. Manage orders → Update status
5. Manage products → Update stock levels

## 🧪 Testing

### Test Scenarios

1. **Browse Products**
   - Open http://localhost:5173
   - View homepage with featured products
   - Click "Products" to see all items

2. **Search & Filter**
   - Use search bar to find products
   - Filter by category (Electronics, Fashion, Sports, Home)
   - Sort by price/rating/name

3. **Stock Validation**
   - Find products with stock = 0 (ID 2, 7 in default data)
   - Try to add to cart → Should show error
   - Try to add to wishlist → Should show error

4. **User Authentication**
   - Click "Login" button
   - Sign in with Google
   - Verify profile appears in navbar

5. **Shopping Cart**
   - Add products to cart
   - Increase/decrease quantities
   - Verify stock limits
   - Remove items
   - View cart total with tax

6. **Wishlist**
   - Add products to wishlist (requires login)
   - View in dashboard
   - Move to cart from wishlist

7. **Checkout Process**
   - Go to cart → Click "Proceed to Checkout"
   - Add new delivery address
   - Select address
   - Place order
   - Verify order appears in dashboard

8. **Admin Panel** (Use admin@shophub.com)
   - Access admin panel (Shield icon)
   - View statistics
   - Update order status
   - Update product stock
   - Verify low stock alerts

## 🛠️ Project Structure

```
shophub-ecommerce/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx           # Navigation with cart/wishlist badges
│   │   │   └── Footer.jsx           # Footer component
│   │   ├── product/
│   │   │   └── ProductCard.jsx      # Reusable product card
│   │   └── auth/
│   │       └── ProtectedRoute.jsx   # Route protection HOC
│   ├── pages/
│   │   ├── Home.jsx                 # Homepage with featured products
│   │   ├── Products.jsx             # All products with filters
│   │   ├── ProductDetail.jsx        # Single product view
│   │   ├── Cart.jsx                 # Shopping cart
│   │   ├── Checkout.jsx             # Checkout with address selection
│   │   ├── Dashboard.jsx            # User dashboard
│   │   ├── AdminPanel.jsx           # Admin management
│   │   └── Login.jsx                # Google OAuth login
│   ├── store/
│   │   ├── authStore.js             # Authentication state (Zustand)
│   │   └── cartStore.js             # Cart & wishlist state (Zustand)
│   ├── services/
│   │   ├── firebase.js              # Firebase config & auth
│   │   └── api.js                   # API calls to JSON server
│   ├── App.jsx                      # Main app with routing
│   ├── main.jsx                     # Entry point
│   └── index.css                    # Tailwind styles
├── db.json                          # JSON Server database
├── package.json
└── README.md
```

## 📝 Key Technologies

- **React 18** - UI library
- **Vite** - Build tool
- **React Router v6** - Routing
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Firebase Auth** - Google OAuth
- **JSON Server** - Mock backend
- **Axios** - HTTP client
- **Lucide React** - Icons
- **React Hot Toast** - Notifications

## 🎨 Design Features

- **Professional UI** - Clean, modern design inspired by major e-commerce sites
- **Responsive** - Works on desktop, tablet, and mobile
- **Smooth Animations** - Hover effects and transitions
- **Loading States** - Skeleton screens for better UX
- **Toast Notifications** - User feedback for actions
- **Status Badges** - Visual order status indicators
- **Stock Warnings** - Out-of-stock and low-stock alerts

## 🔒 Security Features

- **Firebase Authentication** - Secure Google OAuth
- **Protected Routes** - Login required for checkout/dashboard
- **Admin Role Check** - Admin-only routes
- **Stock Validation** - Prevents overselling
- **User-specific Data** - Orders/addresses tied to user ID

## 📦 Default Data

The project includes 12 sample products:
- 2 out-of-stock items (to test stock validation)
- Products across 4 categories
- Various price ranges
- Rating and review counts

## 🚨 Troubleshooting

### Backend not starting?
```bash
# Make sure you're in the project directory
cd shophub-ecommerce
# Kill any process on port 5000
npx kill-port 5000
# Restart backend
npm run server
```

### Frontend errors?
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Firebase auth not working?
- Check .env file exists and has correct values
- Verify Google auth is enabled in Firebase Console
- Add localhost:5173 to authorized domains in Firebase

### Port conflicts?
```bash
# Backend (5000)
npx kill-port 5000

# Frontend (5173)
npx kill-port 5173
```

## 🎯 Interview Requirements Checklist

✅ **Admin Simulation & Product Management**
- Uses JSON Server for products/categories
- Dynamic product display with real data
- Search by product name/description
- Sort by price/rating/name
- Filter by category
- Stock validation (0 stock blocks cart/wishlist)

✅ **User Authentication & Dashboard**
- Google OAuth via Firebase
- "My Account" in nav with Logout
- User Dashboard with:
  - Wishlist tab
  - Order History tab with status
  - Cart summary

✅ **Checkout & Order Flow**
- Multiple address support
- Address selection in checkout
- Order confirmation (payment simulated)
- Admin can update order status:
  - On Process (default)
  - Shipped
  - Delivered
- Real-time status updates visible to user

## 📧 Support

For issues or questions:
- Check SETUP_GUIDE.md
- Review error messages in browser console
- Verify all services are running
- Check Firebase configuration

## 🎉 Success!

If everything is set up correctly:
1. Backend runs on http://localhost:5000
2. Frontend runs on http://localhost:5173
3. You can login with Google
4. Admin features work with admin@shophub.com
5. Orders flow from cart → checkout → dashboard
6. Stock validation works correctly

**Happy Shopping! 🛍️**
