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

export function showXSOverlayNotification(message: string, title: string): void {
    const messageobject: XSOverlayMessageObject = {
        messageType: 1,
        title,
        content: message,
        height: 100,
        sourceApp: "vrchat-join-notifier",
        timeout: 3,
        volume: 0.5,
        audioPath: "default",
        useBase64Icon: false,
        icon: "default",
        opacity: 1
    }
    const data = Buffer.from(JSON.stringify(messageobject));
    socket.send(data, 0, data.length, PORT, BROADCAST_IP, (error) => {
        if (error) console.log(error);
    })
}
