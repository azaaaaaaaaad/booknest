// src/app/page.js (or your equivalent client-side file)
"use client";

import { IoMdSend } from "react-icons/io";
import { MdSupportAgent } from "react-icons/md";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { io } from "socket.io-client";

// Set up the Socket.IO connection
const socket = io(`${process.env.NEXT_PUBLIC_SERVER_URL}`, {
  path: "/api/chat", // Make sure this matches the server-side configuration
  transports: ["websocket"], // Use websocket transport
});

export default function Chatbox() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Listen for the "receiveMessage" event from the server
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Listen for the "connect" event to confirm a successful connection
    socket.on("connect", () => {
      console.log("Connected to the server");
    });

    // Listen for the "disconnect" event
    socket.on("disconnect", () => {
      console.log("Disconnected from the server");
    });

    // Cleanup on component unmount
    return () => {
      socket.off("receiveMessage");
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Create the message object
      const message = { text: newMessage, sender: "You" };

      // Emit the "sendMessage" event to the server
      socket.emit("sendMessage", message);

      // Clear the input field
      setNewMessage("");
    }
  };

  return (
    <>
      <Navbar />
      <h1 className="text-xl font-bold md:text-5xl text-center lg:mt-52 md:mt-48 mt-32">
        Chat with Agent
      </h1>
      <h1 className="text-3xl font-bold md:text-5xl flex justify-center items-center mb-5">
        <MdSupportAgent />
      </h1>
      <div className="flex flex-col h-full mt-10 max-w-md mx-auto my-5 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col flex-grow p-4 overflow-auto h-96">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded-lg ${
                message.sender === "You"
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-200 text-gray-800 self-start"
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="flex p-4 border-t border-gray-200">
          <input
            type="text"
            className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            className="p-2 bg-blue-500 text-white rounded-r-lg flex justify-center items-center gap-2"
            onClick={handleSendMessage}
          >
            Send <IoMdSend />
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
