import { initializeApp } from "firebase/app";
import { getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAJrXbOZZqri-RpjxBONK3B32Pk2YGksj0",
  authDomain: "chat-f60b9.firebaseapp.com",
  projectId: "chat-f60b9",
  storageBucket: "chat-f60b9.appspot.com",
  messagingSenderId: "669312349462",
  appId: "1:669312349462:web:3670bfaf36ec6afdcb8c37",
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
