import React, { useContext } from 'react';
import FlowBlockNoArgsSVG from "./BlockSvg/FlowBlockNoArgsSVG";
import { CollisionContext } from "./Contexts/CollisionContext";
import FlowClampBlockNoArgs from "./BlockSvg/FlowClampBlockNoArgsSVG";
import ValueBlockSVG from './BlockSvg/ValueBlockSVG';

const Crumbs = React.memo((props) => {

    const { removeBlock } = useContext(CollisionContext);

    const remove = (workspace, blockId) => {
        return removeBlock(workspace, props.schema.id, blockId);
    }

    return (
        props.schema.blocks.map((block, index) => {
            if (block.category === "flow" && block.args.length === 0) {
                return <FlowBlockNoArgsSVG key={block.id} schema={block} removeBlock={remove}/>
            } else if (block.category === "flowClamp" && block.args.length === 0) {
                return <FlowClampBlockNoArgs key={block.id} schema={block} removeBlock={remove}/>
            } else if (block.category === "value") {
                return <ValueBlockSVG key={block.id} schema={block} />
            }
        })
    )
});

export default Crumbs;
