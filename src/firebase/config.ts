import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
// Replace these with your actual Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyDMy78y-NxWW2mTFxoA4o0UMQiZR-uySYY",
  authDomain: "ecoreviewer-b8c33.firebaseapp.com",
  projectId: "ecoreviewer-b8c33",
  storageBucket: "ecoreviewer-b8c33.firebasestorage.app",
  messagingSenderId: "432382138485",
  appId: "1:432382138485:web:7a8d982a9eac52e3f3803c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
