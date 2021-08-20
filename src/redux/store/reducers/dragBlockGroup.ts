import { isArg } from '../../../utils';
import Block from '../../../@types/Block';
import { PayloadAction } from '@reduxjs/toolkit';
import { setTopBlockId } from '../utils/setTopBlockId';
import { updateArgWidths } from '../../../utils/argWidths';
import { updateBlockLines } from '../../../utils/blockLines';

export const dragBlockGroup = (
    state: { [id: string]: Block },
    action: PayloadAction<{ id: string; position: { x: number; y: number } }>,
) => {
    const { id, position } = action.payload;
    const previousBlock = state[id].previousBlockId;
    if (previousBlock !== null) {
        if (isArg(state[id])) {
            const index = state[previousBlock].args?.indexOf(id);
            const args = state[previousBlock].args;
            args && (args[index as number] = null);
            args && (state[previousBlock].args = [...args]);
        } else if (state[previousBlock].childBlockId && state[previousBlock].childBlockId === id) {
            state[previousBlock].childBlockId = null;
        } else {
            state[previousBlock].nextBlockId = null;
        }
        state[id].previousBlockId = null;
    }
    state[id].position.x = position.x;
    state[id].position.y = position.y;
    if (isArg(state[id])) {
        state = { ...updateArgWidths(state, state[id].topBlockId) };
    } else {
        state = { ...updateBlockLines(state, state[id].topBlockId) };
    }
    state = { ...setTopBlockId(state, id, id) };
};
