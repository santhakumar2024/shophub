import { create } from 'zustand';

// List of admin emails - add your email here
const ADMIN_EMAILS = [
  'santhakumar292002@gmail.com',
  'admin@shophub.com' // keep the existing one if needed
];

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  
  setUser: (user) => {
    // Check if user's email is in the admin emails list
    const isAdmin = user?.email ? ADMIN_EMAILS.includes(user.email.toLowerCase()) : false;
    
    console.log('Setting user:', user?.email, 'Is admin:', isAdmin);
    
    set({ 
      user, 
      isAuthenticated: !!user,
      isAdmin
    });
    
    // Persist to localStorage
    if (user) {
      localStorage.setItem('auth-user', JSON.stringify({ user, isAdmin }));
    } else {
      localStorage.removeItem('auth-user');
    }
  },
  
  logout: () => {
    set({ 
      user: null, 
      isAuthenticated: false,
      isAdmin: false
    });
    localStorage.removeItem('auth-user');
  },
  
  // Initialize from localStorage
  initAuth: () => {
    try {
      const stored = localStorage.getItem('auth-user');
      if (stored) {
        const { user, isAdmin } = JSON.parse(stored);
        console.log('Initializing from storage:', user?.email, 'Is admin:', isAdmin);
        set({ 
          user, 
          isAuthenticated: !!user,
          isAdmin
        });
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
    }
  }
}));

// Initialize auth on load
useAuthStore.getState().initAuth();

export default useAuthStore;