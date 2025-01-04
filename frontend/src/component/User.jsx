import React, { useEffect, useState } from 'react';
import axios from 'axios'
const User = () => {
  const [bookings, setBookings] = useState([]);
   useEffect(() => {
     const fetchBookings = async () => {
      try{
      const token = localStorage.getItem('authToken');
      let response= await axios.get(`${import.meta.env.VITE_APP_API_URL}/hotelbooking`,{
        "Content-Type": "application/json",
        headers: { Authorization: `${token}` },
      });
         setBookings(response.data);
    } 
    catch(e){
      console.error(e);
     }
    };
    fetchBookings();
  }, [bookings]);

  const deleteBooking = async (id) => {
       axios.delete(`${import.meta.env.VITE_APP_API_URL}/hotelbooking/${id}`);
  };  
   return (
    <div className="bookingpage container mt-5" >
      <h2 className="text-center mb-4">My Bookings</h2>
      <div className="row">
        {bookings.map((booking) => (
          <div className="col-md-4 mb-4" key={booking.userid}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Customer Name: {booking.name}</h5>
                <p className="card-text"><strong>Hotel:</strong> {booking.hotelname}</p>
                <p className="card-text"><strong>Room Type:</strong> {booking.Roomtype}</p>
                <p className="card-text"><strong>Total Cost:</strong> ${booking.totalcost}</p>
                <p className="card-text"><strong>Location:</strong> {booking.location}</p>
                <p className="card-text"><strong>Check-In:</strong> {booking.checkin}</p>
                <p className="card-text"><strong>Check-Out:</strong> {booking.checkout}</p>
                <button
                  className="btn btn-danger btn-block mt-3"
                  onClick={() => deleteBooking(booking.userid)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
