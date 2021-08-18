export const isClamp = (type: string): boolean => {
    return type === 'StackClamp' || type === 'FlowClamp';
};

export const isArg = (type: string): boolean => {
    return type === 'ArgValue' || type === 'NestedArg';
};
