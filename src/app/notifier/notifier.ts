import { AppConfig } from "../types/AppConfig";
import { pickXSOverlayParameter } from "../util/configPicker";
import { generateFormulatedTime } from "../util/util";
import { showToast, ToastAudioType } from "./toast";
import { showXSOverlayNotification } from "./xsoverlayNotification";

export function showNotification(label: string, userNames: string[], isSpecific: boolean, config: AppConfig): void {
    const message = userNames.join(", ");

    const time = generateFormulatedTime();
    console.log(time + " " + label + ": " + userNames);

    if (config.isToast)
        showToast(message, label, isSpecific ? ToastAudioType.Reminder : ToastAudioType.Default);

    if (config.isXSOverlay)
        showXSOverlayNotification(
            message,
            label,
            pickXSOverlayParameter(config));

    const fs = require("fs");
    const readline = require("readline");
    if (!fs.existsSync(config.logFile)){
        fs.writeFileSync(config.logFile, "", (err:any) => { if (err) throw err;});
    }
    const rs = fs.createReadStream(config.logFile);
    const rl = readline.createInterface({
        input: rs
    });
    let log = time + " " + label + ": " + userNames + "\n";
    let archive = "";
    let cnt: number = 1;
    rl.on("line", (lineString:string) => {
        if (cnt < config.logLength){
            log += lineString + "\n";
            cnt++;
        }
        else{
            archive += lineString + "\n";
        }
    });
    rl.on("close", () => {
        fs.writeFile(config.logFile, log, (err:any) => { if (err) throw err;});
        fs.appendFile(config.archiveFile, archive, (err:any) => { if (err) throw err;});
    });
}

export function showInitNotification(config: AppConfig): void {
    const message = "running";
    const title = "VRChat Join Notifier";
    console.log("notifier running", config.specificNames ? "specificNames: " + config.specificNames.join(" ") : "");

    if (config.isToast)
        showToast(message, title);

    if (config.isXSOverlay)
        showXSOverlayNotification(
            message,
            title,
            pickXSOverlayParameter(config));
}
