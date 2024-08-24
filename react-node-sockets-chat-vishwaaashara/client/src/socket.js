import { io } from "socket.io-client";

const socket = io.connect("https://react-node-sockets-chat-vishwaaashara.onrender.com");

export default socket;
