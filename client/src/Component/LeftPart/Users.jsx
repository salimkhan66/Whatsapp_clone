import React, { useEffect, useState } from "react";
import User from "./User";

import axios from "axios";

function Users() {
  
  const [allUser, setAllUser] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
        try {
            const allUser = await axios.get("http://localhost:8080/user/allusers", {
                withCredentials: true
            });
           console.log(allUser.data);
            setAllUser(allUser.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    fetchData();
}, []);

 
  return (
    <div>
      <h1 className="px-8 py-2 text-white font-semibold bg-slate-800 rounded-md">
        Messages
      </h1>
      <div
        className="py-2 flex-1 overflow-y-auto"
        style={{ maxHeight: "calc(84vh - 10vh)" }}
      >
        {
          allUser.map(user => (
            <User key={user._id} user={user} />
          ))
        }
      
     
      </div>
    </div>
  );
}

export default Users;