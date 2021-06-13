import React from 'react';
import FlowBlockNoArgsSVG from "./BlockSvg/FlowBlockNoArgsSVG";

const Crumbs = React.memo((props) => {
    const [blocks, setBlocks] = React.useState([... props.schema.blocks]);
    const setBlockPosition = (blockId, newPosition) => {
        const newBlocks = blocks.map((block) => {
            if (block.id === blockId) {
                const newBlock = {...block, position: {...newPosition}}
                return newBlock;
            }
            return block;
        });
        setBlocks([...newBlocks]);
    };
    return (
        blocks.map((block, index) => {
            if (block.category === "flow" && block.args.length === 0) {
                return <FlowBlockNoArgsSVG key={index} {...block} setPosition={setBlockPosition}/>
            }
        })
    )
});

export default Crumbs;
