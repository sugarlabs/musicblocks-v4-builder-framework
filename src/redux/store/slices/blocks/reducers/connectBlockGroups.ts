import Block from '../../../../../@types/Block';
import { PayloadAction } from '@reduxjs/toolkit';
import { isTopMostInStack } from '../../../../../utils';
import { setTopBlockId } from '../utils/setTopBlockId';
import { updateBlockLines } from '../../../../../utils/blockLines';

export const connectBlockGroups = (
    state: { [id: string]: Block },
    action: PayloadAction<{ toConnectId: string; connectedToId: string }>,
) => {
    const { toConnectId, connectedToId } = action.payload;
    const oldTopBlock: string = state[toConnectId].topBlockId;
    state = { ...setTopBlockId(state, toConnectId, state[connectedToId].topBlockId) };
    let lastBlockInGroup = toConnectId;
    while (state[lastBlockInGroup].nextBlockId !== null) {
        lastBlockInGroup = state[lastBlockInGroup].nextBlockId as string;
    }
    if (!isTopMostInStack(state[toConnectId])) {
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
    state = { ...updateBlockLines(state, state[connectedToId].topBlockId) };
    state = { ...updateBlockLines(state, oldTopBlock) };
};
