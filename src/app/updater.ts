import { ActivityLog, ActivityType, AuthenticationActivityLog, MoveActivityLog } from "vrchat-activity-viewer";
import { AppContext } from "./app";

export function findOwnUserName(latestLog: ActivityLog[], context: AppContext): void {
    const userName =
        (latestLog.find(e => e.activityType === ActivityType.Authentication) as AuthenticationActivityLog | undefined)?.userName ??
        (latestLog.filter(e => e.activityType === ActivityType.Join) as MoveActivityLog[]).find(e => e.userData.access === "local")?.userData.userName;
    if (userName) context.userName = userName;
}

export function checkNewJoin(latestLog: ActivityLog[], context: AppContext, boundaryTime: number): void {
    context.newJoinUserNames = [];
    const newJoinLog = latestLog
        .filter(e => e.activityType === ActivityType.Join)
        .filter(e => (e.date > context.latestCheckTime) && (e.date < boundaryTime));

    if (newJoinLog.length > 0) {
        context.newJoinUserNames = newJoinLog.map(e => (<MoveActivityLog>e).userData.userName);
        const latestLogTime = newJoinLog.map(e => e.date).sort().pop()!;
        context.latestCheckTime = Math.max(latestLogTime, context.latestCheckTime);
    }
}
export function checkNewLeave(latestLog: ActivityLog[], context: AppContext, boundaryTime: number): void {
    context.newLeaveUserNames = [];
    const newLeaveLog = latestLog
        .filter(e => e.activityType === ActivityType.Leave)
        .filter(e => (e.date > context.latestCheckTime) && (e.date < boundaryTime));

    if (newLeaveLog.length > 0) {
        context.newLeaveUserNames = newLeaveLog.map(e => (<MoveActivityLog>e).userData.userName);
        const latestLogTime = newLeaveLog.map(e => e.date).sort().pop()!;
        context.latestCheckTime = Math.max(latestLogTime, context.latestCheckTime);
    }
}
