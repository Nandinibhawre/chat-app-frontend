import "../styles/Navbar.css";


function Navbar() {

  const username =
    localStorage.getItem("username");

  const profilePic =
    localStorage.getItem("profilePic") ||
    "https://i.pravatar.cc/150?img=8";

  return (
    <nav className="navbar">

      <div className="navbar-left">

       

        <h1 className="logo-text">
          ChatSphere
        </h1>

      </div>

      {/* <div className="navbar-center">

        <a href="/home">Home</a>

        <a href="/friends">
          Friends
        </a>

        <a href="/chat">
          Chats
        </a>

      </div> */}

      <div className="navbar-right">

        <div className="profile-box">

          <img
            src={profilePic}
            alt=""
          />

          <div>

            <h4>{username}</h4>

            <span>Online</span>

          </div>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;