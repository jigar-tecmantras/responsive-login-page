import { useState } from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

const viewOptions = [
  { id: "login", label: "Sign in" },
  { id: "register", label: "Register" }
];

function App() {
  const [view, setView] = useState("login");

  return (
    <div className="app-shell">
      <div className="view-switch" role="tablist" aria-label="Authentication options">
        {viewOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`switch-btn ${view === option.id ? "active" : ""}`}
            onClick={() => setView(option.id)}
            role="tab"
            aria-selected={view === option.id}
          >
            {option.label}
          </button>
        ))}
      </div>

      {view === "login" ? <LoginPage /> : <RegisterPage />}
    </div>
  );
}

export default App;
