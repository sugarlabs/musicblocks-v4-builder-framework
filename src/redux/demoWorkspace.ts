import Block from "../Types/Block";

const demoWorkspace: Block[] = [
    {
        id: "1",
        type: 'StackClamp',
        position: {
            x: 100,
            y: 100
        },
        parentId: null,
        topBlockId: "1",
        argsLength: 0
    },

]

export const loadWorkSpace = () => {
    const workspace: {[id: string]: Block} = {};
    demoWorkspace.forEach(block => workspace[block.id] = block);
    return workspace
}
