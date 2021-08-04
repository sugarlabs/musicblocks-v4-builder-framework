import React, { useEffect, useRef, useState } from 'react';
import Block from '../../Types/Block';
import DropZone from '../../Types/DropZone';
import FlowBlock from '../Blocks/FlowBlock/FlowBlock';
import { useDispatch, useSelector } from 'react-redux';
import { BlocksConfig, ClampConfig } from '../../BlocksUIconfig';
import { setupDragging, dropZones, pollingTest } from '../../utils';
import FlowClampBlock from '../Blocks/FlowClampBlock/FlowClmapBlock';
import StackClampBlock from '../Blocks/StackClampBlock/StackClampBlock';
import { dragBlockGroup, connectBlockGroups, connectChild } from '../../redux/store/blocksSlice';

interface Props {
    id: string // id of first block in block group
    dragging?: boolean
    insideClamp?: boolean
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
        const dropZonesBlocks: DropZone[] = dropZones.horizontal.find((element) => {
            return element.id === block.id || element.id === `${block.id}-child`;
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

    const addChildDropZone = () => {
        const area = groupRef!.current!.getBoundingClientRect();
        const dropZone: DropZone = {
            x: area.left + ClampConfig.STEM_WIDTH * BlocksConfig.BLOCK_SIZE,
            y: area.top + (1 - 0.15) * BlocksConfig.BLOCK_SIZE,
            id: `${block.id}-child`,
            width: block.blockWidthLines / 2 * BlocksConfig.BLOCK_SIZE,
            height: 0.3 * BlocksConfig.BLOCK_SIZE,
        }
        dropZones.horizontal.push(dropZone);
    }

    useEffect(() => {
        if (props.dragging !== undefined)
            setDragging(props.dragging)
    }, [props.dragging, props.position])

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
                    const colliding: DropZone[] = dropZones.horizontal.colliding({
                        x,
                        y,
                        width: 5,
                        height: 5,
                    });
                    if (colliding.length > 0) {
                        console.log(colliding);
                        console.log(`colliding with ${colliding[0].id}`);
                        if (colliding[0].id.indexOf('-child') !== -1) {
                            dispatch(connectChild({
                                childId: block.id,
                                clampId: colliding[0].id.slice(0, colliding[0].id.indexOf('-child'))
                            }))
                        } else {
                            dispatch(connectBlockGroups(
                                {
                                    toConnectId: block.id,
                                    connectedToId: colliding[0].id
                                }
                            ))
                        }
                    } else {
                        dispatch(dragBlockGroup(
                            {
                                id: block.id,
                                position: { x, y }
                            }
                        ))
                    }
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
            if (block.type === 'StackClamp' || block.type === 'FlowClamp') {
                addChildDropZone();
            }
        }
    })

    const position = props.position ? {
        top: props.position.y,
        left: props.position.x
    } : {
        top: block.position.y,
        left: block.position.x
    }

    return (
        <div
            className='BlockGroup'
            ref={groupRef}
            style={{
                position: 'absolute',
                ...position
            }}>
            {
                (() => {
                    switch (block.type) {
                        case 'Flow':
                            return <FlowBlock setBlockPathRef={setBlockPathRef} id={block.id} />
                        case 'FlowClamp':
                            return (<>
                                <FlowClampBlock setBlockPathRef={setBlockPathRef} id={block.id} />
                                    {block.childBlockId && <BlockGroup
                                        position={{
                                            ...{
                                                x: ClampConfig.STEM_WIDTH * BlocksConfig.BLOCK_SIZE,
                                                y: 1 * BlocksConfig.BLOCK_SIZE
                                            }
                                        }}
                                        dragging={dragging}
                                        key={block.childBlockId}
                                        id={block.childBlockId} />}
                                </>)
                        case 'StackClamp':
                            return <StackClampBlock id={block.id} />
                    }
                })()
            }
            {
                block.nextBlockId !== null
                &&
                <BlockGroup
                    key={block.nextBlockId}
                    dragging={dragging}
                    id={block.nextBlockId}
                    position={{
                        ...{
                            x: 0,
                            y: block.blockHeightLines * BlocksConfig.BLOCK_SIZE
                        }
                    }} />
            }
        </div>
    );
}

export default React.memo(BlockGroup);
