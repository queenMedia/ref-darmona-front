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
  bearer: "",
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
    logout: (state, action) => {
      state = initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, addCmp ,logout } = userSlice.actions;

export default userSlice.reducer;
