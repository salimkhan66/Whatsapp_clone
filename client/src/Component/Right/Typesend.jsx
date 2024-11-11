import axios from "axios";
import React, { useContext } from "react";
import { IoSend } from "react-icons/io5";
import { MsgContext } from '../../Context/messageProvider';
import { socketContext } from '../../Context/socketConnection';
import { GetMsgContext } from "../../Context/getMessage";
import { useAuth } from '../../Context/authProvider';

function Typesend({ selectUser }) {
  const [authUser, setAuthUser] = useAuth();

  const [sendMsg, setSendMsg] = useContext(MsgContext);
  const { onlineUser, socket } = useContext(socketContext);
  const [messageData, setMessageData]=useContext(GetMsgContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectUser || !selectUser?.user?._id) {
      console.error("No user selected.");
      return;
    }
    if (!sendMsg.trim()) {
      console.error("Message is empty.");
      return;
    }

    const msg = {
      toUserId: selectUser?.user?._id,
      msg: sendMsg,
    };

    // Emit the message to the server
    socket.emit("sendMsg", msg);

    setMessageData((prevMessages) => [
      ...prevMessages,
      {
        message: sendMsg,
        senderId:authUser?.user?._id , // Assuming the socket ID represents the sender
        receiverId: selectUser.user._id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ]);
    setSendMsg("")

    // Send message via axios to the backend server
    try {
      const sendmessage = await axios.post(
        `http://localhost:8080/message/send/${selectUser?.user?._id}`,
        { message: sendMsg },
        { withCredentials: true }
      );
      if (sendmessage.status === 200) {
        setSendMsg("");
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-1 h-[8vh] bg-gray-800">
        <div className="w-[70%] mx-4">
          <input
            type="text"
            placeholder="Type here"
            value={sendMsg}
            className="border-[1px] border-gray-700 flex items-center w-full py-3 px-3 rounded-xl grow outline-none bg-slate-900 mt-1"
            onChange={(e) => setSendMsg(e.target.value)}
          />
        </div>
        <button type="submit">
          <IoSend className="text-3xl" />
        </button>
      </div>
    </form>
  );
}

export default Typesend;
