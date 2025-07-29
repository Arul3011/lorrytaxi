// src/socket.ts
import { io, Socket } from "socket.io-client";

// Replace with your backend URL
const SOCKET_URL = "http://localhost:3000";

export const socket: Socket = io(SOCKET_URL, {
  autoConnect: false, // so you can control when to connect
  transports: ["websocket"], // optional, for forcing WebSocket
});
