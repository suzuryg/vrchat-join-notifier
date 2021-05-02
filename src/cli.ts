import { program } from "commander";
import { app } from "./app";

program
    .version("0.0.1", "-v, --version", "output the current version");

program
    .description("VRChat join notifier")
    .option("-s, --specific-names <name...>", "specific notification names(with another notification sound)")
    .option("-se, --specific-exec <command>", "exec command when match specific names. Replace %{{names}} in command text with join user names")
    .option("-i, --interval <sec>", "specify check interval", "2")

export async function run(argv: any): Promise<void> {
    program.parse(argv);
    console.log("notifier running...", program["specificExec"]);
    app({
        interval: program["interval"],
        specificNames: program["specificNames"],
        specificExec: program["specificExec"]
    });
}
