import { configureStore, createStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});