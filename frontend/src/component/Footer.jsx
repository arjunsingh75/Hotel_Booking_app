import React from "react";

const FooterAlt = () => {
  return (
    <footer className="bg-light text-dark pt-5 pb-4" style={{marginTop:'50px'}}>
      <div className="container">
        <div className="row">
          {/* Logo and Tagline */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">HotelName</h5>
            <p>Your comfort, our priority. Stay with us and make memories that last forever.</p>
          </div>
          {/* Navigation Links */}
          <div className="col-md-2 mb-4">
            <h6 className="fw-bold text-uppercase mb-3">Explore</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-dark text-decoration-none">Home</a></li>
              <li><a href="#" className="text-dark text-decoration-none">About</a></li>
              <li><a href="#" className="text-dark text-decoration-none">Rooms</a></li>
              <li><a href="#" className="text-dark text-decoration-none">Gallery</a></li>
            </ul>
          </div>
          {/* Services Links */}
          <div className="col-md-2 mb-4">
            <h6 className="fw-bold text-uppercase mb-3">Services</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-dark text-decoration-none">Spa & Wellness</a></li>
              <li><a href="#" className="text-dark text-decoration-none">Dining</a></li>
              <li><a href="#" className="text-dark text-decoration-none">Events</a></li>
              <li><a href="#" className="text-dark text-decoration-none">Offers</a></li>
            </ul>
          </div>
          {/* Contact Info */}
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold text-uppercase mb-3">Contact Us</h6>
            <p><i className="fas fa-map-marker-alt me-2"></i> 456 Luxury Road, City, Country</p>
            <p><i className="fas fa-envelope me-2"></i> info@hotelname.com</p>
            <p><i className="fas fa-phone me-2"></i> +1 987 654 3210</p>
          </div>
        </div>
        <div className="row mt-4">
          {/* Social Media Links */}
          <div className="col text-center">
            <a href="#" className="text-dark me-3"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-dark me-3"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-dark me-3"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-dark me-3"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col text-center">
            <p className="mb-0">© 2025 HotelName. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterAlt;
