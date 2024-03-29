import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "./components/style/GlobalStyle.tsx";
import { PostProvider } from "./context";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <React.StrictMode>
      <PostProvider>
        <GlobalStyle />
        <App />
      </PostProvider>
    </React.StrictMode>
  </BrowserRouter>
);
