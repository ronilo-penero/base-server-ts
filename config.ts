import { Environment } from './lib/enum/environment';
import { DatabaseInterface, ServerConfigInterface } from './lib/interface/config-interface';

if (process.env.NODE_ENV !== Environment.Production) {
	require('dotenv').config();
}

const {
	PORT,
	APPLICATION_NAME,
	NODE_ENV,
	DB_HOST,
	DB_NAME,
	DB_USERNAME,
	DB_PASSWORD
} = process.env;

const dbConfig: DatabaseInterface = {
	host: String(DB_HOST),
	name: String(DB_NAME),
	username: String(DB_USERNAME),
	password: String(DB_PASSWORD) || undefined
};

const config: ServerConfigInterface =  {
	port: Number(PORT),
	name: String(APPLICATION_NAME),
	env: String(NODE_ENV),
	database: dbConfig
};

export default config;
