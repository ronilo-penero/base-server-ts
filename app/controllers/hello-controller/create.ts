import { HelloInterface } from '../../../lib/interface/hello-interface';
import { Hello as HelloEntity } from './../../entity/hello';
import DBSource from '../../../lib/dataSource';
import { InsertResult } from 'typeorm';

export default class CreateController{
	helloUser: HelloInterface;

	constructor(params: HelloInterface) {
		this.helloUser = params;
	}

	process():Promise<object> {
		const helloUserData: object[] = [];

		this.helloUser.value.forEach((value) => {
			helloUserData.push({
				name: this.helloUser.name,
				value
			});
		});

		return DBSource.getInstance().AppDataSource.createQueryBuilder()
			.insert()
			.into(HelloEntity)
			.values(helloUserData)
			.execute()
			.then((response: InsertResult):object => {
				return {
					rowsAffected: response.identifiers.length
				};
			});
	}
}
