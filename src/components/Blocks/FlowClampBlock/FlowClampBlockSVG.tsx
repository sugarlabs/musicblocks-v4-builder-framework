import React, { useEffect, useRef } from 'react';
import { IFlowClampBlockView } from '../../../@types/Components/flowClampBlock';
import { FlowConfig, BlocksConfig, ClampConfig, ArgsConfig } from '../../../BlocksUIconfig';

const FlowClampBlockSVG: React.FC<IFlowClampBlockView> = (props) => {
  const drag: React.LegacyRef<SVGPathElement> = useRef(null);
  const { NOTCH_DISTANCE, NOTCH_HEIGHT, NOTCH_WIDTH } = FlowConfig;
  const {
    ARG_NOTCH_BRIDGE_HEIGHT,
    ARG_NOTCH_BRIDGE_WIDTH,
    ARG_PLACEHOLDER_WIDTH,
    ARG_NOTCH_HEIGHT,
    ARG_NOTCH_WIDTH,
    ARG_PADDING,
  } = ArgsConfig;
  const { STEM_WIDTH, LOWER_BRANCH } = ClampConfig;

  const blockLines = props.blockHeightLines + NOTCH_HEIGHT / 10;

  const blockWidthLines =
    props.defaultBlockWidthLines +
    (props.argsLength || 0) * ARG_PLACEHOLDER_WIDTH +
    (props.args
      ? props.args.reduce((acc, curr, index): number => {
          if (curr !== null && props.argWidths && props.argWidths[index])
            return acc + props.argWidths[index];
          return acc + ARG_PLACEHOLDER_WIDTH;
        }, 0)
      : 0);

  console.log(`Block Width Lines = ${blockWidthLines}`);

  useEffect(() => {
    if (drag.current) {
      props.setBlockPathRef(drag);
    }
  }, [props]);

  const argsSVG = () => {
    let argsHolderSvg = '';
    for (let i = 0; i < (props.argsLength || 0); i++) {
      argsHolderSvg += `
          v${(10 - ARG_NOTCH_BRIDGE_HEIGHT) / 2} 
          h-${ARG_NOTCH_BRIDGE_WIDTH} 
          v-${(ARG_NOTCH_HEIGHT - ARG_NOTCH_BRIDGE_HEIGHT) / 2}
          h-${ARG_NOTCH_WIDTH}
          v${ARG_NOTCH_HEIGHT}
          h${ARG_NOTCH_WIDTH}
          v-${(ARG_NOTCH_HEIGHT - ARG_NOTCH_BRIDGE_HEIGHT) / 2}
          h${ARG_NOTCH_BRIDGE_WIDTH}
          v${(10 - ARG_NOTCH_BRIDGE_HEIGHT) / 2 - 1} `;
      if (props.args && props.argWidths && props.args[i]) {
        argsHolderSvg += `h${props.argWidths[i] * 10} `;
      } else {
        argsHolderSvg += `h${ARG_PLACEHOLDER_WIDTH * 10} `;
      }
      argsHolderSvg += 'v-9 ';
      argsHolderSvg += `h${ARG_PADDING * 10} `;
    }
    return argsHolderSvg;
  };

  return (
    <svg
      viewBox={`0 0 ${props.blockWidthLines * 10} ${(blockLines + NOTCH_HEIGHT / 10) * 10}`}
      width={`${BlocksConfig.BLOCK_SIZE * props.blockWidthLines}px`}
      height={`${BlocksConfig.BLOCK_SIZE * (blockLines + NOTCH_HEIGHT / 10)}px`}
    >
      <path
        ref={drag}
        stroke={'black'}
        strokeWidth={'.1'}
        fill={props.color}
        style={{ pointerEvents: 'fill' }}
        d={`M0 0 
            h${NOTCH_DISTANCE} 
            v${NOTCH_HEIGHT}
            h${NOTCH_WIDTH} 
            v-${NOTCH_HEIGHT}
            h${props.defaultBlockWidthLines * 10 - (NOTCH_DISTANCE + NOTCH_WIDTH)}
            ${props.argsLength ? argsSVG() : ''}
            v10 
            h-${(props.blockWidthLines - STEM_WIDTH) * 10 - (NOTCH_DISTANCE + NOTCH_WIDTH)} 
            v${NOTCH_HEIGHT}
            h-${NOTCH_WIDTH}
            v-${NOTCH_HEIGHT}
            h-${NOTCH_DISTANCE}
            v${10 * (props.blockHeightLines - 2)}
            h${NOTCH_DISTANCE} 
            v${NOTCH_HEIGHT}
            h${NOTCH_WIDTH} 
            v-${NOTCH_HEIGHT}
            h${LOWER_BRANCH * props.defaultBlockWidthLines * 10 - (NOTCH_DISTANCE + NOTCH_WIDTH)}
            v${10 * 1}
            h-${
              LOWER_BRANCH * props.defaultBlockWidthLines * 10 +
              STEM_WIDTH * 10 -
              (NOTCH_DISTANCE + NOTCH_WIDTH)
            }
            v${NOTCH_HEIGHT}
            h-${NOTCH_WIDTH}
            v-${NOTCH_HEIGHT}
            h-${NOTCH_DISTANCE}
            v-${(blockLines + NOTCH_HEIGHT / 10) * 10}`}
      />
    </svg>
  );
};

export default FlowClampBlockSVG;
