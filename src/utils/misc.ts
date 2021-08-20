import Block from '../@types/Block';

export const isClamp = (block: Block): boolean => {
    return block.type === 'StackClamp' || block.type === 'FlowClamp';
};

export const isArg = (block: Block): boolean => {
    return block.type === 'ArgValue' || block.type === 'NestedArg';
};

export const blockHasChild = (block: Block): boolean => {
    return !!block.childBlockId;
};

export const isNestedArgBlock = (block: Block): boolean => {
    return block.type === 'NestedArg';
};

export const hasNextFlowBlock = (block: Block): boolean => {
    return !!block.nextBlockId;
};

export const isTopMostInStack = (block: Block): boolean => {
    return block.previousBlockId === null;
};
