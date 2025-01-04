import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Addhotel = () => {
  const navigate=useNavigate();
  const [resortData, setResortData] = useState({
    name: '',
    description: '',
    location: '',
    img: [''],
    rooms: [
      { roomType: '', price: '', availability: '', numofroom: '' },
    ],
    rating: '',
    facilities: [''],
  });

  // Handler for basic inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setResortData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for array inputs (like images or facilities)
  const handleArrayChange = (e, index, field) => {
    const newArray = [...resortData[field]];
    newArray[index] = e.target.value;
    setResortData((prev) => ({ ...prev, [field]: newArray }));
  };

  // Handler for room inputs
  const handleRoomChange = (e, index) => {
    const { name, value } = e.target;
    const updatedRooms = [...resortData.rooms];
    updatedRooms[index] = { ...updatedRooms[index], [name]: value };
    setResortData((prev) => ({ ...prev, rooms: updatedRooms }));
  };

  // Add new image, facility, or room
  const addNewField = (field) => {
    if (  field === 'facilities') {
      setResortData((prev) => ({ ...prev, [field]: [...prev[field], ''] }));
    } else if (field === 'rooms') {
      setResortData((prev) => ({
        ...prev,
        rooms: [...prev.rooms, { roomType: '', price: '', availability: false, numofroom: '', _id: '' }],
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
       try{
        const token = localStorage.getItem('authToken');
        await axios.post(`${import.meta.env.VITE_APP_API_URL}/hotelsdata`,resortData,{
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        });
        alert("hotel added");
        navigate('/');
       }
       catch(e){
        console.error("posting data error",e);
       }
  };
  
  return (
    <div className="container mt-5" style={{boxShadow:'2px 5px 5px gray'}}>
      <form onSubmit={handleSubmit} className="form_data">
        <h2 className="text-center mb-4">Add Hotel</h2>

        {/* Hotel Name */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Hotel Name:</label>
          <input
            type="text"
            name="name"
            value={resortData.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            name="description"
            value={resortData.description}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Location */}
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location:</label>
          <input
            type="text"
            name="location"
            value={resortData.location}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Image URL */}
        <div className="mb-3">
          <label htmlFor="img" className="form-label">Image URL:</label>
          <input
            type="text"
            name="img"
            value={resortData.img}
            onChange={handleChange}
            className="form-control"
            placeholder='Please provide image Url'
            required
          />
        </div>

        {/* Rooms Section */}
        <div className="mb-3">
          <h4>Rooms</h4>
          {resortData.rooms.map((room, index) => (
            <div key={index} className="mb-3 border p-3 rounded">
              <div className="mb-2">
                <label htmlFor="roomType" className="form-label">Room Type:</label>
                <input
                  type="text"
                  name="roomType"
                  value={room.roomType}
                  onChange={(e) => handleRoomChange(e, index)}
                  className="form-control"
                  required
                  style={{ width: "200px" }}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="price" className="form-label">Price:</label>
                <input
                  type="number"
                  name="price"
                  value={room.price}
                  onChange={(e) => handleRoomChange(e, index)}
                  className="form-control"
                  required
                  style={{ width: "100px" }}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="availability" className="form-label">Availability:</label>
                <input
                  type="text"
                  name="availability"
                  checked={room.availability}
                  onChange={(e) => handleRoomChange(e, index)}
                  className="form-control"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="numofroom" className="form-label">Number of Rooms:</label>
                <input
                  type="number"
                  name="numofroom"
                  value={room.numofroom}
                  onChange={(e) => handleRoomChange(e, index)}
                  className="form-control"
                  required
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addNewField('rooms')}
            className="btn btn-outline-primary mt-2"
          >
            Add Room
          </button>
        </div>

        {/* Facilities Section */}
        <div className="mb-3">
          <h4>Facilities</h4>
          {resortData.facilities.map((facility, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                placeholder="Facility"
                value={facility}
                onChange={(e) => handleArrayChange(e, index, 'facilities')}
                className="form-control"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => addNewField('facilities')}
            className="btn btn-outline-primary mt-2"
          >
            Add Facility
          </button>
        </div>

        {/* Rating */}
        <div className="mb-3">
          <label htmlFor="rating" className="form-label">Rating:</label>
          <input
            type="number"
            step="0.1"
            name="rating"
            value={resortData.rating}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addhotel;
