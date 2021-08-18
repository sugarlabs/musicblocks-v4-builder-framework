import React from 'react';
import { useSelector } from 'react-redux';
import NestedArgBlockSVG from './NestedArgBlockSVG';

interface Props {
  setBlockPathRef: (drag: React.RefObject<SVGPathElement>) => void;
  id: string;
}

const NestedArgBlock: React.FC<Props> = (props) => {
  const block = useSelector((state: any) => state.blocks[props.id]);
  return (
    <div className="NestedArg Block">
      <NestedArgBlockSVG
        defaultBlockWidthLines={block.defaultBlockWidthLines}
        blockHeightLines={block.blockHeightLines}
        blockWidthLines={block.blockWidthLines}
        setBlockPathRef={props.setBlockPathRef}
        argWidths={block.argWidths}
        argsLength={block.argsLength}
        args={block.args}
        color={block.color}
      />
    </div>
  );
};

export default React.memo(NestedArgBlock);
