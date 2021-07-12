import React, { useEffect, useRef, useContext } from "react";
import { BlocksModel } from "../model/BlocksModel/BlockSvg/BlocksModel";
import FlowBlockSVG from "../model/BlocksModel/BlockSvg/FlowBlockSVG";
import { CollisionContext } from "../Contexts/CollisionContext";
import { pollingTest, setupDragging } from "../Utils/Blocks";
import { dropAreas as quadtree } from '../DropAreas';
import ClampBlockSVG from "../model/BlocksModel/BlockSvg/ClampBlockSVG";

const ValueBlockSVG = React.memo((props) => {
  const { workspace, setWorkspace, addBlockToCrumbs } = useContext(CollisionContext);
  const drag = useRef(null);
  const surroundingDiv = useRef(null);
  const lastPollingPosition = useRef({});

  const dragStartCallback = () => {

  }

  let collidingWith = null;
  let currentHoverSetter = null;
  const draggingCallback = (x, y) => {

  };

  const dragEndCallback = (x, y) => {

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


        </svg>
      </div>
    </div>
  );
});

ValueBlockSVG.defaultProps = {
  blockWidthLines: 3,
};

export default ValueBlockSVG;
