import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api";

export function AdminLoginPage({ onLogin, currentSession }) {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ username: "admin", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (currentSession?.token) {
      navigate("/admin", { replace: true });
    }
  }, [currentSession, navigate]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await apiRequest("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(formState),
      });
      onLogin(response);
      navigate("/admin", { replace: true });
    } catch (requestError) {
      setError(
        requestError.message ||
          "Seller Hub needs the backend API running before login can succeed."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="section-block">
      <div className="container">
        <div className="admin-login-shell">
          <div className="admin-story">
            <p className="eyebrow text-white-50">Seller Hub</p>
            <h1 className="display-6 text-white mb-3">
              Operate the marketplace from one secure dashboard.
            </h1>
            <p className="text-white-50">
              Keep the storefront customer-facing and energetic while products, orders, users, and reporting stay organized behind the scenes.
            </p>
            <ul className="story-list mt-4">
              <li>JWT-protected admin access</li>
              <li>Catalog CRUD and order state updates</li>
              <li>User records and reporting already wired in</li>
            </ul>
          </div>

          <div className="content-panel login-panel">
            <p className="eyebrow mb-2">Secure admin access</p>
            <h2 className="h2 mb-3">Use your configured seller credentials</h2>
            <p className="section-copy">
              Local seed username is <code>admin</code>. Set <code>APP_ADMIN_PASSWORD</code> before deployment so the default seeded password is replaced with your own secure value.
            </p>
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-12">
                <label className="form-label">Username</label>
                <input
                  className="form-control"
                  value={formState.username}
                  onChange={(event) =>
                    setFormState((current) => ({
                      ...current,
                      username: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="col-12">
                <label className="form-label">Password</label>
                <input
                  className="form-control"
                  type="password"
                  value={formState.password}
                  onChange={(event) =>
                    setFormState((current) => ({
                      ...current,
                      password: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="col-12 d-flex flex-wrap gap-3 align-items-center">
                <button type="submit" className="btn-market" disabled={isSubmitting}>
                  {isSubmitting ? "Signing in..." : "Enter seller hub"}
                </button>
                {error ? <span className="text-danger">{error}</span> : null}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
