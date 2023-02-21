import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import Contacts from "./reducers/Contacts";
import Chats from "./reducers/Chats";

export default configureStore({
  reducer: {
    contacts: Contacts,
    chats: Chats,
  },
  middleware: [thunk],
});
