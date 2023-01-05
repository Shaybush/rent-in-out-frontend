import { createSlice } from "@reduxjs/toolkit";
const initialstate = {
  register: false,
  message: {
    isShow: false,
    info: "",
    action: null,
  },
  search: false,
  likes: {
    active: false,
    likesArr: [],
  },
  postShow: {
    active: false,
    post: {},
  },
  showInbox: false,
};

const toggleSlice = createSlice({
  name: "toggle",
  initialState: initialstate,
  reducers: {
    onRegisterToggle: (state) => {
      state.register = true;
    },
    onRegisterShow: (state) => {
      state.register = !state.register;
    },
    onLogout: (state) => {
      state.register = false;
    },
    onSearchToggle: (state) => {
      state.search = !state.search;
    },
    onLikesToggle: (state, action) => {
      state.likes.active = !state.likes.active;
      state.likes.likesArr = action.payload;
    },
    onMessegeToggle: async (state, action) => {
      state.message.isShow = !state.message.isShow;
      state.message.info = action.payload.info;
      state.message.action = action.payload.action;
    },
    onInboxToggle: (state) => {
      state.showInbox = !state.showInbox;
    },
    onInboxClose: (state) => {
      state.showInbox = false;
    },
    onPostToggle: (state, action) => {
        console.log(action.payload)
      state.postShow.active = !state.postShow.active;
      state.postShow.post = action.payload;
    },
  },
});

export const {
  onToggle,
  onRegisterToggle,
  onSearchToggle,
  onLogout,
  onRegisterShow,
  onLikesToggle,
  onMessegeToggle,
  onInboxToggle,
  onInboxClose,
  onPostToggle,
} = toggleSlice.actions;
export default toggleSlice.reducer;
