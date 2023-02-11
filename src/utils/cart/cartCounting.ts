import { CartItemType, CountItem } from './../../redux/slices/cart/types';
export const getCartTotalPrice = (cartItems: CartItemType[]): number => {
    const totalSum: number = cartItems.reduce((prev, current) => {
        return prev + current.count * current.item.price;
    }, 0);
    return totalSum;
};

export const getCartItemsCount = (cartItemsList: CountItem[]): number => {
    const totalCount: number = cartItemsList.reduce((prev, current) => {
        return prev + current.count;
    }, 0);
    return totalCount;
};
