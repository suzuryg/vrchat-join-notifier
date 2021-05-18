import { XSOverlayNotificationParameterObject } from "../notifier/xsoverlayNotification";
import { AppConfig } from "../types/AppConfig";

export function pickXSOverlayParameter(config: AppConfig): XSOverlayNotificationParameterObject {
    return {
        opacity: parseFloat(config.xsoverlayOpacity),
        volume: parseFloat(config.xsoverlayVolume),
        timeout: parseFloat(config.xsoverlayTimeout)
    }
}
