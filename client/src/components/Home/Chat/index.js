import React, { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import SideBar from "../Chat/SideBarContainer";
import ChatContainer from "../Chat/ChatContainer";
import LoadingBar from "../../Loader/LoadingBar";
import { useSocket } from "../../../context/SocketContext";
import { updateMessageReceived } from "../../../store/actions/ChatActions";
import {
  updateLastMsgAndTmstp,
  updateOnlineContacts,
} from "../../../store/actions/ContactActions";
import toast from "../../Toast";
import MessageToastContainer from "../../Toast/MessageToastContainer";

export default function Chat() {
  const dispatch = useDispatch();

  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
    socket.on(
      "receive-message",
      ({
        data,
        chatId,
        isPrivate,
        senderName,
        senderAvatarId,
        senderEmail,
      }) => {
        dispatch(updateMessageReceived(chatId, data));
        dispatch(
          updateLastMsgAndTmstp(chatId, data.message, data.createdAt, isPrivate)
        );
        toast.msg(data.message, senderName, senderAvatarId, senderEmail);
      }
    );

    socket.on("is-online", ({ online = [] }) => {
      dispatch(updateOnlineContacts(online));
    });

    return () => {
      socket.off("receive-message");
      socket.off("is-online");
    };
  }, [socket, dispatch]);

  return (
    <React.Fragment>
      <Suspense fallback={<LoadingBar />}>
        <Outlet />
      </Suspense>
      <SideBar />
      <ChatContainer />
      <MessageToastContainer />
    </React.Fragment>
  );
}
