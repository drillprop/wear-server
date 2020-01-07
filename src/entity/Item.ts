import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from 'typeorm';
import { User } from './User';

interface SearchItemsParams {
  column?: string | null;
  argument?: string | null;
  take?: number | null;
  skip?: number | null;
  orderBy?: string | null;
  desc?: boolean | null;
}

@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  price!: number;

  @Column()
  imageUrl!: string;

  @Column()
  category: string;

  @ManyToOne(
    () => User,
    user => user.items
  )
  user: User;

  @CreateDateColumn()
  createdAt!: Date;

  @CreateDateColumn()
  updatedAt: Date;

  static searchItems(params: SearchItemsParams) {
    const queryBuilder = this.createQueryBuilder('item');
    const { column, argument, skip, take, orderBy, desc } = params;

    if (column && argument) {
      queryBuilder.where(`item.${column} ilike '%' || :name || '%'`, {
        name: argument
      });
    }
    if (skip) queryBuilder.skip(skip);
    if (take) queryBuilder.take(take);
    if (orderBy) queryBuilder.orderBy(orderBy, desc ? 'DESC' : 'ASC');

    return queryBuilder.getMany();
  }
}
