// Redux/features/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  quantity: number;
  name: string;
  description: string;
  image: string;
  price: number;
}

interface CartState {
  items: Record<string, CartItem>;
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: {},
  } as CartState,
  
  reducers: {
    incremented: (
      state,
      action: PayloadAction<{ id: string; name: string; description: string; image: string ,price: number }>
    ) => {
      const { id, name, description, image,price } = action.payload;
      if (state.items[id]) {
        state.items[id].quantity += 1;
      } else {
        state.items[id] = {
          quantity: 1,
          name,
          description,
          image,
          price
        };
      }
    },
    decremented: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      if (state.items[id] && state.items[id].quantity > 0) {
        state.items[id].quantity -= 1;
      }
    },
    reset: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      if (state.items[id]) {
        state.items[id].quantity = 0;
      }
    }
  }
});

export const { incremented, decremented, reset } = cartSlice.actions;
export default cartSlice.reducer;
