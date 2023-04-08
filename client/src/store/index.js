import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import Contacts from "./reducers/Contacts";
import Chats from "./reducers/Chats";
import User from "./reducers/User";

export default configureStore({
  reducer: {
    contacts: Contacts,
    chats: Chats,
    user: User,
  },
  middleware: [thunk],
});
