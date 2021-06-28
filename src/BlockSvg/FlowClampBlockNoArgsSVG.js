import React, {useEffect, useRef, useContext} from 'react';
import FlowBlockSVG from "../model/BlocksModel/BlockSvg/FlowBlockSVG";
import { BlocksModel } from "../model/BlocksModel/BlockSvg/BlocksModel";
import ClampBlockSVG from "../model/BlocksModel/BlockSvg/ClampBlockSVG";
import { CollisionContext } from "../Contexts/CollisionContext";
import { pollingTest, setupDragging } from "../Utils/Blocks";
import FlowBlockNoArgsSVG from "./FlowBlockNoArgsSVG";
import {dropAreas as quadtree} from '../DropAreas';

/*
  props needed
  - props.blockWidthLines - ideally this should be in the client model
  - props.schema
*/

const FlowClampBlockNoArgs = React.memo((props) => {

  const { addBlock, removeBlock } = useContext(CollisionContext);

  // refs
  const drag = useRef(null);
  const surroundingDiv = useRef(null);

  // add blocks to the clamp when they are dropped in the drop Areas
  const add = (workspace, block, index) => {
    return addBlock(workspace, props.schema.id, index, block);
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
    quadtree().push({
        x: area.left + ClampBlockSVG.STEM_WIDTH * BlocksModel.BLOCK_SIZE,
        y: area.top + (0.8) * BlocksModel.BLOCK_SIZE,
        width: 3 * BlocksModel.BLOCK_SIZE,
        height: 0.5 * BlocksModel.BLOCK_SIZE,
        id: props.schema.id,
        index: 0,
        addBlock: add,
    }, true);
    props.schema.blocks.forEach((block, index) => quadtree().push({
      x: area.left + 0.5 * BlocksModel.BLOCK_SIZE,
      y: area.top + (index + 1 + 0.8) * BlocksModel.BLOCK_SIZE,
      width: 3 * BlocksModel.BLOCK_SIZE,
      height: 0.5 * BlocksModel.BLOCK_SIZE,
      id: props.schema.id,
      index: index + 1,
      addBlock: add,
    }, true));
  };

  // remove all the drop zones from quadtree when drag starts
  const dragStartCallback = () => {
    const dropZones = quadtree().where({
      id: props.schema.id
    });
    dropZones.forEach((zone) => quadtree().remove(zone));
  };

  const blockLines = (props.schema.blocks.length + 1) + 2 + FlowBlockSVG.NOTCH_HEIGHT / 10;

  useEffect(() => {
    pushToQuadtree();
    setupDragging(drag, surroundingDiv, {
      dragStart: dragStartCallback,
      dragEnd: pushToQuadtree,
    });
  }, [props.schema.blocks.length]);

  return (
    <div
      ref={surroundingDiv}
      style={{
        display: "inline-block",
        position: "absolute",
        top: 100,
        left: 100,
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
                  v${10 * (1)}
                  h${FlowBlockSVG.NOTCH_DISTANCE} 
                  v${FlowBlockSVG.NOTCH_HEIGHT}
                  h${FlowBlockSVG.NOTCH_WIDTH} 
                  v-${FlowBlockSVG.NOTCH_HEIGHT}
                  h${(ClampBlockSVG.LOWER_BRANCH * props.blockWidthLines * 10) - (FlowBlockSVG.NOTCH_DISTANCE + FlowBlockSVG.NOTCH_WIDTH)}
                  v${10 * (props.schema.blocks.length || 1)}
                  h-${(ClampBlockSVG.LOWER_BRANCH * props.blockWidthLines * 10) + (ClampBlockSVG.STEM_WIDTH * 10) - (FlowBlockSVG.NOTCH_DISTANCE + FlowBlockSVG.NOTCH_WIDTH)}
                  v${FlowBlockSVG.NOTCH_HEIGHT}
                  h-${FlowBlockSVG.NOTCH_WIDTH}
                  v-${FlowBlockSVG.NOTCH_HEIGHT}
                  h-${FlowBlockSVG.NOTCH_DISTANCE}
                  v-${(blockLines) * 10}`}
          />
        </svg>

        {/* rendering DOM element for drop zones */}
        <div
          style={{
            position: "absolute",
            top: (0.8) * BlocksModel.BLOCK_SIZE,
            left: ClampBlockSVG.STEM_WIDTH * BlocksModel.BLOCK_SIZE,
            width: 3 * BlocksModel.BLOCK_SIZE,
            height: 0.5 * BlocksModel.BLOCK_SIZE,
            // backgroundColor: "yellow",
          }}
        ></div>

        {props.schema.blocks.map((block, index) => <div
          key={index}
          style={{
            position: "absolute",
            top: (0.8 + index + 1) * BlocksModel.BLOCK_SIZE,
            left: 0.5 * BlocksModel.BLOCK_SIZE,
            width: 3 * BlocksModel.BLOCK_SIZE,
            height: 0.5 * BlocksModel.BLOCK_SIZE,
            // backgroundColor: "yellow",
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
                      y: (index + 0.2) * BlocksModel.BLOCK_SIZE,
                    },
                  }}
                  nested
                  removeBlock={remove}
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