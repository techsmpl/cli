"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScenarioPullCreateBuildspectAndCommit = void 0;
var _child_process = require("child_process");
var _jsYaml = _interopRequireDefault(require("js-yaml"));
var _fs = _interopRequireDefault(require("fs"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _args = require("../../utils/args");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const buildSpecTemplateGenerator = data => `version: 0.2
phases:
      install:
            runtime-versions:
                  nodejs: 16.x
      pre_build:
            commands:
                  - cd "${data?.company}/${data?.scenarioId}"
                  - npm install
      build:
            commands:
                  - npm run build
artifacts:
      files:
            - "${data?.company}/${data?.scenarioId}/build/*.js"
      discard-paths: no`;
const ScenarioPullCreateBuildspectAndCommit = () => {
  if (_args.PARAMS?.["token"] === undefined) {
    console.log("Token not found");
    return;
  }
  const {
    data
  } = _jsonwebtoken.default.decode(_args.PARAMS?.["token"]?.value);
  console.log(data);
  console.log("Pulling and Commiting");
  var {
    error,
    stdout,
    stderr
  } = (0, _child_process.execSync)("git pull");
  if (error) {
    console.log(`Pull Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`Pull Error: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  const buildSpecTemplateStr = buildSpecTemplateGenerator(data);
  let buildSpecTemplate = _jsYaml.default.load(buildSpecTemplateStr, 'utf8');
  console.log("BUILDSPEC TEMPLATE", buildSpecTemplate);
  const dump = _jsYaml.default.dump(buildSpecTemplate);
  console.log(dump);
  _fs.default.writeFileSync("./current-build.json", JSON.stringify({
    company: data?.["company"],
    scenarioId: data?.["scenarioId"],
    timestamp: Date.now(),
    dateStr: new Date().toLocaleString()
  }, null, 4), 'utf8');
  try {
    _fs.default.unlinkSync("./buildspec.yml");
  } catch (error) {
    console.log("Buildspec not found");
  }
  _fs.default.writeFileSync("./buildspec.yml", dump, 'utf8');
  const commitStr = data?.["company"].toUpperCase() + data?.["company"].substring(1, data?.["company"][0].length).toLowerCase();
  console.log("Commit String", commitStr);
  var {
    error,
    stdout,
    stderr
  } = (0, _child_process.execSync)(`git add . && git commit -m '${commitStr}' && git push`);
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  return;
};
exports.ScenarioPullCreateBuildspectAndCommit = ScenarioPullCreateBuildspectAndCommit;