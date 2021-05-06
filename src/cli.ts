import * as fs from "fs";
import * as path from "path";
import { program } from "commander";
import { app } from "./app/app";
import { readConfigFile } from "./app/util/util";

const version = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "package.json"), "utf8")).version;

program
    .version(version, "-v, --version", "output the current version");

program
    .description("VRChat join notifier")
    .option("-c, --config <filePath>", "specific config file path(you can overwrite from cli. Exclusive other options)")
    .option("-s, --specific-names <name...>", "specific notification names(with another notification sound)")
    .option("-se, --specific-exec <command>", "exec command when match specific names. Replace %{{names}} in command text with join user names")
    .option("-i, --interval <sec>", "specify check interval")
    .option("-nt, --no-toast", "prevent toast notification")
    .option("-nx, --no-xsoverlay", "prevent XSOverlay notification")
    .option("-xv, --xsoverlay-volume <volume>", "XSOverlay notification volume (0~1)")
    .option("-xo, --xsoverlay-opacity <opacity>", "XSOverlay notification opacity (0~1)")
    .option("-xt, --xsoverlay-timeout <sec>", "XSOverlay notification disappear time (sec)")

export async function run(argv: any): Promise<void> {
    program.parse(argv);

    let config: any = {};
    if (program["config"]) {
        config = readConfigFile(path.resolve(program["config"]));
    } else {
        config.interval =         program["interval"];
        config.specificNames =    program["specificNames"];
        config.specificExec =     program["specificExec"];
        config.isToast =          program["toast"];
        config.isXSOverlay =      program["xsoverlay"];
        config.xsoverlayVolume =  program["xsoverlayVolume"];
        config.xsoverlayOpacity = program["xsoverlayOpacity"];
        config.xsoverlayTimeout = program["xsoverlayTimeout"];
    }

    app(config);
}
