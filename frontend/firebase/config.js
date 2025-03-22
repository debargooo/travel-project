
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,signInWithRedirect} from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyBWjo4BHNZlwggpoOfQISigZb1b4OpiGok",
  authDomain: "travel-project2025.firebaseapp.com",
  projectId: "travel-project2025",
  storageBucket: "travel-project2025.firebasestorage.app",
  messagingSenderId: "717992631607",
  appId: "1:717992631607:web:4a51478e5fcf5b26bf4eb2",
  measurementId: "G-TRCBWXKSSD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export default app;
