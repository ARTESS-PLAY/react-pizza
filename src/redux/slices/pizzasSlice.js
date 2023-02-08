import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
    '/pizzas/fetchPizzas',
    async ({ activeCategory, activeSort, search, currentPage, limitItemsPerPage }) => {
        //формируем шаблон для запроса
        let getArgs = `?${activeCategory ? 'category=' + activeCategory + '&' : ''}`;
        const order = activeSort.sortParam.includes('-') ? 'desc' : 'asc';
        const sort = activeSort.sortParam.replace('-', '');
        const page = search ? '' : `&_page=${currentPage}&_limit=${limitItemsPerPage}`;
        getArgs += `_sort=${sort}&_order=${order}&name_like=${search}${page}`;
        const { data } = await axios.get(`http://localhost:3005/items/${getArgs}`);
        return data;
    },
);

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState: {
        items: [],
        status: 'loading', // loading | success | error
    },
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading';
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'success';
        },
        [fetchPizzas.rejected]: (state) => {
            state.status = 'error';
            state.items = [];
        },
    },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
