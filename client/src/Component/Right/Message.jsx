import React, { useEffect, useState } from "react";


function Message({item}) {
  const [chatSetup,setChatSetup]=useState("")
  

  const myid = JSON.parse(localStorage.getItem("messenger")) || "";


    return (
      <div>
        {myid && item && (
          item.senderId === myid.user._id ? (
            <div className="chat chat-end">
              <div className="chat-bubble chat-bubble-accent">
                {item.message}
              </div>
              <div className="chat-footer">{item.updatedAt}</div>
            </div>
          ) : (
            <div className="chat chat-start">
              <div className="chat-bubble chat-bubble-info">
                {item.message}
              </div>
              <div className="chat-footer">{item.updatedAt}</div>
            </div>
          )
        )}
      </div>
    );
}

export default Message;