import React from "react";
// import Food from "./Component/Food/Food";
import Login from "./Component/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Component/Home/Home";
import Register from "./Component/Register/Register";
import Navbar from "./Component/Navbar/Navbar";
import Footer from "./Component/Footer/Footer";
import Items from "./Component/Items/Items";
import Cart from "./Component/Cart/Cart";
import About from "./Component/About/About";
import Profile from "./Component/Profile/Profile";
import Order from "./Component/Order/Order";
import Payment from "./Component/Payment/Payment";
import Favourite from "./Component/Favourite/Favourite";
import Food2 from "./Component/Food/Food2";
import Menu2 from "./Component/Menu2/Menu2";
import Hero2 from "./Component/Hero2/Hero2";
import App2 from "./App2";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Error404 from "./Component/Error/Error404";
import { useEffect,useState } from "react";
import axios from "axios";
import Checkout from "./Component/Cart/Chackout";
// Importing toastify module
// import { toast } from "react-toastify";
function App() {
  const [type,setType]=useState("user");
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    
    if (accessToken) {
      // console.log(accessToken);
      axios.get("http://127.0.0.1:8000/api/user/index/", 
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        setType("admin");
      })
      .catch((error) => {
        setType("user");
      });
    }
  },[type]);
  if (type==="user") {
    return (
      <div className="App">
        <ToastContainer />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            {/* <Route path="/food" element={<Food />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/items" element={<Items />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/order" element={<Order />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/favourite" element={<Favourite />} />
            <Route path="/food2" element={<Food2 />} />
            <Route path="/menu2" element={<Menu2 />} />
            <Route path="/hero2" element={<Hero2 />} />
            <Route path="/*" element={<Error404 />} />
            <Route path="/checkout" element={<Checkout />} />

          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    );
  } if(type==="admin") {
    return <App2 />;
  }
}

export default App;