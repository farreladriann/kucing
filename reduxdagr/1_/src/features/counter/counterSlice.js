import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0,
};

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            console.log(state);
            state.count += 1;
        },
        decrement: (state) => {
            console.log(state);

            state.count -= 1;
        },
        reset: (state) => {
            console.log(state);

            state.count = 0;
        },
        incrementByAmount: (state, action) => {
            console.log(state);
            state.count += action.payload;
        },
    },
});

export const { increment, decrement, reset, incrementByAmount } =
    counterSlice.actions;

export default counterSlice.reducer;
