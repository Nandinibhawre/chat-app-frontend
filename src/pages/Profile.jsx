function Profile() {

  return (

    <div className="profile-page">

      <div className="profile-card">

        <img
          src="https://i.pravatar.cc/200"
          alt=""
        />

        <h2>
          {localStorage.getItem("username")}
        </h2>

        <p>
          {localStorage.getItem("userEmail")}
        </p>

        <button>
          Edit Profile
        </button>

      </div>

    </div>
  );
}

export default Profile;