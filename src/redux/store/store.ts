import { configureStore } from '@reduxjs/toolkit';
import blocksReducer from './slices/blocks';

export default configureStore({
    reducer: {
        blocks: blocksReducer,
    },
});
