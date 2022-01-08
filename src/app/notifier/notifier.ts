import { AppConfig } from "../types/AppConfig";
import { pickXSOverlayParameter } from "../util/configPicker";
import { generateFormulatedTime } from "../util/util";
import { showToast, ToastAudioType } from "./toast";
import { showXSOverlayNotification } from "./xsoverlayNotification";

export function showNotification(label: string, userNames: string[], isSpecific: boolean, config: AppConfig): void {
    const message = userNames.join(", ");

    const time = generateFormulatedTime();
    console.log(time + " " + label + ": " + userNames);

    const fs = require("fs");
    fs.appendFile(config.logFile, time + " " + label + ": " + userNames + "\n", (err:any) => { if (err) throw err;});

    if (config.isToast)
        showToast(message, label, isSpecific ? ToastAudioType.Reminder : ToastAudioType.Default);

    if (config.isXSOverlay)
        showXSOverlayNotification(
            message,
            label,
            pickXSOverlayParameter(config));
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
