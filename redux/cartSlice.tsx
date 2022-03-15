import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const getList = createAsyncThunk("", async () => {

});

type Product = {
    img: string,
    name: string,
    extras: string[],
    price: number,
    quantity: number,
    total: number
}

type InitialState = {
    total: number;
    products: Product[] | [];
};

const initialState: InitialState = {
    total: 0,
    products: []
};

const slice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCart: (state, action) => {

            state.total = state.total + 1
            const data: Product = { ...action.payload, price: action.payload.total / action.payload.quantity }

            state.products = [
                ...state.products,
                data
            ]
        }
    },
    extraReducers: (builder) => {

    },
});

export const { addCart } = slice.actions;
export default slice.reducer;