import React, { useEffect, useRef, useContext } from "react";
import { BlocksModel } from "../model/BlocksModel/BlockSvg/BlocksModel";
import FlowBlockSVG from "../model/BlocksModel/BlockSvg/FlowBlockSVG";
import { CollisionContext } from "../Contexts/CollisionContext";
import { pollingTest, setupDragging } from "../Utils/Blocks";
import { argsDropAreas as quadtreeArgs } from '../DropAreas';
import ClampBlockSVG from "../model/BlocksModel/BlockSvg/ClampBlockSVG";

const ValueBlockSVG = React.memo((props) => {
  const { workspace, setWorkspace, addBlockToCrumbs } = useContext(CollisionContext);
  const drag = useRef(null);
  const surroundingDiv = useRef(null);
  const lastPollingPosition = useRef({});

  const dragStartCallback = () => {
    // if (!!props.nested) {
    //   props.updateBlockLinesMap(props.schema.id, 0);
    // }
  }

  let collidingWith = null;
  let currentHoverSetter = null;
  const draggingCallback = (x, y) => {
    if (pollingTest(lastPollingPosition, { x, y }, 1)) {
      const colliding = quadtreeArgs().colliding({
        x,
        y: y + 0.8 * BlocksModel.BLOCK_SIZE,
        width: (ClampBlockSVG.ARG_NOTCH_BRIDGE_WIDTH + ClampBlockSVG.ARG_NOTCH_WIDTH) * BlocksModel.BLOCK_SIZE,
        height: 5,
      });
      if (colliding.length > 0) {
        // console.log(`colliding with ${colliding[0].id}-${colliding[0].index}`);
        let tempColl = `${colliding[0].id}_${colliding[0].index}`;
        if (colliding[0].setCurrentlyHovered && collidingWith !== tempColl) {
          collidingWith = tempColl;
          currentHoverSetter = colliding[0].setCurrentlyHovered;
          console.log(`Now Collding with ${collidingWith}`);
          currentHoverSetter(colliding[0].index);
        }
      } else {
        if (collidingWith !== null) {
          console.log(`Moved out of ${collidingWith}`);
          collidingWith = null;
          currentHoverSetter(null);
          currentHoverSetter = null;
        }
      }
    }
  };

  const dragEndCallback = (x, y) => {
    // if (currentHoverSetter !== null) {
    //   currentHoverSetter(null);
    //   currentHoverSetter = null;
    // }
    // const collidingDropAreas = quadtree().colliding({
    //   x,
    //   y,
    //   width: 5,
    //   height: 5,
    // });
    // let colliding = false;
    // if (collidingDropAreas.length > 0) {
    //   colliding = true;
    // }
    // let newState = workspace;
    // if (colliding || !!props.nested) {
    //   // if the block(s) were nested and they were dragged then they
    //   // are to be removed from the previous block and added to CRUMBS
    //   // if the block was previously in CRUMBS or inside another block
    //   // and it is colliding at the end of drag then also it is to be
    //   // removed from its previous position and added
    //   newState = props.removeBlock(newState, props.schema.id);
    // }
    // if (colliding) {
    //   newState = collidingDropAreas[0].addBlock(newState, props.schema, collidingDropAreas[0].index);
    // }
    // if (!colliding && !!props.nested) {
    //   // if the block is not colliding at the end of the drag and is
    //   // nested then the block is to be added to crumbs
    //   console.log("Block is going to be added to CRUMBS");
    //   newState = addBlockToCrumbs(newState, { ...props.schema, position: { x, y } });
    // }
    // setWorkspace(newState);
  }

  useEffect(() => {
    setupDragging(drag, surroundingDiv, { dragging: draggingCallback, dragEnd: dragEndCallback, dragStart: dragStartCallback }, !!props.nested);
  }, [drag.current]);

  const blockLines = 1;

  return (
    <div
      ref={surroundingDiv}
      style={{
        position: "absolute",
        top: props.schema.position.y,
        left: props.schema.position.x,
        pointerEvents: "none"
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
            style={{pointerEvents: "fill"}}
            d={`M${ClampBlockSVG.ARG_NOTCH_BRIDGE_WIDTH + ClampBlockSVG.ARG_NOTCH_WIDTH} 0
                v${(10 - ClampBlockSVG.ARG_NOTCH_BRIDGE_HEIGHT) / 2} 
                h-${ClampBlockSVG.ARG_NOTCH_BRIDGE_WIDTH} 
                v-${(ClampBlockSVG.ARG_NOTCH_HEIGHT - ClampBlockSVG.ARG_NOTCH_BRIDGE_HEIGHT)/2}
                h-${ClampBlockSVG.ARG_NOTCH_WIDTH}
                v${ClampBlockSVG.ARG_NOTCH_HEIGHT}
                h${ClampBlockSVG.ARG_NOTCH_WIDTH}
                v-${(ClampBlockSVG.ARG_NOTCH_HEIGHT - ClampBlockSVG.ARG_NOTCH_BRIDGE_HEIGHT)/2}
                h${ClampBlockSVG.ARG_NOTCH_BRIDGE_WIDTH}
                v${(10 - ClampBlockSVG.ARG_NOTCH_BRIDGE_HEIGHT)/2}
                h${10 * props.schema.blockWidthLines - (ClampBlockSVG.ARG_NOTCH_BRIDGE_WIDTH + ClampBlockSVG.ARG_NOTCH_WIDTH)}
                v-${10* blockLines}
                h-${10 * props.schema.blockWidthLines - (ClampBlockSVG.ARG_NOTCH_BRIDGE_WIDTH + ClampBlockSVG.ARG_NOTCH_WIDTH)}
                `}
          />

          {/* {props.glow && <path
            stroke="yellow"
            fill="none"
            strokeWidth="1"
            d={`M0 10 
            h${FlowBlockSVG.NOTCH_DISTANCE}
              v${FlowBlockSVG.NOTCH_HEIGHT}
              h${FlowBlockSVG.NOTCH_WIDTH}
              v-${FlowBlockSVG.NOTCH_HEIGHT}
              h${(props.blockWidthLines) * 10 - (FlowBlockSVG.NOTCH_DISTANCE + FlowBlockSVG.NOTCH_WIDTH)}`}
          />} */}
        </svg>
      </div>
    </div>
  );
});

ValueBlockSVG.defaultProps = {
  blockWidthLines: 3,
};

export default ValueBlockSVG;
