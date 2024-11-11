
import React, { createContext, useState } from 'react'

 export const MsgContext=createContext();
export const MessageProvider=({children}) =>{
    const [sendMsg,setSendMsg]=useState("");
   
  return (
   <MsgContext.Provider value={[sendMsg,setSendMsg]}>
    {children}
   </MsgContext.Provider>
  );
}

