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
} from "react-icons/fa";

function Home()

 {
  const [openSidebar, setOpenSidebar] =
    useState(false);

  
  return (
    <>
    <Navbar />
    <div className="home-container">

      {/* Floating Circles */}
      <div className="circle c1"></div>
      <div className="circle c2"></div>
      <div className="circle c3"></div>

 
      {/* MOBILE TOGGLE */}

      <button
        className="menu-toggle"
        onClick={() =>
          setOpenSidebar(!openSidebar)
        }
      >
        {openSidebar ? (
          <FaTimes />
        ) : (
          <FaBars />
        )}
      </button>

      {/* SIDEBAR */}

      <aside
        className={`sidebar ${
          openSidebar ? "active" : ""
        }`}
      >
        {/* <div className="logo">💬</div> */}

        <ul>
          <li>
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
      </aside>

      {/* Main */}

      <div className="hero">

        <div className="floating-avatar avatar1">
          👩
        </div>

        <div className="floating-avatar avatar2">
          👨
        </div>

        <div className="floating-avatar avatar3">
          🧑
        </div>

        <h1>
          Connect With Your Friends
        </h1>

        <p>
          Fast • Secure • Real-Time Messaging
        </p>

        <div className="hero-buttons">

          <button className="chat-btn" onClick={() => window.location.href = "/chat"}>
            Start Chat
          </button>

          <button className="friend-btn" onClick={() => window.location.href = "/friends"}>
            Add Friends
          </button>

        </div>

      </div>

    </div>
    </>
  );
}

export default Home;