const {createLogger,format,transports} = require("winston")
const config = require("../config/Config")
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${level.toUpperCase().padEnd(7)}]: ${message}`;
});
const logger = createLogger({
    level: 'debug',
    format: combine(
        timestamp(),
        myFormat
    ),
    defaultMeta: { service: 'e-commerce' },
    transports: [
        new transports.Console({level:"debug"}),
        new transports.File({ filename: 'logs/application.log', level: config.logs.DEBUG }),
        new transports.File({ filename: 'logs/application.log', level: config.logs.ERROR }),
        new transports.File({ filename: 'logs/application.log', level: config.logs.INFO }),
    ],
});
module.exports = logger;