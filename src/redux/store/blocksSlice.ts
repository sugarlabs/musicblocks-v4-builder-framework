import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { current } from "@reduxjs/toolkit";
import { loadWorkSpace } from "../demoWorkspace";
import Block from "../../Types/Block";

export const blocksSlice = createSlice({
    name: 'blocks',
    initialState: loadWorkSpace(),
    reducers: {
        dragBlockGroup: ((state: { [id: string]: Block }, action: PayloadAction<{ id: string, position: {x: number, y: number} }>) => {
            const { id, position } = action.payload;
            const previousBlock = state[id].previousBlockId;
            if (previousBlock !== null) {
                state[previousBlock].nextBlockId = null;
                state[id].previousBlockId = null;
            }
            state[id].position.x = position.x;
            state[id].position.y = position.y;
        }),
        // reducer for testing change in block
        updateBlockPosition: (state: { [id: string]: Block }, action: PayloadAction<{ id: string }>) => {
            const id: string = action.payload.id;
            state[id].position!.x += 300;
            state[id].position!.y += 300;
        },
        deleteBlock: (state: { [id: string]: Block }, { payload }) => {
            delete state["1"];
        }
    }
})

export const { deleteBlock, updateBlockPosition, dragBlockGroup } = blocksSlice.actions;

export default blocksSlice.reducer;
