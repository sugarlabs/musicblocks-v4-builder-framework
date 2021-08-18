export interface IFlowClampBlockView {
    setBlockPathRef: (drag: React.RefObject<SVGPathElement>) => void;
    defaultBlockWidthLines: number;
    args?: Array<string | null>;
    blockHeightLines: number;
    blockWidthLines: number;
    argWidths?: number[];
    argsLength?: number;
    color: string;
}

export interface IFlowClampBlockController {
    setBlockPathRef: (drag: React.RefObject<SVGPathElement>) => void;
    id: string;
}
