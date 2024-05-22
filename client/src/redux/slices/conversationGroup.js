import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store";
import { faker } from "@faker-js/faker";

const user_id = window.localStorage.getItem("user")

const initialState = {
 
  group_chat: {
    conversations2: [],
    current_conversation: null,
    current_messages: [],
  },
};

const slice = createSlice({
  name: "conversationn",
  initialState,
  reducers: {
    fetchDirectConversations(state, action) {

      const list = action.payload.conversations2.map((el) => {
        const this_user = el.participants.find((elm) => elm._id.toString() !== user_id);
        return {
          id: el._id,
          user_id: this_user._id,
          name: '${this_user.firstName} ${this_user.lastName}',
          online: this_user.status === "online",
          img: faker.image.avatar(),
          msg: faker.music.songName(),
          time: "9:36",
          unread: 0,


        }
      })

    
      state.group_chat.conversations2 = list;
    },


 
  },
});
export default slice.reducer;


export const fetchDirectConversations = ({ conversations2 }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.fetchDirectConversations({ conversations2 }))
  }
}