#!/usr/bin/env node

import http from "http";
import path from "path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import * as dotenv from "dotenv";
import { IWeather } from "./models";

dotenv.config({ path: path.join(__dirname, "../", ".env") });

const argv = yargs(hideBin(process.argv)).parseSync();
const city = String(argv._[0]);

http.get(
  `http://api.weatherstack.com/current?access_key=${process.env.API_ACCESS_KEY}&query=${city}`,
  (res) => {
    res.setEncoding("utf8");
    let parsedData: IWeather;
    let rawData = "";
    res.on("data", (chunk) => {
      rawData += chunk;
    });
    res.on("end", () => {
      try {
        parsedData = JSON.parse(rawData);
        console.log(parsedData);
      } catch (err) {
        console.error((err as Error).message);
      }
    });
  }
);
