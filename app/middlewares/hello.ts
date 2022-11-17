import { Request, Response, NextFunction } from 'express';
import logger from '../../lib/logger';

export default (_req: Request, _response: Response, next: NextFunction): void => {
	logger.debug('hello from middleware');
	next();
};
