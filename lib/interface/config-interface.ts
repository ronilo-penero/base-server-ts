interface DatabaseInterface {
	host: string;
	name: string;
	username: string;
	password?: string;
	port?: number;
}

interface ServerConfigInterface {
	port: number;
	name: string;
	env: string;
	database?: DatabaseInterface;
}

export {
	DatabaseInterface,
	ServerConfigInterface
};
