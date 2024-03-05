import { configureStore } from '@reduxjs/toolkit';
import { apiService } from './redux/apiService'
import { interactivitySlice } from './redux/interactivitySlices.js';


// Export more actions here

const store = configureStore({
    reducer: {
        [apiService.reducerPath]: apiService.reducer,
        interactivity: interactivitySlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiService.middleware),
});

export default store;