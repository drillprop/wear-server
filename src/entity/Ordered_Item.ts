import { ObjectType, Field, ID, Int } from 'type-graphql';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from 'typeorm';
import { SizeSymbol } from './Size';
import { Order } from './Order';
import { Item } from './Item';

@ObjectType()
@Entity()
export class Ordered_Item extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @ManyToOne(
    () => Order,
    order => order.orderedItems,
    { onDelete: 'CASCADE', nullable: true }
  )
  @Field(() => Order, { nullable: true })
  order: Order;

  @ManyToOne(
    () => Item,
    item => item.orderedItems,
    { onDelete: 'CASCADE' }
  )
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
