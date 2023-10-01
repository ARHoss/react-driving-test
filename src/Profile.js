import React from 'react';

function Profile({ user, onLogout }) {
  const recentScores = user.scores.slice(-5).reverse(); // Taking the last 5 scores and reversing to get the most recent first

  return (
    <div className="section">
      <div className="container">
        <h1 className="title is-2">Profile</h1>
        <div className="box">
          <p className="subtitle is-4 has-text-dark"><strong className='has-text-dark'>Username:</strong> {user.userName}</p>
          <p className="subtitle is-4 has-text-dark"><strong className='has-text-dark'>Email:</strong> {user.email}</p>
        </div>

        <h2 className="title is-4">Recent Test Scores</h2>
        <table className="table is-striped is-hoverable is-fullwidth">
          <thead>
            <tr>
                <th className="has-text-centered">Date</th>
                <th className="has-text-centered">Score (%)</th>
                <th className="has-text-centered">Result</th>
            </tr>
          </thead>
          <tbody>
            {recentScores.map(score => (
              <tr key={score._id}>
                <td>{new Date(score.dateCompleted).toLocaleDateString()}</td>
                <td>{score.score}%</td>
                <td>{score.score < 80 ? "Did not pass" : "Passed"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="button is-danger is-large mt-5" onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Profile;
