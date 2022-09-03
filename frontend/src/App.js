import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Registration from "./screens/Registration";
import Home from "./screens/HomeScreen";
import Header from "./components/Header";
import Login from "./screens/Login";
import CartScreen from "./screens/CartScreen";
import OrderScreen from "./screens/OrderScreen";
import BankIntegration from "./screens/BankIntegration";

function App() {
  return (
    <>
    

      <Toaster />
      {/* <Registration/> */}
      <Router>
      <Header />
        <Routes>
          <Route path='/' element = {<Home/>} exact />
          <Route path='/register' element = {<Registration/>} />
          <Route path= '/signin' element = {<Login/>} />
          <Route path="/bank-integrate" element={<BankIntegration/>} />
          <Route path='/cart' element={<CartScreen />} />
          <Route path='/order' element={<OrderScreen />} />

        </Routes>
      </Router>
    </>
  
  );
}

export default App;
