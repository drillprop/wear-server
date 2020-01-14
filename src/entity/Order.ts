import { Field, ID, ObjectType } from 'type-graphql';
import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { User } from './User';
import { Item } from './Item';

@ObjectType()
@Entity()
export class Order {
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
    user => user.orders
  )
  user: User;

  @ManyToMany(
    () => Item,
    item => item.orders
  )
  @JoinTable({ name: 'order_items' })
  items: Item[];
}
