import { createSlice } from "@reduxjs/toolkit";

export const messagesSlice = createSlice({
    name: "messages",
    initialState: {
        sent: [],
    },
    reducers: {
        sendMessage: (state, action) => {
            const newMessage = { id: state.sent.length, ...action.payload };
            return { ...state, sent: [...state.sent, newMessage] };
        }
    }
});

export const { sendMessage } = messagesSlice.actions;

export default messagesSlice.reducer;