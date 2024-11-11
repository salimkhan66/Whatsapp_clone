import React, { useContext } from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from './Component/Home';
import Login from './Component/Login';
import Signup from './Component/Signup';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './Context/authProvider';
import Loading from './Component/Loading';
import { socketContext } from './Context/socketConnection';
import { MsgContext } from './Context/messageProvider.jsx';

function App() {
    const [authUser, setAuthUser] = useAuth();
    const [sendMsg,setSendMsg]=useContext(MsgContext)
    const { onlineUser, socket } = useContext(socketContext);
   

    return (

            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            authUser ? (
                                <Home />
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
      
    );
}

export default App;
