export default interface IBlockGroup {
    id: string // id of first block in block group
    dragging?: boolean
    position?: {
        x: number,
        y: number
    }
}
