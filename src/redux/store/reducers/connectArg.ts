import Block from '../../../@types/Block';
import { PayloadAction } from '@reduxjs/toolkit';
import { setTopBlockId } from '../utils/setTopBlockId';
import { updateArgWidths } from '../../../utils/argWidths';

export const connectArg = (
    state: { [id: string]: Block },
    action: PayloadAction<{ blockId: string; argId: string; argPos: number }>,
) => {
    const { blockId, argId, argPos } = action.payload;
    if (state[blockId] && state[blockId].args !== undefined) {
        const args = state[blockId].args;
        args && (args[argPos] = argId);
        args && (state[blockId].args = [...args]);
    }
    state[argId].previousBlockId = blockId;

    let topBlockId = state[blockId].topBlockId;
    if (state[blockId].type.indexOf('Clamp') !== -1) {
        topBlockId = blockId;
    }
    state = { ...setTopBlockId(state, argId, topBlockId) };
    state = { ...updateArgWidths(state, state[argId].topBlockId) };
};
