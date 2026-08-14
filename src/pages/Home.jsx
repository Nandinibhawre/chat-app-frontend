import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/Home.css";

import {
  FaHome,
  FaComments,
  FaUserFriends,
  FaCog,
  FaBars,
  FaTimes,
  FaRocket,
  FaShieldAlt,
  FaBolt,
  FaLock,
} from "react-icons/fa";

function Home() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <>
      <Navbar />

      <div className="home-container">

        {/* =========================
            DECORATIVE BACKGROUND
        ========================= */}

        <div className="background-blob blob-one"></div>
        <div className="background-blob blob-two"></div>
        <div className="background-blob blob-three"></div>

        <div className="dot-pattern pattern-one"></div>
        <div className="dot-pattern pattern-two"></div>


        {/* =========================
            MOBILE TOGGLE
        ========================= */}

        <button
          className="menu-toggle"
          onClick={() => setOpenSidebar(!openSidebar)}
        >
          {openSidebar ? <FaTimes /> : <FaBars />}
        </button>


        {/* =========================
            SIDEBAR
        ========================= */}

        <aside
          className={`sidebar ${
            openSidebar ? "active" : ""
          }`}
        >

          <div className="sidebar-brand">
           

        
          </div>


          <ul>

            <li className="active-nav">
              <Link to="/home">
                <FaHome />
              </Link>
            </li>

            <li>
              <Link to="/chat">
                <FaComments />
              </Link>
            </li>

            <li>
              <Link to="/friends">
                <FaUserFriends />
              </Link>
            </li>

            <li>
              <Link to="/profile">
                <FaCog />
              </Link>
            </li>

          </ul>


          {/* SIDEBAR BOTTOM */}

          <div className="sidebar-bottom">

            <div className="sidebar-status"></div>

            <span>Online</span>

          </div>

        </aside>


        {/* =========================
            MAIN HERO
        ========================= */}

        <main className="hero">


          {/* WELCOME PILL */}

          <div className="welcome-pill">
            👋 Welcome to <strong>ChatSphere</strong>
          </div>


          {/* MAIN HEADING */}

          <h1>
            Connect With
            <br />

            <span>Your Friends</span>
          </h1>


          {/* SUBTITLE */}

          <p className="hero-subtitle">
            Fast • Secure • Real-Time Messaging
          </p>


          <p className="hero-description">
            Chat, connect and share moments with the people
            who matter most.
          </p>


          {/* =========================
              BUTTONS
          ========================= */}

          <div className="hero-buttons">

            <button
              className="chat-btn"
              onClick={() =>
                (window.location.href = "/chat")
              }
            >
              <FaRocket />
              Start Chat
            </button>


            <button
              className="friend-btn"
              onClick={() =>
                (window.location.href = "/friends")
              }
            >
              <FaUserFriends />
              Add Friends
            </button>

          </div>


          {/* =========================
              FLOATING EMOJIS
          ========================= */}

          <div className="floating-avatar avatar-one">
            😍
          </div>

          <div className="floating-avatar avatar-two">
            😉
          </div>

          <div className="floating-avatar avatar-three">
            😊
          </div>


          {/* PAPER PLANE */}

          <div className="floating-plane">
            ➤
          </div>


          {/* CHAT BUBBLE */}

          <div className="floating-chat-bubble">

            <span></span>
            <span></span>
            <span></span>

          </div>


          {/* =========================
              FEATURE CARDS
          ========================= */}

          <div className="feature-section">


            {/* CARD 1 */}

            <div className="feature-card">

              <div className="feature-icon purple-icon">
                <FaShieldAlt />
              </div>

              <div>
                <h3>Secure Chat</h3>

                <p>
                  Your privacy is our
                  top priority
                </p>
              </div>

            </div>


            {/* CARD 2 */}

            <div className="feature-card">

              <div className="feature-icon blue-icon">
                <FaBolt />
              </div>

              <div>
                <h3>Real-Time</h3>

                <p>
                  Instant messaging
                  at lightning speed
                </p>
              </div>

            </div>


            {/* CARD 3 */}

            <div className="feature-card">

              <div className="feature-icon pink-icon">
                <FaUserFriends />
              </div>

              <div>
                <h3>Connect Easily</h3>

                <p>
                  Find and connect
                  with your friends
                </p>
              </div>

            </div>


            {/* CARD 4 */}

            <div className="feature-card">

              <div className="feature-icon green-icon">
                <FaLock />
              </div>

              <div>
                <h3>Private & Secure</h3>

                <p>
                  Your conversations
                  stay private
                </p>
              </div>

            </div>


          </div>


        </main>

      </div>
    </>
  );
}

export default Home;