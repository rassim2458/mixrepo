import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store";

// define initial state
const initialState = {
    sidebar2:{
        open: false,
        type: "CONTACT",
    },
    chat_type2: null,
    room_id2: null,
}


// create slice
const slice2 = createSlice({
    name:'app2',
    initialState,
    reducers:{
        //Toggle sidebar
        toggleSidebar(state,action){
            state.sidebar2.open = !state.sidebar2.open
        },
        updateSidebarType(state, action){
            state.sidebar2.type = action.payload.type;
        },
        selectConversation(state, action){
            state.chat_type2 = "group";
            state.room_id2 = action.payload.room_id2;
        }
        
    }
});

// export reducer
export default slice2.reducer;

//thunk functions - perform async operations
export function ToggleSidebar (){
    return async (dispatch, getState) =>{
        dispatch(slice2.actions.toggleSidebar());
    }
}

export function UpdateSidebarType (type){
    return async (dispatch, getState) =>{
        dispatch(slice2.actions.updateSidebarType({
            type
        }))
    }
}
export const selectConversation = ({room_id2}) => {
    return (dispatch, getState) => {
        dispatch(slice2.actions.selectConversation({room_id2}));
    }

}
