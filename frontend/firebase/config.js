
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,signInWithRedirect} from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyC0BPELX36Py2ZTANUPJcpFWNTc2fCSZss",
  authDomain: "travel-project-9fbdb.firebaseapp.com",
  databaseURL: "https://travel-project-9fbdb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "travel-project-9fbdb",
  storageBucket: "travel-project-9fbdb.firebasestorage.app",
  messagingSenderId: "677368453242",
  appId: "1:677368453242:web:ab904310a4e338667643c3",
  measurementId: "G-GLREZZ0EZF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export default app;
