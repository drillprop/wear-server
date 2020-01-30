import {
  Field,
  ID,
  ObjectType,
  Authorized,
  registerEnumType,
  Int
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

export enum Category {
  TROUSER = 'TROUSER',
  DRESS = 'DRESS',
  BLOUSE = 'BLOUSE',
  TSHIRT = 'TSHIRT',
  SHIRT = 'SHIRT',
  JACKET = 'JACKET',
  BLAZER = 'BLAZER'
}

registerEnumType(Category, {
  name: 'Category'
});

@ObjectType()
@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  price: number;

  @Column()
  @Field()
  imageUrl: string;

  @Column({ type: 'enum', enum: Category })
  @Field(type => Category)
  category: Category;

  @Column({ type: 'enum', enum: Gender, default: Gender.MALE })
  @Field(type => Gender)
  gender: Gender;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description: string;

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

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field({ nullable: true })
  updatedAt: Date;

  @Field(() => Int)
  totalCount: number;

  static searchItems({
    whereCategory,
    whereName,
    whereGender,
    priceFrom,
    priceTo,
    ...rest
  }: SearchItemInput) {
    const queryBuilder = customSearchBuilder(this, rest);

    if (priceFrom) queryBuilder.andWhere(`price >= ${priceFrom}`);
    if (priceTo) queryBuilder.andWhere(`price <= ${priceTo}`);
    if (whereName)
      queryBuilder.andWhere(`name ilike '%' || '${whereName}' || '%'`);
    if (whereCategory) queryBuilder.andWhere(`category = '${whereCategory}'`);
    if (whereGender) queryBuilder.andWhere(`gender = '${whereGender}'`);

    return queryBuilder.getMany();
  }
}
