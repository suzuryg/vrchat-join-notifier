import * as path from "path";
import * as fs from "fs";
import { execSync } from "child_process";
import { ActivityType, MoveActivityLog, findLatestVRChatLogFullPath, parseVRChatLog } from "@kamakiri01/vrchat-activity-viewer";
import { generateFormulatedTime } from "./util/util";
import { showToast, ToastAudioType } from "./notifier/toast";
import { showXSOverlayNotification } from "./notifier/xsoverlayNotification";
import { pickXSOverlayParameter } from "./util/configPicker";

export interface AppConfig {
    interval: string;
    specificNames: string[];
    specificExec: string;
    isToast: boolean;
    isXSOverlay: boolean;
    xsoverlayVolume: string;
    xsoverlayOpacity: string;
    xsoverlayTimeout: string;
}

export interface AppParameterObject {
    interval?: string;
    specificNames?: string[];
    specificExec?: string;
    isToast?: boolean;
    isXSOverlay?: boolean;
    xsoverlayVolume?: string;
    xsoverlayOpacity?: string;
    xsoverlayTimeout?: string;
}

const defaultAppConfig: AppConfig = {
    interval: "2",
    specificNames: null!,
    specificExec: null!,
    isToast: true,
    isXSOverlay: true,
    xsoverlayVolume: "0.5",
    xsoverlayOpacity: "1.0",
    xsoverlayTimeout: "3.0"
}

export function app(param: AppParameterObject): void {
    const config = generateAppConfig(param);
    showInitNotification(config);

    const interval = param.interval ? parseInt(param.interval, 10) : 2;
    let latestJoinedUnixTime = Date.now();
    setInterval(() => {
        latestJoinedUnixTime = cronFunc(latestJoinedUnixTime, config);
    }, interval * 1000);
}

function generateAppConfig (param: AppParameterObject): AppConfig {
    const config: any = JSON.parse(JSON.stringify(defaultAppConfig));
    (Object.keys(param) as (keyof AppParameterObject)[]).forEach(key => {
        if (param[key] != null) config[key] = param[key];
    })
    return config;
}

function cronFunc(latestJoinedUnixTime: number, config: AppConfig): number {
    const filePath = findLatestVRChatLogFullPath();
    const latestLog = parseVRChatLog(
        fs.readFileSync(path.resolve(filePath), "utf8"),
        filePath);
    const newJoinLog = latestLog
        .filter(e => e.activityType === ActivityType.Join)
        .filter(e => e.date > latestJoinedUnixTime);

    if (newJoinLog.length > 0) {
        const joinUserNames = newJoinLog.map(e => (<MoveActivityLog>e).userData.userName);
        const isSpecific = isIncludeSpecificNames(joinUserNames, config.specificNames || []);
        showJoinNotification(joinUserNames, isSpecific, config);

        if (isSpecific && config.specificExec) {
            execSpecific(joinUserNames, config.specificExec);
        }

        return newJoinLog.sort((a, b) => {
            return a.date - b.date;
        }).slice(-1)[0].date;
    }
    return latestJoinedUnixTime;
}

function isIncludeSpecificNames(names: string[], specificNames: string[]): boolean {
    const lowerNames = names.map(name => name.toLowerCase());
    const matchedNames = specificNames.filter(specificName => lowerNames.find(name => name.indexOf(specificName.toLowerCase()) !== -1));
    return matchedNames.length > 0;
}

function showInitNotification(config: AppConfig): void {
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

function showJoinNotification(joinUserNames: string[], isSpecific: boolean, config: AppConfig): void {
    const message = joinUserNames.join(", ");

    const time = generateFormulatedTime();
    console.log(time + " join: " + joinUserNames);

    if (config.isToast)
        showToast(message, "join notice", isSpecific ? ToastAudioType.Reminder : ToastAudioType.Default);

    if (config.isXSOverlay)
        showXSOverlayNotification(
            message,
            "join notice",
            pickXSOverlayParameter(config));
}

function execSpecific(joinUserNames: string[], execCommand: string) {
    const stdout = execSync(execCommand.replace("%{{names}}", joinUserNames.join(" ")));
    console.log(stdout.toString());
}
