import React, { useEffect, useRef, useState } from 'react';
import Block from '../../Types/Block';
import DropZone from '../../Types/DropZone';
import { BlocksConfig } from '../../BlocksUIconfig';
import FlowBlock from '../Blocks/FlowBlock/FlowBlock';
import { useDispatch, useSelector } from 'react-redux';
import { dragBlockGroup } from '../../redux/store/blocksSlice';
import { setupDragging, dropZones, pollingTest } from '../../utils';
import StackClampBlock from '../Blocks/StackClampBlock/StackClampBlock';

interface Props {
    id: string // id of first block in block group
    dragging?: boolean
    position?: {
        x: number,
        y: number
    }
}

const BlockGroup: React.FC<Props> = (props) => {

    const block: Block = useSelector((state: any) => state.blocks[props.id]);

    console.log(`BlockGroup rendered ${block.id}`);

    const dispatch = useDispatch();
    const lastPollingPosition = useRef({});
    const groupRef = useRef<HTMLDivElement>(null);
    let blockPathRef = useRef<SVGPathElement>(null);
    const [dragging, setDragging] = useState(!!props.dragging);

    const setBlockPathRef = (ref: React.RefObject<SVGPathElement>) => {
        blockPathRef = ref;
    }

    const removeDropZones = () => {
        const dropZonesBlocks: DropZone[] = dropZones.horizontal.where({
            id: block.id
        });
        dropZonesBlocks.forEach((zone) => dropZones.horizontal.remove(zone));
    }

    const addDropZones = () => {
        const area = groupRef!.current!.getBoundingClientRect();
        const dropZone: DropZone = {
            x: area.left,
            y: area.top + (block.blockHeightLines - 0.15) * BlocksConfig.BLOCK_SIZE,
            id: block.id,
            width: block.blockWidthLines * BlocksConfig.BLOCK_SIZE,
            height: 0.3 * BlocksConfig.BLOCK_SIZE,
        }
        dropZones.horizontal.push(dropZone);
    }

    useEffect(() => {
        if (props.dragging !== undefined)
            setDragging(props.dragging)
    }, [props.dragging])

    useEffect(() => {
        setupDragging(
            blockPathRef,
            groupRef,
            {
                dragStart: () => {
                    setDragging(true);
                },
                dragEnd: (x: number, y: number) => {
                    setDragging(false);
                    dispatch(dragBlockGroup(
                        {
                            id: block.id,
                            position: { x, y }
                        }
                    ))
                },
                dragging: (x: number, y: number) => {
                    if (pollingTest(lastPollingPosition, { x, y }, 5)) {
                        const colliding: DropZone[] = dropZones.horizontal.colliding({
                            x,
                            y,
                            width: 5,
                            height: 5,
                        });
                        if (colliding.length > 0) {
                            console.log(colliding);
                            console.log(`colliding with ${colliding[0].id}`);
                        }
                        // console.log(colliding.length);
                    }
                }
            }
        );
    }, [block.id, dispatch])

    useEffect(() => {
        removeDropZones();
        if (!dragging) {
            addDropZones();
        }
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
                    dragging={dragging}
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
