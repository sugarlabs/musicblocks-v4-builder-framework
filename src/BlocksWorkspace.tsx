import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StackClampBlock from './components/Blocks/StackClampBlock/StackClampBlock';
import { addBlock } from './redux/store/blocksSlice';
import Block from './Types/Block';

const BlocksWorkspace: React.FC = () => {
    const dispatch = useDispatch();
    const blocks:Block[] = useSelector((state: any) => state.blocks);
    const topLevelBlocks = Object.keys(blocks).filter((key: any) => blocks[key].parentId === null);
    console.log(blocks);
    console.log(topLevelBlocks);
    return (
        <div className="BlocksWorkspace">
            <button onClick={() => dispatch(addBlock(1))}>Add Block</button>
            <div className="Workspace">
                {topLevelBlocks.map((key: any, index) => <StackClampBlock key={index} id={blocks[key].id} />)}
            </div>
        </div>
    );
}

export default BlocksWorkspace;
