import * as fs from "fs";
import * as path from "path";
import { app, appParameterObject } from "./app/app";

export function readConfigFile(): appParameterObject {
    try {
        const config: appParameterObject = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "join-notiier.json"), "utf8"))
        return config;
    } catch (error) {
        return {};
    }
}

const config = readConfigFile();
app(config);
