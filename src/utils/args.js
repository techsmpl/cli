import _ from "lodash";

export const filterArgs = (arg) => {
    const removeArgs = [new RegExp("node", 'g'), new RegExp("index.js", "ig"), "@smpl/cli", "npx", "@babel/node", new RegExp("cli", "ig")];
    const filterDown = removeArgs.map((removeArg, index) => {
        if (_.isRegExp(removeArg)) {
            if (removeArg.test(arg)) {
                return true;
            } else {
                return false;
            }
        } else {
            if (arg === removeArg) {
                return true;
            } else {
                return false;
            }
        }
    }).includes(true);

    if (arg.startsWith("--") && arg !== "--help") {
        return false;
    }

    const filterUp = !filterDown;

    return filterUp;
}


export const ARGS = process.argv.filter((arg, index) => {
    return filterArgs(arg);
});

export const PARAMS = _.keyBy(process.argv.filter((arg, index) => {
    return arg.startsWith("--") && arg !== "--help";
}).map((arg, index) => {
    const param = arg.replace("--", "").split("=");
    console.log({ key: param[0].trim(), value: param[1].trim() });
    return { key: param[0].trim(), value: param[1].trim() };
}), "key");