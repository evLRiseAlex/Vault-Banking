// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { StrictMode } from "react";

import { FAQ, Contact, Home, ToS, Summary, Profile } from "./pages";

import { Footer, Header, ProtectedRoute } from "./common";
import { DialogueProvider } from "./common/components/header";

import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <DialogueProvider>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
              </>
            }
          />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms" element={<ToS />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/summary"
            element={
              <ProtectedRoute>
                <Summary />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile></Profile>
              </ProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer position="bottom-right" />
        <Footer />
      </DialogueProvider>
    </BrowserRouter>
  </StrictMode>
);
