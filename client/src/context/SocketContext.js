import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const baseURL = process.env.REACT_APP_API_BASEURL;

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const uniqueId = id + "--__--" + Date.now();
    const newSocket = io(baseURL, { query: { id: uniqueId } });
    setSocket(newSocket);

    return () => newSocket.close();
  }, [id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
