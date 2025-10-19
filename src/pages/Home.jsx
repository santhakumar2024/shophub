import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, TrendingUp, Shield, Truck, CreditCard, AlertCircle, Settings } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import { getProducts, getCategories } from '../services/api';
import useAuthStore from '../store/authStore';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { isAdmin, user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories()
        ]);
        setProducts(productsData.slice(0, 8));
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Make sure the backend server is running on http://localhost:5000');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Debug: log auth state changes
  useEffect(() => {
    console.log('Auth state updated:', { isAuthenticated, isAdmin, user });
  }, [isAuthenticated, isAdmin, user]);

  const handleAdminLogin = () => {
    console.log('Admin button clicked. Current auth state:', { isAuthenticated, isAdmin, user });
    
    if (isAdmin) {
      console.log('User is admin, navigating to /admin');
      navigate('/admin');
    } else if (isAuthenticated) {
      console.log('User is authenticated but not admin, showing message');
      alert('You need admin privileges to access the admin panel.');
      // Optionally navigate to user dashboard instead
      // navigate('/dashboard');
    } else {
      console.log('User not authenticated, navigating to /login');
      navigate('/login');
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Connection Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500 mb-4">
            Please run: <code className="bg-gray-200 px-2 py-1 rounded">npm run server</code>
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to ShopHub
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Discover amazing products at unbeatable prices
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/products" className="inline-flex items-center space-x-2 bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                <span>Shop Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              {/* Admin Login Button */}
              <button
                onClick={handleAdminLogin}
                className="inline-flex items-center space-x-2 border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition"
              >
                <Settings className="w-5 h-5" />
                <span>
                  {isAdmin ? 'Admin Panel' : 
                   isAuthenticated ? 'Admin Access' : 'Admin Login'}
                </span>
              </button>
            </div>
            
            {/* Debug info - remove in production */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-4 text-xs text-primary-200">
                Debug: Auth: {isAuthenticated ? 'Yes' : 'No'}, 
                Admin: {isAdmin ? 'Yes' : 'No'}, 
                User: {user ? user.email : 'None'}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Rest of your component remains the same */}
      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-block p-4 bg-primary-100 rounded-full mb-4">
                <Truck className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Free Shipping</h3>
              <p className="text-gray-600 text-sm">On orders over $50</p>
            </div>
            <div className="text-center">
              <div className="inline-block p-4 bg-primary-100 rounded-full mb-4">
                <Shield className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Secure Payment</h3>
              <p className="text-gray-600 text-sm">100% secure transactions</p>
            </div>
            <div className="text-center">
              <div className="inline-block p-4 bg-primary-100 rounded-full mb-4">
                <CreditCard className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Easy Returns</h3>
              <p className="text-gray-600 text-sm">30-day return policy</p>
            </div>
            <div className="text-center">
              <div className="inline-block p-4 bg-primary-100 rounded-full mb-4">
                <TrendingUp className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Best Prices</h3>
              <p className="text-gray-600 text-sm">Competitive pricing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.slug}`}
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <h3 className="text-white font-semibold text-lg p-4">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <Link to="/products" className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1">
              <span>View All</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;