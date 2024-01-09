import express, { Request, Response } from "express";
import cors from "cors";

import config from "./config";
import routes from "./routes";
import { logger } from "./middlewares/logger";
import { genericErrorHandler, notFoundError } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3175",
    credentials: true,
  })
);

app.use(routes);

app.use(genericErrorHandler);

app.use(notFoundError);

console.log(`Server listening on port:${config.serverPort}`);

app.listen(config.serverPort);
