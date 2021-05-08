import { AppConfig } from "../app";
import { XSOverlayNotificationParameterObject } from "../notifier/xsoverlayNotification";

export function pickXSOverlayParameter(config: AppConfig): XSOverlayNotificationParameterObject {
    return {
        opacity: parseFloat(config.xsoverlayOpacity),
        volume: parseFloat(config.xsoverlayVolume),
        timeout: parseFloat(config.xsoverlayTimeout)
    }
}
