import React from 'react';
import { IStackClampBlockView } from '../../../@types/Components/stackClampBlock';
import { FlowConfig, BlocksConfig, StackClampCapSize, ClampConfig } from '../../../BlocksUIconfig';

const StackClampBlockSVG: React.FC<IStackClampBlockView> = (props) => {
  const { NOTCH_DISTANCE, NOTCH_HEIGHT, NOTCH_WIDTH } = FlowConfig;
  // const {
  // ARG_NOTCH_BRIDGE_HEIGHT,
  // ARG_NOTCH_BRIDGE_WIDTH,
  // ARG_PLACEHOLDER_WIDTH,
  // ARG_NOTCH_HEIGHT,
  // ARG_NOTCH_WIDTH,
  // ARG_PADDING } = ArgsConfig;
  const { STEM_WIDTH } = ClampConfig;
  const blockLines = props.blockHeightLines + StackClampCapSize / 10;
  return (
    <svg
      viewBox={`0 0 ${props.defaultBlockWidthLines * 10} ${blockLines * 10}`}
      width={`${BlocksConfig.BLOCK_SIZE * props.defaultBlockWidthLines}px`}
      height={`${BlocksConfig.BLOCK_SIZE * blockLines}px`}
    >
      <path
        // ref={drag}
        stroke="purple"
        strokeWidth={'.1'}
        fill={'purple'}
        style={{ pointerEvents: 'fill' }}
        d={`M0 ${StackClampCapSize} h10
                 l${StackClampCapSize} -${StackClampCapSize}
                 l${StackClampCapSize} ${StackClampCapSize}
                 h${2 * (5 - StackClampCapSize)} 
                 h${(props.defaultBlockWidthLines - 2) * 10} 
                 ${
                   props.argsLength
                     ? (() => {
                         //     let argsHolderSvg = '';
                         //     for (let i = 0; i < props.argsLength; i++) {
                         //         argsHolderSvg += `
                         //   v${(10 - ARG_NOTCH_BRIDGE_HEIGHT) / 2}
                         //   h-${ARG_NOTCH_BRIDGE_WIDTH}
                         //   v-${(ARG_NOTCH_HEIGHT - ARG_NOTCH_BRIDGE_HEIGHT) / 2}
                         //   h-${ARG_NOTCH_WIDTH}
                         //   v${ARG_NOTCH_HEIGHT}
                         //   h${ARG_NOTCH_WIDTH}
                         //   v-${(ARG_NOTCH_HEIGHT - ARG_NOTCH_BRIDGE_HEIGHT) / 2}
                         //   h${ARG_NOTCH_BRIDGE_WIDTH}
                         //   v${(10 - ARG_NOTCH_BRIDGE_HEIGHT) / 2 - 1} `;
                         //         if (props.schema.args[i] && blockWidthMap[props.schema.args[i].id] !== ARG_PLACEHOLDER_WIDTH) {
                         //             argsHolderSvg += `h${blockWidthMap[props.schema.args[i].id] * 10 - (ARG_NOTCH_BRIDGE_WIDTH + ARG_NOTCH_WIDTH)} `;
                         //         } else
                         //             argsHolderSvg += `h${ARG_PLACEHOLDER_WIDTH * 10} `;
                         //         argsHolderSvg += 'v-9 ';
                         //         argsHolderSvg += `h${ARG_PADDING * 10} `;
                         //     }
                         //     return argsHolderSvg;
                       })()
                     : ''
                 }
                 v10 
                 h-${
                   (props.defaultBlockWidthLines - STEM_WIDTH) * 10 - (NOTCH_DISTANCE + NOTCH_WIDTH)
                 } 
                 v${NOTCH_HEIGHT}
                 h-${NOTCH_WIDTH}
                 v-${NOTCH_HEIGHT}
                 h-${NOTCH_DISTANCE}
                 v${10 * (props.blocksLength ? props.blockHeightLines : 1)}
                 h${NOTCH_DISTANCE} 
                 v${NOTCH_HEIGHT}
                 h${NOTCH_WIDTH} 
                 v-${NOTCH_HEIGHT}
                 h${25 - (NOTCH_DISTANCE + NOTCH_WIDTH)}
              
                 v10 h-35 
                 v-${blockLines * 10}
                `}
      />

      {/* {currentlyHoveredBlock === -1 && <path
            stroke="yellow"
            fill="none"
            strokeWidth="1"
            d={`M${STEM_WIDTH * 10} 20 
            h${NOTCH_DISTANCE}
              v${NOTCH_HEIGHT}
              h${NOTCH_WIDTH}
              v-${NOTCH_HEIGHT}
              h${(props.defaultBlockWidthLines - STEM_WIDTH) * 10 - (NOTCH_DISTANCE + NOTCH_WIDTH)}`}
          />} */}

      {/* {currentlyHoveredArg !== null && <path
            stroke="yellow"
            fill="none"
            strokeWidth="1"
            d={`
              M${argWidthsTill[currentlyHoveredArg] * 10} 10
              v${(10 - ARG_NOTCH_BRIDGE_HEIGHT) / 2} 
                      h-${ARG_NOTCH_BRIDGE_WIDTH} 
                      v-${(ARG_NOTCH_HEIGHT - ARG_NOTCH_BRIDGE_HEIGHT)/2}
                      h-${ARG_NOTCH_WIDTH}
                      v${ARG_NOTCH_HEIGHT}
                      h${ARG_NOTCH_WIDTH}
                      v-${(ARG_NOTCH_HEIGHT - ARG_NOTCH_BRIDGE_HEIGHT)/2}
                      h${ARG_NOTCH_BRIDGE_WIDTH}
                      v${(10 - ARG_NOTCH_BRIDGE_HEIGHT)/2 - 1}`}
          />} */}
    </svg>
  );
};

export default StackClampBlockSVG;
