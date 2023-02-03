import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        category: 0,
        sort: {
            title: 'Популярности ASC',
            sortParam: 'rating',
        },
    },
    reducers: {
        setCategory(state, action) {
            state.category = action.payload.category;
        },
        setSort(state, action) {
            state.sort = action.payload.sort;
        },
    },
});

export const { setCategory, setSort } = filterSlice.actions;

export default filterSlice.reducer;
