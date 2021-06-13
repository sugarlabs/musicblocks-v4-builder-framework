import * as d3 from "d3";

export const pollingTest = (oldPosRef, currentOffset, pollingThresold) => {
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

/*
some observations / assumptions
- vertical male connectors connect to vertical female connectors
- horizontal female connectors connect to horizontal male connectors
- all the blocks inside of a clamp block will have z-index one greater than it
= the currently dragged block will have the greatest z-index
- when we start dragging a stack block or a left block then we remove its drop zones from the quadtree
    when the drag ends then we add them again
- when dragging a clamp block then we only need to look for horizontal collisions
- when dragging a value block we only need to look for vertical collisions
*/

/*
@param dragCallback - function to call when being dragged
*/
export const setUpDragging = (
  draggablePathRef,
  surroundingDivRef,
  dragFunctions
) => {
  if (draggablePathRef.current) {
    const svg = d3.select(draggablePathRef.current);
    let layerX = 0;
    let layerY = 0;
    svg.on("mousedown", (event) => {
      layerX = event.layerX;
      layerY = event.layerY;
    });
    svg.call(
      d3
        .drag()
        .on("start", (event) => {
          console.log("Drag Started!");
          dragFunctions?.dragStart && dragFunctions.dragStart();
        })
        .on("drag", (event) => {
          const divX = event.sourceEvent.clientX - layerX;
          const divY = event.sourceEvent.clientY - layerY;
          surroundingDivRef.current.style.top = `${divY}px`;
          surroundingDivRef.current.style.left = `${divX}px`;
          dragFunctions?.dragging && dragFunctions.dragging(divX, divY);
        })
        .on("end", (event) => {
            console.log("Drag Ended!");
            dragFunctions?.dragEnd && dragFunctions.dragEnd();
        })
    );
  }
};
