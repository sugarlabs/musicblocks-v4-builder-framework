import React from 'react';
import { useSelector } from 'react-redux';
import NestedArgBlockSVG from './NestedArgBlockSVG';
import { INestedArgBlockController } from '../../../@types/Components/nestedArgBlock';

const NestedArgBlock: React.FC<INestedArgBlockController> = (props) => {
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
