import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, LogOut, LayoutDashboard, Shield } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import useCartStore from '../../store/cartStore';
import { logout } from '../../services/firebase';
import toast from 'react-hot-toast';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, logout: logoutStore } = useAuthStore();
  const { getCartItemsCount, wishlist } = useCartStore();

  const handleLogout = async () => {
    try {
      await logout();
      logoutStore();
      toast.success('Logged out successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  // new helper: produce 1 or 2-letter initials from displayName or email
  const getInitials = (u) => {
    const nameOrEmail = (u?.displayName || u?.email || '').trim();
    if (!nameOrEmail) return 'U';
    const parts = nameOrEmail.split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    // if single word (or email), use first two characters (letters) if available
    const firstTwo = nameOrEmail.replace(/[^A-Za-z]/g, '').slice(0, 2);
    return (firstTwo || nameOrEmail[0]).toUpperCase();
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">ShopHub</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium transition">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-primary-600 font-medium transition">
              Products
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-primary-600 transition">
              <ShoppingCart className="w-6 h-6" />
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartItemsCount()}
                </span>
              )}
            </Link>

            {isAuthenticated && (
              <div className="relative p-2 text-gray-700">
                <Heart className="w-6 h-6" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </div>
            )}

            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center text-white font-bold"
                      aria-hidden="true"
                      title={user?.displayName || user?.email || 'User'}
                    >
                      {getInitials(user)}
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">
                    {user?.displayName}
                  </span>
                </div>
                
                <Link
                  to="/dashboard"
                  className="p-2 text-gray-700 hover:text-primary-600 transition"
                  title="My Dashboard"
                >
                  <LayoutDashboard className="w-6 h-6" />
                </Link>

                {isAdmin && (
                  <Link
                    to="/admin"
                    className="p-2 text-primary-600 hover:text-primary-700 transition"
                    title="Admin Panel"
                  >
                    <Shield className="w-6 h-6" />
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-700 hover:text-red-600 transition"
                  title="Logout"
                >
                  <LogOut className="w-6 h-6" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 btn-primary"
              >
                <User className="w-5 h-5" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
