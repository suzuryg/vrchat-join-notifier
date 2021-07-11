import { execSync } from "child_process";
import { AppContext } from "./app";
import { showNotification } from "./notifier/notifier";

export function comsumeNewJoin(context: AppContext) {
    context.currentUserNames = context.currentUserNames.concat(context.newJoinedUserNames);
    const isSpecific = isIncludeSpecificNames(context.newJoinedUserNames, context.config.specificNames || []);
    if (isSpecific && context.config.specificExec) {
        execSpecific(context.newJoinedUserNames, context.config.specificExec);
    }
    showNotification("join", context.newJoinedUserNames, isSpecific, context.config);
}

export function consumeNewLeave(context: AppContext) {
    context.currentUserNames = context.currentUserNames.filter(name => !context.newLeftUserNames.includes(name));
    if (context.currentUserNames.length == 0) {
        return; // no notice when leave instance myself
    }

    const isSpecific = isIncludeSpecificNames(context.newLeftUserNames, context.config.specificNames || []);
    if (isSpecific && context.config.specificExec) {
        execSpecific(context.newLeftUserNames, context.config.specificExec);
    }
    showNotification("leave", context.newLeftUserNames, isSpecific, context.config);
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
