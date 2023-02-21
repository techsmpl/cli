import * as GitHandler from "@bin/git";
import * as HelpHandler from "@bin/help";
const commands = {
    deploy: {
        scenario: {
            title: "Deploy Function",
            description: "Deploy Function",
            fn: GitHandler.ScenarioPullCreateBuildspectAndCommit
        }
    }
}

commands.help = {
    title: "Help Function",
    description: "Help Function",
    fn: HelpHandler.help
};

export default commands;