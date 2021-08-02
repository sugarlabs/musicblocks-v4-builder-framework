import React, { useEffect, useRef } from 'react';
import { FlowConfig, BlocksConfig, ClampConfig } from '../../../BlocksUIconfig';

interface Props {
    setBlockPathRef: (drag: React.RefObject<SVGPathElement>) => void
    blockHeightLines: number
    blockWidthLines: number
    color: string
}

const FlowClampBlockSVG: React.FC<Props> = (props) => {
    const drag: React.LegacyRef<SVGPathElement> = useRef(null);
    const { NOTCH_DISTANCE, NOTCH_HEIGHT, NOTCH_WIDTH } = FlowConfig;
    const { STEM_WIDTH, LOWER_BRANCH } = ClampConfig;
    const blockLines = props.blockHeightLines + NOTCH_HEIGHT / 10;
    useEffect(() => {
        if (drag.current) {
            props.setBlockPathRef(drag);
        }
    }, [props])
    return (
        <svg
          viewBox={`0 0 ${props.blockWidthLines * 10} ${(blockLines + NOTCH_HEIGHT / 10) * 10}`}
          width={`${BlocksConfig.BLOCK_SIZE * props.blockWidthLines}px`}
          height={`${BlocksConfig.BLOCK_SIZE * (blockLines + NOTCH_HEIGHT / 10)}px`}
        >
          <path
            ref={drag}
            stroke={"black"}
            strokeWidth={".1"}
            fill={props.color}
            style={{pointerEvents: "fill"}}
            d={`M0 0 
            h${NOTCH_DISTANCE} 
                  v${NOTCH_HEIGHT}
                  h${NOTCH_WIDTH} 
                  v-${NOTCH_HEIGHT}
                  h${(props.blockWidthLines * 10)-(NOTCH_DISTANCE + NOTCH_WIDTH)}
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
                  h${(LOWER_BRANCH * props.blockWidthLines * 10) - (NOTCH_DISTANCE + NOTCH_WIDTH)}
                  v${10 * (1)}
                  h-${(LOWER_BRANCH * props.blockWidthLines * 10) + (STEM_WIDTH * 10) - (NOTCH_DISTANCE + NOTCH_WIDTH)}
                  v${NOTCH_HEIGHT}
                  h-${NOTCH_WIDTH}
                  v-${NOTCH_HEIGHT}
                  h-${NOTCH_DISTANCE}
                  v-${((blockLines + NOTCH_HEIGHT / 10)) * 10}`}
          />
          {/* {currentlyHovered === -1 && <path
            stroke="yellow"
            fill="none"
            strokeWidth="1"
            d={`M${STEM_WIDTH * 10} 10 
            h${NOTCH_DISTANCE}
              v${NOTCH_HEIGHT}
              h${NOTCH_WIDTH}
              v-${NOTCH_HEIGHT}
              h${(props.blockWidthLines - STEM_WIDTH) * 10 - (NOTCH_DISTANCE + NOTCH_WIDTH)}`}
          />} */}

          {/* {props.nested && props.glow && <path 
            stroke="yellow"
            fill="none"
            strokeWidth="1"
            d={`M0 ${blockLines * 10}
              h${NOTCH_DISTANCE}
              v${NOTCH_HEIGHT}
              h${NOTCH_WIDTH}
              v-${NOTCH_HEIGHT}
              h${(LOWER_BRANCH * props.blockWidthLines * 10) + (STEM_WIDTH * 10) - (NOTCH_DISTANCE + NOTCH_WIDTH)}`}
          />} */}
        </svg>
    )
}

export default FlowClampBlockSVG;
