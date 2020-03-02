import { Field, Int, ObjectType, registerEnumType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique
} from 'typeorm';
import { Item } from './Item';

export enum SizeSymbol {
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL'
}

registerEnumType(SizeSymbol, {
  name: 'SizeSymbol'
});

@Unique(['sizeSymbol', 'item'])
@ObjectType()
@Entity()
export class Size extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true,
    name: 'size_symbol',
    type: 'enum',
    enum: SizeSymbol
  })
  @Field(() => SizeSymbol, { nullable: true })
  sizeSymbol: SizeSymbol;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  quantity: number;

  @ManyToOne(
    () => Item,
    item => item.sizes,
    { onDelete: 'CASCADE' }
  )
  item: Item;
}
