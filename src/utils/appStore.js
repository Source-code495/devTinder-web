
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./conneimport { configureStore } from "@reduxjs/toolkit";ctionSlice";
import requestReducer from "./requestSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections:connectionReducer,
    requests : requestReducer,
  },
});

export default appStore;
