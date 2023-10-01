// src/LoginPage.js
import React from 'react';

function LoginPage() {

  const handleLogin = async (event) => {
    event.preventDefault();
  
    const email = event.target.email.value;
    const password = event.target.password.value;
  
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'  // Important for sessions
      });

  
      if (!response.ok) {
        const data = await response.json();
        // Handle errors - show user feedback, etc.
        console.error(data);
      } else {
        // Handle success - redirect, show user feedback, etc.
        window.location.href = "/profile";
      }
    } catch (error) {
      console.error("There was an error:", error);
    }
  };


  return (
    <form onSubmit={handleLogin}>
      <div className="container">
        <h1 className="title">Login</h1>
        <div>
          <input className="input" type="email" placeholder="Email" name='email'/>
          <input className="input" type="password" placeholder="Password" name='password'/>
          <button className="button is-primary" type='submit'>Submit</button>
        </div>
      </div>

    </form>
    
  );
}

export default LoginPage;
