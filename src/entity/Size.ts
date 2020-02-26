import { Field, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Item } from './Item';

@ObjectType()
@Entity()
export class Size extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  xs: number;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  s: number;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  m: number;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  l: number;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  xl: number;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  xxl: number;

  @OneToOne(
    type => Item,
    item => item.sizes
  )
  item: Item;
}
