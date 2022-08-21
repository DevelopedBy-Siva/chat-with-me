import MessageToaster from "./ToastContainer";
import UserToaster from "./ToastContainer";
import {
  MESSAGE_TOAST_CONTAINER_ID,
  MESSAGE_TOAST_LIMIT,
} from "./MessageToastUtils";
import { USER_TOAST_CONTAINER_ID, USER_TOAST_LIMIT } from "./UserToastUtils";

export default function AppToastWrapper() {
  return (
    <>
      <MessageToaster
        containerId={MESSAGE_TOAST_CONTAINER_ID}
        limit={MESSAGE_TOAST_LIMIT}
      />
      <UserToaster
        containerId={USER_TOAST_CONTAINER_ID}
        limit={USER_TOAST_LIMIT}
      />
    </>
  );
}
