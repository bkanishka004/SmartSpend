import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SignIn.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faArrowRight,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ email: "", password: "" });

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (!email) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email format";
      valid = false;
    }

    if (!password) {
      errors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setError(errors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (validateForm()) {
      setTimeout(() => {
        setLoading(false);
        navigate("/dashboard");
      }, 1500);
    } else {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleGoogleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div className="signin">
      <div className="signin-container">
        <div className="text-center">
          <p>
            Log in to <span className="bold-text">Smart Spend</span>
          </p>
        </div>

        <div className="form-group">
          <button className="btn-fullwidth" onClick={handleGoogleLogin}>
            <FontAwesomeIcon icon={faGoogle} className="icon" />
            Continue with Google
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group input-icon-container">
            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
            <input
              type="email"
              className={`form-control ${error.email ? "is-invalid" : ""}`}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error.email && (
              <div className="invalid-feedback">{error.email}</div>
            )}
          </div>

          <div className="form-group input-icon-container">
            <FontAwesomeIcon icon={faLock} className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              className={`form-control ${error.password ? "is-invalid" : ""}`}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="toggle-password"
              onClick={togglePasswordVisibility}
            />
            {error.password && (
              <div className="invalid-feedback">{error.password}</div>
            )}
          </div>

          <div className="form-group">
            <button type="submit" className="btn-login" disabled={loading}>
              Log in <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>

          {loading && <div className="loading-msg">Logging in...</div>}
        </form>

        <div className="text-center">
          <Link to="/dashboard" className="forgot-password dark-link">
            Forgot password?
          </Link>
          <p>
            Don't have an account?{" "}
            <Link to="/dashboard" className="dark-link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
