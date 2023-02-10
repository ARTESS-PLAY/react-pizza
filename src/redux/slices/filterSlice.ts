import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SortItem = {
    title: string;
    sortParam: 'price' | 'rating' | 'name' | '-price' | '-rating' | '-name';
};

export interface FilterSlice {
    category: number;
    sort: SortItem;
    search: string;
}

const initialState: FilterSlice = {
    category: 0,
    sort: {
        title: 'Популярности ASC',
        sortParam: 'rating',
    },
    search: '',
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategory(state, action: PayloadAction<{ category: number }>) {
            state.category = action.payload.category;
        },
        setSort(state, action: PayloadAction<{ sort: SortItem }>) {
            state.sort = action.payload.sort;
        },
        setFilters(state, action: PayloadAction<{ sort: SortItem; category: number }>) {
            state.category = action.payload.category;
            state.sort = action.payload.sort;
            // state.search = action.payload.search;
        },
        setSearch(state, action: PayloadAction<string>) {
            state.search = action.payload;
        },
    },
});

export const { setCategory, setSort, setFilters, setSearch } = filterSlice.actions;

export default filterSlice.reducer;
