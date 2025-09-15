import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Onboarding } from "./components/ui/onboarding.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Onboarding />
  </StrictMode>
);
