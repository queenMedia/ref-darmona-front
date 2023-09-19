import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  username: "",
  password: "",
  aliases: [],
  thriveId: "",
  email: "",
  blackPageDomains: [],
  cmps: [],
  role: "",
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const payload = action.payload;
      return { ...payload };
    },
    addCmp: (state, action) => {
      const payload = action.payload;
      state.cmps.push(payload);
    },
    updateCmps: (state, action) => {
      const payload = action.payload;
      state.cmps = payload;
    },
    logout: (state, action) => {
      state = initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, addCmp, logout, updateCmps } = userSlice.actions;

export default userSlice.reducer;
