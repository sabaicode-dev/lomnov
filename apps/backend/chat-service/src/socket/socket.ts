// Import necessary modules
import { Server, Socket } from "socket.io";// Import Server and Socket types from socket.io
// Import axios for making HTTP requests
import axios from "axios";
// Import configuration settings
import configs from "../config";
// Import Message type or class from socket.message.ts
import { Message } from "./socket.message";
// Create a map to store user socket connections
const userSocketMap: { [key: string]: string } = {};

// Setup socket.io connection Server
// 1st arg is the socket.io server instance
const setupSocketIO = (io: Server) => {
  const online = Object.keys(userSocketMap);
  // Emit the event list of online users to all connected clients
  io.emit("getOnlineUsers", online);
  // Listen for event connections
  io.on("connection", (socket: Socket) => {
    // console.log("user socket id:::", socket.id);
    // Get cookies from the socket handshake headers
    const cookies = socket.handshake.headers["cookie"];

    if (cookies) {
      const usernameCookie = cookies
        .split("; ")
        .find((cookie) => cookie.startsWith("username="));// cognito sub
      if (usernameCookie) {
        const username = usernameCookie.split("=")[1];

        socket.data.username = username;
        userSocketMap[username] = socket.id;
      } else {
        console.error("username/sub cookie not found.");
        return socket.disconnect(true);
      }
    } else {
      console.error("No cookies found in the handshake headers");
      return socket.disconnect(true);
    }

    const username = socket.data.username;
    if (username) {
      const online = Object.keys(userSocketMap);
      io.emit("getOnlineUsers", online);
      console.log("user is online:::", online);
    }

    socket.on("sendMessage", async (data: Message) => {
      const cookies = socket.handshake.headers["cookie"];
      try {
        if (cookies) {
          const response = await axios.post(`${configs.MessageUrl}/send/${data.receiverId}`,{message: data.message},
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
                Cookie: cookies,
              },
            }
          );

          const savedMessage = response.data.data;
          const receiverSocketId = userSocketMap[data.receiverId];

          if (savedMessage && receiverSocketId) {
            console.log("Message delivered to:", receiverSocketId);
            io.to(receiverSocketId).emit("receiveMessage", savedMessage);
          }
        }
      } catch (error) {
        console.error("Error handling message:", error);
        socket.emit("error", "Failed to process message");
      }
    });

    socket.on("disconnect", () => {
      if (username) { // username/sub
        delete userSocketMap[username]; // username/sub
        const online = Object.keys(userSocketMap);
        console.log("after dis::", online);

        io.emit("getOnlineUsers", online);
      }
      console.log("User disconnected:", socket.id);
    });
  });
};

export default setupSocketIO;
