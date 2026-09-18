import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaRobot
} from "react-icons/fa";
import api from "../services/api";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("username", email);
      formData.append("password", password);

      const response = await api.post("/auth/login", formData);

      localStorage.setItem("token", response.data.access_token);

      console.log("Token:", response.data.access_token);

      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.detail);
      } else {
        alert("Unable to connect to server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">

      {/* Left Side */}

      <div className="login-left">

        <div className="overlay">

          <FaRobot className="logo-icon" />

          <h1>AI Email Composer</h1>

          <p>
            Generate professional emails in seconds using
            <strong> Gemini AI</strong>.
          </p>

          <div className="feature-list">

            <div className="feature-card">
              ✨ AI Powered Email Generation
            </div>

            <div className="feature-card">
              🔒 Quick and Easy E-mail Generation
            </div>

            <div className="feature-card">
              📧 Email History & Dashboard
            </div>

            <div className="feature-card">
              ⚡ FastAPI + React + MySQL
            </div>

          </div>

        </div>

      </div>

      {/* Right Side */}

      <div className="login-right">

        <form className="login-card" onSubmit={handleLogin}>

          <h2>Welcome Back 👋</h2>

          <p>Sign in to continue</p>

          <div className="input-box">

            <FaEnvelope className="input-icon" />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />

          </div>

          <div className="input-box">

            <FaLock className="input-icon" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />

            <span
              className="eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash/> : <FaEye/>}
            </span>

          </div>

          <button className="login-btn" disabled={loading}>

            {loading ? "Logging in..." : "Login"}

          </button>

          <div className="register-link">

            Don't have an account?

            <Link to="/register">

              Register

            </Link>

          </div>

        </form>

      </div>

    </div>
  );
}

export default Login;