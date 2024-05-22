import { createSlice } from "@reduxjs/toolkit";

// Define initial state
const initialState = {
  socketIdMap: {}, // Map to store socket IDs for each user
};

// Create slice
const socketIdSlice = createSlice({
  name: 'socketId',
  initialState,
  reducers: {
    // Action to set socket ID for a user
    setSocketId(state, action) {
      const { userId, socketId } = action.payload;
      state.socketIdMap[userId] = socketId;
    },
    removeSocketId: (state, action) => {
      delete state.socketIdMap[action.payload.userId];
    },
  },
});

// Export reducer
export default socketIdSlice.reducer;

// Export action creators
export const { setSocketId , removeSocketId } = socketIdSlice.actions;
