import React, { useEffect, useRef } from 'react';
import { ArgsConfig, BlocksConfig } from '../../../BlocksUIconfig';
import { IArgValueBlockView } from '../../../@types/Components/argValueBlock';

const ArgValueBlockSVG: React.FC<IArgValueBlockView> = (props) => {
  const drag: React.LegacyRef<SVGPathElement> = useRef(null);
  const { ARG_NOTCH_BRIDGE_HEIGHT, ARG_NOTCH_BRIDGE_WIDTH, ARG_NOTCH_HEIGHT, ARG_NOTCH_WIDTH } =
    ArgsConfig;
  const blockLines = props.blockHeightLines;
  useEffect(() => {
    if (drag.current) {
      props.setBlockPathRef(drag);
    }
  }, [props]);
  return (
    <svg
      viewBox={`0 0 ${
        (props.defaultBlockWidthLines + (ARG_NOTCH_BRIDGE_WIDTH + ARG_NOTCH_WIDTH)) * 10
      } ${blockLines * 10}`}
      width={`${
        BlocksConfig.BLOCK_SIZE *
        (props.defaultBlockWidthLines + (ARG_NOTCH_BRIDGE_WIDTH + ARG_NOTCH_WIDTH))
      }px`}
      height={`${BlocksConfig.BLOCK_SIZE * blockLines}px`}
    >
      <path
        ref={drag}
        stroke={props.color}
        strokeWidth={'.1'}
        fill={props.color}
        style={{ pointerEvents: 'fill' }}
        d={`M${ARG_NOTCH_BRIDGE_WIDTH + ARG_NOTCH_WIDTH} 0
                    v${(10 - ARG_NOTCH_BRIDGE_HEIGHT) / 2} 
                    h-${ARG_NOTCH_BRIDGE_WIDTH} 
                    v-${(ARG_NOTCH_HEIGHT - ARG_NOTCH_BRIDGE_HEIGHT) / 2}
                    h-${ARG_NOTCH_WIDTH}
                    v${ARG_NOTCH_HEIGHT}
                    h${ARG_NOTCH_WIDTH}
                    v-${(ARG_NOTCH_HEIGHT - ARG_NOTCH_BRIDGE_HEIGHT) / 2}
                    h${ARG_NOTCH_BRIDGE_WIDTH}
                    v${(10 - ARG_NOTCH_BRIDGE_HEIGHT) / 2}
                    h${10 * props.defaultBlockWidthLines}
                    v-${10 * blockLines}
                    h-${10 * props.defaultBlockWidthLines}`}
      />
    </svg>
  );
};

export default React.memo(ArgValueBlockSVG);
