import React, { useRef, useState, useEffect } from "react";
import { BlocksModel } from "../model/BlocksModel/BlockSvg/BlocksModel";
import ClampBlockSVG from "../model/BlocksModel/BlockSvg/ClampBlockSVG";
import FlowBlockSVG from "../model/BlocksModel/BlockSvg/FlowBlockSVG";
import { useDrag, useDrop, DragLayer } from "react-dnd";

const StackClampBlockNoArgsSVG = (props) => {
  const lastPollingPosition = useRef({});

  if (!lastPollingPosition.current.x) {
    lastPollingPosition.current = {
        ...props.currentOffset
    };
  }

  if (Math.abs(props.currentOffset?.x - lastPollingPosition.current?.x) >= 5 || Math.abs(props.currentOffset?.y - lastPollingPosition.current?.y) >= 5) {
    lastPollingPosition.current.x = props.currentOffset.x;
    lastPollingPosition.current.y = props.currentOffset.y;
    console.log("Moved by 5 pixels");
    console.log(lastPollingPosition);
  }

  const svgPath = useRef();
  const outerDiv = useRef();

  const [dragEnabled, setDragEnabled] = useState(false);

  const [{ isDragging, item }, drag] = useDrag({
    type: "START",
    canDrag: (monitor) => {
      return dragEnabled;
    },
    // isDragging: (monitor) => {
    //     console.log(monitor.getInitialSourceClientOffset());
    // },
    end: (item, monitor) => {
      setDragEnabled(false);
      lastPollingPosition.current = {};
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      item: monitor.getItem(),
    }),
  });

  useEffect(() => {
    if (svgPath && svgPath.current) {
      svgPath.current.addEventListener("mousedown", () => {
        setDragEnabled(true);
      });
    }
  }, []);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["TYPE1"],
    drop: (item, monitor) => {
      item.setPosition(
        0.5 * BlocksModel.BLOCK_SIZE + 10,
        2 * BlocksModel.BLOCK_SIZE + 10
      );
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const mul = BlocksModel.BLOCK_MULTIPLIERS[props.type];
  const blockLines = props.blockHeightLines + 3;

  return (
    <div
      ref={outerDiv}
      style={{
        display: "inline-block",
        position: "absolute",
        top: 100,
        left: 100,
        width: BlocksModel.BLOCK_SIZE * props.blockWidthLines,
      }}
    >
      <div
        ref={drag}
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
            ref={svgPath}
            stroke="purple"
            strokeWidth={isDragging ? "0" : ".1"}
            fill={isDragging ? "none" : "purple"}
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
                 v${10 * props.blockHeightLines}
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

        <div
          ref={drop}
          style={{
            position: "absolute",
            top: 2 * BlocksModel.BLOCK_SIZE,
            left: 0.5 * BlocksModel.BLOCK_SIZE,
            width: 3 * BlocksModel.BLOCK_SIZE,
            height: 0.5 * BlocksModel.BLOCK_SIZE,
            backgroundColor: "green",
          }}
        ></div>
      </div>
    </div>
  );
};

StackClampBlockNoArgsSVG.defaultProps = {
  blockHeightLines: 1,
  blockWidthLines: 5,
};

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  };
}

export default DragLayer(collect)(StackClampBlockNoArgsSVG);
