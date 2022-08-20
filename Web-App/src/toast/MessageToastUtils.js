import { toast } from "react-toastify";

import ChatToastComponent from "./ChatToastComponent";
import DEFAULT_AVATAR from "../images/profile_avatar.webp";

export const MESSAGE_TOAST_LIMIT = 3;
export const MESSAGE_TOAST_PREFIX = "MSG_";
export const MESSAGE_TOAST_CONTAINER_ID = "message-toast-container";

const DEFAULT_MESSAGE = "Hey...How do you do?";

const MESSAGE_TOAST_DEFAULT_PROPS = {
  id: "MESSAGE_DEFAULT_ID",
  position: "top-center",
  duration: 6000,
};

const MESSAGE_TOAST_USER_DEFAULT_PROPS = {
  id: "unknown_id",
  name: "UNKNOWN",
  avatar: DEFAULT_AVATAR,
  message: DEFAULT_MESSAGE,
};

export const notify = (user, userDefined_props) => {
  let TOAST_ID;
  if (user && user.id) TOAST_ID = MESSAGE_TOAST_PREFIX + user.id;
  if (userDefined_props && userDefined_props.id)
    TOAST_ID = MESSAGE_TOAST_PREFIX + userDefined_props.id;

  userDefined_props = {
    ...MESSAGE_TOAST_DEFAULT_PROPS,
    ...userDefined_props,
  };

  if (TOAST_ID) userDefined_props = { ...userDefined_props, id: TOAST_ID };

  user = { ...MESSAGE_TOAST_USER_DEFAULT_PROPS, ...user };

  toast.custom(
    (props) => <ChatToastComponent user={user} toastProps={props} />,
    userDefined_props
  );
};
