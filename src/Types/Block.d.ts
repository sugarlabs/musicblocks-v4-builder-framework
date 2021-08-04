export default interface Block {
    id: string,
    position: {
        x: number,
        y: number
    }
    color: string,
    topBlockId: string,
    blockHeightLines: number,
    blockWidthLines: number,
    previousBlockId: string | null,
    nextBlockId: string | null,
    childBlockId?: string | null,
    argsLength?: number | null
    defaultBlockHeightLines?: number // clamp blocks have variable block lines, this signifies the default
    args?: string[] | null
    argWidths?: number[]
    type: 'StackClamp' | 'FlowClamp' | 'Flow' | 'Value' | 'ArgValue' | 'NestedArg',
}
