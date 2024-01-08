// import { config } from "dotenv";
import dotenv from "dotenv";

const pathToEnv = __dirname + "/../.env";

dotenv.config({ path: pathToEnv });

const serverConfig = {
  serverPort: process.env.SERVER_PORT || 8000,

  jwt: {
    tokenSecret: process.env.TOKEN_SECRET || "TOKEN_SECRET",
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "300000000",
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || "ACCESS_TOKEN_SECRET",
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "5000000000",
    refreshTokenSecret:
      process.env.REFRESH_TOKEN_SECRET || "REFRESH_TOKEN_SECRET",
  },

  saltRound: parseInt(process.env.SALT_ROUND || "10", 10),

  database: {
    charset: "utf8",
    client: process.env.DB_CLIENT,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    timezone: "UTC",
    user: process.env.DB_USER,
  },
};

export default serverConfig;
