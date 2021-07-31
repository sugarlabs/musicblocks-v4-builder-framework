import React from 'react';
import Block from '../../Types/Block';
import { useSelector } from 'react-redux';
import FlowBlock from '../Blocks/FlowBlock/FlowBlock';
import StackClampBlock from '../Blocks/StackClampBlock/StackClampBlock';

interface Props {
    id: string // only needs id of first block in the block group
    position?: {
        x: number,
        y: number
    }
}

const BlockGroup: React.FC<Props> = (props) => {
    const block: Block = useSelector((state: any) => state.blocks[props.id]);
    console.log(`${props.id} - ${props?.position?.x}`);
    return (
        <div
            className='BlockGroup'
            style={{
                top: props?.position?.y === undefined? block.position.y: props.position.y,
                left: props?.position?.x === undefined? block.position.x: props.position.x
            }}>
            {
                (() => {
                    switch (block.type) {
                        case 'Flow':
                            return <FlowBlock id={block.id} />
                        case 'StackClamp':
                            return <StackClampBlock id={block.id} />
                    }
                })()
            }
            {
                (block.nextBlockId) && <BlockGroup id={block.nextBlockId} position={{x: 0, y: block.blockHeightLines * 100}}/>
            }
        </div>
    );
}

export default React.memo(BlockGroup);
