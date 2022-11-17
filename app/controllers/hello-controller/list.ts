import { Hello as HelloEntity } from './../../entity/hello';
import DBSource from '../../../lib/dataSource';

export default class ListController {
	async process(): Promise<object> {
		return await DBSource.getInstance().AppDataSource.createQueryBuilder()
			.select()
			.from(HelloEntity, 'hello')
			.where('id >= 2')
			.andWhere('id <= 3')
			.execute()
			.then((response: any): object => {
				return response;
			});
	}
}
