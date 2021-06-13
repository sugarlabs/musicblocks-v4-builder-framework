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

export const setUpDragging = (draggablePathRef, surroundingDivRef) => {
  if (draggablePathRef.current) {
    const svg = d3.select(draggablePathRef.current);
    let layerX = 0,
      layerY = 0;
    svg.on("mousedown", (event) => {
      console.log(event);
      layerX = event.layerX;
      layerY = event.layerY;
    });
    svg.call(
      d3.drag().on("drag", (event) => {
        console.log(event);
        surroundingDivRef.current.style.top = `${
          event.sourceEvent.clientY - layerY
        }px`;
        surroundingDivRef.current.style.left = `${
          event.sourceEvent.clientX - layerX
        }px`;
      })
    );
  }
};
