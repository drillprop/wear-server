import { Field, ID, ObjectType, Authorized } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany
} from 'typeorm';
import { User } from './User';
import { SearchItemInput } from '../graphql/item/items/SearchItemsInput';
import { Order } from './Order';

@ObjectType()
@Entity()
export class Item extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  price: number;

  @Field()
  @Column()
  imageUrl: string;

  @Field()
  @Column()
  category: string;

  @ManyToOne(
    () => User,
    user => user.createdItems
  )
  @Authorized(['ADMIN', 'EMPLOYEE'])
  @Field(() => User)
  createdBy: Promise<User>;

  @ManyToMany(
    () => Order,
    order => order.orderedItems
  )
  orders: Order[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field({ nullable: true })
  @UpdateDateColumn()
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
