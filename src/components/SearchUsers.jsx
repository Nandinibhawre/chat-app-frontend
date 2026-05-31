import { useState } from "react";
import FriendCard from "./FriendCard";
import { sendRequest } from "../services/friendService";
import "../styles/SearchUsers.css";

function SearchUsers({ users, currentUser }) {
  const [search, setSearch] = useState("");

  const handleRequest = async (id) => {
    try {
      await sendRequest(currentUser.id, id);
      alert("Request Sent");
    } catch (err) {
      console.log(err);
    }
  };

const filteredUsers = users.filter((user) => {
console.log(users);
  const name =
    user.username ||
    user.fullName ||
    "";

  return name
    .toLowerCase()
    .includes(search.toLowerCase());

});

  return (
    <div className="section">
      {/* <h2>Add Friends</h2> */}

      <input
        className="search-input"
        placeholder="Search users..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {filteredUsers.map((user) => (
        <FriendCard
          key={user.id}
          user={user}
          buttonText="Invite"
          buttonClass="invite-btn"
          onClick={() =>
            handleRequest(user.id)
          }
        />
      ))}
    </div>
  );
}

export default SearchUsers;