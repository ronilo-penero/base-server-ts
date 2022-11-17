import helloMiddleware from './../middlewares/hello';
import HelloController from './../controllers/hello-controller';

import { Express, Request, Response, NextFunction } from 'express';
import { HelloInterface } from '../../lib/interface/hello-interface';
import { ServerConfigInterface } from '../../lib/interface/config-interface';

/**
 * HelloRoute class
 */
export default class HelloRoute {
	#routePrefix = 'hello';

	server: Express;

	/**
	 * Instantiates the class
	 * @param localConfig - local configuration
	 * @param server - server
	 */
	constructor(_localConfig: ServerConfigInterface, server: Express) {
		this.server = server;

		this.#setupRoutes();
	}

	/**
	 * Sets routes in server
	 */
	#setupRoutes(): void {
		this.server.get(`/${this.#routePrefix}`, helloMiddleware, this.#list);
		this.server.post(`/${this.#routePrefix}`, this.#create);
	}

	/**
	 * Returns a list of
	 * @param req - request
	 * @param res - response
	 */
	async #list(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const response = await new HelloController.List().process();

			return res.send({
				message: 'hello from list',
				response
			});
		} catch (error: any) {
			next(error);
		}
	}

	async #create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		const params: HelloInterface = {
			name: req.body.name,
			value: req.body.value
		};

		try {
			const response = await new HelloController.Create(params).process();

			return res.send({
				message: 'hello from create',
				response
			});
		} catch (error: any) {
			next(error);
		}
	}
}
