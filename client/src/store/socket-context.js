import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      console.log("🔗 Attempting to connect to socket...");
      console.log("🔗 API Base URL:", process.env.REACT_APP_API_BASE_URL);

      const apiUrl =
        process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
      console.log("🔗 Connecting to:", apiUrl);

      const newSocket = io(apiUrl, {
        withCredentials: true,
        transports: ["websocket", "polling"],
        timeout: 20000,
        forceNew: true,
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5,
      });

      setSocket(newSocket);

      newSocket.on("connect", () => {
        console.log("✅ Connected to server with socket ID:", newSocket.id);
        setIsConnected(true);
      });

      newSocket.on("disconnect", (reason) => {
        console.log("🔌 Disconnected from server. Reason:", reason);
        setIsConnected(false);
      });

      newSocket.on("connect_error", (error) => {
        console.error("❌ Connection error:", error.message);
        console.error("❌ Error details:", error);
        console.error("❌ Trying to connect to:", apiUrl);
        setIsConnected(false);
      });

      // Add reconnection event handlers
      newSocket.on("reconnect", (attemptNumber) => {
        console.log("🔄 Reconnected after", attemptNumber, "attempts");
        setIsConnected(true);
      });

      newSocket.on("reconnect_error", (error) => {
        console.error("❌ Reconnection error:", error.message);
      });

      newSocket.on("reconnect_failed", () => {
        console.error("❌ Failed to reconnect to server");
        setIsConnected(false);
      });

      return () => {
        console.log("🔌 Cleaning up socket connection");
        newSocket.close();
        setSocket(null);
        setIsConnected(false);
      };
    } else {
      console.log("⚠️ No user available for socket connection");
      // Clean up socket if user is removed
      if (socket) {
        socket.close();
        setSocket(null);
        setIsConnected(false);
      }
    }
  }, [user]); // Removed socket from dependencies to avoid circular updates

  const joinAskRoom = (askId) => {
    if (socket && socket.connected) {
      console.log("🏠 Joining ask room:", askId);
      socket.emit("join-ask", askId);
    } else {
      console.warn("⚠️ Cannot join room - socket not connected");
      console.warn("⚠️ Socket state:", {
        socket: !!socket,
        connected: socket?.connected,
        isConnected,
      });
    }
  };

  const leaveAskRoom = (askId) => {
    if (socket && socket.connected) {
      console.log("🚪 Leaving ask room:", askId);
      socket.emit("leave-ask", askId);
    }
  };

  const sendMessage = (askId, message) => {
    if (socket && socket.connected) {
      console.log("📤 Sending message to ask:", askId);
      socket.emit("send-message", { askId, message });
    } else {
      console.warn("⚠️ Cannot send message - socket not connected");
      console.warn("⚠️ Socket state:", {
        socket: !!socket,
        connected: socket?.connected,
        isConnected,
      });
    }
  };

  const value = {
    socket,
    isConnected,
    joinAskRoom,
    leaveAskRoom,
    sendMessage,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
