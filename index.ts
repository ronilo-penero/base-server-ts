import localConfig from './config';
import Server from './lib/server';

const server = new Server(localConfig);

server.run();

process.on('SIGTERM', function (): void {
	if (server !== undefined) {
		console.info('Closing active server');
	}
})
