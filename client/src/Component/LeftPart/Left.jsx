import React, { useEffect, useState } from "react";
import Search from "./Search";
import Users from "./Users";

function Left() {
  const [userName,setUserName]=useState("")
  useEffect(()=>{
  const user = JSON.parse(localStorage.getItem("messenger")) || "";
  user?setUserName(user.user.username):"not found";
  // console.log("Login user",user);
  },[])
  return (
    <div className="w-[30%] bg-black text-gray-300">
      <span className="font-bold text-2xl p-2 px-11">Chats</span> <span className="font-bold text-xl p-2 px-5">{userName}</span>
    {/* <div className="w-full   bg-black text-gray-300"> */}
      <Search/>
      <div
        className=" flex-1  overflow-y-auto"
        style={{ minHeight: "calc(84vh - 10vh)" }}
      >
        <Users />
      </div>
   
    </div>
  
  );
}

export default Left;