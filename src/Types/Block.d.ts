export default interface Block {
    id: string,
    position: {
        x: number,
        y: number
    }
    topBlockId: string,
    parentId: string | null,
    argsLength?: number | null
    args?: Array[string] | null
    type: 'StackClamp' | 'Flow' | 'Value' | 'ArgValue' | 'NestedArg',
}
