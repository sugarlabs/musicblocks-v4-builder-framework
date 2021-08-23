import Block from '../../../../../@types/Block';
import { PayloadAction } from '@reduxjs/toolkit';
import { isArg, isTopMostInStack } from '../../../../../utils';
import { updateArgWidths } from '../../../../../utils/argWidths';
import { updateBlockLines } from '../../../../../utils/blockLines';

// adjust clamp and arg connectors of parent when drag starts
export const draggingParentUpdate = (
    state: { [id: string]: Block },
    action: PayloadAction<{ ignoreBlockId: string }>,
) => {
    const { ignoreBlockId } = action.payload;
    const topBlockId = state[ignoreBlockId].topBlockId;
    if (!isTopMostInStack(state[ignoreBlockId])) {
        if (isArg(state[ignoreBlockId])) {
            state = { ...updateArgWidths(state, topBlockId, ignoreBlockId) };
        } else {
            state = { ...updateBlockLines(state, topBlockId, ignoreBlockId) };
        }
        topBlockId && console.log(state[topBlockId].blockHeightLines);
    }
};
