
import React from 'react';
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from './Component/Home';
import Login from './Component/Login';
import Signup from './Component/Signup';
import  { Toaster } from 'react-hot-toast';
import { useAuth } from './Context/authProvider';


function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <>
     <BrowserRouter>
 
      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              <>
                    <Home />
              </>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
      <Toaster />
      </BrowserRouter>
    </>
  );

}

export default App
