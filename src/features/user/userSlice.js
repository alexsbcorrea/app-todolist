import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  TDuser: "",
  TDemail: "",
  TDimage: "",
  TDimageId: "AlexId",
  TDtoken: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    register: (state, action) => {
      state.TDuser = action.payload.user;
      state.TDemail = action.payload.email;
      state.TDimage = action.payload.image;
      state.TDimageId = action.payload.imageId;
      state.TDtoken = action.payload.token;
    },
    login: (state, action) => {
      state.TDuser = action.payload.user;
      state.TDemail = action.payload.email;
      state.TDimage = action.payload.image;
      state.TDimageId = action.payload.imageId;
      state.TDtoken = action.payload.token;
    },

    logout: (state, action) => {
      state.TDuser = "";
      state.TDemail = "";
      state.TDimage = "";
      state.TDimageId = "";
      state.TDtoken = "";
    },

    profileupdate: (state, action) => {
      state.TDuser = action.payload.user;
      state.TDemail = action.payload.email;
      state.TDimage = action.payload.image;
      state.TDimageId = action.payload.imageId;
    },
    profilephoto: (state, action) => {
      state.TDimageId = action.payload.imageId;
    },
  },
});

export const { register, login, logout, profileupdate, profilephoto } =
  userSlice.actions;

export default userSlice.reducer;
