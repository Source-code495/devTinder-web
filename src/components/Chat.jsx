import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import createSocketConnection from "../utils/socket"
import { useSelector } from "react-redux";
import { BASE_URL } from '../utils/constansts';
import axios from "axios";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    console.log(chat.data.messages);

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
      };
    });
    setMessages(chatMessages);
  };
  useEffect(() => {
    fetchChatMessages();
  }, []);
  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    // As soon as the page loads the connection is made and joinChat event is emitted 
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      console.log(firstName + " " + text);
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
    });

    return () => {
      socket.disconnet();
    };
  }, [userId, targetUserId, user?.firstName]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && newMessage.trim()) {
      sendMessage();
    }
  };

  return (
    <div className="w-3/4 mx-auto bg-base-300 shadow-xl rounded-lg m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 font-bold text-xl border-b border-base-content/20">Chat</h1>
      <div className="flex-1 overflow-auto p-5">
        {messages.map((msg, index) => {
          const isMyMessage = user.firstName === msg.firstName;
          return (
            <div
              key={index}
              className={
                "chat " +
                (isMyMessage ? "chat-end" : "chat-start")
              }
            >
              <div className="chat-header text-sm">
                {`${msg.firstName} ${msg.lastName}`}
                <time className="text-xs opacity-50 ml-1">2 hours ago</time>
              </div>
              <div className={`chat-bubble ${isMyMessage ? "chat-bubble-primary" : "chat-bubble-secondary"}`}>
                {msg.text}
              </div>
              <div className="chat-footer opacity-50 text-xs">Seen</div>
            </div>
          );
        })}
      </div>
      <div className="p-5 border-t border-base-content/20 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
          className="flex-1 input input-bordered bg-base-100"
        />
        <button 
          onClick={sendMessage} 
          className="btn btn-primary"
          disabled={!newMessage.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;