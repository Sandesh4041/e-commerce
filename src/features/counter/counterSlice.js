import { createSlice } from '@reduxjs/toolkit'

const initialState={
   cart:[],
   total:0
};

export const counterSlice=createSlice({
name:'cart',
initialState,
reducers:{
addTocart(state,action){
    state.cart.push(action.payload);
    state.total=state.cart.reduce((sum,item)=>sum+item.subTotal,0)
},
removeFromCart(state,action){
    state.cart = state.cart.filter(item => {
        return item.itemId !== action.payload.id;
      });
    state.total=state.cart.reduce((sum,item)=>sum+item.subTotal,0)
},
increaseCart(state,action){
    state.cart.forEach((item)=>{
        if(item.itemId===action.payload.id){
            item.itemTotal+=1;
              item.subTotal=parseFloat(item.itemPrice.replace("$",""))*item.itemTotal;
            
        }
    })
    state.total=state.cart.reduce((sum,item)=>sum+item.subTotal,0)
},
decreaseCart(state,action){
    state.cart.forEach((item)=>{
        if(item.itemId===action.payload.id){
            if(item.itemTotal>1){
                item.itemTotal-=1;
                item.subTotal=parseFloat(item.itemPrice.replace("$",""))*item.itemTotal;
            }
        }
    })
    state.total=state.cart.reduce((sum,item)=>sum+item.subTotal,0)
}
} 

})
export const {addTocart,removeFromCart,increaseCart,decreaseCart} =counterSlice.actions
export default counterSlice.reducer