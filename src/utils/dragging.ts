import * as d3 from 'd3';

export const setupDragging = (
    draggablePathRef: React.RefObject<any>,
    groupRef: React.RefObject<any>,
    dragFunctions: {
        dragEnd?: (x: number, y: number) => void,
        dragStart?: () => void,
        dragging?: (x?: number, y?: number) => void
    }
) => {
    if (draggablePathRef!.current) {
        const svg = d3.select(draggablePathRef.current);
        let layerX = 0;
        let layerY = 0;
        svg.on("mousedown", (event: any) => {
            event.stopPropagation();
            event.preventDefault();
            layerX = event.layerX;
            layerY = event.layerY;
        });
        svg.call(
            d3
                .drag()
                .on("start", (event: any) => {
                    // console.log(event);
                    dragFunctions?.dragStart && dragFunctions.dragStart();
                    groupRef!.current!.style.zIndex = '1000';
                })
                .on("drag", (event: any) => {
                    const divX = event.sourceEvent.pageX - layerX;
                    const divY = event.sourceEvent.pageY - layerY;
                    // console.log(event);
                    groupRef!.current!.style.position = 'fixed';
                    groupRef!.current!.style.top = `${divY}px`;
                    groupRef!.current!.style.left = `${divX}px`;
                    dragFunctions?.dragging && dragFunctions.dragging(divX, divY);
                })
                .on("end", (event: any) => {
                    const divX = event.sourceEvent.clientX - layerX;
                    const divY = event.sourceEvent.clientY - layerY;
                    // console.log(event);
                    console.log(divX);
                    console.log(divY);
                    groupRef!.current!.style.position = 'absolute';
                    groupRef!.current!.style.zIndex = 'auto';
                    dragFunctions?.dragEnd && dragFunctions.dragEnd(divX, divY);
                })
        );
    }
};