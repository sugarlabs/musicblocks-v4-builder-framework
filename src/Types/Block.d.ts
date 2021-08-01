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
    argsLength?: number | null
    args?: string[] | null
    argWidths?: number[]
    type: 'StackClamp' | 'Flow' | 'Value' | 'ArgValue' | 'NestedArg',
}
