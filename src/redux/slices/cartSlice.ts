import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import hash from 'object-hash';
import { RootState } from '../store';

export type CartItemType = {
    hash: string;
    item: {
        name: string;
        price: number;
        imageUrl: string;
        parentId: number;
    };
    params: {
        type: string;
        size: number;
    };
    count: number;
};

type CountItem = {
    id: number;
    count: number;
};

interface CartInitialState {
    totalPrice: number;
    totalCount: number;
    cartItems: CartItemType[];
    countList: CountItem[];
}

export type CartAddItem = {
    item: {
        name: string;
        price: number;
        imageUrl: string;
        type: string;
        size: number;
        id: number;
    };
};

const initialState: CartInitialState = {
    totalPrice: 0,
    totalCount: 0,
    cartItems: [],
    countList: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<CartAddItem>) {
            const item = action.payload.item;

            const itemHash = hash(item);
            const findedItem = state.cartItems.find((obj) => obj.hash == itemHash);
            //если есть такая конфигурация пиццы
            if (findedItem) {
                findedItem.count += 1;
                //иначе добавляем новую
            } else {
                const addedItem = {
                    hash: itemHash,
                    item: {
                        name: item.name,
                        price: item.price,
                        imageUrl: item.imageUrl,
                        parentId: item.id,
                    },
                    params: {
                        type: item.type,
                        size: item.size,
                    },
                    count: 1,
                };

                state.cartItems.push(addedItem);
            }
            //для добаваления в список добавленных
            const foundItemCount = state.countList.find((obj) => obj.id == item.id);
            if (foundItemCount) {
                foundItemCount.count++;
            } else {
                state.countList.push({ id: item.id, count: 1 });
            }
            state.totalCount++;
            state.totalPrice += item.price;
        },
        cartInc(state, action: PayloadAction<string>) {
            const item = state.cartItems.find((obj) => obj.hash == action.payload);
            if (!item) {
                return;
            }
            item.count++;
            state.totalPrice += item.item.price;
            state.totalCount++;
            const countItem = state.countList.find((obj) => obj.id == item.item.parentId);
            if (countItem) {
                countItem.count++;
            }
        },
        cartDec(state, action: PayloadAction<string>) {
            const item = state.cartItems.find((obj) => obj.hash == action.payload);
            if (!item) {
                return;
            }
            if (item.count == 1) {
                state.cartItems = state.cartItems.filter((obj) => obj !== item);
            } else {
                item.count--;
            }
            const countItem = state.countList.find((obj) => obj.id == item.item.parentId);
            if (!countItem) {
                return;
            }
            if (countItem.count == 1) {
                state.countList = state.countList.filter((obj) => obj !== countItem);
            } else {
                countItem.count--;
            }
            state.totalPrice -= item.item.price;
            state.totalCount--;
        },
        deleteCartItem(state, action: PayloadAction<string>) {
            const item = state.cartItems.find((obj) => obj.hash == action.payload);
            if (!item) {
                return;
            }
            state.totalCount -= item.count;
            state.totalPrice -= item.count * item.item.price;
            const countItem = state.countList.find((obj) => obj.id == item.item.parentId);
            if (!countItem) {
                return;
            }
            if (countItem.count == item.count) {
                state.countList = state.countList.filter((obj) => obj !== countItem);
            } else {
                countItem.count -= item.count;
            }
            state.cartItems = state.cartItems.filter((obj) => obj !== item);
        },
        deleteCart(state) {
            state.countList = [];
            state.cartItems = [];
            state.totalPrice = 0;
            state.totalCount = 0;
        },
    },
});

export const selectCart = (state: RootState) => state.cart;

export const { addToCart, cartInc, cartDec, deleteCart, deleteCartItem } = cartSlice.actions;

export default cartSlice.reducer;
