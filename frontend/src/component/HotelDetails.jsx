
import React from "react";
import { useLocation ,useNavigate} from "react-router-dom";
// import BookHotel from "./BookHotel";
const HotelDetails = () => {
  const navigate=useNavigate();
  const location = useLocation();
  const { hotel } = location.state 
  if(!hotel){
    <h1>not hotel found</h1>

  }
  function handleclick(room){
    navigate('/BookHotel', { state: {room,hotel} });
   }
  return (

    <div className="hotelDetail">
      <div className="hotel_img">
      <img src={hotel.img} alt="image not load" />
      <h3>{hotel.name}</h3>
      <p><span className="description_element">Location:</span> {hotel.location}</p>
      <p><span className="description_element">Description:</span>{hotel.description}</p>
      <p><span className="description_element">Rating:</span>{hotel.rating}</p>
      </div>
      <div className="hotel_body">
        <div className="facility">
          <h4>Facilities</h4>
          {hotel.facilities.map((f)=>(
             <ul>
              <li style={{fontSize:"17px"}}>{f}</li>
             </ul>
          ))}
        </div>
        <h4>HotelType:</h4>
       <div className="hotel_rooms">
        {hotel.rooms.map((room)=>(
          <div className="description">
           <p><span className="description_element">RoomType:</span>{room.roomType}</p>
           <p><span className="description_element">Price:</span>{room.price} (one night)</p>
           <p><span className="description_element">Availability:</span>{room.availability}</p>
           <p><span className="description_element">NumOfRoom:</span>{room.numofroom}</p>
           <button onClick={()=>handleclick(room)} className="btn_common">Book Now</button>
        </div>
        ))}
        
       </div>
      </div>
     
    </div>
   
  );
};

export default HotelDetails;
