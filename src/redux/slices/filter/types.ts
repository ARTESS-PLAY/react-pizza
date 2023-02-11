export type SortItem = {
    title: string;
    sortParam: 'price' | 'rating' | 'name' | '-price' | '-rating' | '-name';
};

export interface FilterSlice {
    category: number;
    sort: SortItem;
    search: string;
}
