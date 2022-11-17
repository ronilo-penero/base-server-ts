import bodyParser from 'body-parser';
import cors from 'cors';
import errorHandler from '../app/middlewares/errorHandler';
import express from 'express';
import glob from 'glob';
import helmet from 'helmet';
import logger from './logger';
import 'reflect-metadata';
import DBSource from './dataSource';

import { Express, Request,Response } from 'express';
import { ServerConfigInterface } from './interface/config-interface';
import { DataSource } from 'typeorm';

// Server class
export default class Server {
	private asyncRequest: Promise<DataSource>;
	localConfig: ServerConfigInterface;
	server: Express;

	/**
	 * Instantiate the server
	 * @param {object} localConfig - local configuration
	 */
	constructor(localConfig: ServerConfigInterface) {
		this.localConfig = localConfig;
		this.server = express();

		this.setupDependencies();
		this.asyncRequest = this.setupORM();
		this.setupRoutes();
	}

	/**
	 * Start server
	 */
	async run(): Promise<void> {
		await this.asyncRequest;

		this.server.listen(this.localConfig.port, (): void => {
			logger.debug('Service started', this.localConfig);
		}).on('error', (error: Error): void => {
			logger.error('Service failed to start', {
				...this.localConfig,
				error
			});
		});
	}

	/**
	 * Sets server middlewares
	 */
	private setupDependencies(): void {
		this.server.use(bodyParser.urlencoded({
			extended: true,
		}));
		this.server.use(bodyParser.json());
		this.server.use(helmet());
		this.server.use(cors());
	}

	private async setupORM(): Promise<DataSource> {
		return DBSource.getInstance().AppDataSource.initialize()
	}

	private setupRoutes(): void {
		this.server.get('/healthcheck', function(_req: Request, res: Response): void {
			res.send('OK');
		});

		glob.sync('app/routes/**/*.ts').forEach((file: string): void => {
			const Route = require(`./../${file}`);
			new Route(this.localConfig, this.server);
		});

		this.server.get('*', function(_req: Request, res: Response): void {
			res.status(404).send('Not found');
		});

		// must always be the last middleware to act as error handler
		this.server.use(errorHandler);
	}
}
