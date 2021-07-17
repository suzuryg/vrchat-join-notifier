import * as path from "path";
import * as fs from "fs";
import { findLatestVRChatLogFullPath, parseVRChatLog, ActivityLog } from "vrchat-activity-viewer";
import { AppConfig, AppParameterObject } from "./types/AppConfig";
import { checkNewJoin, checkNewLeave, readUserName } from "./updater";
import { comsumeNewJoin, consumeNewLeave } from "./consumer";
import { showInitNotification } from "./notifier/notifier";

const defaultAppConfig: AppConfig = {
    interval: "2",
    notificationTypes: ["join"],
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
    userName: string | undefined; // ツールを利用するユーザ名。ログから見つからない場合、 undefined
    latestCheckTime: number;
    newJoinUserNames: string[];
    newLeaveUserNames: string[];
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
        userName: undefined,
        latestCheckTime: Date.now(),
        newJoinUserNames: [],
        newLeaveUserNames: []
    }
}

function generateAppConfig(param: AppParameterObject): AppConfig {
    const config: any = JSON.parse(JSON.stringify(defaultAppConfig));
    (Object.keys(param) as (keyof AppParameterObject)[]).forEach(key => {
        if (param[key] != null) config[key] = param[key];
    })
    // TODO: notificationTypes が増えたら type を切る
    if (config.notificationTypes.filter((e: string) => {return e !== "join" && e !== "leave";}).length > 0)
        console.log("unknown config [notificationTypes] found, " + config.notificationTypes);
    return config;
}

function cronFunc(context: AppContext): void {
    const latestLog = getLatestLog();
    if (!latestLog) return;

    if (!context.userName) readUserName(latestLog, context);
    checkNewJoin(latestLog, context);
    checkNewLeave(latestLog, context);

    comsumeNewJoin(context);
    consumeNewLeave(context);
}

function getLatestLog(): ActivityLog[] | null {
    const filePath: string | null = findLatestVRChatLogFullPath();
    if (!filePath) return null; // 参照できるログファイルがない

    return parseVRChatLog(
        fs.readFileSync(path.resolve(filePath), "utf8"), false);
}
