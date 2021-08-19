import Quadtree from 'quadtree-lib';
import IDropZones from '../@types/dropZones';
import IDropZoneArg from '../@types/dropZoneArg';
import IDropZoneFlow from '../@types/dropZoneFlow';

class DropZones implements IDropZones {
    private static instance: DropZones;
    private quadtreeHorizontal: Quadtree<IDropZoneFlow>;
    private quadtreeVertical: Quadtree<IDropZoneArg>;

    private constructor() {
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        // will have to look into height as the canvas is scrollable
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        this.quadtreeHorizontal = new Quadtree({ width: vw, height: vh });
        this.quadtreeVertical = new Quadtree({ width: vw, height: vh });
    }

    public get flow(): Quadtree<IDropZoneFlow> {
        return this.quadtreeHorizontal;
    }

    public get arg(): Quadtree<IDropZoneArg> {
        return this.quadtreeVertical;
    }

    public getCollidingFlowZones(
        x: number,
        y: number,
        width: number,
        height: number,
    ): IDropZoneFlow[] {
        return this.quadtreeHorizontal.colliding({ x, y, width, height });
    }

    public getCollidingArgZones(
        x: number,
        y: number,
        width: number,
        height: number,
    ): IDropZoneArg[] {
        return this.quadtreeVertical.colliding({ x, y, width, height });
    }

    public removeFlowZones(id: string): void {
        const dropZonesBlocks: IDropZoneFlow[] = this.quadtreeHorizontal.find((ele) => {
            return ele.id === id || ele.id.substring(0, ele.id.indexOf('-')) === id;
        });
        dropZonesBlocks.forEach((zone) => this.quadtreeHorizontal.remove(zone));
    }

    public removeArgZones(id: string): void {
        const dropZonesBlocks: IDropZoneArg[] = this.quadtreeVertical.find((ele) => {
            return ele.id === id || ele.id.substring(0, ele.id.indexOf('-')) === id;
        });
        dropZonesBlocks.forEach((zone) => this.quadtreeVertical.remove(zone));
    }

    public static getInstance(): DropZones {
        if (!DropZones.instance) {
            DropZones.instance = new DropZones();
        }
        return DropZones.instance;
    }
}

export default DropZones.getInstance();
