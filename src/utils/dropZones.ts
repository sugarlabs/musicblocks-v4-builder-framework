import Quadtree from "quadtree-lib";

class DropZones {
    private static instance: DropZones;
    private quadtreeHorizontal: Quadtree<Quadtree.QuadtreeItem>;
    private quadtreeVertical: Quadtree<Quadtree.QuadtreeItem>;

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

    public get horizontal(): Quadtree<Quadtree.QuadtreeItem> {
        return this.quadtreeHorizontal;
    }

    public get vertical(): Quadtree<Quadtree.QuadtreeItem> {
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
