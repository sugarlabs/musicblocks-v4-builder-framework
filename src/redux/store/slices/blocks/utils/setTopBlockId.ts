import Block from '../../../../../@types/Block';
import { blockHasChild, hasNextFlowBlock, isNestedArgBlock } from '../../../../../utils';

export const setTopBlockId = (
    prevState: { [id: string]: Block },
    elementId: string,
    newTopBlockId: string,
): { [id: string]: Block } => {
    const state = { ...prevState };
    const setId = (eleId: string, newId: string) => {
        state[eleId].topBlockId = newId;
        if (blockHasChild(state[eleId])) {
            setId(state[eleId].childBlockId as string, newId);
        }
        if (isNestedArgBlock(state[eleId])) {
            state[eleId].args?.forEach((arg) => arg !== null && setId(arg, newId));
            return;
        }
        if (hasNextFlowBlock(state[eleId])) {
            setId(state[eleId].nextBlockId as string, newId);
        }
    };
    setId(elementId, newTopBlockId);
    return state;
};
