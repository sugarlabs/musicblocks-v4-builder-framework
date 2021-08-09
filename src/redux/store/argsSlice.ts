import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { current } from "@reduxjs/toolkit";
import Block from "../../Types/Block";

export const argsSlice = createSlice({
    name: 'args',
    initialState: {},
    reducers: {
        createArg: ((state: {}, action: PayloadAction<{ id: string, argWidths: number[] }>) => {
            
        }),
        dragBlockGroup: ((state: { [id: string]: Block }, action: PayloadAction<{ id: string, position: { x: number, y: number } }>) => {

        }),
        connectBlockGroups: ((state: { [id: string]: Block }, action: PayloadAction<{ toConnectId: string, connectedToId: string }>) => {

        }),
        connectChild: ((state: { [id: string]: Block }, action: PayloadAction<{ childId: string, clampId: string }>) => {

        }),
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
} = argsSlice.actions;

export default argsSlice.reducer;
