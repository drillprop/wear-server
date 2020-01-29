import { Field, ID, Int, ObjectType, registerEnumType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { SearchUserInput } from '../graphql/user/users/SearchUserInput';
import customSearchBuilder from '../utils/customSearchBuilder';
import { Address } from './Address';
import { Item } from './Item';
import { Order } from './Order';

export enum UserRole {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
  CUSTOMER = 'CUSTOMER'
}

registerEnumType(UserRole, {
  name: 'UserRole'
});

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  email: string;

  @Column({ select: false })
  @Field()
  password: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  phoneNumber: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CUSTOMER })
  @Field(type => UserRole)
  role: UserRole;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field({ nullable: true })
  updatedAt: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  resetToken?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  resetTokenExpiry?: Date;

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  newsletter: boolean;

  @OneToMany(
    () => Item,
    item => item.createdBy,
    { nullable: true }
  )
  @Field(() => [Item], { nullable: 'items' })
  createdItems: Promise<Item[]>;

  @OneToMany(
    () => Order,
    order => order.orderedBy
  )
  @Field(() => [Order], { nullable: 'items' })
  createdOrders: Promise<Order[]>;

  @OneToOne(type => Address)
  @JoinColumn()
  @Field(() => Address, { nullable: true })
  address: Promise<Address>;

  @Field(() => Int, { nullable: true })
  totalCount: number;

  static searchUsers({
    whereRole,
    whereEmail,
    whereFirstName,
    whereLastName,
    ...rest
  }: SearchUserInput) {
    const queryBuilder = customSearchBuilder(this, rest);

    if (whereRole) queryBuilder.andWhere(`role = '${whereRole}'`);
    if (whereEmail)
      queryBuilder.andWhere(`email ilike '%' || '${whereEmail}' || '%'`);
    if (whereFirstName)
      queryBuilder.andWhere(
        `firstName ilike '%' || '${whereFirstName}' || '%'`
      );
    if (whereLastName)
      queryBuilder.andWhere(`lastName ilike '%' || '${whereLastName}' || '%'`);

    return queryBuilder.getMany();
  }

  static findAndSelectPassword(col: string, arg: string) {
    return this.createQueryBuilder('user')
      .where(`${col} = '${arg}'`)
      .addSelect('user.password')
      .getOne();
  }
}
