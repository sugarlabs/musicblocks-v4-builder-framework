import React, {useEffect, useRef} from 'react';
import FlowBlockSVG from "../model/BlocksModel/BlockSvg/FlowBlockSVG";
import { BlocksModel } from "../model/BlocksModel/BlockSvg/BlocksModel";
import ClampBlockSVG from "../model/BlocksModel/BlockSvg/ClampBlockSVG";
import { pollingTest, setupDragging } from "../Utils/Blocks";

/*
  props needed
  - props.blockWidthLines - ideally this should be in the client model
  - props.schema
*/

const FlowClampBlockNoArgs = React.memo((props) => {

  // refs
  const drag = useRef(null);
  const surroundingDiv = useRef(null);

  const blockLines = (1) + 2 + FlowBlockSVG.NOTCH_HEIGHT / 10;

  useEffect(() => {
    setupDragging(drag, surroundingDiv, {
      // dragStart: dragStartCallback,
      // dragEnd: pushToQuadtree,
    });
  }, []);

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
            stroke="purple"
            strokeWidth={".1"}
            fill={"purple"}
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
                  v10
                  h-${(ClampBlockSVG.LOWER_BRANCH * props.blockWidthLines * 10) + (ClampBlockSVG.STEM_WIDTH * 10) - (FlowBlockSVG.NOTCH_DISTANCE + FlowBlockSVG.NOTCH_WIDTH)}
                  v${FlowBlockSVG.NOTCH_HEIGHT}
                  h-${FlowBlockSVG.NOTCH_WIDTH}
                  v-${FlowBlockSVG.NOTCH_HEIGHT}
                  h-${FlowBlockSVG.NOTCH_DISTANCE}
                  v-${(blockLines) * 10}`}
          />
        </svg>

        <div
          style={{
            position: "absolute",
            top: (1.8) * BlocksModel.BLOCK_SIZE,
            left: 0.5 * BlocksModel.BLOCK_SIZE,
            width: 3 * BlocksModel.BLOCK_SIZE,
            height: 0.5 * BlocksModel.BLOCK_SIZE,
            // backgroundColor: "yellow",
          }}
        ></div>

        {/* {props.schema.blocks.map((block, index) => <div
          key={index}
          style={{
            position: "absolute",
            top: (1.8 + index + 1) * BlocksModel.BLOCK_SIZE,
            left: 0.5 * BlocksModel.BLOCK_SIZE,
            width: 3 * BlocksModel.BLOCK_SIZE,
            height: 0.5 * BlocksModel.BLOCK_SIZE,
            // backgroundColor: "yellow",
          }}
        ></div>)} */}

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
          {/* {props.schema.blocks.map((block, index) => {
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
          })} */}
        </div>
      </div>
    </div>
  );
})

FlowClampBlockNoArgs.defaultProps = {
  blockWidthLines: 4,
};

export default FlowClampBlockNoArgs;