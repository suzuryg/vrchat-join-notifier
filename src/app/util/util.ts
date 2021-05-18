import * as fs from "fs";
import { parse } from "jsonc-parser";
import { AppParameterObject } from "../types/AppConfig";

export function generateFormulatedTime(): string {
    const dateOption: Intl.DateTimeFormatOptions = {
        year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit", second: "2-digit"
    };
    return (new Date()).toLocaleString(undefined, dateOption);
}

export function readConfigFile(configFilePath: string): AppParameterObject {
    try {
        const config: AppParameterObject = parse(fs.readFileSync(configFilePath, "utf8"));
        return config;
    } catch (error) {
        return {};
    }
}
