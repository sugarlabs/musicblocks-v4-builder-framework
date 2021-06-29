import React, { useEffect, useRef, useContext } from "react";
import { BlocksModel } from "../model/BlocksModel/BlockSvg/BlocksModel";
import ClampBlockSVG from "../model/BlocksModel/BlockSvg/ClampBlockSVG";
import FlowBlockSVG from "../model/BlocksModel/BlockSvg/FlowBlockSVG";
import { CollisionContext } from "../Contexts/CollisionContext";
import { pollingTest, setupDragging } from "../Utils/Blocks";
import { dropAreas as quadtree } from '../DropAreas';

const FlowBlockNoArgsSVG = React.memo((props) => {
  const { workspace, setWorkspace, addBlockToCrumbs } = useContext(CollisionContext);
  const drag = useRef(null);
  const surroundingDiv = useRef(null);
  const lastPollingPosition = useRef({});

  const dragStartCallback = () => { }

  const draggingCallback = (x, y) => {
    if (pollingTest(lastPollingPosition, { x, y }, 5)) {
      const colliding = quadtree().colliding({
        x,
        y,
        width: 5,
        height: 5,
      });
      if (colliding.length > 0) {
        console.log(colliding[0].id);
      }
    }
  };

  const dragEndCallback = (x, y) => {
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
      // if the block(s) were nested and they were dragged then they
      // are to be removed from the previous block and added to CRUMBS
      // if the block was previously in CRUMBS or inside another block
      // and it is colliding at the end of drag then also it is to be
      // removed from its previous position and added
      newState = props.removeBlock(newState, props.schema.id);
    }
    if (colliding) {
      newState = collidingDropAreas[0].addBlock(newState, props.schema, collidingDropAreas[0].index);
    }
    if (!colliding && !!props.nested) {
      // if the block is not colliding at the end of the drag and is
      // nested then the block is to be added to crumbs
      console.log("Block is going to be added to CRUMBS");
      newState = addBlockToCrumbs(newState, { ...props.schema, position: { x, y } });
    }
    setWorkspace(newState);
  }

  useEffect(() => {
    setupDragging(drag, surroundingDiv, { dragging: draggingCallback, dragEnd: dragEndCallback, dragStart: dragStartCallback }, !!props.nested);
  }, [drag.current]);

  const blockLines = 1 + FlowBlockSVG.NOTCH_HEIGHT / 10;

  return (
    <div
      ref={surroundingDiv}
      style={{
        position: "absolute",
        top: props.schema.position.y,
        left: props.schema.position.x,
      }}
    >
      <div
        style={{
          display: "inline-block",
          width: BlocksModel.BLOCK_SIZE * props.schema.blockWidthLines,
        }}
      >
        <svg
          viewBox={`0 0 ${props.schema.blockWidthLines * 10} ${blockLines * 10}`}
          width={`${BlocksModel.BLOCK_SIZE * props.schema.blockWidthLines}px`}
          height={`${BlocksModel.BLOCK_SIZE * blockLines}px`}
        >
          <path
            ref={drag}
            stroke={props.schema.color}
            strokeWidth={".1"}
            fill={props.schema.color}
            d={`M0 0
                 h${FlowBlockSVG.NOTCH_DISTANCE}
                 v${FlowBlockSVG.NOTCH_HEIGHT}
                 h${FlowBlockSVG.NOTCH_WIDTH}
                 v-${FlowBlockSVG.NOTCH_HEIGHT}
                 h${10 * props.schema.blockWidthLines -
              (FlowBlockSVG.NOTCH_DISTANCE + FlowBlockSVG.NOTCH_WIDTH)
              } 
                 v${10 * 1}
                 h-${10 * props.schema.blockWidthLines -
              (FlowBlockSVG.NOTCH_DISTANCE + FlowBlockSVG.NOTCH_WIDTH)
              } 
                 v${FlowBlockSVG.NOTCH_HEIGHT} 
                 h-${FlowBlockSVG.NOTCH_DISTANCE}
                 v-${FlowBlockSVG.NOTCH_HEIGHT}
                 h-${FlowBlockSVG.NOTCH_DISTANCE}
                 v-${1 * 10}`}
          />
        </svg>
      </div>
    </div>
  );
});

FlowBlockNoArgsSVG.defaultProps = {
  blockWidthLines: 3,
};

export default FlowBlockNoArgsSVG;
