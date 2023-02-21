import commands from "@configuration/commands.js";
import { ARGS } from "@utils/args";
import { nestedRunner } from "@utils/nested";

const runnerFunction = () => {
    //console.log("ARGS:::", ARGS)
    nestedRunner();
    //console.log(commands);
}

export default runnerFunction;