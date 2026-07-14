import { useState } from "react";

const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

const validate = (values) => {
  const issues = {};

  if (!values.email) {
    issues.email = "Email is required.";
  } else if (!emailPattern.test(values.email)) {
    issues.email = "Enter a valid email address.";
  }

  if (!values.password) {
    issues.password = "Password is required.";
  } else if (values.password.length < 8) {
    issues.password = "Password must be at least 8 characters.";
  }

  return issues;
};

function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const nextValue = type === "checkbox" ? checked : value;
    const nextForm = { ...form, [name]: nextValue };
    setForm(nextForm);
    setErrors(validate(nextForm));
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validations = validate(form);
    setErrors(validations);
    setTouched({
      email: true,
      password: true
    });

    if (Object.keys(validations).length === 0) {
      setIsSubmitting(true);
      setStatusMessage("");
      setTimeout(() => {
        setIsSubmitting(false);
        setStatusMessage("Signed in successfully. Welcome back!");
      }, 1200);
    }
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <section className="login-page" aria-live="polite">
      <div className="login-card">
        <div className="brand">
          <span className="brand-icon" aria-hidden="true">
            ⚡
          </span>
          <div>
            <h1>Secure Portal</h1>
            <p>Sign in to continue to your dashboard.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <label
            className={`form-field ${errors.email && touched.email ? "has-error" : ""}`}
            htmlFor="email"
          >
            <span>Email address</span>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="you@example.com"
              autoComplete="email"
              aria-invalid={!!errors.email}
            />
            {errors.email && touched.email && <p className="error-text">{errors.email}</p>}
          </label>

          <label
            className={`form-field ${errors.password && touched.password ? "has-error" : ""}`}
            htmlFor="password"
          >
            <span>Password</span>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="At least 8 characters"
              autoComplete="current-password"
              aria-invalid={!!errors.password}
            />
            {errors.password && touched.password && (
              <p className="error-text">{errors.password}</p>
            )}
          </label>

          <div className="field-options">
            <label className="checkbox-wrapper">
              <input
                type="checkbox"
                name="rememberMe"
                checked={form.rememberMe}
                onChange={handleChange}
              />
              <span>Remember me</span>
            </label>
            <a className="ghost-link" href="#" onClick={(event) => event.preventDefault()}>
              Forgot password?
            </a>
          </div>

          {statusMessage && <p className="success-text">{statusMessage}</p>}

          <button
            type="submit"
            className="submit-btn"
            disabled={hasErrors || isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default LoginPage;
