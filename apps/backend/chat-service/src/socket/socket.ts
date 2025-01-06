import { Server, Socket } from "socket.io";
import axios from "axios";
import configs from "../config";
import { Message } from "./socket.message";
// import { log } from "console";
// Create a map to store user socket connections
const userSocketMap: { [key: string]: string } = {};

const setupSocketIO = (io: Server) => {
  const online = Object.keys(userSocketMap);
  io.emit("getOnlineUsers", online);
  // Listen for event connections
  io.on("connection", (socket: Socket) => {
    const cookies = socket.handshake.headers["cookie"];
    // log("cookies:::", cookies);
    if (cookies) {
      const usernameCookie = cookies
        .split("; ")
        .find((cookie) => cookie.startsWith("username=")); // cognito sub
      if (usernameCookie) {
        const username = usernameCookie.split("=")[1];
        console.log(username);

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
      console.log("new message:", data);

      // const cookies = socket.handshake.headers["cookie"];
      try {
        if (cookies) {
          const response = await axios.post(
            `${configs.MessageUrl}/send/${data.receiverId}`,
            { message: data.message },
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
            io.to(receiverSocketId).emit("receiveMessage", savedMessage);
          }
        }
      } catch (error) {
        console.error("Error handling message:", error);
        socket.emit("error", "Failed to process message");
      }
    });

    socket.on("disconnect", () => {
      if (username) {
        // username/sub
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

// import { Server, Socket } from "socket.io";
// import axios from "axios";
// import configs from "../config";
// import { Message } from "./socket.message";
// import cookie from "cookie"; // Use this to parse cookies

// const userSocketMap: { [key: string]: string } = {};

// const setupSocketIO = (io: Server) => {
//   const broadcastOnlineUsers = () => {
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));
//   };

//   io.on("connection", (socket: Socket) => {
//     try {
//       const cookies = cookie.parse(socket.handshake.headers.cookie || "");
//       const username = cookies["username"];
//       console.log(username);
//       console.log("cookies:::::", cookies);

//       if (!username) throw new Error("Username cookie not found");

//       socket.data.username = username;
//       userSocketMap[username] = socket.id;

//       broadcastOnlineUsers();

//       socket.on("sendMessage", async (data: Message) => {
//         console.log("Sending message:", data.receiverId, data.message);

//         try {
//           const response = await axios.post(
//             `${configs.MessageUrl}/send/${data.receiverId}`,
//             { message: data.message },
//             {
//               withCredentials: true,
//               headers: {
//                 Cookie: socket.handshake.headers["cookie"] || "",
//               },
//             }
//           );

//           const savedMessage = response.data.data;
//           const receiverSocketId = userSocketMap[data.receiverId];
//           console.log(userSocketMap);

//           if (receiverSocketId) {
//             io.to(receiverSocketId).emit("receiveMessage", savedMessage);
//           }
//         } catch (err) {
//           socket.emit("error", "Failed to send message");
//           console.error(err);
//         }
//       });

//       socket.on("disconnect", () => {
//         if (socket.data.username) delete userSocketMap[socket.data.username];
//         broadcastOnlineUsers();
//       });
//     } catch (err: unknown | any) {
//       console.error(err.message);
//       socket.disconnect();
//     }
//   });
// };

// export default setupSocketIO;
