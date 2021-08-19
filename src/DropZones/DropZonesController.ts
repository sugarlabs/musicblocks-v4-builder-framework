import Block from '../@types/Block';
import IDropZones from '../@types/dropZones';
import IDropZoneArg from '../@types/dropZoneArg';
import IDropZoneFlow from '../@types/dropZoneFlow';
import { dropAreaXoffset } from '../utils/argWidths';

class DropZonesController {
    private static instance: DropZonesController;

    public static getInstance(): DropZonesController {
        if (!DropZonesController.instance) {
            DropZonesController.instance = new DropZonesController();
        }
        return DropZonesController.instance;
    }

    // add dropzones to attach other block below a block - applicable for Flow and Flow Clamp
    addDropZoneBelowBlock(
        groupRef: React.RefObject<HTMLDivElement>,
        block: Block,
        dropZones: IDropZones,
        UIConfig: {
            BLOCK_SIZE: number;
        },
    ) {
        const area = groupRef!.current!.getBoundingClientRect();
        const dropZone: IDropZoneFlow = {
            x: area.left,
            y: area.top + (block.blockHeightLines - 0.15) * UIConfig.BLOCK_SIZE,
            id: block.id,
            width: block.defaultBlockWidthLines * UIConfig.BLOCK_SIZE,
            height: 0.3 * UIConfig.BLOCK_SIZE,
        };
        dropZones.flow.push(dropZone);
    }

    // adds drop zone for child - Applicable for Clamp Blocks
    addChildDropZone(
        groupRef: React.RefObject<HTMLDivElement>,
        block: Block,
        dropZones: IDropZones,
        UIConfig: {
            BLOCK_SIZE: number;
            STEM_WIDTH: number;
        },
    ) {
        const area = groupRef!.current!.getBoundingClientRect();
        const dropZone: IDropZoneFlow = {
            x: area.left + UIConfig.STEM_WIDTH * UIConfig.BLOCK_SIZE,
            y: area.top + (1 - 0.15) * UIConfig.BLOCK_SIZE,
            id: `${block.id}-child`,
            width: (block.defaultBlockWidthLines / 2) * UIConfig.BLOCK_SIZE,
            height: 0.3 * UIConfig.BLOCK_SIZE,
        };
        dropZones.flow.push(dropZone);
    }

    // adds drop zones for args - applicable for blocks that take in args - NestedArgBlock, FlowClampBlock and StackClampBlock
    addArgDropZone(
        groupRef: React.RefObject<HTMLDivElement>,
        block: Block,
        dropZones: IDropZones,
        UIConfig: {
            BLOCK_SIZE: number;
            ARG_PLACEHOLDER_WIDTH: number;
        },
    ) {
        const area = groupRef!.current!.getBoundingClientRect();
        for (let i = 0; i < (block.argsLength || 0); i++) {
            const dropZone: IDropZoneArg = {
                x: area.left + dropAreaXoffset(block, i) * UIConfig.BLOCK_SIZE,
                y: area.top + (1 - 0.5) * UIConfig.BLOCK_SIZE,
                id: `${block.id}`,
                index: i,
                width: UIConfig.ARG_PLACEHOLDER_WIDTH * UIConfig.BLOCK_SIZE,
                height: 0.5 * UIConfig.BLOCK_SIZE,
            };
            dropZones.arg.push(dropZone);
        }
    }
}

export default DropZonesController.getInstance();
