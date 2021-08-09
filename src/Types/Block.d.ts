export default interface Block {
    id: string,
    position: {
        x: number,
        y: number
    }
    color: string,
    topBlockId: string,
    blockWidthLines: number,
    blockHeightLines: number,
    defaultBlockWidthLines: number,
    previousBlockId: string | null,
    nextBlockId: string | null,
    childBlockId?: string | null,
    argsLength?: number | null              // total number of args that a block can take
    defaultBlockHeightLines?: number        // clamp blocks have variable block lines, this signifies the default
    defaultdefaultBlockWidthLines?: number
    args?: Array<string | null>             // contains the id of args nested in the block currently
    argWidths?: number[]                    // blockWidthLines of args nested in the block currently
    type: 'StackClamp' | 'FlowClamp' | 'Flow' | 'Value' | 'ArgValue' | 'NestedArg',
}
