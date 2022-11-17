import { NextFunction, Request, Response } from 'express';
import logger from '../../lib/logger';

export default (error: Error, req: Request, res: Response, _next: NextFunction): void => {
	logger.error(`${req.method} ${req.originalUrl}`, {
		header: req.headers,
		params : {
			url: req.params,
			query: req.query,
			body: req.body
		},
		error
	});

	res.status(500).send({
		message: 'An error occured while processing the request'
	});
};
