import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name:"app",
    initialState:{
        isMenuOpen:true,
        isOnPhone:false
    },
    reducers:
    {
        toogleMenu:(state)=>{
            state.isMenuOpen = !state.isMenuOpen },
    
        collapseMenu:(state)=>{
            state.isMenuOpen = false
        },
        isphone:(state) => {
            state.isOnPhone = true
        }
    }
})

export const {toogleMenu, collapseMenu, isphone} = appSlice.actions

export default appSlice.reducer




