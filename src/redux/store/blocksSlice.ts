import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadWorkSpace } from '../demoWorkspace';
import Block from '../../@types/Block';
import * as reducers from './reducers';

// every block should be aware of the top most block in its stack
// for nested arguments the top block id is the id of the top most flow clamp block it is connected to
// for blocks connected vertically in a block stack the top block id would be the id of the top most block in the stack

export const blocksSlice = createSlice({
    name: 'blocks',
    initialState: loadWorkSpace(),
    reducers: {
        draggingParentUpdate: reducers.draggingParentUpdate,
        dragBlockGroup: reducers.dragBlockGroup,
        connectArg: reducers.connectArg,
        connectBlockGroups: reducers.connectBlockGroups,
        connectChild: reducers.connectChild,

        // reducer for testing change in block
        updateBlockPosition: (
            state: { [id: string]: Block },
            action: PayloadAction<{ id: string }>,
        ) => {
            const id: string = action.payload.id;
            state[id].position!.x += 300;
            state[id].position!.y += 300;
        },

        deleteBlock: (state: { [id: string]: Block }, { payload }) => {
            delete state['1'];
        },
    },
});

export const {
    connectArg,
    deleteBlock,
    connectChild,
    dragBlockGroup,
    connectBlockGroups,
    updateBlockPosition,
    draggingParentUpdate,
} = blocksSlice.actions;

export default blocksSlice.reducer;
