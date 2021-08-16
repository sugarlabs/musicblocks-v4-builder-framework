import Block from '../Types/Block'

export const updateBlockLines = (state: { [id: string]: Block }, id: string, ignoredBlockId?: string): { [id: string]: Block } => {
    let blockId: null | string = id;
    while (blockId !== null) {
        if (state[blockId].type === 'FlowClamp' || state[blockId].type === 'StackClamp') {
            // only clamp blocks have variable block lines
            let childrenBlockLines = 0;
            if (state[blockId].childBlockId !== null) {
                let childBlockId: string | null = state[blockId].childBlockId as string;
                if (childBlockId !== ignoredBlockId) {
                    updateBlockLines(state, childBlockId, ignoredBlockId);
                    while (childBlockId !== null) {
                        if (childBlockId === ignoredBlockId)
                            break;
                        childrenBlockLines += state[childBlockId].blockHeightLines;
                        childBlockId = state[childBlockId].nextBlockId;
                    }
                    childrenBlockLines -= 1; // clamps have one empty block line by default
                }
            }
            console.log(childrenBlockLines);
            state[blockId].blockHeightLines = state[blockId].defaultBlockHeightLines as number + childrenBlockLines;
        }
        blockId = state[blockId].nextBlockId;
    }
    return state;
}
