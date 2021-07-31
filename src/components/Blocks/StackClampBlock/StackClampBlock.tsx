import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBlockPosition } from '../../../redux/store/blocksSlice';

interface Props {
    id: string
}

const StackClampBlock: React.FC<Props> = (props) => {
    const block = useSelector((state: any) => state.blocks[props.id]);
    console.log(`Stack Clamp Block ${props.id} rerendered`);
    const dispatch = useDispatch();
    return (
        <div className="StackClamp Block" style={{backgroundColor: block.color}}>
                {props.id}
                <button onClick={() => dispatch(updateBlockPosition({id: props.id}))}>Update</button>
        </div>
    );
}

export default React.memo(StackClampBlock);
