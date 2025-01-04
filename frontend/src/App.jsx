import React from 'react'
import Navbar from './component/navbar'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './component/login'
import Home from './component/Home'
import Register from './component/Register'
import Addhotel from './component/Addhotel'
import User from './component/User'
import HotelDetails from './component/HotelDetails'
import BookHotel from './component/BookHotel'
import ProtectedRoute from './component/Protectroute'
import './App.css';
import Footer from './component/Footer'
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
         <Route path='/' element={<Home/>}/>
         <Route path='/Login' element={<Login/>}/>
         <Route path='/Register' element={<Register/>}/> 
         <Route path='/Addhotel' element={
                                <ProtectedRoute>
                                   <Addhotel/>
                                </ProtectedRoute>
                                   }/>
         <Route path='/User' element={
                                 <ProtectedRoute>
                                   <User/>
                                </ProtectedRoute>
                                   }/>
         <Route path='/BookHotel' element={
                                             <ProtectedRoute>
                                            <BookHotel/> 
                                          </ProtectedRoute>
                                         }/>
         <Route path='/HotelDetails' element={<HotelDetails />} />
      </Routes>
    </BrowserRouter>
   
  )
}

export default App