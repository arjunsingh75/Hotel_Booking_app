import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
const RegisterPage = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
      try{
        const response = await axios.post("http://localhost:3000/api/register",formData,{
          headers: {
            "Content-Type": "application/json",
          },
         
        });
      
         alert(response.data.message);
         navigate('/Login');
      }
      catch(e){
        console.error("Error posting data:", e.response.data.message);
        alert(e.response.data.message);
        navigate('/Login');
      }
    
  };

  return (
    <div className="container mt-5" >
      <div className="row justify-content-center" >
        <div className="col-md-6" >
          <div className="card" style={{width:"400px",boxShadow:"5px 2px 5px rgba(0, 0, 0, 0.1)"}}>
            <div className="card-header text-center">
              <h3>Register</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
