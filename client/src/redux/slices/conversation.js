import { createSlice } from "@reduxjs/toolkit";
import { faker } from "@faker-js/faker"; // Make sure to import faker correctly

const user_id = window.localStorage.getItem("user");

const initialState = {
  direct_chat: {
    conversations: [],
    current_conversation: null,
    current_messages: [],
    otherUser: null,
  },
};

const slice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    fetchDirectConversations(state, action) {
      const list = action.payload.conversations.map((el) => {
        const this_user = el.participants.find((elm) => elm._id.toString() !== user_id);
        return {
          id: el._id,
          user_id: this_user._id,
          name: `${this_user.firstName} ${this_user.lastName}`,
          online: this_user.status === "online",
          img: faker.image.avatar(),
          msg: faker.music.songName(),
          time: "9:36",
          unread: 0,
        };
      });
      state.direct_chat.conversations = list;
    },
    updateDirectConversation(state, action) {
      // Update conversation logic here
    },
    addDirectConversation(state, action) {
      // Add conversation logic here
    },
    setOtherUser: (state, action) => {
      state.direct_chat.otherUser = action.payload;
    },
  },
});

export default slice.reducer;

export const fetchDirectConversations = ({ conversations, userInfo }) => {
  return async (dispatch, getState) => {
    // Dispatch fetchDirectConversations action
    dispatch(slice.actions.fetchDirectConversations({ conversations }));

    // Fetch userInfo here
    const otherUser = userInfo; // Assuming userInfo contains the other user information

    // Dispatch setOtherUser action to store otherUser in Redux state
    dispatch(slice.actions.setOtherUser(otherUser));
  };
};
