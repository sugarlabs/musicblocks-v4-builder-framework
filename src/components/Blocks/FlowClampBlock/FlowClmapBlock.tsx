import React, { ReactElement } from 'react';
import FlowClampBlockSVG from './FlowClampBlockSVG';
import { useSelector } from 'react-redux';

interface Props {
  setBlockPathRef: (drag: React.RefObject<SVGPathElement>) => void;
  id: string;
}

const FlowClampBlock: React.FC<Props> = (props) => {
  const block = useSelector((state: any) => state.blocks[props.id]);
  console.log(`Flow Clamp Block ${props.id} rerendered`);
  return (
    <div className="FlowClamp Block">
      <FlowClampBlockSVG
        defaultBlockWidthLines={block.defaultBlockWidthLines}
        blockHeightLines={block.blockHeightLines}
        blockWidthLines={block.blockWidthLines}
        setBlockPathRef={props.setBlockPathRef}
        argsLength={block.argsLength}
        argWidths={block.argWidths}
        args={block.args}
        color={block.color}
      />
    </div>
  );
};

export default React.memo(FlowClampBlock);
