import Block from '../../../../../@types/Block';
import { PayloadAction } from '@reduxjs/toolkit';
import { isTopMostInStack } from '../../../../../utils';
import { setTopBlockId } from '../utils/setTopBlockId';
import { updateBlockLines } from '../../../../../utils/blockLines';

export const connectChild = (
    state: { [id: string]: Block },
    action: PayloadAction<{ childId: string; clampId: string }>,
) => {
    const { childId, clampId } = action.payload;
    const oldTopBlock: string = state[childId].topBlockId;

    if (!isTopMostInStack(state[childId])) {
        const key = state[childId].previousBlockId as string;
        if (state[key].childBlockId && state[key].childBlockId === childId) {
            state[key].childBlockId = null;
        } else {
            state[key].nextBlockId = null;
        }
    }
    state[childId].previousBlockId = clampId;
    state = { ...setTopBlockId(state, childId, state[clampId].topBlockId) };
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
    state = { ...updateBlockLines(state, state[clampId].topBlockId) };
    state = { ...updateBlockLines(state, oldTopBlock) };
};
