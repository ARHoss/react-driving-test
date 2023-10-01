import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import ProfileWrapper from './ProfileWrapper';


function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/current_user")
      .then(response => {
        // If the response was successful, decode the JSON
        if (response.ok) {
          return response.json();
        } 
        // If a 401 Unauthorized was received, handle it
        else if (response.status === 401) {
          throw new Error('Unauthorized');
        } 
        // For other errors, just throw an error
        else {
          throw new Error('Network response was not ok.');
        }
      })
      .then(data => setUser(data))
      .catch(error => {
        // This will catch errors from the fetch, decoding JSON, or the above errors
        if (error.message === 'Unauthorized') {
          console.log("User is not authenticated");
        } else {
          console.error("Error fetching user data:", error);
        }
      });
  }, []);


  const handleLogout = () => {
    // Implement your logout logic here (like sending a request to the backend to end the session)
    setUser(null);
  };


  return (

    <Router>
      <div className="hero is-fullheight is-primary">
        <div className="hero-body">
          <div className="container has-text-centered">
            
            {/* Always visible title and buttons */}
            

            {/* Route specific content */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<ProfileWrapper user={user} onLogout={handleLogout} />} />
            </Routes>


          </div>
        </div>
      </div>
    </Router>

    // <Router>
    //   <div className="hero is-fullheight is-primary">
    //     <div className="hero-body">
    //       <div className="container has-text-centered">

    //         <Route exact path="/" render={() => (
    //           <>
    //             <h1 className="title is-1">Driving Test App</h1>
    //             <h2 className="subtitle is-3">Get started on your journey!</h2>
                
    //             <div className="buttons are-large is-centered">
    //               <Link to="/login" className="button is-light">Login</Link>
    //               <button className="button is-light">Signup</button>
    //             </div>
    //           </>
    //         )} />

    //         <Route path="/login" component={LoginPage} />

    //       </div>
    //     </div>
    //   </div>
    // </Router>

  );
}

export default App;
