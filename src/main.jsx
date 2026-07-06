import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { PointsProvider } from "./context/PointsContext";
import { HistoryProvider } from "./context/HistoryContext";
import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <PointsProvider>
        <HistoryProvider>
          <App />

          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#18181b",
                color: "#fff",
                border: "1px solid rgba(255,255,255,.1)",
              },
            }}
          />
        </HistoryProvider>
      </PointsProvider>
    </AuthProvider>
  </BrowserRouter>,
);
