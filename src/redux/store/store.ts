import { configureStore } from "@reduxjs/toolkit";
import blocksReducer from './blocksSlice';

export default configureStore({
    reducer: {
        blocks: blocksReducer
    }
})
