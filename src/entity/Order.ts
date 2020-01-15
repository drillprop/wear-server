import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
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
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field({ nullable: true })
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => OrderStatus)
  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

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

  static searchOrders(params: SearchOrdersInput) {
    const { whereStatus, ...rest } = params;
    const queryBuilder = customSearchBuilder(this, rest);

    if (whereStatus)
      queryBuilder.andWhere(`status = :whereStatus`, {
        whereStatus
      });

    return queryBuilder.getMany();
  }
}
