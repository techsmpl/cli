"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _commands = _interopRequireDefault(require("../configuration/commands.js"));
var _args = require("../utils/args");
var _nested = require("../utils/nested");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const runnerFunction = () => {
  //console.log("ARGS:::", ARGS)
  (0, _nested.nestedRunner)();
  //console.log(commands);
};
var _default = runnerFunction;
exports.default = _default;