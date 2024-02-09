import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import {BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Home from "./pages/Home";
import { AuthContextProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import ProtectedRoute from "./components/ProtectedRoute";
import WatchNow from "./pages/WatchNow";

const App = () => {
const params = useParams()
useEffect(() => {
  window.scrollTo(0,0)
}, [params])

  
  return (
    
      
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route path="/watchnow/:id" element={<WatchNow />} />
        </Routes>
      </AuthContextProvider>
  
  );
};

export default App;
