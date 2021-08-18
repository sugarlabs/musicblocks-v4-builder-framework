import React, { useEffect, useRef, useState } from 'react';
import Block from '../../@types/Block';
import IBlockGroup from '../../@types/ComponentProps/blockGroup';
import DropZone from '../../@types/DropZone';
import FlowBlock from '../Blocks/FlowBlock/FlowBlock';
import { useDispatch, useSelector } from 'react-redux';
import { dropAreaXoffset } from '../../utils/argWidths';
import { blockGroupController } from './BlockGroupController';
import { setupDragging, dropZones, pollingTest, restorePosition, dragThresholdTest, isClamp, isArg } from '../../utils';
import { ArgsConfig, BlocksConfig, ClampConfig } from '../../BlocksUIconfig';
import FlowClampBlock from '../Blocks/FlowClampBlock/FlowClmapBlock';
import StackClampBlock from '../Blocks/StackClampBlock/StackClampBlock';
import { dragBlockGroup, connectBlockGroups, draggingParentUpdate, connectChild, connectArg } from '../../redux/store/blocksSlice';
import ValueBlock from '../Blocks/ValueBlock/ValueBlock';
import DropZoneArg from '../../@types/DropZoneArg';
import NestedArgBlock from '../Blocks/NestedArgBlock/NestedArgBlock';

const BlockGroup: React.FC<IBlockGroup> = (props) => {

    const block: Block = useSelector((state: any) => state.blocks[props.id]);

    console.log(`BlockGroup rendered ${block.id}`);

    const dispatch = useDispatch();
    const dragStartPosition = useRef({});
    const lastPollingPosition = useRef({});
    const dragThresholdBreached = useRef(false);
    const groupRef = useRef<HTMLDivElement>(null);
    let blockPathRef = useRef<SVGPathElement>(null);
    const [dragging, setDragging] = useState(!!props.dragging);

    const setBlockPathRef = (ref: React.RefObject<SVGPathElement>) => {
        blockPathRef = ref;
    }

    useEffect(() => {
        if (props.dragging !== undefined)
            setDragging(props.dragging)
    }, [props.dragging])

    const dragConfig = {
        dragStartPosition,
        restoreThreshold: 25,
        restoreEnabled: block.previousBlockId !== null
    };

    useEffect(() => {
        setupDragging(
            dragConfig,
            blockPathRef,
            groupRef,
            {
                dragStart: () => {
                    setDragging(true);
                },
                dragEnd: (x: number, y: number, storeUpdate: boolean) => {
                    setDragging(false);
                    dragThresholdBreached.current = false;
                    if (!storeUpdate) {
                        return;
                    }
                    let collidingCount = 0;
                    if (isArg(block.type)) {
                        const collidingArgZones: DropZoneArg[] = dropZones.getCollidingArgZones(x, y, 5, block.blockHeightLines * BlocksConfig.BLOCK_SIZE)
                        collidingCount = collidingArgZones.length;
                        console.log(collidingArgZones);
                        if (collidingCount > 0) {
                            dispatch(connectArg({
                                argId: block.id,
                                blockId: collidingArgZones[0].id,
                                argPos: collidingArgZones[0].index,
                            }))
                        }
                    } else {
                        const collidingFlowZones: DropZone[] = dropZones.getCollidingFlowZones(x, y, 5, 5);
                        collidingCount = collidingFlowZones.length;
                        if (collidingCount > 0) {
                            console.log(collidingFlowZones);
                            console.log(`colliding with ${collidingFlowZones[0].id}`);
                            if (collidingFlowZones[0].id.indexOf('-child') !== -1) {
                                const clampId = collidingFlowZones[0].id.slice(0, collidingFlowZones[0].id.indexOf('-child'));
                                if (block.previousBlockId === clampId) {
                                    console.log('Block Attached Back to its position');
                                    restorePosition(groupRef, dragStartPosition);
                                    return;
                                }
                                dispatch(connectChild({
                                    childId: block.id,
                                    clampId
                                }))
                            } else {
                                if (block.previousBlockId === collidingFlowZones[0].id) {
                                    console.log('Block Attached Back to its position');
                                    restorePosition(groupRef, dragStartPosition);
                                    return;
                                }
                                dispatch(connectBlockGroups(
                                    {
                                        toConnectId: block.id,
                                        connectedToId: collidingFlowZones[0].id
                                    }
                                ))
                            }
                        } 
                    }
                    if (collidingCount === 0) {
                        dispatch(dragBlockGroup(
                            {
                                id: block.id,
                                position: { x, y }
                            }
                        ))
                    }
                },
                dragging: (x: number, y: number, startPosition: { x: number, y: number }) => {
                    if (pollingTest(lastPollingPosition, { x, y }, 5)) {
                        const colliding: DropZone[] = (isArg(block.type) ? dropZones.arg : dropZones.flow).colliding({
                            x,
                            y,
                            width: 5,
                            height: isArg(block.type) ? block.blockHeightLines * BlocksConfig.BLOCK_SIZE : 5,
                        });
                        if (colliding.length > 0) {
                            console.log(colliding);
                            console.log(`colliding with ${colliding[0].id}`);
                        }
                        // console.log(colliding.length);
                        if (startPosition &&
                            !dragThresholdBreached.current &&
                            !dragThresholdTest(
                                startPosition,
                                { x, y },
                                dragConfig.restoreThreshold,
                                dragConfig.restoreEnabled)) {
                            dragThresholdBreached.current = true;
                            dispatch(draggingParentUpdate({
                                ignoreBlockId: block.id
                            }));
                        }
                    }
                }
            }
        );
    }, [block.id, dispatch])

    useEffect(() => {
        dropZones.removeFlowZones(block.id);
        dropZones.removeArgZones(block.id);
        if (!dragging) {
            blockGroupController.addDropZoneBelowBlock(groupRef, block);
            if (isClamp(block.type)) {
                blockGroupController.addChildDropZone(groupRef, block);
            }
            if (block.argsLength) {
                blockGroupController.addArgDropZone(groupRef, block);
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

    const argNotchAdjustment = (ArgsConfig.ARG_NOTCH_BRIDGE_WIDTH + ArgsConfig.ARG_NOTCH_WIDTH) / 10;
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
                        case 'ArgValue':
                            return <ValueBlock setBlockPathRef={setBlockPathRef} id={block.id} />
                        case 'NestedArg':
                            return (<>
                                <NestedArgBlock setBlockPathRef={setBlockPathRef} id={block.id} />
                                {(block.argsLength && block.args) ? block.args.map((arg, i) => arg !== null ? <BlockGroup 
                                    key={arg}
                                    id={arg}
                                    position={{x: (dropAreaXoffset(block, i)) * BlocksConfig.BLOCK_SIZE, y: 0}}
                                    /> : ''): ''}
                                </>)
                        case 'FlowClamp':
                            return (<>
                                <FlowClampBlock setBlockPathRef={setBlockPathRef} id={block.id} />
                                {(block.argsLength && block.args) ? block.args.map((arg, i) => arg !== null ? <BlockGroup 
                                    key={arg}
                                    id={arg}
                                    position={{x: (dropAreaXoffset(block, i) - argNotchAdjustment) * BlocksConfig.BLOCK_SIZE, y: 0}}
                                    /> : ''): ''}
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
