import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { SearchItemInput } from '../graphql/item/item.inputs';
import { User } from './User';

@ObjectType()
@Entity()
export class Item extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  price!: number;

  @Field()
  @Column()
  imageUrl!: string;

  @Field()
  @Column()
  category: string;

  @ManyToOne(
    () => User,
    user => user.items
  )
  user: User;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field({ nullable: true })
  @CreateDateColumn()
  updatedAt: Date;

  static searchItems(params: SearchItemInput) {
    const queryBuilder = this.createQueryBuilder('item');
    const {
      column,
      argument,
      skip,
      take,
      orderBy,
      desc,
      priceFrom,
      priceTo
    } = params;

    if (column && argument) {
      queryBuilder.andWhere(`${column} ilike '%' || :argument || '%'`, {
        argument
      });
    }
    if (skip) queryBuilder.skip(skip);
    if (take) queryBuilder.take(take);
    if (orderBy) queryBuilder.orderBy(orderBy, desc ? 'DESC' : 'ASC');
    if (priceFrom)
      queryBuilder.andWhere(`price >= :priceFrom`, {
        priceFrom
      });
    if (priceTo) {
      queryBuilder.andWhere(`price <= :priceTo`, {
        priceTo
      });
    }

    return queryBuilder.getMany();
  }
}
