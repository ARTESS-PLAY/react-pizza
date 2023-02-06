import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        category: 0,
        sort: {
            title: 'Популярности ASC',
            sortParam: 'rating',
        },
        search: '',
    },
    reducers: {
        setCategory(state, action) {
            state.category = action.payload.category;
        },
        setSort(state, action) {
            state.sort = action.payload.sort;
        },
        setFilters(state, action) {
            state.category = action.payload.category;
            state.sort = action.payload.sort;
            // state.search = action.payload.search;
        },
        setSearch(state, action) {
            state.search = action.payload.search;
        },
    },
});

export const { setCategory, setSort, setFilters, setSearch } = filterSlice.actions;

export default filterSlice.reducer;
