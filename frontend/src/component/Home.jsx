import React, { useEffect, useState } from "react";
import axios from "axios";
import './Home.css'
import HotelDetails from "./HotelDetails";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [hotels, setHotels] = useState([]);
  const [filter,setfilter]=useState([]);

   const navigate=useNavigate();
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/api/hotelsdata");
        setHotels(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchHotels();
  }, [hotels]);

  function handleclick(hotel){
   navigate('/HotelDetails', { state: { hotel} });
  }

  return (
    <div className="HotelsPage">      
        {hotels.map((hotel) => (
          <div className="Hotel_card">
              <img src={hotel.img}  alt="hotel image" />
              <div className="hotel_description">
              <h5>{hotel.name}</h5>
              <p style={{fontSize:"16px"}}><b>Location: </b>{hotel.location}</p>
               <button onClick={()=>handleclick(hotel)} >View More</button>              
             </div>
          </div>
        ))}
     
    </div>
  );
};

export default Home;
