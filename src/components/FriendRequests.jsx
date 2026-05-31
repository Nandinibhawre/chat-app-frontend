import FriendCard from "./FriendCard";
import {
  acceptRequest,
  rejectRequest,
} from "../services/friendService";

function FriendRequests({
  requests,
  refresh,
}) {
  const handleAccept = async (id) => {
    await acceptRequest(id);
    refresh();
  };

  const handleReject = async (id) => {
    await rejectRequest(id);
    refresh();
  };

  return (
    <div className="section">
      {/* <h2>Pending Requests</h2> */}

      {requests.map((req) => (
        <FriendCard
          key={req.id}
          user={req.sender}
        >
          <div>
            <button
              className="accept-btn"
              onClick={() =>
                handleAccept(req.id)
              }
            >
              Accept
            </button>

            <button
              className="reject-btn"
              onClick={() =>
                handleReject(req.id)
              }
            >
              Reject
            </button>
          </div>
        </FriendCard>
      ))}
    </div>
  );
}

export default FriendRequests;