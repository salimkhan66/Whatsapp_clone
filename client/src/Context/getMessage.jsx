
import React, { createContext, useState } from 'react'

 export const GetMsgContext=createContext();
export const GetMessageProvider=({children}) =>{
    const [messageData, setMessageData] = useState([]);
   
  return (
   <GetMsgContext.Provider value={[messageData, setMessageData]}>
    {children}
   </GetMsgContext.Provider>
  );
}

