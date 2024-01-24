import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "./components/GlobalStyle";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <GlobalStyle />
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
