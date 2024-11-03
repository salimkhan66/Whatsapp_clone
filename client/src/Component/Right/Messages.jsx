import React  from "react";
import Message from "./Message";

function Messages() {

  return (
    <div
      className="flex-1 overflow-y-auto"
      style={{ minHeight: "calc(92vh - 8vh)" }}
    >
    <Message/>
    <Message/>
    <Message/>
    <Message/>

    
        <div>
          <p className="text-center mt-[20%]">
            Say! Hi to start the conversation
          </p>
        </div>
  
    </div>
  );
}

export default Messages;