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
  MAN = 'MAN',
  WOMAN = 'WOMAN'
}

registerEnumType(Gender, {
  name: 'Gender'
});

export enum Category {
  TROUSERS = 'TROUSERS',
  DRESS = 'DRESS',
  BLOUSE = 'BLOUSE',
  TSHIRT = 'TSHIRT',
  SHIRT = 'SHIRT',
  JACKET = 'JACKET',
  BLAZER = 'BLAZER',
  SWEATSHIRT = 'SWEATSHIRT'
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

  @Column({ type: 'enum', enum: Gender })
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
    category,
    name,
    gender,
    priceFrom,
    priceTo,
    ...rest
  }: SearchItemInput) {
    const queryBuilder = customSearchBuilder(this, rest);

    if (priceFrom) queryBuilder.andWhere(`price >= ${priceFrom}`);
    if (priceTo) queryBuilder.andWhere(`price <= ${priceTo}`);
    if (name) queryBuilder.andWhere(`name ilike '%' || '${name}' || '%'`);
    if (category) queryBuilder.andWhere(`category = '${category}'`);
    if (gender) queryBuilder.andWhere(`gender = '${gender}'`);

    return queryBuilder.getManyAndCount();
  }
}
