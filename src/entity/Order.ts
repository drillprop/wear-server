import { Field, ID, Int, ObjectType, registerEnumType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn
} from 'typeorm';
import SearchOrdersInput from '../graphql/order/orders/SearchOrdersInput';
import customSearchBuilder from '../utils/customSearchBuilder';
import { Ordered_Item } from './Ordered_Item';
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

  @CreateDateColumn({ name: 'created_at' })
  @Field()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
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
  @JoinColumn({ name: 'ordered_by' })
  @Field(() => User)
  orderedBy: Promise<User>;

  @OneToMany(
    () => Ordered_Item,
    orderedItems => orderedItems.order,
    { eager: true, cascade: true }
  )
  @JoinColumn({ name: 'ordered_items' })
  @Field(() => Ordered_Item)
  orderedItems: Ordered_Item[];

  static searchOrders({ status, ...rest }: SearchOrdersInput) {
    const queryBuilder = customSearchBuilder(this, rest);

    if (status) queryBuilder.andWhere(`status = '${status}'`);

    return queryBuilder.getMany();
  }
}
