import { ArgsConfig, BlocksConfig, ClampConfig } from '../../BlocksUIconfig';
import Block from '../../@types/Block';
import dropZones from '../../DropZones/DropZones';
import IDropZoneArg from '../../@types/dropZoneArg';
import IDropZoneFlow from '../../@types/dropZoneFlow';
import { dropAreaXoffset } from '../../utils/argWidths';

// Singleton
class BlockGroupController {
    private static instance: BlockGroupController;

    public static getInstance(): BlockGroupController {
        if (!BlockGroupController.instance) {
            BlockGroupController.instance = new BlockGroupController();
        }
        return BlockGroupController.instance;
    }

    // add dropzones to attach other block below a block - applicable for Flow and Flow Clamp
    addDropZoneBelowBlock(groupRef: React.RefObject<HTMLDivElement>, block: Block) {
        const area = groupRef!.current!.getBoundingClientRect();
        const dropZone: IDropZoneFlow = {
            x: area.left,
            y: area.top + (block.blockHeightLines - 0.15) * BlocksConfig.BLOCK_SIZE,
            id: block.id,
            width: block.defaultBlockWidthLines * BlocksConfig.BLOCK_SIZE,
            height: 0.3 * BlocksConfig.BLOCK_SIZE,
        };
        dropZones.flow.push(dropZone);
    }

    // adds drop zone for child - Applicable for Clamp Blocks
    addChildDropZone(groupRef: React.RefObject<HTMLDivElement>, block: Block) {
        const area = groupRef!.current!.getBoundingClientRect();
        const dropZone: IDropZoneFlow = {
            x: area.left + ClampConfig.STEM_WIDTH * BlocksConfig.BLOCK_SIZE,
            y: area.top + (1 - 0.15) * BlocksConfig.BLOCK_SIZE,
            id: `${block.id}-child`,
            width: (block.defaultBlockWidthLines / 2) * BlocksConfig.BLOCK_SIZE,
            height: 0.3 * BlocksConfig.BLOCK_SIZE,
        };
        dropZones.flow.push(dropZone);
    }

    // adds drop zones for args - applicable for blocks that take in args - NestedArgBlock, FlowClampBlock and StackClampBlock
    addArgDropZone(groupRef: React.RefObject<HTMLDivElement>, block: Block) {
        const area = groupRef!.current!.getBoundingClientRect();
        for (let i = 0; i < (block.argsLength || 0); i++) {
            const dropZone: IDropZoneArg = {
                x: area.left + dropAreaXoffset(block, i) * BlocksConfig.BLOCK_SIZE,
                y: area.top + (1 - 0.5) * BlocksConfig.BLOCK_SIZE,
                id: `${block.id}`,
                index: i,
                width: ArgsConfig.ARG_PLACEHOLDER_WIDTH * BlocksConfig.BLOCK_SIZE,
                height: 0.5 * BlocksConfig.BLOCK_SIZE,
            };
            dropZones.arg.push(dropZone);
        }
    }
}

export default BlockGroupController.getInstance();
