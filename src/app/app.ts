import * as path from "path";
import * as fs from "fs";
import { execSync } from "child_process";
import { ActivityType, MoveActivityLog, findLatestVRChatLogFullPath, parseVRChatLog } from "@kamakiri01/vrchat-activity-viewer";
import { generateFormulatedTime } from "./util";
import { showToast, ToastAudioType } from "./notifier/toast";
import { showXSOverlayNotification } from "./notifier/xsoverlayNotification";

export interface appParameterObject {
    interval?: string;
    specificNames?: string[];
    specificExec?: string;
    isToast?: boolean;
    isXSOverlay?: boolean;
}

const defaultParameterObject: appParameterObject = {
    interval: "2",
    specificNames: null!,
    specificExec: null!,
    isToast: true,
    isXSOverlay: true
}

export function app(param: appParameterObject) {
    param = completeParameterObject(param);
    showInitNotification(param);

    const interval = param.interval ? parseInt(param.interval, 10) : 2;
    let latestJoinedUnixTime = Date.now();
    setInterval(() => {
        latestJoinedUnixTime = cronFunc(latestJoinedUnixTime, param);
    }, interval * 1000);
}

function completeParameterObject (param: appParameterObject): appParameterObject {
    return Object.assign(JSON.parse(JSON.stringify(defaultParameterObject)), param);
}

function cronFunc(latestJoinedUnixTime: number, param: appParameterObject): number {
    const filePath = findLatestVRChatLogFullPath();
    const latestLog = parseVRChatLog(
        fs.readFileSync(path.resolve(filePath), "utf8"),
        filePath);
    const newJoinLog = latestLog
        .filter(e => e.activityType === ActivityType.Join)
        .filter(e => e.date > latestJoinedUnixTime);

    if (newJoinLog.length > 0) {
        const joinUserNames = newJoinLog.map(e => (<MoveActivityLog>e).userData.userName);
        const isSpecific = isIncludeSpecificNames(joinUserNames, param.specificNames || []);
        showJoinNotification(joinUserNames, isSpecific);

        if (isSpecific && param.specificExec) {
            execSpecific(joinUserNames, param.specificExec);
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

function showInitNotification(param: appParameterObject): void {
    console.log("notifier running...", param.specificNames ? "specificNames: " + param.specificNames.join(" ") : "");
    showToast("start.", "VRChat Join Notifier");
    showXSOverlayNotification("start." , "VRChat Join Notifier");
}

function showJoinNotification(joinUserNames: string[], isSpecific: boolean): void {
    const message = joinUserNames.join(", ");

    // cli
    const time = generateFormulatedTime();
    console.log(time + " join: " + joinUserNames);

    // toast
    showToast(message, "join notice", isSpecific ? ToastAudioType.Reminder : ToastAudioType.Default);

    // XSOverlay
    showXSOverlayNotification(message, "join notice");
}

function execSpecific(joinUserNames: string[], execCommand: string) {
    const stdout = execSync(execCommand.replace("%{{names}}", joinUserNames.join(" ")));
    console.log(stdout.toString());
}
