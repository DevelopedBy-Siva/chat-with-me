import React, { useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import io from "socket.io-client";

const baseURL = process.env.REACT_APP_API_BASEURL;

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ id, token, children }) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const uniqueId = id + "--__--" + uuid();
    const newSocket = io(baseURL, { query: { id: uniqueId, token } });
    setSocket(newSocket);

    return () => newSocket.close();
  }, [id, token]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
