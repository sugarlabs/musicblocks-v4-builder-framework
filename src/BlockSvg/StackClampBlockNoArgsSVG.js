import React, { useRef, useState, useEffect, useContext } from "react";
import { BlocksModel } from "../model/BlocksModel/BlockSvg/BlocksModel";
import ClampBlockSVG from "../model/BlocksModel/BlockSvg/ClampBlockSVG";
import FlowBlockSVG from "../model/BlocksModel/BlockSvg/FlowBlockSVG";
import { CollisionContext } from "../Contexts/CollisionContext";
import FlowClampBlockNoArgs from "./FlowClampBlockNoArgsSVG";
import FlowBlockNoArgsSVG from "./FlowBlockNoArgsSVG";
import {dropAreas as quadtree} from '../DropAreas';
import { setupDragging, getBlockLines, calculateBlockLinesTill, getBlockLinesWrapper } from "../Utils/Blocks";

const StackClampBlockNoArgsSVG = (props) => {
  console.log("StackClampBlockNoArgsSVG Rendered");
  const { addBlock, removeBlock } = useContext(CollisionContext);
  const [reRenderChildren, setReRenderChildren] = useState(false);
  let [blockLinesMap, setBlockLinesMap] = useState({});

  const updateBlockLinesMap = (updateId, updatedLines) => {
    const temp = {...blockLinesMap};
    getBlockLines(temp, props.schema, updateId, updatedLines);
    setBlockLinesMap({...temp});
  }

  let blockLinesTill = [];

  const drag = useRef(null);
  const surroundingDiv = useRef(null);

  const add = (workspace, block, index) => {
    const updatedWorkspace = addBlock(workspace, props.schema.id, index, block);
    setBlockLinesMap({...getBlockLinesWrapper(updatedWorkspace)})
    return updatedWorkspace;
  };

  const remove = (workspace, blockId) => {
    return removeBlock(workspace, props.schema.id, blockId);
  }

  const pushToQuadtree = () => {
    const area = surroundingDiv.current.getBoundingClientRect();
    const dropZones = quadtree().filter((ele) => ele.id === props.schema.id);
    if (dropZones?.length === props.schema.blocks.length + 1)
      return;
    blockLinesTill.forEach((line, index) => quadtree().push({
      x: area.left + 0.5 * BlocksModel.BLOCK_SIZE,
      y: area.top + (1.8 + line) * BlocksModel.BLOCK_SIZE,
      width: 3 * BlocksModel.BLOCK_SIZE,
      height: 0.5 * BlocksModel.BLOCK_SIZE,
      id: props.schema.id,
      index: index,
      addBlock: add,
    }, true));
  };

  const dragStartCallback = () => {
    const dropZones = quadtree().where({
      id: props.schema.id
    });
    dropZones.forEach((zone) => quadtree().remove(zone));
  };

  useEffect(() => {
    dragStartCallback();
    pushToQuadtree();
    setupDragging(drag, surroundingDiv, {
      dragStart: dragStartCallback,
      dragEnd: () => {
        setReRenderChildren(!reRenderChildren);
      },
    });
  });

  useEffect(()=>{
    let temp = {};
    getBlockLines(temp, props.schema);
    setBlockLinesMap(temp);
  }, [JSON.stringify(props.schema.blocks)])

  if (!blockLinesMap[props.schema.id]) {
    blockLinesMap = getBlockLinesWrapper(props.schema);
  }

  blockLinesTill = calculateBlockLinesTill(props.schema.blocks, blockLinesMap);

  const blockLines = blockLinesMap[props.schema.id];

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
          viewBox={`0 0 ${props.blockWidthLines * 10} ${blockLines * 10}`}
          width={`${BlocksModel.BLOCK_SIZE * props.blockWidthLines}px`}
          height={`${BlocksModel.BLOCK_SIZE * blockLines}px`}
        >
          <path
            ref={drag}
            stroke="purple"
            strokeWidth={".1"}
            fill={"purple"}
            d={`M0 10 h10
                 l${ClampBlockSVG.CAP_SIZE} -${ClampBlockSVG.CAP_SIZE}
                 l${ClampBlockSVG.CAP_SIZE} ${ClampBlockSVG.CAP_SIZE}
                 h${2 * (5 - ClampBlockSVG.CAP_SIZE)} 
                 h30 
                 v10 
                 h-${
                   45 - (FlowBlockSVG.NOTCH_DISTANCE + FlowBlockSVG.NOTCH_WIDTH)
                 } 
                 v${FlowBlockSVG.NOTCH_HEIGHT}
                 h-${FlowBlockSVG.NOTCH_WIDTH}
                 v-${FlowBlockSVG.NOTCH_HEIGHT}
                 h-${FlowBlockSVG.NOTCH_DISTANCE}
                 v${10 * ((blockLines - props.schema.defaultBlockHeightLines) || 1)}
                 h${FlowBlockSVG.NOTCH_DISTANCE} 
                 v${FlowBlockSVG.NOTCH_HEIGHT}
                 h${FlowBlockSVG.NOTCH_WIDTH} 
                 v-${FlowBlockSVG.NOTCH_HEIGHT}
                 h${
                   25 - (FlowBlockSVG.NOTCH_DISTANCE + FlowBlockSVG.NOTCH_WIDTH)
                 }
                 v10 h-35 
                 v-${blockLines * 10}`}
          />
        </svg>

        {blockLinesTill.map((lines, index) => <div
          key={index}
          style={{
            position: "absolute",
            zIndex: "11000",
            top: (1.8 + lines) * BlocksModel.BLOCK_SIZE,
            left: 0.5 * BlocksModel.BLOCK_SIZE,
            width: 3 * BlocksModel.BLOCK_SIZE,
            height: 0.5 * BlocksModel.BLOCK_SIZE,
            // backgroundColor: "yellow",
          }}
        ></div>)}

        <div
          style={{
            position: "absolute",
            top: 1.8 * BlocksModel.BLOCK_SIZE,
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
                  removeBlock={remove}
                  updateBlockLinesMap={updateBlockLinesMap}
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
                  blockLinesMap={blockLinesMap}
                  setBlockLinesMap={setBlockLinesMap}
                  updateBlockLinesMap={updateBlockLinesMap}
                  removeBlock={remove}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

StackClampBlockNoArgsSVG.defaultProps = {
  blockWidthLines: 5,
};

export default React.memo(StackClampBlockNoArgsSVG);
