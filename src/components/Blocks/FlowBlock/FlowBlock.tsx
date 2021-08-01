import React from 'react';
import FlowBlockSVG from './FlowBlockSVG';
import { useDispatch, useSelector } from 'react-redux';
import { updateBlockPosition } from '../../../redux/store/blocksSlice';

interface Props {
    id: string
}

const FlowBlock: React.FC<Props> = (props) => {
    const block = useSelector((state: any) => state.blocks[props.id]);
    const dispatch = useDispatch();
    return (
        <div className="Flow Block">
            <FlowBlockSVG 
                blockWidthLines={block.blockWidthLines}
                blockHeightLines={block.blockHeightLines}
                color={block.color}/>
        </div>
    );
}

export default React.memo(FlowBlock);
