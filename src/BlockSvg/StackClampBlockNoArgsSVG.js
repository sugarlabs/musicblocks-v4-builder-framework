import React from 'react';
import { BlocksModel } from '../model/BlocksModel/BlockSvg/BlocksModel';
import ClampBlockSVG from '../model/BlocksModel/BlockSvg/ClampBlockSVG';
import FlowBlockSVG from '../model/BlocksModel/BlockSvg/FlowBlockSVG';
import { useDrag, useDrop } from 'react-dnd';

export const StackClampBlockNoArgsSVG = (props) => {
    const [{isDragging}, drag] = useDrag({
        type: "START",
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    })
    const [{isOver}, drop] = useDrop(
        () => ({
          accept: ["TYPE1"],
          drop: (item, monitor) => {
              console.log(item);
              item.setPosition(0.5*BlocksModel.BLOCK_SIZE + 10, 2*BlocksModel.BLOCK_SIZE + 10)
            },
          collect: (monitor) => ({
            isOver: !!monitor.isOver()
          })      
        })
    )
      
    console.log(`Is Over ${isOver}`);
    console.log(props.type);
    console.log(isDragging);
    const mul = BlocksModel.BLOCK_MULTIPLIERS[props.type];
    const blockLines = props.blockHeightLines + 3;

    console.log(drag);
    return (
        <div
            ref={drag}
            style={{
                display: "inline-block",
                position: "relative",
                width: BlocksModel.BLOCK_SIZE * props.blockWidthLines
            }}>

        <svg 
            
            viewBox={`0 0 ${props.blockWidthLines * 10} ${blockLines * 10}`} 
            width={`${BlocksModel.BLOCK_SIZE * props.blockWidthLines}px`} 
            height={`${BlocksModel.BLOCK_SIZE * blockLines}px`}>
            <path
                stroke="purple"
                strokeWidth={isDragging? "0": ".1"}
                fill={isDragging? "none": "purple"}
                d={`M0 10 h10
                 l${ClampBlockSVG.CAP_SIZE} -${ClampBlockSVG.CAP_SIZE}
                 l${ClampBlockSVG.CAP_SIZE} ${ClampBlockSVG.CAP_SIZE}
                 h${2*(5-ClampBlockSVG.CAP_SIZE)} 
                 h30 
                 v10 
                 h-${45-(FlowBlockSVG.NOTCH_DISTANCE + FlowBlockSVG.NOTCH_WIDTH)} 
                 v${FlowBlockSVG.NOTCH_HEIGHT}
                 h-${FlowBlockSVG.NOTCH_WIDTH}
                 v-${FlowBlockSVG.NOTCH_HEIGHT}
                 h-${FlowBlockSVG.NOTCH_DISTANCE}
                 v${10*props.blockHeightLines}
                 h${FlowBlockSVG.NOTCH_DISTANCE} 
                 v${FlowBlockSVG.NOTCH_HEIGHT}
                 h${FlowBlockSVG.NOTCH_WIDTH} 
                 v-${FlowBlockSVG.NOTCH_HEIGHT}
                 h${25-(FlowBlockSVG.NOTCH_DISTANCE + FlowBlockSVG.NOTCH_WIDTH)}
                 v10 h-35 
                 v-${blockLines * 10}`} />
        </svg>
        
        <div 
            ref={drop}
            style={{
                position: "absolute",
                top: 2*BlocksModel.BLOCK_SIZE,
                left: 0.5*BlocksModel.BLOCK_SIZE,
                width: 3*BlocksModel.BLOCK_SIZE,
                height: (1) * BlocksModel.BLOCK_SIZE,
                // backgroundColor: isOver? "white": "green"
            }}>
            </div>
        </div>
    )
}

StackClampBlockNoArgsSVG.defaultProps = {
    blockHeightLines: 1,
    blockWidthLines: 5
}