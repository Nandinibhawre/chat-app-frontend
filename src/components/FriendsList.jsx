import FriendCard from "./FriendCard";


function FriendsList({ friends }) {
  return (
    <div className="section">
      {/* <h2>My Friends</h2> */}

      {friends.map((friend) => (
        <FriendCard
          key={friend.id}
          user={friend}
          buttonText="Chat"
          buttonClass="chat-btn"
        />
      ))}
    </div>
  );
}

export default FriendsList;