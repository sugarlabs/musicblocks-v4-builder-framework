import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { current } from "@reduxjs/toolkit";
import { loadWorkSpace } from "../demoWorkspace";
import Block from "../../Types/Block";

export const blocksSlice = createSlice({
    name: 'blocks',
    initialState: loadWorkSpace(),
    reducers: {
        addBlock: (state: { [id: string]: Block }, action: any) => {
            // console.log(current(state));
            // console.log(action.payload);
            state["2"] = {
                id: "2",
                type: 'StackClamp',
                position: {
                    x: 300,
                    y: 300
                },
                parentId: null,
                topBlockId: "2",
                argsLength: 0
            };
        },
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

export const { addBlock, deleteBlock, updateBlockPosition } = blocksSlice.actions;

export default blocksSlice.reducer;
