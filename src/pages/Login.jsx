import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

import {
  loginUser,
  forgotPassword
} from "../services/api";

import "../styles/Auth.css";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  // ================= LOGIN =================

  const handleLogin = async (e) => {

    e.preventDefault();

    if (!formData.email) {
      setError("Please enter your email.");
      return;
    }

    if (!formData.password) {
      setError("Please enter your password.");
      return;
    }

    try {

      setLoading(true);

      const response =
        await loginUser(formData);

      console.log(response);

      localStorage.setItem(
        "token",
        response.token
      );

      localStorage.setItem(
        "userEmail",
        response.email
      );

      localStorage.setItem(
        "username",
        response.username
      );

      localStorage.setItem(
        "userId",
        response.userId
      );

      navigate("/home");

    } catch (error) {

      console.log(error);

      setError(
        "Invalid email or password."
      );

    } finally {

      setLoading(false);

    }
  };

  // ================= FORGOT PASSWORD =================

  const handleForgotPassword =
    async () => {

      if (!formData.email) {

        setError(
          "Please enter your email first."
        );

        return;
      }

      try {

        const response =
          await forgotPassword(
            formData.email
          );

        alert(response);

      } catch (error) {

        console.log(error);

        setError(
          "Failed to send reset link."
        );
      }
    };

  return (

    <div className="auth-page">

      <div className="background-circle circle-one"></div>
      <div className="background-circle circle-two"></div>

      <motion.div
        className="auth-card"
        initial={{
          opacity: 0,
          y: 40,
          scale: 0.95
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1
        }}
        transition={{
          duration: 0.5
        }}
      >

        {/* Logo */}

        <div className="brand">

          <div className="brand-icon">
            💬
          </div>

          <h1>
            Chat<span>Sphere</span>
          </h1>

        </div>

        <h2>
          Welcome Back 👋
        </h2>

        <p className="auth-subtitle">
          Login to continue chatting
        </p>

        {/* Error */}

        {error && (

          <div className="error-message">
            ⚠️ {error}
          </div>

        )}

        <form onSubmit={handleLogin}>

          {/* Email */}

          <div className="input-group">

            <span>✉️</span>

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />

          </div>

          {/* Password */}

          <div className="input-group">

            <span>🔒</span>

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >
              {showPassword
                ? "🙈"
                : "👁️"}
            </button>

          </div>

          {/* Forgot Password */}

          <div className="forgot-container">

            <button
              type="button"
              onClick={
                handleForgotPassword
              }
            >
              Forgot Password?
            </button>

          </div>

          {/* Login */}

          <motion.button
            whileHover={{
              scale: 1.02
            }}
            whileTap={{
              scale: 0.98
            }}
            type="submit"
            className="auth-button"
            disabled={loading}
          >

            {loading
              ? "Logging in..."
              : "Login →"}

          </motion.button>

        </form>

        <div className="auth-footer">

          Don't have an account?

          <Link to="/register">
            Create Account
          </Link>

        </div>

      </motion.div>

    </div>
  );
}

export default Login;