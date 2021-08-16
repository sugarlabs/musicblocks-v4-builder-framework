import React, { useEffect, useRef, useState } from 'react';
import Block from '../../Types/Block';
import DropZone from '../../Types/DropZone';
import FlowBlock from '../Blocks/FlowBlock/FlowBlock';
import { useDispatch, useSelector } from 'react-redux';
import { setupDragging, dropZones, pollingTest, dragThresholdTest } from '../../utils';
import { ArgsConfig, BlocksConfig, ClampConfig } from '../../BlocksUIconfig';
import FlowClampBlock from '../Blocks/FlowClampBlock/FlowClmapBlock';
import StackClampBlock from '../Blocks/StackClampBlock/StackClampBlock';
import { dragBlockGroup, connectBlockGroups, draggingParentUpdate, connectChild, connectArg } from '../../redux/store/blocksSlice';
import ValueBlock from '../Blocks/ValueBlock/ValueBlock';
import DropZoneArg from '../../Types/DropZoneArg';
import NestedArgBlock from '../Blocks/NestedArgBlock/NestedArgBlock'

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
    const isArg = block.type === 'Value' ||
        block.type === 'ArgValue' ||
        block.type === 'NestedArg';

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

    const addDropZones = () => {
        const area = groupRef!.current!.getBoundingClientRect();
        const dropZone: DropZone = {
            x: area.left,
            y: area.top + (block.blockHeightLines - 0.15) * BlocksConfig.BLOCK_SIZE,
            id: block.id,
            width: block.defaultBlockWidthLines * BlocksConfig.BLOCK_SIZE,
            height: 0.3 * BlocksConfig.BLOCK_SIZE,
        }
        dropZones.flow.push(dropZone);
    }

    const addChildDropZone = () => {
        const area = groupRef!.current!.getBoundingClientRect();
        const dropZone: DropZone = {
            x: area.left + ClampConfig.STEM_WIDTH * BlocksConfig.BLOCK_SIZE,
            y: area.top + (1 - 0.15) * BlocksConfig.BLOCK_SIZE,
            id: `${block.id}-child`,
            width: block.defaultBlockWidthLines / 2 * BlocksConfig.BLOCK_SIZE,
            height: 0.3 * BlocksConfig.BLOCK_SIZE,
        }
        dropZones.flow.push(dropZone);
    }

    const dropAreaXoffset = (block: Block, i: number) => {
        const { defaultBlockWidthLines, args, argWidths } = block
        if (defaultBlockWidthLines && args && argWidths) {
            return ((defaultBlockWidthLines || 0)
                + (ArgsConfig.ARG_PADDING * i)
                + (args || []).slice(0, i).reduce(
                    (acc, curr, index) => {
                        if (curr === null) {
                            return acc + ArgsConfig.ARG_PLACEHOLDER_WIDTH
                        } else {
                            return acc + argWidths[index]
                        }
                    }, 0));
        }
        return 0;
    }

    const addArgDropZone = () => {
        const area = groupRef!.current!.getBoundingClientRect();
        for (let i = 0; i < (block.argsLength || 0); i++) {
            const dropZone: DropZoneArg = {
                x: area.left
                    + dropAreaXoffset(block, i)
                    * BlocksConfig.BLOCK_SIZE,
                y: area.top + (1 - 0.5) * BlocksConfig.BLOCK_SIZE,
                id: `${block.id}`,
                index: i,
                width: ArgsConfig.ARG_PLACEHOLDER_WIDTH * BlocksConfig.BLOCK_SIZE,
                height: 0.5 * BlocksConfig.BLOCK_SIZE,
            }
            dropZones.arg.push(dropZone);
        }
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
                    if (isArg) {
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
                                dispatch(connectChild({
                                    childId: block.id,
                                    clampId: collidingFlowZones[0].id.slice(0, collidingFlowZones[0].id.indexOf('-child'))
                                }))
                            } else {
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
                        const colliding: DropZone[] = (isArg ? dropZones.arg : dropZones.flow).colliding({
                            x,
                            y,
                            width: 5,
                            height: isArg ? block.blockHeightLines * BlocksConfig.BLOCK_SIZE : 5,
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
            addDropZones();
            if (block.type === 'StackClamp' || block.type === 'FlowClamp') {
                addChildDropZone();
            }
            if (block.argsLength) {
                addArgDropZone();
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
                        case 'Value':
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
