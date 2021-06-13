import React, { useRef, useState, useEffect, useContext } from "react";
import { BlocksModel } from "../model/BlocksModel/BlockSvg/BlocksModel";
import ClampBlockSVG from "../model/BlocksModel/BlockSvg/ClampBlockSVG";
import FlowBlockSVG from "../model/BlocksModel/BlockSvg/FlowBlockSVG";
import { CollisionContext } from "../Contexts/CollisionContext";
import { pollingTest, setUpDragging } from "../Utils/Blocks";
import FlowBlockNoArgsSVG from "./FlowBlockNoArgsSVG";

const updateDropZones = (quadtree, oldRef) => {};

const StackClampBlockNoArgsSVG = React.memo((props) => {
  console.log("Here......");
  const { quadtree } = useContext(CollisionContext);

  const [blocks, setBlocks] = useState(props?.schema?.blocks || []);

  const dropArea = useRef();
  const drag = useRef(null);
  const surroundingDiv = useRef(null);
  const lastPollingPosition = useRef({}); // used to store last drag location across renders

  const addBlock = (block) => {
    setBlocks([block]);
  };
  const pushToQuadtree = () => {
    const area = dropArea.current.getBoundingClientRect();
    quadtree.push({
      x: area.left,
      y: area.top,
      width: area.width,
      height: area.height,
      id: props.schema.id,
      addBlock,
    });
  };

  const dragStartCallback = () => {
    const dropZones = quadtree.filter((ele) => ele.id === props.schema.id);
    console.log(dropZones);
    dropZones && dropZones.contents.forEach((zone) => quadtree.remove(zone));
  };

  useEffect(() => {
    pushToQuadtree();
    setUpDragging(drag, surroundingDiv, {
      dragStart: dragStartCallback,
      dragEnd: pushToQuadtree,
    });
  }, []);

  const mul = BlocksModel.BLOCK_MULTIPLIERS[props.schema.type];
  const blockLines = props.blockHeightLines + 3;

  return (
    <div
      ref={surroundingDiv}
      style={{
        display: "inline-block",
        position: "absolute",
        top: 300,
        left: 900,
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
          ref={dropArea}
          style={{
            position: "absolute",
            top: 1.8 * BlocksModel.BLOCK_SIZE,
            left: 0.5 * BlocksModel.BLOCK_SIZE,
            width: 3 * BlocksModel.BLOCK_SIZE,
            height: 0.5 * BlocksModel.BLOCK_SIZE,
            // backgroundColor: "yellow",
          }}
        ></div>

        <div
          style={{
            position: "absolute",
            top: 1.8 * BlocksModel.BLOCK_SIZE,
            left: 0.5 * BlocksModel.BLOCK_SIZE,
            width: 3 * BlocksModel.BLOCK_SIZE,
            height: 0.5 * BlocksModel.BLOCK_SIZE,
            zIndex: 1000,
          }}
        >
          {blocks.map((block, index) => {
            if (block.category === "flow" && block.args.length === 0) {
              return (
                <FlowBlockNoArgsSVG
                  key={index}
                  schema={{
                    ...block,
                    position: {
                      x: 0,
                      y: (index + 0.2) * BlocksModel.BLOCK_SIZE,
                    },
                  }}
                  setBlocks={setBlocks}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
});

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

export default StackClampBlockNoArgsSVG;
