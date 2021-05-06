import * as fs from "fs";
import { AppParameterObject } from "../app";

export function generateFormulatedTime(): string {
    const dateOption: Intl.DateTimeFormatOptions = {
        year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit", second: "2-digit"
    };
    return (new Date()).toLocaleString(undefined, dateOption);
}

export function readConfigFile(configFilePath: string): AppParameterObject {
    try {
        const config: AppParameterObject = JSON.parse(fs.readFileSync(configFilePath, "utf8"))
        return config;
    } catch (error) {
        return {};
    }
}
