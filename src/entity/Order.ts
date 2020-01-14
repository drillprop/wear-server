import { Field, ID, ObjectType } from 'type-graphql';
import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  BaseEntity
} from 'typeorm';
import { User } from './User';
import { Item } from './Item';
import SearchInput from '../graphql/shared/SearchInput';

@ObjectType()
@Entity()
export class Order extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field({ nullable: true })
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(
    () => User,
    user => user.createdOrders
  )
  @Field(() => User)
  orderedBy: Promise<User>;

  @ManyToMany(
    () => Item,
    item => item.orders
  )
  @JoinTable()
  orderedItems: Promise<Item[]>;

  static searchOrders(params: SearchInput) {
    const queryBuilder = this.createQueryBuilder('item');
    const { column, argument, skip, take, orderBy, desc } = params;

    if (column && argument) {
      queryBuilder.andWhere(`${column} ilike '%' || :argument || '%'`, {
        argument
      });
    }
    if (skip) queryBuilder.skip(skip);
    if (take) queryBuilder.take(take);
    if (orderBy) queryBuilder.orderBy(orderBy, desc ? 'DESC' : 'ASC');

    return queryBuilder.getMany();
  }
}
