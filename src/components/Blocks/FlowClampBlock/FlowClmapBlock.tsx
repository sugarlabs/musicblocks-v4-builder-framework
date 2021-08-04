import React, { ReactElement } from 'react';
import FlowClampBlockSVG from './FlowClampBlockSVG';
import { useSelector } from 'react-redux';

interface Props {
    setBlockPathRef: (drag: React.RefObject<SVGPathElement>) => void
    id: string
}

const FlowClampBlock: React.FC<Props> = (props) => {
    const block = useSelector((state: any) => state.blocks[props.id]);
    console.log(`Flow Clamp Block ${props.id} rerendered`);
    return (
        <div className="FlowClamp Block">
            <FlowClampBlockSVG 
                blockHeightLines={block.blockHeightLines}
                blockWidthLines={block.blockWidthLines}
                setBlockPathRef={props.setBlockPathRef}
                color={block.color}/>
        </div>
    );
}

export default React.memo(FlowClampBlock);
