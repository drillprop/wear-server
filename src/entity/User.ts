import { Field, ID, ObjectType, registerEnumType, Int } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Item } from './Item';
import { SearchUserInput } from '../graphql/user/users/SearchUserInput';
import { Order } from './Order';
import customSearchBuilder from '../utils/customSearchBuilder';

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
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column({ select: false })
  password: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  address: string;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  phoneNumber: number;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CUSTOMER })
  @Field(type => UserRole)
  role: UserRole;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field({ nullable: true })
  @UpdateDateColumn()
  updatedAt: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  resetToken?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  resetTokenExpiry?: Date;

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

  static searchUsers(params: SearchUserInput) {
    const { role, ...rest } = params;
    const queryBuilder = customSearchBuilder(this, rest);

    if (role)
      queryBuilder.andWhere(`ROLE = :role`, {
        role
      });

    return queryBuilder.getMany();
  }

  static findAndSelectPassword(col: string, arg: string) {
    return this.createQueryBuilder('user')
      .where(`${col} = '${arg}'`)
      .addSelect('user.password')
      .getOne();
  }
}
