import React, { useState, useEffect, useRef, useContext } from "react";
import { BlocksModel } from "../model/BlocksModel/BlockSvg/BlocksModel";
import ClampBlockSVG from "../model/BlocksModel/BlockSvg/ClampBlockSVG";
import FlowBlockSVG from "../model/BlocksModel/BlockSvg/FlowBlockSVG";
import { CollisionContext } from "../Contexts/CollisionContext";
import { pollingTest, setUpDragging } from "../Utils/Blocks";
import { useDrag, DragLayer } from "react-dnd";

const FlowBlockNoArgsSVG = React.memo((props) => {
  // console.log(props.schema);
  const { quadtree } = useContext(CollisionContext);

  const [position, setPosition] = useState({ ...props.schema.position });

  const drag = useRef(null);
  const surroundingDiv = useRef(null);

  const lastPollingPosition = useRef({});

  const draggingCallback = (x, y) => {
    if (pollingTest(lastPollingPosition, { x, y }, 5)) {
      // console.log("Moved By 5 Pixels");
      const colliding = quadtree.colliding({
        x,
        y,
        width: 5,
        height: 5,
      });
      if (colliding.length > 0) {
        // console.log(colliding[0]);
      }
    }
  };

  const dragEndCallback = (x, y) => {
    const colliding = quadtree.colliding({
        x,
        y,
        width: 5,
        height: 5,
    });
    if (colliding.length > 0) {
        console.log(`Drag ended colliding with ${colliding[0].id}`);
        colliding[0].addBlock(props.schema);
        props.removeBlock(props.schema.id);
    }
  }

  useEffect(() => {
    setUpDragging(drag, surroundingDiv, { dragging: draggingCallback, dragEnd: dragEndCallback });
  }, [drag.current]);

  const blockLines = 1 + FlowBlockSVG.NOTCH_HEIGHT / 10;

  return (
    <div
      ref={surroundingDiv}
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
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
                 h${
                   10 * props.schema.blockWidthLines -
                   (FlowBlockSVG.NOTCH_DISTANCE + FlowBlockSVG.NOTCH_WIDTH)
                 } 
                 v${10 * 1}
                 h-${
                   10 * props.schema.blockWidthLines -
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
