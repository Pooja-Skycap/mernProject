import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const incAsyncFunc = createAsyncThunk<number, number>(
  "counter/incAsyncFunc",
  async (amount: number) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return amount;
  }
);

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incrementByValue: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    decrementByValue: (state, action: PayloadAction<number>) => {
      state.value -= action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incAsyncFunc.pending, () => {
        console.log("first");
      })
      .addCase(incAsyncFunc.fulfilled, (state, action) => {
        state.value += action.payload;
      });
  },
});

export const { incrementByValue, decrementByValue } = counterSlice.actions;
export default counterSlice.reducer;
