import * as dgram from "dgram";
const PORT = 42069;
const BROADCAST_IP = "127.0.0.1";
const socket = dgram.createSocket("udp4");

/**
 * @see https://xiexe.github.io/XSOverlayDocumentation/#/NotificationsAPI
 */
 export interface XSOverlayMessageObject {
    messageType: number;
    index?: number;
    timeout: number;
    height: number;
    opacity: number;
    volume: number;
    audioPath: string;
    title: string;
    content: string;
    useBase64Icon: boolean;
    icon: string;
    sourceApp: string;
}

/**
 * モジュール外部から XSOverlayMessageObject を指定するためのI/F
 */
export interface XSOverlayNotificationParameterObject {
    timeout?: number;
    height?: number;
    opacity?: number;
    volume?: number;
    audioPath?: string;
}

// TODO: minor bump 時にI/F整理
export function showXSOverlayNotification(message: string, title: string, param: XSOverlayNotificationParameterObject = {}): void {
    console.log("param", param);
    const messageObject: any = Object.assign(JSON.parse(JSON.stringify(defaultMessageobject)), param);
    (Object.keys(param) as (keyof XSOverlayNotificationParameterObject)[]).forEach(key => {
        if (param[key] != null) messageObject[key] = (param[key]);
    })
    messageObject.content = message;
    messageObject.title = title;
    _showXSOverlayNotification(messageObject);
}

const defaultMessageobject: XSOverlayMessageObject = {
    messageType: 1,
    title: "",
    content: "",
    height: 100,
    sourceApp: "vrchat-join-notifier",
    timeout: 3,
    volume: 0.5,
    audioPath: "default",
    useBase64Icon: false,
    icon: "default",
    opacity: 1
}

function _showXSOverlayNotification(messageObject: XSOverlayMessageObject): void {
    const data = Buffer.from(JSON.stringify(messageObject));
    socket.send(data, 0, data.length, PORT, BROADCAST_IP, (error) => {
        if (error) console.log(error);
    })
}
