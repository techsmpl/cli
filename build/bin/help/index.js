"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.help = void 0;
var _commands = _interopRequireDefault(require("../../configuration/commands"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const commandList = [];
const nestedHelperGenerator = (parentKey = "", commands = _commands.default) => {
  if (typeof commands !== "object") return;
  for (let key in commands) {
    let parent = parentKey === "" ? "" : parentKey + " ";
    if (typeof commands[key] === "object") {
      if (commands[key]?.title && commands[key]?.description) {
        console.log(parent + key);
        commandList.push({
          command: parent + key,
          title: commands[key].title,
          description: commands[key].description
        });
      }
    }
    nestedHelperGenerator(parent + key, commands[key]);
  }
  return;
};
const help = () => {
  nestedHelperGenerator();
  console.table(commandList);
};
exports.help = help;