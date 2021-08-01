import React from 'react';
import Block from './Types/Block';
import { useSelector } from 'react-redux';
import BlockGroup from './components/BlockGroup/BlockGroup';

const BlocksWorkspace: React.FC = () => {
    const blocks:Block[] = useSelector((state: any) => state.blocks);
    const topLevelBlocks = Object.keys(blocks).filter((key: any) => blocks[key].previousBlockId === null);
    return (
        <div className="BlocksWorkspace">
            <div className="Workspace">
                {topLevelBlocks.map((key: any, index) => {
                  return <BlockGroup key={index} id={blocks[key].id} />})}
            </div>
        </div>
    );
}

export default BlocksWorkspace;
