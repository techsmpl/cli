"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nestedRunner = void 0;
var _commands = _interopRequireDefault(require("../configuration/commands"));
var _args = require("./args");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const nestedRunner = (commands = _commands.default, COUNTER = 0) => {
  //HELP FUNCTION TRIGGER LISTENER
  if ((_args.ARGS[0] === "--help" || _args.ARGS[0] === "help") && COUNTER === 0) {
    if (commands["help"] || commands["--help"]) {
      return commands["help"].fn();
    }
  }
  //CURRENT KEY FROM ARGUMENTS
  const KEY = _args.ARGS[COUNTER];
  //Current Depth
  COUNTER++;
  if (typeof commands[KEY] === "object" && commands?.[KEY]?.fn === undefined) {
    //Running for nested keys in object
    return nestedRunner(commands[KEY], COUNTER);
  } else {
    if (COUNTER === _args.ARGS.length) {
      //If command is found in object & we are in the current depth, this will run the function
      return commands[KEY]?.fn();
    } else {
      //If command is found in object & we are not in the current depth, this will not run the function
      console.log("@smpl/cli: command not found, try @smpl/cli --help");
      return;
    }
    return;
  }
};
exports.nestedRunner = nestedRunner;