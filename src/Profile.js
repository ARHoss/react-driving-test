import React from 'react';

function Profile({ user, onLogout }) {
  return (
    <div className="section">
      <div className="container">
        <h1 className="title is-2">Profile</h1>
        <div className="box">
          <p className="subtitle is-4"><strong>Username:</strong> {user.username}</p>
          <p className="subtitle is-4"><strong>Email:</strong> {user.email}</p>
        </div>
        <button className="button is-danger is-large" onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Profile;
