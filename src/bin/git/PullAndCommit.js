import { execSync } from "child_process";
import yaml from "js-yaml";
import fs from "fs";
import jwt from "jsonwebtoken";
import { PARAMS } from "@utils/args";
const buildSpecTemplateGenerator = (data) => `version: 0.2
phases:
      install:
            runtime-versions:
                  nodejs: 16.x
      pre_build:
            commands:
                  - cd "scenarios/${data?.company}/${data?.scenarioId}"
                  - npm install
      build:
            commands:
                  - npm run build
artifacts:
      files:
            - "scenarios/${data?.company}/${data?.scenarioId}/build/*.js"
      discard-paths: no`

export const ScenarioPullCreateBuildspectAndCommit = () => {

    if (PARAMS?.["token"] === undefined) {
        console.log("Token not found");
        return;
    }

    const { data } = jwt.decode(PARAMS?.["token"]?.value);

    console.log(data);

    console.log("Pulling and Commiting");
    var { error, stdout, stderr } = execSync("git pull");

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

    let buildSpecTemplate = yaml.load(buildSpecTemplateStr, 'utf8');

    console.log("BUILDSPEC TEMPLATE", buildSpecTemplate);

    const dump = yaml.dump(buildSpecTemplate);

    console.log(dump);

    fs.writeFileSync("./current-build.json", JSON.stringify({
        company: data?.["company"],
        scenarioId: data?.["scenarioId"],
        timestamp: Date.now(),
        dateStr: new Date().toLocaleString()
    }, null, 4), 'utf8');

    try {
        fs.unlinkSync("./buildspec.yml");
    } catch (error) {
        console.log("Buildspec not found")
    }
    fs.writeFileSync("./buildspec.yml", dump, 'utf8');

    const commitStr = data?.["company"].toUpperCase() + data?.["company"].substring(1, data?.["company"][0].length).toLowerCase();

    console.log("Commit String", commitStr)

    var { error, stdout, stderr } = execSync(`git add . && git commit -m '${commitStr}' && git push`);

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
}