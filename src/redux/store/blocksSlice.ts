import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { current } from "@reduxjs/toolkit";
import { updateBlockLines } from "../../utils/blockLines";
import { loadWorkSpace } from "../demoWorkspace";
import Block from "../../Types/Block";

const setTopBlockId = (state: { [id: string]: Block }, elementId: string, newTopBlockId: string) => {
    state[elementId].topBlockId = newTopBlockId;
    if (state[elementId].childBlockId) {
        setTopBlockId(state, state[elementId].childBlockId as string, newTopBlockId)
    }
    if (state[elementId].nextBlockId) {
        setTopBlockId(state, state[elementId].nextBlockId as string, newTopBlockId);
    }
}

export const blocksSlice = createSlice({
    name: 'blocks',
    initialState: loadWorkSpace(),
    reducers: {
        dragBlockGroup: ((state: { [id: string]: Block }, action: PayloadAction<{ id: string, position: { x: number, y: number } }>) => {
            const { id, position } = action.payload;
            const previousBlock = state[id].previousBlockId;
            if (previousBlock !== null) {
                if (state[previousBlock].childBlockId  && state[previousBlock].childBlockId === id) {
                    state[previousBlock].childBlockId = null;
                } else {
                    state[previousBlock].nextBlockId = null;
                }
                state[id].previousBlockId = null;
            }
            state[id].position.x = position.x;
            state[id].position.y = position.y;
            state = {...updateBlockLines(state, state[id].topBlockId)};
            const topBlockUpdatedState = {...state};
            setTopBlockId(topBlockUpdatedState, id, id);
            state = {...topBlockUpdatedState};
        }),
        connectBlockGroups: ((state: { [id: string]: Block }, action: PayloadAction<{ toConnectId: string, connectedToId: string }>) => {
            const { toConnectId, connectedToId } = action.payload;
            const oldTopBlock : string = state[toConnectId].topBlockId;
            const topBlockUpdatedState = {...state};
            setTopBlockId(topBlockUpdatedState, toConnectId, state[connectedToId].topBlockId);
            state = {...topBlockUpdatedState};
            let lastBlockInGroup = toConnectId;
            while (state[lastBlockInGroup].nextBlockId !== null) {
                lastBlockInGroup = state[lastBlockInGroup].nextBlockId as string;
            }
            if (state[toConnectId].previousBlockId !== null) {
                const key = state[toConnectId].previousBlockId as string;
                if (state[key].childBlockId && state[key].childBlockId === toConnectId) {
                    state[key].childBlockId = null;
                } else {
                    state[key].nextBlockId = null;
                }
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
            state = {...updateBlockLines(state, state[connectedToId].topBlockId)};
            state = {...updateBlockLines(state, oldTopBlock)};
        }),
        connectChild: ((state: { [id: string]: Block }, action: PayloadAction<{ childId: string, clampId: string }>) => {
            const { childId, clampId } = action.payload;
            const oldTopBlock : string = state[childId].topBlockId;

            if (state[childId].previousBlockId !== null) {
                const key = state[childId].previousBlockId as string;
                if (state[key].childBlockId && state[key].childBlockId === childId) {
                    state[key].childBlockId = null;
                } else {
                    state[key].nextBlockId = null;
                }
            }
            state[childId].previousBlockId = clampId;
            const topBlockUpdatedState = {...state};
            setTopBlockId(topBlockUpdatedState, childId, state[clampId].topBlockId);
            state = {...topBlockUpdatedState};
            let lastBlockInGroup = childId;
            while (state[lastBlockInGroup].nextBlockId !== null) {
                lastBlockInGroup = state[lastBlockInGroup].nextBlockId as string;
            }
            if (state[clampId].childBlockId !== null) {
                const oldChildBlock = state[clampId].childBlockId as string;
                state[oldChildBlock].previousBlockId = childId;
                state[lastBlockInGroup].nextBlockId = oldChildBlock;
            }
            state[clampId].childBlockId = childId;
            state = {...updateBlockLines(state, state[clampId].topBlockId)};
            state = {...updateBlockLines(state, oldTopBlock)};
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

export const {
    deleteBlock,
    connectChild,
    dragBlockGroup,
    connectBlockGroups,
    updateBlockPosition,
} = blocksSlice.actions;

export default blocksSlice.reducer;
