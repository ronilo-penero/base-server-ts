import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ColumnType } from '../../lib/enum/columnType';

@Entity()
export  class Hello {
	@PrimaryGeneratedColumn()
	id: number | undefined;

	@Column({
		type: ColumnType.Text
	})
	name: string | undefined;

	@Column({
		type: ColumnType.Text
	})
	value: string | undefined;
}
