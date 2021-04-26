import * as path from "path";
import { execSync } from "child_process";
import * as powertoast from "powertoast";
import { loadDatabase, ActivityType, MoveActivityLog } from "@kamakiri01/vrchat-activity-viewer";

export interface appParameterObject {
    interval?: string;
    specificNames?: string[];
    specificExec?: string;
}

export function app(param: appParameterObject) {

    const interval = param.interval ? parseInt(param.interval, 10) : 2;
    let latestJoinedUnixTime = Date.now();
    setInterval(() => {
        execSync("va");
        latestJoinedUnixTime = cronFunc(latestJoinedUnixTime, param);
    }, interval * 1000);
}

function cronFunc(latestJoinedUnixTime: number, param: appParameterObject): number {
    const userHome = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"]!;
    const dbPath = path.join(userHome, ".vrchatActivityViewer", "db.json");
    const db = loadDatabase(dbPath);

    const newJoinLog = db.log
        .filter(e => e.activityType === ActivityType.Join)
        .filter(e => e.date > latestJoinedUnixTime);

    if (newJoinLog.length > 0) {
        const joinUserNames = newJoinLog.map(e => (<MoveActivityLog>e).userData.userName);
        const isSpecific = isIncludeSpecificNames(joinUserNames, param.specificNames || []);
        showNotification(joinUserNames, isSpecific);

        if (isSpecific && param.specificExec) {
            execSpecific(joinUserNames, param.specificExec);
        }

        return newJoinLog.sort((a, b) => {
            return a.date - b.date;
        }).slice(-1)[0].date;
    }
    return latestJoinedUnixTime;
}

function generateFormulatedTime(): string {
    const dateOption: Intl.DateTimeFormatOptions = {
        year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit", second: "2-digit"
    };
    return (new Date()).toLocaleString(undefined, dateOption);
}

function isIncludeSpecificNames(names: string[], specificNames: string[]): boolean {
    const lowerNames = names.map(name => name.toLowerCase());
    const matchedNames = specificNames.filter(specificName => lowerNames.find(name => name.indexOf(specificName.toLowerCase()) !== -1));
    return matchedNames.length > 0;
}

function showNotification(joinUserNames: string[], isSpecific: boolean): void {
    const time = generateFormulatedTime();

    const toastParam: PowertoastParams = {
        title: "VRChat Notice",
        message: joinUserNames.join(", "),
        icon: "https://static.npmjs.com/7a7ffabbd910fc60161bc04f2cee4160.png",
        audio: isSpecific ? "ms-winsoundevent:Notification.Reminder" : "ms-winsoundevent:Notification.Default",
    };
    console.log(time + " join: " + joinUserNames);
    powertoast(toastParam);
}

function execSpecific(joinUserNames: string[], execCommand: string) {
    const stdout = execSync(execCommand + joinUserNames.join(" "));
    console.log("LOG:", stdout.toString());
}
