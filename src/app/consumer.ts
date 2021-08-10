import { execSync } from "child_process";
import { AppContext } from "./app";
import { showNotification } from "./notifier/notifier";

export function comsumeNewJoin(context: AppContext): void {
    if (context.newJoinUserNames.length === 0) return;

    const isSpecific = isIncludeSpecificNames(context.newJoinUserNames, context.config.specificNames || []);
    if (isSpecific && context.config.specificExec) {
        execSpecific(context.newJoinUserNames, context.config.specificExec);
    }
    showNotification("join", context.newJoinUserNames, isSpecific, context.config);
    context.newJoinUserNames = [];
}

export function consumeNewLeave(context: AppContext): void {
    if (context.newLeaveUserNames.length == 0) return;
    if (!!context.userName && context.newLeaveUserNames.indexOf(context.userName) !== -1) {
        context.newLeaveUserNames = [];
        return; // self leave
    }
    showNotification("leave", context.newLeaveUserNames, false, context.config);
    context.newLeaveUserNames = [];
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
