import * as d3 from "d3";
import ClampBlockSVG from "../model/BlocksModel/BlockSvg/ClampBlockSVG";

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

export const setupDragging = (
  draggablePathRef,
  surroundingDivRef,
  dragFunctions
) => {
  if (draggablePathRef.current) {
    const svg = d3.select(draggablePathRef.current);
    let layerX = 0;
    let layerY = 0;
    svg.on("mousedown", (event) => {
      event.stopPropagation();
      event.preventDefault();
      layerX = event.layerX;
      layerY = event.layerY;
    });
    svg.call(
      d3
        .drag()
        .on("start", (event) => {
          dragFunctions?.dragStart && dragFunctions.dragStart();
          surroundingDivRef.current.style.zIndex = '1000';
        })
        .on("drag", (event) => {
          const divX = event.sourceEvent.pageX - layerX;
          const divY = event.sourceEvent.pageY - layerY;
          surroundingDivRef.current.style.position = 'fixed';
          surroundingDivRef.current.style.top = `${divY}px`;
          surroundingDivRef.current.style.left = `${divX}px`;
          dragFunctions?.dragging && dragFunctions.dragging(divX, divY);
        })
        .on("end", (event) => {
            const divX = event.sourceEvent.clientX - layerX;
            const divY = event.sourceEvent.clientY - layerY;
            surroundingDivRef.current.style.position = 'absolute';
            surroundingDivRef.current.style.zIndex = 'auto';
            dragFunctions?.dragEnd && dragFunctions.dragEnd(divX, divY);
        })
    );
  }
};

export const getBlockLines = (container, schema, updatedId, updatedLines) => {
  // recursivly iterates the all the blocks in the stack and gives how many blockLines
  // they take up currently
  let lines = 0;
  for (let i = 0; i < (schema?.blocks?.length || 0); i++) {
    if (schema.id === updatedId) {
      lines += updatedLines;
    } else {
      lines += getBlockLines(container, schema.blocks[i], updatedId, updatedLines);
    }
  }
  if (!updatedId || schema.id !== updatedId) {
      lines += schema.defaultBlockHeightLines;
    if (schema.category !== "flow" && lines <= schema.defaultBlockHeightLines) {
      // in Stack Clmap and Clamp blocks, even if the line is it is empty we have a blank block line
      lines++;
    }
  }
  container[schema.id] = lines;
  return lines;
}

export const getBlockLinesWrapper = (schema, updatedId, updatedLines) => {
  let temp = {};
  getBlockLines(temp, schema, updatedId, updatedLines);
  return temp;
}

export const calculateBlockLinesTill = (blocks, blockLinesMap) => {
  const container = [];
  let sum = 0;
  container.push(sum);
  blocks.forEach((block) => {
    if (blockLinesMap[block.id])
      sum += blockLinesMap[block.id];
    container.push(sum);
  });
  return container;
}

export const getBlockWidths = (container, schema, updatedId, updatedWidth) => {
  // recursivly iterates the all the blocks in the stack and gives how many blockLines
  // they take up currently
  let width = schema.blockWidthLines + ClampBlockSVG.ARG_PADDING * schema.argsLength;
  for (let i = 0; i < (schema?.args?.length || 0); i++) {
    if (schema.id === updatedId) {
      width += updatedWidth;
    } else {
      if (schema.args[i]) {
        width += getBlockWidths(container, schema.args[i], updatedId, updatedWidth);
      } else {
        width += ClampBlockSVG.ARG_PADDING;
      }
    }
  }
  container[schema.id] = width;
  return width;
}

export const getBlockWidthWrapper = (schema, updatedId, updatedWidth) => {
  let temp = {};
  getBlockWidths(temp, schema, updatedId, updatedWidth);
  return temp;
}