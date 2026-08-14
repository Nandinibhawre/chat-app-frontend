import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/Auth.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: null,
  });

  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Profile image must be less than 2MB.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      profilePic: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username.trim()) {
      setError("Please enter your username.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      // Add your register API here
      console.log(formData);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("Account created successfully!");

      navigate("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      {/* Background circles */}

      <div className="background-circle circle-one"></div>
      <div className="background-circle circle-two"></div>

      <motion.div
        className="auth-card register-card"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
      >

        {/* Logo */}

        <div className="brand">
          <div className="brand-icon">💬</div>

          <h1>
            Chat<span>Sphere</span>
          </h1>
        </div>

        <h2>Create Account</h2>

        <p className="auth-subtitle">
          Join ChatSphere and start connecting
        </p>

        {/* Profile Image */}

        <div className="profile-upload">

          <label htmlFor="profilePic">

            <motion.img
              whileHover={{ scale: 1.05 }}
              src={
                preview ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="Profile"
            />

            <div className="camera-icon">
              📷
            </div>

          </label>

          <input
            id="profilePic"
            type="file"
            accept="image/*"
            onChange={handleImage}
            hidden
          />

          <span>Choose profile photo</span>

        </div>

        {/* Error */}

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Username */}

          <div className="input-group">

            <span>👤</span>

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />

          </div>

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
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? "🙈" : "👁️"}
            </button>

          </div>

          {/* Confirm Password */}

          <div className="input-group">

            <span>🔐</span>

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </button>

          </div>

          {/* Button */}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account →"}
          </motion.button>

        </form>

        <div className="auth-footer">

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </div>

      </motion.div>

    </div>
  );
}

export default Register;