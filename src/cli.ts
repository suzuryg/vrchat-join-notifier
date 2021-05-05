import * as fs from "fs";
import * as path from "path";
import { program } from "commander";
import { app } from "./app/app";

const version = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "package.json"), "utf8")).version;

program
    .version(version, "-v, --version", "output the current version");

program
    .description("VRChat join notifier")
    .option("-s, --specific-names <name...>", "specific notification names(with another notification sound)")
    .option("-se, --specific-exec <command>", "exec command when match specific names. Replace %{{names}} in command text with join user names")
    .option("-i, --interval <sec>", "specify check interval", "2")
    .option("-nt, --no-toast", "prevent toast notification")
    .option("-nx, --no-xsoverlay", "prevent xsoverlay notification")

export async function run(argv: any): Promise<void> {
    program.parse(argv);

    app({
        interval: program["interval"],
        specificNames: program["specificNames"],
        specificExec: program["specificExec"],
        isToast: program["toast"],
        isXSOverlay: program["xsoverlay"]
    });
}
