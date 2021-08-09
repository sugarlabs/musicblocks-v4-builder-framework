import { configureStore } from "@reduxjs/toolkit";
import blocksReducer from './blocksSlice';
import argsReducer from './argsSlice';

export default configureStore({
    reducer: {
        blocks: blocksReducer,
        args: argsReducer
    }
})
