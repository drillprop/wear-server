import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Item } from './Item';
import { Order } from './Order';
import { SizeSymbol } from './Size';

@ObjectType()
@Entity()
export class Ordered_Item extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @ManyToOne(
    () => Order,
    order => order.orderedItems,
    { onDelete: 'CASCADE' }
  )
  order: Order;

  @ManyToOne(
    () => Item,
    item => item.orderedItems,
    { onDelete: 'CASCADE', eager: true }
  )
  @JoinColumn()
  @Field(() => Item)
  item: Item;

  @Column({
    name: 'size_symbol',
    type: 'enum',
    enum: SizeSymbol
  })
  @Field(() => SizeSymbol)
  sizeSymbol: SizeSymbol;
}
