import {
  Field,
  ID,
  ObjectType,
  Authorized,
  registerEnumType
} from 'type-graphql';
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
import customSearchBuilder from '../utils/customSearchBuilder';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

registerEnumType(Gender, {
  name: 'Gender'
});

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

  @Field(type => Gender)
  @Column({ type: 'enum', enum: Gender, default: Gender.MALE })
  gender: Gender;

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
    const { whereCategory, whereName, priceFrom, priceTo, ...rest } = params;
    const queryBuilder = customSearchBuilder(this, rest);

    if (priceFrom)
      queryBuilder.andWhere(`price >= :priceFrom`, {
        priceFrom
      });
    if (priceTo)
      queryBuilder.andWhere(`price <= :priceTo`, {
        priceTo
      });
    if (whereName)
      queryBuilder.andWhere(`name ilike '%' || :whereName || '%'`, {
        whereName
      });
    if (whereCategory)
      queryBuilder.andWhere(`category ilike '%' || :whereCategory || '%'`, {
        whereCategory
      });

    return queryBuilder.getMany();
  }
}
