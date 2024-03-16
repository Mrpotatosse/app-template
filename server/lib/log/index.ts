import { createLogger, format, transports } from "winston";

export const logger = createLogger({
    level: Bun.env.NODE_ENV === "production" ? "info" : "debug",
    format: format.json(),
    transports: [new transports.Console()],
});
