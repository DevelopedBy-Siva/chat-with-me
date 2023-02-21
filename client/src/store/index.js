import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import Contacts from "./reducers/Contacts";

export default configureStore({
  reducer: {
    contacts: Contacts,
  },
  middleware: [thunk],
});
