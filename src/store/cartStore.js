import { create } from 'zustand';
import toast from 'react-hot-toast';

const useCartStore = create((set, get) => ({
  cart: [],
  wishlist: [],
  
  // Initialize from localStorage
  initCart: () => {
    try {
      const storedCart = localStorage.getItem('cart-storage');
      if (storedCart) {
        const { cart, wishlist } = JSON.parse(storedCart);
        set({ cart: cart || [], wishlist: wishlist || [] });
      }
    } catch (error) {
      console.error('Error initializing cart:', error);
    }
  },
  
  // Persist to localStorage
  persistCart: () => {
    const { cart, wishlist } = get();
    localStorage.setItem('cart-storage', JSON.stringify({ cart, wishlist }));
  },
  
  addToCart: (product) => {
    const { cart, persistCart } = get();
    const existingItem = cart.find(item => item.id === product.id);
    
    if (product.stock === 0) {
      toast.error('Product is out of stock!');
      return;
    }
    
    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        toast.error('Cannot add more than available stock!');
        return;
      }
      set({
        cart: cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
      toast.success('Quantity updated in cart!');
    } else {
      set({ cart: [...cart, { ...product, quantity: 1 }] });
      toast.success('Added to cart!');
    }
    persistCart();
  },
  
  removeFromCart: (productId) => {
    const { persistCart } = get();
    set({ cart: get().cart.filter(item => item.id !== productId) });
    toast.success('Removed from cart!');
    persistCart();
  },
  
  updateQuantity: (productId, quantity) => {
    const { cart, persistCart } = get();
    const item = cart.find(item => item.id === productId);
    
    if (quantity > item.stock) {
      toast.error('Cannot exceed available stock!');
      return;
    }
    
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    
    set({
      cart: cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ),
    });
    persistCart();
  },
  
  clearCart: () => {
    const { persistCart } = get();
    set({ cart: [] });
    persistCart();
  },
  
  getCartTotal: () => {
    return get().cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },
  
  getCartItemsCount: () => {
    return get().cart.reduce((total, item) => total + item.quantity, 0);
  },
  
  addToWishlist: (product) => {
    const { wishlist, persistCart } = get();
    
    if (product.stock === 0) {
      toast.error('Cannot add out of stock items to wishlist!');
      return;
    }
    
    if (wishlist.find(item => item.id === product.id)) {
      toast.error('Already in wishlist!');
      return;
    }
    
    set({ wishlist: [...wishlist, product] });
    toast.success('Added to wishlist!');
    persistCart();
  },
  
  removeFromWishlist: (productId) => {
    const { persistCart } = get();
    set({ wishlist: get().wishlist.filter(item => item.id !== productId) });
    toast.success('Removed from wishlist!');
    persistCart();
  },
  
  isInWishlist: (productId) => {
    return get().wishlist.some(item => item.id === productId);
  },
}));

// Initialize cart on load
useCartStore.getState().initCart();

export default useCartStore;
