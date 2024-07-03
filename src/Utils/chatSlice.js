import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState:{
        messages:[]
    }
    , reducers:{
        addMessage: (state, action)=>{
            state.messages.splice(1,50)
            state.messages.unshift(action.payload)
        },
        clearChat : (state)=>{
            state.messages.length = 0
        }
    }

})

export const {addMessage, clearChat} = chatSlice.actions

export default chatSlice.reducer