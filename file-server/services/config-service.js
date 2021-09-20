import fs from "fs";
import { CONFIG_FILE } from "../commons/const.js";

export function readConfig() {
  const rawConfig = fs.readFileSync(CONFIG_FILE);
  const config = JSON.parse(rawConfig);

  return config;
}

export function writeConfig(config) {
  const rawConfig = JSON.stringify(config);
  fs.writeFileSync(CONFIG_FILE, rawConfig);
}
