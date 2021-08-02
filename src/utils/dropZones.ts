import Quadtree from "quadtree-lib";
import DropZone from "../Types/DropZone";

class DropZones {
    private static instance: DropZones;
    private quadtreeHorizontal: Quadtree<DropZone>;
    private quadtreeVertical: Quadtree<DropZone>;

    private constructor() { 
        const vw = Math.max(
            document.documentElement.clientWidth || 0,
            window.innerWidth || 0
        );
        // will have to look into height as the canvas is scrollable
        const vh = Math.max(
            document.documentElement.clientHeight || 0,
            window.innerHeight || 0
        );
        this.quadtreeHorizontal = new Quadtree({ width: vw, height: vh });
        this.quadtreeVertical = new Quadtree({ width: vw, height: vh });
    }

    public get horizontal(): Quadtree<DropZone> {
        return this.quadtreeHorizontal;
    }

    public get vertical(): Quadtree<DropZone> {
        return this.quadtreeVertical;
    }

    public static getInstance(): DropZones {
        if (!DropZones.instance) {
            DropZones.instance = new DropZones();
        }
        return DropZones.instance;
    }
}

export const dropZones = DropZones.getInstance();
