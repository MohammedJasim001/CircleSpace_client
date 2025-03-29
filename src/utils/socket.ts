import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:5010"; // Backend URL

let socket: Socket | null = null;

export const connectSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, { withCredentials: true });
  }
  return socket;
};

export const getSocket = () => socket;
