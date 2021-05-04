import * as powertoast from "powertoast";

export const ToastAudioType = {
    Default: "ms-winsoundevent:Notification.Default",
    Reminder: "ms-winsoundevent:Notification.Reminder"
}
export type ToastAudioType = typeof ToastAudioType[keyof typeof ToastAudioType];

export function showToast(message: string, title: string, audioType: ToastAudioType = ToastAudioType.Default): void {
    const toastParam: PowertoastParams = {
        title,
        message,
        icon: "https://static.npmjs.com/7a7ffabbd910fc60161bc04f2cee4160.png",
        audio: audioType,
    };
    powertoast(toastParam);
}
