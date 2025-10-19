import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  
  setUser: (user) => {
    const isAdmin = user?.email === 'admin@shophub.com';
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
