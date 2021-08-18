import React from 'react';
import { useSelector } from 'react-redux';
import ArgValueBlockSVG from './ArgValueBlockSVG';
import { IArgValueBlockController } from '../../../@types/Components/argValueBlock';

const ArgValueBlock: React.FC<IArgValueBlockController> = (props) => {
  const block = useSelector((state: any) => state.blocks[props.id]);
  return (
    <div className="Value Block">
      <ArgValueBlockSVG
        blockHeightLines={block.blockHeightLines}
        defaultBlockWidthLines={block.defaultBlockWidthLines}
        setBlockPathRef={props.setBlockPathRef}
        color={block.color}
      />
    </div>
  );
};

export default React.memo(ArgValueBlock);
