import initialCommands from "@configuration/commands";

const commandList = [];


const nestedHelperGenerator = (parentKey = "", commands = initialCommands) => {
    if (typeof commands !== "object") return;
    for (let key in commands) {
        let parent = parentKey === "" ? "" : parentKey + " ";
        if (typeof commands[key] === "object") {
            if (commands[key]?.title && commands[key]?.description) {
                console.log(parent + key)
                commandList.push({
                    command: parent + key,
                    title: commands[key].title,
                    description: commands[key].description
                })
            }
        }
        nestedHelperGenerator(parent + key, commands[key])
    }
    return;
}

export const help = () => {
    nestedHelperGenerator()
    console.table(
        commandList
    )
}
