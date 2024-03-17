import { configureStore } from '@reduxjs/toolkit';
import { apiService } from './redux/apiService'
import { interactivitySlice } from './redux/interactivitySlices.js';
import {apiSlice} from "./redux/slices/apiSlice.js";
import authReducer from './redux/slices/authSlice.js';


// Export more actions here

const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiSlice.reducerPath]:apiSlice.reducer,
        interactivity: interactivitySlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;