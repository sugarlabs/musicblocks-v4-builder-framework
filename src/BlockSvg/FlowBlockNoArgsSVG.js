import React, { useState, useRef, useContext } from "react";
import { BlocksModel } from "../model/BlocksModel/BlockSvg/BlocksModel";
import ClampBlockSVG from "../model/BlocksModel/BlockSvg/ClampBlockSVG";
import FlowBlockSVG from "../model/BlocksModel/BlockSvg/FlowBlockSVG";
import { CollisionContext } from "../Contexts/CollisionContext";
import { useDrag, DragLayer } from "react-dnd";
import { pollingTest } from "../Utils/Blocks";

const FlowBlockNoArgsSVG = React.memo((props) => {
  const { quadtree } = useContext(CollisionContext);

//   const [x, setX] = useState(props.position.x ? props.position.x : 500);
//   const [y, setY] = useState(props.position.y ? props.position.y : 500);

  const lastPollingPosition = useRef({});

//   const setPosition = (x, y) => {
//     setX(x);
//     setY(y);
//   };

  const [{ isDragging }, drag] = useDrag({
    type: props.type,
    item: {
      name: "amazing item",
      type: props.type,
    //   setPosition: setPosition.bind(this),
    },
    end: () => {
      props.setPosition(props.id, props.currentOffset);
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  // the drag layers are linked
  if (isDragging && pollingTest(lastPollingPosition, props.currentOffset, 5)) {
    console.log("Moved By 5 Pixels");
    const colliding = quadtree.colliding({
      x: props.currentOffset.x,
      y: props.currentOffset.y,
      width: 5, //Optional
      height: 5, //Optional
    });
    if (colliding.length > 0) {
        console.log(colliding[0]);
    }
  }

  const mul = BlocksModel.BLOCK_MULTIPLIERS[props.type];
  const blockLines = 1 + FlowBlockSVG.NOTCH_HEIGHT / 10;

  return (
    <div style={{ position: "absolute", top: props.position.y, left: props.position.x }}>
      <div
        ref={drag}
        style={{
          display: "inline-block",
          width: BlocksModel.BLOCK_SIZE * props.blockWidthLines,
        }}
      >
        <svg
          viewBox={`0 0 ${props.blockWidthLines * 10} ${blockLines * 10}`}
          width={`${BlocksModel.BLOCK_SIZE * props.blockWidthLines}px`}
          height={`${BlocksModel.BLOCK_SIZE * blockLines}px`}
        >
          <path
            stroke={props.color}
            strokeWidth={isDragging ? "0" : ".1"}
            fill={isDragging ? "none" : props.color}
            d={`M0 0
                 h${FlowBlockSVG.NOTCH_DISTANCE}
                 v${FlowBlockSVG.NOTCH_HEIGHT}
                 h${FlowBlockSVG.NOTCH_WIDTH}
                 v-${FlowBlockSVG.NOTCH_HEIGHT}
                 h${
                   10 * props.blockWidthLines -
                   (FlowBlockSVG.NOTCH_DISTANCE + FlowBlockSVG.NOTCH_WIDTH)
                 } 
                 v${10 * 1}
                 h-${
                   10 * props.blockWidthLines -
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

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  };
}

export default DragLayer(collect)(FlowBlockNoArgsSVG);
