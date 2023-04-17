import React, { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";

import SideBar from "../Chat/SideBarContainer";
import ChatContainer from "../Chat/ChatContainer";
import LoadingBar from "../../Loader/LoadingBar";
import { useSocket } from "../../../context/SocketContext";

export default function Chat() {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
    socket.on("receive-message", (msg) => {
      console.log(msg);
    });
    return () => socket.off("receive-message");
  }, [socket]);

  return (
    <React.Fragment>
      <Suspense fallback={<LoadingBar />}>
        <Outlet />
      </Suspense>
      <SideBar />
      <ChatContainer />
    </React.Fragment>
  );
}
