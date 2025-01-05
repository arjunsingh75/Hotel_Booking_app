import React, { useEffect, useState } from "react";
import axios from "axios";
import HotelDetails from "./HotelDetails";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Footer from './Footer'

 const Home = () => {
  const [hotels, setHotels] = useState([]);
  const [filter,setfilter]=useState([]);
  const [filters, setfilters] = useState({ location: "", name: "", price: "" });
  const [userId, setUserId] = useState(null);
   const navigate=useNavigate();

// ================== Api call for hotel data ===================
  useEffect(() => {
    const fetchHotels =async() => {
      try {   
       const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/hotelsdata`);
        setHotels(response.data);
        setfilter(response.data);
       } 
       catch (error) {
        console.error("Error fetching data:", error);
       }
      }
      fetchHotels();
   },[]);
 //=============== view more click handle ======================  
    function handleclick(hotel){
     navigate('/HotelDetails', { state: { hotel} });
    }
  //================ show or hide delete btn ================
    useEffect(() => {
      const fetchloginid=async()=>{
       const token = localStorage.getItem("authToken");
       if (token) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/register`,{
            "Content-Type": "application/json",
            headers: { Authorization: `${token}` },
          });
          setUserId(response.data.userId);
         } 
        catch (error) {
          console.error("Error decoding token:", error);
          setUserId(null);
         }
        }
       } 
       fetchloginid();
    },[]);
  
    
  //======================  serach function =======================

    function handlesearch(e){
   const value = e.target.value.toLowerCase();
   if(value.trim()!==''){
   const results = hotels.filter((hotel) =>
     hotel.location.toLowerCase().includes(value)
   );
   setfilter(results);
   }
   else
   {
     setfilter(hotels);
   }
    }
  
  //============================= filter function ====================
     const handleFilterChange = (e) => {
     const { name, value } = e.target;
       setfilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
      }));
     }
      useEffect(()=>{
        const filteredHotels = hotels.filter((hotel) => {
        const matchesLocation =
        filters.location === "" ||
        hotel.location.toLowerCase().includes(filters.location.toLowerCase());
        const matchesName =
        filters.name === "" ||
        hotel.name.toLowerCase().includes(filters.name.toLowerCase());
        const matchesPrice =
        filters.price === "" || hotel.rooms.price >= parseInt(filters.price);
         return matchesLocation && matchesName && matchesPrice;
          });
       setfilter(filteredHotels);
     },[filters]);
      
    
  // ================== Handle Delete hotel =========================
      function handleDelete(id){
         axios.delete(`${import.meta.env.VITE_APP_API_URL}/hotelsdata/${id}`);
         window.location.reload();
      }
 


  return (
    <>
      {/* ================= search section =============== */}
     <div className="container mt-4" >
      <div className="mb-3" style={{border:'2px solid rgb(228, 230, 228)',borderRadius:'8px'}}>
        <input
          type="text"
          className="form-control"
          placeholder="Search by Location..."
          onChange={handlesearch}
        />
      </div>
     </div>

      {/*=============== filter section ============== */}
    <div className="container">
      <div className="row mb-4 filter">
        <div className="col-md-4 ">         
          <select
            name="location"
            id="location"
            value={filters.location}
            className="form-select"
            onChange={handleFilterChange}
          >
            <option value="">All Locations</option>
            <option value="Jhansi">Jhansi</option>
            <option value="New York,NY">New York,NY</option>
            <option value="Miami,FL">Miami,FL</option>
            <option value="Aspen,CO">Aspen,CO</option>
            <option value="Lake Tahoe, CA">Lake Tahoe, CA</option>
            <option value="Chicago,IL">Chicago,IL</option>
          </select>
        </div>
        <div className="col-md-4">
          <select
            name="name"
            id="name"
            value={filters.name}
            className="form-select"
            onChange={handleFilterChange}
          >
            <option value="">All Names</option>
            <option value="Grand Plaza Hotel">Grand Plaza Hotel</option>
            <option value="Skyline Inn">Skyline Inn</option>
            <option value="Lakeview Paradise">Lakeview Paradise</option>
            <option value="Mountain Escape Lodge">Mountain Escape Lodge</option>
            <option value="Ocean Breeze Resort">Ocean Breeze Resort</option>
          </select>
        </div>
        <div className="col-md-4">
          <select
            name="price"
            id="price"
            value={filters.price}
            className="form-select"
            onChange={handleFilterChange}
          >
            <option value="">Price Above </option>
            <option value="500">500</option>
            <option value="1000">1000</option>
            <option value="1500">1500</option>
            <option value="2000">2000</option>
          </select>
        </div>
       </div>
      </div>

      {/* =================== hotels ======================= */}
    <div className="HotelsPage">     
        {filter.length>0?(filter.map((hotel) => (
          <div className="Hotel_card">
              <img src={hotel.img}  alt="hotel image" />
              <div className="hotel_description">
                <h5>{hotel.name}</h5>
                <p style={{fontSize:"16px"}}><b>Location: </b>{hotel.location}</p>
                <button onClick={()=>handleclick(hotel)} className="btn_common">View More</button> 
                {userId===hotel.userid?(  
                <span onClick={()=>handleDelete(hotel.userid)} style={{float:'right',fontSize:'20px',color:'red'}}><i class="fa-solid fa-trash"></i></span>    
                ):(<span></span>)}
                </div>
          </div>
        ))):(
          <h3 style={{marginLeft:'500px',marginTop:'100px'}}>Hotel Not Found</h3>
        )}
    </div>
       <Footer/>
    </>
  );
};

export default Home;
