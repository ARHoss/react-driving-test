// src/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <>
        <h1 className="title is-1">Driving Test App</h1>
        <h2 className="subtitle is-3">Get started on your journey!</h2>
        <div className="buttons are-large is-centered">
            <Link to="/login" className="button is-light">Login</Link>
            <button className="button is-light">Signup</button>
        </div>

        <div>Welcome to the home page! Click on Login or Signup to proceed.</div>
    </>
  );
}

export default HomePage;
