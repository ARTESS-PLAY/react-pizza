import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { FilterSlice } from '../filter/types';
import { PizzaItem, PizzaSlice, Status } from './types';

export const fetchPizzas = createAsyncThunk<
    PizzaItem[],
    { currentPage: number; limitItemsPerPage: number },
    { state: { filter: FilterSlice } }
>('/pizzas/fetchPizzas', async ({ currentPage, limitItemsPerPage }, thunkAPI) => {
    const { filter } = thunkAPI.getState();
    const activeCategory = filter.category;
    const activeSort = filter.sort;
    const search = filter.search;

    //формируем шаблон для запроса
    let getArgs = `?${activeCategory ? 'category=' + activeCategory + '&' : ''}`;
    const order = activeSort.sortParam.includes('-') ? 'desc' : 'asc';
    const sort = activeSort.sortParam.replace('-', '');
    const page = search ? '' : `&_page=${currentPage}&_limit=${limitItemsPerPage}`;
    getArgs += `_sort=${sort}&_order=${order}&name_like=${search}${page}`;
    const { data } = await axios.get<PizzaItem[]>(`http://localhost:3005/items/${getArgs}`);
    return data;
});

const initialState: PizzaSlice = {
    items: [],
    status: Status.LOADING,
};

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = Status.LOADING;
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCSESS;
        });
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = Status.ERROR;
            state.items = [];
        });
    },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
