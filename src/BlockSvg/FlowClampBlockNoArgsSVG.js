import React, {useEffect, useState, useRef, useContext} from 'react';
import FlowBlockSVG from "../model/BlocksModel/BlockSvg/FlowBlockSVG";
import { BlocksModel } from "../model/BlocksModel/BlockSvg/BlocksModel";
import ClampBlockSVG from "../model/BlocksModel/BlockSvg/ClampBlockSVG";
import { CollisionContext } from "../Contexts/CollisionContext";
import FlowBlockNoArgsSVG from "./FlowBlockNoArgsSVG";
import {dropAreas as quadtree} from '../DropAreas';
import { pollingTest, setupDragging, calculateBlockLinesTill, getBlockLines, getBlockLinesWrapper } from "../Utils/Blocks";

/*
  props needed
  - props.blockWidthLines - ideally this should be in the client model
  - props.schema
*/

const FlowClampBlockNoArgs = React.memo((props) => {

  const [reRenderChildren, setReRenderChildren] = useState(false);
  let [blockLinesMap, setBlockLinesMap] = useState(!props.nested? {...getBlockLinesWrapper(props.schema)}: {});

  const updateBlockLinesMap = (updateId, updatedLines) => {
    const temp = {...blockLinesMap};
    getBlockLines(temp, props.schema, updateId, updatedLines);
    setBlockLinesMap({...temp});
  }
  let blockLinesTill = [];

  const dragging = useRef({status: !!props.dragging, lines: props.nested? props.blockLinesMap[props.schema.id]: 0});

  const { addBlock, workspace, setWorkspace, addBlockToCrumbs, removeBlock } = useContext(CollisionContext);

  // refs
  const drag = useRef(null);
  const surroundingDiv = useRef(null);
  const lastPollingPosition = useRef({});

  // add blocks to the clamp when they are dropped in the drop Areas
  const add = (workspace, block, index) => {
    const updatedWorkspace = addBlock(workspace, props.schema.id, index, block);
    if (!!props.nested) {
      props.setBlockLinesMap({...getBlockLinesWrapper(updatedWorkspace)});
    } else {
      setBlockLinesMap({...getBlockLinesWrapper(updatedWorkspace)});
    }
    return updatedWorkspace;
  };

  const remove = (workspace, blockId) => {
    return removeBlock(workspace, props.schema.id, blockId);
  }

  // adds the drop areas of the clamp to quadtree
  const pushToQuadtree = () => {
    const area = surroundingDiv.current.getBoundingClientRect();
    const dropZones = quadtree().filter((ele) => ele.id === props.schema.id);
    if (dropZones?.length === props.schema.blocks.length + 1)
      return;
    blockLinesTill.forEach((line, index) => quadtree().push({
      x: area.left + 0.5 * BlocksModel.BLOCK_SIZE,
      y: area.top + (line + 0.8) * BlocksModel.BLOCK_SIZE,
      width: 3 * BlocksModel.BLOCK_SIZE,
      height: 0.5 * BlocksModel.BLOCK_SIZE,
      id: props.schema.id,
      index: index,
      addBlock: add,
    }, true));
  };

  // remove all the drop zones from quadtree when drag starts
  const removeDropZones = () => {
    const dropZones = quadtree().where({
      id: props.schema.id
    });
    dropZones.forEach((zone) => quadtree().remove(zone));
  }

  const dragStartCallback = () => {
    removeDropZones();
    dragging.current = {status: true, lines: props.nested? props.blockLinesMap[props.schema.id]: props.defaultBlockHeightLines};
    if (!!props.nested) {
      props.updateBlockLinesMap(props.schema.id, 0);
    }
  };

  const draggingCallback = (x, y) => {
    if (pollingTest(lastPollingPosition, { x, y }, 5)) {
      const colliding = quadtree().colliding({
        x,
        y,
        width: 5,
        height: 5,
      });
      if (colliding.length > 0) {
        // console.log(colliding[0].id);
      }
    }
  };

  const dragEndCallback = (x, y) => {
    dragging.current.status = false;
    const collidingDropAreas = quadtree().colliding({
      x,
      y,
      width: 5,
      height: 5,
    });
    let colliding = false;
    if (collidingDropAreas.length > 0) {
      colliding = true;
    }
    let newState = workspace;
    if (colliding || !!props.nested) {
      newState = props.removeBlock(newState, props.schema.id);
    }
    if (colliding) {
      newState = collidingDropAreas[0].addBlock(newState, props.schema, collidingDropAreas[0].index);
    }
    if (!colliding && !!props.nested) {
      newState = addBlockToCrumbs(newState, { ...props.schema, position: { x, y } });
    }
    setWorkspace(newState);
    if (!colliding && !props.nested) {
      pushToQuadtree();
      setReRenderChildren(!reRenderChildren);
    }
  }

  useEffect(() => {
    dragging.current.status = !!props.dragging;
    removeDropZones();
    pushToQuadtree();
    setupDragging(drag, surroundingDiv, {
      dragStart: dragStartCallback,
      dragging: draggingCallback,
      dragEnd: dragEndCallback,
    });
  });

  useEffect(()=>{
    if (!props.nested) {
      let temp = {};
      getBlockLines(temp, props.schema);
      setBlockLinesMap(temp);
    }
  }, [JSON.stringify(props.schema.blocks)])

  if (!props.nested && !blockLinesMap[props.schema.id]) {
    blockLinesMap = getBlockLinesWrapper(props.schema);
  }

  blockLinesTill = calculateBlockLinesTill(props.schema.blocks, props.nested? props.blockLinesMap: blockLinesMap);
  const blockLines = !!props.nested? dragging.current.status? dragging.current.lines: props.blockLinesMap[props.schema.id] : blockLinesMap[props.schema.id];

  return (
    <div
      ref={surroundingDiv}
      style={{
        display: "inline-block",
        position: "absolute",
        top: props.schema.position.y,
        left: props.schema.position.x,
        width: BlocksModel.BLOCK_SIZE * props.blockWidthLines,
      }}
    >
      <div
        style={{
          display: "inline-block",
          position: "relative",
          width: BlocksModel.BLOCK_SIZE * props.blockWidthLines,
        }}
      >
        <svg
          viewBox={`0 0 ${props.blockWidthLines * 10} ${(blockLines + FlowBlockSVG.NOTCH_HEIGHT / 10) * 10}`}
          width={`${BlocksModel.BLOCK_SIZE * props.blockWidthLines}px`}
          height={`${BlocksModel.BLOCK_SIZE * (blockLines + FlowBlockSVG.NOTCH_HEIGHT / 10)}px`}
        >
          <path
            ref={drag}
            stroke={"black"}
            strokeWidth={".1"}
            fill={props.schema.color}
            d={`M0 0 
            h${FlowBlockSVG.NOTCH_DISTANCE} 
                  v${FlowBlockSVG.NOTCH_HEIGHT}
                  h${FlowBlockSVG.NOTCH_WIDTH} 
                  v-${FlowBlockSVG.NOTCH_HEIGHT}
                  h${(props.blockWidthLines * 10)-(FlowBlockSVG.NOTCH_DISTANCE + FlowBlockSVG.NOTCH_WIDTH)}
                  v10 
                  h-${(props.blockWidthLines - ClampBlockSVG.STEM_WIDTH) * 10 - (FlowBlockSVG.NOTCH_DISTANCE + FlowBlockSVG.NOTCH_WIDTH)} 
                  v${FlowBlockSVG.NOTCH_HEIGHT}
                  h-${FlowBlockSVG.NOTCH_WIDTH}
                  v-${FlowBlockSVG.NOTCH_HEIGHT}
                  h-${FlowBlockSVG.NOTCH_DISTANCE}
                  v${10 * ((blockLines - props.schema.defaultBlockHeightLines) || 1)}
                  h${FlowBlockSVG.NOTCH_DISTANCE} 
                  v${FlowBlockSVG.NOTCH_HEIGHT}
                  h${FlowBlockSVG.NOTCH_WIDTH} 
                  v-${FlowBlockSVG.NOTCH_HEIGHT}
                  h${(ClampBlockSVG.LOWER_BRANCH * props.blockWidthLines * 10) - (FlowBlockSVG.NOTCH_DISTANCE + FlowBlockSVG.NOTCH_WIDTH)}
                  v${10 * (1)}
                  h-${(ClampBlockSVG.LOWER_BRANCH * props.blockWidthLines * 10) + (ClampBlockSVG.STEM_WIDTH * 10) - (FlowBlockSVG.NOTCH_DISTANCE + FlowBlockSVG.NOTCH_WIDTH)}
                  v${FlowBlockSVG.NOTCH_HEIGHT}
                  h-${FlowBlockSVG.NOTCH_WIDTH}
                  v-${FlowBlockSVG.NOTCH_HEIGHT}
                  h-${FlowBlockSVG.NOTCH_DISTANCE}
                  v-${((blockLines + FlowBlockSVG.NOTCH_HEIGHT / 10)) * 10}`}
          />
        </svg>

        {blockLinesTill.map((lines, index) => <div
          key={index}
          style={{
            position: "absolute",
            top: (0.8 + lines) * BlocksModel.BLOCK_SIZE,
            left: 0.5 * BlocksModel.BLOCK_SIZE,
            width: 3 * BlocksModel.BLOCK_SIZE,
            height: 0.5 * BlocksModel.BLOCK_SIZE,
            // backgroundColor: "black",
          }}
        ></div>)}

        <div
          style={{
            position: "absolute",
            top: 0.8 * BlocksModel.BLOCK_SIZE,
            left: 0.5 * BlocksModel.BLOCK_SIZE,
            width: 3 * BlocksModel.BLOCK_SIZE,
            height: 0.5 * BlocksModel.BLOCK_SIZE,
            zIndex: 999,
          }}
        >
          {props.schema.blocks.map((block, index) => {
            if (block.category === "flow" && block.args.length === 0) {
              return (
                <FlowBlockNoArgsSVG
                  key={block.id}
                  schema={{
                    ...block,
                    position: {
                      x: 0,
                      y: (blockLinesTill[index] + 0.2) * BlocksModel.BLOCK_SIZE,
                    },
                  }}
                  nested
                  updateBlockLinesMap={props.nested? props.updateBlockLinesMap: updateBlockLinesMap}
                  removeBlock={remove}
                />
              );
            } else if (block.category === "flowClamp" && block.args.length === 0) {
              return (
                <FlowClampBlockNoArgs
                  key={block.id}
                  schema={{
                    ...block,
                    position: {
                      x: 0,
                      y: (blockLinesTill[index] + 0.2) * BlocksModel.BLOCK_SIZE,
                    },
                  }}
                  nested
                  blockLinesMap={props.nested? props.blockLinesMap: blockLinesMap}
                  setBlockLinesMap={props.nested? props.setBlockLinesMap: setBlockLinesMap}
                  updateBlockLinesMap={props.nested? props.updateBlockLinesMap: updateBlockLinesMap}
                  removeBlock={remove}
                  dragging={dragging.current.status}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
})

FlowClampBlockNoArgs.defaultProps = {
  blockWidthLines: 4,
};

export default FlowClampBlockNoArgs;