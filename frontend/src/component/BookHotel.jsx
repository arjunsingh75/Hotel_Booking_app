import React, { useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
const BookHotel = () => {
    const location = useLocation();
    const Navigate=useNavigate()
    const { room,hotel } = location.state ||{} ;
    const [bookhotel,setbookhotel]=useState({
        name:'',
        checkin:'',
        checkout:'',
        Numberofroom:'',
        Roomtype:'',
        totalcost:'',
        hotelname:'',
        location:'',
 });
//  store the data in state
     bookhotel.Roomtype=room.roomType;
     bookhotel.hotelname=hotel.name;
     bookhotel.location=hotel.location;
   
//   days calculater
 const calculateDays = (checkin, checkout) => {
    const date1 = new Date(checkin);
    const date2 = new Date(checkout);

    const differenceInTime = date2 - date1;
  
    const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);
  
    return differenceInDays;
  };
//   check days for hotel rent 
  let days=1;
  if(bookhotel.checkout && bookhotel.checkin){
       days=calculateDays(bookhotel.checkin,bookhotel.checkout);
   
  }
   let totalcost=room.price*bookhotel.Numberofroom*days;
   bookhotel.totalcost=totalcost;

    const handlechange = (e) => {
    const { name, value } = e.target;
    setbookhotel((prev) => ({ ...prev, [name]: value }));
   };


  const handlesubmit=async(e)=>{
    e.preventDefault();
    try{
       const token = localStorage.getItem('authToken');
       const res=await axios.post("http://localhost:3000/api/hotelbooking", bookhotel,{
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
       });
       alert('booking success');
       Navigate('/User');
       
    }
    catch(e){
        console.error(e);
    }
  }


  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h3 className="text-center mb-3">Booking Page</h3>
        <div className="mb-4 text-center">
          <h5 className="text-primary">{hotel.name}</h5>
          <p className="text-muted">Location: {hotel.location}</p>
          <p><strong>Room Type:</strong> {room.roomType}</p>
          <p><strong>Price:</strong> ${room.price}</p>
        </div>
        <form onSubmit={handlesubmit} className="needs-validation" >
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Customer Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter name"
              name="name"
              value={bookhotel.name}
              onChange={handlechange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="checkin" className="form-label">Check-In</label>
            <input
              type="date"
              className="form-control"
              id="checkin"
              name="checkin"
              value={bookhotel.checkin}
              onChange={handlechange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="checkout" className="form-label">Check-Out</label>
            <input
              type="date"
              className="form-control"
              id="checkout"
              name="checkout"
              value={bookhotel.checkout}
              onChange={handlechange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Numberofroom" className="form-label">Number of Rooms</label>
            <input
              type="number"
              className="form-control"
              id="Numberofroom"
              placeholder="Enter number of rooms"
              name="Numberofroom"
              value={bookhotel.Numberofroom}
              onChange={handlechange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
        <div className="mt-4 text-center">
          <p><strong>Total Cost:</strong> ${totalcost}</p>
        </div>
      </div>
    </div>
  );
}


export default BookHotel


