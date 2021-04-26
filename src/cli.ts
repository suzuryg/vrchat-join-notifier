import { program } from "commander";
import { app } from "./app";

program
    .version("0.0.1", "-v, --version", "output the current version");

program
    .description("VRChat join notifier")
    .option("-s, --specific-names <name...>", "specific notification names")
    .option("-se, --specific-exec <command>", "exec command when match specific names")
    .option("-i, --interval <sec>", "specify check interval", "2")

export async function run(argv: any): Promise<void> {
    program.parse(argv);
    console.log("notifier running...");
    app({
        interval: program["interval"],
        specificNames: program["specificNames"],
        specificExec: program["specificExec"]
    });
}
