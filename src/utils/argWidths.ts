import { ArgsConfig } from '../BlocksUIconfig';
import Block from '../Types/Block'

export const updateArgWidths = (state: { [id: string]: Block }, id: string, ignoredArgId?: string): { [id: string]: Block } => {
    if (state[id].type === 'Value')
        return state;
    const numArgs = state[id].argsLength as number;
    const args = state[id]?.args;
    const argWidths = state[id].argWidths;
    let blockWidth = (numArgs * ArgsConfig.ARG_PADDING) + (state[id].defaultBlockWidthLines || 0);
    if (args) {
        for (let i = 0; i < numArgs; i++) {
            if (args && args[i] === null) {
                blockWidth += ArgsConfig.ARG_PLACEHOLDER_WIDTH;
                argWidths && (argWidths[i] = ArgsConfig.ARG_PLACEHOLDER_WIDTH);
            } else if (args[i] === ignoredArgId) {
                blockWidth += ArgsConfig.ARG_PLACEHOLDER_WIDTH;
                argWidths && (argWidths[i] = ArgsConfig.ARG_PLACEHOLDER_WIDTH);
            } else {
                state = {...updateArgWidths(state, args[i] as string, ignoredArgId)};
                blockWidth += state[args[i] as string].blockWidthLines;
                argWidths && (argWidths[i] = state[args[i] as string].blockWidthLines);
            }
        }
    }
    state[id].blockWidthLines = blockWidth;
    state[id].argWidths = argWidths;
    return state;
}
