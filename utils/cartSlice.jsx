import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        items:[],
        totalPrice : 0 
    },
    reducers:{
        addItem : (state , action) => {
            const existingItem = state.items.find((item) => {
                return item.card.info.id === action.payload.card.info.id
            });
            if(existingItem)
            {
                existingItem.quantity += 1;
            }
            else{
                state.items.push({...action.payload , quantity : 1})
            }

            state.totalPrice = state.items.reduce((sum , items) => {
                return  sum = sum + ((items.card.info.price || items.card.info.defaultPrice)/100) * items.quantity;
            } , 0)
            
        },
        removeItem: (state , action) => {
            state.items = state.items.filter((item) => {
                return item.card.info.id != action.payload
            })

             state.totalPrice = state.items.reduce((sum , items) => {
                return  sum = sum + ((items.card.info.price || items.card.info.defaultPrice)/100) * items.quantity;
            } , 0)
        },
        clearItems : (state , action) => {
            state.items.length = 0;
        } , 

        updateItems : (state , action) => {
            const itemFind = state.items.find((item) => {
                return item.card.info.id === action.payload.id;
            })
            if(itemFind)
            {
                itemFind.quantity = action.payload.inputValue;
                state.totalPrice = state.items.reduce((sum , items) => {
                return  sum = sum + ((items.card.info.price || items.card.info.defaultPrice)/100) * items.quantity;
            } , 0)
            }
            

        }


    }
})


export const {addItem , removeItem , clearItems , updateItems} =  cartSlice.actions;
export default cartSlice.reducer;