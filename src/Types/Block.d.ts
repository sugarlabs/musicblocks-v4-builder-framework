export default interface Block {
    id: string,
    position: {
        x: number,
        y: number
    }
    color: string,
    topBlockId: string,
    blockHeightLines: number,
    previousBlockId: string | null,
    nextBlockId?: string | null,
    argsLength?: number | null
    args?: Array[string] | null
    type: 'StackClamp' | 'Flow' | 'Value' | 'ArgValue' | 'NestedArg',
}
