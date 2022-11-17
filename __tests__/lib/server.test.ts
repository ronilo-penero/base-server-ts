import 'jest';
import { ServerConfigInterface } from '../../lib/interface/config-interface';
import Server from './../../lib/server';
import request from 'supertest';


describe('lib/server.ts', function () {
	const localConfig: ServerConfigInterface = {
		name: 'base-server-test',
		port: 3000,
		env: 'test'
	};

	const server: Server = new Server(localConfig);

	describe('#constructor', function (): void {
		test('localConfig must exist', function (): void {
			expect(server.localConfig).toBeDefined();
		});

		test('server must exist', function (): void {
			expect(server.server).toBeDefined();
		});

		test('it should call all initializers', function(): void {
			[
				'setupDependencies',
				'setupORM',
				'setupRoutes'
			].forEach(function (method): void {
				const spy = jest.spyOn(Server.prototype as any, method)

				new Server(localConfig);
				expect(spy).toHaveBeenCalled();
			})
		});

		test('Server should load healthcheck', async function (): Promise<void> {
			request(Server)
				.get('/healthcheck')
				.expect(200)
				.then(function (response: request.Response): void {
					expect(response.body).toBe('OK');
				});
		});

		test('Server should have a fallback for undefined endpoints', async function(): Promise<void> {
			request(Server)
				.get('/undefined_route')
				.expect(404)
				.then(function (response: request.Response): void {
					expect(response.body).toBe('Not Found');
				});
		});
	});

	describe('#run', function(): void {
		test('server should listen to port', function(): void {
			server.run();
			expect(server.server.listeners.length).toBe(1);
		});

		describe('if error occured during listening', function(): void {
			test('it should throw error', function(): void {
				const serverMock = jest.fn(server.server.listen)
				serverMock.mockImplementation((): any => {
					throw new Error('error');
				});

				expect(server.run()).rejects.toMatch('error');
			});
		});
	});
});
