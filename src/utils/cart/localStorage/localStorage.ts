import { getCartTotalPrice, getCartItemsCount } from './../cartCounting';
import { CartItemType, CountItem } from './../../../redux/slices/cart/types';

export const setCartFromLS = (): {
    items: CartItemType[];
    itemsCountList: CountItem[];
    totalPrice: number;
    totalCount: number;
} => {
    const dataCart = localStorage.getItem('cart');
    const items: CartItemType[] = dataCart ? JSON.parse(dataCart) : [];
    const dataItemsCountList = localStorage.getItem('cartCountList');
    const itemsCountList: CountItem[] = dataItemsCountList ? JSON.parse(dataItemsCountList) : [];
    const totalPrice: number = getCartTotalPrice(items);
    const totalCount: number = getCartItemsCount(itemsCountList);
    return {
        items,
        itemsCountList,
        totalPrice,
        totalCount,
    };
};

export const changeCartLS = (cartItems: CartItemType[], countList: CountItem[]): void => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    localStorage.setItem('cartCountList', JSON.stringify(countList));
};
