import React from 'react';
import { useSelector } from 'react-redux';
import ValueBlockSVG from './ValueBlockSVG';

interface Props {
    setBlockPathRef: (drag: React.RefObject<SVGPathElement>) => void
    id: string
}

const ValueBlock: React.FC<Props> = (props) => {
    const block = useSelector((state: any) => state.blocks[props.id]);
    return (
        <div className="Value Block">
            <ValueBlockSVG 
                blockHeightLines={block.blockHeightLines}
                defaultBlockWidthLines={block.defaultBlockWidthLines}
                setBlockPathRef={props.setBlockPathRef}
                color={block.color}/>
        </div>
    )
}

export default React.memo(ValueBlock);
