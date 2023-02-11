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

export type CountItem = {
    id: number;
    count: number;
};

export interface CartInitialState {
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
