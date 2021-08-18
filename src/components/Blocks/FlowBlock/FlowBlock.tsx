import React from 'react';
import FlowBlockSVG from './FlowBlockSVG';
import { useSelector } from 'react-redux';
import { IFlowBlockController } from '../../../@types/Components/flowBlock';

const FlowBlock: React.FC<IFlowBlockController> = (props) => {
  const block = useSelector((state: any) => state.blocks[props.id]);
  return (
    <div className="FlowClamp Block">
      <FlowBlockSVG
        blockHeightLines={block.blockHeightLines}
        defaultBlockWidthLines={block.defaultBlockWidthLines}
        setBlockPathRef={props.setBlockPathRef}
        color={block.color}
      />
    </div>
  );
};

export default React.memo(FlowBlock);
