export default interface IDropZones {
    readonly flow: Quadtree<IDropZone>;
    readonly arg: Quadtree<IDropZoneArg>;

    getCollidingFlowZones: (x: number, y: number, width: number, height: number) => IDropZone[]

    getCollidingArgZones: (x: number, y: number, width: number, height: number) => IDropZoneArg[]

    removeFlowZones: (id: string) => void

    removeArgZones: (id: string) => void
}
