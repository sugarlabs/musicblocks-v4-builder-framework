export default interface Block {
    id: string;
    position: {
        x: number;
        y: number;
    };

    // color of the block
    color: string;

    // id of top most block in the block stack
    topBlockId: string;

    // abstract widht of the block in terms of width lines
    // if the block takes in args then this changes when args added or removed.
    // would be the same as default blockWidthLines for block that do not take args
    blockWidthLines: number;

    // abstract height of the block in terms of height lines
    // if the block is of clamp type then this changes when blocks added to or removed from clamp
    // would be the same as defaultBlockHeightLines for non-clamp blocks
    blockHeightLines: number;

    // the abstract structural width of the block in terms of block width lines
    // For blocks that take in args, this is the width of only the main section of the block, args section width is calculated dynamically
    defaultBlockWidthLines: number;

    // id of the previous block the block is connected to
    // for a block in a block stack this would be the id of the block above it
    // for the first block in a block stack inside a clamp, this would be the id of the clamp block
    // for an argument block this would be id of the block it is connected to as an argument
    // if null the block is top most element in its stack
    previousBlockId: string | null;

    // id of the next block in the blockStack, not applicate for Value and Nested arg Blocks
    nextBlockId: string | null;

    // id of first child in a clamp block, not applicable for non-clamp blocks
    childBlockId?: string | null;

    // total number of args that a block can take, not applicable for blocks that do not take arguments
    argsLength?: number | null;

    // the default abstract height of a block in terms of block height lines
    defaultBlockHeightLines?: number;

    // the default abstract width of a block in terms of block width lines
    defaultdefaultBlockWidthLines?: number;

    // contains the id of args nested in the block currently
    // if null then that arg position is empty
    // not applicable for blocks that do not take in args
    args?: Array<string | null>;

    // blockWidthLines of args nested in the block currently
    // not applicate for blocks that do not take in args
    argWidths?: number[];

    // type of the block
    type: 'StackClamp' | 'FlowClamp' | 'Flow' | 'ArgValue' | 'NestedArg';
}
