import * as d3 from 'd3';

export const pollingTest = (
    oldPosRef: React.MutableRefObject<any>,
    currentOffset: { x: number, y: number },
    pollingThresold: number
) => {
    if (!oldPosRef.current.x) {
        oldPosRef.current = {
            ...currentOffset,
        };
    }
    if (
        Math.abs(currentOffset?.x - oldPosRef.current?.x) >= pollingThresold ||
        Math.abs(currentOffset?.y - oldPosRef.current?.y) >= pollingThresold
    ) {
        oldPosRef.current.x = currentOffset.x;
        oldPosRef.current.y = currentOffset.y;
        return true;
    }
    return false;
};

export const dragThresholdTest = (
    startPosition: { x: number, y: number },
    currentPosition: { x: number, y: number },
    restoreThreshold: number,
    restoreEnabled: boolean) => {
    return (Math.abs(startPosition.x - currentPosition.x) < restoreThreshold) &&
        (Math.abs(startPosition.y - currentPosition.y) < restoreThreshold) &&
        restoreEnabled;
}

export const setupDragging = (
    dragConfig: {
        dragStartPosition: React.MutableRefObject<any>,
        restoreThreshold: number,
        restoreEnabled: boolean
    },
    draggablePathRef: React.RefObject<any>,
    groupRef: React.RefObject<any>,
    dragFunctions: {
        dragEnd?: (x: number, y: number, update: boolean) => void,
        dragStart?: () => void,
        dragging?: (x: number, y: number, startPosition: { x: number, y: number }) => void
    }
) => {
    if (draggablePathRef!.current) {
        const svg = d3.select(draggablePathRef.current);
        let layerX = 0;
        let layerY = 0;
        let startPosition: { x: number, y: number } | null = null;
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
                    dragConfig.dragStartPosition.current = {
                        x: groupRef!.current!.style.left,
                        y: groupRef!.current!.style.top
                    }
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
                    if (!startPosition) {
                        startPosition = {
                            x: divX,
                            y: divY
                        }
                    }
                    dragFunctions?.dragging && dragFunctions.dragging(divX, divY, startPosition);
                })
                .on("end", (event: any) => {
                    const divX = event.sourceEvent.clientX - layerX;
                    const divY = event.sourceEvent.clientY - layerY;
                    let storeUpdate = true;

                    if (startPosition && dragThresholdTest(
                        startPosition,
                        { x: divX, y: divY },
                        dragConfig.restoreThreshold,
                        dragConfig.restoreEnabled)) {
                        restorePosition(groupRef, dragConfig.dragStartPosition);
                        storeUpdate = false;
                    }
                    startPosition = null;
                    groupRef!.current!.style.position = 'absolute';
                    groupRef!.current!.style.zIndex = 'auto';
                    dragFunctions?.dragEnd && dragFunctions.dragEnd(divX, divY, storeUpdate);
                })
        );
    }
};

export const restorePosition = (groupRef: React.RefObject<any>, dragStartPosition: React.MutableRefObject<any>) => {
    groupRef.current.style.left = dragStartPosition.current.x;
    groupRef.current.style.top = dragStartPosition.current.y;
}
