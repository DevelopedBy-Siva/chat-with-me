import React, { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import SideBar from "../Chat/SideBarContainer";
import ChatContainer from "../Chat/ChatContainer";
import LoadingBar from "../../Loader/LoadingBar";
import { useSocket } from "../../../context/SocketContext";
import {
  setActive,
  updateMessageReceived,
} from "../../../store/actions/ChatActions";
import {
  addContactToGroup,
  addNewContact,
  createUserGroup,
  removeMemberFromGroup,
  removeUserGroup,
  updateLastMsgAndTmstp,
  updateOnlineContacts,
} from "../../../store/actions/ContactActions";
import toast from "../../Toast";
import ToastContainer from "../../Toast/MessageToast";
import localStorage from "../../../utils/MessageLocal";

export default function Chat() {
  const dispatch = useDispatch();

  const socket = useSocket();

  const { active } = useSelector((state) => state.chats);

  useEffect(() => {
    if (!socket) return;

    socket.emit("getOnline");
  }, [socket]);

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
        newContact,
      }) => {
        if (newContact) dispatch(addNewContact(newContact));

        dispatch(updateMessageReceived(chatId, data));
        dispatch(
          updateLastMsgAndTmstp(
            chatId,
            data.message,
            data.createdAt,
            data.msgId,
            isPrivate
          )
        );
        if (active.val === chatId) localStorage.saveMessage(chatId, data.msgId);

        if (active.val !== chatId && !data.isNotification)
          toast.msg(
            data.message,
            senderName,
            senderAvatarId,
            senderEmail,
            chatId,
            isPrivate,
            data.sendBy,
            data.msgId
          );
      }
    );

    socket.on("online", ({ online = [] }) => {
      dispatch(updateOnlineContacts(online));
    });

    socket.on("new-group", (data = {}) => {
      dispatch(createUserGroup(data));
    });

    socket.on("group-deleted", (chatId) => {
      if (chatId === active.val) dispatch(setActive(null, true));
      dispatch(removeUserGroup(chatId));
    });

    socket.on("kicked-from-group", (chatId) => {
      // if (chatId === active.val) dispatch(setActive(null, true));
      // dispatch(removeUserGroup(chatId));
    });

    socket.on("leave-chat", ({ chatId, email, admin }) => {
      dispatch(removeMemberFromGroup(chatId, email, admin));
    });

    socket.on("new-group-member", ({ chatId, data }) => {
      dispatch(addContactToGroup(chatId, data));
    });

    return () => {
      socket.off("receive-message");
      socket.off("online");
      socket.off("new-group");
      socket.off("group-deleted");
      socket.off("kicked-from-group");
      socket.off("leave-chat");
      socket.off("new-group-member");
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
