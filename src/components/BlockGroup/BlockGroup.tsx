import React, { useEffect, useRef } from 'react';
import Block from '../../Types/Block';
import { setupDragging } from '../../utils';
import { BlocksConfig } from '../../BlocksUIconfig';
import FlowBlock from '../Blocks/FlowBlock/FlowBlock';
import { useDispatch, useSelector } from 'react-redux';
import { dragBlockGroup } from '../../redux/store/blocksSlice';
import StackClampBlock from '../Blocks/StackClampBlock/StackClampBlock';

interface Props {
    id: string // only needs id of first block in the block group
    position?: {
        x: number,
        y: number
    }
}

const BlockGroup: React.FC<Props> = (props) => {
    const dispatch = useDispatch();
    const block: Block = useSelector((state: any) => state.blocks[props.id]);
    const groupRef = useRef<HTMLDivElement>(null);
    let blockPathRef = useRef<SVGPathElement>(null);

    const setBlockPathRef = (ref: React.RefObject<SVGPathElement>) => {
        blockPathRef = ref;
    }

    useEffect(() => {
        setupDragging(
            blockPathRef,
            groupRef, {
            dragEnd: (x: number, y: number) => dispatch(dragBlockGroup(
                {
                    id: block.id,
                    position: { x, y }
                }
            ))
        });
    })
    
    return (
        <div
            className='BlockGroup'
            ref={groupRef}
            style={{
                position: 'absolute',
                top: props?.position?.y === undefined ? block.position.y : props.position.y,
                left: props?.position?.x === undefined ? block.position.x : props.position.x
            }}>
            {
                (() => {
                    switch (block.type) {
                        case 'Flow':
                            return <FlowBlock setBlockPathRef={setBlockPathRef} id={block.id} />
                        case 'StackClamp':
                            return <StackClampBlock id={block.id} />
                    }
                })()
            }
            {
                block.nextBlockId
                &&
                <BlockGroup
                    id={block.nextBlockId}
                    position={
                        {
                            x: 0,
                            y: block.blockHeightLines * BlocksConfig.BLOCK_SIZE
                        }
                    } />
            }
        </div>
    );
}

export default React.memo(BlockGroup);
