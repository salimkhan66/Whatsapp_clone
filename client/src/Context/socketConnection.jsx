import React, { createContext, useEffect, useState, useContext } from 'react';
import { io } from "socket.io-client";
export const socketContext = createContext();
import { MsgContext } from '../Context/messageProvider.jsx';
import { UserContext } from "../Context/UserProvider";
import { useAuth } from "../Context/authProvider.jsx";

const SocketConnectionProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);
  const [authUser] = useAuth();
  const [sendMsg, setSendMsg] = useContext(MsgContext);

  useEffect(() => {
    if (authUser) {
      const socketConnection = io(`http://localhost:8080/?id=${authUser.user._id}`);

      socketConnection.emit("OnlineUser");
  
    // Listen for "allUsers" event to receive the list of online users
    socketConnection.on("allUsers", (users) => {
      setOnlineUser(users);
    });
      setSocket(socketConnection);

      socketConnection.on('connect', () => {
        console.log('Connected with frontend', socketConnection.id);
      });

      socketConnection.on('rcv_message', (msg) => {
        console.log("Message received:", msg);
        
        setSendMsg("");  // Clear input when a message is received, or handle as needed
      });

      return () => {
        socketConnection.off('rcv_message');
        socketConnection.off('connect');
        socketConnection.disconnect();
        console.log("Socket disconnected");
      };
    }
  }, [authUser]);
  

  return (
    <socketContext.Provider value={{ onlineUser, socket }}>
      {children}
    </socketContext.Provider>
  );
};

export default SocketConnectionProvider;
