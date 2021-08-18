export interface INestedArgBlockController {
    setBlockPathRef: (drag: React.RefObject<SVGPathElement>) => void;
    id: string;
}

export interface INestedArgBlockView {
    setBlockPathRef: (drag: React.RefObject<SVGPathElement>) => void;
    defaultBlockWidthLines: number;
    blockHeightLines: number;
    blockWidthLines: number;
    argWidths: number[];
    argsLength: number;
    args: string[];
    color: string;
}
