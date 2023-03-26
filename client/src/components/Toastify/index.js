import "react-toastify/dist/ReactToastify.css";

import MessageToastContainer from "./MessageToastContainer";
import UserToastContainer from "./UserToastContainer";

export default function AppToasts() {
  return (
    <>
      <MessageToastContainer />
      <UserToastContainer />
    </>
  );
}
