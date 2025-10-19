import { 
  signInWithPopup, 
  signInWithRedirect, 
  getRedirectResult,
  onAuthStateChanged,
  signOut 
} from "firebase/auth";
import { auth, googleProvider, hasValidConfig } from "../firebase/config";

// Demo mode fallback
const isDemoMode = !hasValidConfig;

export const signInWithGoogle = async () => {
  if (isDemoMode) {
    // Demo mode implementation
    const demoUser = {
      uid: 'demo-uid',
      displayName: 'Demo User',
      email: 'demo@example.com',
      photoURL: null
    };
    return demoUser;
  }

  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Popup sign-in error:", error);
    
    // If popup fails due to COOP policy, throw specific error
    if (error.code === 'auth/popup-blocked' || 
        error.message?.includes('Cross-Origin-Opener-Policy')) {
      throw new Error('POPUP_BLOCKED');
    }
    throw error;
  }
};

export const signInWithGoogleRedirect = async () => {
  if (isDemoMode) {
    // For demo, just return a demo user
    const demoUser = {
      uid: 'demo-uid',
      displayName: 'Demo User',
      email: 'demo@example.com',
      photoURL: null
    };
    return demoUser;
  }

  try {
    await signInWithRedirect(auth, googleProvider);
    // The redirect will happen, no return value needed
  } catch (error) {
    console.error("Redirect sign-in error:", error);
    throw error;
  }
};

export const getRedirectResultAuth = async () => {
  if (isDemoMode) return null;
  
  try {
    const result = await getRedirectResult(auth);
    return result;
  } catch (error) {
    console.error("Redirect result error:", error);
    throw error;
  }
};

export const onAuthChange = (callback) => {
  if (isDemoMode) {
    // Demo mode: immediately call with null
    callback(null);
    return () => {}; // No-op unsubscribe
  }
  
  return onAuthStateChanged(auth, callback);
};

export const logout = async () => {
  if (isDemoMode) {
    return; // No-op for demo
  }
  
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

export { isDemoMode };