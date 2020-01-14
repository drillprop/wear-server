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
import customSearchBuilder from '../utils/customSearchBuilder';

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
    const queryBuilder = customSearchBuilder(this, params);

    return queryBuilder.getMany();
  }
}
