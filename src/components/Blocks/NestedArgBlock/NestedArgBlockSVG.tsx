import React, { useEffect, useRef } from 'react';
import { ArgsConfig, BlocksConfig } from '../../../BlocksUIconfig';

interface Props {
  setBlockPathRef: (drag: React.RefObject<SVGPathElement>) => void;
  defaultBlockWidthLines: number;
  blockHeightLines: number;
  blockWidthLines: number;
  argWidths: number[];
  argsLength: number;
  args: string[];
  color: string;
}

const NestedArgBlockSVG: React.FC<Props> = (props) => {
  const drag: React.LegacyRef<SVGPathElement> = useRef(null);
  const {
    ARG_NOTCH_BRIDGE_HEIGHT,
    ARG_NOTCH_BRIDGE_WIDTH,
    ARG_PLACEHOLDER_WIDTH,
    ARG_NOTCH_HEIGHT,
    ARG_PADDING,
    ARG_NOTCH_WIDTH,
  } = ArgsConfig;

  const blockLines = props.blockHeightLines;

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

  useEffect(() => {
    if (drag.current) {
      props.setBlockPathRef(drag);
    }
  }, [props]);
  return (
    <svg
      viewBox={`0 0 ${(props.blockWidthLines + (ARG_NOTCH_BRIDGE_WIDTH + ARG_NOTCH_WIDTH)) * 10} ${
        blockLines * 10
      }`}
      width={`${
        BlocksConfig.BLOCK_SIZE *
        (props.blockWidthLines + (ARG_NOTCH_BRIDGE_WIDTH + ARG_NOTCH_WIDTH))
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
                    h${props.defaultBlockWidthLines * 10}
                    ${props.argsLength ? argsSVG() : ''}
                    v10
                    h-${props.blockWidthLines * 10}
                    v-${(10 - ARG_NOTCH_BRIDGE_HEIGHT) / 2} 
                    h-${ARG_NOTCH_BRIDGE_WIDTH} 
                    v+${(ARG_NOTCH_HEIGHT - ARG_NOTCH_BRIDGE_HEIGHT) / 2}
                    h-${ARG_NOTCH_WIDTH}
                    v-${ARG_NOTCH_HEIGHT}
                    h${ARG_NOTCH_WIDTH}
                    v+${(ARG_NOTCH_HEIGHT - ARG_NOTCH_BRIDGE_HEIGHT) / 2}
                    h${ARG_NOTCH_BRIDGE_WIDTH}
                    v-${(10 - ARG_NOTCH_BRIDGE_HEIGHT) / 2}`}
      />
    </svg>
  );
};

export default React.memo(NestedArgBlockSVG);
