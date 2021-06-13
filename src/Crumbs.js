import React from 'react';
import FlowBlockNoArgsSVG from "./BlockSvg/FlowBlockNoArgsSVG";

const Crumbs = React.memo((props) => {

    const [blocks, setBlocks] = React.useState([... props.schema.blocks]);

    const removeBlock = (id) => {
        setBlocks(blocks.filter(block => block.id !== id));
    }

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
                return <FlowBlockNoArgsSVG key={index} schema={block} setPosition={setBlockPosition} removeBlock={removeBlock}/>
            }
        })
    )
});

export default Crumbs;
