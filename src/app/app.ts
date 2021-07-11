import * as path from "path";
import * as fs from "fs";
import { findLatestVRChatLogFullPath, parseVRChatLog } from "@kamakiri01/vrchat-activity-viewer";
import { AppConfig, AppParameterObject } from "./types/AppConfig";
import { checkNewJoin, checkNewLeave, findNewEnter } from "./updater";
import { comsumeNewJoin, consumeNewLeave } from "./consumer";
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

export interface AppContext {
    config: AppConfig;
    latestCheckTime: number;
    currentUserNames: string[];
    newJoinedUserNames: string[];
    newLeftUserNames: string[];
}

export function app(param: AppParameterObject): void {
    const config = generateAppConfig(param);
    const interval = parseInt(config.interval, 10)
    const context = initContext(config);

    showInitNotification(config);
    setInterval(() => {
        cronFunc(context);
    }, interval * 1000);
}

function initContext(config: AppConfig): AppContext {
    return {
        config,
        latestCheckTime: Date.now(),
        currentUserNames: [],
        newJoinedUserNames: [],
        newLeftUserNames: []
    }
}

function generateAppConfig (param: AppParameterObject): AppConfig {
    const config: any = JSON.parse(JSON.stringify(defaultAppConfig));
    (Object.keys(param) as (keyof AppParameterObject)[]).forEach(key => {
        if (param[key] != null) config[key] = param[key];
    })
    return config;
}

function cronFunc(context: AppContext): void {
    const filePath = findLatestVRChatLogFullPath();
    const latestLog = parseVRChatLog(
        fs.readFileSync(path.resolve(filePath), "utf8"), false);

    if (findNewEnter(latestLog, context)) context.currentUserNames = [];

    checkNewJoin(latestLog, context);
    checkNewLeave(latestLog, context);
    context.latestCheckTime = Date.now();

    comsumeNewJoin(context);
    consumeNewLeave(context);
}
