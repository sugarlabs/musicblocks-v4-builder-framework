export interface IArgValueBlockController {
    setBlockPathRef: (drag: React.RefObject<SVGPathElement>) => void;
    id: string;
}

export interface IArgValueBlockView {
    setBlockPathRef: (drag: React.RefObject<SVGPathElement>) => void;
    defaultBlockWidthLines: number;
    blockHeightLines: number;
    color: string;
}
