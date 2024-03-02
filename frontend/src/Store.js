import { configureStore } from '@reduxjs/toolkit';
import { apiService } from './redux/apiService'
import { menuSlice, chatSlice } from './redux/interactivitySlices.js';

// Export more actions here

const store = configureStore({
    reducer: {
        [apiService.reducerPath]: apiService.reducer,
        menu: menuSlice.reducer,
        chat: chatSlice.reducer,
        // Add more reducers here
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiService.middleware),
});

export default store;