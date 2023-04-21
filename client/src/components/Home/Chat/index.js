import React, { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import SideBar from "../Chat/SideBarContainer";
import ChatContainer from "../Chat/ChatContainer";
import LoadingBar from "../../Loader/LoadingBar";
import { useSocket } from "../../../context/SocketContext";
import { updateMessageReceived } from "../../../store/actions/ChatActions";
import {
  updateLastMsgAndTmstp,
  updateOnlineContacts,
} from "../../../store/actions/ContactActions";

export default function Chat() {
  const dispatch = useDispatch();

  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
    socket.on("receive-message", ({ data, chatId, isPrivate }) => {
      dispatch(updateMessageReceived(chatId, data));
      dispatch(
        updateLastMsgAndTmstp(chatId, data.message, data.createdAt, isPrivate)
      );
    });

    socket.on("is-online", ({ online = [] }) => {
      dispatch(updateOnlineContacts(online));
    });

    return () => {
      socket.off("receive-message");
      socket.off("is-online");
    };
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
