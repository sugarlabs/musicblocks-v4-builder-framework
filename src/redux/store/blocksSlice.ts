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
        connectBlockGroups: ((state: { [id: string]: Block }, action: PayloadAction<{ toConnectId: string, connectedToId: string }>) => {
            const { toConnectId, connectedToId } = action.payload;
            let lastBlockInGroup = toConnectId;
            while(state[lastBlockInGroup].nextBlockId !== null) {
                lastBlockInGroup = state[lastBlockInGroup].nextBlockId as string;
                state[lastBlockInGroup].topBlockId = state[connectedToId].topBlockId;
            }
            state[lastBlockInGroup].topBlockId = state[connectedToId].topBlockId;
            if (state[toConnectId].previousBlockId !== null) {
                const key = state[toConnectId].previousBlockId as string;
                state[key].nextBlockId = null;
            }
            if (state[connectedToId].nextBlockId !== toConnectId) {
                // the block is not being placed back to its position
                state[lastBlockInGroup].nextBlockId = state[connectedToId].nextBlockId;
                if (state[connectedToId].nextBlockId !== null) {
                    const key = state[connectedToId].nextBlockId as string;
                    state[key].previousBlockId = lastBlockInGroup;
                }
            }
            state[connectedToId].nextBlockId = toConnectId;
            state[toConnectId].previousBlockId = connectedToId;
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

export const { deleteBlock, updateBlockPosition, dragBlockGroup, connectBlockGroups } = blocksSlice.actions;

export default blocksSlice.reducer;
