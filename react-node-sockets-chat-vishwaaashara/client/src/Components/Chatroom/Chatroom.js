import React, { useRef } from "react";
import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import socket from "../../socket";
import "./chatroom.css";


function Chatroom({ name }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    socket.on("update", (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: "System", text: data.message },
      ]);
    });
    return () => {
      socket.off("receiveMessage");
      socket.off("update");
    };
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (name) {
      socket.emit("joinChat", name);
      console.log(name);
    }
  }, [name]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("sendMessage", { user: name, text: message });
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage(e);
    }
  };
  const leaveChat = () =>{
    socket.emit("leaveChat",name);
    navigate('/');
  };

  return (
    <div className="main-container">
      <div className="heading">
        <h2>Chat App</h2>
        <button className="close-button" onClick={leaveChat}> close </button>
      </div>
      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.user === name ? "sent" : msg.user === "System" ? "system" : "received"}`}
          >
            <div className="message-content">
                <div className="user-name"><strong>{msg.user} </strong></div>
                <div className="user-message"> {msg.text}</div>
             
            </div>
          </div>
        ))}
      </div>
      <div className="send-message">
        <input
          ref={inputRef}
          className="input-message"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="send-button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatroom;
