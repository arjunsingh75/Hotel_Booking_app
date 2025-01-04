
import React, {useState,useEffect} from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('authToken');   
    if (token) {
      setIsLoggedIn(true);      
    }
  }, []);

    
  // Handle logout
  const handleLogout = () => {
    localStorage.clear(); 
    setIsLoggedIn(false);  
  };
  const styling={
       fontSize:"18px",
       fontWeight:"450"
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{marginBottom:"10px"}}>
      <div className="container">
         <h4> HotelBooking</h4>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            
          <li className="nav-item" style={styling}>
              <Link className="nav-link" to="/">
               HomePage
              </Link>
            </li>
            <li className="nav-item" style={styling}>
              <Link className="nav-link" to="/Addhotel">
                AddHotel
              </Link>
            </li>
           {!isLoggedIn ? (
            <>
             <li className="nav-item" style={styling}>
             <Link className="nav-link" to="/Register">
               Register
             </Link>
             </li>
            <li className="nav-item" style={styling}>
              <Link className="nav-link" to="/Login">
                Login
              </Link>            
            </li>
            </>
            ):(
              <>
              <li className="nav-item" >
                <Link className="nav-link" onClick={handleLogout} style={styling} to="/">
                 Logout
              </Link>
            </li>
            <li className="nav-item" style={styling}>
            <Link className="nav-link" to="/User">
              User <i style={{fontSize:'22px'}} class="fa fa-user-circle" aria-hidden="true"></i>
            </Link>
          </li>
          </>
          )}
            
          </ul>
        </div>
  
      </div>
    </nav>
  );
};

export default Navbar;
