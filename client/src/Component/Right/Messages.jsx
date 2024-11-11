import React, { useContext, useEffect, useRef, useState } from "react";
import Message from "./Message";
import axios from "axios";
import { UserContext } from "../../Context/UserProvider";
import ScrollToBottom from 'react-scroll-to-bottom';


import { socketContext } from "../../Context/socketConnection";
import { MsgContext } from '../../Context/messageProvider';
import { GetMsgContext } from "../../Context/getMessage";


function Messages() {
  const [ selectUser, setSelectUser ]= useContext(UserContext);
  const { socket } = useContext(socketContext);
  const [messageData, setMessageData]=useContext(GetMsgContext);
  const [sendMsg, setSendMsg] = useContext(MsgContext);
  console.log("selected user id", selectUser?.user?._id);


  useEffect(() => {
    // Listen for incoming messages
    socket&& socket.on("rcv_message", (newMessage) => {
      // Update messageData with the new message
      setMessageData((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket&&  socket.off("rcv_message");
    };
  }, [socket]);


  useEffect(() => {
    async function getMessage() {
      try {
        const messageResponse = await axios.get(`http://localhost:8080/message/get/${selectUser?.user?._id}`, {
          withCredentials: true
        });
        // Use messageResponse.data to get the actual data
        console.log("message response from DB",messageResponse)
        setMessageData(messageResponse.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log("No conversation found");
          setMessageData([]);
        } else {
          console.log(error.message);
        }
      }
    }
    getMessage();
  }, [selectUser,setSelectUser,setMessageData]);
  
  const lastMsgRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);
  }, [messageData]);

 
  return (

    <div
      className="flex-1 overflow-y-auto"
      style={{ minHeight: "calc(92vh - 8vh)" }}
     
    >
  
      {messageData && messageData.length > 0? (
        messageData.map((item) => (
         
          <div key={item._id} ref={lastMsgRef}>
          <Message key={item._id} item={item} />
        </div>
            
      
        ))
      ) : (
        <p className="text-center mt-[20%]">
          Say! Hi to start the conversation
        </p>
      )}
          <div ref={lastMsgRef} />
    </div>

  );
}

export default Messages;
