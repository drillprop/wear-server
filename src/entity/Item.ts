import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from 'typeorm';
import { User } from './User';
import { ObjectType, Field, ID, InputType, Int } from 'type-graphql';

interface SearchItemsParams {
  column?: string;
  argument?: string;
  take?: number;
  skip?: number;
  orderBy?: string;
  desc?: boolean;
  priceFrom?: number;
  priceTo?: number;
}
@InputType()
export class CreateItemInput {
  @Field()
  name: string;
  @Field()
  price: number;
  @Field()
  imageUrl: string;
  @Field()
  category: string;
}

@InputType()
export class SearchItemInput {
  @Field({ nullable: true })
  column: string;
  @Field({ nullable: true })
  argument: string;
  @Field(() => Int, { nullable: true })
  take: number;
  @Field(() => Int, { nullable: true })
  skip: number;
  @Field({ nullable: true })
  orderBy: string;
  @Field({ nullable: true })
  desc: boolean;
  @Field({ nullable: true })
  priceFrom: number;
  @Field({ nullable: true })
  priceTo: number;
}

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

  static searchItems(params: SearchItemsParams) {
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
