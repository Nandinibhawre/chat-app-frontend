import React from "react";
import "../styles/FriendCard.css";
function FriendCard({
  user,
  buttonText,
  buttonClass,
  onClick,
  children,
}) {

  // Prevent crash if user is undefined
  if (!user) {
    return (
      <div className="friend-card">
        <p>User data not available</p>
      </div>
    );
  }

  return (
    <div className="friend-card">
      <div className="friend-left">
        <img
          src={
            user.profilePic
              ? user.profilePic
              : "https://i.pravatar.cc/150?img=8"
          }
          alt="profile"
        />

        <div>
          <h4>
            {user.fullName ||
              user.username ||
              "Unknown User"}
          </h4>

          <p>
            {user.email || "No Email"}
          </p>
        </div>
      </div>

      {children ? (
        children
      ) : (
        <button
  className={buttonClass || "send-btn"}
  onClick={onClick}
>
  {buttonText}
</button>
      )}
    </div>
  );
}

export default FriendCard;