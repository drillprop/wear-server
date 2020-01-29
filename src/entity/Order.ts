import { Field, ID, ObjectType, registerEnumType, Int } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import SearchOrdersInput from '../graphql/order/orders/SearchOrdersInput';
import customSearchBuilder from '../utils/customSearchBuilder';
import { Item } from './Item';
import { User } from './User';

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  SENT = 'SENT',
  COMPLETED = 'COMPLETED'
}

registerEnumType(OrderStatus, {
  name: 'OrderStatus'
});

@ObjectType()
@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field({ nullable: true })
  updatedAt: Date;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  @Field(() => OrderStatus)
  status: OrderStatus;

  @Field(() => Int)
  totalCount: number;

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
  @JoinTable({ name: 'ordered_items' })
  @Field(() => [Item])
  orderedItems: Promise<Item[]>;

  static searchOrders({ whereStatus, ...rest }: SearchOrdersInput) {
    const queryBuilder = customSearchBuilder(this, rest);

    if (whereStatus) queryBuilder.andWhere(`status = '${whereStatus}'`);

    return queryBuilder.getMany();
  }
}
