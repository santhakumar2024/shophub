import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import useCartStore from '../../store/cartStore';
import useAuthStore from '../../store/authStore';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart, addToWishlist, isInWishlist } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }
    addToCart(product);
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to add items to wishlist');
      return;
    }
    addToWishlist(product);
  };

  const isOutOfStock = product.stock === 0 || product.stock == null;

  return (
    <Link to={`/products/${product.id}`} className="group block h-full">
      <div className="card hover:shadow-xl transition-shadow duration-300 flex flex-col h-105 overflow-hidden">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
          />

          {isOutOfStock && (
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
              <span className="text-white font-bold text-lg">OUT OF STOCK</span>
            </div>
          )}

          {!isOutOfStock && (
            <button
              onClick={handleAddToWishlist}
              className={`absolute top-3 right-3 p-2 rounded-full transition ${
                isInWishlist(product.id)
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-red-500 hover:text-white'
              }`}
            >
              <Heart className="w-5 h-5" fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
            </button>
          )}
        </div>

        {/* content area - flex-1 so footer stays at bottom */}
        <div className="p-4 flex-1 flex flex-col min-h-0 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-sm text-primary-600 font-medium">{product.category}</span>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-xs text-gray-500">({product.reviews})</span>
            </div>
          </div>

          <h3
            className="font-semibold text-gray-900 group-hover:text-primary-600 transition mt-2 w-full overflow-hidden whitespace-nowrap text-ellipsis"
            title={product.title}
          >
            {product.title}
          </h3>

          <p className="text-sm text-gray-600 line-clamp-2 mt-2 flex-shrink-0">
            {product.description}
          </p>

          {/* spacer = pushes footer to bottom */}
          <div className="mt-4 flex-1" />

          {/* footer: left meta + price on one row, full-width button below */}
          <div className="pt-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-primary-600 font-medium">{product.category}</span>
                <div className="flex items-center space-x-1 mt-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-xs text-gray-500">({product.reviews})</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">${product.price}</div>
                <div className="text-sm text-gray-500">
                  {product.stock != null ? `${product.stock} items available` : 'Availability unknown'}
                </div>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className={
                'btn-primary mt-3 w-full flex items-center justify-center space-x-2 ' +
                (isOutOfStock ? 'opacity-60 cursor-not-allowed bg-gray-400 hover:bg-gray-400' : '')
              }
              disabled={isOutOfStock}
              aria-disabled={isOutOfStock}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>{isOutOfStock ? 'Out of stock' : 'Add to Cart'}</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
