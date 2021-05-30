import * as path from "path";
import * as fs from "fs";
import { findLatestVRChatLogFullPath, parseVRChatLog } from "@kamakiri01/vrchat-activity-viewer";
import { updateNewJoin } from "./updater";
import { AppConfig, AppParameterObject } from "./types/AppConfig";
import { showInitNotification } from "./notifier/notifier";

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

export interface TimeList {
    latestJoined: number;
}

export function app(param: AppParameterObject): void {
    const config = generateAppConfig(param);
    const interval = parseInt(config.interval, 10)
    let timeList = initUnixTimeList();

    showInitNotification(config);
    setInterval(() => {
        timeList = cronFunc(timeList, config);
    }, interval * 1000);
}

function initUnixTimeList(): TimeList {
    return {
        latestJoined: Date.now()
    }
}

function generateAppConfig (param: AppParameterObject): AppConfig {
    const config: any = JSON.parse(JSON.stringify(defaultAppConfig));
    (Object.keys(param) as (keyof AppParameterObject)[]).forEach(key => {
        if (param[key] != null) config[key] = param[key];
    })
    return config;
}

function cronFunc(timelist: TimeList, config: AppConfig): TimeList {
    const filePath = findLatestVRChatLogFullPath();
    const latestLog = parseVRChatLog(
        fs.readFileSync(path.resolve(filePath), "utf8"), false);

    timelist.latestJoined = updateNewJoin(latestLog, timelist.latestJoined, config);
    return timelist;
}
