import Block from '../../../../../@types/Block';
import { PayloadAction } from '@reduxjs/toolkit';

// adjust clamp and arg connectors of parent when drag starts
export const createBlocks = (
    state: { [id: string]: Block },
    action: PayloadAction<{
        blocks: Block[];
    }>,
) => {
    const { blocks } = action.payload;
    const newState = { ...state };
    blocks.forEach(block => newState[block.id] = block);
    state = { ...newState };
};
