import { ActivityLog, ActivityType, MoveActivityLog } from "@kamakiri01/vrchat-activity-viewer";
import { AppContext } from "./app";

export function findNewEnter(latestLog: ActivityLog[], context: AppContext): boolean {
    const newEnterLog = latestLog
        .filter(e => e.activityType === ActivityType.Enter)
        .filter(e => e.date > context.latestCheckTime);

    return newEnterLog.length > 0;
}

export function checkNewJoin(latestLog: ActivityLog[], context: AppContext): void {
    const newJoinLog = latestLog
        .filter(e => e.activityType === ActivityType.Join)
        .filter(e => e.date > context.latestCheckTime);

    if (newJoinLog.length > 0) {
        const joinUserNames = newJoinLog.map(e => (<MoveActivityLog>e).userData.userName);
        context.newJoinedUserNames = joinUserNames;
        return;
    }
}
export function checkNewLeave(latestLog: ActivityLog[], context: AppContext): void {
    const newLeaveLog = latestLog
        .filter(e => e.activityType === ActivityType.Leave)
        .filter(e => e.date > context.latestCheckTime);

    if (newLeaveLog.length > 0) {
        const leaveUserNames = newLeaveLog.map(e => (<MoveActivityLog>e).userData.userName);
        context.newLeftUserNames = leaveUserNames;
        return;
    }
}
