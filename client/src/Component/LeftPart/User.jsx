import React, { useContext, useEffect, useState } from "react";
import { socketContext } from '../../Context/socketConnection';

import { UserContext } from "../../Context/UserProvider";

function User({user}) {
  const { onlineUser, socket } = useContext(socketContext);
  const [ selectUser, setSelectUser ]= useContext(UserContext);
  const [cssOnline,setCssOnline]=useState("")

useEffect(()=>{
  onlineUser.map((item)=>{
    if(item==user._id){
      setCssOnline("online")
      return
    }
  })

},[user])

  return (

    
       <div
       onClick={() => setSelectUser({user})}
      className={`hover:bg-slate-600 duration-300 `}
   
    >
      <div className="flex space-x-4 px-8 py-3 hover:bg-slate-700 duration-300 cursor-pointer">
        <div className={`avatar  ${cssOnline}` }>
          <div className="w-12 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        
          </div>
        </div>
        <div>
          <h1 className=" font-bold">{user.username}</h1>
          <span>{user.email}</span>
        </div>
      </div>
    </div>
   
  );
}

export default User;