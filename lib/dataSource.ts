import localConfig from './../config';
import { DataSource } from 'typeorm';

const dbType = 'postgres';

export default class DBSource {
	private static instance: DBSource;

	AppDataSource: DataSource = new DataSource({
		type: dbType,
		host: localConfig.database?.host,
		port: 5432,
		username: localConfig.database?.username,
		password: localConfig.database?.password,
		database: localConfig.database?.name,
		synchronize: true,
		logging: true,
		entities: ['app/entity/**/*.ts'],
		subscribers: [],
		migrations: [],
	});


	constructor() {
	}

	public static getInstance(): DBSource {
		if (!DBSource.instance) {
            DBSource.instance = new DBSource();
        }

        return DBSource.instance;
    }
}
