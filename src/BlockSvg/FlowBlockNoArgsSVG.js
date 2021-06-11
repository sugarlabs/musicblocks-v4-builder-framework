import React, { useState } from 'react';
import { BlocksModel } from '../model/BlocksModel/BlockSvg/BlocksModel';
import ClampBlockSVG from '../model/BlocksModel/BlockSvg/ClampBlockSVG';
import FlowBlockSVG from '../model/BlocksModel/BlockSvg/FlowBlockSVG';
import { useDrag } from 'react-dnd';

export const FlowBlockNoArgsSVG = (props) => {
    const [x, setX] = useState(props.x? props.x: 500);
    const [y, setY] = useState(props.y? props.y: 500);

    const setPosition = (x, y) => {
        setX(x);
        setY(y)
    };

    const [{isDragging}, drag] = useDrag({
        type: props.type,
        item: {
            name: "amazing item",
            type: props.type,
            setPosition: setPosition.bind(this)
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    })
    console.log(props.type);
    const mul = BlocksModel.BLOCK_MULTIPLIERS[props.type];
    const blockLines = 1 + FlowBlockSVG.NOTCH_HEIGHT/10;

    return (
        <div style={{position: "absolute", top: y, left: x}}>
        <div
            ref={drag}
            style={{
                display: "inline-block",
                width: BlocksModel.BLOCK_SIZE * props.blockWidthLines
            }}>

        <svg 
            viewBox={`0 0 ${props.blockWidthLines * 10} ${blockLines * 10}`} 
            width={`${BlocksModel.BLOCK_SIZE * props.blockWidthLines}px`} 
            height={`${BlocksModel.BLOCK_SIZE * blockLines}px`}>
            <path
                stroke={props.color}
                strokeWidth={isDragging? "0": ".1"}
                fill={isDragging? "none": props.color}
                d={`M0 0
                 h${FlowBlockSVG.NOTCH_DISTANCE}
                 v${FlowBlockSVG.NOTCH_HEIGHT}
                 h${FlowBlockSVG.NOTCH_WIDTH}
                 v-${FlowBlockSVG.NOTCH_HEIGHT}
                 h${10*props.blockWidthLines-(FlowBlockSVG.NOTCH_DISTANCE + FlowBlockSVG.NOTCH_WIDTH)} 
                 v${10 * 1}
                 h-${10*props.blockWidthLines-(FlowBlockSVG.NOTCH_DISTANCE + FlowBlockSVG.NOTCH_WIDTH)} 
                 v${FlowBlockSVG.NOTCH_HEIGHT} 
                 h-${FlowBlockSVG.NOTCH_DISTANCE}
                 v-${FlowBlockSVG.NOTCH_HEIGHT}
                 h-${FlowBlockSVG.NOTCH_DISTANCE}
                 v-${1 * 10}`} />
        </svg>

        </div>
        </div>
    )
}

FlowBlockNoArgsSVG.defaultProps = {
    blockWidthLines: 3
}