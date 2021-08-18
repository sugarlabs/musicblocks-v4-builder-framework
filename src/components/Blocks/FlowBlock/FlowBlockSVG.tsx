import React, { useEffect, useRef } from 'react';
import { FlowConfig, BlocksConfig } from '../../../BlocksUIconfig';
import { IFlowBlockView } from '../../../@types/Components/flowBlock';

const FlowBlockSVG: React.FC<IFlowBlockView> = (props) => {
  const drag: React.LegacyRef<SVGPathElement> = useRef(null);
  const { NOTCH_DISTANCE, NOTCH_HEIGHT, NOTCH_WIDTH } = FlowConfig;
  const blockLines = props.blockHeightLines + NOTCH_HEIGHT / 10;
  useEffect(() => {
    if (drag.current) {
      props.setBlockPathRef(drag);
    }
  }, [props]);
  return (
    <svg
      viewBox={`0 0 ${props.defaultBlockWidthLines * 10} ${blockLines * 10}`}
      width={`${BlocksConfig.BLOCK_SIZE * props.defaultBlockWidthLines}px`}
      height={`${BlocksConfig.BLOCK_SIZE * blockLines}px`}
    >
      <path
        ref={drag}
        stroke={props.color}
        strokeWidth={'.1'}
        fill={props.color}
        style={{ pointerEvents: 'fill' }}
        d={`M0 0
                 h${NOTCH_DISTANCE}
                 v${NOTCH_HEIGHT}
                 h${NOTCH_WIDTH}
                 v-${NOTCH_HEIGHT}
                 h${10 * props.defaultBlockWidthLines - (NOTCH_DISTANCE + NOTCH_WIDTH)} 
                 v${10 * 1}
                 h-${10 * props.defaultBlockWidthLines - (NOTCH_DISTANCE + NOTCH_WIDTH)} 
                 v${NOTCH_HEIGHT} 
                 h-${NOTCH_DISTANCE}
                 v-${NOTCH_HEIGHT}
                 h-${NOTCH_DISTANCE}
                 v-${1 * 10}`}
      />

      {/* {props.glow && <path
            stroke="yellow"
            fill="none"
            strokeWidth="1"
            d={`M0 10 
            h${NOTCH_DISTANCE}
              v${NOTCH_HEIGHT}
              h${NOTCH_WIDTH}
              v-${NOTCH_HEIGHT}
              h${(props.defaultBlockWidthLines) * 10 - (NOTCH_DISTANCE + NOTCH_WIDTH)}`}
          />} */}
    </svg>
  );
};

export default FlowBlockSVG;
