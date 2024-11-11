import React, { useContext, useEffect, useState } from "react";

import { socketContext } from '../../Context/socketConnection';
  
function Chatuser({selectUser}) {
  const { onlineUser, socket } = useContext(socketContext);

  const [cssOnline,setCssOnline]=useState("")
   

  console.log("online users",onlineUser)
  console.log("selected user",selectUser?.user?._id)

useEffect(()=>{
  onlineUser.map((item)=>{
    if(item==selectUser?.user?._id){
      setCssOnline("online")
    }else{
      setCssOnline("")
    }
  })

},[selectUser])


  return (
    <div className=" pl-5 pt-5 h-[12vh] flex space-x-4 bg-gray-700 hover:bg-gray-600 duration-300">
      <div>
      <div className={`avatar  ${cssOnline}` }>
          <div className="w-14 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-xl">{selectUser?.user?.username}</h1>
        <span className="text-sm">
        {selectUser?.user?.email}
        </span>
      </div>
    </div>
  );
}

export default Chatuser;