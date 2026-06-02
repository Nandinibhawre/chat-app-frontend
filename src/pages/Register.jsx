import { useState } from "react";
import "../styles/Auth.css";

function Register() {

  const [formData, setFormData] =
    useState({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      profilePic: null,
    });

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImage = (e) => {

    setFormData({
      ...formData,
      profilePic: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    console.log(formData);
  };

  return (
    <div className="auth-container">

      <form
        className="auth-card"
        onSubmit={handleSubmit}
      >

        <h2>Join ChatSphere 🚀</h2>

        <div className="profile-upload">

          <label htmlFor="profilePic">

            <img
              src={
                formData.profilePic
                  ? URL.createObjectURL(
                      formData.profilePic
                    )
                  : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt=""
            />

          </label>

          <input
            id="profilePic"
            type="file"
            accept="image/*"
            onChange={handleImage}
            hidden
          />

          <p>Upload Profile Photo</p>

        </div>

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        
        <button type="submit">
          Create Account
        </button>

      </form>

    </div>
  );
}

export default Register;