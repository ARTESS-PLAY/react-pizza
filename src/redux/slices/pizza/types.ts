export interface PizzaSlice {
    items: PizzaItem[];
    status: Status;
}
export type PizzaItem = {
    name: string;
    imageUrl: string;
    price: number;
    sizes: number[];
    types: number[];
    id: number;
    count: number;
};

export enum Status {
    LOADING = 'loading',
    SUCCSESS = 'success',
    ERROR = 'error',
}
