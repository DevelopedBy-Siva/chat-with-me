import React, { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
import ToastContainer from "../../Toast/MessageToast";

export default function Chat() {
  const dispatch = useDispatch();

  const socket = useSocket();

  const { active } = useSelector((state) => state.chats);

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
        if (active.val !== chatId)
          toast.msg(
            data.message,
            senderName,
            senderAvatarId,
            senderEmail,
            chatId,
            isPrivate,
            data.sendBy
          );
      }
    );

    socket.on("is-online", ({ online = [] }) => {
      dispatch(updateOnlineContacts(online));
    });

    return () => {
      socket.off("receive-message");
      socket.off("is-online");
    };
  }, [socket, active, dispatch]);

  return (
    <React.Fragment>
      <Suspense fallback={<LoadingBar />}>
        <Outlet />
      </Suspense>
      <SideBar />
      <ChatContainer />
      <ToastContainer />
    </React.Fragment>
  );
}
