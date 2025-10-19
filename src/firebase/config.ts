import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  setPersistence, 
  browserLocalPersistence,
  browserSessionPersistence, 
  Auth
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Check if we have valid Firebase config
const hasValidConfig = 
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== "your_api_key_here" &&
  firebaseConfig.projectId && 
  firebaseConfig.projectId !== "your_project_id_here";

let app = null;
let auth: Auth | null = null;
let googleProvider = null;
let db = null;

if (hasValidConfig) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    
    // Configure Google Auth Provider
    googleProvider = new GoogleAuthProvider();
    
    // Add these configurations to improve popup compatibility
    googleProvider.setCustomParameters({
      display: 'popup',
      prompt: 'select_account',
      ux_mode: 'popup'
    });
    
    // Configure auth settings for better compatibility
    auth.useDeviceLanguage();
    
    // Set persistence (optional, but recommended)
    setPersistence(auth, browserLocalPersistence)
      .catch((error) => {
        console.warn('Persistence setting failed:', error);
        // Fallback to session persistence
        return setPersistence(auth, browserSessionPersistence);
      });
      
    console.log('Firebase initialized successfully');
    
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }
} else {
  console.warn('Firebase config not found or invalid. Using demo mode.');
}

export { auth, googleProvider, db, hasValidConfig };