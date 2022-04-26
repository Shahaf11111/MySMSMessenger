import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./slices/alert";
import messagesReducer from "./slices/messages";

export default configureStore({
    reducer: {
        alert: alertReducer,
        messages: messagesReducer,
    }
});

