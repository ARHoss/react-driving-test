import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import ProfileWrapper from './ProfileWrapper';


function App() {

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const currentPath = window.location.pathname;

    if (currentPath === "/" || currentPath === "/login") {
      // If the user is on the HomePage or LoginPage, simply return.
      return;
    }

    const fetchCurrentUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/current_user", {
          credentials: 'include' // Ensuring session cookies are sent with the request
        });
  
        // Handle different response statuses
        if (!response.ok || response.status === 204) {
          throw new Error('No user data');
        }
        if (response.status === 401) {
          throw new Error('Unauthorized');
        }
  
        const data = await response.json();
        setUser(data);
  
      } catch (error) {
        if (error.message === 'Unauthorized') {
          console.log("User is not authenticated");
        } else {
          console.error("Error fetching user data:", error);
        }
      }

      setIsLoading(false);  // Set this at the very end of your useEffect

    };
  
    fetchCurrentUser();
  }, []);
  


  const handleLogout = async () => {
    try {
        const response = await fetch('http://localhost:3000/logout', {
            method: 'GET',
            credentials: 'include' // Important to include credentials so the cookies get sent
        });

        if (response.ok) {
            console.log('Successfully logged out.');
            setUser(null);

        } else {
            console.error('Failed to logout.');
        }
    } catch (error) {
        console.error('Logout error:', error);
    }
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
              <Route path="/profile" element={!isLoading ? (user ? <ProfileWrapper user={user} onLogout={handleLogout} /> : <Navigate to="/" />) : <div>Loading...</div>} />
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
