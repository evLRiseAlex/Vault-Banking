// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";

import { FAQ, Contact, Home, ToS, Summary } from "./pages";

import { Footer, Header } from "./common";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAwgByneC8rpwU3Hs8uZul7cV9geI4vR8",
  authDomain: "home-bank-ec59c.firebaseapp.com",
  projectId: "home-bank-ec59c",
  storageBucket: "home-bank-ec59c.firebasestorage.app",
  messagingSenderId: "552418934236",
  appId: "1:552418934236:web:0ee334fbf43c4de7a1a319",
  measurementId: "G-FVMX9C4C6W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

export { db };

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/terms" element={<ToS />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/summary" element={<Summary />} />
      <Route path="/account" element={<></>} />
    </Routes>
    <Footer />
  </BrowserRouter>
  // </StrictMode>
);
