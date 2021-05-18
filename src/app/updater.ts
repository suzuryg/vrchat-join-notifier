import { ActivityLog, ActivityType, MoveActivityLog } from "@kamakiri01/vrchat-activity-viewer";
import { execSync } from "child_process";
import { showNotification } from "./notifier/notifier";
import { AppConfig } from "./types/AppConfig";

export function updateNewJoin(latestLog: ActivityLog[], latestTime: number, config: AppConfig): number {
    const newJoinLog = latestLog
        .filter(e => e.activityType === ActivityType.Join)
        .filter(e => e.date > latestTime);

    if (newJoinLog.length > 0) {
        const joinUserNames = newJoinLog.map(e => (<MoveActivityLog>e).userData.userName);
        const isSpecific = isIncludeSpecificNames(joinUserNames, config.specificNames || []);
        showNotification("join", joinUserNames, isSpecific, config);

        if (isSpecific && config.specificExec) {
            execSpecific(joinUserNames, config.specificExec);
        }

        return newJoinLog.sort((a, b) => {
            return a.date - b.date;
        }).slice(-1)[0].date;
    }
    return latestTime;
}

function isIncludeSpecificNames(names: string[], specificNames: string[]): boolean {
    const lowerNames = names.map(name => name.toLowerCase());
    const matchedNames = specificNames.filter(specificName => lowerNames.find(name => name.indexOf(specificName.toLowerCase()) !== -1));
    return matchedNames.length > 0;
}

function execSpecific(userNames: string[], execCommand: string) {
    const stdout = execSync(execCommand.replace("%{{names}}", userNames.join(" ")));
    console.log(stdout.toString());
}
