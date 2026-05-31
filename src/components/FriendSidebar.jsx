import { Link } from "react-router-dom";
import "../styles/FriendSidebar.css";

function FriendSidebar() {
  return (
    <div className="sidebar">
      <h2>Chat App</h2>

      <Link to="/home">Home</Link>
      <Link to="/friends">
        Friends
      </Link>
    </div>
  );
}

export default FriendSidebar;