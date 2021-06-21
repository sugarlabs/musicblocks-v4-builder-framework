import React, { useContext } from 'react';
import FlowBlockNoArgsSVG from "./BlockSvg/FlowBlockNoArgsSVG";
import { CollisionContext } from "./Contexts/CollisionContext";

const Crumbs = React.memo((props) => {

    const { removeBlock } = useContext(CollisionContext);

    const remove = (blockId) => {
        removeBlock(props.schema.id, blockId);
    }

    return (
        props.schema.blocks.map((block, index) => {
            if (block.category === "flow" && block.args.length === 0) {
                return <FlowBlockNoArgsSVG key={index} schema={block} removeBlock={remove}/>
            }
        })
    )
});

export default Crumbs;
