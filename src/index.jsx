// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { StrictMode } from "react";

import { FAQ, Contact, Home, ToS, Summary } from "./pages";

import { Footer, Header } from "./common";

import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
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
      <ToastContainer position="bottom-right" />
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
