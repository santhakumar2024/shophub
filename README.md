# ShopHub - Professional E-commerce Platform

A full-featured e-commerce platform with admin simulation, built with React, Firebase Authentication, and JSON Server.

## Features

### User Features
- 🔐 Google OAuth Authentication (Firebase)
- 🛍️ Browse products with dynamic search and filtering
- 🛒 Shopping cart management
- ❤️ Wishlist functionality
- 📦 Order history tracking
- 📍 Multiple shipping addresses
- 🔄 Real-time order status updates

### Admin Features
- 📊 Product management
- 📈 Order status management (On Process → Shipped → Delivered)
- 📦 Stock management
- 📋 Category management

### Technical Features
- Stock validation (0 stock = no cart/wishlist)
- Dynamic search and sorting
- Responsive design
- Professional UI/UX
- State management with Zustand

## Installation

```bash
# Install dependencies
npm install

# Start JSON Server (Backend)
npm run server
# Backend runs on port 5000
# Frontend runs on port 5173

# Start Development Server (Frontend)
npm run dev

# Build for production
npm run build
```

## Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Google Authentication
3. Copy your Firebase config
4. Create `.env` file in root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Usage

### User Flow
1. Browse products on homepage
2. Login with Google
3. Add products to cart/wishlist
4. Select shipping address
5. Checkout and confirm order
6. View order status in dashboard

### Admin Flow
1. Access admin panel (admin@shophub.com)
2. Manage products and stock
3. Update order statuses
4. View analytics

## Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: Zustand
- **Authentication**: Firebase Auth
- **Backend**: JSON Server
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## Project Structure

```
shophub-ecommerce/
├── public/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   ├── product/
│   │   ├── cart/
│   │   └── admin/
│   ├── pages/
│   ├── store/
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── db.json
├── package.json
└── README.md
```

## API Endpoints

- `GET /products` - Get all products
- `GET /products/:id` - Get single product
- `GET /categories` - Get all categories
- `POST /orders` - Create order
- `GET /orders` - Get all orders
- `PATCH /orders/:id` - Update order status
- `GET /addresses` - Get user addresses
- `POST /addresses` - Add new address

## Default Admin Credentials

- Email: admin@shophub.com (use for admin features)

## License

MIT

---

**Built with ❤️ for React Developers**
