import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Layout from "../components/Layout";
import { PopupProvider } from "../context/popUp.context.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthWrapper } from "../context/auth.context.jsx";
createRoot(document.getElementById("root")).render(
  <AuthWrapper>
    <BrowserRouter>
      <PopupProvider>
        <StrictMode>
          <Layout>
            <App />
          </Layout>
        </StrictMode>
      </PopupProvider>
    </BrowserRouter>
  </AuthWrapper>
);
