"use client";
import { createContext, useContext, useEffect, useState } from "react";
import socket from "@/libs/const/socketClient"; // Assuming this is a singleton that manages socket connections
import { Socket } from "socket.io-client";
import { useAuth } from "./user";
type SocketContextType  = {
  onlineUsers: { [key: string]: boolean }; // Map user IDs to online status
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketContext must be used within a SocketContextProvider");
  }
  return context;
};

export const SocketContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [onlineUsers, setOnlineUsers] = useState<{ [key: string]: boolean }>({});
  const { user } = useAuth();
  const userId = user?.cognitoSub;
  console.log("userId:", userId);
  console.log(user);
  
  
  useEffect(() => {
    if (userId) {
      if (!socket.connected) {
        console.log("Connecting socket...");
        socket.connect();
      }

      // Listen for online users
      socket.on("getOnlineUsers", (users: string[]) => {
        const onlineStatus = users.reduce<{ [key: string]: boolean }>((acc, id) => {
          acc[id] = true;
          return acc;
        }, {});
        setOnlineUsers(onlineStatus);
      });

      // Notify server the user is online
      socket.emit("userOnline", userId);

      // Cleanup
      return () => {
        socket.off("getOnlineUsers");
        if (socket.connected) {
          socket.emit("userOffline", userId);
          socket.disconnect();
        }
      };
    } else {
      if (socket.connected) {
        socket.disconnect();
      }
    }
  }, [userId]);

  console.log("Online users:", onlineUsers);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
