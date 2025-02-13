import { createSlice } from '@reduxjs/toolkit'

const initialState=[]

export const counterSlice=createSlice({
name:'cart',
initialState,
reducers:{
addTocart(state,action){
    state.push(action.payload);
},
removeFromCart(state,action){
    return state.filter(item => item.itemId !== action.payload.id);
},
} 

})
export const {addTocart,removeFromCart} =counterSlice.actions
export default counterSlice.reducer