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

  @Column({ nullable: true, name: 'first_name' })
  @Field({ nullable: true })
  firstName: string;

  @Column({ nullable: true, name: 'last_name' })
  @Field({ nullable: true })
  lastName: string;

  @Column({ nullable: true, name: 'phone_number' })
  @Field({ nullable: true })
  phoneNumber: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CUSTOMER })
  @Field(type => UserRole)
  role: UserRole;

  @CreateDateColumn({ name: 'created_at' })
  @Field()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Field({ nullable: true })
  updatedAt: Date;

  @Column({ nullable: true, name: 'reset_token' })
  @Field({ nullable: true })
  resetToken?: string;

  @Column({ nullable: true, name: 'reset_token_expiry' })
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

  static searchUsers({
    role,
    email,
    firstName,
    lastName,
    ...rest
  }: SearchUserInput) {
    const queryBuilder = customSearchBuilder(this, rest);

    if (role) queryBuilder.andWhere(`role = '${role}'`);
    if (email) queryBuilder.andWhere(`email ilike '%' || '${email}' || '%'`);
    if (firstName)
      queryBuilder.andWhere(`"firstName" ilike '%' || '${firstName}' || '%'`);
    if (lastName)
      queryBuilder.andWhere(`"lastName" ilike '%' || '${lastName}' || '%'`);

    return queryBuilder.getManyAndCount();
  }

  static findAndSelectPassword(col: string, arg: string) {
    return this.createQueryBuilder('user')
      .where(`${col} = '${arg}'`)
      .addSelect('user.password')
      .getOne();
  }
}
