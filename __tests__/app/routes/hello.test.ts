import 'jest';
import Server from './../../../lib/server';
import localConfig from './../../../config';
import HelloRoute from './../../../app/routes/hello';
import
describe('app/routes/hello.ts', function (): void {
	const server = new Server(localConfig);

	describe('#constructor', function (): void {
		const helloRoute = new HelloRoute(null, server.server);

		test('should have server as a property', function (): void {

		});
	});
});
