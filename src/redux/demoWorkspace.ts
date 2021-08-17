import Block from "../Types/Block";

const demoWorkspace: Block[] = [
    {
        id: "1",
        type: 'Flow',
        position: {
            x: 100,
            y: 100
        },
        color: 'purple',
        blockWidthLines: 3,
        blockHeightLines: 1,
        defaultBlockWidthLines: 3,
        previousBlockId: null,
        nextBlockId: "4",
        topBlockId: "1",
        argsLength: 0
    },
    {
        id: "100",
        type: 'ArgValue',
        position: {
            x: 100,
            y: 700
        },
        color: 'purple',
        blockWidthLines: 2.5,
        blockHeightLines: 1,
        defaultBlockWidthLines: 2.5,
        previousBlockId: null,
        nextBlockId: null,
        topBlockId: "100",
        argsLength: 0
    },
    {
        id: "101",
        type: 'ArgValue',
        position: {
            x: 300,
            y: 700
        },
        color: 'orange',
        blockWidthLines: 2.5,
        blockHeightLines: 1,
        defaultBlockWidthLines: 2.5,
        previousBlockId: null,
        nextBlockId: null,
        topBlockId: "101",
        argsLength: 0
    },
    {
        id: "104",
        type: 'NestedArg',
        position: {
            x: 700,
            y: 500
        },
        color: 'pink',
        previousBlockId: null,
        blockHeightLines: 1,
        defaultBlockWidthLines: 2,
        blockWidthLines: 7,
        topBlockId: "104",
        argsLength: 2,
        args: [null, null],
        argWidths: [0, 0],
        nextBlockId: null
    },
    {
        id: "105",
        type: 'NestedArg',
        position: {
            x: 700,
            y: 400
        },
        color: 'black',
        previousBlockId: null,
        blockHeightLines: 1,
        defaultBlockWidthLines: 2,
        blockWidthLines: 7,
        topBlockId: "105",
        argsLength: 2,
        args: [null, null],
        argWidths: [0, 0],
        nextBlockId: null
    },
    {
        id: "106",
        type: 'NestedArg',
        position: {
            x: 700,
            y: 300
        },
        color: 'red',
        previousBlockId: null,
        blockHeightLines: 1,
        defaultBlockWidthLines: 2,
        blockWidthLines: 4.5,
        topBlockId: "106",
        argsLength: 1,
        args: [null],
        argWidths: [0],
        nextBlockId: null
    },
    {
        id: "3",
        type: 'Flow',
        position: {
            x: 300,
            y: 100
        },
        color: 'teal',
        previousBlockId: null,
        topBlockId: "3",
        blockHeightLines: 1,
        blockWidthLines: 3,
        defaultBlockWidthLines: 3,
        nextBlockId: null,
        argsLength: 0
    },
    {
        id: "4",
        type: 'Flow',
        position: {
            x: 300,
            y: 100
        },
        color: 'teal',
        previousBlockId: "1",
        blockHeightLines: 1,
        blockWidthLines: 3,
        defaultBlockWidthLines: 3,
        nextBlockId: "5",
        topBlockId: "1",
        argsLength: 0
    },
    {
        id: "5",
        type: 'Flow',
        position: {
            x: 300,
            y: 100
        },
        color: 'orange',
        previousBlockId: "4",
        blockHeightLines: 1,
        blockWidthLines: 3,
        defaultBlockWidthLines: 3,
        topBlockId: "1",
        argsLength: 0,
        nextBlockId: null
    },
    {
        id: "8",
        type: 'Flow',
        position: {
            x: 400,
            y: 150
        },
        color: 'blue',
        previousBlockId: null,
        blockHeightLines: 1,
        blockWidthLines: 3,
        defaultBlockWidthLines: 3,
        topBlockId: "8",
        argsLength: 0,
        nextBlockId: null
    },
    {
        id: "9",
        type: 'Flow',
        position: {
            x: 500,
            y: 300
        },
        color: 'yellow',
        previousBlockId: null,
        blockHeightLines: 1,
        blockWidthLines: 3,
        defaultBlockWidthLines: 3,
        topBlockId: "9",
        argsLength: 0,
        nextBlockId: null
    },
    {
        id: "10",
        type: 'Flow',
        position: {
            x: 600,
            y: 600
        },
        color: 'pink',
        previousBlockId: null,
        blockHeightLines: 1,
        blockWidthLines: 3,
        defaultBlockWidthLines: 3,
        topBlockId: "10",
        argsLength: 0,
        nextBlockId: null
    },
    {
        id: "11",
        type: 'FlowClamp',
        position: {
            x: 700,
            y: 700
        },
        color: 'pink',
        previousBlockId: null,
        blockHeightLines: 3,
        defaultBlockWidthLines: 4,
        blockWidthLines: 4,
        topBlockId: "11",
        childBlockId: null,
        defaultBlockHeightLines: 3,
        argsLength: 0,
        nextBlockId: null
    },
    {
        id: "12",
        type: 'FlowClamp',
        position: {
            x: 850,
            y: 700
        },
        color: 'brown',
        previousBlockId: null,
        blockHeightLines: 3,
        defaultBlockWidthLines: 4,
        blockWidthLines: 4,
        topBlockId: "12",
        childBlockId: null,
        defaultBlockHeightLines: 3,
        argsLength: 0,
        nextBlockId: null
    },
    {
        id: "13",
        type: 'FlowClamp',
        position: {
            x: 950,
            y: 700
        },
        color: 'grey',
        previousBlockId: null,
        blockHeightLines: 3,
        defaultBlockWidthLines: 4,
        topBlockId: "13",
        childBlockId: null,
        defaultBlockHeightLines: 3,
        blockWidthLines: 6.5,
        argsLength: 1,
        args: [null],
        argWidths: [0],
        nextBlockId: null
    },
    {
        id: "14",
        type: 'FlowClamp',
        position: {
            x: 1050,
            y: 700
        },
        color: 'teal',
        previousBlockId: null,
        blockHeightLines: 3,
        defaultBlockWidthLines: 4,
        topBlockId: "14",
        childBlockId: null,
        defaultBlockHeightLines: 3,
        blockWidthLines: 9,
        argsLength: 2,
        args: [null, null],
        argWidths: [0, 0],
        nextBlockId: null
    }
]

export const loadWorkSpace = () => {
    const workspace: {[id: string]: Block} = {};
    demoWorkspace.forEach(block => workspace[block.id] = block);
    return workspace
}
