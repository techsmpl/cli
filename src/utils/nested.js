import initialCommands from "@configuration/commands";
import { ARGS } from "@utils/args";
export const nestedRunner = (commands = initialCommands, COUNTER = 0) => {
    //HELP FUNCTION TRIGGER LISTENER
    if ((ARGS[0] === "--help" || ARGS[0] === "help") && COUNTER === 0) {
        if (commands["help"] || commands["--help"]) {
            return commands["help"].fn();
        }
    }
    //CURRENT KEY FROM ARGUMENTS
    const KEY = ARGS[COUNTER];
    //Current Depth
    COUNTER++;
    if (typeof commands[KEY] === "object"
        && commands?.[KEY]?.fn === undefined
    ) {
        //Running for nested keys in object
        return nestedRunner(commands[KEY], COUNTER);
    } else {
        if (COUNTER === ARGS.length) {
            //If command is found in object & we are in the current depth, this will run the function
            return commands[KEY]?.fn();
        } else {
            //If command is found in object & we are not in the current depth, this will not run the function
            console.log("@smpl/cli: command not found, try @smpl/cli --help");
            return;
        }
        return;
    }

}