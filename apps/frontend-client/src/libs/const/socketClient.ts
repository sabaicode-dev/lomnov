import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:4004", {
    withCredentials: true
});

export default socket;