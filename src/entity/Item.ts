import {
  Authorized,
  Field,
  ID,
  Int,
  ObjectType,
  registerEnumType
} from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { SearchItemInput } from '../graphql/item/items/SearchItemsInput';
import customSearchBuilder from '../utils/customSearchBuilder';
import { Order } from './Order';
import { User } from './User';
import { Size } from './Size';

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

  @Column({ name: 'image_url' })
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

  @OneToMany(
    type => Size,
    size => size.item,
    { nullable: true, eager: true, cascade: true }
  )
  @JoinColumn()
  @Field(() => Size, { nullable: true })
  sizes: Size[];

  @CreateDateColumn({ name: 'created_at' })
  @Field()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
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
    queryBuilder.leftJoinAndSelect('Item.sizes', 'size');

    if (priceFrom) queryBuilder.andWhere(`price >= ${priceFrom}`);
    if (priceTo) queryBuilder.andWhere(`price <= ${priceTo}`);
    if (name) queryBuilder.andWhere(`name ilike '%' || '${name}' || '%'`);
    if (category) queryBuilder.andWhere(`category = '${category}'`);
    if (gender) queryBuilder.andWhere(`gender = '${gender}'`);

    return queryBuilder.getManyAndCount();
  }

  static getMaxPrice(input?: Partial<SearchItemInput>) {
    const queryBuilder = this.createQueryBuilder();

    if (input) {
      if (input.name)
        queryBuilder.andWhere(`name ilike '%' || '${input.name}' || '%'`);
      if (input.category)
        queryBuilder.andWhere(`category = '${input.category}'`);
      if (input.gender) queryBuilder.andWhere(`gender = '${input.gender}'`);
    }

    return queryBuilder.select('MAX(price)', 'maxPrice').getRawOne();
  }
}
