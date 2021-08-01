import React, { useEffect, useRef } from 'react';
import Block from '../../Types/Block';
import { BlocksConfig } from '../../BlocksUIconfig';
import FlowBlock from '../Blocks/FlowBlock/FlowBlock';
import { useDispatch, useSelector } from 'react-redux';
import { setupDragging, dropZones, pollingTest } from '../../utils';
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

    const block: Block = useSelector((state: any) => state.blocks[props.id]);
    
    const dispatch = useDispatch();
    const lastPollingPosition = useRef({});
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
            )),
            dragging: (x: number, y: number) => {
                if (pollingTest(lastPollingPosition, { x, y }, 50)) {
                    console.log(`Block Group ${block.id} moved by 50 pixels`);
                }
            }
        });
    }, [block.id, dispatch])

    useEffect(() => {
        if (groupRef.current) {
            const area = groupRef.current.getBoundingClientRect();
            dropZones.horizontal.push({
                x: area.left,
                y: area.top + (block.blockHeightLines - 0.5) * BlocksConfig.BLOCK_SIZE,
                id: block.id
            })
        }
        console.log(dropZones.horizontal.pretty());
    }, [block.blockHeightLines, block.id])

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
