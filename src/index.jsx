// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Components/Header";
import HomePage from "./Components/HomePage";

import { FAQ, Contact } from "./pages";
import ToS from "./Components/ToS";
import { Footer } from "./common";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/terms" element={<ToS />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
    <Footer />
  </BrowserRouter>
  // </StrictMode>
);
