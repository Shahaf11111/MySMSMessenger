import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    severity: "info",
    message: "",
};

export const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        info: (_, action) => ({ severity: "info", message: action.payload }),
        error: (_, action) => ({ severity: "error", message: action.payload }),
        resetAlert: () => initialState,
    }
});

export const { info, error, resetAlert } = alertSlice.actions;

export default alertSlice.reducer;