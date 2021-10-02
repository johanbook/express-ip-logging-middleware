import express from "express";
import winston from "winston";

import createIPLogger from "./middleware";

const logger = winston.createLogger({
  transports: [new winston.transports.File({ filename: "incoming_ips.log" })],
});

const app = express();
app.use(
  createIPLogger({
    logger: (lookup) => {
      logger.log({ meta: lookup, level: "info", message: `${lookup.query}` });
    },
    /* eslint-disable-next-line no-console */
    onError: console.error,
  })
);

app.get("/", (_, response) => response.sendStatus(200));
app.listen(8080);
