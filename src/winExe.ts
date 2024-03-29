import * as path from "path";
import { app } from "./app/app";
import { readConfigFile } from "./app/util/util";

const config = readConfigFile(path.resolve(__dirname, "..", "join-notifier.json"));
app(config);
