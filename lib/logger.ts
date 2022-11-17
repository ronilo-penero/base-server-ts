import winston from 'winston';

import { Environment } from './enum/environment';
import { LogLevel } from './enum/log-level';

const errorLogFilePath = 'logs/error.log';
const timeFormat = 'YYYY-MM-DDTHH:mm:sssZ';

const logger = winston.createLogger({
	level: LogLevel.Debug,
	format: winston.format.combine(
		winston.format.timestamp({
			format: timeFormat,
		}),
		winston.format.prettyPrint()
	),
	defaultMeta: {
		service: process.env.APPLICATION_NAME
	},
	transports: [
		new winston.transports.File({
			filename: errorLogFilePath,
			level: LogLevel.Error
		})
	],
});

if (process.env.NODE_ENV !== Environment.Production) {
	logger.add(new winston.transports.Console({
		format: winston.format.simple(),
	}));
}

export default logger;
