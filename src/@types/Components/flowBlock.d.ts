export interface IFlowBlockController {
    setBlockPathRef: (drag: React.RefObject<SVGPathElement>) => void;
    id: string;
}

interface IFlowBlockView {
    setBlockPathRef: (drag: React.RefObject<SVGPathElement>) => void;
    blockHeightLines: number;
    defaultBlockWidthLines: number;
    color: string;
}
