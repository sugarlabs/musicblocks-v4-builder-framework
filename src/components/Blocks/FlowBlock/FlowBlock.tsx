import React from 'react';
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
            {props.id}
            <button onClick={() => dispatch(updateBlockPosition({ id: props.id }))}>Update</button>
        </div>
    );
}

export default React.memo(FlowBlock);
