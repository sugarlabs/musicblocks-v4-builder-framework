import React from 'react';
import { useSelector } from 'react-redux';
import FlowClampBlockSVG from './FlowClampBlockSVG';
import { IFlowBlockController } from '../../../@types/Components/flowBlock';

const FlowClampBlock: React.FC<IFlowBlockController> = (props) => {
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
