import { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import DEPLOYED_URL from "@/constants/deploymentURL";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(undefined);
  const [userOnline, setUserOnline] = useState(0);

  useEffect(() => {
    const newSocket = io.connect(DEPLOYED_URL);

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    setSocket(newSocket);

    newSocket.on("user_online", (count) => {
      setUserOnline(count);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, userOnline }}>
      {children}
    </SocketContext.Provider>
  );
};
